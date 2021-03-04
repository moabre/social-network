const Post = require('../models/postModel');
const { ObjectID } = require('mongodb');

//get all posts
const allPosts = async (req, res) => {
  const posts = await Post.find().sort({ timestamp: -1 });
  res.status(200).json(posts);
};

//create a post
const post = async (req, res) => {
  const newPost = new Post({
    authorId: req.body.authorId,
    avatar: req.body.avatar || '',
    comments: [],
    likers: [],
    likesCount: 0,
    text: req.body.text,
    image: req.body.image || '',
    timestamp: new Date().getTime(),
  });
  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};
//get post by id
const postById = async (req, res, next, id) => {
  try {
    const post = await Post.findById(id)
      .populated('postedBy', '_id name')
      .exec();
    if (!post) return res.status(400).json({ error: 'Post not found' });
    req.post = post;
    next();
  } catch (err) {
    return res.status(400).json({
      error: 'Could not retrive post',
    });
  }
};

//editing anything within a post
const editPost = async (req, res) => {
  const { id } = req.params;
  if (!ObjectID.isValid(id)) {
    return res.status(404).json({ message: 'the content does not exist' });
  }
  //adding likes and liker to comment data
  if (req.body.action === 'like') {
    try {
      return Post.findByIdAndUpdate(
        id,
        {
          $inc: { likesCount: 1 },
          $addToSet: { likers: req.body.id },
        },
        { new: true },
        (err, post) => {
          if (err) return res.status(400).send(err);
          return res.send(post);
        }
      );
    } catch (err) {
      return res.status(400).send(err);
    }
  }
  //reducing like from comment data
  if (req.body.action === 'unlike') {
    try {
      return Post.findByIdAndUpdate(
        id,
        {
          $inc: { likesCount: -1 },
          $pull: { likers: req.body.id },
        },
        { new: true },
        (err, post) => {
          if (err) return res.status(400).send(err);
          return res.send(post);
        }
      );
    } catch (err) {
      return res.status(400).send(err);
    }
  }
  //adding the comment to the post data
  if (req.body.action === 'comment') {
    try {
      return Post.findByIdAndUpdate(
        id,
        {
          $push: {
            comments: {
              commenterId: req.body.commenterId,
              text: req.body.text,
              timestamp: new Date().getTime(),
            },
          },
        },
        { new: true },
        (err, post) => {
          if (err) return res.status(400).send(err);
          return res.send(post);
        }
      );
    } catch (err) {
      return res.status(400).send(err);
    }
  }
  //deleting the comment to the post data
  if (req.body.action === 'deleteComment') {
    try {
      return Post.findByIdAndUpdate(
        id,
        {
          $pull: {
            comments: {
              _id: req.body.commentId,
            },
          },
        },
        { new: true },
        (err, post) => {
          if (err) return res.status(400).send(err);
          return res.send(post);
        }
      );
    } catch (err) {
      return res.status(400).send(err);
    }
  }
};

const comment = async (req, res) => {
  const comment = req.body.text;
  comment.postedBy = req.body.userId;
  try {
    const result = await Post.findByIdAndUpdate(
      req.body.postId,
      {
        $set: {
          comments: {
            text: req.body.text,
          },
        },
      },
      { new: true }
    )
      .populate('comments.postedBy', '_id name')
      .populate('postedBy', '_id name')
      .exec();
    res.status(200).json(result);
  } catch (err) {
    return res.status(400).send(err);
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByIdAndDelete(id);
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(404).send(err);
  }
};

const authPoster = (req, res, next) => {
  const isPoster = req.post && req.auth && req.postedBy._id == req.auth._id;
  if (!isPoster) {
    return res.status(403).json({
      error: 'User is not authorized',
    });
  }
  next();
};

module.exports = {
  allPosts,
  comment,
  editPost,
  deletePost,
  postById,
  authPoster,
};
