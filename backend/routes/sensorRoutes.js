const express = require('express');
const router = express.Router();

const sensorController = require('../controllers/sensorController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, sensorController.addSensor);
router.get('/', protect, sensorController.getAllSensors);
router.get('/:id', protect, sensorController.getOneSensor);
router.put('/:id', protect, sensorController.updateSensor);

module.exports = router;