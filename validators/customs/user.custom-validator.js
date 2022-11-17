const { User } = require('../../models');

exports.checkEmailExistence = async (value) => {
  try {
    const isEmailExist = User.findOne({ email: value });

    if (isEmailExist) {
      Promise.reject(); // equivalent -> return false
    }
  } catch (error) {
    Promise.reject(); // equivalent -> return false
  }
};

exports.checkUsernameExistence = async (value) => {
  try {
    const isUsernameExist = await User.findOne({ username: value });

    if (isUsernameExist) {
      Promise.reject(); // equivalent -> return false
    }
  } catch (error) {
    Promise.reject(); // equivalent -> return false
  }
};

exports.checkConfirmPassword = (value, { req }) => {
  if (value !== req.body.password) {
    return false;
  }

  return true;
};
