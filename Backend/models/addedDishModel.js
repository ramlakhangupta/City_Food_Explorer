const mongoose = require("mongoose");

const addDishSchema = new mongoose.Schema({
    dishName: String,
    dishPrice: String,
    img: String,
    description: String,
    shopName: String,
    category: String,
    shopLocation: String,
    cityName: String,
    cityState: String,
    userInfo: {type: mongoose.Schema.Types.ObjectId, ref : "user"},
    status: {type: String, default: "pending"}
})

module.exports = mongoose.model('addedDish', addDishSchema);