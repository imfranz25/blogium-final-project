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

// prettier-ignore
router.route('/myblog')
  .all(authMiddleware.isAuth)
  .get(blogControllers.getMyBlogs);

router
  .route('/:blogId')
  .all(authMiddleware.isAuth)
  .get(blogControllers.getBlog)
  .delete(blogControllers.deleteBlog);

router
  .route('/blog/add')
  .all(authMiddleware.isAuth)
  .all(blogValidators.blogInputValidator)
  .post(blogControllers.postBlog);

// prettier-ignore
router
  .route('/blog/draft')
  .all(authMiddleware.isAuth)
  .post(blogControllers.postDraftBlog);

router
  .route('/blog/:blogId')
  .all(authMiddleware.isAuth)
  .all(blogValidators.blogInputValidator)
  .patch(blogControllers.updateBlog);

module.exports = router;
