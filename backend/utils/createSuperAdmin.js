const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');
const User = require('../models/userModel');

dotenv.config();
connectDB();

// --- CONFIGURE YOUR SUPER ADMIN DETAILS HERE ---
const adminDetails = {
  name: 'Platform Super Admin',
  email: 'superadmin@civicconnect.com',
  password: '#SuperAdmin987', // Change this to a secure password
};
// ---------------------------------------------

const createAdmin = async () => {
  try {
    const userExists = await User.findOne({ email: adminDetails.email });

    if (userExists) {
      console.error('Super Admin with this email already exists!');
      process.exit(1);
    }
    
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminDetails.password, salt);

    // Create the user with the 'superAdmin' role
    await User.create({
      name: adminDetails.name,
      email: adminDetails.email,
      password: hashedPassword,
      role: 'superAdmin',
    });

    console.log('✅ Super Admin account created successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

createAdmin();