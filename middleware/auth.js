const { verifyToken } = require('../utils/token');
const { userDao } = require('../models');
const { json } = require('express');

const authToken = async (req, res, next) => {
	try {
		const token = req.headers.authorization;

		if (!token) {
			return res.status(401).json({ message: 'LOGIN_REQUIRED' });
		}

		const decodedToken = verifyToken(token);
		if (!decodedToken) {
			return res.status(401).json({ message: 'INVALID_TOKEN' });
		}

		const { id } = verifyToken(token);

		if (!id) {
			return res.status(401).json({ message: 'INVALID_TOKEN' });
		}

		const userInfo = await userDao.getUserBySnsId(id);

		if (!userInfo) {
			return res.status(401).json({ message: 'INVALID_TOKEN' });
		}

		req.userId = userInfo.userId;

		next();
	} catch (err) {
		next(err);
	}
};

const checkToken = async (req, res, next) => {
	try {
		const token = req.headers.authorization;
		const decodedToken = verifyToken(token);
		const snsId = decodedToken ? decodedToken.id : null;
		const userInfo = snsId ? await userDao.getUserBySnsId(snsId) : null;

		req.userId = userInfo ? userInfo.userId : null;

		next();
	} catch (err) {
		next(err);
	}
};

module.exports = { authToken, checkToken };
