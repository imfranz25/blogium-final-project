/* 3rd Party Module(s) */
const { body } = require('express-validator');

exports.blogInputValidator = [
  // prettier-ignore
  body('title')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Blog title is required'),

  // prettier-ignore
  body('description')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Description is required'),
];
