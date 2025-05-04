import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import backgroundImg from "../assets/loginbackground.jpg";
import CustomToast from "../components/common/CustomToast"

const backendUrl = process.env.REACT_APP_BASE_URL;

const Signup = () => {

    const [formdata, setFormdata] = useState({
      name:'',
      email:'',
      password:''
    });

    const handleChange = (e) => {
      setFormdata({...formdata, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      await fetch(`${backendUrl}/api/signup`, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(formdata)
      }). then(async (res) => {
        if(res.ok) {
          console.log("User Registered Successfully");
          toast.success("User Registered Successfully", {
            onClose: () => {
              window.location.href = '/login';
            },
            autoClose: 2000,
            position: 'bottom-right',
            closeOnClick: 'true',
            pauseOnHover: 'false',
            theme:'colored'
          })
        } else {
          console.log("User already Registered");
          toast.warn("User already Registered", {
            autoClose: 2000,
            position: 'bottom-right',
            closeOnClick: true,
            pauseOnHover: false,
            theme: 'colored'
          })
        }
      }).catch( (err) => {
          console.log("server error");
          toast.error("Server Error", {
            autoClose: 2000,
            position: 'bottom-right',
            closeOnClick: true,
            pauseOnHover: false,
            theme: 'colored'
        })
      });
    };

  return (
    <div
      className="w-full absolute min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="bg-white bg-opacity-90 shadow-xl rounded-xl w-full max-w-2xl mt-[4rem] mr-[25rem] p-10 backdrop-blur-sm">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-[#a28c79]">Welcome to City Food Explorer !!</h1>
          <p className="text-gray-600 mt-2">Please fill all the details.</p>
        </div>

        {/* Signup Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formdata.name}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a28c79]"
              placeholder="Ramlakhan Gupta"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={formdata.email} 
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a28c79]"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Flex Passwords */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password" 
                value={formdata.password}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a28c79]"
                placeholder="••••••••"
                required
              />
            </div>

          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-[#a28c79] text-white py-2 px-4 rounded-lg shadow-md hover:text-[#000000] hover:bg-[#f0c9a6] hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 active:scale-95"
          >
            Create Account
          </button>
        </form>

       
      <CustomToast />


        {/* Login link */}
        <div className="mt-6 flex items-center justify-center">
          <span className="text-gray-500 text-sm">Already have an account?</span>
          <Link to="/login" className="ml-2 text-[#a28c79] font-medium hover:text-[#8b7766]">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup; 