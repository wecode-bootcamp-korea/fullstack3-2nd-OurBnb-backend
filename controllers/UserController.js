const { userService } = require('../services');

const kakaologin = async (req, res) => {
	try {
		// headers의 authorization을 통해 카카오 토큰 가져오기
		const kakaoToken = req.headers.authorization;

		// 만약 카카오 토큰이 존재하지 않을 경우, 에러 메세지 반환
		if (!kakaoToken) {
			return res.status(400).json({ message: 'KAKAO TOKEN ERROR' });
		}

		// 만약 토큰이 존재한다면, 우리 서비스 만의 토큰으로 변경
		const ourToken = await userService.kakaologin(kakaoToken);

		console.log('ourToken', ourToken);

		// 우리 서비스 만의 토큰을 프론트로 반환
		return res.status(200).json({ message: 'LOGIN SUCCESS', ourToken });
	} catch (err) {
		return res.status(500).json({ message: 'KAKAO LOGIN PROCESS FAILED' });
	}
};

const getReservationList = async (req, res) => {
	try {
		const userId = req.userId;
		const reservationList = await userService.getReservationList(userId);

		return res.status(200).json(reservationList);
	} catch (err) {
		console.log(err);
		return res.status(400).json({ message: 'ERROR' });
	}
};

module.exports = { kakaologin, getReservationList };
