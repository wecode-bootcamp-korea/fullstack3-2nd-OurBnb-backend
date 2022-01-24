const { reservationDao } = require('../models');

const postReservation = async (userId, roomId, guestCount, checkIn, checkOut) => {
    const reservation = await reservationDao.postReservation(userId, roomId, guestCount, checkIn, checkOut);
  
    if (!reservation) {
      const error = new Error('MAKING RESERVATION FAILED');
      error.statusCode = 400;
      throw error;
    }
  
    return reservation;
  };
  
  module.exports = { postReservation };