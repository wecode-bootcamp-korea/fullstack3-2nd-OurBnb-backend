const jwt = require('jsonwebtoken');

const salt = 'OURBNBSALT';

const loginToken = (id) => {
	return jwt.sign({ id: id }, salt, { expiresIn: '2h' });
};

const verifyToken = token => {
	try {
		return jwt.verify(token, salt);
	} catch (err) {
		return null;
	}
};

module.exports = { loginToken, verifyToken };
