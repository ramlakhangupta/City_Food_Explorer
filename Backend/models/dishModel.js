const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
    dishName: String,
    dishPrice: String,
    img: String,
    description: String,
    shopName: String,
    category: String,
    shopLocation: String,
    cityName: String,
    cityState: String,
    likes: [
        {type: mongoose.Schema.Types.ObjectId, ref: "user"}
    ],
    comments: [{profileImage: String, username: String, comment: String}]
});

module.exports = mongoose.model('dish', dishSchema);