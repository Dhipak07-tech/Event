const mongoose = require('mongoose');

const downloadSchema = new mongoose.Schema({
    downloadId: { type: String, required: true, unique: true },
    clientId: { type: String, required: true },
    imageUrl: { type: String, required: true },
    downloadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Download', downloadSchema);
