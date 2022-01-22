const prisma = require('./index');

const getRoomDetail = async (roomId) => {
  const detail = await prisma.$queryRaw``;

  return detail;
};

module.exports = { getRoomDetail };