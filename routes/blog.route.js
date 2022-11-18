/* 3rd Party Module(s) */
const express = require('express');
const router = express.Router();

/* File Imports */
const { blogControllers } = require('../controllers');
// const { blogValidator } = require('../validators');

router.get('/:blogId', blogControllers.getBlog);

module.exports = router;
