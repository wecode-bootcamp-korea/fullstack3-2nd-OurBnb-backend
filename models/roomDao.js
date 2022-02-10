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
      hosts.is_super_host AS isSuperHost,
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
    WHERE 1=1
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
	console.log(totalRows);
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

const getMainInfo = async (roomId) => { 
  const [detail] = await prisma.$queryRaw`
    SELECT
      rooms.id AS roomId,
      rooms.name AS roomName,
      rooms.address,
      rooms.description AS roomDesc,
      rooms.price,
      rooms.guest_capacity AS guestCapacity,
      rooms.bed_count AS bedCount,
      rooms.bedroom_count AS bedroomCount,
      rooms.bathroom_count AS bathroomCount,
      rooms.cleaning_fee AS cleaningFee,
      rooms.latitude,
      rooms.longitude,
      room_types.name AS roomType,
      locations.name AS location,
      hosts.is_super_host AS isSuperHost,
      hosts.description AS hostDesc,
      users.username AS hostName,
      users.img_url AS hostImgUrl,
      (SELECT GROUP_CONCAT(public_imgs.img_url SEPARATOR ',') FROM public_imgs WHERE public_imgs.room_id = roomId AND public_imgs.is_main =1) AS imgUrl
    FROM rooms
    JOIN 
      room_types ON rooms.room_type_id = room_types.id 
    JOIN 
      locations ON rooms.location_id = locations.id
    JOIN 
      hosts ON rooms.host_id = hosts.id
    JOIN
      users on rooms.host_id = users.host_id 
    WHERE 
      rooms.id = ${roomId}
  `; 
  return detail;
};

const getOption = async (roomId) => { 
  const option = await prisma.$queryRaw`
    SELECT
      options.name AS optionName,                
      options.logo_url AS optionLogoUrl,
      options.is_main AS isMainOption,
      option_types.name AS optionType
    FROM options
    JOIN 
      option_types ON options.option_type_id = option_types.id 
    INNER JOIN 
      rooms_options ON options.id = rooms_options.option_id
    INNER JOIN
      rooms ON rooms_options.room_id = rooms.id
    WHERE
      rooms.id = ${roomId}
  `;
  return option; 
} 

const getBenefit = async (roomId) => { 
  const benefit = await prisma.$queryRaw`
    SELECT
      benefits.title AS benefitTitle, 
      benefits.logo_url AS benefitLogoUrl, 
      benefits.description AS benefitDesc
    FROM benefits
    INNER JOIN 
      rooms_benefits ON benefits.id = rooms_benefits.benefit_id
    INNER JOIN
      rooms ON rooms_benefits.room_id = rooms.id
    WHERE
      rooms.id = ${roomId}
  `;
  return benefit; 
} 

const getRule = async (roomId) => { 
  const rule = await prisma.$queryRaw`
    SELECT
      rules.logo_url AS rulesLogoUrl, 
      rules.description AS rulesDesc
    FROM rules
    INNER JOIN 
      rooms_rules ON rules.id = rooms_rules.rule_id
    INNER JOIN
      rooms ON rooms_rules.room_id = rooms.id
    WHERE
      rooms.id = ${roomId}
  `;
  return rule; 
} 

const getSafety = async (roomId) => { 
  const safety = await prisma.$queryRaw`
    SELECT
      safety.logo_url AS safetyLogoUrl, 
      safety.description AS safetyDesc  
    FROM safety
    INNER JOIN 
      rooms_safety ON safety.id = rooms_safety.safety_id
    INNER JOIN
      rooms ON rooms_safety.room_id = rooms.id 
    WHERE
      rooms.id = ${roomId}
  `;
  return safety; 
} 

const getAllImgsByRoomId = async (roomId) => {
  const allImgs = await prisma.$queryRaw`
    SELECT 
      public_imgs.img_url AS imgUrl
    FROM public_imgs
    JOIN 
      rooms ON rooms.id = public_imgs.room_id 
    WHERE 
      rooms.id = ${roomId}
  `;
  return allImgs;
}

module.exports = { getMainInfo, getOption, getBenefit, getRule, getSafety, getAllImgsByRoomId,
	getRoomList,
	getOptions,
	getLocationLatLng,
};
