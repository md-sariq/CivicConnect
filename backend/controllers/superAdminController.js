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

// // @desc    Get all authorities with pagination
// // @route   GET /api/superadmin/authorities
// // @access  Private/SuperAdmin
// const getAuthorities = asyncHandler(async (req, res) => {
//   // 1. Get page and limit from query parameters, set defaults
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
//   const skip = (page - 1) * limit;

//   // 2. Get the total count of documents for pagination info
//   const totalAuthorities = await Authority.countDocuments({});

//   // 3. Fetch only the authorities for the current page
//   const authorities = await Authority.find({})
//     .skip(skip)
//     .limit(limit);

//   // 4. Send back the current page, total pages, and the authorities for this page
//   res.json({
//     authorities,
//     currentPage: page,
//     totalPages: Math.ceil(totalAuthorities / limit),
//     totalAuthorities,
//   });
// });

// // @desc    Delete an authority
// // @route   DELETE /api/superadmin/authorities/:id
// // @access  Private/SuperAdmin
// const deleteAuthority = asyncHandler(async (req, res) => {
//   const authority = await Authority.findById(req.params.id);

//   if (authority) {
//     // Also delete the associated admin user(s) for that authority
//     await User.deleteMany({ authority: authority._id });
//     // (Optional: You might want to handle issues associated with this authority)
//     await authority.deleteOne();
//     res.json({ message: 'Authority and associated admin removed' });
//   } else {
//     res.status(444);
//     throw new Error('Authority not found');
//   }
// });


// module.exports = { inviteAuthority, getAuthorities, deleteAuthority };











// const asyncHandler = require('express-async-handler');
// const Authority = require('../models/authorityModel');
// const User = require('../models/userModel');
// const Issue = require('../models/issueModel'); // Ensure Issue model is imported for cascade delete
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

// // --- Email Sending Function ---
// const sendInvitationEmail = async (email, token) => {
//   const registrationLink = `http://localhost:5173/authority-register?token=${token}`; // Adjust URL if needed
  
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
//     // Throwing error here ensures the inviteAuthority function stops if email fails
//     throw new Error('Could not send invitation email. Please check server logs.'); 
//   }
// };

// // @desc    Create a new authority and invite its admin
// // @route   POST /api/superadmin/invite-authority
// // @access  Private/SuperAdmin
// const inviteAuthority = asyncHandler(async (req, res) => {
//   // Extract name, email, and the FULL jurisdiction object from the request
//   const { name, contactEmail, jurisdiction } = req.body;

//   // Validate incoming data
//   if (!name || !contactEmail || !jurisdiction || !jurisdiction.coordinates || jurisdiction.type !== 'Polygon') {
//     res.status(400);
//     throw new Error('Please provide name, email, and valid GeoJSON Polygon jurisdiction data.');
//   }

//   // Ensure coordinates have the correct structure before proceeding
//   const coordinatesFromPayload = jurisdiction.coordinates;
//   if (!Array.isArray(coordinatesFromPayload) || !Array.isArray(coordinatesFromPayload[0]) || !Array.isArray(coordinatesFromPayload[0][0]) || coordinatesFromPayload[0].length < 4) {
//       res.status(400);
//       throw new Error('Invalid GeoJSON Polygon coordinate format. Expected [[[lng, lat],...]].');
//   }

//   // Check if authority already exists
//   const authorityExists = await Authority.findOne({ contactEmail });
//   if (authorityExists) {
//     res.status(400);
//     throw new Error('An authority with this email already exists.');
//   }

//   // Check if a user with this email already exists (even if unverified, start clean)
//   const userExists = await User.findOne({ email: contactEmail });
//   if (userExists) {
//     // Optionally delete the existing unverified user, or just block
//     res.status(400);
//     throw new Error('A user account (possibly unverified) already exists with this email. Please resolve manually.');
//   }

//   // Create the authority, explicitly setting the type and coordinates
//   const newAuthority = await Authority.create({
//     name,
//     contactEmail,
//     jurisdiction: {
//         type: 'Polygon',
//         coordinates: coordinatesFromPayload // Use the triple-bracket array directly
//     }
//   });

//   // Create temporary user linked to the new authority
//   const tempUser = await User.create({
//     name: name, // Placeholder name
//     email: contactEmail,
//     password: 'temporary_password', // Temporary placeholder - required by schema?
//     role: 'authorityAdmin',
//     authority: newAuthority._id,
//     isVerified: false // Ensure new temp user is not verified
//   });

