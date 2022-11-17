const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  _id: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  profile_picture_url: {
    type: String,
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
  password_chances: {
    type: number,
    default: 3,
  },
});

module.exports = model('user', userSchema);
