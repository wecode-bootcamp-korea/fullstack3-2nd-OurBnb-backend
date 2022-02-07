const { reservationDao } = require('../models');

const postReservation = async (guestCount, checkIn, checkOut, userId, roomId) => {
  
  const isResvAvailable = (await reservationDao.roomReservationCheck(checkIn, checkOut,roomId)) ? false : true;

  if (!isResvAvailable) {
    const error = new Error('UNAVAILABLE RESERVATION PERIOD');
    error.statusCode = 400;
    throw error;
  }
  
  const isGuestNumAvailable = ((await reservationDao.guestMaxNumber(roomId)) >= guestCount) ? true : false;
  
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
  
const getReservation = async (userId) => {

  const reservationPast = await reservationDao.getReservation(userId, reservationType.PAST);
  const reservationOngoing = await reservationDao.getReservation(userId, reservationType.ONGOING);
  const reservationBooked = await reservationDao.getReservation(userId, reservationType.BOOKED);

  if (!reservation) {
    const error = new Error('GETTING RESERVATION FAILED');
    error.statusCode = 400;
    throw error;
  }

  return {reservationPast, reservationOngoing, reservationBooked};
}
                                                           
const updateReservation = async (guestCount, oldCheckIn, oldCheckOut, newCheckIn, newCheckOut, userId, roomId) => {

  const isGuestNumAvailable = ((await reservationDao.guestMaxNumber(roomId)) >= guestCount) ? true : false;
  
  if (!isGuestNumAvailable) {
    const error = new Error('GUEST COUNT OVER THE LIMIT');
    error.statusCode = 400;
    throw error;
  }

  const reservationResult = await reservationDao.updateReservation(guestCount, oldCheckIn, oldCheckOut, newCheckIn, newCheckOut, userId, roomId);  
  
  if (!reservationResult) {
    const error = new Error('UPDATING RESERVATION FAILED');
    error.statusCode = 400;
    throw error;
  }

  return reservationResult;
}
          
const deleteReservation = async (checkIn, checkOut, userId, roomId) => {
  
  // 처음에 해당하는 userId, roomId, checkIn, checkOut 에 딱맞는 reservation이 존재하는지 안하는지 체크
  const doesResvExist = (await reservationDao.userReservationCheck(checkIn, checkOut, userId, roomId)) ? true : false;

  // 존재하지 않는다면 에러처리 
  if (!doesResvExist) {
    const error = new Error('RESERVATION DOES NOT EXIST');
    error.statusCode = 400;
    throw error;
  }

  // 존재하면 해당 정보를 매개변수로 넘겨서 해당 예약내역을 데이터베이스 내에서 삭제 처리 
  const reservation = await reservationDao.deleteReservation(checkIn, checkOut, userId, roomId);

  if (!reservation) {
    const error = new Error('DELETING RESERVATION FAILED');
    error.statusCode = 400;
    throw error;
  }

  return reservation;
}

  module.exports = { postReservation, getReservation, updateReservation, deleteReservation };