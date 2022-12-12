const validator = require('validator');
const parseValidationError = require('../helpers/parseErrorHandler');

const createUserValidator = {
  fields: {
    first_name: {
      required: true,
      type: String,
      options: val => {
        if (!validator.isAlpha(val.trim())) {
          throw parseValidationError('First Name must contain letters only');
        }

        return true;
      },
    },
    last_name: {
      required: true,
      type: String,
      options: val => {
        if (!validator.isAlpha(val.trim())) {
          throw parseValidationError('First Name must contain letters only');
        }

        return true;
      },
    },
    email: {
      required: true,
      type: String,
      options: val => {
        if (!validator.isEmail(val.trim())) {
          throw parseValidationError('Invalid email format');
        }

        return true;
      },
    },
    username: {
      required: true,
      type: String,
      options: val => {
        if (!validator.isAlphanumeric(val.trim())) {
          throw parseValidationError('Special characters in username are not allowed');
        }

        return true;
      },
    },
    password: {
      required: true,
      type: String,
      options: val => {
        if (!validator.isStrongPassword(val.trim())) {
          throw parseValidationError(
            'Password must be 8 characters above and have least one uppercase, lowercase, number, and a special character'
          );
        }

        return true;
      },
    },
    confirm_password: {
      required: true,
      type: String,
    },
  },
};

module.exports = { createUserValidator };
