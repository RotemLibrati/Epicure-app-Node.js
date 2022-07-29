const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Dish = require('../../models/Dish');
const Restaurant = require('../../models/Restaurant');

// @route   POST api/dishes
// @desc    Create a Dishes
// @access   Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description should be min 2 characters').isLength({ min: 2 }),
    check('price', 'Price is required').not().isEmpty(),
    check('restaurant', 'Restaurant is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ msg: errors.array() });
    }
    // make sure restaurant is exist
    const { name, image, description, type, price, dishtime, restaurant, active } = req.body;
    try {
        const newDish = new Dish({
            name,
            image,
            description,
            type,
            price,
            dishtime,
            restaurant,
            active
        });
        const dish = await newDish.save();
        res.json(dish);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') { //type of object id as req.param but not found
            return res.status(404).json({ msg: 'Restaurant not found ' });
        }
        res.status(500).send("Server Error");
    }
});

// @route   GET api/dishes
// @desc    Get all Dishes
// @access   Public
router.get('/', async (req, res) => {
    try {
        const dishes = await Dish.find({active: true});
        res.json(dishes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   GET api/dishes
// @desc    Get all Dishes
// @access   Public
router.get('/top', async (req, res) => {
    try {
        const dishes = await Dish.find({active: true}).limit(3);
        res.json(dishes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   GET api/dishes/:id
// @desc    Get Dish By Id
// @access   Public
router.get('/:id', async (req, res) => {
    try {
        const dish = await Dish.findById(req.params.id);
        if (!dish) {
            res.status(404).json({ msg: "Dish Not Found" });
        }
        res.json(dish);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: "Dish Not Found" });
        }
        res.status(500).send("Server Error");
    }
});

// @route   DELETE api/dishes/:id
// @desc    Delete Dish By Id
// @access   Public

router.delete('/:id', async (req, res) => {
    try {
        const dish = await Dish.findById(req.params.id);
        if (!dish) {
            res.status(404).json({ msg: "Dish Not Found" });
        }
        await dish.remove();
        res.send("Dish removed");
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: "Dish Not Found" });
        }
        res.status(500).send("Server Error");
    }
});




module.exports = router;