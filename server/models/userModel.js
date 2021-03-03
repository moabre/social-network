const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  avatar: String,
  bio: String,
  createdAt: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    min: 6,
  },
  followers: {
    type: [String],
  },
  following: {
    type: [String],
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  passwordConfirm: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  showEmail: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model('User', UserSchema);
