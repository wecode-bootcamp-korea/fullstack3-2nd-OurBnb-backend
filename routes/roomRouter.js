const express = require('express');
const router = express.Router();

const { roomController, roomDetailController, reservationController } = require('../controllers');
const { checkToken } = require('../middleware/auth');

router.get('/', checkToken, roomController.getRoomList);
router.get('/options', roomController.getOptions);

router.get('/detail', roomDetailController.getRoomDetail);
router.get('/images', roomDetailController.getAllImgsByRoomId);

module.exports = router;
