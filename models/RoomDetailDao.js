const prisma = require('./index');

const getMainInfo = async (roomId) => { 
  const detail = await prisma.$queryRaw`
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
      (SELECT GROUP_CONCAT(public_imgs.img_url SEPARATOR ',') FROM public_imgs WHERE public_imgs.room_id = roomId )AS imgUrl
    FROM rooms
    JOIN 
      public_imgs ON rooms.id = public_imgs.room_id 
    JOIN 
      room_types ON rooms.room_type_id = room_types.id 
    JOIN 
      locations ON rooms.location_id = locations.id
    JOIN 
      hosts ON rooms.host_id = hosts.id 
    WHERE 
      rooms.id = ${roomId}
    AND 
      public_imgs.is_main =1
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

const getAllImgs = async (roomId) => {
  const allImgs = await prisma.$queryRaw`
    SELECT 
      public_imgs.img_url AS imgUrl
    FROM public_imgs
    JOIN 
      public_imgs ON public_imgs.room_id = rooms.id
    WHERE 
      rooms.id = ${roomId}
  `;
  return allImgs;
}

module.exports = { getMainInfo, getOption, getBenefit, getRule, getSafety, getAllImgs };