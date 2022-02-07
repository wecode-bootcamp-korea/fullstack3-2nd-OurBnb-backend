const { verifyToken } = require('../utils/token');
const { userDao } = require('../models');

const authToken = async (req, res, next) => {
// const validateToken
// 로그인한 고객만 사용가능한 API 검증 
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

// 로그인한 회원이라면, 회원의 id를 통해 정보를 받아온 뒤 API를 이용합니다.
// 로그인 하지 않은 고객이라면, 회원 정보를 사용하지 않고 API를 이용합니다.
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
