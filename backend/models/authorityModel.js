// const mongoose = require('mongoose');

// const authoritySchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     contactEmail: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     // Store the boundary as a GeoJSON Polygon
//     jurisdiction: {
//       type: {
//         type: String,
//         enum: ['Polygon'],
//         required: true
//       },
//       coordinates: {
//         type: [[[[Number]]]], // Array of arrays of arrays of numbers for Polygon
//         required: true
//       }
//     },
//     status: {
//       type: String,
//       enum: ['Active', 'Pending'],
//       default: 'Pending'
//     }
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model('Authority', authoritySchema);











// const mongoose = require('mongoose');

// const zoneSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   jurisdiction: {
//     type: {
//       type: String,
//       enum: ['Polygon'],
//       required: true
//     },
//     coordinates: {
//       type: [[[[Number]]]],
//       required: true
//     }
//   }
// });

// const authoritySchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, unique: true },
//     contactEmail: { type: String, required: true, unique: true },
//     officeAddress: { type: String },
//     primaryContact: {
//       name: { type: String },
//       designation: { type: String },
//       phone: { type: String }
//     },
//     // The main jurisdiction is set by the Super Admin
//     jurisdiction: {
//       type: { type: String, enum: ['Polygon'], required: true },
//       coordinates: { type: [[[[Number]]]], required: true }
//     },
//     // The internal zones are set by the Authority Admin during onboarding
//     zones: [zoneSchema],
//     serviceCategories: [{ type: String }],
//     status: { type: String, enum: ['Active', 'Pending'], default: 'Pending' }
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model('Authority', authoritySchema);













// const mongoose = require('mongoose');

// // Define zoneSchema separately if needed, otherwise define inline or remove if not used yet.
// // For now, assuming zones might be added later by the authority:
// const zoneSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   jurisdiction: {
//     type: {
//       type: String,
//       enum: ['Polygon'],
//       required: true
//     },
//     coordinates: {
//       type: [[[[Number]]]], // Array for polygon rings, array for exterior ring, array for points, array for [lng, lat]
//       required: true
//     }
//   }
// });

// const authoritySchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, unique: true },
//     contactEmail: { type: String, required: true, unique: true },
//     officeAddress: { type: String },
//     primaryContact: { // Nested object structure
//       name: { type: String },
//       designation: { type: String },
//       phone: { type: String }
//     },
//     // The main jurisdiction is set by the Super Admin
//     jurisdiction: {
//       type: {
//         type: String,
//         enum: ['Polygon'],
//         required: true
//       },
//       coordinates: {
//         type: [[[[Number]]]], // Correct structure for Polygon coordinates
//         required: true
//       }
//     },
//     // Optional internal zones defined during onboarding (if used)
//     zones: [zoneSchema],
//     serviceCategories: [{ type: String }],
//     status: { type: String, enum: ['Active', 'Pending'], default: 'Pending' }
//   },
//   { timestamps: true } // Correctly placed timestamps option
// );

// // Add the 2dsphere index for the main jurisdiction field
// authoritySchema.index({ jurisdiction: '2dsphere' });

// module.exports = mongoose.model('Authority', authoritySchema);














// const mongoose = require('mongoose');

// // Define zoneSchema separately if needed, otherwise define inline or remove if not used yet.
// // For now, assuming zones might be added later by the authority:
// const zoneSchema = new mongoose.Schema({ // <-- FIXED: Removed the extra 'new' keyword
//   name: { type: String, required: true },
//   jurisdiction: {
//     type: {
//       type: String,
//       enum: ['Point', 'Polygon'], // <--- ADDED 'Point' HERE
//       required: true
//     },
//     coordinates: {
//       type: [[[[Number]]]], // Array for polygon rings, array for exterior ring, array for points, array for [lng, lat]
//       required: true
//     }
//   }
// });

// const authoritySchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, unique: true },
//     contactEmail: { type: String, required: true, unique: true },
//     officeAddress: { type: String },
//     primaryContact: { // Nested object structure
//       name: { type: String },
//       designation: { type: String },
//       phone: { type: String }
//     },
//     // The main jurisdiction is set by the Super Admin
//     jurisdiction: {
//       type: {
//         type: String,
//         enum: ['Point', 'Polygon'], // <--- CRITICAL FIX: ADDED 'Point'
//         required: true
//       },
//       coordinates: {
//         type: [[[[Number]]]], // Correct structure for Polygon coordinates
//         required: true
//       }
//     },
//     // Optional internal zones defined during onboarding (if used)
//     zones: [zoneSchema],
//     serviceCategories: [{ type: String }],
//     status: { type: String, enum: ['Active', 'Pending'], default: 'Pending' }
//   },
//   { timestamps: true } // Correctly placed timestamps option
// );

// // Add the 2dsphere index for the main jurisdiction field
// authoritySchema.index({ jurisdiction: '2dsphere' });

// module.exports = mongoose.model('Authority', authoritySchema);
















const mongoose = require('mongoose');

// Define zoneSchema separately
const zoneSchema = new mongoose.Schema({ // FIXED: Removed extra 'new'
  name: { type: String, required: true },
  jurisdiction: {
    type: {
      type: String,
      enum: ['Point', 'Polygon'], // Allow Point for queries
      required: true
    },
    coordinates: {
      // --- UPDATED TYPE ---
      type: Array, // Use generic Array type
      // --------------------
      required: true
    }
  }
});

const authoritySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    contactEmail: { type: String, required: true, unique: true },
    officeAddress: { type: String },
    primaryContact: { // Nested object structure
      name: { type: String },
      designation: { type: String },
      phone: { type: String }
    },
    // The main jurisdiction is set by the Super Admin
    jurisdiction: {
      type: {
        type: String,
        enum: ['Point', 'Polygon'], // Allow Point for queries
        required: true
      },
      coordinates: {
        // --- UPDATED TYPE ---
        type: Array, // Use generic Array type
        // --------------------
        required: true
      }
    },
    // Optional internal zones defined during onboarding (if used)
    zones: [zoneSchema],
    serviceCategories: [{ type: String }],
    status: { type: String, enum: ['Active', 'Pending'], default: 'Pending' }
  },
  { timestamps: true } // Correctly placed timestamps option
);

// Add the 2dsphere index for the main jurisdiction field
authoritySchema.index({ jurisdiction: '2dsphere' });

module.exports = mongoose.model('Authority', authoritySchema);



