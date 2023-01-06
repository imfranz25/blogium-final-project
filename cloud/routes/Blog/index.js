const createBlog = require('./createBlog');
const editBlog = require('./editBlog');
const getBlogs = require('./getBlogs');
const getBlog = require('./getBlog');
const {
  createBlogValidator,
  editBlogValidator,
  deleteBlogValidator,
} = require('../../validators/blogValidator');

module.exports = function () {
  Parse.Cloud.define('getBlog', getBlog);
  Parse.Cloud.define('getBlogs', getBlogs);
  Parse.Cloud.define('createBlog', createBlog, createBlogValidator);
  Parse.Cloud.define('editBlog', editBlog, editBlogValidator);
  Parse.Cloud.define('deleteBlog', editBlog, deleteBlogValidator);
};
