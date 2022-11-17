const { Schema, model } = require('mongoose');

const blogSchema = new Schema({
  _id: {
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
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  created_at: {
    type: String,
    required: true,
  },
  updated_at: {
    type: String,
    required: true,
  },
  deleted_at: {
    type: String,
    required: true,
  },
  is_draft: {
    type: Boolean,
    default: false,
  },
});

module.exports = model('blog', blogSchema);
