const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const validatesSignUp = require('../validation/validateSignUp');
const validateLogin = require('../validation/validateLogin');

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

// Get all users
const list = async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
};

// Login
const login = async (req, res) => {
  //Validate the data
  const { errors, isValid } = validateLogin(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  //See if email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password');

  //Check to see if password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password');

  //create and assign jwt token
  const token = jwt.sign(
    {
      avatar: user.avatar,
      createdAt: user.createdAt,
      name: user.name,
      email: user.email,
      showEmail: user.showEmail,
      userId: user._id,
    },
    process.env.TOKEN_CODE,
    { expiresIn: '1h' }
  );
  res.header('auth-token', token).status(200).json({
    message: 'Auth Successful',
  });
};

//get user by id
const userByID = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
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
      userId: user._id,
    },
    process.env.TOKEN_CODE,
    { expiresIn: '24h' }
  );
  return res.json({ user, token });
};

//Add user to list of users you follow
const addUserFollowing = async (req, res) => {
  const { id } = req.params;
  if (!req.body.idToFollow)
    return res.status(404).json({ message: 'No ID found' });
  try {
    await User.findByIdAndUpdate(
      id,
      {
        $addToSet: { following: req.body.idToFollow },
      },
      { new: true, upsert: true },
      (err, doc) => {
        if (err) return res.status(400).json(err);
        return res.status(201).json(doc);
      }
    );
  } catch (err) {
    return res.status(500).json(err);
  }
};
//Remove a user from list of following
const removeUserFollowing = async (req, res) => {
  const { id } = req.params;
  if (!req.body.idToUnfollow)
    return res.status(404).json({ message: 'No ID found' });
  try {
    await User.findByIdAndUpdate(
      id,
      { $pull: { following: req.body.idToUnfollow } },
      { new: true, upsert: true },
      (err, doc) => {
        if (err) return res.status(400).json(err);
        return res.status(201).json(doc);
      }
    );
  } catch (err) {
    return res.status(500).json(err);
  }
};

//Remove a user from list of users following you
const removeFollower = async (req, res) => {
  const { id } = req.params;
  if (!req.body.unfollowerId)
    return res.status(404).json({ message: 'No ID found' });
  try {
    await User.findByIdAndUpdate(
      id,
      { $pull: { followers: req.body.unfollowerId } },
      { new: true, upsert: true },
      (err, doc) => {
        if (err) return res.status(400).json(err);
        return res.status(201).json(doc);
      }
    );
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  create,
  list,
  login,
  userByID,
  removeUser,
  updateUser,
  addUserFollowing,
  removeUserFollowing,
  removeFollower,
};
