const express = require('express');
const router = express.Router();

const { userController } = require('../controllers');
const { authToken } = require('../middleware/auth');

router.get('/kakaologin', userController.kakaologin);
router.get('/trip', authToken, userController.getReservationList);

module.exports = router;
