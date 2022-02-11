const prisma = require('./index');
const PrismaClient = require('@prisma/client');
const { raw } = PrismaClient.Prisma;
const { reservationBuilder } = require('./queryBuilder');

const createReservation = async (guestCount, checkIn, checkOut, userId, roomId) => {
	return await prisma.$executeRaw`
    INSERT INTO
      reservations (guest_count, check_in, check_out, user_id, room_id)
    VALUES 
      (${guestCount}, ${checkIn}, ${checkOut}, ${userId}, ${roomId}) 
  `;
};

const checkRoomReservation = async (checkIn, checkOut, roomId) => {
	const [reservation] = await prisma.$queryRaw`
    SELECT
      reservations.id AS reservationId,
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
    LIMIT 1
  `;
	return reservation;
};

const getGuestMaxByRoomId = async roomId => {
	const [total] = await prisma.$queryRaw`
    SELECT
      guest_capacity AS guestCapacity 
    FROM rooms
    WHERE
      rooms.id = ${roomId}
  `;
	return total;
};

const getGuestMaxByReservationId = async reservationId => {
	const [total] = await prisma.$queryRaw`
    SELECT
      guest_capacity AS guestCapacity 
    FROM rooms
    JOIN reservations ON reservations.room_id = rooms.id
    WHERE
      reservations.id = ${reservationId}
  `;
	return total;
};

const getReservation = async (userId, reservationType) => {
	const reservation = await prisma.$queryRaw`
    SELECT
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
    AND
      ${raw(reservationBuilder[reservationType])}
  `;
	return reservation;
};

const updateReservation = async (userId, reservationId, guestCount, newCheckIn, newCheckOut) => {
	return await prisma.$executeRaw`
    UPDATE reservations
    SET reservations.guest_count = ${guestCount}, reservations.check_in = ${newCheckIn},
        reservations.check_out = ${newCheckOut}
    WHERE
      reservations.user_id = ${userId} 
    AND
      reservations.id = ${reservationId}
  `;
};

const deleteReservation = async (userId, reservationId) => {
	return await prisma.$executeRaw`
    DELETE
    FROM reservations
    WHERE 
      reservations.user_id = ${userId} 
    AND
      reservations.id = ${reservationId}
  `;
};

const checkUserReservation = async reservationId => {
	const [reservation] = await prisma.$queryRaw`
    SELECT
      reservations.room_id AS roomId,
      users.id AS userId,
      reservations.check_in AS checkIn,
      reservations.check_out AS checkOut
    FROM reservations
    JOIN users ON reservations.user_id = users.id
    WHERE
      reservations.id = ${reservationId}
  `;
	return reservation;
};

module.exports = {
	createReservation,
	checkRoomReservation,
	getGuestMaxByRoomId,
	getGuestMaxByReservationId,
	getReservation,
	updateReservation,
	deleteReservation,
	checkUserReservation,
};
