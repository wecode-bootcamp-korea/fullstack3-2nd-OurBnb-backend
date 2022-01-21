const prisma = require('./index');

const getUserBySnsId = async (snsId) => {
  const [user] = await prisma.$queryRaw`
    SELECT 
      username, 
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

const createUser = async (username, snsId, snsIsVerified) => {
    const createData = await prisma.$queryRaw`
          INSERT INTO 
            users (username, sns_id, sns_is_verified) 
          VALUES 
            (${username}, ${snsId}, ${snsIsVerified})
          `;  
    return createData;
};


module.exports = { getUserBySnsId, createUser }