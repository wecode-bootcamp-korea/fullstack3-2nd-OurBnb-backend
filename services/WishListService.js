const wishlistDao = require('../models/WishListDao');

const getWishList = async userId => {
	return await wishlistDao.getWishList(userId);
};

const addWishList = async (userId, roomId) => {
	const [wishList] = await wishlistDao.getWishListForCheck(userId, roomId);

	if (wishList) {
		const error = new Error('ALREADY_EXIST');
		error.statusCode = 400;

		throw error;
	}

	await wishlistDao.addWishList(userId, roomId);
};

const deleteWishList = async (userId, roomId) => {
	const [wishList] = await wishlistDao.getWishListForCheck(userId, roomId);

	if (!wishList) {
		const error = new Error('NOT_EXIST');
		error.statusCode = 404;

		throw error;
	}

	await wishlistDao.deleteWishList(userId, roomId);
};

module.exports = { getWishList, addWishList, deleteWishList };
