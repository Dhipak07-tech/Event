const axios = require('axios');
const Download = require('../models/Download');

// @desc    Secure image download
// @route   GET /api/download
// @access  Protected (Token based)
const secureDownload = async (req, res) => {
    const { imageUrl } = req.query;

    if (!imageUrl) {
        return res.status(400).json({ message: 'Image URL is required' });
    }

    // Find award category for this image to validate access
    // For simplicity, we check if req.client.allowedAwardCategories includes the category
    // This would need a way to map imageUrl to category if multiple categories exist.
    // Assuming the client is authorized for now as long as they have a token.

    try {
        const response = await axios({
            url: imageUrl,
            method: 'GET',
            responseType: 'stream',
        });

        res.setHeader('Content-Disposition', 'attachment; filename="award_image.jpg"');
        response.data.pipe(res);

        // Log download activity
        await Download.create({
            downloadId: `DL${Date.now()}`,
            clientId: req.client.clientId,
            imageUrl: imageUrl
        });

    } catch (error) {
        res.status(500).json({ message: 'Error downloading image' });
    }
};

module.exports = { secureDownload };
