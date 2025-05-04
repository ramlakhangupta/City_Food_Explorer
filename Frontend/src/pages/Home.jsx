import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { IoMdAdd } from "react-icons/io";
import ExploreMore from "../components/core/HomePage/ExploreMore"
import Cookies from "universal-cookie";
import backgroundImg1 from "../assets/Images/random bg img/bg 1.jpg";
import backgroundImg2 from "../assets/Images/random bg img/bg 2.jpg";
import backgroundImg3 from "../assets/Images/random bg img/bg 3.jpg";
import backgroundImg4 from "../assets/Images/random bg img/bg 4.jpg";
import backgroundImg5 from "../assets/Images/random bg img/bg 5.jpg";
import backgroundImg6 from "../assets/Images/random bg img/bg 6.jpg";
import backgroundImg7 from "../assets/Images/random bg img/bg 7.jpg";
import FoodAnimation from "../components/core/HomePage/FoodAnimation"
import Specialities from "../components/core/HomePage/Specialities"
import TypewriterText from "../components/core/HomePage/TypewriterText"
import DishOfTheDay from "../components/core/HomePage/DishOfTheDay"
import PersonalGreeting from "../components/core/HomePage/PersonalGreeting"
import CustomToast from "../components/common/CustomToast"

import { FaArrowRight } from "react-icons/fa"
import Footer from "../components/common/Footer.jsx";
import { motion } from 'framer-motion'
import { fadeIn, } from './../components/common/motionFrameVarients';
import { ToastContainer, toast } from 'react-toastify';
import Spinner from "../components/common/Spinner";


const cookies = new Cookies();

const randomImages = [
  backgroundImg1,
  backgroundImg2,
  backgroundImg3,
  backgroundImg4,
  backgroundImg5,
  backgroundImg6,
  backgroundImg7,
];

const Home = () => {
  const user = cookies.get('user');
  const token = cookies.get('token');

  

  const [backgroundImg, setBackgroundImg] = useState(null);

  useEffect(() => {
    const bg = randomImages[Math.floor(Math.random() * randomImages.length)];
    setBackgroundImg(bg);
  }, []);

  const handleClickOnAddDish = () => {

    if (!token || !user) {
      toast.success("Please Login First", {
        onClose: () => {
          window.location.href = '/login'
        },
        autoClose: 1500,
        position: 'top-right',
        closeOnClick: true,
        pauseOnHover: false,
        theme: 'colored'
      });
    } else {
      window.location.href = '/addDish'
    }
  }

  return (
    <React.Fragment>
      <div>
        <div className=" w-full min-h-screen md:h-[650px] absolute top-0 left-0 opacity-[1] overflow-hidden object-cover ">
          <img
            src={backgroundImg}
            alt="Background"
            className="w-full h-full  object-cover greyscale backdrop-contrast-200 filter blur-sm brightness-50 contrast-180 drop-shadow-lg"
          />

          <div className="absolute left-0 bottom-0 w-full h-[250px] opacity_layer_bg "></div>
        </div>
      </div>

    
<br/>
<br/>
<br/>
      <div className="  ">
     
        {/*Section1  */}
        <div className="relative h-[450px] md:h-[550px] justify-center mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white ">
          
            <div onClick = {handleClickOnAddDish}
              className="z-0 group p-1 hover:cursor-pointer mx-auto rounded-full bg-[#a28c79] font-bold text-[#ffffff]
                                    transition-all duration-200 hover:scale-95 w-fit"
              >
              <div
                className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
                          transition-all duration-200 group-hover:bg-[#f0c9a6] group-hover:text-[#000000]"
              >
                <p>Add Food</p>
                <FaArrowRight />
                
              </div>
            </div>
            <TypewriterText />
            

          <motion.div
            variants={fadeIn("left", 0.1)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.1 }}
            className="text-center text-3xl lg:text-4xl font-semibold mt-7 font-nosifer "
          >
            Food Discovery Hub
            
          </motion.div>

          <motion.div
            variants={fadeIn("right", 0.1)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.1 }}
            className=" mt-4 w-[90%] text-center text-base lg:text-lg font-bold text-richblack-300"
          >
           With our platform, you can share your favorite street foods and famous city dishes with the world. Upload mouth-watering delicacies, showcase hidden gems, and help food lovers discover new flavors. Become a valued contributor and celebrate the rich diversity of local cuisine! 🍽️
          </motion.div>
        </div>
      </div>
      <PersonalGreeting />

      <div className="relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center  text-white justify-between">
        <ExploreMore/>
      </div>
      <div >
       
        <FoodAnimation/>
        <Specialities/>
        <DishOfTheDay />
      </div>
        
        
      <div>
        <Footer/>
      </div>

     
      <CustomToast />
    </React.Fragment>
  )
}

export default Home;
