const { roomDetailDao } = require('../models');

const getRoomDetail = async (roomId) => {

  const detail = {}; 

  const mainInfo = await roomDetailDao.getMainInfo(roomId);
  const option = await roomDetailDao.getOption(roomId); 
  const benefit = await roomDetailDao.getBenefit(roomId); 
  const rule = await roomDetailDao.getRule(roomId); 
  const safety = await roomDetailDao.getSafety(roomId); 

  detail['mainInfo'] = mainInfo; 
  detail['option'] = option;
  detail['benefit'] = benefit;
  detail['rule'] = rule;
  detail['safety'] = safety;  

  if (!detail['mainInfo'] || !detail['option'] || !detail['benefit'] || 
      !detail['rule'] || !detail['safety']) {
    const error = new Error('ROOM DETAIL LOAD FAILED');
    error.statusCode = 400;
    throw error;
  }

  return detail;
};

module.exports = { getRoomDetail };