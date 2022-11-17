/* 3rd Party Module(s) */
const express = require('express');
const router = express.Router();

/* File Imports */
const { authControllers } = require('../controllers');
const { userValidator } = require('../validators');

router.post('/signup', userValidator.signUpValidator, authControllers.postSignUp);

module.exports = router;
