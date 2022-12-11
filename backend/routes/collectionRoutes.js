const express = require('express');
const router = express.Router();

const collecitonController = require('../controllers/collectionController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', collecitonController.getAllCollections);

module.exports = router;