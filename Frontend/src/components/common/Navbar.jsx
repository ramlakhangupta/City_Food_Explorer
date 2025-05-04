import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cityFoodExploreImg from "../../assets/Cityfoodexplorelogo.png";
import Cookies from 'universal-cookie';
import { FaUserCog, FaTachometerAlt, FaSignOutAlt } from "react-icons/fa";

const cookies = new Cookies();

const Navbar = () => {
  let user = cookies.get('user') || null;
  const location = useLocation();
  const matchRoute = (route) => location.pathname === route;

  const [showNavbar, setShowNavbar] = useState('top');
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY) setShowNavbar('hide');
      else setShowNavbar('show');
    } else setShowNavbar('top');
    setLastScrollY(window.scrollY);
  };

  return (
    <nav className={`z-[10] h-14 w-11/12 flex items-center mt-3 ${showNavbar}`}>
      <div className="w-[20%] ml-10 flex items-center">
        <Link to="/" className="flex items-center">
          <img src={cityFoodExploreImg} width={250} height={50} loading="lazy" className="ml-[-2rem]" />
          <div className="no-underline ml-[-5.4rem]">
            <h2 className="font-extrabold text-white text-xl leading-tight font-nosifer">ITY FOOD</h2>
            <h2 className="font-extrabold text-white text-xl leading-tight font-nosifer">EXPLORER</h2>
          </div>
        </Link>
      </div>

      <div className="flex ml-6 w-[55%] h-[64px] items-center justify-evenly bg-[#F9D3B2] border-b-[1px] translate-y-0 transition-all rounded-lg">
        <ul className="flex space-x-20 justify-evenly items-center">
          <Link to="/"><li className="font-semibold text-xl hover:cursor-pointer hover:text-white">Home</li></Link>
          <Link to="/searchDishesCityWise"><li className="font-semibold text-xl hover:cursor-pointer hover:text-white">City</li></Link>
          <Link to="/searchDishesCategoryWise"><li className="font-semibold text-xl hover:cursor-pointer hover:text-white">Food</li></Link>
          <Link to="/blogs"><li className="font-semibold text-xl hover:cursor-pointer hover:text-white">Blogs</li></Link>
          <Link to="/contact-us"><li className="font-semibold text-xl hover:cursor-pointer hover:text-white">Contact us</li></Link>
        </ul>
      </div>

      <div className='flex gap-x-4 items-center'>
        {user ? (
          <div className="relative flex items-end justify-end ml-[4rem] gap-3 group">
            <span className="hover:cursor-pointer flex items-center p-2 rounded-lg transition-all duration-300 group-hover:bg-transparent">
              <div className="sm:w-14 sm:h-14 w-12 h-5 rounded-full overflow-hidden border-2 border-[#a28c79] shadow-lg group-hover:border-[#f0c9a6]">
                <img src={user.profileImage} alt="User Profile" className="w-full h-full object-cover" />
              </div>

              <span className="sm:ml-4 ml-3 text-xl font-extrabold text-white group-hover:text-[#f0c9a6] transition-all duration-300 flex items-center gap-2">
                {user.name}
                {user.role === 'admin' && (
                  <span className="text-xs bg-red-600 text-white px-2 py-1 rounded-full font-bold">
                    🛡️ Admin
                  </span>
                )}
              </span>
            </span>

            <div className="absolute top-[110%] right-0 hidden group-hover:flex flex-col bg-[#f9d3b2] shadow-2xl rounded-xl p-4 min-w-[200px] z-30 transition-all duration-500 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 opacity-0 group-hover:delay-150">
              <a href="/profile" className="flex items-center gap-3 text-gray-700 font-semibold px-4 py-2 hover:bg-[#ffe7cf] rounded-md transition-all duration-300">
                <FaTachometerAlt className="text-[#9d816a]" />
                Dashboard
              </a>
              <a href="/profile" className="flex items-center gap-3 text-gray-700 font-semibold px-4 py-2 hover:bg-[#ffe7cf] rounded-md transition-all duration-300">
                <FaUserCog className="text-[#9d816a]" />
                Settings
              </a>
              <button
                onClick={() => {
                  cookies.remove('user');
                  window.location.href = '/login';
                }}
                className="flex items-center gap-3 text-red-500 font-semibold px-4 py-2 hover:bg-[#ffe7cf] rounded-md transition-all duration-300 text-left"
              >
                <FaSignOutAlt className="text-red-500" />
                Logout
              </button>
            </div>
          </div>
        ) : (
          <>
            <Link to="/login">
              <button
                className={`px-[20px] py-[12px] ml-[5rem] text-[#363232] font-bold text-[18px] transition-all duration-200 hover:bg-[#f0c9a6] rounded-xl hover:scale-95 hover:border-[3px] hover:border-caribbeangreen-900
                ${matchRoute('/login') ? 'border-[5px] bg-[#f0c9a6]' : 'border border-richblack-700 bg-[#9d816a]'}`}
              >
                Login
              </button>
            </Link>

            <Link to="/signup">
              <button
                className={`px-[18px] py-[11px] ml-[1rem] text-[#363232] font-bold text-[18px] transition-all duration-200 hover:bg-[#f0c9a6] rounded-xl hover:scale-95 hover:border-[3px] hover:border-caribbeangreen-900
                ${matchRoute('/signup') ? 'border-[5px] bg-[#f0c9a6]' : 'border border-richblack-700 bg-[#9d816a]'}`}
              >
                Signup
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
