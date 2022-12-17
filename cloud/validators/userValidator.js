/* 3rd Party Modules */
const validator = require('validator');

const nameValidator = field => {
  return {
    required: true,
    type: String,
    options: val => {
      if (validator.isEmpty(val.trim())) {
        throw new Parse.Error(Parse.Error.VALIDATION_ERROR, `${field} is required`);
      }

      if (!validator.isAlpha(val.trim(), 'en-US', { ignore: ' ' })) {
        throw new Parse.Error(Parse.Error.VALIDATION_ERROR, `${field} must only contain letters`);
      }

      return true;
    },
  };
};

const emailValidator = {
  required: true,
  type: String,
  options: val => {
    if (!validator.isEmail(val.trim())) {
      throw new Parse.Error(Parse.Error.VALIDATION_ERROR, 'Invalid email format');
    }

    return true;
  },
};

const userNameValidator = {
  required: true,
  type: String,
  options: val => {
    if (!validator.isLength(val.trim(), { min: 4 })) {
      throw new Parse.Error(Parse.Error.VALIDATION_ERROR, 'Username must be 4 characters above');
    }

    if (!validator.isAlphanumeric(val.trim())) {
      throw new Parse.Error(
        Parse.Error.VALIDATION_ERROR,
        'Special characters in username are not allowed'
      );
    }

    return true;
  },
};

const strongPasswordValidator = {
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
};

const createUserValidator = {
  fields: {
    firstName: nameValidator('First name'),
    lastName: nameValidator('Last name'),
    email: emailValidator,
    userName: userNameValidator,
    password: strongPasswordValidator,
    confirmPassword: {
      required: true,
      type: String,
    },
  },
};

const editUserValidator = {
  fields: {
    firstName: nameValidator('First name must contain letters'),
    lastName: nameValidator('Last name must contain letters'),
    email: emailValidator,
    username: userNameValidator,
  },
};

const editPasswordValidator = {
  fields: {
    currentPassword: {
      required: true,
      type: String,
    },
    newPassword: {
      required: true,
      type: String,
    },
    confirmPassword: {
      required: true,
      type: String,
    },
  },
};

module.exports = { createUserValidator, editUserValidator, editPasswordValidator };
