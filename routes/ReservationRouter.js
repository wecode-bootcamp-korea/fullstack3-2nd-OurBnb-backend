const express = require('express');
const router = express.Router();

const { reservationController } = require('../controllers');

const { validateToken } = require('../middleware/auth');

router.post('/', validateToken, reservationController.postReservation);
router.get('/', validateToken, reservationController.getReservation);
router.put('/', validateToken, reservationController.updateReservation);
router.delete('/', validateToken, reservationController.deleteReservation);

module.exports = router;
