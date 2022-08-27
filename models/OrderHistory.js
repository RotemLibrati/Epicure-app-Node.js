const mongoose = require('mongoose');

const OrderHistorySchema = new mongoose.Schema({
    orders: [
        {
            order: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'order'
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurant'
    },
    price: {
        type: Number,
        required: true
    }
});

module.exports = OrderHistory = mongoose.model('order_history', OrderHistorySchema);