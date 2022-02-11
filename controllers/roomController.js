const { response } = require('express');
const { roomService } = require('../services');
const verify = require('../utils/token');

const getRoomList = async (req, res) => {
	try {
		const userId = req.userId;
		const { location, checkin, checkout, person, roomTypeId, option, limit, offset } = req.query;
		const optionIdForSort = Array.isArray(option) ? option.join() : option;

		const roomListInfo = await roomService.getRoomList(
			location,
			checkin,
			checkout,
			person,
			roomTypeId,
			optionIdForSort,
			userId,
			limit,
			offset,
		);

		return res.status(200).json(roomListInfo);
	} catch (err) {
		console.log(err);
		return res.status(400).json({ message: 'ERROR' });
	}
};

const getOptions = async (req, res) => {
	try {
		const options = await roomService.getOptions();

		return res.status(200).json(options);
	} catch (err) {
		console.log(err);
		return res.status(400).json({ message: 'ERROR' });
	}
};

const addWishList = async (req, res) => {
	try {
		const { userId, roomId } = req.body;
		await roomService.addWishList(userId, roomId);

		return res.status(200).json({ message: 'SUCCESS_ADD_WISHLIST' });
	} catch (err) {
		console.log(err);
		return res.status(400).json({ messgae: err.message });
	}
};

const deleteWishList = async (req, res) => {
	try {
		const { userId, roomId } = req.body;
		await roomService.deleteWishList(userId, roomId);

		return res.status(200).json({ message: 'SUCCESS_DELETE_WISHLIST' });
	} catch (err) {
		console.log(err);
		return res.status(400).json({ messgae: err.message });
	}
};

module.exports = { getRoomList, getOptions, addWishList, deleteWishList };
