/* 3rd Party Module(s) */
const { body } = require('express-validator');

/* Custom Validators */
const { userCustomValidators } = require('./customs');

exports.signUpValidator = [
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
    .normalizeEmail()
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

  body('password').trim().isStrongPassword().withMessage('Weak Password'),

  body('confirm_password')
    .trim()
    .custom(userCustomValidators.checkConfirmPassword)
    .withMessage('Password and confirm password does not match'),
];

exports.loginValidator = [
  body('email').trim().isEmail().withMessage('Please input a valid email').normalizeEmail(),

  body('password').trim().not().isEmpty().withMessage('Password is required'),
];
