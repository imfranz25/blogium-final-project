const { User } = require('../../models');

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

exports.checkConfirmPassword = (value, { req }) => {
  if (value !== req.body.password) {
    return false;
  }

  return true;
};
