const express = require('express');
const router = express.Router();
const roomRouter = require('./RoomRouter');
const reviewRouter = require('./ReviewRouter');
const userRouter = require('./UserRouter');
const wishlistRouter = require('./WishListRouter');
const reservationRouter = require('./ReservationRouter');

router.use('/rooms', roomRouter);
router.use('/reviews', reviewRouter);
router.use('/users', userRouter);
router.use('/wishlist', wishlistRouter);
router.use('/reservation', reservationRouter);

module.exports = router;
