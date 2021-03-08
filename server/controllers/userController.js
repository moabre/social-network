const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validatesSignUp = require('../validation/validateSignUp');

const create = async (req, res) => {
  //Validate the data
  const { errors, isValid } = validatesSignUp(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  // check if email exists in database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res.status(409).json({ error: 'Email already exists' });

  //Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  //Create new user
  const newUser = new User({
    createdAt: new Date().getTime(),
    email: req.body.email,
    name: req.body.name,
    avatar: req.body.avatar || '',
    password: hashPassword,
    passwordConfirm: hashPassword,
    showEmail: true,
  });
  try {
    const saveUser = await newUser
      .save()
      .then((result) => {
        res.status(201).json({ result });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  } catch (err) {
    res.status(400).send(err);
  }
};

//Load user and append to req
const userById = async (req, res, next, id) => {
  try {
    const user = await User.findById(id)
      .populate('following', '_id name')
      .populate('follwers', '_id name')
      .exec();
    if (!user) return res.status(400).json({ error: 'User not found' });
    req.profile = user;
    next();
  } catch (err) {
    return res.status(400).json({
      error: 'Could not get user',
    });
  }
};

// Get all users
const list = async (req, res) => {
  const users = await User.find().select('name email updated created');
  res.status(200).json(users);
};

//get user by id
const specificUser = async (req, res) => {
  const user = req.profile;
  if (user) {
    res.json({ user });
  } else {
    res.status(404).json({
      message: 'User not found',
    });
  }
};

//delete a user
const removeUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.deleteOne({ _id: id });
    res.status(200).json({ message: 'Successfuly deleted user' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

//Update a users info
const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOneAndUpdate(
    { _id: id },
    {
      avatar: req.body.avatar,
      bio: req.body.bio,
      email: req.body.email,
      name: req.body.name,
      showEmail: req.body.showEmail,
    },
    { new: true, upsert: true, setDefaultsOnInsert: true },
    (err) => {
      if (err != null && err.name === 'MongoError' && err.code === 11000) {
        return res
          .status(500)
          .send({ message: 'This email is already in use.' });
      }
    }
  );
  if (!user) return res.status(404).json({ message: 'User not found' });

  const token = jwt.sign(
    {
      avatar: user.avatar,
      bio: user.bio,
      createdAt: user.createdAt,
      name: user.name,
      email: user.email,
      showEmail: user.showEmail,
      _id: user._id,
    },
    process.env.TOKEN_CODE,
    { expiresIn: '24h' }
  );
  return res.header('authorization', token).status(200).json({ user });
};

//Add user to list of users you follow
const addUserFollowing = async (req, res, next) => {
  if (!req.body.idToFollow)
    return res.status(404).json({ message: 'No ID found' });
  try {
    await User.findByIdAndUpdate(
      req.body.userId,
      {
        $addToSet: { following: req.body.idToFollow },
      },
      { new: true, upsert: true },
      (err, doc) => {
        if (err) return res.status(400).json(err);
        return res.status(201).json(doc);
      }
    );
    next();
  } catch (err) {
    return res.status(500).json(err);
  }
};

const addFollower = async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(
      req.body.followId,
      { $addToSet: { followers: req.body.userId } },
      { new: true }
        .populate('following', '_id name')
        .populate('followers', '_id name')
        .exec()
    );
    res.json(result);
  } catch (err) {
    return res.status(400).json({
      error: 'Could not add follower',
    });
  }
};
//Remove a user from list of following
const removeUserFollowing = async (req, res, next) => {
  if (!req.body.idToUnfollow)
    return res.status(404).json({ message: 'No ID found' });
  try {
    await User.findByIdAndUpdate(
      req.body.userId,
      { $pull: { following: req.body.idToUnfollow } },
      { new: true, upsert: true },
      (err, doc) => {
        if (err) return res.status(400).json(err);
        return res.status(201).json(doc);
      }
    );
    next();
  } catch (err) {
    return res.status(500).json(err);
  }
};

//Remove a user from list of users following you
const removeFollower = async (req, res) => {
  if (!req.body.unfollowerId)
    return res.status(404).json({ message: 'No ID found' });
  try {
    const result = await User.findByIdAndUpdate(
      req.body.idToUnfollow,
      { $pull: { followers: req.body.userId } },
      { new: true, upsert: true }
        .populate('following', '_id name')
        .populate('followers', '_id name')
        .exec(),
      (err, doc) => {
        if (err) return res.status(400).json(err);
        return res.status(201).json(doc);
      }
    );
    res.json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const recommendPeople = async (req, res) => {
  const following = req.profile.following;
  following.push(req.profile._id);
  try {
    let users = await User.find({ _id: { $nin: following } }).select('name');
    res.json(users);
  } catch (err) {
    return res.status(400).json({
      error: 'Ran into an issue finding people',
    });
  }
};
module.exports = {
  create,
  list,
  userById,
  specificUser,
  removeUser,
  updateUser,
  addUserFollowing,
  addFollower,
  removeUserFollowing,
  removeFollower,
  recommendPeople,
};