//   const registrationToken = generateToken(tempUser._id, '1d'); // Generate 1-day token

//   // Send the actual invitation email
//   await sendInvitationEmail(contactEmail, registrationToken);

//   res.status(201).json({
//     message: `Invitation sent successfully to ${contactEmail}.`,
//     authority: newAuthority,
//   });
// });

// // @desc    Get all authorities with pagination
// // @route   GET /api/superadmin/authorities
// // @access  Private/SuperAdmin
// const getAuthorities = asyncHandler(async (req, res) => {
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 10;
//   const skip = (page - 1) * limit;

//   const totalAuthorities = await Authority.countDocuments({});
//   const authorities = await Authority.find({})
//     .skip(skip)
//     .limit(limit)
//     .sort({ createdAt: -1 }); // Sort by creation date, newest first

//   res.json({
//     authorities,
//     currentPage: page,
//     totalPages: Math.ceil(totalAuthorities / limit),
//     totalAuthorities,
//   });
// });

// // @desc    Delete an authority and all its associated data (cascade delete)
// // @route   DELETE /api/superadmin/authorities/:id
// // @access  Private/SuperAdmin
// const deleteAuthority = asyncHandler(async (req, res) => {
//   const authorityId = req.params.id;

//   // 1. Find the authority
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
  
//   // 4. Also delete issues *assigned* to this authority (important cleanup)
//    await Issue.deleteMany({ assignedToAuthority: authorityId });


//   // 5. Delete all associated user accounts
//   await User.deleteMany({ authority: authorityId });

//   // 6. Finally, delete the authority itself
//   await Authority.findByIdAndDelete(authorityId);

//   res.status(200).json({ message: 'Authority and all associated data deleted successfully.' });
// });

// module.exports = { inviteAuthority, getAuthorities, deleteAuthority };












// const asyncHandler = require('express-async-handler');
// const Authority = require('../models/authorityModel');
// const User = require('../models/userModel');
// const Issue = require('../models/issueModel'); // Ensure Issue model is imported for cascade delete
// const generateToken = require('../utils/generateToken');
// // const nodemailer = require('nodemailer'); // <-- 1. REMOVED
// const { Resend } = require('resend'); // <-- 2. ADDED

// // --- 3. Initialize Resend ---
// const resend = new Resend(process.env.RESEND_API_KEY);

// // --- 4. Email Sending Function (Updated to Resend) ---
// const sendInvitationEmail = async (email, token) => {
//   // Use your production Vercel URL
//   const registrationLink = `https://civic-connect-y8dl.vercel.app/authority-register?token=${token}`; 
  
//   const mailOptions = {
//     from: 'CivicConnect <onboarding@resend.dev>', // Use Resend's default sender
//     to: [email], // Resend expects an array
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
//     // Use resend.emails.send()
//     const { data, error } = await resend.emails.send(mailOptions);
    
//     if (error) {
//       console.error(`❌ Resend Error: Failed to send invitation to ${email}.`, error);
//       throw new Error('Could not send invitation email. Please check server logs.');
//     }

//     console.log(`✅ Invitation email sent successfully to ${email}. ID: ${data.id}`);
//   } catch (error) {
//     console.error(`❌ CATCH Error: Failed to send invitation to ${email}.`, error);
//     // Throwing error here ensures the inviteAuthority function stops if email fails
//     throw new Error('Could not send invitation email. Please check server logs.'); 
//   }
// };

// // @desc    Create a new authority and invite its admin
// // @route   POST /api/superadmin/invite-authority
// // @access  Private/SuperAdmin
// const inviteAuthority = asyncHandler(async (req, res) => {
//   // Extract name, email, and the FULL jurisdiction object from the request
//   const { name, contactEmail, jurisdiction } = req.body;

//   // Validate incoming data
//   if (!name || !contactEmail || !jurisdiction || !jurisdiction.coordinates || jurisdiction.type !== 'Polygon') {
//     res.status(400);
//     throw new Error('Please provide name, email, and valid GeoJSON Polygon jurisdiction data.');
//   }

//   // Ensure coordinates have the correct structure before proceeding
//   const coordinatesFromPayload = jurisdiction.coordinates;
//   if (!Array.isArray(coordinatesFromPayload) || !Array.isArray(coordinatesFromPayload[0]) || !Array.isArray(coordinatesFromPayload[0][0]) || coordinatesFromPayload[0].length < 4) {
//       res.status(400);
//       throw new Error('Invalid GeoJSON Polygon coordinate format. Expected [[[lng, lat],...]].');
//   }

