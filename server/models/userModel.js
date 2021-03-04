const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  avatar: String,
  bio: {
    type: String,
    trim: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    min: 6,
  },
  followers: {
    type: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  },
  following: {
    type: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  },
  name: {
    type: String,
    trim: true,
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
