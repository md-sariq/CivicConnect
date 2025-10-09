// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true, lowercase: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ['citizen', 'admin'], default: 'citizen' },
// }, { timestamps: true });

// module.exports = mongoose.model('User', userSchema);


const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['citizen', 'authorityAdmin', 'superAdmin'], // <-- UPDATED ROLES
      default: 'citizen',
    },
    // Link user to a specific authority (optional for citizens/superAdmins)
    authority: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Authority'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);