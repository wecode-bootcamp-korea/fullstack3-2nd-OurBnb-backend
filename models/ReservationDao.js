const { reservationService } = require('../services');
const { reservationBuilder } = require('./queryBuilder')
const prisma = require('./index');

const createReservation = async (guestCount, checkIn, checkOut, userId, roomId) => {
  return await prisma.$queryRaw`
    INSERT INTO
      reservations (guest_count, check_in, check_out, user_id, room_id)
    VALUES 
      (${guestCount}, ${checkIn}, ${checkOut}, ${userId}, ${roomId}) 
  `; 
}

const roomReservationCheck = async (checkIn, checkOut, roomId) => {
  const [reservation] = await prisma.$queryRaw`
    SELECT
      reservations.room_id AS roomId,
      users.id AS userId,
      reservations.check_in AS checkIn,
      reservations.check_out AS checkOut
    FROM reservations
    JOIN users ON reservations.user_id = users.id
    WHERE
      ((DATE(${checkIn}) >= reservations.check_in AND DATE(${checkIn}) <= reservations.check_out) 
      OR (DATE(${checkOut}) >= reservations.check_in AND DATE(${checkOut}) <= reservations.check_out)
      OR (DATE(${checkIn}) <= reservations.check_in AND DATE(${checkOut}) >= reservations.check_out))
    AND
      reservations.room_id = ${roomId}
  `;
  return reservation; 
}

const getGuestMaxNumber = async (roomId) => {
  const [total] = await prisma.$queryRaw`
    SELECT
      guest_capacity AS guestCapacity 
    FROM rooms
    WHERE
      rooms.id = ${roomId}
  `;
  return total;
}

const getReservationByUserId = async (userId, reservationType) => {

  const reservation = await prisma.$queryRaw`
    SELECT
      reservations.id AS reservationId,
      rooms.name AS roomName,
      rooms.address,
      users.username AS hostName,
      reservations.guest_count AS guestCount,
      reservations.check_in AS checkIn,
      reservations.check_out AS checkOut,
      (SELECT GROUP_CONCAT(public_imgs.img_url SEPARATOR ',') FROM public_imgs WHERE public_imgs.room_id = rooms.id AND public_imgs.is_main = 1) AS imgUrl
    FROM reservations
    JOIN rooms ON rooms.id = reservations.room_id
    JOIN hosts ON hosts.id = rooms.host_id
    JOIN users ON users.host_id = hosts.id
    WHERE
      reservations.user_id = ${userId}
  ${raw[reservationBuilder[reservationType]]}`;

  return reservation; 
}
    
const updateReservation = async (guestCount, newCheckIn, newCheckOut, userId, roomId) => {
  const result = await prisma.$queryRaw`
    UPDATE reservations
    SET reservations.guest_count = ${guestCount}, reservations.check_in = ${newCheckIn},
        reservations.check_out = ${newCheckOut}, reservations.user_id = ${userId}, 
        reservations.room_id = ${roomId}
    WHERE 
      reservations.id = ${id} 
  `;
  return result; 
}

const deleteReservation = async (id) => {
  const result = await prisma.$queryRaw`
    DELETE
    FROM reservations
    WHERE
      id = ${id}
  `;
  return result;
}

const userReservationCheck = async (checkIn, checkOut, userId, roomId) => {
  const [reservation] = await prisma.$queryRaw`
    SELECT
      reservations.room_id AS roomId,
      users.id AS userId,
      reservations.check_in AS checkIn,
      reservations.check_out AS checkOut
    FROM reservations
    JOIN users ON reservations.user_id = users.id
    WHERE
      reservations.check_in = ${checkIn}
    AND
      reservations.check_out = ${checkOut}
    AND 
      reservations.user_id = ${userId}
    AND
      reservations.room_id = ${roomId}
  `;
  return reservation; 
}

module.exports = { postReservation, roomReservationCheck, guestMaxNumber, getReservation, updateReservation, deleteReservation, userReservationCheck };