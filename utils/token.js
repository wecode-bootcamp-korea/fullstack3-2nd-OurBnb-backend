const jwt = require('jsonwebtoken');

const salt = 'OURBNBSALT';

const loginToken = (snsId) => {
  return jwt.sign({ id: snsId }, salt, { expiresIn: '30m' });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, salt);
  } catch (err) {
    return null;
  }
};

module.exports = { loginToken, verifyToken };