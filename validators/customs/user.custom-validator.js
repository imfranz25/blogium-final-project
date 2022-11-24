const { User } = require('../../models');
const { passGen } = require('../../utils');

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

/**
 * Check if email input is already exist in the database
 * except if it's his/her own email
 * @param {string} value
 * @param {any} {req}
 * @returns {any}
 */
exports.checkEmailUpdate = async (value, { req }) => {
  try {
    const isEmailExist = await User.findOne({ email: value });
    const isOwnEmail = isEmailExist?.id === req.user.userId;

    if (isEmailExist && !isOwnEmail) {
      return Promise.reject(); // equivalent -> return false
    }
  } catch (error) {
    return Promise.reject(); // equivalent -> return false
  }
};

/**
 * Check if username input already exist in the database
 * except if it's his/her own username
 * @param {string} value
 * @param {any} {req}
 * @returns {promise}
 */
exports.checkUsernameUpdate = async (value, { req }) => {
  try {
    const isUsernameExist = await User.findOne({ username: value });
    const isOwnUsername = isUsernameExist?.id === req.user.userId;

    if (isUsernameExist && !isOwnUsername) {
      return Promise.reject(); // equivalent -> return false
    }
  } catch (error) {
    return Promise.reject(); // equivalent -> return false
  }
};
