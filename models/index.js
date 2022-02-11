const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = prisma;

const userDao = require('./UserDao');
const roomDao = require('./RoomDao');
const roomDetailDao = require('./RoomDetailDao');
const roomReviewDao = require('./RoomReviewDao');
const reservationDao = require('./ReservationDao');
const wishlistDao = require('./WishListDao');

module.exports = { userDao, roomDao, roomDetailDao, roomReviewDao, reservationDao, wishlistDao };
