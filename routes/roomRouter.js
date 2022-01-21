const express = require('express');
const router = express.Router();

const { roomController, roomDetailController } = require('../controllers');

router.get('/options', roomController.getOptions);
router.get('/:location', roomController.getRoomList);

router.get('/detail', roomDetailController.getRoomDetail);

module.exports = router;