//   // Check if authority already exists
//   const authorityExists = await Authority.findOne({ contactEmail });
//   if (authorityExists) {
//     res.status(400);
//     throw new Error('An authority with this email already exists.');
//   }

//   // Check if a user with this email already exists (even if unverified, start clean)
//   const userExists = await User.findOne({ email: contactEmail });
//   if (userExists) {
//     // Optionally delete the existing unverified user, or just block
//     res.status(400);
//     throw new Error('A user account (possibly unverified) already exists with this email. Please resolve manually.');
//   }

//   // Create the authority, explicitly setting the type and coordinates
//   const newAuthority = await Authority.create({
//     name,
//     contactEmail,
//     jurisdiction: {
//         type: 'Polygon',
//         coordinates: coordinatesFromPayload // Use the triple-bracket array directly
//     }
//   });

//   // Create temporary user linked to the new authority
//   const tempUser = await User.create({
//     name: name, // Placeholder name
//     email: contactEmail,
//     password: 'temporary_password', // Temporary placeholder - required by schema?
//     role: 'authorityAdmin',
//     authority: newAuthority._id,
//     isVerified: false // Ensure new temp user is not verified
//   });

//   const registrationToken = generateToken(tempUser._id, '1d'); // Generate 1-day token

//   // Send the actual invitation email (now using Resend)
//   await sendInvitationEmail(contactEmail, registrationToken);

//   res.status(201).json({
//     message: `Invitation sent successfully to ${contactEmail}.`,
//     authority: newAuthority,
//   });
// });

// // @desc    Get all authorities with pagination
// // @route   GET /api/superadmin/authorities
// // @access  Private/SuperAdmin
// const getAuthorities = asyncHandler(async (req, res) => {
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 10;
//   const skip = (page - 1) * limit;

//   const totalAuthorities = await Authority.countDocuments({});
//   const authorities = await Authority.find({})
//     .skip(skip)
//     .limit(limit)
//     .sort({ createdAt: -1 }); // Sort by creation date, newest first

//   res.json({
//     authorities,
//     currentPage: page,
//     totalPages: Math.ceil(totalAuthorities / limit),
//     totalAuthorities,
//   });
// });

// // @desc    Delete an authority and all its associated data (cascade delete)
// // @route   DELETE /api/superadmin/authorities/:id
// // @access  Private/SuperAdmin
// const deleteAuthority = asyncHandler(async (req, res) => {
//   const authorityId = req.params.id;

//   // 1. Find the authority
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
  
//   // 4. Also delete issues *assigned* to this authority (important cleanup)
//    await Issue.deleteMany({ assignedToAuthority: authorityId });


//   // 5. Delete all associated user accounts
//   await User.deleteMany({ authority: authorityId });

//   // 6. Finally, delete the authority itself
//   await Authority.findByIdAndDelete(authorityId);

//   res.status(200).json({ message: 'Authority and all associated data deleted successfully.' });
// });

// module.exports = { inviteAuthority, getAuthorities, deleteAuthority };






















// const asyncHandler = require('express-async-handler');
// const Authority = require('../models/authorityModel');
// const User = require('../models/userModel');
// const Issue = require('../models/issueModel'); // Ensure Issue model is imported for cascade delete
// const generateToken = require('../utils/generateToken');
// // const nodemailer = require('nodemailer'); // <-- 1. REMOVED
// const { Resend } = require('resend'); // <-- 2. ADDED

// // --- 3. Initialize Resend ---
// // This automatically reads the RESEND_API_KEY from your .env file
// const resend = new Resend(process.env.RESEND_API_KEY);

// // --- 4. Email Sending Function (Updated to Resend) ---
// const sendInvitationEmail = async (email, token) => {
//   // Use your production Vercel URL
//   const registrationLink = `https://civic-connect-y8dl.vercel.app/authority-register?token=${token}`; 
  
//   const mailOptions = {
//     // --- THIS IS THE CRITICAL CHANGE ---
//     // Using your verified domain to send emails to ANY user
//     from: 'CivicConnect <no-reply@broscodes.in>',
//     to: [email], // Resend expects an array
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
//     // Use resend.emails.send()
//     const { data, error } = await resend.emails.send(mailOptions);
    
