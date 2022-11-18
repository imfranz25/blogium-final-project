const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (payload) => {
  const { JWT_SECRET } = process.env;
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

  return `Bearer ${token}`;
};
