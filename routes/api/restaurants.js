const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Restaurant = require('../../models/Restaurant');

// @route   POST api/restaurants
// @desc    Create a restaurant
// @access   Public
router.post('/', [
    check('name', "Name is required").not().isEmpty(),
    check('opendate', "Open Date is required").not().isEmpty(),
    check('active', "Active is required").not().isEmpty()
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ msg: errors.array() });
    }
    const { name, image, chef, openhour, opendate, rating, active } = req.body;
    try {
        const newRestaurant = new Restaurant({
            name,
            image,
            chef,
            openhour,
            opendate,
            rating,
            active
        });
        const restaurant = await newRestaurant.save();
        res.json(restaurant);

    } catch (err) {
        console.error(err.messgae);
        res.status(500).send('Server Error');
    }
});
// @route   Get api/restaurants
// @desc    Get all restaurants
// @access   Public
router.get('/', async (req, res) => {
    try {
        const restaurants = await Restaurant.find({active: true});
        res.json(restaurants);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   Get api/restaurants/top
// @desc    Get 3 top restaurants
// @access   Public
router.get('/top', async (req, res) => {
    try {
        const restaurants = await Restaurant.find({active: true}).sort({ rating: -1}).limit(3).populate({
            path: 'chef', model: 'chef', select: ['name']
        });
        res.json(restaurants);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   Get api/restaurants/:id
// @desc    Get restaurant
// @access   Public
router.get('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ msg: "Restaurant Not Found" });
        }
        res.json(restaurant);

    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') { //type of object id as req.param but not found
            return res.status(404).json({ msg: 'Restaurant not found ' });
        }
        res.status(500).send("Server Error");
    }

});

// @route   Delete api/restaurants/:id
// @desc    Delete Restaurant
// @access   Public
router.delete('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ msg: "Restaurant Not Found" });
        }
        await restaurant.remove();
        res.json("Restaurant Remove");
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: "Restaurant Not Found" });
        }
        res.status(500).send("Server Error");
    }
});

// @route   Put api/restaurants/:id
// @desc    Change Restaurant Details
// @access   Public
router.put("/:id", [
    check('name', "Name is required").not().isEmpty(),
    check('opendate', "Open Date is required").not().isEmpty(),
    check('active', "Active is required").not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ msg: errors.array() });
    }
    try {
        const { name, image, chef, openhour, opendate, rating, active } = req.body;
        let restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ msg: "Restaurant Not Found" });
        }
        restaurant.name = name;
        restaurant.image = image;
        restaurant.chef = chef;
        restaurant.openhour = openhour;
        restaurant.opendate = opendate;
        restaurant.rating = rating;
        restaurant.active = active;
        restaurant.save();
        res.json(restaurant);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: "Restaurant Not Found" });
        }
        res.status(500).send("Server Error");
    }

});

module.exports = router;