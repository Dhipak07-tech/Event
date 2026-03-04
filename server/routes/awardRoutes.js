const express = require('express');
const { getAwards, getAwardImagesByCategory } = require('../controllers/awardController');

const router = express.Router();

router.get('/', getAwards);
router.get('/:category/images', getAwardImagesByCategory);

module.exports = router;
