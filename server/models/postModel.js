const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema({
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  avatar: {
    type: String,
    required: true,
  },
  comments: {
    type: [
      {
        postedBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
        text: String,
        timestamp: { type: Date, default: Date.now },
      },
    ],
    required: true,
  },
  likers: {
    type: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  },
  likesCount: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    trim: true,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('Post', PostSchema);
