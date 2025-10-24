// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const bcrypt = require('bcryptjs');
// const connectDB = require('../config/db');
// const User = require('../models/userModel');

// dotenv.config();
// connectDB();

// // --- CONFIGURE YOUR SUPER ADMIN DETAILS HERE ---
// const adminDetails = {
//   name: 'Platform Super Admin',
//   email: 'hasansariq098@gmail.com',
//   password: '#SuperAdmin987', // Change this to a secure password
// };
// // ---------------------------------------------

// const createAdmin = async () => {
//   try {
//     const userExists = await User.findOne({ email: adminDetails.email });

//     if (userExists) {
//       console.error('Super Admin with this email already exists!');
//       process.exit(1);
//     }
    
//     // Hash the password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(adminDetails.password, salt);

//     // Create the user with the 'superAdmin' role
//     await User.create({
//       name: adminDetails.name,
//       email: adminDetails.email,
//       password: hashedPassword,
//       role: 'superAdmin',
//     });

//     console.log('✅ Super Admin account created successfully!');
//     process.exit();
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     process.exit(1);
//   }
// };

// createAdmin();


const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const User = require('../models/userModel');

dotenv.config();
connectDB();

// --- CONFIGURE YOUR SUPER ADMIN DETAILS HERE ---
const adminDetails = {
  name: 'Platform Super Admin',
  email: 'hasansariq098@gmail.com', // Change this to your real email
};
// ---------------------------------------------

const createAdmin = async () => {
  try {
    const userExists = await User.findOne({ email: adminDetails.email });

    if (userExists) {
      // If the user already exists, just update their role and verification status
      userExists.role = 'superAdmin';
      userExists.isVerified = true;
      await userExists.save();
      console.log('✅ Super Admin account already existed. It has been updated and marked as verified.');
      process.exit();
    } else {
      // If the user doesn't exist, create them with the correct settings
      await User.create({
        name: adminDetails.name,
        email: adminDetails.email,
        role: 'superAdmin',
        isVerified: true, // This is the crucial line
        password: 'passwordless_account' // Placeholder to satisfy schema if needed
      });
      console.log('✅ Super Admin account created successfully and marked as verified!');
      process.exit();
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

createAdmin();