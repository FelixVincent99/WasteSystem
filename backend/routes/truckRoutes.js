const express = require('express');
const router = express.Router();

const truckController = require('../controllers/truckController');
const { protect } = require('../middleware/authMiddleware');

router.post('/addTruck', protect, truckController.addTruck);
router.get('/allTrucks', protect, truckController.getAllTrucks);
router.get('/:id', protect, truckController.getOneTruck);
router.put('/:id', protect, truckController.updateTruck);
router.delete('/:id', protect, truckController.deleteTruck);

module.exports = router;