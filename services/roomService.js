const roomDao = require('../models/roomDao');

const getRoomList = async (
	location,
	checkin,
	checkout,
	person,
	roomTypeId,
	convenienceIdForSort,
) => {
	const roomList = await roomDao.getRoomList(
		location,
		checkin,
		checkout,
		person,
		roomTypeId,
		convenienceIdForSort,
	);

	return roomList;
};

const getConveniences = async () => {
	return await roomDao.getConveniences();
};

module.exports = { getRoomList, getConveniences };