//     if (error) {
//       console.error(`❌ Resend Error: Failed to send invitation to ${email}.`, error);
//       throw new Error('Could not send invitation email. Please check server logs.');
//     }

//     console.log(`✅ Invitation email sent successfully to ${email}. ID: ${data.id}`);
//   } catch (error) {
//     console.error(`❌ CATCH Error: Failed to send invitation to ${email}.`, error);
//     // Throwing error here ensures the inviteAuthority function stops if email fails
//     throw new Error('Could not send invitation email. Please check server logs.'); 
//   }
// };

// // @desc    Create a new authority and invite its admin
// // @route   POST /api/superadmin/invite-authority
// // @access  Private/SuperAdmin
// const inviteAuthority = asyncHandler(async (req, res) => {
//   // Extract name, email, and the FULL jurisdiction object from the request
//   const { name, contactEmail, jurisdiction } = req.body;

//   // Validate incoming data
//   if (!name || !contactEmail || !jurisdiction || !jurisdiction.coordinates || jurisdiction.type !== 'Polygon') {
//     res.status(400);
//     throw new Error('Please provide name, email, and valid GeoJSON Polygon jurisdiction data.');
//   }

//   // Ensure coordinates have the correct structure before proceeding
//   const coordinatesFromPayload = jurisdiction.coordinates;
//   if (!Array.isArray(coordinatesFromPayload) || !Array.isArray(coordinatesFromPayload[0]) || !Array.isArray(coordinatesFromPayload[0][0]) || coordinatesFromPayload[0].length < 4) {
//       res.status(400);
//       throw new Error('Invalid GeoJSON Polygon coordinate format. Expected [[[lng, lat],...]].');
//   }

//   // Check if authority already exists
//   const authorityExists = await Authority.findOne({ contactEmail });
//   if (authorityExists) {
//     res.status(400);
//     throw new Error('An authority with this email already exists.');
//   }

//   // Check if a user with this email already exists (even if unverified, start clean)
//   const userExists = await User.findOne({ email: contactEmail });
//   if (userExists) {
//     // Optionally delete the existing unverified user, or just block
//     res.status(400); // <-- THIS LINE WAS CORRECTED
//     throw new Error('A user account (possibly unverified) already exists with this email. Please resolve manually.');
//   }

//   // Create the authority, explicitly setting the type and coordinates
//   const newAuthority = await Authority.create({
//     name,
//     contactEmail,
//     jurisdiction: {
//         type: 'Polygon',
//         coordinates: coordinatesFromPayload // Use the triple-bracket array directly
//     }
//   });

//   // Create temporary user linked to the new authority
//   const tempUser = await User.create({
//     name: name, // Placeholder name
//     email: contactEmail,
//     password: 'temporary_password', // Temporary placeholder - required by schema?
//     role: 'authorityAdmin',
//     authority: newAuthority._id,
//     isVerified: false // Ensure new temp user is not verified
//   });

//   const registrationToken = generateToken(tempUser._id, '1d'); // Generate 1-day token

//   // Send the actual invitation email (now using Resend)
//   await sendInvitationEmail(contactEmail, registrationToken);

//   res.status(201).json({
//     message: `Invitation sent successfully to ${contactEmail}.`,
//     authority: newAuthority,
//   });
// });

// // @desc    Get all authorities with pagination
// // @route   GET /api/superadmin/authorities
// // @access  Private/SuperAdmin
// const getAuthorities = asyncHandler(async (req, res) => {
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 10;
//   const skip = (page - 1) * limit;

//   const totalAuthorities = await Authority.countDocuments({});
//   const authorities = await Authority.find({})
//     .skip(skip)
//     .limit(limit)
//     .sort({ createdAt: -1 }); // Sort by creation date, newest first

//   res.json({
//     authorities,
//     currentPage: page,
//     totalPages: Math.ceil(totalAuthorities / limit),
//     totalAuthorities,
//   });
// });

// // @desc    Delete an authority and all its associated data (cascade delete)
// // @route   DELETE /api/superadmin/authorities/:id
// // @access  Private/SuperAdmin
// const deleteAuthority = asyncHandler(async (req, res) => {
//   const authorityId = req.params.id;

//   // 1. Find the authority
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
  
//   // 4. Also delete issues *assigned* to this authority (important cleanup)
//    await Issue.deleteMany({ assignedToAuthority: authorityId });


