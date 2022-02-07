const { userDao } = require('../models/');
const token = require('../utils/token');
const axios = require('axios');

const kakaologin = async kakaoToken => {
	// Kakao로부터 전달받은 사용자의 모든 정보
	const kakaoUserData = await getDataFromKakao(kakaoToken);

	// Kakao로 부터 사용자 정보를 전달받지 못할 시, 에러 처리
	if (!kakaoUserData) {
		const error = new Error('INVALID_USER');
		error.statusCode = 400;

		throw error;
	}

	console.log("kakaoUserData", kakaoUserData);
	// 필요한 정보만 골라내서 담을 Kakao User 객체
	const kakaoUser = {};

	kakaoUser['userName'] = kakaoUserData['properties']['nickname'];
	kakaoUser['snsId'] = kakaoUserData['id'];
	kakaoUser['snsIsVerified'] = true;
	kakaoUser['imgUrl'] = kakaoUserData['kakao_account']['profile']['profile_image_url'];

	console.log('kakaoUser', kakaoUser);

	// 데이터베이스 내에 해당 snsId가 존재 할 경우 해당 유저 정보 반환
	let user = await userDao.getUserBySnsId(kakaoUser['snsId']);
	// 데이터베이스 내에 해당 snsId가 존재하지 않을 경우
	if (!user) {
		// 신규 유저 등록
		await userDao.createUser(
			kakaoUser['userName'],
			kakaoUser['imgUrl'],
			kakaoUser['snsId'],
			kakaoUser['snsIsVerified'],
		);
		// 신규 등록된 유저 정보 반환
		user = await userDao.getUserBySnsId(kakaoUser['snsId']);
	}
	console.log('user data', user);
	//해당 유저의 snsId로 우리 서비스 자체 토큰 발행 후 최종 return
	const ourToken = await token.loginToken(user.snsId);
	return ourToken;
};

const getDataFromKakao = async kakaoToken => {
	const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
		headers: {
			Authorization: `Bearer ${kakaoToken}`,
			'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
		},
	});
	return response.data;
};

// 아직 테스트 필요
const kakaologout = async kakaoToken => {
	// Kakao에게 연결 끊기 요청을 하여 로그아웃과 액세스 토큰 만료시키기. 성공시 대상 사용자의 회원번호가 담긴다
	const logoutUserInfo = await postDataToKakao(kakaoToken);

	// Kakao에게 연결 끈기 요청 실패 시, 에러 처리
	if (!logoutUserInfo) {
		const error = new Error('INVALID_USER');
		error.statusCode = 400;

		throw error;
	}

	return logoutUserInfo;
};

const postDataToKakao = async kakaoToken => {
	const response = await axios.post('https://kapi.kakao.com/v1/user/unlink', {
		headers: {
			Authorization: `Bearer ${kakaoToken}`,
		},
	});
	return response.data;
};

module.exports = { kakaologin, kakaologout };
