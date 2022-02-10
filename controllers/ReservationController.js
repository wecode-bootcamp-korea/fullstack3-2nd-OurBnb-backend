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

		return res.status(200).json({ message: 'RESERVATION_CONFIRMED' });
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
<<<<<<< HEAD
		const userId = req.userId;
		const { reservationId } = req.params;
		const { guestCount, newCheckIn, newCheckOut } = req.query;

		if (!userId || !reservationId || !guestCount || !newCheckIn || !newCheckOut) {
=======
    const { reservationId } = req.params;
		const { guestCount, newCheckIn, newCheckOut } = req.query;

		if (!reservationId || !guestCount || !newCheckIn || !newCheckOut) {
>>>>>>> fe9052f (Fix: Reservation C.R.U.D edited by mentoring && Review API separated)
			const err = new Error('REQUIREMENT_MISSING');
			err.statusCode = 400;
			throw err;
		}
		const reservation = await reservationService.updateReservation(
<<<<<<< HEAD
			userId,
			reservationId,
			guestCount,
			newCheckIn,
			newCheckOut,
=======
			reservationId,
      guestCount,
			newCheckIn,
			newCheckOut
>>>>>>> fe9052f (Fix: Reservation C.R.U.D edited by mentoring && Review API separated)
		);

		return res.status(200).json({ message: 'RESERVATION_UPDATED' });
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
		const { reservationId } = req.params;

		if (!userId || !reservationId) {
			const err = new Error('REQUIREMENT_MISSING');
			err.statusCode = 400;
			throw err;
		}

		const reservation = await reservationService.deleteReservation(userId, reservationId);

		return res.status(200).json({ message: 'RESERVATION_CANCELLED' });
	} catch (err) {
		console.log(err);
		return res
			.status(err.statusCode || 500)
			.json(err.message || { message: 'DELETE_RESERVATION_FAILED' });
	}
};

module.exports = { postReservation, getReservation, updateReservation, deleteReservation };
