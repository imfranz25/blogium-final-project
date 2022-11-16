const express = require('express');
const router = express.Router();
const { authControllers } = require('../controllers');

router.get('/signup', authControllers.getSignUp);

module.exports = router;
