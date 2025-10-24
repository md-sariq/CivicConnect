// const asyncHandler = require('express-async-handler');
// const User = require('../models/userModel');
// const generateToken = require('../utils/generateToken');
// const nodemailer = require('nodemailer');

// // --- Add these debugging lines right here ---
// // console.log('--- Checking Nodemailer Credentials ---');
// // console.log('EMAIL_USER:', process.env.EMAIL_USER);
// // console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '********' : 'NOT FOUND'); // We hide the password but check if it exists
// // console.log('------------------------------------');
// // ---------------------------------------------

// // --- Nodemailer Transporter Setup ---
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // @desc    Generate and send OTP for login/registration
// // @route   POST /api/auth/send-otp
// // @access  Public
// const sendOtp = asyncHandler(async (req, res) => {
//   const { contact } = req.body;
//   if (!contact) {
//     res.status(400);
//     throw new Error('Please provide an email or phone number.');
//   }

//   const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
//   const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // Expires in 10 minutes

//   // For simplicity, we'll only implement email OTP for now
//   const isEmail = contact.includes('@');
//   if (!isEmail) {
//     res.status(400);
//     throw new Error('Phone number OTP not yet supported. Please use an email.');
//   }
  
//   // Find user or prepare for a new one
//   let user = await User.findOne({ email: contact });
//   if (user) {
//     user.otp = otp;
//     user.otpExpires = otpExpires;
//     await user.save();
//   } else {
//     // This handles the registration case where the user doesn't exist yet
//     // We can store the OTP on a temporary user object or in a separate collection
//     // For simplicity, we'll create a temporary user record
//     await User.findOneAndUpdate(
//         { email: contact },
//         { email: contact, otp, otpExpires, name: 'temp' }, // temporary name
//         { upsert: true, new: true }
//     );
//   }

//   // Send the email
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: contact,
//     subject: 'Your CivicConnect Verification Code',
//     html: `<p>Your verification code is: <strong>${otp}</strong>. It will expire in 10 minutes.</p>`,
//   };
  
//   await transporter.sendMail(mailOptions);

//   res.status(200).json({ message: `OTP sent successfully to ${contact}` });
// });


// // @desc    Verify OTP and log in or register user
// // @route   POST /api/auth/verify-otp
// // @access  Public
// const verifyOtpAndLogin = asyncHandler(async (req, res) => {
//     const { contact, otp, name } = req.body; // 'name' will be present for registration

//     const user = await User.findOne({ 
//         email: contact, 
//         otp: otp,
//         otpExpires: { $gt: Date.now() } // Check if OTP is still valid
//     });

//     if (!user) {
//         res.status(400);
//         throw new Error('Invalid or expired OTP.');
//     }

//     // If it was a new registration, update the user's name
//     if (name && user.name === 'temp') {
//         user.name = name;
//     }
    
//     // Clear the OTP fields after successful verification
//     user.otp = undefined;
//     user.otpExpires = undefined;
//     await user.save();

//     // Return user data and token to log them in
//     res.json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         token: generateToken(user._id),
//     });
// });

// module.exports = { sendOtp, verifyOtpAndLogin };







// const asyncHandler = require('express-async-handler');
// const User = require('../models/userModel');
// const generateToken = require('../utils/generateToken');
// const nodemailer = require('nodemailer');

// // --- Nodemailer Transporter Setup ---
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// const sendEmailWithOTP = async (email, otp) => {
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: 'Your CivicConnect Verification Code',
//     html: `<p>Your verification code is: <strong>${otp}</strong>. It will expire in 10 minutes.</p>`,
//   };
//   await transporter.sendMail(mailOptions);
// };

// // @desc    Generate and send OTP for an EXISTING user to log in
// // @route   POST /api/auth/send-login-otp
// // @access  Public
// const sendLoginOtp = asyncHandler(async (req, res) => {
//   const { contact } = req.body;
//   if (!contact) throw new Error('Email is required.');

//   // Find the user
//   const user = await User.findOne({ email: contact });

//   // If user does NOT exist, throw an error
//   if (!user) {
//     res.status(404);
//     throw new Error('No account found with this email. Please register first.');
//   }

//   const otp = Math.floor(100000 + Math.random() * 900000).toString();
//   user.otp = otp;
//   user.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
//   await user.save();

