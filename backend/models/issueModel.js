// const mongoose = require('mongoose');

// const issueSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String },
//   category: { type: String, required: true },
//   imageUrl: { type: String },
//   location: {
//     lat: { type: Number },
//     lng: { type: Number }
//   },
//   address: { type: String },
//   status: { type: String, enum: ['Pending','In Progress','Resolved'], default: 'Pending' },
//   reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
// }, { timestamps: true });

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
    
    // 1. UPDATED: Location stored in GeoJSON format
    location: {
      type: {
        type: String,
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true,
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },

    // 2. NEW: Field to track user upvotes
    upvotes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

// 3. CRUCIAL: Add a 2dsphere index for location-based queries
issueSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Issue', issueSchema);