const jwt = require('jsonwebtoken');

const salt = 'OURBNBSALT';

<<<<<<< HEAD
const loginToken = id => {
	return jwt.sign({ id: id }, salt, { expiresIn: '30m' });
=======
const loginToken = (id) => {
  return jwt.sign({ id: id }, salt, { expiresIn: '2h' });
>>>>>>> cfc4e1b (Fix: reservation API)
};

const verifyToken = token => {
	try {
		return jwt.verify(token, salt);
	} catch (err) {
		return null;
	}
};

module.exports = { loginToken, verifyToken };
