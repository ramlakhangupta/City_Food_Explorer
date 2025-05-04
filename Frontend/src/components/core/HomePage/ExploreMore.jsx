import React, { useEffect, useState } from "react";
import FoodCard from "./FoodCard";
import { FaAngleDown } from "react-icons/fa6";

const tabsName = [
  "Recommended Dishes",
  "Most Searched dishes",
  "Top Rated Dishes",
];

const backendUrl = process.env.REACT_APP_BASE_URL;

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);

  useEffect(() => {
    fetchData(currentTab);
  }, [currentTab]);

  const fetchData = async (tab) => {
    let endpoint = "";
    switch (tab) {
      case "Recommended Dishes":
        endpoint = "/api/allDishes/all"; // top liked
        break;
      case "Most Searched dishes":
        endpoint = "/api/tenlikedDishes"; // use all, slice later
        break;
      case "Top Rated Dishes":
        endpoint = "/api/likedDishes"; // again top liked for now
        break;
      default:
        endpoint = "/api/tenlikedDishes";
    }

    try {
      const res = await fetch(`${backendUrl}${endpoint}`);
      const data = await res.json();
      setCards(data);
      if (data.length > 0) setCurrentCard(data[0].dishName);
    } catch (error) {
      console.error("Error fetching dishes:", error);
    }
  };

  return (
    <div className="min-h-[50rem] w-full text-black">
      <div className="mt-[8rem] text-center text-3xl lg:text-4xl font-semibold font-nosifer my-10">
        Discover New Flavors with Your Experience
      </div>

      {/* Tabs */}
      <div className="hidden lg:flex gap-5 mx-auto w-max bg-[#a28c79] text-white p-1 rounded-full font-medium shadow-md">
        {tabsName.map((ele, index) => (
          <div
            key={index}
            className={`text-[16px] flex items-center gap-2 px-7 py-[7px] rounded-full cursor-pointer transition-all duration-200 ${
              currentTab === ele
                ? "bg-[#f0c9a6] text-black"
                : "hover:bg-[#f0c9a6]/70 hover:text-black"
            }`}
            onClick={() => setCurrentTab(ele)}
          >
            {ele}
            <FaAngleDown className="text-sm" />
          </div>
        ))}
      </div>

      {/* Cards */}
      <div className="mt-10 overflow-x-auto scrollbar-hide pb-10 ">
        <div className="flex gap-6 w-max px-4">
          {cards.map((dish, index) => (
            <FoodCard
              key={index}
              cardData={{
                heading: dish.dishName,
                location: dish.shopLocation,
                image: dish.img,
                description: dish.description,
                city: dish.cityName,
                taste: dish.category,
                price: `₹${dish.dishPrice}`,
              }}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            />
          ))}
        </div>
      </div>

    </div>
  );
};

export default ExploreMore;
