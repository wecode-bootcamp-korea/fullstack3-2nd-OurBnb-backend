const { roomReviewDao } = require('../models');

const getRoomReview = async (roomId) => {

  const reviewInfo = {};   

  const roomAvgRate = await roomReviewDao.getAvgRoomRate(roomId); 
  const roomReview = await roomReviewDao.getRoomReview(roomId); 

  if (!roomAvgRate) {
    const error = new Error('ROOM_AVERAGE_RATE_LOAD_FAILED');
    error.statusCode = 400;
    throw error;
  }  

  if (!roomReview) {
    const error = new Error('ROOM_REVIEW_LOAD_FAILED');
    error.statusCode = 400;
    throw error;
  }  

  reviewInfo['roomAvgRate'] = roomAvgRate;
  reviewInfo['roomReview'] = roomReview;
  
  return reviewInfo;
};

module.exports = { getRoomReview };