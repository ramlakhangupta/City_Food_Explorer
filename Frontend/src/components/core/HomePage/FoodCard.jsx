import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FoodCard = ({ cardData, currentCard, setCurrentCard }) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setCurrentCard(cardData?.heading);
  };

  const handleDetailsClick = (e) => {
    e.stopPropagation(); // card toggle na ho
    navigate(`/searchedDish/${cardData?.heading}`);
  };

  return (
    <div
      className={`min-w-[400px] max-w-[400px] max-h-[22rem] h-full lg:w-[30%] ${
        currentCard === cardData?.heading
          ? "bg-white shadow-[1px_12px_12px_12px] shadow-[#dbac84]"
          : "bg-richblack-800"
      } text-richblack-25 box-border cursor-pointer rounded-xl overflow-hidden flex flex-col justify-between`}
      onClick={handleClick}
    >
      {/* Top Section */}
      <div className="border-b-[2px] border-richblack-400 border-dashed p-4 flex flex-col gap-2">
        <div
          className={`flex justify-between ${
            currentCard === cardData?.heading && "text-richblack-800"
          } font-semibold text-[18px]`}
        >
          <span>{cardData?.heading}</span>
          <p className="text-xs text-right">{cardData?.location}</p>
        </div>

        <img
          className="h-[150px] w-full object-cover rounded-md"
          src={cardData?.image}
          alt="Food"
        />

        <div className="text-richblack-600 text-sm">
          {expanded
            ? cardData?.description
            : cardData?.description.slice(0, 40) + "..."}
          {cardData?.description.length > 40 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(!expanded);
              }}
              className="text-blue-500 text-xs ml-2"
            >
              {expanded ? "Show Less" : "Show More"}
            </button>
          )}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col px-4 py-3 gap-2">
        <div
          className={`flex justify-between text-sm font-medium ${
            currentCard === cardData?.heading
              ? "text-blue-300"
              : "text-richblack-300"
          }`}
        >
          <p>City: {cardData?.city}</p>
          <p>Taste: {cardData?.taste}</p>
          <p>{cardData?.price}</p>
        </div>

        <button
          onClick={handleDetailsClick}
          className="mt-2 bg-[#dbac84] text-black text-sm px-3 py-1 rounded-lg hover:bg-[#c5956b] transition-all duration-200 w-max self-end"
        >
          See in Details →
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
