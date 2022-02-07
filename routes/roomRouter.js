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
router.get('/images', roomDetailController.getAllImgsByRoomId);

router.get('/detail', roomDetailController.getRoomDetail);

router.post('/reservation', authToken, reservationController.postReservation);
router.get('/reservation', authToken, reservationController.getReservation);
router.put('/reservation', authToken, reservationController.updateReservation);
router.delete('/reservation', authToken, reservationController.deleteReservation);

module.exports = router;
