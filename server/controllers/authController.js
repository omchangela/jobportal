const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const getToken = payload => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRY
  });
};

exports.login = catchAsync(async (req, res, next) => {
  // check if email and password are in the body'
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide a email and a password', 403));
  }

  //verify email and password
  const user = await User.findOne({ email });

  if (!user || !(await user.validatePassword(password, user.password))) {
    return next(new AppError('Email or password mismatch', 403));
  }

  // send token
  const token = getToken({ id: user._id });

  res.status(200).json({
    status: 'success',
    token: token,
    recruiterName: user.name
  });
});

exports.register = catchAsync(async (req, res, next) => {
  const { name, email, password, mobile } = req.body;
  const user = await User.create({ name, email, password, mobile });
  const token = getToken({ id: user._id });

  res.status(200).json({
    status: 'success',
    token: token,
    recruiterName: user.name
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  // Check if token is available in headers
  if (!req.headers.authorization) {
    return next(new AppError('You are unauthorized to access this route', 401));
  }

  // get the token
  const token = req.headers.authorization.split(' ')[1];

  let decoded;

  try {
    decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    return next(
      new AppError(
        'Token is not valid, or has expired. Login to get the token.',
        401
      )
    );
  }

  // Get user from token data
  const user = await User.findById(decoded.id);

  if (!user) {
    return next(new AppError('User no longer exists'));
  }

  req.user = user;

  next();
});
