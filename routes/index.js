const express = require('express');
const router = express.Router();
const roomRouter = require('./RoomRouter');
const reviewRouter = require('./ReviewRouter');
const userRouter = require('./UserRouter');
const wishlistRouter = require('./WishListRouter');

router.use('/rooms', roomRouter);
router.use('/reviews', reviewRouter);
router.use('/users', userRouter);
router.use('/wishlist', wishlistRouter);

module.exports = router;
