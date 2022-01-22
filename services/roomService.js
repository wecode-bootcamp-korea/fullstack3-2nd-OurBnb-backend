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
) => {
	const roomList = await roomDao.getRoomList(
		location,
		checkin,
		checkout,
		person,
		roomTypeId,
		optionIdForSort,
		userId,
	);

	const region = await roomDao.getLocationLatLng(location);

	const roomListInfo = {};

	roomListInfo['location'] = region['name'];
	roomListInfo['lat'] = region['lat'];
	roomListInfo['lng'] = region['lng'];
	roomListInfo['roomList'] = roomList;

	return roomListInfo;
};

const getOptions = async () => {
	return await roomDao.getOptions();
};

const addWishList = async (userId, roomId) => {
	const [wishList] = await roomDao.getWishListForCheck(userId, roomId);

	if (wishList) {
		const error = new Error('ALREADY_EXIST');
		error.statusCode = 400;

		throw error;
	}

	await roomDao.addWishList(userId, roomId);
};

const deleteWishList = async (userId, roomId) => {
	const [wishList] = await roomDao.getWishListForCheck(userId, roomId);

	if (!wishList) {
		const error = new Error('NOT_EXIST');
		error.statusCode = 400;

		throw error;
	}

	await roomDao.deleteWishList(userId, roomId);
};

module.exports = { getRoomList, getOptions, addWishList, deleteWishList };
