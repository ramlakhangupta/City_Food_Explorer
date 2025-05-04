const express = require("express");
const router = express.Router();
const dish = require('../models/dishModel');
const user = require('../models/userModel');
const addedDish = require('../models/addedDishModel');
const category = require('../models/dishCategory');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const dotenv = require("dotenv");
const upload = require('../middleware/multer');

dotenv.config();

// File Upload
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); 
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });
// const upload = multer({ storage });

// ------------------ ROUTES ------------------ //

// 🔥 CATEGORY FETCH
router.get('/categories/all', async (req, res) => {
  try {
    const cate = await category.find();
    res.json(cate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔥 Top 4 Liked Dishes
router.get('/likedDishes', async (req, res) => {
  try {
    const dishesList = await dish.find().sort({ "likes.length": -1 }).limit(4);
    res.json(dishesList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔥 Top 10 Liked Dishes
router.get('/tenlikedDishes', async (req, res) => {
  try {
    const dishesList = await dish.find().sort({ "likes.length": -1 }).limit(10);
    res.json(dishesList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔥 Dishes by Category
router.get('/category/:category', async (req, res) => {
  try {
    const dishesList = await dish.find({ category: req.params.category });
    if (!dishesList.length) return res.status(404).json({ message: 'No dishes found in this category' });
    res.json(dishesList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔥 Search Dish
router.get('/searchedDish/:dishName', async (req, res) => {
  try {
    const dishName = req.params.dishName;

    // Case-insensitive and full word match
    const dishItem = await dish.findOne({
      dishName: { $regex: `^${dishName}$`, $options: 'i' }
    });

    if (!dishItem) return res.status(404).json({ message: 'No dish found' });
    res.status(200).json(dishItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔥 Get All Dishes
router.get('/allDishes/all', async (req, res) => {
  try {
    const allDishes = await dish.find();
    res.status(200).json(allDishes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔥 Dish of the Day
router.get('/dish-of-the-day', async (req, res) => {
  try {
    const allDishes = await dish.find().sort({ "likes.length": -1 }).limit(10);
    if (allDishes.length === 0) return res.status(404).json({ message: "No dishes found" });

    const randomIndex = Math.floor(Math.random() * allDishes.length);
    res.status(200).json(allDishes[randomIndex]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




// GET /api/city-dishes/:state/:city
router.get('/city-dishes/:state/:city', async (req, res) => {
  const { state, city } = req.params;

  try {
    const dishesList = await dish.find({
      cityState: state,
      cityName: city
    });

    if (!dishesList.length) {
      return res.status(404).json({ message: 'No dishes found for this location' });
    }

    res.status(200).json(dishesList);
  } catch (error) {
    console.error("Error in fetching city-wise dishes:", error);
    res.status(500).json({ message: 'Server error while fetching dishes' });
  }
});

// ------------------ AUTH ROUTES ------------------ //

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  const foundUser = await user.findOne({ email });
  
  if (foundUser && !foundUser.isDeleted) {
    return res.status(400).json({ message: 'User already registered' });
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const createUser = new user({ name, email, password: hash });

  try {
    await createUser.save();
    res.status(200).json(createUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔥 Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const foundUser = await user.findOne({ email });
    if (!foundUser) return res.json({ message: 'Incorrect email or password' });

    const validPassword = await bcrypt.compare(password, foundUser.password);
    if (!validPassword) return res.json({ message: 'Incorrect email or password' });

    const token = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, foundUser });
  } catch (error) {
    res.json({ message: error.message });
  }
});

// Add new category
router.post('/addCategory', auth, async (req, res) => {
  const {dishTaste} = req.body;
  const newCategory = new category({
    dishTaste
  });

  try {
      await newCategory.save();
      res.status(200).json();
  } catch (error) {
      console.error("Error occured : ", error);
      res.status(500).json();
  }
})

// ------------------ DISH ROUTES ------------------ //

// 🔥 Add New Dish (Admin/User)
router.post('/addDish/:userID', upload.single('img'), async (req, res) => {
  const { dishName, dishPrice, description, shopName, category, shopLocation, cityName, cityState } = req.body;
  const userID = req.params.userID;

  // ✅ Correct: Use 'path' to get the Cloudinary URL
  const imageUrl = req.file ? req.file.path : '';

  try {
    const foundUser = await user.findById(userID);

    if (foundUser.email === process.env.ADMIN_EMAIL) {
      const newDish = new dish({ dishName, dishPrice, img: imageUrl, description, shopName, category, shopLocation, cityName, cityState });
      await newDish.save();
      return res.status(200).json({ message: "Dish added successfully" });
    } else {
      const newDish = new addedDish({ dishName, dishPrice, img: imageUrl, description, shopName, category, shopLocation, cityName, cityState, userInfo: foundUser._id });
      await newDish.save();
      return res.status(200).json({ message: "Dish sent to Admin for review" });
    }
  } catch (error) {
    console.error("Error while adding dish: ", error);
    return res.status(500).json({ message: error.message });
  }
});


// 🔥 Like Dish
router.post('/:id/like', auth, async (req, res) => {
  const dishId = req.params.id;
  const { userId } = req.body;

  try {
    const foundDish = await dish.findById(dishId);
    const foundUser = await user.findById(userId);

    if (!foundDish.likes.includes(userId)) {
      foundDish.likes.push(userId);
      await foundDish.save();

      foundUser.likedDishes.push(dishId);
      await foundUser.save();
    } else {
      foundDish.likes = foundDish.likes.filter(id => id.toString() !== userId);
      foundUser.likedDishes = foundUser.likedDishes.filter(id => id.toString() !== dishId);
      await foundDish.save();
      await foundUser.save();
    }
    res.status(200).json(foundDish);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔥 Save Dish
router.post('/:id/save', auth, async (req, res) => {
  const dishId = req.params.id;
  const { userId } = req.body;

  try {
    const foundUser = await user.findById(userId);

    if (!foundUser.savedDishes.includes(dishId)) {
      foundUser.savedDishes.push(dishId);
    } else {
      foundUser.savedDishes = foundUser.savedDishes.filter(id => id.toString() !== dishId);
    }
    await foundUser.save();
    res.status(200).json({ message: "Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔥 Comment on Dish
router.post('/:id/comment', auth, async (req, res) => {
  const dishId = req.params.id;
  const { comment, userId } = req.body;

  try {
    const foundDish = await dish.findById(dishId);
    const foundUser = await user.findById(userId);

    foundDish.comments.push({ profileImage: foundUser.profileImage, username: foundUser.name, comment });
    await foundDish.save();
    res.status(200).json(foundDish);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔥 Fetch liked & saved dishes
router.get('/likedSavedDishes/:userId', async (req, res) => {
  try {
    const foundUser = await user.findById(req.params.userId).populate(['likedDishes', 'savedDishes']);
    res.status(200).json(foundUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔥 Remove Saved Dish
router.post('/RemoveSavedDish/:dishId', auth, async (req, res) => {
  
  try {
    const dishId = req.params.dishId;
    const userId = req.body.userId;
    const foundUser = await user.findById(userId);

    if(!foundUser) return res.status(404).json({message: "user not found"});
    if(!dishId) return res.status(404).json({message: "dish not found"});

    if(foundUser.savedDishes.includes(dishId)){
      foundUser.savedDishes = foundUser.savedDishes.filter(id => id.toString() !== dishId);
      await foundUser.save();
    }
    res.status(200).json({ message: "Dish Unsaved" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔥 Fetch User Added Dishes
router.get('/dishAddedByUser/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const dishesFound = await addedDish.find({ userInfo: userId });
    if(!dishesFound) return res.status(404).json({message: "No dish added by you"});
    
    res.status(200).json(dishesFound);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔥 Admin - Fetch Pending Dishes
router.get('/addedDish/adminPage', async (req, res) => {
  try {
    let dishesFound = await addedDish.find({ status: "pending" });

    if(!dishesFound) return res.status(404).json({message: "No dish added by user"});
    res.status(200).json(dishesFound);
  } catch (error) {
    console.log("Server Error : ", error);
    res.status(500).json({ message: error.message });
  }
});

// 🔥 Admin - Accept Dish
router.post('/addedDish/:dishId', async (req, res) => {
  const dishId = req.params.dishId;

  try {
    const foundDish = await addedDish.findById(dishId);

    const newDish = new dish({
      dishName: foundDish.dishName,
      dishPrice: foundDish.dishPrice,
      img: foundDish.img,
      description: foundDish.description,
      shopName: foundDish.shopName,
      category: foundDish.category,
      shopLocation: foundDish.shopLocation,
      cityName: foundDish.cityName,
      cityState: foundDish.cityState,
    })

    await newDish.save();

    foundDish.status = "Added✅";
    await foundDish.save();

    await addedDish.findByIdAndDelete(dishId);
    res.status(200).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔥 Admin - Reject Dish
router.post('/addedDish/rejected/:dishId', async (req, res) => {
  try {
    await addedDish.findByIdAndDelete(req.params.dishId);
    res.status(200).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
