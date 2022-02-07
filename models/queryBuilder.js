  const reservationsBuilder = {
    PAST : 'AND reservations.check_out < DATE(now())',
    ONGING : 'AND BETWEEN reservations.check_out < DATE(now())',
    BOOKED : 'AND reservations.check_in > DATE(now())',
  }

	export {reservationsBuilder}