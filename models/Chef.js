const mongoose = require("mongoose");

const ChefSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imgae: { 
        type: String,
        required: true,
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    },
    description: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    }
});

module.exports = Chef = mongoose.model("chef", ChefSchema);