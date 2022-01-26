const { wishlistService } = require('../services');

const getWishList = async (req, res) => {
	try {
		const userId = req.userId;
		const wishList = await wishlistService.getWishList(userId);

		return res.status(200).json(wishList);
	} catch (err) {
		console.log(err);
		return res.status(400).json({ message: err.message });
	}
};

const addWishList = async (req, res) => {
	try {
		const userId = req.userId;
		const { roomId } = req.body;
		await wishlistService.addWishList(userId, roomId);

		return res.status(201).json({ message: 'SUCCESS_ADD_WISHLIST' });
	} catch (err) {
		console.log(err);
		return res.status(400).json({ messgae: err.message });
	}
};

const deleteWishList = async (req, res) => {
	try {
		const userId = req.userId;
		const { roomId } = req.body;
		await wishlistService.deleteWishList(userId, roomId);

		return res.status(204).json({ message: 'SUCCESS_DELETE_WISHLIST' });
	} catch (err) {
		console.log(err);
		return res.status(400).json({ messgae: err.message });
	}
};

module.exports = { getWishList, addWishList, deleteWishList };
