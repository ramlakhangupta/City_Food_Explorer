import React, { useState, useEffect } from 'react';
import {
  BiSolidLike,
  BiLike,
  BiBookmark,
  BiSolidBookmark,
} from 'react-icons/bi';
import { FaRegCommentDots, FaRegShareSquare } from 'react-icons/fa';
import { SlClose } from 'react-icons/sl';
import backgroundImage from '../assets/loginbackground.jpg';
import data from '../data/stateDistrict';
import Cookies from 'universal-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom"
import CustomToast from "../components/common/CustomToast"
import Spinner from "../components/common/Spinner";




const cookies = new Cookies();
const backendUrl = process.env.REACT_APP_BASE_URL;



const Food = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Sweet");
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentOpen, setCommentOpen] = useState(null);
  const [commentData, setCommentData] = useState({ comment: '' });
  const navigate = useNavigate();
  const category = cookies.get('category');
  
  const user = cookies.get('user') || null;
  const token = cookies.get('token');

  // Fetch Categories
  useEffect(() => {
    fetch(`${backendUrl}/api/categories/all`)
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        if (data.length > 0) {
          setSelectedCategory(data[0].category); // 👈 Default selection
        }
      })
      .catch(err => console.error("Category fetch error:", err));
  }, []);
  


    // Use selectedCategory (dishTaste) to fetch dishes
    useEffect(() => {
      if (selectedCategory) {
        setLoading(true);
        fetch(`${backendUrl}/api/category/${selectedCategory}`)
          .then((res) => res.json())
          .then((data) => {
            setDishes(data);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
            setLoading(false);
          });
      }
    }, [selectedCategory]);


    const handleLike = async (dishId) => {
      if (!token || !user) return toast.info("Login first");
      try {
        const res = await fetch(`${backendUrl}/api/${dishId}/like`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ userId: user._id })
        });
        const updatedDish = await res.json();
        setDishes(dishes.map(d => d._id === dishId ? updatedDish : d));
      } catch (err) {
        console.error(err);
      }
    };

    const handleSave = async (dishId) => {
      if (!token || !user) {
        return toast.info("Login first");
      }
    
      const isAlreadySaved = cookies.get('user')?.savedDishes?.includes(dishId);
      const updatedSavedDishes = isAlreadySaved
        ? cookies.get('user')?.savedDishes?.filter(id => id !== dishId)
        : [...(cookies.get('user')?.savedDishes || []), dishId];
    
      try {
        const res = await fetch(`${backendUrl}/api/${dishId}/save`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ userId: user._id })
        });
    
        const result = await res.json();
    
        if (res.ok) {
          toast.success(isAlreadySaved ? "Dish unsaved successfully" : "Dish saved successfully");
    
          // Update cookie manually since backend doesn't return updated user
          const updatedUser = {
            ...user,
            savedDishes: updatedSavedDishes
          };
          cookies.set('user', updatedUser, { path: '/' });
    
          // Update dish UI (optional cosmetic re-render)
          setDishes(prev =>
            prev.map(d =>
              d._id === dishId ? { ...d, isSaved: !isAlreadySaved } : d
            )
          );
        } else {
          toast.error(result.message || "Error updating saved dish");
        }
      } catch (err) {
        console.error("Save Error:", err);
        toast.error("Something went wrong while saving");
      }
    };
    
    
    
  
    const handleCommentToggle = (dishId) => {
      setCommentOpen(commentOpen === dishId ? null : dishId);
    };
  
    const handleChange = (e) => {
      setCommentData({ ...commentData, [e.target.name]: e.target.value });
    };
  
    const postComment = async (dishId) => {
      if (!token || !user) return toast.info("Login first");
      try {
        const res = await fetch(`${backendUrl}/api/${dishId}/comment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ ...commentData, userId: user._id })
        });
        const updatedDish = await res.json();
        setDishes(dishes.map(d => d._id === dishId ? updatedDish : d));
        setCommentData({ comment: '' });
      } catch (err) {
        console.error(err);
      }
    };
  
    const handleShare = (dish) => {
      const link = `${window.location.origin}/searchedDish/${dish.dishName}`;
      navigator.clipboard.writeText(link);
      toast.success("Link copied to clipboard");
    };

    


  return (
    <div
      className="absolute w-full min-h-screen p-6 text-white"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />

      {/* Content */}
      <div className="mt-[5rem] relative z-10">
        <div className="flex justify-center gap-11 items-center flex-wrap">
          <h1 className="text-5xl font-bold text-center mb-10 text-[#fdd9a0]">
            Explore Food by Category 🍽️
          </h1>

          {/* Dropdown */}
          <div className="mb-8 flex justify-center">
            <select
              className="bg-[#ffffff] text-[#1f1f1f] py-2 px-10 rounded-2xl text-2xl font-semibold shadow-lg border-2 border-[#ffba7e] focus:outline-none focus:ring-4 focus:ring-[#a28c79] transition duration-300 hover:scale-105 cursor-pointer"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category._id} value={category.dishTaste} className="text-xl">
                  {category.dishTaste}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Header */}
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-10 text-[#fff2d6]">
          These are <span className="text-[#ffba7e]">{selectedCategory}</span> Dishes
        </h2>

        {/* Dishes Grid */}
        {loading ? (
          <Spinner />
        ) : dishes && dishes.length > 0 ? (
          <div className="grid gap-6 text-black md:grid-cols-2 lg:grid-cols-3">
            {dishes.map((dish) => (
              <div key={dish._id}  className=" hover:cursor-pointer bg-white bg-opacity-90 p-6 rounded-2xl shadow-md text-left relative font-[Poppins]">
                  <div onClick={() => navigate(`/searchedDish/${dish.dishName}`)}>
                    <img src={dish.img} alt={dish.dishName} className="w-full h-48 object-cover rounded-xl mb-4" />
                    <h3 className="text-xl font-bold mb-2 text-[#a28c79]">{dish.dishName} - ₹{dish.dishPrice}</h3>
                    <p className="text-gray-800 mb-2">{dish.description}</p>
                    <p className="text-sm text-gray-700 mb-1"><span className="font-semibold">Shop:</span> {dish.shopName}</p>
                    <p className="text-sm text-gray-700 mb-4"><span className="font-semibold">Address:</span> {dish.shopLocation}</p>

                  </div>
                  <div className="flex gap-6 text-2xl items-center">
                    <button onClick={() => handleLike(dish._id)} className="hover:text-green-600 transition-all duration-150 scale-95 hover:scale-110">
                      {dish.likes.includes(user?._id) ? <BiSolidLike /> : <BiLike />}
                    </button>
                    <span className="text-sm text-black">{dish.likes.length}</span>

                    <button onClick={() => handleSave(dish._id)} className="hover:text-yellow-600">
                      {cookies.get("user")?.savedDishes?.includes(dish._id) ? <BiSolidBookmark /> : <BiBookmark />}
                    </button>

                    <button onClick={() => handleCommentToggle(dish._id)} className="hover:text-blue-600">
                      <FaRegCommentDots />
                    </button>
                    <span className="text-sm text-black">{dish.comments.length}</span>

                    <button onClick={() => handleShare(dish)} className="hover:text-purple-600">
                      <FaRegShareSquare />
                    </button>
                  </div>

                  {commentOpen === dish._id && (
                    <div className="mt-4 bg-white/90 rounded-lg p-4">
                      <div className="flex justify-between mb-2 items-center">
                        <h4 className="font-bold text-[#a28c79]">Comments</h4>
                        <SlClose className="cursor-pointer" onClick={() => setCommentOpen(null)} />
                      </div>
                      <div className="max-h-40 overflow-y-auto mb-2">
                        {[...dish.comments].reverse().map((c, i) => (
                          <div key={i} className="bg-[#f2f2f2] text-black rounded p-2 mb-2">
                            <span className="font-bold text-sm">{c.username}</span>
                            <p className="text-sm">{c.comment}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex">
                        <input
                          name="comment"
                          value={commentData.comment}
                          onChange={handleChange}
                          placeholder="Write a comment..."
                          className="flex-1 p-2 rounded-l-lg bg-gray-100 outline-none"
                        />
                        <button
                          onClick={() => postComment(dish._id)}
                          className="bg-green-600 hover:bg-[#c5a352] text-white bg-black px-4 py-2 rounded-r-lg"
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  )}
                </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-xl text-red-300 py-10">
            No dishes found in this category.
          </div>
        )}
      </div>
    
      <CustomToast />
    </div>
  );
};

export default Food;
