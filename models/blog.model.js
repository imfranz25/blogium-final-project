const { Schema, model } = require('mongoose');

const blogSchema = new Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cover_picture_url: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      ref: 'user',
      required: true,
    },
    deleted_at: {
      type: String,
      default: null,
    },
    is_draft: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = model('blog', blogSchema);