//   await sendEmailWithOTP(contact, otp);

//   res.status(200).json({ message: `Login OTP sent successfully to ${contact}` });
// });

// // @desc    Generate and send OTP for a NEW user to register
// // @route   POST /api/auth/send-register-otp
// // @access  Public
// const sendRegisterOtp = asyncHandler(async (req, res) => {
//   const { contact } = req.body;
//   if (!contact) throw new Error('Email is required.');

//   // If user ALREADY exists, throw an error
//   const existingUser = await User.findOne({ email: contact });
//   if (existingUser) {
//     res.status(400);
//     throw new Error('An account with this email already exists. Please log in.');
//   }

//   const otp = Math.floor(100000 + Math.random() * 900000).toString();
//   const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

//   // Use findOneAndUpdate with upsert to create or update a temporary record
//   await User.findOneAndUpdate(
//     { email: contact },
//     { email: contact, otp, otpExpires, name: 'temp' },
//     { upsert: true, new: true, setDefaultsOnInsert: true }
//   );
  
//   await sendEmailWithOTP(contact, otp);

//   res.status(200).json({ message: `Registration OTP sent successfully to ${contact}` });
// });

// // @desc    Verify OTP and log in OR complete registration
// // @route   POST /api/auth/verify-otp
// // @access  Public
// const verifyOtpAndLogin = asyncHandler(async (req, res) => {
//   const { contact, otp, name } = req.body;

//   const user = await User.findOne({ 
//       email: contact, 
//       otp: otp,
//       otpExpires: { $gt: Date.now() }
//   });

//   if (!user) {
//       res.status(400);
//       throw new Error('Invalid or expired OTP.');
//   }

//   // If this is a registration, finalize the user's name
//   if (name && user.name === 'temp') {
//       user.name = name;
//   }
  
//   user.otp = undefined;
//   user.otpExpires = undefined;
//   await user.save();

//   res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       token: generateToken(user._id),
//   });
// });

// module.exports = { sendLoginOtp, sendRegisterOtp, verifyOtpAndLogin };









// const asyncHandler = require('express-async-handler');
// const User = require('../models/userModel');
// const generateToken = require('../utils/generateToken');
// const nodemailer = require('nodemailer');

// // --- Nodemailer Transporter Setup ---
// const transporter = nodemailer.createTransport({ /* ... your transporter config ... */ });

// const sendEmailWithOTP = async (email, otp) => { /* ... your email sending function ... */ };

// // @desc    Generate and send OTP for an EXISTING, VERIFIED user to log in
// // @route   POST /api/auth/send-login-otp
// // @access  Public
// const sendLoginOtp = asyncHandler(async (req, res) => {
//   const { contact } = req.body;
//   if (!contact) throw new Error('Email is required.');

//   const user = await User.findOne({ email: contact });

//   // UPDATED: Check if user exists AND is verified
//   if (!user || !user.isVerified) {
//     res.status(404);
//     throw new Error('No verified account found with this email. Please register first.');
//   }

//   const otp = Math.floor(100000 + Math.random() * 900000).toString();
//   user.otp = otp;
//   user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
//   await user.save();

//   await sendEmailWithOTP(contact, otp);
//   res.status(200).json({ message: `Login OTP sent successfully to ${contact}` });
// });

// // @desc    Generate and send OTP for a NEW user to register
// // @route   POST /api/auth/send-register-otp
// // @access  Public
// const sendRegisterOtp = asyncHandler(async (req, res) => {
//   const { contact } = req.body;
//   if (!contact) throw new Error('Email is required.');

//   const existingUser = await User.findOne({ email: contact });
  
//   // If a verified user already exists, block the registration attempt
//   if (existingUser && existingUser.isVerified) {
//     res.status(400);
//     throw new Error('An account with this email already exists. Please log in.');
//   }

//   const otp = Math.floor(100000 + Math.random() * 900000).toString();
//   const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

//   // Use findOneAndUpdate with upsert to create or update an UNVERIFIED record
//   await User.findOneAndUpdate(
//     { email: contact },
//     { email: contact, otp, otpExpires, name: 'temp_unverified', isVerified: false },
//     { upsert: true, new: true, setDefaultsOnInsert: true }
//   );
  
