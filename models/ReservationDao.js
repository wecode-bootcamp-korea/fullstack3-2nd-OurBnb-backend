const prisma = require('./index');

const postReservation = async (guestCount, checkIn, checkOut, userId, roomId) => {
    return await prisma.$queryRaw`
      INSERT INTO
        reservations (guest_count, check_in, check_out, user_id, room_id)
      VALUES 
        (${guestCount}, ${checkIn}, ${checkOut}, ${userId}, ${roomId}) 
    `; 
  }
  
  module.exports = { postReservation };