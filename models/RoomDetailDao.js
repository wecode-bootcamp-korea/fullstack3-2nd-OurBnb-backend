const prisma = require('./index');

const getRoomDetail = async (roomId) => { 
  const detail = await prisma.$queryRaw`
    SELECT
      id AS roomId,
      name AS roomName,
      address,
      description AS roomDesc,
      price,
      guest_capacity AS guestCapacity,
      bed_count AS bedCount,
      bedroom_count AS bedroomCount,
      bathroom_count AS bathroomCount,
      cleaning_fee AS cleaningFee,
      latitude,
      longitude,
      public_imgs.img_url AS imgUrl,
      room_types.name AS roomType,
      locations.name AS location,
      hosts.is_super_host AS isSuperHost,
      hosts.description AS hostDesc,
      options.name AS optionName,                
      options.logo_url AS optionLogoUrl,
      options.is_main AS isMainOption,
      option_types.name AS optionType,
      benefits.title AS benefitTitle, 
      benefits.logo_url AS benefitLogoUrl, 
      benefits.description AS benefitDesc,
      rules.logo_url AS rulesLogoUrl, 
      rules.description AS rulesDesc, 
      safety.logo_url AS safetyLogoUrl, 
      safety.description AS safetyDesc   
    FROM rooms
    JOIN 
      public_imgs ON rooms.id = public_imgs.room_id 
    JOIN 
      room_types ON rooms.room_type_id = room_types.id 
    JOIN 
      locations ON rooms.location_id = locations.id
    JOIN 
      hosts ON rooms.host_id = hosts.id 
    INNER JOIN 
      rooms_options ON rooms.id = rooms_options.room_id
    INNER JOIN
      options ON rooms_options.option_id = options.id
    INNER JOIN 
      rooms_benefits ON rooms.id = rooms_benefits.room_id
    INNER JOIN
      benefits ON rooms_benefits.benefit_id = benefits.id
    INNER JOIN 
      rooms_rules ON rooms.id = rooms_rules.room_id
    INNER JOIN
      rules ON rooms_rules.rule_id = rules.id
    INNER JOIN 
      rooms_safety ON rooms.id = rooms_safety.room_id
    INNER JOIN
      safety ON rooms_safety.safety_id = safety.id 
    WHERE 
      rooms.id = ${roomId}
  `; 
  return detail;
};



module.exports = { getRoomDetail };