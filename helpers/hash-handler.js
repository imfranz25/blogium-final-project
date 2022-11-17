const md5 = require('md5');
require('dotenv').config();

const SECRET_PASSKEY = process.env.SECRET_PASSKEY;

/**
 * Hash Generator with MD5 library
 * userId + password -> hashed password
 * @param {string} userId
 * @param {string} password
 * @returns {string} -> hashed password
 */
exports.generateHash = (userId, password) => {
  return md5(userId + password + SECRET_PASSKEY);
};

/**
 * Generate a hash with usedId and password user input
 * then compare it with hashedPassword (stored in database)
 * @param {string} userId
 * @param {string} password
 * @param {string} hashedPassword
 * @returns {boolean} -> return true if matched otherwise false
 */
exports.compareHash = (userId, password, hashedPassword) => {
  const hashedPasswordInput = md5(userId + password + SECRET_PASSKEY);
  const isMatched = hashedPasswordInput === hashedPassword;

  return isMatched;
};
