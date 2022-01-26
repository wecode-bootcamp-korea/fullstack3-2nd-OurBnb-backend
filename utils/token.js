const jwt = require('jsonwebtoken');

const salt = 'OURBNBSALT';

const loginToken = id => {
	return jwt.sign({ id: id }, salt, { expiresIn: '30m' });
};

const verifyToken = token => {
	try {
		return jwt.verify(token, salt);
	} catch (err) {
		return null;
	}
};

module.exports = { loginToken, verifyToken };
