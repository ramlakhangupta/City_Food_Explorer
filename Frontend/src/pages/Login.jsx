import React, {useState} from 'react';
import Cookies from 'universal-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import backgroundImg from "../assets/loginbackground.jpg"
import CustomToast from "../components/common/CustomToast"


const cookies = new Cookies();
const backendUrl = process.env.REACT_APP_BASE_URL;


const Login = () => {

  const [formdata, setFormData] = useState( {
    email: '',
    password : '',
  });

  const handleChange = (e) => {
    setFormData({...formdata, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${backendUrl}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formdata)
      })
      const data = await res.json();

      if(data.token) {
        cookies.set('token', data.token);
        cookies.set('user', data.foundUser);
        toast.success("Login SuccessFully", {
          onClose: () => {
            window.location.href = '/'
          },
          autoClose: 1500,
          position: 'top-right',
          closeOnClick: true,
          pauseOnHover: false,
          theme: 'colored'
        });
      } else {
        toast.error(`${data.message}`, {
          autoClose: 1500,
          position: 'top-right',
          closeOnClick: true,
          pauseOnHover: false,
          theme: 'colored'
        })
      }
    } catch (error) {
      toast.error("Errors Occured", {
        autoClose: 1500,
        position: 'top-right',
        closeOnClick: true,
        pauseOnHover: false,
        theme: 'colored'
      })
    }
  };


  return (
    <div
      className=" w-full min-h-screen absolute bg-cover bg-center flex items-center justify-center px-4 md:h-[650px]  opacity-[1] "
      style={{ backgroundImage: `url(${backgroundImg})` }} // Make sure image is in /public folder
    >
      <div className="bg-white bg-opacity-90 shadow-xl mt-10 ml-[-20rem] rounded-xl w-full max-w-md p-8 backdrop-blur-sm">
        {/* Logo or Brand Name */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-[#a28c79]">Welcome back !!</h1>
          <p className="text-gray-600 mt-2">Please login to your account.</p>
        </div>

        {/* Login Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
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

          <div>
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

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 text-[#a28c79] focus:ring-[#a28c79] border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-[#a28c79] hover:text-[#8b7766]">
                Forgot your password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#a28c79] text-white py-2 px-4 rounded-lg shadow-md hover:text-[#000000] hover:bg-[#f0c9a6] hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 active:scale-95"
            
          >
            Sign in
          </button>
        </form>

        
      <CustomToast />

        {/* Divider */}
        <div className="mt-6 flex items-center justify-center">
          <span className="text-gray-500 text-sm">Don't have an account?</span>
          <Link to="/signup" className="ml-2 text-[#a28c79] font-medium hover:text-[#8b7766]">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
