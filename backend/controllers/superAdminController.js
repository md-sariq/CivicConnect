const asyncHandler = require('express-async-handler');
const Authority = require('../models/authorityModel');
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

// A placeholder for your email sending service
const sendInvitationEmail = (email, token) => {
  const registrationLink = `http://localhost:5173/authority-register?token=${token}`;
  console.log('---- INVITATION EMAIL ----');
  console.log(`To: ${email}`);
  console.log('Please complete your registration by clicking the link below:');
  console.log(registrationLink);
  console.log('--------------------------');
  // In a real app, you would use a library like Nodemailer here
};

// @desc    Create a new authority and invite its admin
// @route   POST /api/superadmin/invite-authority
// @access  Private/SuperAdmin

const getAuthorities = asyncHandler(async (req, res) => {
  const authorities = await Authority.find({});
  res.json(authorities);
});

const inviteAuthority = asyncHandler(async (req, res) => {
  const { name, contactEmail, jurisdiction } = req.body;

  if (!name || !contactEmail || !jurisdiction) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  const authorityExists = await Authority.findOne({ contactEmail });
  if (authorityExists) {
    res.status(400);
    throw new Error('An authority with this email already exists.');
  }

  // Create the authority with a 'Pending' status
  const newAuthority = await Authority.create({
    name,
    contactEmail,
    jurisdiction,
  });

  // Create a temporary user account for the authority admin
  const tempUser = await User.create({
    name: name, // Use authority name as a placeholder
    email: contactEmail,
    password: 'temporary_password', // Placeholder, will be updated by user
    role: 'authorityAdmin',
    authority: newAuthority._id,
  });
  
  // Generate a unique, short-lived token for registration
  const registrationToken = generateToken(tempUser._id, '1d'); // Expires in 1 day

  // Send the invitation email
  sendInvitationEmail(contactEmail, registrationToken);

  res.status(201).json({
    message: `Invitation sent successfully to ${contactEmail}.`,
    authority: newAuthority,
  });
});

// module.exports = { inviteAuthority };
module.exports = { inviteAuthority, getAuthorities };