//   await sendEmailWithOTP(contact, otp);
//   res.status(200).json({ message: `Registration OTP sent successfully to ${contact}` });
// });

// // @desc    Verify OTP and log in OR complete registration by marking user as verified
// // @route   POST /api/auth/verify-otp
// // @access  Public
// const verifyOtpAndLogin = asyncHandler(async (req, res) => {
//   const { contact, otp, name } = req.body;

//   const user = await User.findOne({ 
//       email: contact, 
//       otp: otp,
//       otpExpires: { $gt: Date.now() }
//   });

//   if (!user) {
//       res.status(400);
//       throw new Error('Invalid or expired OTP.');
//   }

//   // Finalize the user's details and mark as verified
//   user.name = name || user.name; // Use new name if provided during registration
//   user.isVerified = true;
//   user.otp = undefined;
//   user.otpExpires = undefined;
//   await user.save();

//   res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       token: generateToken(user._id),
//   });
// });

// module.exports = { sendLoginOtp, sendRegisterOtp, verifyOtpAndLogin };






// const asyncHandler = require('express-async-handler');
// const User = require('../models/userModel');
// const generateToken = require('../utils/generateToken');
// const nodemailer = require('nodemailer');

// // --- Nodemailer Transporter Setup ---
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // --- Email Sending Function with Error Handling ---
// const sendEmailWithOTP = async (email, otp) => {
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: 'Your CivicConnect Verification Code',
//     html: `<p>Your verification code is: <strong>${otp}</strong>. It will expire in 10 minutes.</p>`,
//   };
  
//   try {
//     console.log(`Attempting to send OTP to ${email}...`);
//     let info = await transporter.sendMail(mailOptions);
//     console.log('✅ Email sent successfully! Message ID:', info.messageId);
//   } catch (error) {
//     console.error('❌ Nodemailer Error: Failed to send email.');
//     console.error(error); // This will print the detailed error from Nodemailer
//     // We throw a new error so the asyncHandler can catch it and send a proper response
//     throw new Error('Could not send verification email. Please check server logs.');
//   }
// };

// // @desc    Generate and send OTP for an EXISTING, VERIFIED user to log in
// // @route   POST /api/auth/send-login-otp
// // @access  Public
// const sendLoginOtp = asyncHandler(async (req, res) => {
//   const { contact } = req.body;
//   if (!contact) throw new Error('Email is required.');

//   const user = await User.findOne({ email: contact });

//   // Check if user exists AND is verified
//   if (!user || !user.isVerified) {
//     res.status(404);
//     throw new Error('No verified account found with this email. Please register first.');
//   }

//   const otp = Math.floor(100000 + Math.random() * 900000).toString();
//   user.otp = otp;
//   user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
//   await user.save();

//   await sendEmailWithOTP(contact, otp);
//   res.status(200).json({ message: `Login OTP sent successfully to ${contact}` });
// });

// // @desc    Generate and send OTP for a NEW user to register
// // @route   POST /api/auth/send-register-otp
// // @access  Public
// const sendRegisterOtp = asyncHandler(async (req, res) => {
//   const { contact } = req.body;
//   if (!contact) throw new Error('Email is required.');

//   const existingUser = await User.findOne({ email: contact });
  
//   // If a verified user already exists, block the registration attempt
//   if (existingUser && existingUser.isVerified) {
//     res.status(400);
//     throw new Error('An account with this email already exists. Please log in.');
//   }

//   const otp = Math.floor(100000 + Math.random() * 900000).toString();
//   const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

//   // Use findOneAndUpdate with upsert to create or update an UNVERIFIED record
//   await User.findOneAndUpdate(
//     { email: contact },
//     { email: contact, otp, otpExpires, name: 'temp_unverified', isVerified: false },
//     { upsert: true, new: true, setDefaultsOnInsert: true }
//   );
  
//   await sendEmailWithOTP(contact, otp);
//   res.status(200).json({ message: `Registration OTP sent successfully to ${contact}` });
// });

// // @desc    Verify OTP and log in OR complete registration by marking user as verified
// // @route   POST /api/auth/verify-otp
// // @access  Public
// const verifyOtpAndLogin = asyncHandler(async (req, res) => {
//   const { contact, otp, name } = req.body;

