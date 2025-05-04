import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation  } from "react-router-dom";

import Home from "./pages/Home.jsx";
 import Login from "./pages/Login"
 import Signup from "./pages/Signup"
import City from "./pages/City";
import Food from "./pages/Food";
import Dishes from "./pages/Dishes";
import AddCategory from "./pages/AddCategory.jsx";
import AddDish from "./pages/AddDish.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

import Navbar from "./components/common/Navbar"
import ContactUs from "./components/core/HomePage/ContactUs";
import Blogs from "./components/core/HomePage/Blogs";
import Thanks from "./components/core/HomePage/Thanks";
import { HiArrowNarrowUp } from "react-icons/hi"





function App() {

    // Scroll to the top of the page when the component mounts
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname])

    // useEffect(() => {
    //     scrollTo(0, 0);
    // }, [location])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])


    // Go upward arrow - show , unshow
    const [showArrow, setShowArrow] = useState(false)

    const handleArrow = () => {
        if (window.scrollY > 500) {
        setShowArrow(true)
        } else setShowArrow(false)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleArrow);
        return () => {
        window.removeEventListener('scroll', handleArrow);
        }
    }, [showArrow])


    // const  { user } = useSelector( (state) => state.profile)
    return (  
       <div className="w-screen min-h-screen  flex flex-col font-mono"> 
            <Navbar/>

            {/* go upward arrow */}
            <button onClick={() => window.scrollTo(0, 0)}
                className={`bg-[#c19a78] hover:bg-[#cd7f3b] hover:scale-110 p-3 text-lg text-black rounded-2xl fixed right-3 z-10 duration-500 ease-in-out ${showArrow ? 'bottom-6' : '-bottom-24'} `} >
                <HiArrowNarrowUp />
            </button>
            
            <Routes> 
                <Route path="/" element={<Home />} />
                <Route path="/searchDishesCityWise" element={<City />} />
                <Route path="/searchDishesCategorywise" element={<Food />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/addDish" element={<AddDish />} />
                <Route path="/addCategory" element={<AddCategory />} />
                <Route path="/searchedDish/:dishName" element={<Dishes />} />
                <Route path="/thank-you" element={<Thanks />} />

            </Routes>
       </div>
    );
}

export default App;