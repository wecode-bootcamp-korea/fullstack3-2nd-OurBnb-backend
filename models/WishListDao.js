const prisma = require('./index');

const getWishList = async userId => {
	const wishList = await prisma.$queryRaw`
  SELECT
  rooms.id AS roomId,
  rooms.name AS roomName,
  rooms.address,
  rooms.guest_capacity AS guestCapacity,
  rooms.bed_count AS bedCount,
  rooms.bedroom_count AS bedroomCount,
  rooms.bathroom_count AS bathroomCount,
  rooms.price,
  rooms.latitude,
  rooms.longitude,
  hosts.is_super_host AS hostId,
  room_types.name AS roomType,
  (SELECT GROUP_CONCAT(public_imgs.img_url SEPARATOR ',') FROM public_imgs WHERE public_imgs.room_id = roomId )AS imgUrl,
  (SELECT COUNT(user_reviews.review) FROM user_reviews WHERE user_reviews.room_id = roomId) AS reviewCount,
  (SELECT AVG(user_reviews.rate) FROM user_reviews WHERE user_reviews.room_id = roomId) AS rate
FROM rooms
JOIN hosts ON hosts.id = rooms.host_id
JOIN room_types ON room_types.id = rooms.room_type_id
JOIN user_likes ON user_likes.room_id = rooms.id
WHERE
  user_likes.user_id = ${userId}

`;

	return wishList;
};

const getWishListForCheck = async (userId, roomId) => {
	return await prisma.$queryRaw`
    SELECT
      user_likes.id
    FROM user_likes
    WHERE
      user_likes.room_id = ${roomId}
    AND
      user_likes.user_id = ${userId}
  `;
};

const addWishList = async (userId, roomId) => {
	await prisma.$queryRaw`
    INSERT INTO
      user_likes (user_id, room_id)
    VALUES
      (${userId}, ${roomId})
  `;
};

const deleteWishList = async (userId, roomId) => {
	await prisma.$queryRaw`
    DELETE
    FROM user_likes
    WHERE
      user_likes.user_id = ${userId}
    AND
      user_likes.room_id = ${roomId}

  `;
};

module.exports = {
	getWishList,
	addWishList,
	deleteWishList,
	getWishListForCheck,
};
