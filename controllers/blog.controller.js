/* 3rd Party Module(s) */
// const { validationResult } = require('express-validator');
// const { v4: uuidv4 } = require('uuid');

/* Models & Helpers */
const { Blog } = require('../models');

/**
 * Create a new user
 * @route GET /:blogId
 */
exports.getBlog = async (req, res, next) => {
  const { blogId } = req.params;

  try {
    const blog = await Blog.findOne({ id: blogId, deleted_at: null });

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json({ message: 'Blog fetched', blog });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all blogs -> delete_at property of each blog must be null (not deleted)
 * @route GET /blog
 */
exports.getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({ deleted_at: null });

    res.status(200).json({ message: 'Blogs fetched', blogs });
  } catch (error) {
    next(error);
  }
};
