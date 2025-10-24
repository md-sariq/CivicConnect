// const asyncHandler = require('express-async-handler');
// const Authority = require('../models/authorityModel');
// const User = require('../models/userModel');
// const generateToken = require('../utils/generateToken');

// // A placeholder for your email sending service
// const sendInvitationEmail = (email, token) => {
//   const registrationLink = `http://localhost:5173/authority-register?token=${token}`;
//   console.log('---- INVITATION EMAIL ----');
//   console.log(`To: ${email}`);
//   console.log('Please complete your registration by clicking the link below:');
//   console.log(registrationLink);
//   console.log('--------------------------');
//   // In a real app, you would use a library like Nodemailer here
// };

// // @desc    Create a new authority and invite its admin
// // @route   POST /api/superadmin/invite-authority
// // @access  Private/SuperAdmin

// const getAuthorities = asyncHandler(async (req, res) => {
//   const authorities = await Authority.find({});
//   res.json(authorities);
// });

// const inviteAuthority = asyncHandler(async (req, res) => {
//   const { name, contactEmail, jurisdiction } = req.body;

//   if (!name || !contactEmail || !jurisdiction) {
//     res.status(400);
//     throw new Error('Please provide all required fields');
//   }

//   const authorityExists = await Authority.findOne({ contactEmail });
//   if (authorityExists) {
//     res.status(400);
//     throw new Error('An authority with this email already exists.');
//   }

//   // Create the authority with a 'Pending' status
//   const newAuthority = await Authority.create({
//     name,
//     contactEmail,
//     jurisdiction,
//   });

//   // Create a temporary user account for the authority admin
//   const tempUser = await User.create({
//     name: name, // Use authority name as a placeholder
//     email: contactEmail,
//     password: 'temporary_password', // Placeholder, will be updated by user
//     role: 'authorityAdmin',
//     authority: newAuthority._id,
//   });
  
//   // Generate a unique, short-lived token for registration
//   const registrationToken = generateToken(tempUser._id, '1d'); // Expires in 1 day

//   // Send the invitation email
//   sendInvitationEmail(contactEmail, registrationToken);

//   res.status(201).json({
//     message: `Invitation sent successfully to ${contactEmail}.`,
//     authority: newAuthority,
//   });
// });

// // module.exports = { inviteAuthority };
// module.exports = { inviteAuthority, getAuthorities };








// const asyncHandler = require('express-async-handler');
// const Authority = require('../models/authorityModel');
// const User = require('../models/userModel');
// const Issue = require('../models/issueModel'); // <-- Import the Issue model
// const generateToken = require('../utils/generateToken');

// // ... inviteAuthority and getAuthorities functions remain the same ...
// const inviteAuthority = asyncHandler(async (req, res) => { /* ... */ });
// const getAuthorities = asyncHandler(async (req, res) => { /* ... */ });

// // @desc    Delete an authority and all its associated data
// // @route   DELETE /api/superadmin/authorities/:id
// // @access  Private/SuperAdmin
// const deleteAuthority = asyncHandler(async (req, res) => {
//   const authorityId = req.params.id;

//   // 1. Find the authority to ensure it exists
//   const authority = await Authority.findById(authorityId);
//   if (!authority) {
//     res.status(404);
//     throw new Error('Authority not found.');
//   }

//   // 2. Find all users associated with this authority
//   const usersToDelete = await User.find({ authority: authorityId });
//   const userIdsToDelete = usersToDelete.map(user => user._id);

//   // 3. Delete all issues reported by those users
//   if (userIdsToDelete.length > 0) {
//     await Issue.deleteMany({ reportedBy: { $in: userIdsToDelete } });
//   }

//   // 4. Delete all the associated user accounts
//   await User.deleteMany({ authority: authorityId });

//   // 5. Finally, delete the authority itself
//   await Authority.findByIdAndDelete(authorityId);

//   res.status(200).json({ message: 'Authority and all associated data deleted successfully.' });
// });

// module.exports = { inviteAuthority, getAuthorities, deleteAuthority };












// const asyncHandler = require('express-async-handler');
// const Authority = require('../models/authorityModel');
// const User = require('../models/userModel');
// const Issue = require('../models/issueModel');
// const generateToken = require('../utils/generateToken');
// const nodemailer = require('nodemailer'); // <-- 1. Import Nodemailer

// // --- 2. Create the Nodemailer Transporter ---
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // --- 3. Create the real email sending function ---
// const sendInvitationEmail = async (email, token) => {
//   const registrationLink = `http://localhost:5173/authority-register?token=${token}`;
  
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: 'Invitation to Join CivicConnect',
//     html: `
//       <div style="font-family: Arial, sans-serif; line-height: 1.6;">
//         <h2>You're Invited!</h2>
//         <p>You have been invited to join the CivicConnect platform as an Authority Administrator.</p>
//         <p>Please click the button below to complete your registration and set up your organization's profile. This link will expire in 24 hours.</p>
//         <a href="${registrationLink}" style="display: inline-block; padding: 12px 24px; font-size: 16px; color: white; background-color: #2563EB; text-decoration: none; border-radius: 8px;">
//           Complete Registration
//         </a>
//         <p style="margin-top: 20px; font-size: 12px; color: #777;">If you did not expect this invitation, you can safely ignore this email.</p>
//       </div>
//     `
//   };
  
