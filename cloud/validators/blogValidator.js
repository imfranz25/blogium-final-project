/* 3rd Party Modules */
const validator = require('validator');

const createBlogValidator = {
  fields: {
    title: {
      required: true,
      type: String,
      options: val => {
        if (!validator.isLength(val.trim(), { min: 4 })) {
          /* prettier-ignore */
          throw new Parse.Error(
            Parse.Error.VALIDATION_ERROR,
            'Title must be 4 characters above'
          );
        }

        return true;
      },
    },
    description: {
      required: true,
      type: String,
      options: val => {
        if (!validator.isLength(val.trim(), { min: 10 })) {
          throw new Parse.Error(
            Parse.Error.VALIDATION_ERROR,
            'Description must be 10 characters above'
          );
        }

        return true;
      },
    },
  },
};

module.exports = { createBlogValidator };
