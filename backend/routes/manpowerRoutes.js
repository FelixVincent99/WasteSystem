const express = require('express');
const router = express.Router();

const manpowerController = require('../controllers/manpowerController');
const { protect } = require('../middleware/authMiddleware');

router.post('/addManpower', protect, manpowerController.addManpower);
router.get('/allManpowers', protect, manpowerController.getAllManpowers);
router.get('/:id', protect, manpowerController.getOneManpower);
router.put('/:id', protect, manpowerController.updateManpower);
router.delete('/:id', protect, manpowerController.deleteManpower);

module.exports = router;