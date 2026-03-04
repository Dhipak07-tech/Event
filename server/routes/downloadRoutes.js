const express = require('express');
const { secureDownload } = require('../controllers/downloadController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, secureDownload);

module.exports = router;
