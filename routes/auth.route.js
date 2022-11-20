/* 3rd Party Module(s) */
const express = require('express');
const router = express.Router();

/* File Imports */
const { authControllers } = require('../controllers');
const { authValidators } = require('../validators');

// prettier-ignore
router
  .route('/signup')
  .all(authValidators.signUpValidator)
  .post(authControllers.postSignUp);

// prettier-ignore
router
  .route('/login')
  .all(authValidators.loginValidator)
  .post(authControllers.postLogin);

// prettier-ignore
router
  .route('/profile')
  .all(authValidators.profileValidator)
  .patch(authControllers.updateProfile);

module.exports = router;
