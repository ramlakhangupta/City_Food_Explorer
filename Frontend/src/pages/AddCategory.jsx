import React, { useState } from "react";
import Cookies from "universal-cookie";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import backgroundImg from "../assets/loginbackground.jpg";
import CustomToast from "../components/common/CustomToast";
import Spinner from "../components/common/Spinner"; // <-- custom spinner

const backendUrl = process.env.REACT_APP_BASE_URL;
const cookies = new Cookies();

function AddCategory() {
  const [formdata, setFormdata] = useState({ dishTaste: '' });
  const [loading, setLoading] = useState(false); // <-- loading state

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = cookies.get('token');

    if (!token) {
      return toast.error("Token not found, Login First", {
        onClose: () => { window.location.href = '/login' },
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: false,
        theme: 'colored'
      });
    }

    setLoading(true); // start loading
    try {
      const res = await fetch(`${backendUrl}/api/addCategory`, {
        method: "POST",
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formdata)
      });

      if (res.ok) {
        toast.success("Category added successfully", {
          onClose: () => { window.location.href = '/addCategory' },
          autoClose: 1000,
          closeOnClick: true,
          pauseOnHover: false,
          theme: 'colored'
        });
      } else {
        toast.error("Error in adding the category", {
          autoClose: 1000,
          closeOnClick: true,
          pauseOnHover: false,
          theme: 'colored'
        });
      }
    } catch (error) {
      toast.error("Server Error", {
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: false,
        theme: 'colored'
      });
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center absolute"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="bg-[#c29c74]/530 bg-opacity-70 backdrop-blur-md rounded-xl p-10 w-full max-w-xl shadow-2xl text-white">
        <a
          href="/profile"
          className="inline-block mb-6 px-6 py-2 text-white font-semibold bg-gradient-to-r from-orange-5 to-black-5 rounded-full hover:scale-105 transition-transform duration-300 shadow-md"
        >
          ⬅ Back to Profile
        </a>

        <h1 className="text-4xl font-bold mb-6 text-center text-[#f38d34] drop-shadow-md">Add New Category 🍽️</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            name="dishTaste"
            value={formdata.dishTaste}
            onChange={handleChange}
            placeholder="Enter Category Name..."
            required
            className="p-3 rounded-lg bg-white/50 placeholder:text-[#3d3c3b] border border-[#000000] focus:outline-none focus:ring-4 focus:ring-[#ffba7e]/30 text-[#000000]"
          />

          <button
            type="submit"
            className="py-3 rounded-lg bg-[#b8916f] hover:bg-[#db873c] hover:text-black text-white font-semibold text-lg shadow-lg transform hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? <Spinner size={20} color="#fff" /> : "Add Category"}
          </button>
        </form>
      </div>

      <CustomToast />
    </div>
  );
}

export default AddCategory;
