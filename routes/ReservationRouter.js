
const express = require('express');
const router = express.Router();

const {
	reservationController,
} = require('../controllers');

const { authToken, checkToken } = require('../middleware/auth');

router.post('/', reservationController.postReservation);
router.get('/', reservationController.getReservation);
router.put('/:reservationId', reservationController.updateReservation);
router.delete('/:reservationId', reservationController.deleteReservation);

module.exports = router;
