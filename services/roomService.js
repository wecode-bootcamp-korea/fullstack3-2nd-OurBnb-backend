const { response } = require('express');
const { roomDao } = require('../models');

const getRoomList = async (
	location,
	checkin,
	checkout,
	person,
	roomTypeId,
	optionIdForSort,
	userId,
	limit,
	offset,
) => {
	const roomList = await roomDao.getRoomList(
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

	const region = await roomDao.getLocationLatLng(location);

	roomList['location'] = region['name'];
	roomList['lat'] = region['lat'];
	roomList['lng'] = region['lng'];

	return roomList;
};

const getOptions = async () => {
	return await roomDao.getOptions();
};

module.exports = { getRoomList, getOptions };
