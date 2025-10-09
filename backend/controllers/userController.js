// const asyncHandler = require('express-async-handler');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken'); // <-- Added missing import
// const User = require('../models/userModel');
// const Authority = require('../models/authorityModel');
// const generateToken = require('../utils/generateToken');

// // @desc    Register a new user
// // @route   POST /api/users/register
// // @access  Public
// const registerUser = asyncHandler(async (req, res) => {
//   const { name, email, password } = req.body; // Removed role for security
//   const userExists = await User.findOne({ email });

//   if (userExists) {
//     res.status(400);
//     throw new Error('User already exists');
//   }

//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(password, salt);

//   // New users can only register as citizens
//   const user = await User.create({ name, email, password: hashedPassword, role: 'citizen' });

//   if (user) {
//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       token: generateToken(user._id)
//     });
//   } else {
//     res.status(400);
//     throw new Error('Invalid user data');
//   }
// });

// // @desc    Authenticate user & get token
// // @route   POST /api/users/login
// // @access  Public
// const authUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });

//   if (user && (await bcrypt.compare(password, user.password))) {
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       token: generateToken(user._id)
//     });
//   } else {
//     res.status(401);
//     throw new Error('Invalid email or password');
//   }
// });

// // @desc    Complete registration for an invited authority admin
// // @route   POST /api/users/complete-authority-registration
// // @access  Public
// const completeAuthorityRegistration = asyncHandler(async (req, res) => {
//   const { token, name, password } = req.body;

//   if (!token || !password || !name) {
//     res.status(400);
//     throw new Error('Please provide all required information.');
//   }

//   // 1. Verify the token
//   const decoded = jwt.verify(token, process.env.JWT_SECRET);
//   const user = await User.findById(decoded.id);

//   // 2. Check if user exists and is still temporary
//   if (!user || user.password !== 'temporary_password') {
//     res.status(400);
//     throw new Error('Invalid token, link may have already been used.');
//   }

//   // 3. Update the user with the new details
//   const salt = await bcrypt.genSalt(10);
//   user.password = await bcrypt.hash(password, salt);
//   user.name = name;
//   await user.save();

//   // 4. Activate the associated Authority
//   await Authority.findByIdAndUpdate(user.authority, { status: 'Active' });

//   res.status(200).json({
//     message: 'Registration successful! You can now log in.',
//   });
// });


// module.exports = { registerUser, authUser, completeAuthorityRegistration };




// const asyncHandler = require('express-async-handler');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken'); // <-- Added missing import
// const User = require('../models/userModel');
// const Authority = require('../models/authorityModel');
// const generateToken = require('../utils/generateToken');

// // @desc    Register a new user
// // @route   POST /api/users/register
// // @access  Public
// const registerUser = asyncHandler(async (req, res) => {
//   const { name, email, password } = req.body; // Removed role for security
//   const userExists = await User.findOne({ email });

//   if (userExists) {
//     res.status(400);
//     throw new Error('User already exists');
//   }

//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(password, salt);

//   // New users can only register as citizens
//   const user = await User.create({ name, email, password: hashedPassword, role: 'citizen' });

//   if (user) {
//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       token: generateToken(user._id)
//     });
//   } else {
//     res.status(400);
//     throw new Error('Invalid user data');
//   }
// });

// // @desc    Authenticate user & get token
// // @route   POST /api/users/login
// // @access  Public
// const authUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;
//   console.log(`--- Step 3: [BACKEND] Received login request for: ${email} ---`);

//   const user = await User.findOne({ email });

//   if (!user) {
//     console.log('--- ERROR: [BACKEND] User not found in database. ---');
//     res.status(401);
//     throw new Error('Invalid email or password');
//   }
  
//   console.log(`--- Step 4: [BACKEND] User found. Role is: "${user.role}" ---`);

//   const isMatch = await bcrypt.compare(password, user.password);
//   console.log(`--- Step 5: [BACKEND] Password comparison result: ${isMatch} ---`); // <-- CRITICAL

//   if (user && isMatch) {
//     console.log('--- SUCCESS: [BACKEND] Password matched. Sending user data. ---');
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       token: generateToken(user._id)
//     });
//   } else {
//     console.log('--- ERROR: [BACKEND] Password did not match. ---');
//     res.status(401);
//     throw new Error('Invalid email or password');
//   }
// });

// // @desc    Complete registration for an invited authority admin
// // @route   POST /api/users/complete-authority-registration
// // @access  Public
// const completeAuthorityRegistration = asyncHandler(async (req, res) => {
//   const { token, name, password } = req.body;

//   if (!token || !password || !name) {
//     res.status(400);
//     throw new Error('Please provide all required information.');
//   }

//   // 1. Verify the token
//   const decoded = jwt.verify(token, process.env.JWT_SECRET);
//   const user = await User.findById(decoded.id);

//   // 2. Check if user exists and is still temporary
//   if (!user || user.password !== 'temporary_password') {
//     res.status(400);
//     throw new Error('Invalid token, link may have already been used.');
//   }

//   // 3. Update the user with the new details
//   const salt = await bcrypt.genSalt(10);
//   user.password = await bcrypt.hash(password, salt);
//   user.name = name;
//   await user.save();

//   // 4. Activate the associated Authority
//   await Authority.findByIdAndUpdate(user.authority, { status: 'Active' });

//   res.status(200).json({
//     message: 'Registration successful! You can now log in.',
//   });
// });


// module.exports = { registerUser, authUser, completeAuthorityRegistration };




const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Authority = require('../models/authorityModel');
const generateToken = require('../utils/generateToken');

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // New users can only register as citizens
  const user = await User.create({ name, email, password: hashedPassword, role: 'citizen' });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Complete registration for an invited authority admin
// @route   POST /api/users/complete-authority-registration
// @access  Public
const completeAuthorityRegistration = asyncHandler(async (req, res) => {
  const { token, name, password } = req.body;

  if (!token || !password || !name) {
    res.status(400);
    throw new Error('Please provide all required information.');
  }

  // 1. Verify the token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);

  // 2. Check if user exists and is still temporary
  if (!user || user.password !== 'temporary_password') {
    res.status(400);
    throw new Error('Invalid token, link may have already been used.');
  }

  // 3. Update the user with the new details
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  user.name = name;
  await user.save();

  // 4. Activate the associated Authority
  await Authority.findByIdAndUpdate(user.authority, { status: 'Active' });

  res.status(200).json({
    message: 'Registration successful! You can now log in.',
  });
});

module.exports = { registerUser, authUser, completeAuthorityRegistration };
