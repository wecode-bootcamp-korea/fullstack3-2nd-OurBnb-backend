const verifyToken = require('../utils/token');
const { userDao } = require('../models');

const authToken = async (res, req, next) => {
	try {
		const token = req.header.authorization;

		const { id } = verifyToken(token);

		const userInfo = await userDao.getUserBySnsId(id);

		if (!userInfo) {
			return res.status(401).json({ message: 'invalid_token' });
		}

		req.userId = userInfo.userId;

		next();
	} catch (err) {
		next(err);
	}
};

module.exports = { authToken };
