import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImg from '../../../assets/loginbackground.jpg';

const ContactUs = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can also handle actual backend form submission here
    navigate('/thank-you');
  };

  return (
    <div
      className="absolute w-full min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="bg-white mt-14 mr-[28rem] bg-opacity-90 shadow-xl rounded-xl w-full max-w-2xl p-8 backdrop-blur-sm">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-[#a28c79]">Contact Us</h1>
          <p className="text-gray-600 mt-2">We would love to hear from you!</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a28c79]"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label htmlFor="number" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              id="number"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a28c79]"
              placeholder="1234567890"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a28c79]"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              id="message"
              rows="4"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a28c79]"
              placeholder="Your message..."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-[#a28c79] text-white py-2 px-4 rounded-lg shadow-md hover:text-black hover:bg-[#f0c9a6] hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 active:scale-95"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
