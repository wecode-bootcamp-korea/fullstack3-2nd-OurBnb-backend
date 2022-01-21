const { roomDetailDao } = require('../models');

const getRoomDetail = async (roomId) => {

  const detail = await roomDetailDao.getRoomDetail(roomId);

  if (!detail) {
    const error = new Error('ROOM DETAIL LOAD FAILED');
    error.statusCode = 400;
    throw error;
  }

  return detail;
};

module.exports = { getRoomDetail };