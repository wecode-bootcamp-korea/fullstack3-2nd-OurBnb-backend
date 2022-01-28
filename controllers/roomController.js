const { response } = require('express');
const { roomService } = require('../services');
const verify = require('../utils/token');

const getRoomList = async (req, res) => {
	try {
		const userId = req.userId;
		const { location, checkin, checkout, person, roomTypeId, option, limit, offset } = req.query;
		const optionIdForSort = Array.isArray(option) ? option.join() : option;
		const roomTypeIdForSort = Array.isArray(roomTypeId) ? roomTypeId.join() : roomTypeId;

		const roomListInfo = await roomService.getRoomList(
			location,
			checkin,
			checkout,
			person,
			roomTypeIdForSort,
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

module.exports = { getRoomList, getOptions };
