const { roomDao } = require('../models');

const getRoomList = async (location, checkin, checkout, person, roomTypeId, optionIdForSort) => {
	const roomList = await roomDao.getRoomList(
		location,
		checkin,
		checkout,
		person,
		roomTypeId,
		optionIdForSort,
	);

	return roomList;
};

const getOptions = async () => {
	return await roomDao.getOptions();
};

module.exports = { getRoomList, getOptions };
