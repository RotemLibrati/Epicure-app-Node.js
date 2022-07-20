const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    image: { 
        type: String
    },
    chef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chef'
    },
    openhour: {
        type: Number
    },
    opendate: {
        type: Date,
        required: true
    },
    rating: {
        type: Number
    },
    active: {
        type: Boolean,
        required: true
    }
});

module.exports  = Restaurant = mongoose.model('restaurant', RestaurantSchema);