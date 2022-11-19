const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Generate token and return it with Bearer keyword -> set expiration to 1 hour
 * @param {object} payload
 * @returns {string}
 */
module.exports = (payload) => {
  const { JWT_SECRET } = process.env;
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

  return `Bearer ${token}`;
};
