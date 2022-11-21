/* 3rd Party Module(s) */
const express = require('express');
const router = express.Router();

/* File Imports */
const { authMiddleware } = require('../middlewares');
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
  .all(authMiddleware.isAuth)
  .all(authValidators.profileValidator)
  .patch(authControllers.updateProfile);

// prettier-ignore
router
  .route('/password')
  .all(authMiddleware.isAuth)
  .all(authValidators.passwordValidator)
  .patch(authControllers.updatePassword);

module.exports = router;
