const express = require('express');
const router = express.Router();

const stopController = require('../controllers/stopController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, stopController.addStop);
router.get('/', protect, stopController.getAllStops);
router.get('/area/:id', protect, stopController.getStopsAreaCode);
router.get('/:id', protect, stopController.getOneStop);
router.put('/:id', protect, stopController.updateStop);

module.exports = router;