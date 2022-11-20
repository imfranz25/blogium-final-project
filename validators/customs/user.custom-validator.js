const { User } = require('../../models');
const { passGen } = require('../../helpers');

/**
 * Check if email input is already exist in the database
 * @param {string} value
 * @returns {promise}
 */
exports.checkEmailExistence = async (value) => {
  try {
    const isEmailExist = await User.findOne({ email: value });

    if (isEmailExist) {
      return Promise.reject(); // equivalent -> return false
    }
  } catch (error) {
    return Promise.reject(); // equivalent -> return false
  }
};

/**
 * Check if username input already exist in the database
 * @param {string} value
 * @returns {promise}
 */
exports.checkUsernameExistence = async (value) => {
  try {
    const isUsernameExist = await User.findOne({ username: value });

    if (isUsernameExist) {
      return Promise.reject(); // equivalent -> return false
    }
  } catch (error) {
    return Promise.reject(); // equivalent -> return false
  }
};

/**
 * Check if Password & Confirm Password is match
 * @param {string} value
 * @param {object} {req}
 * @returns {Boolean}
 */
exports.checkConfirmPassword = (value, { req }) => {
  if (value !== req.body.password) {
    return false;
  }

  return true;
};

/**
 * Check if the old password input is correct
 * @param {string} value -> old password input
 * @param {object} {req}
 * @returns {promise}
 */
exports.checkOldPassword = async (value, { req }) => {
  const userId = req.user?.userId;

  try {
    const existingUser = await User.findOne({ id: userId });
    const isMatched = passGen.compareHash(userId, value, existingUser.password);

    if (!isMatched) {
      return Promise.reject(); // equivalent -> return false
    }
  } catch (error) {
    return Promise.reject(); // equivalent -> return false
  }
};
