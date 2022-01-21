const express = require('express');
const router = express.Router();
const roomRouter = require('./roomRouter');

router.use('/rooms', roomRouter);

module.exports = router;