//   // 5. Delete all associated user accounts
//   await User.deleteMany({ authority: authorityId });

//   // 6. Finally, delete the authority itself
//   await Authority.findByIdAndDelete(authorityId);

//   res.status(200).json({ message: 'Authority and all associated data deleted successfully.' });
// });

// module.exports = { inviteAuthority, getAuthorities, deleteAuthority };





















// const asyncHandler = require('express-async-handler');
// const Authority = require('../models/authorityModel');
// const User = require('../models/userModel');
// const Issue = require('../models/issueModel');
// const generateToken = require('../utils/generateToken');
// const { Resend } = require('resend');

// // This automatically reads the RESEND_API_KEY from your .env file
// const resend = new Resend(process.env.RESEND_API_KEY);

// // --- Email Sending Function (Resend) ---
// const sendInvitationEmail = async (email, token) => {
//   // Use your production Vercel URL
//   const registrationLink = `https://civic-connect-y8dl.vercel.app/authority-register?token=${token}`; 
//   
//   const mailOptions = {
//     // Using your verified domain to send emails to ANY user
//     from: 'CivicConnect <no-reply@broscodes.in>',
//     to: [email], // Resend expects an array
//     subject: 'Invitation to Join CivicConnect',
//     html: `
//       <div style="font-family: Arial, sans-serif; line-height: 1.6;">
//         <h2>You're Invited!</h2>
//         <p>You have been invited to join the CivicConnect platform as an Authority Administrator.</p>
//         <p>Please click the button below to complete your registration and set up your organization's profile. This link will expire in 24 hours.</p>
//         <a href="${registrationLink}" style="display: inline-block; padding: 12px 24px; font-size: 16px; color: white; background-color: #2563EB; text-decoration: none; border-radius: 8px;">
//           Complete Registration
//         </a>
//         <p style="margin-top: 20px; font-size: 12px; color: #777;">If you did not expect this invitation, you can safely ignore this email.</p>
//       </div>
//     `
//   };
//   
//   try {
//     const { data, error } = await resend.emails.send(mailOptions);
//     
//     if (error) {
//       console.error(`❌ Resend Error: Failed to send invitation to ${email}.`, error);
//       throw new Error('Could not send invitation email. Please check server logs.');
//     }

//     console.log(`✅ Invitation email sent successfully to ${email}. ID: ${data.id}`);
//   } catch (error) {
//     console.error(`❌ CATCH Error: Failed to send invitation to ${email}.`, error);
//     throw new Error('Could not send invitation email. Please check server logs.'); 
//   }
// };

// // @desc    Create a new authority and invite its admin
// // @route   POST /api/superadmin/invite-authority
// // @access  Private/SuperAdmin
// const inviteAuthority = asyncHandler(async (req, res) => {
//   const { name, contactEmail, jurisdiction } = req.body;

//   if (!name || !contactEmail || !jurisdiction || !jurisdiction.coordinates || jurisdiction.type !== 'Polygon') {
//     res.status(400);
//     throw new Error('Please provide name, email, and valid GeoJSON Polygon jurisdiction data.');
//   }

//   // --- CORRECTED VALIDATION LOGIC ---
//   // We now check for the 3-layer array structure: [[[lng, lat],...]]
//   const coordinatesFromPayload = jurisdiction.coordinates;
//   if (
//     !Array.isArray(coordinatesFromPayload) || 
//     !Array.isArray(coordinatesFromPayload[0]) || 
//     !Array.isArray(coordinatesFromPayload[0][0]) || 
//     coordinatesFromPayload[0].length < 4
//   ) {
//       res.status(400);
//       throw new Error('Invalid GeoJSON Polygon coordinate format. Expected [[[lng, lat],...]].');
//   }
//     // --- END CORRECTED VALIDATION ---

//   // Check if authority already exists
//   const authorityExists = await Authority.findOne({ contactEmail });
//   if (authorityExists) {
//     res.status(400);
//     throw new Error('An authority with this email already exists.');
//   }

//   // Check if a user with this email already exists (even if unverified, start clean)
//   const userExists = await User.findOne({ email: contactEmail });
//   if (userExists) {
//     res.status(400);
//     throw new Error('A user account (possibly unverified) already exists with this email. Please resolve manually.');
//   }

