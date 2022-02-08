const express = require('express');
const router = express.Router();

const { wishlistController } = require('../controllers');
const { validateToken } = require('../middleware/auth');

router.get('/', validateToken, wishlistController.getWishList);
router.put('/', validateToken, wishlistController.addWishList);
router.delete('/', validateToken, wishlistController.deleteWishList);

module.exports = router;
