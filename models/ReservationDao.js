const prisma = require('./index');

const postReservation = async (userId, roomId, guestCount, checkIn, checkOut) => {
    return await prisma.$queryRaw`
      INSERT INTO
        reservations (guest_count, user_id, room_id, check_in, check_out)
      VALUES 
        (${guestCount}, ${userId}, ${roomId}, ${checkIn}, ${checkOut}) 
    `; 
  }
  
  module.exports = { postReservation };