//   // Create the authority, explicitly setting the type and coordinates
//   const newAuthority = await Authority.create({
//     name,
//     contactEmail,
//     jurisdiction: {
//         type: 'Polygon',
//         coordinates: coordinatesFromPayload // Use the corrected 3-layer array directly
//     }
//   });

//   // Create temporary user linked to the new authority
//   const tempUser = await User.create({
//     name: name, // Placeholder name
//     email: contactEmail,
//     password: 'temporary_password', // Temporary placeholder - required by schema?
//     role: 'authorityAdmin',
//     authority: newAuthority._id,
//     isVerified: false // Ensure new temp user is not verified
//   });

//   const registrationToken = generateToken(tempUser._id, '1d'); // Generate 1-day token

//   // Send the actual invitation email
//   await sendInvitationEmail(contactEmail, registrationToken);

//   res.status(201).json({
//     message: `Invitation sent successfully to ${contactEmail}.`,
//     authority: newAuthority,
//   });
// });

// // @desc    Get all authorities with pagination
// // @route   GET /api/superadmin/authorities
// // @access  Private/SuperAdmin
// const getAuthorities = asyncHandler(async (req, res) => {
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 10;
//   const skip = (page - 1) * limit;

//   const totalAuthorities = await Authority.countDocuments({});
//   const authorities = await Authority.find({})
//     .skip(skip)
//     .limit(limit)
//     .sort({ createdAt: -1 }); // Sort by creation date, newest first

//   res.json({
//     authorities,
//     currentPage: page,
//     totalPages: Math.ceil(totalAuthorities / limit),
//     totalAuthorities,
//   });
// });

// // @desc    Delete an authority and all its associated data (cascade delete)
// // @route   DELETE /api/superadmin/authorities/:id
// // @access  Private/SuperAdmin
// const deleteAuthority = asyncHandler(async (req, res) => {
//   const authorityId = req.params.id;

//   // 1. Find the authority
//   const authority = await Authority.findById(authorityId);
//   if (!authority) {
//     res.status(404);
//     throw new Error('Authority not found.');
//   }

//   // 2. Find all users associated with this authority
//   const usersToDelete = await User.find({ authority: authorityId });
//   const userIdsToDelete = usersToDelete.map(user => user._id);

//   // 3. Delete all issues reported by those users
//   if (userIdsToDelete.length > 0) {
//     await Issue.deleteMany({ reportedBy: { $in: userIdsToDelete } });
//   }
//   
//   // 4. Also delete issues *assigned* to this authority (important cleanup)
//    await Issue.deleteMany({ assignedToAuthority: authorityId });


//   // 5. Delete all associated user accounts
//   await User.deleteMany({ authority: authorityId });

//   // 6. Finally, delete the authority itself
//   await Authority.findByIdAndDelete(authorityId);

//   res.status(200).json({ message: 'Authority and all associated data deleted successfully.' });
// });

// module.exports = { inviteAuthority, getAuthorities, deleteAuthority };






















const asyncHandler = require('express-async-handler');
const Authority = require('../models/authorityModel');
const User = require('../models/userModel');
const Issue = require('../models/issueModel');
const generateToken = require('../utils/generateToken');
const { Resend } = require('resend');

// This automatically reads the RESEND_API_KEY from your .env file
const resend = new Resend(process.env.RESEND_API_KEY);

// --- Email Sending Function (Resend) ---
const sendInvitationEmail = async (email, token) => {
  // Use your production Vercel URL
  const registrationLink = `https://civic-connect-y8dl.vercel.app/authority-register?token=${token}`;

  const mailOptions = {
    // Using your verified domain to send emails to ANY user
    from: 'CivicConnect <no-reply@broscodes.in>',
    to: [email], // Resend expects an array
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
    const { data, error } = await resend.emails.send(mailOptions);

    if (error) {
      console.error(`❌ Resend Error: Failed to send invitation to ${email}.`, error);
      throw new Error('Could not send invitation email. Please check server logs.');
    }

    console.log(`✅ Invitation email sent successfully to ${email}. ID: ${data.id}`);
  } catch (error) {
    console.error(`❌ CATCH Error: Failed to send invitation to ${email}.`, error);
    throw new Error('Could not send invitation email. Please check server logs.');
  }
};

