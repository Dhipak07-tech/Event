const express = require('express');
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const { uploadAwardImages } = require('../controllers/adminController');

const router = express.Router();
const upload = multer({ storage });

router.post('/upload', upload.array('images'), uploadAwardImages);

module.exports = router;
