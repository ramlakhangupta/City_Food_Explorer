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
import { useNavigate } from "react-router-dom";
import CustomToast from "../components/common/CustomToast"
import Spinner from "../components/common/Spinner";


const backendUrl = process.env.REACT_APP_BASE_URL;
const cookies = new Cookies();

const City = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [commentOpen, setCommentOpen] = useState(null);
  const [commentData, setCommentData] = useState({ comment: '' });
  const user = cookies.get('user');
  const token = cookies.get('token');
  const navigate = useNavigate();

  const mostSearchedPlaces = [
    { state: 'Madhya Pradesh', city: 'Bhopal' },
    { state: 'Madhya Pradesh', city: 'Indore' },
    { state: 'Madhya Pradesh', city: 'Gwalior' },
    { state: 'Delhi', city: 'Delhi' },
    { state: 'Maharashtra', city: 'Mumbai' },
    { state: 'Maharashtra', city: 'Pune' },
    { state: 'Uttar Pradesh', city: 'Lucknow' },
  ];

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedDistrict('');
    setDishes([]);
  };

  const handleMostSearchedClick = ({ state, city }) => {
    setSelectedState(state);
    setSelectedDistrict(city);
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
  };

  const getDistricts = () => {
    const stateObj = data.states.find((item) => item.state === selectedState);
    return stateObj ? stateObj.districts : [];
  };

  useEffect(() => {
    const fetchDishes = async () => {
      if (selectedState && selectedDistrict) {
        setLoading(true);
        try {
          const res = await fetch(`${backendUrl}/api/city-dishes/${selectedState}/${selectedDistrict}`);
          if (!res.ok) throw new Error("No dishes found");
          const data = await res.json();
          setDishes(data);
        } catch (err) {
          console.error(err);
          setDishes([]);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchDishes();

    
  }, [selectedState, selectedDistrict]);

  

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
      className="absolute w-full min-h-screen flex flex-col items-center px-4"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />
      <div className="relative z-10 text-center w-full max-w-4xl mt-[10rem]">
        <h1 className="text-5xl font-bold mb-12 text-[#fdd9a0]">Select City wise food 🍱</h1>

        <select
          value={selectedState}
          onChange={handleStateChange}
          className="w-full max-w-md mb-6 px-6 py-3 rounded-full shadow-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#a28c79]"
        >
          <option value="">Select State</option>
          {data.states.map((item, index) => (
            <option key={index} value={item.state}>{item.state}</option>
          ))}
        </select>

        {selectedState && (
          <select
            value={selectedDistrict}
            onChange={handleDistrictChange}
            className="w-full max-w-md px-6 py-3 rounded-full shadow-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#a28c79]"
          >
            <option value="">Select District / City</option>
            {getDistricts().map((district, index) => (
              <option key={index} value={district}>{district}</option>
            ))}
          </select>
        )}

        <div className="mt-12">
          {!selectedState || !selectedDistrict ? (
            <div className="text-white text-xl">
              <p className="mb-6 text-2xl font-semibold text-[#fdd9a0]">Most Searched Places 🔥</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 px-4">
                {mostSearchedPlaces.map((place, index) => (
                  <div
                    key={index}
                    className="bg-[#a28c79]/80 text-white py-4 px-6 rounded-2xl shadow-lg hover:scale-105 hover:bg-[#a28c79] transition duration-200 cursor-pointer font-medium"
                    onClick={() => handleMostSearchedClick(place)}
                  >
                    {place.city}
                  </div>
                ))}
              </div>
            </div>
          ) : loading ? (
            <Spinner />
          ) : dishes.length > 0 ? (
            <div  className="grid gap-6 md:grid-cols-2">
              {dishes.map((dish) => (
                <div key={dish._id}  className="bg-white bg-opacity-90 p-6 rounded-2xl shadow-md text-left relative font-[Poppins] hover:cursor-pointer">
                  <div onClick={() => navigate(`/searchedDish/${dish.dishName}`)}>
                    <img  src={dish.img} alt={dish.dishName} className="w-full h-48 object-cover rounded-xl mb-4" />
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
            <div className="text-white text-xl mt-6">
              <p className="mb-6 text-2xl font-semibold text-[#fdd9a0]">No dishes found for this location</p>
            </div>
          )}
        </div>
      </div>
    
      <CustomToast />
    </div>
  );
};

export default City;