//   try {
//     await transporter.sendMail(mailOptions);
//     console.log(`✅ Invitation email sent successfully to ${email}`);
//   } catch (error) {
//     console.error(`❌ Nodemailer Error: Failed to send invitation to ${email}.`, error);
//     throw new Error('Could not send invitation email.');
//   }
// };


// // @desc    Create a new authority and invite its admin
// // @route   POST /api/superadmin/invite-authority
// // @access  Private/SuperAdmin
// const inviteAuthority = asyncHandler(async (req, res) => {
//   const { name, contactEmail, jurisdiction } = req.body;

//   if (!name || !contactEmail || !jurisdiction) {
//     res.status(400);
//     throw new Error('Please provide all required fields');
//   }

//   const authorityExists = await Authority.findOne({ contactEmail });
//   if (authorityExists) {
//     res.status(400);
//     throw new Error('An authority with this email already exists.');
//   }

//   const newAuthority = await Authority.create({ name, contactEmail, jurisdiction });

//   // This temporary user has a password that will be replaced during onboarding
//   const tempUser = await User.create({
//     name: name,
//     email: contactEmail,
//     password: 'temporary_password', 
//     role: 'authorityAdmin',
//     authority: newAuthority._id,
//   });
  
//   const registrationToken = generateToken(tempUser._id, '1d');

//   // 4. Call the REAL email sending function
//   await sendInvitationEmail(contactEmail, registrationToken);

//   res.status(201).json({
//     message: `Invitation sent successfully to ${contactEmail}.`,
//     authority: newAuthority,
//   });
// });

// // ... getAuthorities and deleteAuthority functions remain unchanged ...
// const getAuthorities = asyncHandler(async (req, res) => { /* ... */ });
// const deleteAuthority = asyncHandler(async (req, res) => { /* ... */ });


// module.exports = { inviteAuthority, getAuthorities, deleteAuthority };















const asyncHandler = require('express-async-handler');
const Authority = require('../models/authorityModel');
const User = require('../models/userModel');
const Issue = require('../models/issueModel');
const generateToken = require('../utils/generateToken');
const nodemailer = require('nodemailer'); // <-- 1. Import Nodemailer

// --- 2. Create the Nodemailer Transporter ---
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// --- 3. Create the real email sending function ---
const sendInvitationEmail = async (email, token) => {
  const registrationLink = `http://localhost:5173/authority-register?token=${token}`;
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Invitation to Join CivicConnect',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>You're Invited!</h2>
        <p>You have been invited to join the CivicConnect platform as an Authority Administrator.</p>
        <p>Please click the button below to complete your registration and set up your organization's profile. This link will expire in 24 hours.</p>
        <a href="${registrationLink}" style="display: inline-block; padding: 12px 24px; font-size: 16px; color: white; background-color: #2563EB; text-decoration: none; border-radius: 8px;">
          Complete Registration
        </a>
        <p style="margin-top: 20px; font-size: 12px; color: #777;">If you did not expect this invitation, you can safely ignore this email.</p>
      </div>
    `
  };
  
  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Invitation email sent successfully to ${email}`);
  } catch (error) {
    console.error(`❌ Nodemailer Error: Failed to send invitation to ${email}.`, error);
    throw new Error('Could not send invitation email.');
  }
};


// @desc    Create a new authority and invite its admin
// @route   POST /api/superadmin/invite-authority
// @access  Private/SuperAdmin
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

  const newAuthority = await Authority.create({ name, contactEmail, jurisdiction });

  // This temporary user has a password that will be replaced during onboarding
  const tempUser = await User.create({
    name: name,
    email: contactEmail,
    password: 'temporary_password', 
    role: 'authorityAdmin',
    authority: newAuthority._id,
  });
  
  const registrationToken = generateToken(tempUser._id, '1d');

  // 4. Call the REAL email sending function
  await sendInvitationEmail(contactEmail, registrationToken);

  res.status(201).json({
    message: `Invitation sent successfully to ${contactEmail}.`,
    authority: newAuthority,
  });
});

// @desc    Get all authorities with pagination
// @route   GET /api/superadmin/authorities
// @access  Private/SuperAdmin
const getAuthorities = asyncHandler(async (req, res) => {
  // 1. Get page and limit from query parameters, set defaults
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
  const skip = (page - 1) * limit;

  // 2. Get the total count of documents for pagination info
  const totalAuthorities = await Authority.countDocuments({});

  // 3. Fetch only the authorities for the current page
  const authorities = await Authority.find({})
    .skip(skip)
    .limit(limit);

  // 4. Send back the current page, total pages, and the authorities for this page
  res.json({
    authorities,
    currentPage: page,
    totalPages: Math.ceil(totalAuthorities / limit),
    totalAuthorities,
  });
});

// @desc    Delete an authority
// @route   DELETE /api/superadmin/authorities/:id
// @access  Private/SuperAdmin
const deleteAuthority = asyncHandler(async (req, res) => {
  const authority = await Authority.findById(req.params.id);

  if (authority) {
    // Also delete the associated admin user(s) for that authority
    await User.deleteMany({ authority: authority._id });
    // (Optional: You might want to handle issues associated with this authority)
    await authority.deleteOne();
    res.json({ message: 'Authority and associated admin removed' });
  } else {
    res.status(444);
    throw new Error('Authority not found');
  }
});


module.exports = { inviteAuthority, getAuthorities, deleteAuthority };
