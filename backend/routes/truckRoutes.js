const express = require('express');
const router = express.Router();

const truckController = require('../controllers/truckController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, truckController.addTruck);
router.get('/', protect, truckController.getAllTrucks);
router.get('/:id', protect, truckController.getOneTruck);
router.put('/:id', protect, truckController.updateTruck);

module.exports = router;