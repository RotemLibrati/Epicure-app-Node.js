const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    dish:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'dish'
    },
    payment: {
        type: Boolean,
        required: false,
        default: false
    }
});

module.exports = Order = mongoose.model('order', OrderSchema);
