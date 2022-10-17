const express = require('express');
const router = express.Router();

const scheduleController = require('../controllers/scheduleController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', scheduleController.addSchedule);
router.get('/', scheduleController.getAllSchedules);
router.get('/:id', scheduleController.getOneSchedule);
router.put('/:id', scheduleController.updateSchedule);

module.exports = router;