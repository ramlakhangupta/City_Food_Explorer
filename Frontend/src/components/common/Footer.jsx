import React from 'react'
import { FaFacebook, FaYoutube, FaInstagram, FaLinkedin } from 'react-icons/fa';
const Footer = () => {
  return (
    <div>
      <footer className="bg-[#3e3e3e] text-white py-10 px-4 md:px-20 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand Info */}
        <div>
          <h1 className="text-2xl font-bold text-[#eb9346]">City Food Explorer</h1>
          <p className="text-gray-400 mt-2">Discover the best tastes from every corner of your city.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-3 text-[#a28c79]">Quick Links</h2>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-[#a28c79]">Top Restaurants</a></li>
            <li><a href="#" className="hover:text-[#a28c79]">Street Food</a></li>
            <li><a href="#" className="hover:text-[#a28c79]">Blog</a></li>
            <li><a href="#" className="hover:text-[#a28c79]">Contact Us</a></li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h2 className="text-xl font-semibold mb-3 text-[#a28c79]">Follow Us</h2>
          <div className="flex gap-4 text-2xl text-gray-300">
            <a href="#" className="hover:text-[#a28c79]"><FaFacebook /></a>
            <a href="#" className="hover:text-[#a28c79]"><FaInstagram /></a>
            <a href="#" className="hover:text-[#a28c79]"><FaYoutube /></a>
            <a href="#" className="hover:text-[#a28c79]"><FaLinkedin /></a>
          </div>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-600 mt-8 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} City Food Explorer. All rights reserved.
      </div>
    </footer>
    </div>
  )
}

export default Footer
