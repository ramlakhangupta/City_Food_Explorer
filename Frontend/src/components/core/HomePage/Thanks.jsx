import React from 'react';
import backgroundImg from "../../../assets/loginbackground.jpg";
import {useNavigate} from "react-router-dom";

const Thanks = () => {
  const navigate = useNavigate();
  return (
    <div
      className="absolute flex items-center justify-center h-screen w-full bg-cover bg-center px-4 text-center "
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0" />
      
      <div className="bg-white shadow-lg rounded-xl p-10 max-w-lg z-10 bg-opacity-90 backdrop-blur-md">
        <h1 className="text-3xl font-bold text-[#a28c79] mb-4">Thanks for your Feedback!</h1>
        <p className="text-gray-700 text-lg">
          We appreciate your message and will review your suggestion soon. 🙏
        </p>
        
        <button className=" mt-11 w-[8rem] bg-[#a28c79] hover:bg-[#bd702d] hover:text-white font-semibold hover:font-bold rounded-md p-3 "  onClick={ () => navigate('/')}>
         Go back
        </button>
      </div>
    </div>
  );
};

export default Thanks;
