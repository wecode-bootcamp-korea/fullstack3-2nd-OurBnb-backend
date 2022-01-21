const express = require('express');
const router = express.Router();

const { userController } = require('../controllers');

router.get('/kakaologin', userController.kakaologin);

module.exports = router;