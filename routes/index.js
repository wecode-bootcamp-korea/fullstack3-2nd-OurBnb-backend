const express = require('express');
const router = express.Router();
const roomRouter = require('./RoomRouter');
const userRouter = require('./UserRouter');
const wishlistRouter = require('./WishListRouter');
const reservationRouter = require('./ReservationRouter');
const reviewRouter = require('./ReviewRouter');

router.use('/rooms', roomRouter);
router.use('/users', userRouter);
router.use('/wishlist', wishlistRouter);
router.user('/reservation', authToken, reservationRouter);
router.user('/review', reviewRouter);

module.exports = router;
