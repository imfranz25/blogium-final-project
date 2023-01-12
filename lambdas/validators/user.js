const validator = require('validator');

const errorMessage = (msg) => {
  return { valid: false, message: msg };
};

const createUserValidator = (fields) => {
  if (validator.isEmpty(fields.profilePicture)) {
    return errorMessage('Profile Picture is required');
  }

  if (!validator.isAlpha(fields.firstName)) {
    return errorMessage('First name is required');
  }

  if (!validator.isAlpha(fields.lastName)) {
    return errorMessage('Last name is required');
  }

  if (!validator.isEmail(fields.email)) {
    return errorMessage('Please enter a valid email');
  }

  if (!validator.isLength(fields.userName, { min: 4 })) {
    return errorMessage('Username must be 4 characters above');
  }

  return { valid: true };
};

module.exports = { createUserValidator };
