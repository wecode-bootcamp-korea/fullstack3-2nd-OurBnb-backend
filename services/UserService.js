const { userDao } = require('../models/');
const token = require('../utils/token');
const request=require('request');

const kakaologin = async (kakaoToken) => {
    //username => nickname, snsId => id, snsIsVerified => true, img_url => profile_image(컬럼추가 필요)
    const kakaoUser = {}; 
    // Kakao API 객체 
    const kakaoAPI = {
      uri: 'https://kapi.kakao.com/v2/user/me',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${kakaoToken}`,
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    }
    // Kakao API로 사용자 정보를 가져오기 위해 HTTP GET Request 보내기 
    request(kakaoAPI, function(error, response, body){
        if(!error&&response.statusCode==200) {
            const jsonBody = JSON.parse(body);
            kakaoUser['userName'] = jsonBody['properties']['nickname']; 
            kakaoUser['snsId'] = jsonBody['id']; 
            kakaoUser['snsIsVerified'] = true;
        //  kakaoUser['imgUrl'] = body['profile_image'];
        }
        else { 
          console.log("error", error);
          throw error; 
        }
        
        // let user = await userDao.getUserBySnsId(kakaoUser['snsId']);
        // if (!user) {
            //Sign up (우리 데이터베이스에 신규 유저 등록)
            // user = await userDao.createUser(kakaoUser); 
        // }

        // 우리 서비스 자체 토큰 발행
        // const ourToken = token.loginToken(user.snsId);
        // return ourToken;
        console.log("kakaoUser", kakaoUser);
    });
    return await 1;
}

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