//   const user = await User.findOne({ 
//       email: contact, 
//       otp: otp,
//       otpExpires: { $gt: Date.now() }
//   });

//   if (!user) {
//       res.status(400);
//       throw new Error('Invalid or expired OTP.');
//   }

//   // Finalize the user's details and mark as verified
//   user.name = name || user.name; // Use new name if provided during registration
//   user.isVerified = true;
//   user.otp = undefined;
//   user.otpExpires = undefined;
//   await user.save();

//   res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       token: generateToken(user._id),
//   });
// });

// module.exports = { sendLoginOtp, sendRegisterOtp, verifyOtpAndLogin };











// const asyncHandler = require('express-async-handler');
// const User = require('../models/userModel');
// const generateToken = require('../utils/generateToken');
// const nodemailer = require('nodemailer');

// // --- Nodemailer Transporter Setup ---
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // --- Email Sending Function with Error Handling ---
// const sendEmailWithOTP = async (email, otp) => {
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: 'Your CivicConnect Verification Code',
//     html: `<p>Your verification code is: <strong>${otp}</strong>. It will expire in 10 minutes.</p>`,
//   };
  
//   try {
//     await transporter.sendMail(mailOptions);
//   } catch (error) {
//     console.error('❌ Nodemailer Error: Failed to send email.', error);
//     throw new Error('Could not send verification email. Please check server logs.');
//   }
// };

// // @desc    Generate and send OTP for an EXISTING, VERIFIED user to log in
// // @route   POST /api/auth/send-login-otp
// // @access  Public
// // const sendLoginOtp = asyncHandler(async (req, res) => {
// //   const { contact } = req.body;
// //   if (!contact) throw new Error('Email is required.');

// //   // Find the user by their email
// //   const user = await User.findOne({ email: contact });

// //   // *** KEY CHANGE #1: Check if user exists AND is verified ***
// //   if (!user || !user.isVerified) {
// //     res.status(404);
// //     throw new Error('No verified account found with this email. Please register first.');
// //   }

// //   // If user is valid, proceed to send OTP
// //   const otp = Math.floor(100000 + Math.random() * 900000).toString();
// //   user.otp = otp;
// //   user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
// //   await user.save();

// //   await sendEmailWithOTP(contact, otp);
// //   res.status(200).json({ message: `Login OTP sent successfully to ${contact}` });
// // });




// /***********************************************/

// // In backend/controllers/authController.js

// // @desc    Generate and send OTP for an EXISTING, VERIFIED user to log in
// // @route   POST /api/auth/send-login-otp
// // @access  Public
// const sendLoginOtp = asyncHandler(async (req, res) => {
//   const { contact } = req.body;
//   if (!contact) throw new Error('Email is required.');

//   const user = await User.findOne({ email: contact });

//   if (!user || !user.isVerified) {
//     res.status(404);
//     throw new Error('No verified account found with this email. Please register first.');
//   }

//   const otp = Math.floor(100000 + Math.random() * 900000).toString();
//   user.otp = otp;
//   user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
  
//   try {
//     // --- Start of the critical section to debug ---
//     console.log(`Attempting to send OTP to ${contact}...`);
//     await sendEmailWithOTP(contact, otp);
//     console.log(`✅ OTP email dispatch successful for ${contact}.`);
//     // --- End of critical section ---

//     await user.save(); // Save the OTP to the user *after* the email is successfully sent
//     res.status(200).json({ message: `Login OTP sent successfully to ${contact}` });

//   } catch (error) {
//     // This will catch the detailed error from Nodemailer
//     console.error('❌ BACKEND ERROR during OTP sending:', error);
//     res.status(500); // Send a server error status
//     throw new Error('Email service failed. Please check server logs for details.');
//   }
// });




// // @desc    Generate and send OTP for a NEW user to register
// // @route   POST /api/auth/send-register-otp
// // @access  Public
// const sendRegisterOtp = asyncHandler(async (req, res) => {
//   const { contact } = req.body;
//   if (!contact) throw new Error('Email is required.');

//   const existingUser = await User.findOne({ email: contact });
  
//   // *** KEY CHANGE #2: If a verified user already exists, block registration ***
//   if (existingUser && existingUser.isVerified) {
//     res.status(400);
//     throw new Error('An account with this email already exists. Please log in.');
//   }

