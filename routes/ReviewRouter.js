const express = require('express');
const router = express.Router();

const { roomReviewController } = require('../controllers');

router.get('/', roomReviewController.getRoomReview);

module.exports = router;