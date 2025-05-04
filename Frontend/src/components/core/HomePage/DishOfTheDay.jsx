import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn } from "../../common/motionFrameVarients";
import { GiChefToque } from "react-icons/gi";

const backendUrl = process.env.REACT_APP_BASE_URL;

const DishOfTheDay = () => {
  const [dish, setDish] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDish = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/dish-of-the-day`);
        const data = await res.json();
        setDish(data);
      } catch (err) {
        console.error("Error fetching dish of the day:", err);
      }
    };

    fetchDish();
  }, []);

  if (!dish) return null;

  return (
    <motion.div
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.2 }}
      className="mb-[4rem] px-4 lg:px-0 w-full max-w-6xl mx-auto"
    >
      <div className="flex flex-col items-center text-center mb-8">
        <GiChefToque className="text-5xl text-[#ffce70] mb-2 animate-pulse" />
        <h2 className="text-4xl md:text-5xl font-bold text-[#f9d3b2] tracking-wide">
          Dish of the Day
        </h2>
        <p className="text-gray-200 mt-2 text-sm italic">
          Handpicked to delight your taste buds today 🍴
        </p>
      </div>

      <div className="backdrop-blur-xl bg-white/10 border border-[#e2c19e]/20 shadow-xl rounded-xl overflow-hidden flex flex-col md:flex-row">
        <img
          src={dish.img}
          alt={dish.dishName}
          className="w-full md:w-1/2 h-[300px] object-cover grayscale-0 transition duration-500 hover:scale-105"
        />
        <div className="p-6 md:w-1/2 flex flex-col justify-between gap-3 text-left">
          <h3 className="text-3xl font-bold text-[#ffca8b]">{dish.dishName}</h3>
          <p className="text-black/90 leading-relaxed">{dish.description}</p>
          <div className="text-sm text-black/70">
            <p>
              <strong>Price:</strong> ₹{dish.dishPrice}
            </p>
            <p>
              <strong>Shop:</strong> {dish.shopName}
            </p>
            <p>
              <strong>Location:</strong> {dish.shopLocation}
            </p>
          </div>
          <button
            className="mt-4 w-fit bg-[#f0c179] hover:bg-[#f6b23c] text-black font-semibold px-5 py-2 rounded-full transition-all duration-300 hover:scale-105"
            onClick={() => navigate(`/searchedDish/${dish.dishName}`)}
          >
            See Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default DishOfTheDay;
