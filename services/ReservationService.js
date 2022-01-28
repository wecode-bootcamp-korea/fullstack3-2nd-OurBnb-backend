const { reservationDao } = require('../models');

const postReservation = async (guestCount, checkIn, checkOut, userId, roomId) => {
  
    const isResvAvailable = (await reservationDao.getReservationForCheck(roomId, checkIn, checkOut)) ? false : true;
  
    if (!isResvAvailable) {
      const error = new Error('UNAVAILABLE RESERVATION PERIOD');
      error.statusCode = 400;
      throw error;
    }
   
    const isGuestNumAvailable = ((await reservationDao.getGuestMaxNumber(roomId)) >= guestCount) ? true : false;
   
    if (!isGuestNumAvailable) {
      const error = new Error('GUEST COUNT OVER THE LIMIT');
      error.statusCode = 400;
      throw error;
    }

    const reservationResult = await reservationDao.postReservation(guestCount, checkIn, checkOut, userId, roomId);  
   
    if (!reservationResult) {
      const error = new Error('MAKING RESERVATION FAILED');
      error.statusCode = 400;
      throw error;
    }

    return reservationResult;
  };
  
  module.exports = { postReservation };