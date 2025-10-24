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











const mongoose = require('mongoose');

const zoneSchema = new mongoose.Schema({
  name: { type: String, required: true },
  jurisdiction: {
    type: {
      type: String,
      enum: ['Polygon'],
      required: true
    },
    coordinates: {
      type: [[[[Number]]]],
      required: true
    }
  }
});

const authoritySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    contactEmail: { type: String, required: true, unique: true },
    officeAddress: { type: String },
    primaryContact: {
      name: { type: String },
      designation: { type: String },
      phone: { type: String }
    },
    // The main jurisdiction is set by the Super Admin
    jurisdiction: {
      type: { type: String, enum: ['Polygon'], required: true },
      coordinates: { type: [[[[Number]]]], required: true }
    },
    // The internal zones are set by the Authority Admin during onboarding
    zones: [zoneSchema],
    serviceCategories: [{ type: String }],
    status: { type: String, enum: ['Active', 'Pending'], default: 'Pending' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Authority', authoritySchema);