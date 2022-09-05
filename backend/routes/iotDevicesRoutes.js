const express = require('express');
const router = express.Router();

const {sendFromSensor} = require('../controllers/iotDevicesController');

router.post('/sendFromSensor', sendFromSensor);

module.exports = router;