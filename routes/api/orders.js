const express = require('express');
const router = express.Router();
const Order = require('../../models/Order');

// @route   POST api/orders
// @desc    Create a Order
// @access   Public
router.post('/', async (req, res) => {
    try {
        const { dish, payment } = req.body;
        const newOrder = new Order({
            dish,
            payment
        });
        const order = await newOrder.save();
        res.json(order)
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   GET api/orders
// @desc    Get All Orders
// @access   Public
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().populate({
            path: 'dish', populate: { path: 'restaurant', model: 'restaurant', select: ['name'] }, select: ['name', 'price']
        });
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   GET api/orders/payment
// @desc    Get All Orders
// @access   Public
router.get('/payment', async (req, res) => {
    try {
        const orders = await Order.find({ payment: false }).populate({
            path: 'dish', populate: { path: 'restaurant', model: 'restaurant', select: ['name'] }, select: ['name', 'image', 'price']
        });
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


module.exports = router;