import React from "react";
import { motion } from "framer-motion";
import doodhMan from "../../../assets/doodhman.png";
import foodCart from "../../../assets/foodCart.png";

const FoodAnimation = () => {
  return (
    <div className="relative w-full h-screen bg-gray-100 flex items-end justify-center overflow-hidden">
      
      {/* Doodh Man Animation */}
      <motion.img
        src={doodhMan}
        alt="Doodh Man"
        className="absolute ml-[-38rem] mb-[17rem] w-[23rem] h-auto"
        initial={{opacity: 0.9 }} // Start screen ke bahar se
        animate={{ opacity: 1, scale: [1, 1.05, 1] }} // Truck ke samne rukega
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror"  }}
    
      />

      {/* Food Truck Animation */}
      <motion.img
        src={foodCart}
        alt="Food Truck"
        className="absolute top-0 p-7 mr-[-15rem] w-[38rem] h-auto"
        initial={{ opacity: 0.9 }}
        animate={{ opacity: 1, scale: [1, 1.05, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror" }}
      />
    </div>
  );
};

export default FoodAnimation;
