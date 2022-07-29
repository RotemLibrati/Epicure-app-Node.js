const mongoose = require('mongoose');

const DishSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
        default: "https://cdn.pixabay.com/photo/2014/04/02/16/17/dish-306815_960_720.png"
    },
    description: {
        type: String,
        required: true
    },
    type: [
        {
            type: String,
            required: true
        }
    ],
    price: {
        type: Number,
        required: true
    },
    dishtime: [
        {
            type: String,
            required: true
        }
    ],
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurant'
    },
    active: {
        type: Boolean,
        default: true
    }
});

module.exports = Dish = mongoose.model('dish', DishSchema);