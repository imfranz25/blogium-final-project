/* 3rd Party Module(s) */
const { body } = require('express-validator');

/* Custom Validators */
const { userCustomValidators } = require('./customs');

const loginValidator = [
  // prettier-ignore
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please input a valid email')
    .normalizeEmail({ gmail_remove_dots: false }),

  // prettier-ignore
  body('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Password is required'),
];

const signUpValidator = [
  body('first_name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('First name is required')
    .isAlpha('en-US', { ignore: ' ' })
    .withMessage('Invalid first name'),

  body('last_name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Last name is required')
    .isAlpha('en-US', { ignore: ' ' })
    .withMessage('Invalid last name'),

  body('email')
    .trim()
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail({ gmail_remove_dots: false })
    .custom(userCustomValidators.checkEmailExistence)
    .withMessage('Email is already taken'),

  body('username')
    .trim()
    .isLength({ min: 4 })
    .withMessage('Username must be 4 characters and above')
    .isAlphanumeric()
    .withMessage('Special characters are not allowed')
    .custom(userCustomValidators.checkUsernameExistence)
    .withMessage('Username is already taken'),

  // prettier-ignore
  body('password')
    .trim()
    .isStrongPassword()
    .withMessage('Weak Password'),

  body('confirm_password')
    .trim()
    .custom(userCustomValidators.checkConfirmPassword)
    .withMessage('Password and confirm password does not match'),
];

const profileValidator = [
  signUpValidator[0], // first_name
  signUpValidator[1], // last_name
  signUpValidator[2], // email
  signUpValidator[3], // username
];

const passwordValidator = [
  signUpValidator[4], // new password
  signUpValidator[5], // confirm_password

  body('old_password')
    .trim()
    .custom(userCustomValidators.checkOldPassword)
    .withMessage('Incorrect Password'),
];

module.exports = {
  loginValidator,
  signUpValidator,
  profileValidator,
  passwordValidator,
};
