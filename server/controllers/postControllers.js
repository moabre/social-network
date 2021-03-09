const Post = require('../models/postModel');

//get all posts by user
const postsByUser = async (req, res) => {
  try {
    const posts = await Post.find({ postedBy: req.profile._id })
      .populate('comments.postedBy', '_id name avatar')
      .populate('postedBy', '_id name avatar')
      .populate('likers', '_id name')
      .sort({ timestamp: -1 })
      .exec();
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
};

//get news feed
const postNewsFeed = async (req, res) => {
  const following = req.profile.following;
  following.push(req.profile._id);
  try {
    const posts = await Post.find({ postedBy: { $in: req.profile.following } })
      .populate('comments.postedBy', '_id name avatar')
      .populate('postedBy', '_id name avatar')
      .populate('likers', '_id name')
      .sort({ timestamp: -1 })
      .exec();
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
};

//create a post
const post = async (req, res) => {
  const newPost = new Post({
    postedBy: req.profile._id,
    comments: [],
    likers: [],
    likesCount: 0,
    text: req.body.text,
    image: req.body.image || '',
    timestamp: new Date().getTime(),
  });
  try {
    const post = await newPost
      .save()
      .then((newPost) =>
        newPost.populate('postedBy', '_id name avatar').execPopulate()
      );
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};
//get post by id
const postById = async (req, res, next, id) => {
  try {
    const post = await Post.findById(id)
      .populate('postedBy', '_id name')
      .populate('likers', '_id name')
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

//like a post
const like = async (req, res) => {
  try {
    const result = await Post.findByIdAndUpdate(
      req.body.postId,
      { $inc: { likesCount: 1 }, $addToSet: { likers: req.body.userId } },
      { new: true }
    )
      .populate('comments.postedBy', '_id name')
      .populate('postedBy', '_id name')
      .populate('likers', '_id name')
      .exec();
    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({
      err,
    });
  }
};
//unlike a post
const unlike = async (req, res) => {
  try {
    const results = await Post.findByIdAndUpdate(
      req.body.postId,
      {
        $inc: { likesCount: -1 },
        $pull: { likers: req.body.userId },
      },
      { new: true }
    )
      .populate('comments.postedBy', '_id name')
      .populate('postedBy', '_id name')
      .populate('likers', '_id name')
      .exec();
    return res.status(200).json(results);
  } catch (err) {
    return res.status(400).send(err);
  }
};

//Deleteing a comment
const deleteComment = async (req, res) => {
  const comment = req.body.comment;
  try {
    const result = await Post.findByIdAndUpdate(
      req.body.postId,
      {
        $pull: {
          comments: {
            _id: comment._id,
          },
        },
      },
      { new: true }
    )
      .populate('comments.postedBy', '_id name')
      .populate('postedBy', '_id name')
      .populate('likers', '_id name')
      .exec();
    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).send(err);
  }
};
// Edit Comment
const editComment = async (req, res) => {
  const comment = req.body.comment;
  try {
    const result = await Post.findOneAndUpdate(
      { _id: req.body.postId, 'comments._id': comment._id },
      {
        $set: {
          'comments.$.text': comment.text,
        },
      },
      { new: true }
    )
      .populate('comments.postedBy', '_id name')
      .populate('postedBy', '_id name')
      .populate('likers', '_id name')
      .exec();
    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).send(err);
  }
};
//edit post
const editPost = async (req, res) => {
  const postId = req.post._id;
  try {
    const result = await Post.findByIdAndUpdate(
      postId,
      {
        $set: {
          text: req.body.text,
        },
      },
      { new: true }
    )
      .populate('comments.postedBy', '_id name')
      .populate('postedBy', '_id name')
      .populate('likers', '_id name')
      .exec();
    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).send(err);
  }
};

//posting a comment
const comment = async (req, res) => {
  const comment = req.body.comment;
  comment.postedBy = req.body.userId;
  try {
    const result = await Post.findByIdAndUpdate(
      req.body.postId,
      {
        $push: {
          comments: comment,
        },
      },
      { new: true }
    )
      .populate('comments.postedBy', '_id name')
      .populate('postedBy', '_id name')
      .populate('likers', '_id name')
      .exec();
    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).send(err);
  }
};
//delete post
const deletePost = async (req, res) => {
  const post = req.post;
  try {
    const deletedPost = await post.remove();
    return res.status(200).json(deletedPost);
  } catch (err) {
    return res.status(404).send(err);
  }
};
//auth to check if it is current poster
const authPoster = (req, res, next) => {
  const isPoster =
    req.post && req.auth && req.post.postedBy._id == req.auth._id;
  if (!isPoster) {
    return res.status(403).json({
      error: 'User is not authorized',
    });
  }
  next();
};

module.exports = {
  postNewsFeed,
  postsByUser,
  comment,
  post,
  like,
  unlike,
  deleteComment,
  deletePost,
  postById,
  authPoster,
  editComment,
  editPost,
};
