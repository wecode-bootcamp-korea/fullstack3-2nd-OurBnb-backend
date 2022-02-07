const express = require('express');
const router = express.Router();

const {
	reviewController,
} = require('../controllers');

const { authToken, checkToken } = require('../middleware/auth');

router.get('/', roomReviewController.getRoomReview);
// router.post('/', authToken, roomReviewController.createRoomReview);
// const { roodId, score, content } = req.body

module.exports = router;
