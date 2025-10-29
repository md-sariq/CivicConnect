
// const asyncHandler = require('express-async-handler');
// const User = require('../models/userModel');
// const generateToken = require('../utils/generateToken');
// // const nodemailer = require('nodemailer'); // <-- 1. REMOVED
// const { Resend } = require('resend'); // <-- 2. ADDED

// // --- 3. Initialize Resend ---
// const resend = new Resend(process.env.RESEND_API_KEY);

// // --- 4. Reusable Email Sending Function (Updated to Resend) ---
// const sendEmailWithOTP = async (email, otp) => {
//   const mailOptions = {
//     from: 'CivicConnect <onboarding@resend.dev>', // Use Resend's default sender
//     to: [email], // Resend expects an array
//     subject: 'Your CivicConnect Verification Code',
//     html: `<p>Your verification code is: <strong>${otp}</strong>. It will expire in 10 minutes.</p>`,
//   };
  
//   try {
//     // Use resend.emails.send() instead of transporter.sendMail()
//     const { data, error } = await resend.emails.send(mailOptions);

//     if (error) {
//       console.error(`❌ Resend Error: Failed to send email.`, error);
//       throw new Error('Could not send verification email. Please check server logs.');
//     }
    
//     console.log(`✅ OTP email sent successfully to ${email}. ID: ${data.id}`);

//   } catch (error) {
//     // Log the detailed error on the server but throw a generic error to the user
//     console.error('❌ CATCH Error: Failed to send email.', error);
//     throw new Error('Could not send verification email. Please check server logs.');
//   }
// };

// // @desc    Generate and send OTP for an EXISTING, VERIFIED user to log in
// // @route   POST /api/auth/send-login-otp
// // @access  Public
// const sendLoginOtp = asyncHandler(async (req, res) => {
//   const { contact } = req.body;
//   if (!contact) throw new Error('Email is required.');

//   // Find the user by their email
//   const user = await User.findOne({ email: contact });

//   // Check if user exists AND is verified
//   if (!user || !user.isVerified) {
//     res.status(404);
//     throw new Error('No verified account found with this email. Please register first.');
//   }

//   // If user is valid, generate and send OTP
//   const otp = Math.floor(100000 + Math.random() * 900000).toString();
//   user.otp = otp;
//   user.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

//   await sendEmailWithOTP(contact, otp); // This now calls the Resend function
//   await user.save(); // Save OTP to user only after email is successfully dispatched

//   res.status(200).json({ message: `Login OTP sent successfully to ${contact}` });
// });

// // @desc    Generate and send OTP for a NEW user to register
// // @route   POST /api/auth/send-register-otp
// // @access  Public
// const sendRegisterOtp = asyncHandler(async (req, res) => {
//   const { contact } = req.body;
//   if (!contact) throw new Error('Email is required.');

//   const existingUser = await User.findOne({ email: contact });
  
//   // If a verified user already exists, block registration
//   if (existingUser && existingUser.isVerified) {
//     res.status(400);
//     throw new Error('An account with this email already exists. Please log in.');
//   }

//   const otp = Math.floor(100000 + Math.random() * 900000).toString();
//   const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

//   // Create or update an unverified record with the new OTP
//   await User.findOneAndUpdate(
//     { email: contact },
//     { email: contact, otp, otpExpires, name: 'temp_unverified', isVerified: false },
//     { upsert: true, new: true, setDefaultsOnInsert: true }
//   );
  
//   await sendEmailWithOTP(contact, otp); // This now calls the Resend function
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

//   // Finalize user details and mark as verified
//   user.name = name || user.name; // Use new name if provided during registration
//   user.isVerified = true;
//   user.otp = undefined;
//   user.otpExpires = undefined;
//   await user.save();

//   // Return user data and a login token
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
// const nodemailer = require('nodemailer'); // <-- 1. REMOVED
const { Resend } = require('resend'); // <-- 2. ADDED

// --- 3. Initialize Resend ---
// This automatically reads the RESEND_API_KEY from your .env file
const resend = new Resend(process.env.RESEND_API_KEY);

// --- 4. Reusable Email Sending Function (Updated to Resend) ---
const sendEmailWithOTP = async (email, otp) => {
  const mailOptions = {
    // --- THIS IS THE CRITICAL CHANGE ---
    // Using your verified domain to send emails to ANY user
    from: 'CivicConnect <no-reply@broscodes.in>', 
    to: [email], // Resend expects an array
    subject: 'Your CivicConnect Verification Code',
    html: `<p>Your verification code is: <strong>${otp}</strong>. It will expire in 10 minutes.</p>`,
  };
  
  try {
    // Use resend.emails.send() instead of transporter.sendMail()
    const { data, error } = await resend.emails.send(mailOptions);

    if (error) {
      console.error(`❌ Resend Error: Failed to send email.`, error);
      throw new Error('Could not send verification email. Please check server logs.');
    }
    
    console.log(`✅ OTP email sent successfully to ${email}. ID: ${data.id}`);

  } catch (error) {
    // Log the detailed error on the server but throw a generic error to the user
    console.error('❌ CATCH Error: Failed to send email.', error);
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

  await sendEmailWithOTP(contact, otp); // This now calls the Resend function
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
  
  await sendEmailWithOTP(contact, otp); // This now calls the Resend function
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


