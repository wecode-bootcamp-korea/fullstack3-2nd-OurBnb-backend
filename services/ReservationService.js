const { reservationDao } = require('../models');
const { reservationType } = require('./type');
 
const postReservation = async (guestCount, checkIn, checkOut, userId, roomId) => {
	
	// 처음에 해당 roomId, checkIn, checkOut 정보를 이용해서 이 예약의 가능 여부 확인 
	const isResvAvailable = (await reservationDao.roomReservationCheck(checkIn, checkOut, roomId))
		? false
		: true;

	// 불가능하다면 에러 처리 
	if (!isResvAvailable) {
		const error = new Error('UNAVAILABLE RESERVATION PERIOD');
		error.statusCode = 400;
		throw error;
	}
 
	// 예약하려는 게스트 수가 해당 숙소의 허용 인원 수를 넘기는지 여부 확인 
	const isGuestNumAvailable =
		(await reservationDao.guestMaxNumberByRoomId(roomId)) >= guestCount ? true : false;

	// 허용 인원 수를 넘긴다면 에러 처리 
	if (!isGuestNumAvailable) {
		const error = new Error('GUEST COUNT OVER THE LIMIT');
		error.statusCode = 400;
		throw error;
	}

	// 유저가 입력한 정보를 바탕으로 데이터베이스에 예약 정보 담기 
	const reservationResult = await reservationDao.postReservation(
		guestCount,
		checkIn,
		checkOut,
		userId,
		roomId,
	);

	// 예약에 실패했다면 에러 처리 
	if (!reservationResult) {
		const error = new Error('MAKING RESERVATION FAILED');
		error.statusCode = 400;
		throw error;
	}

	return reservationResult;
};

const getReservation = async userId => {

	// type.js에 넣은 reservationType에 따라 각기 다른 예약 내역 데이터베이스 내에서 불러오기 
    const past = await reservationDao.getReservation(userId, reservationType.PAST);
    const current = await reservationDao.getReservation(userId, reservationType.CURRENT);
    const booked = await reservationDao.getReservation(userId, reservationType.BOOKED);
	
	// 하나의 객체에 위에서 불러온 3가지 타입의 예약 내역들을 모두 담아서 반환 
	return { past, current, booked };
};

const updateReservation = async (
	reservationId,
    guestCount,
	newCheckIn,
	newCheckOut
) => {

	// 수정하려는 게스트 수가 최대 인원수를 넘기는지 여부 확인 
	const isGuestNumAvailable =
		(await reservationDao.guestMaxNumberByReservationId(reservationId)) >= guestCount ? true : false;

    // 허용 인원수를 넘길 경우 에러 처리 
	if (!isGuestNumAvailable) {
		const error = new Error('GUEST COUNT OVER THE LIMIT');
		error.statusCode = 400;
		throw error;
	}
   
	// 해당 reservationId의 예약 내역을 데이터베이스 내에서 수정 
	const reservationResult = await reservationDao.updateReservation(
		reservationId,
        guestCount,
		newCheckIn,
		newCheckOut
	);

	// 예약 내역 수정이 일어나지 않을 경우 에러 처리 
	if (!reservationResult) {
		const error = new Error('UPDATING RESERVATION FAILED');
		error.statusCode = 400;
		throw error;
	}

	return reservationResult;
};

const deleteReservation = async (reservationId) => {

	// 처음에 reservationId 값과 일치하는 reservation의 존재 여부 체크
	const doesResvExist = (await reservationDao.userReservationCheck(reservationId)) ? true : false;

	// 존재하지 않는다면 에러 처리
	if (!doesResvExist) {
		const error = new Error('RESERVATION DOES NOT EXIST');
		error.statusCode = 400;
		throw error;
	}

	// 존재하면 해당 정보를 매개변수로 넘겨서 해당 예약내역을 데이터베이스 내에서 삭제 처리
	const reservation = await reservationDao.deleteReservation(reservationId);

	// 예약 내역 삭제가 일어나지 않을 경우 에러 처리 
	if (!reservation) {
		const error = new Error('DELETING RESERVATION FAILED');
		error.statusCode = 400;
		throw error;
	}

	return reservation;
};

module.exports = { postReservation, getReservation, updateReservation, deleteReservation };
