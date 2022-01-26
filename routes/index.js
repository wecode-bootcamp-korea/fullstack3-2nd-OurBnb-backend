const express = require('express');
const router = express.Router();
const roomRouter = require('./RoomRouter');
const userRouter = require('./UserRouter');
const wishlistRouter = require('./WishListRouter');

router.use('/rooms', roomRouter);
router.use('/users', userRouter);
router.use('/wishlist', wishlistRouter);

module.exports = router;
