const prisma = require('./index');

const getLocationLatLng = async location => {
	const [region] = await prisma.$queryRaw`
    SELECT
      locations.name,
      locations.latitude AS lat,
      locations.longitude AS lng
    FROM locations
    WHERE
      locations.name LIKE CONCAT("%",${location},"%")
  `;
	return region;
};

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
	const roomList = await prisma.$queryRaw`
    SELECT SQL_CALC_FOUND_ROWS
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
      hosts.is_super_host,
      room_types.name AS roomType,
      (SELECT GROUP_CONCAT(public_imgs.img_url SEPARATOR ',') FROM public_imgs WHERE public_imgs.room_id = roomId )AS imgUrl,
      (SELECT COUNT(user_reviews.review) FROM user_reviews WHERE user_reviews.room_id = roomId) AS reviewCount,
      (SELECT AVG(user_reviews.rate) FROM user_reviews WHERE user_reviews.room_id = roomId) AS rate,
      (SELECT EXISTS
        (SELECT
          user_likes.id
        FROM user_likes
        WHERE
          user_likes.user_id = ${userId}
        AND
          user_likes.room_id = roomId)
      ) AS isWish
    FROM rooms
    JOIN hosts ON hosts.id = rooms.host_id
    JOIN room_types ON room_types.id = rooms.room_type_id
    JOIN locations ON locations.id = rooms.location_id
    JOIN rooms_options ON rooms_options.room_id = rooms.id
    JOIN options ON options.id = rooms_options.option_id
    WHERE
    -- location이 포함된 컬럼만 선택
      locations.name LIKE CONCAT("%",${location},"%")
    AND
    -- 내가 선택한 체크인, 체크아웃 범위에 포함이 안된 컬럼만 선택
      rooms.id NOT IN (SELECT reservations.room_id FROM reservations WHERE reservations.check_in BETWEEN '2022-01-19' AND '2022-01-26')
    AND
      rooms.id NOT IN (SELECT reservations.room_id FROM reservations WHERE reservations.check_out BETWEEN '2022-01-19' AND '2022-01-26')
    AND
    -- 사람수가 있다면 선택한 사람수보다 수용범위가 큰 컬럼만 선택
      if(${person}, rooms.guest_capacity >= ${person} , rooms.guest_capacity is NOT NULL)
    AND
    -- 선택한 가격범위가 있다면 그 사이에 있는 컬럼만 선택
      if(${false} , rooms.price BETWEEN 10000 AND 150000 , rooms.price is NOT NULL)
    AND
    -- 숙소유형을 선택했다면 숙소유형에 해당하는 컬럼만 선택
      if(${roomTypeId} , room_types.id = ${roomTypeId} , room_types.id is NOT NULL)
    AND
    -- 선택한 편의시설의 id 값들이 있는 컬럼만 선택
      if(${optionIdForSort}, options.id IN (${optionIdForSort}), options.id is NOT NULL)
    GROUP BY rooms.id
    ORDER BY rooms.id
    LIMIT ${limit}
    OFFSET ${offset}
  `;

	const [{ totalRows: totalRows }] = await prisma.$queryRaw`
    SELECT FOUND_ROWS() AS totalRows
    `;

	return { totalRows, roomList };
};

const getOptions = async () => {
	return await prisma.$queryRaw`
    SELECT
      options.id,
      options.name,
      options.is_main AS isMain
    FROM options
  `;
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

module.exports = {
	getRoomList,
	getOptions,
	getLocationLatLng,
	getWishListForCheck,
};
