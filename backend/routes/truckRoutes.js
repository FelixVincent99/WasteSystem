const express = require('express');
const router = express.Router();

const truckController = require('../controllers/truckController');
const { protect } = require('../middleware/authMiddleware');

router.post('/unavailability', truckController.addTruckUnavailability);
router.get('/unavailability', truckController.getAllTruckUnavailability);
router.get('/unavailability/:id', truckController.getOneTruckUnavailability);
router.put('/unavailability/:id', truckController.updateTruckUnavailability);
router.post('/notAvailableTrucks', truckController.getNotAvailableTrucks);
router.post('/', protect, truckController.addTruck);
router.get('/', protect, truckController.getAllTrucks);
router.get('/:id', protect, truckController.getOneTruck);
router.put('/:id', protect, truckController.updateTruck);

module.exports = router;