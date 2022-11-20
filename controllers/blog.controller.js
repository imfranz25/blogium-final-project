/* 3rd Party Module(s) */
const { validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');

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
exports.getBlogs = async (_req, res, next) => {
  try {
    const blogs = await Blog.find({ deleted_at: null });

    res.status(200).json({ message: 'Blogs fetched', blogs });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new blog
 * @route POST /blog/add
 */
exports.postBlog = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ message: 'Invalid Inputs', errors: errors.array() });
  }

  try {
    const blogId = uuidv4();
    const userId = req.user.userId;
    const newBlog = new Blog({ ...req.body, id: blogId, user_id: userId });

    await newBlog.save();
    res.status(201).json({ message: 'Blog created', blog: newBlog });
  } catch (error) {
    next(error);
  }
};

/**
 * Update blog details
 * @route PATCH /blog/:blogId
 */
exports.updateBlog = async (req, res, next) => {
  const { blogId } = req.params;
  const { title, description } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ message: 'Invalid Input', errors: errors.array() });
  }

  try {
    const existingBlog = await Blog.findOne({ id: blogId });

    if (!existingBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    existingBlog.title = title;
    existingBlog.description = description;

    await existingBlog.save();

    res.status(200).json({ message: 'Blog updated', blog: existingBlog });
  } catch (error) {
    next(error);
  }
};

/**
 * Soft Delete -> Selected Blog (update delete_at with current date time)
 * @route DELETE /:blogId
 */
exports.deleteBlog = async (req, res, next) => {
  const { blogId } = req.params;

  try {
    const blog = await Blog.findOne({ id: blogId });

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    blog.deleted_at = new Date().toISOString();

    await blog.save();
    res.status(200).json({ message: 'Blog deleted', blog });
  } catch (error) {
    next(error);
  }
};
