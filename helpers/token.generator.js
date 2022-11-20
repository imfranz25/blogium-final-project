const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Generate token and return it with Bearer keyword -> set expiration to 1 hour
 * @param {object} payload
 * @returns {string}
 */
module.exports = (user) => {
  const { JWT_SECRET } = process.env;
  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      username: user.username,
      image: user.profile_picture_url,
      first_name: user.first_name,
      last_name: user.last_name,
    },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  return `Bearer ${token}`;
};
