const verifyToken = require('../utils/token');
const { userDao } = require('../models');

const authToken = async (res, req, next) => {
	try {
		const token = req.header.authorization;

		if (!token) {
			return res.status(401).json({ message: 'LOGIN_REQUIRED' });
		}

		const { id } = verifyToken(token);

		if (!id) {
			return res.status(401).json({ message: 'INVAILD_TOKEN' });
		}

		const userInfo = await userDao.getUserBySnsId(id);

		if (!userInfo) {
			return res.status(401).json({ message: 'INVAILD_TOKEN' });
		}

		req.userId = userInfo.userId;

		next();
	} catch (err) {
		next(err);
	}
};

const checkToken = async (res, req, next) => {
	try {
		const token = req.header.authorization;
		const userId = token ? verifyToken(token).id : null;

		req.userId = userId;

		next();
	} catch (err) {
		next(err);
	}
};

module.exports = { authToken, checkToken };
