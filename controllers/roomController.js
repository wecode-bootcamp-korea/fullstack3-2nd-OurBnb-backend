const { roomService } = require('../services');

const getRoomList = async (req, res) => {
	try {
		const { location } = req.params;
		const { checkin, checkout, person, roomTypeId, option } = req.query;
		const optionIdForSort = Array.isArray(option) ? option.join() : option;

		const roomList = await roomService.getRoomList(
			location,
			checkin,
			checkout,
			person,
			roomTypeId,
			optionIdForSort,
		);

		return res.status(200).json(roomList);
	} catch (err) {
		console.log(err);
		return res.status(400).json({ message: 'ERROR' });
	}
};

const getOptions = async (req, res) => {
	const options = await roomService.getOptions();

	return res.status(200).json(options);
};

module.exports = { getRoomList, getOptions };
