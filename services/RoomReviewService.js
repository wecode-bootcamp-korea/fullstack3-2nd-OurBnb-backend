const { roomReviewDao } = require('../models');

<<<<<<< HEAD
const getRoomReview = async roomId => {
	const reviewInfo = {};

	const roomAvgRate = await roomReviewDao.getAvgRoomRate(roomId);
	const roomReviewCount = await roomReviewDao.getRoomReviewCount(roomId);
	const roomReview = await roomReviewDao.getRoomReview(roomId);

	if (!roomAvgRate) {
		const error = new Error('ROOM_AVERAGE_RATE_LOAD_FAILED');
		error.statusCode = 400;
		throw error;
	}

	if (!roomReviewCount) {
		const error = new Error('ROOM_REVIEW_COUNT_LOAD_FAILED');
		error.statusCode = 400;
		throw error;
	}

	if (!roomReview) {
		const error = new Error('ROOM_REVIEW_LOAD_FAILED');
		error.statusCode = 400;
		throw error;
	}

	reviewInfo['roomAvgRate'] = roomAvgRate;
	reviewInfo['roomReviewCount'] = roomReviewCount;
	reviewInfo['roomReview'] = roomReview;

	return reviewInfo;
};

module.exports = { getRoomReview };
=======
const getRoomReview = async (roomId) => {

  const reviewInfo = {};   

  const roomAvgRate = await roomReviewDao.getAvgRoomRate(roomId); 
  const roomReviewCount = await roomReviewDao.getRoomReviewCount(roomId);
  const roomReview = await roomReviewDao.getRoomReview(roomId); 

  if (!roomAvgRate) {
    const error = new Error('ROOM_AVERAGE_RATE_LOAD_FAILED');
    error.statusCode = 400;
    throw error;
  }  
  
  if (!roomReviewCount) {
    const error = new Error('ROOM_REVIEW_COUNT_LOAD_FAILED');
    error.statusCode = 400;
    throw error;
  } 

  if (!roomReview) {
    const error = new Error('ROOM_REVIEW_LOAD_FAILED');
    error.statusCode = 400;
    throw error;
  }  

  reviewInfo['roomAvgRate'] = roomAvgRate;
  reviewInfo['roomReviewCount'] = roomReviewCount;
  reviewInfo['roomReview'] = roomReview;
  
  return reviewInfo;
};

module.exports = { getRoomReview };
>>>>>>> d230fc4 (Add: review get API)
