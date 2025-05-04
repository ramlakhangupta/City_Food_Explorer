import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import data from "../data/stateDistrict.js";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import backgroundImg from "../assets/loginbackground.jpg";
import CustomToast from "../components/common/CustomToast"
import Spinner from "../components/common/Spinner";


const backendUrl = process.env.REACT_APP_BASE_URL;
const cookies = new Cookies();

function AddDish() {
  const navigate = useNavigate();
  const user = cookies.get('user');

  const [formData, setFormData] = useState({
    dishName: '',
    dishPrice: '',
    description: '',
    shopName: '',
    category: '',
    shopLocation: '',
    cityName: '',
    cityState: '',
  });

  const [loading, setLoading] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [cityList, setCityList] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!cookies.get('token')) {
      navigate('/login');
    }

    // Fetch categories from backend
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/categories/all`);
        const data = await response.json();
        if (response.ok) {
          setCategories(data); // Set the categories list in state
        } else {
          toast.error("Failed to fetch categories");
        }
      } catch (error) {
        toast.error("Network Error");
      }
    };

    fetchCategories();
  }, [navigate]);

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "cityState") {
      const selectedState = data.states.find(s => s.state === value);
      setCityList(selectedState ? selectedState.districts : []);
      setFormData(prev => ({ ...prev, cityName: '' }));
    }
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = cookies.get("token");
  
    if (!token) {
      toast.error("Please Login First", {
        onClose: () => { window.location.href = '/login'; },
        autoClose: 1000,
        theme: 'colored'
      });
      return;
    }
    

    try {
      const form = new FormData();
      for (let key in formData) {
        form.append(key, formData[key]);
      }
      if (selectedImage) {
        form.append('img', selectedImage);
      }
  
      const res = await fetch(`${backendUrl}/api/addDish/${user?._id}`, {
        method: 'POST',
        headers: {
          'Authorization': token // ✅ Only needed header
        },
        body: form
      });
  
      const data = await res.json();
      console.log(data);
      
      if (res.ok) {
        toast.success("your request sent to admin for approval", {
          onClose: () => navigate('/'), // ✅ Move navigation here
          autoClose: 1500,
          theme: 'colored'
        });
      } else {
        toast.error("Please Fill Again the request form ", {
          autoClose: 1500,
          theme: 'colored'
        });
      }
    } catch (error) {
      toast.error("Network Error", {
        autoClose: 1500,
        theme: 'colored'
      });
    } finally {
    }
  };


  if(loading) {
    return (
      <div className="">
        <Spinner />
      </div>
    );
  }



  return (
    <div className="absolute w-full min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${backgroundImg})` }}>
      
      <div className="bg-white mt-24 bg-opacity-90 shadow-xl rounded-xl w-full max-w-2xl p-8 backdrop-blur-sm">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-[#a28c79]">Create Request</h1>
          <p className="text-gray-600 mt-2">Fill out form to submit dish request.</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Input Fields */}
          {['dishName', 'dishPrice', 'shopName', 'shopLocation'].map(field => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a28c79]"
              />
            </div>
          ))}

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a28c79]"
            >
              <option value="">Select Category</option>
              {categories.length > 0 ? (
                categories.map((category, index) => (
                  <option key={index} value={category.dishTaste}>
                    {category.dishTaste} 
                  </option>
                ))
              ) : (
                <option disabled>No categories available</option>
              )}
            </select>
          </div>

          {/* State and City */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">State</label>
              <select
                name="cityState"
                value={formData.cityState}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a28c79]"
              >
                <option value="">Select State</option>
                {data.states.map((stateItem, idx) => (
                  <option key={idx} value={stateItem.state}>
                    {stateItem.state}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">City</label>
              <select
                name="cityName"
                value={formData.cityName}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a28c79]"
              >
                <option value="">Select City</option>
                {cityList.map((city, idx) => (
                  <option key={idx} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg file:bg-[#a28c79] file:text-white file:border-0"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a28c79]"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            
            className="w-full bg-[#a28c79] text-white py-2 px-4 rounded-lg hover:bg-[#f0c9a6] transition-all"
          >
            Submit Request
          </button>
        </form>
        
        
      
      </div>

      <CustomToast />
    </div>
  );
}

export default AddDish;
