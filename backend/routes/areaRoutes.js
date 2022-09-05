const express = require('express');
const router = express.Router();

const {createArea} = require('../controllers/areaController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createArea);

module.exports = router;