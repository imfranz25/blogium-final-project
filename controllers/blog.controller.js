/* Core Modules */
const path = require('path');
const fs = require('fs');

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
    const blog = await Blog.findOne({ id: blogId, deleted_at: null }).populate('user_id');

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json({ message: 'Blog fetched', blog });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all blogs -> delete_at property of each blog must be null (not deleted) & not draft
 * @route GET /blog
 */
exports.getBlogs = async (_req, res, next) => {
  try {
    const blogs = await Blog.find({ deleted_at: null, is_draft: false }).populate('user_id');

    res.status(200).json({ message: 'Blogs fetched', blogs });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all blogs of the logged in user
 * @route GET /myblog
 */
exports.getMyBlogs = async (req, res, next) => {
  try {
    const userId = req.user._id.toString();
    const blogs = await Blog.find({ user_id: userId }).populate('user_id');

    res.status(200).json({ message: 'User Blogs fetched', blogs });
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
  const { files } = req;

  /* Check files property if it contains uplod from profile_picture_url field */
  if (!files['cover_picture_url']) {
    const imgError = { msg: 'No uploaded profile, also check image size limit (10mb)' };
    return res.status(422).json({ message: 'Invalid Input', errors: [imgError] });
  }

  /* Get File Image Properties */
  const image = req.files['cover_picture_url'][0];

  if (!errors.isEmpty()) {
    if (image) {
      const imageFileName = req.imageId + '-' + image.originalname;
      const imagePath = path.join('public', 'uploads', 'blogs', imageFileName);

      fs.unlink(imagePath, (error) => {
        if (error) {
          return res.status(500).json({ message: 'Internal Server Error' });
        }
      });
    }
    return res.status(422).json({ message: 'Invalid Inputs', errors: errors.array() });
  }

  try {
    const blogId = uuidv4();
    const newBlog = new Blog({
      ...req.body,
      id: blogId,
      user_id: req.user._id, // mongoose ID -> use to populate later on
      cover_picture_url: image.path,
    });

    await newBlog.save();
    res.status(201).json({ message: 'Blog created', blog: newBlog });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a Blog with Draft state
 * @route POST /blog/draft
 */
exports.postDraftBlog = async (req, res, next) => {
  const title = req.body.title || '[Draft]';
  const description = req.body.description || '[Draft]';
  const { files } = req;
  let imagePath = null;

  /* Get image path if user uplaoded a picture */
  if (files['cover_picture_url']) {
    imagePath = req.files['cover_picture_url'][0].path;
  }

  /* If no image is selected -> set to default image */
  if (!imagePath) {
    imagePath = path.join('public', 'uploads', 'blogs', 'default.jpg');
  }

  try {
    const blogId = uuidv4();
    const newDraftBLog = await Blog.create({
      id: blogId,
      title: title,
      description: description,
      user_id: req.user._id, // mongoose ID -> use to populate later on
      is_draft: true,
      cover_picture_url: imagePath,
    });

    res.status(201).json({ message: 'Blog has been moved to draft', blog: newDraftBLog });
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
  const { userId } = req.user;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ message: 'Invalid Input', errors: errors.array() });
  }

  try {
    const existingBlog = await Blog.findOne({ id: blogId });

    if (!existingBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    /* Can only update user's own post blog */
    if (userId !== existingBlog.user_id) {
      return res.status(401).json({ message: 'Unauthorized action' });
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
  const { _id } = req.user;

  try {
    const existingBlog = await Blog.findOne({ id: blogId }).populate('user_id');
    const userId = existingBlog.user_id._id.toString();

    if (!existingBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    /* Can only delete user's own post blog */
    if (_id.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized action' });
    }

    existingBlog.deleted_at = new Date().toISOString();

    await existingBlog.save();

    res.status(200).json({ message: 'Blog deleted', blog: existingBlog });
  } catch (error) {
    next(error);
  }
};
