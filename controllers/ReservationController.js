const { reservationService } = require('../services');

const postReservation = async (req,res) => {
    try {
      const userId = req.userId;
      const { guestCount, checkIn, checkOut, roomId } = req.query;
  
      if (!userId || !roomId || !guestCount || !checkIn || !checkOut) {
        const err = new Error('REQUIREMENT_MISSING')
        err.statusCode = 400
        throw err
      }

      const reservation = await reservationService.postReservation(guestCount, checkIn, checkOut, userId, roomId);
  
      return res.status(200).json({ reservation });
    } catch (err) {
      console.log(err);
      return res.status(err.statusCode || 500).json(err.message ||  { message: 'RESERVATION_FAILED' });
    }
  }

  module.exports = { postReservation };