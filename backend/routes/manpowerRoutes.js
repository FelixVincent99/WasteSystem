const express = require('express');
const router = express.Router();

const manpowerController = require('../controllers/manpowerController');
const { protect } = require('../middleware/authMiddleware');

router.get('/drivers', protect, manpowerController.getAllDrivers);
router.get('/loaders', protect, manpowerController.getAllLoaders);
router.post('/notAvailableDrivers', protect, manpowerController.getNotAvailableDrivers);
router.post('/notAvailableLoaders', protect, manpowerController.getNotAvailableLoaders);
router.post('/leaves', manpowerController.addManpowerLeaves);
router.get('/leaves', manpowerController.getAllManpowerLeaves);
router.get('/leave/:id', manpowerController.getOneManpowerLeave);
router.put('/leave/:id', manpowerController.updateManpowerLeave);
router.post('/defaultAvailableDrivers', protect, manpowerController.getDefaultAvailableDrivers);
router.post('/defaultAvailableLoaders', protect, manpowerController.getDefaultAvailableLoaders);
router.post('/', protect, manpowerController.addManpower);
router.get('/', protect, manpowerController.getAllManpowers);
router.get('/:id', protect, manpowerController.getOneManpower);
router.put('/:id', protect, manpowerController.updateManpower);

module.exports = router;