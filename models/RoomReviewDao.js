const prisma = require('./index');

const getRoomReview = async (roomId) => { 
  const review = await prisma.$queryRaw`
    SELECT
      users.username,
      users.img_url AS imgUrl,
      user_reviews.review,
      user_reviews.rate,
      user_reviews.created_at AS reviewCreatedAt
    FROM user_reviews
    JOIN 
      users on user_reviews.user_id = users.id 
    JOIN
      rooms on user_reviews.room_id = rooms.id 
    WHERE
      user_reviews.room_id = ${roomId}
    `;
    return review;
}

const getAvgRoomRate = async (roomId) => {
  const [{avgRate}] = await prisma.$queryRaw`
    SELECT 
      AVG(rate) as avgRate
    FROM user_reviews
    WHERE 
      user_reviews.room_id = ${roomId}
  `;
  return avgRate;
}

module.exports = { getRoomReview, getAvgRoomRate };