<<<<<<< HEAD
const { response } = require('express');
const { roomDao } = require('../models');
=======
const roomDao = require('../models/roomDao');
>>>>>>> 377c6a1 (add : list filtering)

const getRoomList = async (
	location,
	checkin,
	checkout,
	person,
<<<<<<< HEAD
	roomTypeIdForSort,
	optionIdForSort,
	userId,
	limit,
	offset,
) => {
	const region = await roomDao.getLocationLatLng(location);

=======
	roomTypeId,
	convenienceIdForSort,
) => {
>>>>>>> 377c6a1 (add : list filtering)
	const roomList = await roomDao.getRoomList(
		location,
		checkin,
		checkout,
		person,
<<<<<<< HEAD
		roomTypeIdForSort,
		optionIdForSort,
		userId,
		limit,
		offset,
	);

	roomList['location'] = region['name'];
	roomList['lat'] = region['lat'];
	roomList['lng'] = region['lng'];

	return roomList;
};

const getOptions = async () => {
	return await roomDao.getOptions();
};

module.exports = { getRoomList, getOptions };
=======
		roomTypeId,
		convenienceIdForSort,
	);

	return roomList;
};

const getConveniences = async () => {
	return await roomDao.getConveniences();
};

module.exports = { getRoomList, getConveniences };
>>>>>>> 377c6a1 (add : list filtering)
