const Award = require('../models/Award');

// @desc    Fetch all awards
// @route   GET /api/awards
// @access  Public
const getAwards = async (req, res) => {
    try {
        const awards = await Award.find({}).select('awardCategory eventName eventDate');
        res.json(awards);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Fetch images by category
// @route   GET /api/awards/:category/images
// @access  Public
const getAwardImagesByCategory = async (req, res) => {
    try {
        const award = await Award.findOne({ awardCategory: req.params.category });
        if (award) {
            res.json(award.images);
        } else {
            res.status(404).json({ message: 'Award category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAwards, getAwardImagesByCategory };
