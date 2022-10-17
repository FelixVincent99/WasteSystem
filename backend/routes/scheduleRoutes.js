const express = require('express');
const router = express.Router();

const scheduleController = require('../controllers/scheduleController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, scheduleController.addSchedule);
router.get('/', protect, scheduleController.getAllSchedules);
router.get('/:id', protect, scheduleController.getOneSchedule);
router.put('/:id', protect, scheduleController.updateSchedule);

module.exports = router;