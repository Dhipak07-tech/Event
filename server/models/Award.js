const mongoose = require('mongoose');

const awardSchema = new mongoose.Schema({
    awardId: { type: String, required: true, unique: true },
    awardCategory: { type: String, required: true },
    eventName: { type: String, required: true },
    eventDate: { type: Date, required: true },
    images: [{ type: String }], // Array of Cloudinary URLs
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Award', awardSchema);
