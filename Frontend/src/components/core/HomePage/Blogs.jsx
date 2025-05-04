import React from 'react';
import ReactPlayer from 'react-player';

import backgroundImage from "../../../assets/loginbackground.jpg";

const Blogs = () => {
  return (
    <div
      className="absolute w-full min-h-screen overflow-auto text-gray-100"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto mt-[5rem] px-6 py-10">
        <h1 className="text-5xl font-bold text-center text-[#fdd9a0] mb-10">Welcome to City Food Explorer 🍽️</h1>

        <p className="text-xl text-center max-w-3xl mx-auto mb-12 text-white">
          City Food Explorer is your gateway to discovering mouth-watering street food experiences from across the country.
          From spicy chaats of Delhi to buttery pav bhaji of Mumbai and the tangy puchkas of Kolkata, we bring you closer to the real flavors of India’s streets.
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-[#fdd9a0]">Why We Love Street Food</h2>
            <p className="text-white">
              Street food is more than just a meal — it’s a cultural expression, a tradition passed down generations, and the heartbeat of every Indian city.
              Each bite tells a story, and we’re here to share those stories with you.
            </p>
            <p className="text-white">
              Whether you're a food blogger, a traveler, or a local food lover, our platform helps you explore hidden gems and share your own food discoveries with others.
            </p>
          </div>

          <div className="grid sm:grid-cols-1 gap-6">
            <div className="relative h-[200px] w-full bg-gradient-to-r from-[#1f1f1f] via-[#2e2e2e] to-[#1f1f1f] rounded-xl shadow-lg overflow-hidden backdrop-blur-sm">
              <div className="absolute inset-0 bg-black bg-opacity-50 z-10 backdrop-blur-md"></div>
              <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center">
                <p className="text-lg font-semibold text-[#feb240] animate-pulse">🎬 Exciting food stories coming soon...</p>
                <p className="text-sm text-gray-300">Stay tuned for immersive video experiences</p>
              </div>
            </div>
          </div>

        </div>

        {/* 🌟 More About Us Section */}
        <div className="mt-20 space-y-12">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-[#fdd9a0] mb-4">Our Mission 🚀</h2>
            <p className="text-lg text-white max-w-4xl mx-auto">
              Our mission is to create the largest community of street food lovers, explorers, and storytellers who can share their unique food experiences and celebrate the local culinary treasures of India. 
              We aim to empower vendors, preserve traditions, and promote local food businesses through digital storytelling.
            </p>
          </div>

          <div className="text-center">
            <h2 className="text-4xl font-bold text-[#fdd9a0] mb-4">Our Vision 👀</h2>
            <p className="text-lg text-white max-w-4xl mx-auto">
              To become the go-to platform for every food explorer who wants to discover authentic city flavors — one plate at a time. From digital maps to real-time vendor reviews, we are constantly evolving to make your food journey easier, tastier, and unforgettable.
            </p>
          </div>

          <div className="text-center">
            <h2 className="text-4xl font-bold text-[#fdd9a0] mb-4">Community & Impact 🤝</h2>
            <p className="text-lg text-white max-w-4xl mx-auto">
              With thousands of food lovers joining us from every corner of the country, our community thrives on the spirit of sharing. We actively collaborate with local NGOs, street food festivals, and influencers to promote hygiene, sustainability, and authenticity.
            </p>
          </div>
        </div>

        {/* 👥 Contributors */}
        <div className="mt-20">
          <h2 className="text-3xl font-semibold text-[#fdd9a0] text-center mb-6">Meet Our Contributors</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white bg-opacity-90 shadow-md rounded-xl p-6 text-gray-800">
              <h3 className="text-xl font-bold text-[#a28c79]">Rohit Sharma</h3>
              <p className="text-sm mt-2">Street Food Enthusiast from Indore sharing his spicy finds and desi flavors.</p>
            </div>
            <div className="bg-white bg-opacity-90 shadow-md rounded-xl p-6 text-gray-800">
              <h3 className="text-xl font-bold text-[#a28c79]">Ananya Desai</h3>
              <p className="text-sm mt-2">Food vlogger exploring hidden food lanes in Gujarat.</p>
            </div>
            <div className="bg-white bg-opacity-90 shadow-md rounded-xl p-6 text-gray-800">
              <h3 className="text-xl font-bold text-[#a28c79]">Amit Khan</h3>
              <p className="text-sm mt-2">Hyderabadi biryani lover capturing flavors on camera and heart.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
