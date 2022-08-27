const express = require('express');
const router = express.Router();
const OrderHistory = require('../../models/OrderHistory');

// @route   POST api/orders-history
// @desc    Post new history orders
// @access   Public
router.post('/', async (req, res) => {
    try {
        const { orders, price, restaurant } = req.body;
        const newOrder = new OrderHistory({
            orders,
            price,
            restaurant
        });
        const order = await newOrder.save();
        console.log("order", order);
        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   GET api/orders-history
// @desc    Get All Orders
// @access   Public
router.get('/', async (req, res) => {
    try {
        const orders = await OrderHistory.find().populate([
            {path: 'restaurant'},
            {path: 'orders', populate: { path: 'order', populate: 'dish'}}
        ]);
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;