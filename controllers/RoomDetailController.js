const { roomDetailService } = require('../services');

const getRoomDetail = async (req, res) => {
  try {
    const { roomId } = req.query;

    if (!roomId) {
      const err = new Error('ROOM_ID_REQUIRED')
      err.statusCode = 400
      throw err
    }

    const detail = await roomDetailService.getRoomDetail(roomId);

    if (detail === []) {
      const err = new Error('ROOM_DETAIL_NOT_FOUND')
      err.statusCode = 404
      throw err
    }

    return res.status(200).json({ message: 'ROOM_DETAIL', detail});
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json(err.message ||  { message: 'ROOM_DETAIL_NOT_FOUND' });
  }
};

const getAllImgs = async (req, res) => {
  try {
    const { roomId } = req.query;

    if (!roomId) {
      const err = new Error('ROOM_ID_REQUIRED')
      err.statusCode = 400
      throw err
    }

    const allImgs = await roomDetailService.getAllImgs(roomId);

    if (allImgs === []) {
      const err = new Error('ROOM_IMAGES_NOT_FOUND')
      err.statusCode = 404
      throw err
    }

    return res.status(200).json({ message: 'ROOM IMAGES', allImgs});
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json(err.message ||  { message: 'ROOM_IMAGES_NOT_FOUND' });
  }
};

module.exports = { getRoomDetail, getAllImgs };