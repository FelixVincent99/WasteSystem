const express = require('express');
const router = express.Router();

const areaController = require('../controllers/areaController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, areaController.addArea);
router.get('/', protect, areaController.getAllAreas);
router.get('/:id', protect, areaController.getOneArea);
router.put('/:id', protect, areaController.updateArea);

module.exports = router;