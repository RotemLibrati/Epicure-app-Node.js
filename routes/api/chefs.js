const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Chef = require('../../models/Chef');


// @route   POST api/chefs
// @desc    Create a chef
// @access   Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description should be more than 2 charachters').isLength({ min: 2 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ msg: errors.array() });
    }
    const { name, image, description, active } = req.body;
    try {
        const newChef = new Chef({
            name,
            image,
            description,
            active
        });
        const chef = await newChef.save();
        res.json(chef);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   GET api/chefs
// @desc    Get all chefs
// @access   Public
router.get('/', async (req, res) => {
    try {
        const chefs = await Chef.find({active: true});
        res.json(chefs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   GET api/chefs/:id
// @desc    Get all chefs
// @access   Public
router.get('/:id', async (req, res) => {
    try {
        const chef = await Chef.findById(req.params.id);
        if (!chef) {
            return res.status(404).json({ msg: "Chef Not Found" });
        }
        res.json(chef);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') { //type of object id as req.param but not found
            return res.status(404).json({ msg: 'Chef not found ' });
        }
        res.status(500).send("Server Error");
    }
});

// @route   DELETE api/chefs/:id
// @desc    Delete chef by id
// @access   Public
router.delete('/:id', async (req, res) => {
    try {
        const chef = await Chef.findById(req.params.id);
        if (!chef) {
            return res.status(404).json({ msg: "Chef Not Found" });
        }
        await chef.remove();
        res.send("Chef removed");
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') { //type of object id as req.param but not found
            return res.status(404).json({ msg: 'Chef not found ' });
        }
        res.status(500).send("Server Error");
    }
});

router.put("/:id", [
    check('name', "Name is required").not().isEmpty(),
    check('description', 'Description should be more than 2 charachters').isLength({ min: 2 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ msg: errors.array() });
    }
    try {
        const { name, image, description, active } = req.body;
        let chef = await Chef.findById(req.params.id);
        if (!chef) {
            return res.status(404).json({ msg: "Chef Not Found" });
        }
        chef.name = name;
        chef.image = image;
        chef.description = description;
        chef.active = active;
        chef.save();
        res.json(chef);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: "Chef Not Found" });
        }
        res.status(500).send("Server Error");
    }

});
module.exports = router;