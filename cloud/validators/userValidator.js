/* 3rd Party Modules */
const validator = require('validator');

const createUserValidator = {
  fields: {
    firstName: {
      required: true,
      type: String,
      options: val => {
        if (!validator.isAlpha(val.trim(), 'en-US', { ignore: ' ' })) {
          throw new Parse.Error(Parse.Error.VALIDATION_ERROR, 'First name must contain letters');
        }

        return true;
      },
    },
    lastName: {
      required: true,
      type: String,
      options: val => {
        if (!validator.isAlpha(val.trim(), 'en-US', { ignore: ' ' })) {
          throw new Parse.Error(Parse.Error.VALIDATION_ERROR, 'Last name must contain letters');
        }

        return true;
      },
    },
    email: {
      required: true,
      type: String,
      options: val => {
        if (!validator.isEmail(val.trim())) {
          throw new Parse.Error(Parse.Error.VALIDATION_ERROR, 'Invalid email format');
        }

        return true;
      },
    },
    username: {
      required: true,
      type: String,
      options: val => {
        if (!validator.isAlphanumeric(val.trim())) {
          throw new Parse.Error(
            Parse.Error.VALIDATION_ERROR,
            'Special characters in username are not allowed'
          );
        }

        return true;
      },
    },
    password: {
      required: true,
      type: String,
      options: val => {
        if (!validator.isStrongPassword(val.trim())) {
          throw new Parse.Error(
            Parse.Error.VALIDATION_ERROR,
            'Password must be 8 characters above and have least one uppercase, lowercase, number, and a special character'
          );
        }

        return true;
      },
    },
    confirmPassword: {
      required: true,
      type: String,
    },
  },
};

module.exports = { createUserValidator };
