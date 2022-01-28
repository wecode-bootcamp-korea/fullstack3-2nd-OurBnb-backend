const prisma = require('./index');

const postReservation = async (guestCount, checkIn, checkOut, userId, roomId) => {
  return await prisma.$queryRaw`
    INSERT INTO
      reservations (guest_count, check_in, check_out, user_id, room_id)
    VALUES 
      (${guestCount}, ${checkIn}, ${checkOut}, ${userId}, ${roomId}) 
  `; 
}

const getReservationForCheck = async (roomId, checkIn, checkOut) => {
  const [reservation] = await prisma.$queryRaw`
    SELECT
      reservations.room_id AS roomId,
      users.id AS userId,
      reservations.check_in AS checkIn,
      reservations.check_out AS checkOut
    FROM reservations
    JOIN rooms ON rooms.id = reservations.room_id
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
  module.exports = { postReservation, getReservationForCheck, getGuestMaxNumber };