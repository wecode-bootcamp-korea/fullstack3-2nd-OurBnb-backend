const reservationBuilder = {
	PAST: 'reservations.check_out < DATE(now())',
	CURRENT: 'DATE(NOW()) BETWEEN reservations.check_in AND reservations.check_out',
	BOOKED: 'reservations.check_in > DATE(now())',
};

module.exports = { reservationBuilder };
