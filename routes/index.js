const express = require('express');
const router = express.Router();
const roomRouter = require('./roomRouter');
const userRouter = require('./UserRouter'); 

router.use('/rooms', roomRouter);

router.use('/users', userRouter);

module.exports = router;
