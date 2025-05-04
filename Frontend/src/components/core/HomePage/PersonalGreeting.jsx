// components/core/HomePage/PersonalGreeting.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { motion } from "framer-motion";
import { fadeIn } from "../../common/motionFrameVarients";

const cookies = new Cookies();

const PersonalGreeting = () => {
  const navigate = useNavigate();
  const user = cookies.get("user");

  return (
    <motion.div
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.1 }}
      className="mt-16 bg-[#a28c79]/80 rounded-2xl shadow-xl w-[90%] md:w-[80%] mx-auto p-8 text-white text-center"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        {user ? `Hi, ${user.name}! 👋` : "Welcome Foodie! 🍽️"}
      </h2>
      <p className="text-lg mb-6">
        {user
          ? "Explore your city's best food spots or share your own hidden gems!"
          : "Start discovering tasty dishes from your area now!"}
      </p>
      <button
        onClick={() => navigate("/searchDishesCityWise")}
        className="bg-[#f0c9a6] hover:bg-[#ffe3c2] text-black font-semibold py-2 px-6 rounded-full shadow-md transition-all"
      >
        {user ? "Explore Dishes" : "Get Started"}
      </button>
    </motion.div>
  );
};

export default PersonalGreeting;
