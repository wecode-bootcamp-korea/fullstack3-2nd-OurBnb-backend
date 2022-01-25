const { reservationDao } = require('../models');

const postReservation = async (guestCount, checkIn, checkOut, userId, roomId) => {
    const reservation = await reservationDao.postReservation(guestCount, checkIn, checkOut, userId, roomId);
  
    if (!reservation) {
      const error = new Error('MAKING RESERVATION FAILED');
      error.statusCode = 400;
      throw error;
    }
  
    return reservation;
  };
  
  module.exports = { postReservation };