// @desc    Create a new authority and invite its admin
// @route   POST /api/superadmin/invite-authority
// @access  Private/SuperAdmin
const inviteAuthority = asyncHandler(async (req, res) => {
  const { name, contactEmail, jurisdiction } = req.body;

  if (!name || !contactEmail || !jurisdiction || !jurisdiction.coordinates || jurisdiction.type !== 'Polygon') {
    res.status(400);
    throw new Error('Please provide name, email, and valid GeoJSON Polygon jurisdiction data.');
  }

  // --- CORRECTED VALIDATION LOGIC ---
  const coordinatesFromPayload = jurisdiction.coordinates;
  if (
    !Array.isArray(coordinatesFromPayload) ||
    !Array.isArray(coordinatesFromPayload[0]) ||
    !Array.isArray(coordinatesFromPayload[0][0]) ||
    coordinatesFromPayload[0].length < 4
  ) {
    res.status(400);
    throw new Error('Invalid GeoJSON Polygon coordinate format. Expected [[[lng, lat],...]].');
  }
    // --- END CORRECTED VALIDATION ---

  // Check if authority already exists
  const authorityExists = await Authority.findOne({ contactEmail });
  if (authorityExists) {
    res.status(400);
    throw new Error('An authority with this email already exists.');
  }

  // Check if a user with this email already exists (even if unverified, start clean)
  const userExists = await User.findOne({ email: contactEmail });
  if (userExists) {
    res.status(400);
    throw new Error('A user account (possibly unverified) already exists with this email. Please resolve manually.');
  }

  console.log("--- DEBUG: Data structure being sent to Authority.create ---");
  console.log(JSON.stringify({
      name,
      contactEmail,
      jurisdiction: {
          type: 'Polygon',
          coordinates: coordinatesFromPayload
      }
  }, null, 2));

  let newAuthority;
  try {
    console.log("--- DEBUG: Attempting Authority.create ---");
    newAuthority = await Authority.create({
      name,
      contactEmail,
      jurisdiction: {
          type: 'Polygon',
          coordinates: coordinatesFromPayload
      }
    });
    console.log(`--- SUCCESS: Authority created with ID: ${newAuthority._id} ---`);
  } catch (dbError) {
    console.error(`❌ DATABASE ERROR during Authority.create:`);
    console.error(dbError);
    res.status(500);
    throw new Error('Failed to save the new authority to the database. Check server logs for details.');
  }


  console.log(`--- DEBUG: Attempting to create temporary user for: ${contactEmail} ---`);

  // Create temporary user linked to the new authority
  const tempUser = await User.create({
    name: name, // Placeholder name
    email: contactEmail,
    password: 'temporary_password', // Temporary placeholder - required by schema?
    role: 'authorityAdmin',
    authority: newAuthority._id,
    isVerified: false // Ensure new temp user is not verified
  });

  // --- FIXED TYPO HERE ---
  const registrationToken = generateToken(tempUser._id, '1d'); // Changed 'd' to '1d'
  // -----------------------

  // Send the actual invitation email
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
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const totalAuthorities = await Authority.countDocuments({});
  const authorities = await Authority.find({})
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 }); // Sort by creation date, newest first

  res.json({
    authorities,
    currentPage: page,
    totalPages: Math.ceil(totalAuthorities / limit),
    totalAuthorities,
  });
});

// @desc    Delete an authority and all its associated data (cascade delete)
// @route   DELETE /api/superadmin/authorities/:id
// @access  Private/SuperAdmin
const deleteAuthority = asyncHandler(async (req, res) => {
  const authorityId = req.params.id;

  // 1. Find the authority
  const authority = await Authority.findById(authorityId);
  if (!authority) {
    res.status(404);
    throw new Error('Authority not found.');
  }

  // 2. Find all users associated with this authority
  const usersToDelete = await User.find({ authority: authorityId });
  const userIdsToDelete = usersToDelete.map(user => user._id);

  // 3. Delete all issues reported by those users
  if (userIdsToDelete.length > 0) {
    await Issue.deleteMany({ reportedBy: { $in: userIdsToDelete } });
  }

  // 4. Also delete issues *assigned* to this authority (important cleanup)
   await Issue.deleteMany({ assignedToAuthority: authorityId });


  // 5. Delete all associated user accounts
  await User.deleteMany({ authority: authorityId });

  // 6. Finally, delete the authority itself
  await Authority.findByIdAndDelete(authorityId);

  res.status(200).json({ message: 'Authority and all associated data deleted successfully.' });
});

module.exports = { inviteAuthority, getAuthorities, deleteAuthority };


















