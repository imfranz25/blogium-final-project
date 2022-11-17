const { body } = require('express-validator');
const { User } = require('../models');

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
  body('username')
    .trim()
    .isLength({ min: 4 })
    .withMessage('Username must be 4 characters and above')
    .custom((value, { req }) => {
      User.findOne({ username: value })
        .then((user) => {
          if (user) {
            return false;
          }

          /* Username doest not exist -> pass this validation  */
          return true;
        })
        .catch(() => {
          return false;
        });
    }),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail()
    .custom((value, { req }) => {
      User.findOne({ email: value })
        .then((user) => {
          if (user) {
            return false;
          }

          /* Username doest not exist -> pass this validation  */
          return true;
        })
        .catch(() => {
          return false;
        });
    }),
];
