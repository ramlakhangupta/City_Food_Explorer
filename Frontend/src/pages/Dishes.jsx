import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import backgroundImg from "../assets/loginbackground.jpg";
import {
  BiSolidLike,
  BiLike,
  BiBookmark,
  BiSolidBookmark,
} from "react-icons/bi";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FaRegCommentDots, FaRegShareSquare } from "react-icons/fa";
import { SlClose } from "react-icons/sl";
import CustomToast from "../components/common/CustomToast"
import Spinner from "../components/common/Spinner";

const backendUrl = process.env.REACT_APP_BASE_URL;
const cookies = new Cookies();

const Dishes = () => {
  const { dishName } = useParams();
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentOpen, setCommentOpen] = useState(null);
  const [commentData, setCommentData] = useState({ comment: "" });
  const [currentUser, setCurrentUser] = useState(cookies.get("user"));

  const user = cookies.get("user");
  const token = cookies.get("token");

  useEffect(() => {
    const fetchDish = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/searchedDish/${dishName}`);
        setDish(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dish:", error);
        setLoading(false);
      }
    };
    fetchDish();
  }, [dishName]);

  if (loading) return <Spinner />
  if (!dish) return <div className="text-center text-white mt-10">Dish not found</div>;

  const handleLike = async (dishId) => {
    if (!token || !user) return toast.info("Login first");
    try {
      const res = await fetch(`${backendUrl}/api/${dishId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user._id }),
      });
      const updatedDish = await res.json();
      setDish(updatedDish);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (dishId) => {
    if (!token || !user) return toast.info("Login first");

    const isAlreadySaved = user?.savedDishes?.includes(dishId);
    const updatedSavedDishes = isAlreadySaved
      ? user?.savedDishes?.filter((id) => id !== dishId)
      : [...(user?.savedDishes || []), dishId];

    try {
      const res = await fetch(`${backendUrl}/api/${dishId}/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user._id }),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success(isAlreadySaved ? "Dish unsaved successfully" : "Dish saved successfully");
      
        const updatedUser = {
          ...currentUser,
          savedDishes: updatedSavedDishes,
        };
      
        cookies.set("user", updatedUser, { path: "/" });
        setCurrentUser(updatedUser); // <-- THIS TRIGGERS RE-RENDER
      }
       else {
        toast.error(result.message || "Error updating saved dish");
      }
    } catch (err) {
      console.error("Save Error:", err);
      toast.error("Something went wrong while saving");
    }
  };

  const handleCommentToggle = () => {
    setCommentOpen(!commentOpen);
  };

  const handleChange = (e) => {
    setCommentData({ ...commentData, [e.target.name]: e.target.value });
  };

  const postComment = async () => {
    if (!token || !user) return toast.info("Login first");
    try {
      const res = await fetch(`${backendUrl}/api/${dish._id}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...commentData, userId: user._id }),
      });
      const updatedDish = await res.json();
      setDish(updatedDish);
      setCommentData({ comment: "" });
    } catch (err) {
      console.error(err);
    }
  };

  const handleShare = () => {
    const link = `${window.location.origin}/searchedDish/${dish.dishName}`;
    navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard");
  };

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center text-white px-8 py-16 absolute"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="absolute inset-0 bg-black/60 z-0" />

      
      <div className="relative mt-12 z-10 max-w-5xl mx-auto">
      <h1 className="text-5xl mb-8 items-center flex justify-center font-bold text-[#feb240]">Your searched Dish {dish.dishName} </h1>
        <img
          src={dish.img}
          alt={dish.dishName}
          className="w-full max-h-[450px] object-cover rounded-xl shadow-lg mb-8"
        />
        
        <p className="text-xl mb-2 text-white/90">
          <span className="font-semibold text-[#f4963d]">Shop:</span> {dish.shopName}
        </p>
        <p className="text-xl mb-2 text-white/90">
          <span className="font-semibold text-[#f4963d]">Location:</span> {dish.shopLocation}
        </p>
        <p className="text-xl mb-6 text-white/90">
          <span className="font-semibold text-[#f4963d]">Price:</span> ₹{dish.dishPrice}
        </p>
        <p className="text-white/95  text-lg leading-relaxed mb-8"> <span className="text-[#f4963d]"> Description : </span>
          {dish.description || "No description provided for this dish."}
        </p>

        <div className="flex gap-6 text-3xl items-center mb-6">
          <button onClick={() => handleLike(dish._id)} className="hover:text-green-400">
            {dish.likes.includes(user?._id) ? <BiSolidLike /> : <BiLike />}
          </button>
          <span className="text-sm text-white">{dish.likes.length}</span>

          <button onClick={() => handleSave(dish._id)} className="hover:text-yellow-400">
            {currentUser?.savedDishes?.includes(dish._id) ? <BiSolidBookmark /> : <BiBookmark />}

          </button>

          <button onClick={handleCommentToggle} className="hover:text-blue-400">
            <FaRegCommentDots />
          </button>
          <span className="text-sm text-white">{dish.comments.length}</span>

          <button onClick={handleShare} className="hover:text-purple-400">
            <FaRegShareSquare />
          </button>
        </div>

        {commentOpen && (
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-2xl font-bold text-[#feb240]">Comments</h3>
              <SlClose onClick={() => setCommentOpen(false)} className="cursor-pointer" />
            </div>
            <div className="max-h-52 overflow-y-auto space-y-2 mb-4">
              {[...dish.comments].reverse().map((c, i) => (
                <div key={i} className="bg-white/20 rounded-md p-2">
                  <strong>{c.username}</strong>
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
                className="flex-1 p-2 rounded-l-md bg-white/80 text-black outline-none"
              />
              <button
                onClick={postComment}
                className="bg-[#c5a352] hover:bg-[#f5cc66] text-white px-4 rounded-r-md"
              >
                Post
              </button>
            </div>
          </div>
        )}
      </div>

   
      <CustomToast />
    </div>
  );
};

export default Dishes;
