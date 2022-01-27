const express = require('express');
const router = express.Router();

const {
	roomController,
	roomDetailController,
	roomReviewController,
	reservationController,
} = require('../controllers');
const { authToken, checkToken } = require('../middleware/auth');

router.get('/', checkToken, roomController.getRoomList);
router.get('/options', roomController.getOptions);

router.get('/detail', roomDetailController.getRoomDetail);
router.get('/reviews', roomReviewController.getRoomReview);

router.post('/reservation', authToken, reservationController.postReservation);

module.exports = router;
