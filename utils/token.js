const jwt = require('jsonwebtoken');

const salt = 'OURBNBSALT';

const loginToken = async (snsId) => {
  return await jwt.sign({ id: snsId }, salt, { expiresIn: '30m' });
};

const verifyToken = async (token) => {
  try {
    return await jwt.verify(token, salt);
  } catch (err) {
    return null;
  }
};

module.exports = { loginToken, verifyToken };