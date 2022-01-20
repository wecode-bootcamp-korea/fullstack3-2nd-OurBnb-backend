const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = prisma;

const userDao = require('./UserDao');

module.exports = { userDao };
