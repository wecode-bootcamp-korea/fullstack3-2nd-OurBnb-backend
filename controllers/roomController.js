const roomService = require('../services/roomService');

const getRoomList = async (req, res) => {
	try {
		const { location } = req.params;
		const { checkin, checkout, person, roomTypeId, convenience } = req.query;
		const convenienceIdForSort = convenience ? convenience.join() : null;

		const roomList = await roomService.getRoomList(
			location,
			checkin,
			checkout,
			person,
			roomTypeId,
			convenienceIdForSort,
		);

		return res.status(200).json(roomList);
	} catch (err) {
		console.log(err);
		return res.status(400).json({ message: 'ERROR' });
	}
};

const getConveniences = async (req, res) => {
	const conveniences = await roomService.getConveniences();

	return res.status(200).json(conveniences);
};

module.exports = { getRoomList, getConveniences };
