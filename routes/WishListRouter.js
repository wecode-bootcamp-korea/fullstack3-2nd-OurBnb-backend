const express = require('express');
const router = express.Router();

const { wishlistController } = require('../controllers');
const { authToken } = require('../middleware/auth');

router.get('/', authToken, wishlistController.getWishList);
router.put('/', authToken, wishlistController.addWishList);
router.delete('/', authToken, wishlistController.deleteWishList);

module.exports = router;
