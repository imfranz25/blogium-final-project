const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    id: {
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
    },
    deleted_at: {
      type: String,
    },
    password_chances: {
      type: Number,
      default: 3,
    },
  },
  { timestamps: true }
);

module.exports = model('user', userSchema);
