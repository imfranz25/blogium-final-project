/* 3rd Party Module(s) */
const express = require('express');
const router = express.Router();

/* File Imports */
const { blogControllers } = require('../controllers');
const { authMiddleware } = require('../middlewares');
const { blogValidators } = require('../validators');

// prettier-ignore
router
  .route('/blog')
  .all(authMiddleware.isAuth)
  .get(blogControllers.getBlogs);

router
  .route('/:blogId')
  .all(authMiddleware.isAuth)
  .all(blogValidators.createBlogValidator)
  .get(blogControllers.getBlog);

module.exports = router;
