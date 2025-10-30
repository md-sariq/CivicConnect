





// const mongoose = require('mongoose');

// const issueSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     description: { type: String },
//     category: { type: String, required: true },
//     imageUrl: { type: String },
//     address: { type: String },
//     status: { type: String, enum: ['Pending', 'In Progress', 'Resolved'], default: 'Pending' },
//     reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    
//     // 1. UPDATED: Location stored in GeoJSON format
//     location: {
//       type: {
//         type: String,
//         enum: ['Point'], // 'location.type' must be 'Point'
//         required: true,
//       },
//       coordinates: {
//         type: [Number], // [longitude, latitude]
//         required: true,
//       },
//     },

//     // 2. NEW: Field to track user upvotes
//     upvotes: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//       },
//     ],
//   },
//   { timestamps: true }
// );

// // 3. CRUCIAL: Add a 2dsphere index for location-based queries
// issueSchema.index({ location: '2dsphere' });

// module.exports = mongoose.model('Issue', issueSchema);
















// const mongoose = require('mongoose');

// const issueSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     description: { type: String },
//     category: { type: String, required: true },
//     imageUrl: { type: String },
//     address: { type: String },
//     status: { type: String, enum: ['Pending', 'In Progress', 'Resolved'], default: 'Pending' },
//     reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    
//     // GeoJSON location field
//     location: {
//       type: {
//         type: String,
//         enum: ['Point'],
//         required: true,
//       },
//       coordinates: {
//         type: [Number], // [longitude, latitude]
//         required: true,
//       },
//     },

//     // Field to link issue to the responsible authority zone
//     assignedToAuthority: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Authority',
//       required: true,
//     },

//     // Field to track user upvotes
//     upvotes: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//       },
//     ],

//     // Field to store the specific report time from the frontend
//     reportedAt: { 
//       type: Date, 
//       default: Date.now 
//     },

//   },
//   // Use Mongoose timestamps for createdAt and updatedAt
//   { timestamps: true } 
// );

// // Add the 2dsphere index for efficient geospatial queries
// issueSchema.index({ location: '2dsphere' });

// module.exports = mongoose.model('Issue', issueSchema);













const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true },
    imageUrl: { type: String },
    address: { type: String },
    status: { type: String, enum: ['Pending', 'In Progress', 'Resolved'], default: 'Pending' },
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    
    // GeoJSON location field
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },

    // Field to link issue to the responsible authority zone
    assignedToAuthority: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Authority',
      required: true,
    },

    // Field to track user upvotes
    upvotes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    // Field to store the specific report time from the frontend
    reportedAt: { 
      type: Date, 
      default: Date.now 
    },

    // ------------------- NEW AI FIELD -------------------
    // This new field will store the AI-generated vector (embedding)
    // for the issue's description.
    // It is an array of numbers.
    // This field is not required, so all your existing documents
    // in the database will remain valid.
    embedding: {
      type: [Number],
    }
    // ----------------- END OF NEW FIELD -----------------

  },
  // Use Mongoose timestamps for createdAt and updatedAt
  { timestamps: true } 
);

// Add the 2dsphere index for efficient geospatial queries
issueSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Issue', issueSchema);

