const express = require('express');
const router = express.Router();

const areaController = require('../controllers/areaController');
const { protect } = require('../middleware/authMiddleware');

router.post('/addArea', protect, areaController.addArea);
router.get('/allAreas', protect, areaController.getAllAreas);
router.get('/:id', protect, areaController.getOneArea);
router.put('/:id', protect, areaController.updateArea);
router.delete('/:id', protect, areaController.deleteArea);

module.exports = router;