//   const otp = Math.floor(100000 + Math.random() * 900000).toString();
//   const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

//   // This will create a new user with isVerified: false, or update an existing unverified user
//   await User.findOneAndUpdate(
//     { email: contact },
//     { email: contact, otp, otpExpires, name: 'temp_unverified', isVerified: false },
//     { upsert: true, new: true, setDefaultsOnInsert: true }
//   );
  
//   await sendEmailWithOTP(contact, otp);
//   res.status(200).json({ message: `Registration OTP sent successfully to ${contact}` });
// });

// // @desc    Verify OTP and log in OR complete registration by marking user as verified
// // @route   POST /api/auth/verify-otp
// // @access  Public
// const verifyOtpAndLogin = asyncHandler(async (req, res) => {
//   const { contact, otp, name } = req.body;

//   const user = await User.findOne({ 
//       email: contact, 
//       otp: otp,
//       otpExpires: { $gt: Date.now() }
//   });

//   if (!user) {
//       res.status(400);
//       throw new Error('Invalid or expired OTP.');
//   }

//   // Finalize the user's details and mark as verified
//   user.name = name || user.name; // Use new name if provided during registration
//   user.isVerified = true;
//   user.otp = undefined;
//   user.otpExpires = undefined;
//   await user.save();

//   // Return user data and login token
//   res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       token: generateToken(user._id),
//   });
// });

// module.exports = { sendLoginOtp, sendRegisterOtp, verifyOtpAndLogin };










const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');
const nodemailer = require('nodemailer');

// --- Nodemailer Transporter Setup ---
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// --- Reusable Email Sending Function ---
const sendEmailWithOTP = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your CivicConnect Verification Code',
    html: `<p>Your verification code is: <strong>${otp}</strong>. It will expire in 10 minutes.</p>`,
  };
  
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    // Log the detailed error on the server but throw a generic error to the user
    console.error('❌ Nodemailer Error: Failed to send email.', error);
    throw new Error('Could not send verification email. Please check server logs.');
  }
};

// @desc    Generate and send OTP for an EXISTING, VERIFIED user to log in
// @route   POST /api/auth/send-login-otp
// @access  Public
const sendLoginOtp = asyncHandler(async (req, res) => {
  const { contact } = req.body;
  if (!contact) throw new Error('Email is required.');

  // Find the user by their email
  const user = await User.findOne({ email: contact });

  // Check if user exists AND is verified
  if (!user || !user.isVerified) {
    res.status(404);
    throw new Error('No verified account found with this email. Please register first.');
  }

  // If user is valid, generate and send OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.otp = otp;
  user.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  await sendEmailWithOTP(contact, otp);
  await user.save(); // Save OTP to user only after email is successfully dispatched

  res.status(200).json({ message: `Login OTP sent successfully to ${contact}` });
});

// @desc    Generate and send OTP for a NEW user to register
// @route   POST /api/auth/send-register-otp
// @access  Public
const sendRegisterOtp = asyncHandler(async (req, res) => {
  const { contact } = req.body;
  if (!contact) throw new Error('Email is required.');

  const existingUser = await User.findOne({ email: contact });
  
  // If a verified user already exists, block registration
  if (existingUser && existingUser.isVerified) {
    res.status(400);
    throw new Error('An account with this email already exists. Please log in.');
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

  // Create or update an unverified record with the new OTP
  await User.findOneAndUpdate(
    { email: contact },
    { email: contact, otp, otpExpires, name: 'temp_unverified', isVerified: false },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  
  await sendEmailWithOTP(contact, otp);
  res.status(200).json({ message: `Registration OTP sent successfully to ${contact}` });
});

// @desc    Verify OTP and log in OR complete registration
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyOtpAndLogin = asyncHandler(async (req, res) => {
  const { contact, otp, name } = req.body;

  const user = await User.findOne({ 
      email: contact, 
      otp: otp,
      otpExpires: { $gt: Date.now() }
  });

  if (!user) {
      res.status(400);
      throw new Error('Invalid or expired OTP.');
  }

  // Finalize user details and mark as verified
  user.name = name || user.name; // Use new name if provided during registration
  user.isVerified = true;
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  // Return user data and a login token
  res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
  });
});

module.exports = { sendLoginOtp, sendRegisterOtp, verifyOtpAndLogin };