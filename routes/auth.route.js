/* 3rd Party Module(s) */
const express = require('express');
const router = express.Router();

/* File Imports */
const { authControllers } = require('../controllers');
const { authValidator } = require('../validators');

router.post('/signup', authValidator.signUpValidator, authControllers.postSignUp);

router.post('/login', authValidator.loginValidator, authControllers.postLogin);

module.exports = router;
