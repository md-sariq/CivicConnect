

// const asyncHandler = require('express-async-handler');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');
// const Authority = require('../models/authorityModel');
// const generateToken = require('../utils/generateToken');

// // @desc    Register a new user
// // @route   POST /api/users/register
// // @access  Public
// const registerUser = asyncHandler(async (req, res) => {
//   const { name, email, password } = req.body;
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
//   // UPDATED: Removed 'zones' from the expected body
//   const { token, primaryContactName, primaryContactDesignation, officeAddress } = req.body;

//   if (!token || !primaryContactName) {
//     res.status(400);
//     throw new Error('Please provide all required information.');
//   }

//   // 1. Verify the token and find the temporary user
//   const decoded = jwt.verify(token, process.env.JWT_SECRET);
//   const user = await User.findById(decoded.id);

//   if (!user || user.password !== 'temporary_password') {
//     res.status(400);
//     throw new Error('Invalid token or link has already been used.');
//   }

//   // 2. Update the User model with the primary contact's name
//   user.name = primaryContactName;
//   user.password = 'passwordless_account'; // Update placeholder
//   await user.save();

//   // 3. Update the Authority model with the new details (zones are no longer updated here)
//   const authority = await Authority.findByIdAndUpdate(
//     user.authority,
//     {
//       status: 'Active',
//       officeAddress: officeAddress,
//       primaryContact: {
//         name: primaryContactName,
//         designation: primaryContactDesignation
//       }
//     },
//     { new: true }
//   );

//   if (!authority) {
//     throw new Error('Associated authority not found.');
//   }

//   res.status(200).json({
//     message: 'Onboarding successful! You can now log in.',
//   });
// });

// module.exports = { registerUser, authUser, completeAuthorityRegistration }; 












const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Authority = require('../models/authorityModel');
const generateToken = require('../utils/generateToken');

// @desc    Register a new user (Citizen only)
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

  // New users created via this route are always citizens
  const user = await User.create({
    name,
    email,
    password: hashedPassword, // Store hashed password for citizens
    role: 'citizen',
    isVerified: true, // Citizen accounts are considered verified on creation
  });

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

// @desc    Authenticate user (Legacy password-based, likely only for citizens now)
// @route   POST /api/users/login (Legacy - Consider removing if fully OTP based)
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  // Only allow password login for verified citizens (if keeping legacy login)
  if (user && user.isVerified && user.role === 'citizen' && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });
  } else {
    // Corrected the status code from the garbled text
    res.status(401);
    throw new Error('Invalid email or password, or account requires OTP login.');
  }
});

// @desc    Complete registration for an invited authority admin
// @route   POST /api/users/complete-authority-registration
// @access  Public
const completeAuthorityRegistration = asyncHandler(async (req, res) => {
  const { token, primaryContactName, primaryContactDesignation, officeAddress } = req.body;

  if (!token || !primaryContactName) {
    res.status(400);
    throw new Error('Please provide all required information.');
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error('❌ BACKEND ERROR: Token verification failed!', error);
    res.status(400);
    throw new Error('Invalid or expired registration token.');
  }

  const user = await User.findById(decoded.id);

  // Check if the user exists and is NOT YET verified.
  if (!user || user.isVerified === true) {
    console.log('--- ERROR: User not found or account is already verified. ---');
    res.status(400);
    throw new Error('Invalid token or link has already been used.');
  }
  console.log('--- SUCCESS: Unverified user found. Proceeding with onboarding. ---');

  // Update user details and mark as verified
  user.name = primaryContactName;
  user.isVerified = true; // Mark as verified now
  // Assuming the userModel no longer requires a password for passwordless accounts
  await user.save();

  // Activate the authority
  const authority = await Authority.findByIdAndUpdate(
    user.authority,
    {
      status: 'Active',
      officeAddress: officeAddress,
      primaryContact: { name: primaryContactName, designation: primaryContactDesignation }
    },
    { new: true }
  );

  if (!authority) {
    throw new Error('Associated authority not found.');
  }

  res.status(200).json({
    message: 'Onboarding successful! You can now log in.',
  });
});

module.exports = { registerUser, authUser, completeAuthorityRegistration };









