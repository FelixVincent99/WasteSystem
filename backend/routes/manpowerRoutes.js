const express = require('express');
const router = express.Router();

const manpowerController = require('../controllers/manpowerController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, manpowerController.addManpower);
router.get('/', protect, manpowerController.getAllManpowers);
router.get('/:id', protect, manpowerController.getOneManpower);
router.put('/:id', protect, manpowerController.updateManpower);

module.exports = router;