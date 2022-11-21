const express = require('express');
const router = express.Router();

const manpowerController = require('../controllers/manpowerController');
const { protect } = require('../middleware/authMiddleware');

router.get('/drivers', protect, manpowerController.getAllDrivers);
router.get('/loaders', protect, manpowerController.getAllLoaders);
router.post('/notAvailableDrivers', protect, manpowerController.getNotAvailableDrivers);
router.post('/notAvailableLoaders', protect, manpowerController.getNotAvailableLoaders);
router.post('/', protect, manpowerController.addManpower);
router.get('/', protect, manpowerController.getAllManpowers);
router.get('/:id', protect, manpowerController.getOneManpower);
router.put('/:id', protect, manpowerController.updateManpower);

module.exports = router;