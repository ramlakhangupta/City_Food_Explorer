const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    profileImage: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
    },
    password: String,
    gender: String,
    state: String,
    city: String,
    occupation: String,
    aboutMe: String,
    mobileNo: String,
    address: String,
    likedDishes: [
        {type: mongoose.Schema.Types.ObjectId, ref: "dish"}
    ],
    savedDishes: [
        {type: mongoose.Schema.Types.ObjectId, ref: "dish"}
    ]
})

module.exports = mongoose.model('user', userSchema);