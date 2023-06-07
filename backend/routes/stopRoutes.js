const express = require('express');
const router = express.Router();

const stopController = require('../controllers/stopController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', stopController.addStop);
router.get('/', stopController.getAllStops);
router.get('/area/:id', stopController.getStopsAreaCode);
router.get('/:id', stopController.getOneStop);
router.put('/:id', stopController.updateStop);

module.exports = router;