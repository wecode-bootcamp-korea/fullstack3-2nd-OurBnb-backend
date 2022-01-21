const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = prisma;

const userDao = require('./UserDao');
const roomDao = require('./roomDao');

module.exports = { userDao, roomDao };
