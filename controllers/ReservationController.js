const { reservationService } = require('../services');

const postReservation = async (req, res) => {
	try {
		const userId = req.userId;
		const { guestCount, checkIn, checkOut, roomId } = req.query;

		if (!userId || !roomId || !guestCount || !checkIn || !checkOut) {
			const err = new Error('REQUIREMENT_MISSING');
			err.statusCode = 400;
			throw err;
		}
		const reservation = await reservationService.postReservation(
			guestCount,
			checkIn,
			checkOut,
			userId,
			roomId,
		);

		return res.status(200).json({ message: 'RESERVATION_CONFIRMED', reservation });
	} catch (err) {
		console.log(err);
		return res
			.status(err.statusCode || 500)
			.json(err.message || { message: 'POST_RESERVATION_FAILED' });
	}
};

const getReservation = async (req, res) => {
	try {
		const userId = req.userId;

		if (!userId) {
			const err = new Error('USER_ID_MISSING');
			err.statusCode = 400;
			throw err;
		}

		const reservation = await reservationService.getReservation(userId);

		return res.status(200).json(reservation);
	} catch (err) {
		console.log(err);
		return res
			.status(err.statusCode || 500)
			.json(err.message || { message: 'GET_RESERVATION_FAILED' });
	}
};

const updateReservation = async (req, res) => {
	try {
		const userId = req.userId;
		const { guestCount, oldCheckIn, oldCheckOut, newCheckIn, newCheckOut, roomId } = req.query;

		if (!userId || !roomId || !guestCount || !checkIn || !checkOut) {
			const err = new Error('REQUIREMENT_MISSING');
			err.statusCode = 400;
			throw err;
		}
		const reservation = await reservationService.updateReservation(
			guestCount,
			oldCheckIn,
			oldCheckOut,
			newCheckIn,
			newCheckOut,
			userId,
			roomId,
		);

		return res.status(200).json({ message: 'RESERVATION_UPDATED', reservation });
	} catch (err) {
		console.log(err);
		return res
			.status(err.statusCode || 500)
			.json(err.message || { message: 'UPDATE_RESERVATION_FAILED' });
	}
};

const deleteReservation = async (req, res) => {
	try {
		const userId = req.userId;
		const { checkIn, checkOut, roomId } = req.query;

		if (!userId || !checkIn || !checkOut || !roomId) {
			const err = new Error('REQUIREMENT_MISSING');
			err.statusCode = 400;
			throw err;
		}

		const reservation = await reservationService.deleteReservation(
			checkIn,
			checkOut,
			userId,
			roomId,
		);

		return res.status(200).json({ message: 'RESERVATION_CANCELLED', reservation });
	} catch (err) {
		console.log(err);
		return res
			.status(err.statusCode || 500)
			.json(err.message || { message: 'DELETE_RESERVATION_FAILED' });
	}
};

module.exports = { postReservation, getReservation, updateReservation, deleteReservation };
