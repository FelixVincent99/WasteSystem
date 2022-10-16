const express = require('express');
const router = express.Router();

const { sendFromSensor } = require('../controllers/iotDevicesController');

router.get('/sendCollection', sendFromSensor);

module.exports = router;