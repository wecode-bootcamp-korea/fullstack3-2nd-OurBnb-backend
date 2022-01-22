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

module.exports = { getRoomDetail };