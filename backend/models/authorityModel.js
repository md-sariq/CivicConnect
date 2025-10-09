const mongoose = require('mongoose');

const authoritySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    contactEmail: {
      type: String,
      required: true,
      unique: true,
    },
    // Store the boundary as a GeoJSON Polygon
    jurisdiction: {
      type: {
        type: String,
        enum: ['Polygon'],
        required: true
      },
      coordinates: {
        type: [[[[Number]]]], // Array of arrays of arrays of numbers for Polygon
        required: true
      }
    },
    status: {
      type: String,
      enum: ['Active', 'Pending'],
      default: 'Pending'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Authority', authoritySchema);