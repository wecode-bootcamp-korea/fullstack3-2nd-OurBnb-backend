const express = require('express');
const router = express.Router();
const testController = require('../controllers');
const roomController = require('../controllers/roomController');

router.get('/', testController.testController);
router.get('/rooms/:location', roomController.getRoomList);
router.get('/conveniences', roomController.getConveniences);

module.exports = router;
