/* 3rd Party Module(s) */
const { body } = require('express-validator');

exports.createBlogValidator = [
  body('title').trim().not().isEmpty().withMessage('Blog title is required'),

  body('description').trim().not().isEmpty().withMessage('Description is required'),
];
