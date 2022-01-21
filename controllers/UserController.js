const { userService } = require('../services');

const kakaologin = async (req, res) => {
    try {
      const kakaoToken = req.headers.authorization;

      if (!kakaoToken) {
        return res.status(400).json({ message: 'KAKAO TOKEN ERROR' });
      }
      
      const ourToken = await userService.kakaologin(kakaoToken);
      const a = 0;
      return res.status(200).json({ message: "LOGIN SUCCESS", a});
    } catch (err) {
        return res.status(500).json({ message: 'KAKAO LOGIN PROCESS FAILED' });
    }
}; 

module.exports = { kakaologin };