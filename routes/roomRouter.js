const express = require('express');
const router = express.Router();

const { roomController, roomDetailController, roomReviewController, reservationController } = require('../controllers');
const { checkToken } = require('../middleware/auth');

router.get('/', checkToken, roomController.getRoomList);
router.get('/options', roomController.getOptions);

router.get('/detail', roomDetailController.getRoomDetail);
router.get('/reviews', roomReviewController.getRoomReview);

router.put('/', roomController.addWishList);
router.delete('/', roomController.deleteWishList);

router.post('/reservation', reservationController.postReservation);

module.exports = router;
