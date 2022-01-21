const express = require('express');
const router = express.Router();

const { roomController } = require('../controllers');

router.get('/options', roomController.getOptions);
router.get('/:location', roomController.getRoomList);

module.exports = router;
