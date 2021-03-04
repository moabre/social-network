const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const expressJwt = require('express-jwt');
const bcrypt = require('bcrypt');
const validateLogin = require('../validation/validateLogin');

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
      _id: user._id,
    },
    process.env.TOKEN_CODE,
    { expiresIn: '1h' }
  );
  res.header('Authorization', `Bearer ${token}`).status(200).json({
    message: 'Auth Successful',
  });
};

const requiresSignin = expressJwt({
  secret: process.env.TOKEN_CODE,
  requestProperty: 'auth',
  algorithms: ['HS256'],
});

const hasAuth = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile_.id == req.auth._id;
  if (!authorized) {
    return res.status('403').json({
      error: 'User is not authorized',
    });
  }
  next();
};

module.exports = { login, requiresSignin, hasAuth };
