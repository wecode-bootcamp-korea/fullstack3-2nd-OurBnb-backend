const { roomDetailService } = require('../services');

const getRoomDetail = async (req, res) => {
  try {
    const { roomId } = req.query;
    const detail = await roomDetailService.getRoomDetail(roomId);

    return res.status(200).json({ message: 'ROOM DETAIL', detail});
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: 'ROOM DETAIL NOT FOUND' });
  }
};

const getAllImgs = async (req, res) => {
  try {
    const { roomId } = req.query;
    const allImgs = await roomDetailService.getAllImgs(roomId);

    return res.status(200).json({ message: 'ROOM IMAGES', allImgs});
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: 'ROOM IMAGES NOT FOUND' });
  }
};

const makeReservation = async (req,res) => {
  try {
    const userId = req.userId;
    const { roomId, guestCount, checkIn, checkOut } = req.query;
    
    const reservation = await roomDetailService.getRoomDetail(userId, roomId, guestCount, checkIn, checkOut);

    return res.status(200).json({ reservation });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: 'RESERVATION FAILED' });
  }
}

module.exports = { getRoomDetail, getAllImgs, makeReservation };