const Award = require('../models/Award');

// @desc    Upload award images
// @route   POST /api/admin/upload
// @access  Admin (would normally protect this)
const uploadAwardImages = async (req, res) => {
    const { awardId, awardCategory, eventName, eventDate } = req.body;
    const images = req.files ? req.files.map(file => file.path) : [];

    try {
        let award = await Award.findOne({ awardId });

        if (award) {
            award.images = [...award.images, ...images];
            await award.save();
        } else {
            award = await Award.create({
                awardId,
                awardCategory,
                eventName,
                eventDate,
                images
            });
        }

        res.status(201).json(award);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { uploadAwardImages };
