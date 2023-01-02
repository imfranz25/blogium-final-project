/* 3rd Party Modules */
const validator = require('validator');

/**
 * Description
 * @param {Number} min -> minimum characters allowed
 * @param {String} errorMsg -> Message to show if valdiation error occured
 * @returns {Object}
 */
const fieldValidator = (min, errorMsg) => {
  return {
    required: true,
    type: String,
    options: val => {
      if (!validator.isLength(val.trim(), { min })) {
        throw new Parse.Error(Parse.Error.VALIDATION_ERROR, errorMsg);
      }

      return true;
    },
  };
};

const createBlogValidator = {
  fields: {
    title: fieldValidator(4, 'Blog title must be 4 characters above'),
    description: fieldValidator(10, 'Blog description must be 10 characters above'),
    blogCover: fieldValidator(1, 'Blog cover is required'),
  },
};

const editBlogValidator = {
  fields: {
    title: fieldValidator(4, 'Blog title must be 4 characters above'),
    description: fieldValidator(10, 'Blog description must be 10 characters above'),
    blogId: {
      required: true,
      type: String,
    },
  },
};

const deleteBlogValidator = {
  fields: {
    blogId: {
      required: true,
      type: String,
    },
  },
};

module.exports = { createBlogValidator, editBlogValidator, deleteBlogValidator };
