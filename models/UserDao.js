const prisma = require('./index');

const getUserBySnsId = async snsId => {
	const [user] = await prisma.$queryRaw`
    SELECT 
      id as userId,
      username, 
      img_url as imgUrl,
      sns_id as snsId, 
      sns_created_at as snsCreatedAt,
      sns_is_verified as snsIsVerified,
      host_id as hostId,
      created_at as createdAt  
    FROM 
      users 
    WHERE 
      sns_id = ${snsId};
    `;
	return user;
};

const createUser = async (username, imgUrl, snsId, snsIsVerified) => {
	const createData = await prisma.$queryRaw`
          INSERT INTO 
            users (username, img_url, sns_id, sns_is_verified) 
          VALUES 
            (${username}, ${imgUrl}, ${snsId}, ${snsIsVerified})
          `;
	return createData;
};

const getReservationListById = async userId => {
	const current = await prisma.$queryRaw`
    SELECT
      reservations.user_id,
      rooms.address,
      users.username AS hostname,
      reservations.check_in AS checkIn,
      reservations.check_out AS checkOut,
      public_imgs.img_url AS imgUrl
    FROM reservations
    JOIN rooms ON rooms.id = reservations.room_id
    JOIN public_imgs ON public_imgs.room_id = rooms.id
    JOIN hosts ON hosts.id = rooms.host_id
    JOIN users ON users.host_id = hosts.id
    WHERE
      public_imgs.is_main =1
    AND
      reservations.user_id = ${userId}
    AND
      DATE(NOW()) BETWEEN reservations.check_in AND reservations.check_out
`;

	const booked = await prisma.$queryRaw`
    SELECT
      reservations.user_id,
      rooms.address,
      users.username AS hostname,
      reservations.check_in AS checkIn,
      reservations.check_out AS checkOut,
      public_imgs.img_url AS imgUrl
    FROM reservations
    JOIN rooms ON rooms.id = reservations.room_id
    JOIN public_imgs ON public_imgs.room_id = rooms.id
    JOIN hosts ON hosts.id = rooms.host_id
    JOIN users ON users.host_id = hosts.id
    WHERE
      public_imgs.is_main =1
    AND
      reservations.user_id = 3
    AND
      reservations.check_in > DATE(now())
`;

	const last = await prisma.$queryRaw`
    SELECT
      reservations.user_id,
      rooms.address,
      users.username AS hostname,
      reservations.check_in AS checkIn,
      reservations.check_out AS checkOut,
      public_imgs.img_url AS imgUrl
    FROM reservations
    JOIN rooms ON rooms.id = reservations.room_id
    JOIN public_imgs ON public_imgs.room_id = rooms.id
    JOIN hosts ON hosts.id = rooms.host_id
    JOIN users ON users.host_id = hosts.id
    WHERE
      public_imgs.is_main =1
    AND
      reservations.user_id = 3
    AND
      reservations.check_out < DATE(now())
`;

	return { current, booked, last };
};

module.exports = { getReservationListById, getUserBySnsId, createUser };
