const express = require('express');
const router = express.Router();

const { roomController, roomDetailController } = require('../controllers');

router.get('/', roomController.getRoomList);
router.get('/options', roomController.getOptions);

router.get('/detail', roomDetailController.getRoomDetail);

module.exports = router;
