const mongoose = require("mongoose");

const dishCategorySchema = mongoose.Schema({
    dishTaste: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('dishCategory', dishCategorySchema);