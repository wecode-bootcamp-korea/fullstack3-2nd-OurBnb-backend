const { roomService } = require('../services');
const verify = require('../utils/token');

const getRoomList = async (req, res) => {
	try {
		const token = req.header.authrization;
		const userId = token ? verifyToken(token).id : null;
		const { location, checkin, checkout, person, roomTypeId, option } = req.query;
		const optionIdForSort = Array.isArray(option) ? option.join() : option;

		const roomListInfo = await roomService.getRoomList(
			location,
			checkin,
			checkout,
			person,
			roomTypeId,
			optionIdForSort,
			userId,
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
