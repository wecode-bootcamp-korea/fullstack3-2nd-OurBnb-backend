const { userDao } = require('../models/');
const token = require('../utils/token');
const request = require('request-promise');

const kakaologin = async (kakaoToken) => {

    // HTTP Request 보낼 Kakao API 객체 정보
    const kakaoAPI = {
      uri: 'https://kapi.kakao.com/v2/user/me',
      method: 'GET',
      async: true,
      headers: {
        'Authorization': `Bearer ${kakaoToken}`,
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    }
    
    // 토큰을 카카오 API로 전달시 받을 사용자 정보가 담길 객체 
    // const jsonBody = await callKakaoAPI(kakaoAPI); 
    // console.log("jsonBody", jsonBody);
    // const kakaoUser = await createKakaoUserObj(jsonBody);

    // console.log("kakaoUser", kakaoUser);
    // // 데이터베이스 내에 해당 snsId가 존재 할 경우 해당 유저 정보 반환
    // let user = await userDao.getUserBySnsId(kakaoUser['snsId']);
    // // 데이터베이스 내에 해당 snsId가 존재하지 않을 경우
    // if (!user) {
    //     // 신규 유저 등록 
    //     await userDao.createUser(kakaoUser['userName'], kakaoUser['snsId'], kakaoUser['snsIsVerified']);
    //     // 신규 등록된 유저 정보 반환
    //     user = await userDao.getUserBySnsId(kakaoUser['snsId']);
    // }
    // console.log("user", user); 

    // //해당 유저의 snsId로 우리 서비스 자체 토큰 발행 후 최종 return 
    // return token.loginToken(user.snsId);
    
    // return 1;

    // 토큰을 카카오 API로 전달시 받을 사용자 정보가 담길 객체 
    const kakaoUser = {};
    // Kakao API로 사용자 정보를 가져오기 위해 HTTP GET Request 보내기 
    request(kakaoAPI, async function (error, response, body) {
        // 만약에 사용자 정보를 가져오는 걸 성공할 시 사용자 정보 담기
        if (!error && response.statusCode == 200) {
            const jsonBody = JSON.parse(body);
            console.log("kakao에서 보내준 사용자 데이터", jsonBody);
            kakaoUser['userName'] = jsonBody['properties']['nickname'];
            kakaoUser['snsId'] = jsonBody['id'];
            kakaoUser['snsIsVerified'] = true;
            //  kakaoUser['imgUrl'] = body['profile_image'];    users 테이블에 img_url 컬럼 추가시 커멘트 처리 해제 
        }

        // 실패할 시 에러 반환 
        else {
            console.log("error", error);
            throw error;
        }

        // 데이터베이스 내에 해당 snsId가 존재 할 경우 해당 유저 정보 반환
        let user = await userDao.getUserBySnsId(kakaoUser['snsId']);
        // 데이터베이스 내에 해당 snsId가 존재하지 않을 경우
        if (!user) {
            // 신규 유저 등록 
            await userDao.createUser(kakaoUser['userName'], kakaoUser['snsId'], kakaoUser['snsIsVerified']);
            // 신규 등록된 유저 정보 반환
            user = await userDao.getUserBySnsId(kakaoUser['snsId']);
        }
        console.log("user data", user); 
        //해당 유저의 snsId로 우리 서비스 자체 토큰 발행 후 최종 return 
        const ourToken = await token.loginToken(user.snsId);
        console.log("our service token", ourToken);
        return ourToken;
    });
}

const callKakaoAPI = async (kakaoAPI) => {
  // Kakao API로 사용자 정보를 가져오기 위해 HTTP GET Request 보내기 
  await request(kakaoAPI, async function (error, response, body) {
    // 만약에 사용자 정보를 가져오는 걸 성공할 시 사용자 정보 담기
    if (!error && response.statusCode == 200) {
        console.log(JSON.parse(body));
        return await JSON.parse(body);
    }
    // 실패할 시 에러 반환 
    else {
        console.log("error", error);
        return error;
    }
  });
}

const createKakaoUserObj = async (jsonBody) => {
  const kakaoObj = {}; 
  kakaoObj['userName'] = jsonBody['properties']['nickname'];
  kakaoObj['snsId'] = jsonBody['id'];
  kakaoObj['snsIsVerified'] = true;
  //  kakaoUser['imgUrl'] = body['profile_image'];    users 테이블에 img_url 컬럼 추가시 커멘트 처리 해제 
  return kakaoObj; 
}

// 아직 테스트 필요  
const kakaologout = async (kakaoToken) => { 
    const kakaoAPI = {
        uri: 'https://kapi.kakao.com/v1/user/unlink',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${kakaoToken}`
        }
      }
  
      request(kakaoAPI, function(error, response, body){
          if(!error&&response.statusCode==200) {
             console.log("body", body);
          }
          else {
              console.log("error", error);
          }
      });
}

module.exports = { kakaologin };