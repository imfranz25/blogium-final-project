/* 3rd Party Module(s) */
const express = require('express');
const router = express.Router();

/* File Imports */
const { authControllers } = require('../controllers');
const { authValidators } = require('../validators');

router.route('/signup').all(authValidators.signUpValidator).post(authControllers.postSignUp);

router.route('/login').all(authValidators.loginValidator).post(authControllers.postLogin);

module.exports = router;
