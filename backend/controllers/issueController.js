

// const asyncHandler = require('express-async-handler');
// const Issue = require('../models/issueModel');
// const Authority = require('../models/authorityModel'); // Ensure Authority model is imported

// // @desc    Create a new issue and auto-assign
// // @route   POST /api/issues
// // @access  Private
// const createIssue = asyncHandler(async (req, res) => { // Fixed function name typo
//   const { title, description, category, lat, lng, address, dateTime } = req.body;
//   let imageUrl = req.file ? `/uploads/${req.file.filename}` : null; // Fixed template literal

//   console.log('--- ENTERING createIssue ---');
//   console.log('Received Coordinates - Lat:', lat, 'Lng:', lng); // Fixed typo

//   const longitude = parseFloat(lng);
//   const latitude = parseFloat(lat);

//   if (isNaN(longitude) || isNaN(latitude)) {
//     console.error('ERROR: Invalid latitude or longitude received.');
//     res.status(400);
//     throw new Error('Invalid location coordinates provided.');
//   }

//   const location = { type: 'Point', coordinates: [longitude, latitude] };
//   console.log('Constructed GeoJSON Point for query:', JSON.stringify(location));

//   console.log('Attempting to find authority using $geoIntersects...');
//   const responsibleAuthority = await Authority.findOne({ // Fixed query structure
//     jurisdiction: {
//       $geoIntersects: {
//         $geometry: location,
//       },
//     },
//   });

//   if (!responsibleAuthority) {
//     console.error('ERROR: No authority found containing the location point.');
//     console.log('Query used:', JSON.stringify({ jurisdiction: { $geoIntersects: { $geometry: location } } }));
//     res.status(400);
//     throw new Error('This location is not currently covered by any registered authority.');
//   } else {
//     console.log('SUCCESS: Found responsible authority:', responsibleAuthority.name, 'ID:', responsibleAuthority._id);
//   }

//   const issue = new Issue({
//     title,
//     description,
//     category,
//     imageUrl,
//     address,
//     location,
//     reportedBy: req.user._id, // Fixed typo
//     assignedToAuthority: responsibleAuthority._id, // Fixed typo
//     reportedAt: dateTime ? new Date(dateTime) : new Date(), // Fixed typo
//   });

//   const createdIssue = await issue.save();
//   res.status(201).json(createdIssue);
// }); // Added closing brace

// // @desc    Get all issues (for Super Admin) or filtered issues (for Authority Admin)
// // @route   GET /api/issues
// // @access  Private
// const getAllIssues = asyncHandler(async (req, res) => { // Fixed function name typo
//   console.log('--- ENTERING getAllIssues ---');
//   if (!req.user) {
//     console.error('CRITICAL ERROR: req.user object is MISSING after protect middleware!');
//     res.status(500);
//     throw new Error('User authentication data missing.'); // Fixed typo
//   }

//   console.log('User Role:', req.user.role);
//   console.log('User Authority Field:', req.user.authority);

//   let query = {};
//   if (req.user.role === 'authorityAdmin') {
//     if (!req.user.authority) {
//       console.error(`ERROR: User ${req.user.email} has role 'authorityAdmin' but is missing the 'authority' field linkage!`); // Fixed template literal
//       res.status(500);
//       throw new Error('Authority admin user is not properly linked to an authority.');
//     }
//     query = { assignedToAuthority: req.user.authority }; // Fixed typo
//     console.log('Query set for Authority Admin:', query);
//   } else {
//     console.log('Query set for Super Admin (all issues).');
//   }

//   try {
//     console.log('Attempting Issue.find() with query:', query);
//     const issues = await Issue.find(query)
//       .populate('reportedBy', 'name') // Fixed typo
//       .populate('assignedToAuthority', 'name')
//       .sort({ createdAt: -1 });
//     console.log(`SUCCESS: Found ${issues.length} issues.`); // Fixed template literal
//     res.json(issues);
//   } catch (error) {
//     console.error('❌ DATABASE ERROR during Issue.find():', error); // Fixed typo in emoji/log
//     res.status(500);
//     throw new Error('Failed to retrieve issues from the database.');
//   }
// });

// // @desc    Get issues reported by the logged-in user
// // @route   GET /api/issues/my-issues
// // @access  Private
// const getMyIssues = asyncHandler(async (req, res) => { // Fixed function name typo
//   const issues = await Issue.find({ reportedBy: req.user._id }) // Fixed typo
//     .populate('assignedToAuthority', 'name') // Fixed typo
//     .sort({ createdAt: -1 });
//   res.json(issues);
// });

// // @desc    Get nearby issues based on user location
// // @route   GET /api/issues/nearby
// // @access  Private
// const getNearbyIssues = asyncHandler(async (req, res) => { // Fixed function name typo
//   const { lat, lng } = req.query; // Fixed typo
//   const maxDistance = 5000;
//   if (!lat || !lng) {
//     res.status(400);
//     throw new Error('Latitude and Longitude query parameters are required.'); // Fixed typo
//   }

//   const issues = await Issue.find({ // Fixed query structure
//     location: {
//       $near: {
//         $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] }, // Fixed typo
//         $maxDistance: maxDistance,
//       },
//     },
//   }).populate('assignedToAuthority', 'name');

//   const issuesWithUpvoteStatus = issues.map(issue => ({
//     ...issue.toObject(),
//     isUpvoted: issue.upvotes.includes(req.user._id),
//   }));
//   res.json(issuesWithUpvoteStatus); // Fixed typo
// });

// // @desc    Get single issue by ID
// // @route   GET /api/issues/:id
// // @access  Private
// const getIssueById = asyncHandler(async (req, res) => { // Fixed function name typo
//   const issue = await Issue.findById(req.params.id)
//     .populate('reportedBy', 'name') // Fixed typo
//     .populate('assignedToAuthority', 'name'); // Fixed typo
//   if (issue) {
//     res.json(issue);
//   } else {
//     res.status(404);
//     throw new Error('Issue not found');
//   }
// }); // Added closing brace

// // @desc    Update issue status
// // @route   PUT /api/issues/:id/status
// // @access  Private/AuthorityAdmin
// const updateIssueStatus = asyncHandler(async (req, res) => { // Fixed function name typo
//   const { status } = req.body;
//   const updatedIssue = await Issue.findByIdAndUpdate(
//     req.params.id,
//     { status: status },
//     { new: true, runValidators: true }
//   );
//   if (updatedIssue) {
//     res.json(updatedIssue);
//   } else {
//     res.status(404);
//     throw new Error('Issue not found');
//   }
// });

// // @desc    Upvote or remove upvote for an issue
// // @route   PUT /api/issues/:id/upvote
// // @access  Private
// const upvoteIssue = asyncHandler(async (req, res) => { // Fixed function name typo
//  const issue = await Issue.findById(req.params.id);
//   if (issue) {
//     const alreadyUpvoted = issue.upvotes.includes(req.user._id);
//     if (alreadyUpvoted) {
//       issue.upvotes.pull(req.user._id);
//     } else {
//       issue.upvotes.push(req.user._id);
//     }
//     await issue.save();
//     res.json({
//         upvotes: issue.upvotes,
//         isUpvoted: !alreadyUpvoted, // Fixed typo
//     });
//   } else {
//     res.status(404);
//     throw new Error('Issue not found');
//   }
// }); // Added closing brace

// // Export all controller functions correctly
// module.exports = {
//   createIssue, // Fixed typo
//   getAllIssues, // Fixed typo
//   getMyIssues, // Fixed typo
//   getNearbyIssues, // Fixed typo
//   getIssueById, // Fixed typo
//   updateIssueStatus, // Fixed typo
//   upvoteIssue, // Fixed typo
// };
















const asyncHandler = require('express-async-handler');
const Issue = require('../models/issueModel');
const Authority = require('../models/authorityModel'); // Ensure Authority model is imported

// @desc    Create a new issue and auto-assign
// @route   POST /api/issues
// @access  Private
const createIssue = asyncHandler(async (req, res) => {
  const { title, description, category, lat, lng, address, dateTime } = req.body;
  let imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  const longitude = parseFloat(lng);
  const latitude = parseFloat(lat);

  if (isNaN(longitude) || isNaN(latitude)) {
    // Keep error log for invalid input
    console.error('ERROR: Invalid latitude or longitude received from frontend.');
    res.status(400);
    throw new Error('Invalid location coordinates provided.');
  }

  const location = { type: 'Point', coordinates: [longitude, latitude] };

  // Auto-Assignment Logic
  const responsibleAuthority = await Authority.findOne({
    jurisdiction: {
      $geoIntersects: { $geometry: location }
    }
  });

  if (!responsibleAuthority) {
    // Keep error log for assignment failure
    console.error(`ERROR: No authority found containing the location point: ${JSON.stringify(location)}`);
    res.status(400);
    throw new Error('This location is not currently covered by any registered authority.');
  }

  // Create the new Issue document
  const issue = new Issue({
    title,
    description,
    category,
    imageUrl,
    address,
    location,
    reportedBy: req.user._id,
    assignedToAuthority: responsibleAuthority._id,
    reportedAt: dateTime ? new Date(dateTime) : new Date(),
  });

  const createdIssue = await issue.save();
  res.status(201).json(createdIssue);
});

// @desc    Get all issues (for Super Admin) or filtered issues (for Authority Admin)
// @route   GET /api/issues
// @access  Private
const getAllIssues = asyncHandler(async (req, res) => {
  if (!req.user) {
    // Keep critical error log
    console.error('CRITICAL ERROR: req.user object is MISSING after protect middleware!');
    res.status(500);
    throw new Error('User authentication data missing.');
  }

  let query = {};
  if (req.user.role === 'authorityAdmin') {
    if (!req.user.authority) {
      // Keep specific error log
      console.error(`ERROR: User ${req.user.email} has role 'authorityAdmin' but is missing the 'authority' field linkage!`);
      res.status(500);
      throw new Error('Authority admin user is not properly linked to an authority.');
    }
    query = { assignedToAuthority: req.user.authority };
  }
  // Super Admin gets all issues (query remains {})

  try {
    const issues = await Issue.find(query)
      .populate('reportedBy', 'name')
      .populate('assignedToAuthority', 'name')
      .sort({ createdAt: -1 });
    res.json(issues);
  } catch (error) {
    // Keep database error log
    console.error('❌ DATABASE ERROR during Issue.find():', error);
    res.status(500);
    throw new Error('Failed to retrieve issues from the database.');
  }
});

// @desc    Get issues reported by the logged-in user
// @route   GET /api/issues/my-issues
// @access  Private
const getMyIssues = asyncHandler(async (req, res) => {
  const issues = await Issue.find({ reportedBy: req.user._id })
    .populate('assignedToAuthority', 'name')
    .sort({ createdAt: -1 });
  res.json(issues);
});

// @desc    Get nearby issues based on user location
// @route   GET /api/issues/nearby
// @access  Private
const getNearbyIssues = asyncHandler(async (req, res) => {
  const { lat, lng } = req.query;
  const maxDistance = 5000;

  if (!lat || !lng) {
      res.status(400);
      throw new Error('Latitude and Longitude query parameters are required.');
  }

  const issues = await Issue.find({
    location: {
      $near: {
        $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
        $maxDistance: maxDistance,
      },
    },
  }).populate('assignedToAuthority', 'name');

  const issuesWithUpvoteStatus = issues.map(issue => ({
    ...issue.toObject(),
    isUpvoted: issue.upvotes.includes(req.user._id),
  }));
  res.json(issuesWithUpvoteStatus);
});

// @desc    Get single issue by ID
// @route   GET /api/issues/:id
// @access  Private
const getIssueById = asyncHandler(async (req, res) => {
  const issue = await Issue.findById(req.params.id)
    .populate('reportedBy', 'name')
    .populate('assignedToAuthority', 'name');
  if (issue) {
    res.json(issue);
  } else {
    res.status(404);
    throw new Error('Issue not found');
  }
});

// @desc    Update issue status
// @route   PUT /api/issues/:id/status
// @access  Private/AuthorityAdmin
const updateIssueStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const updatedIssue = await Issue.findByIdAndUpdate(
    req.params.id,
    { status: status },
    { new: true, runValidators: true }
  );
  if (updatedIssue) {
    res.json(updatedIssue);
  } else {
    res.status(404);
    throw new Error('Issue not found');
  }
});

// @desc    Upvote or remove upvote for an issue
// @route   PUT /api/issues/:id/upvote
// @access  Private
const upvoteIssue = asyncHandler(async (req, res) => {
 const issue = await Issue.findById(req.params.id);
  if (issue) {
    const alreadyUpvoted = issue.upvotes.includes(req.user._id);
    if (alreadyUpvoted) {
      issue.upvotes.pull(req.user._id);
    } else {
      issue.upvotes.push(req.user._id);
    }
    await issue.save();
    res.json({
        upvotes: issue.upvotes,
        isUpvoted: !alreadyUpvoted,
    });
  } else {
    res.status(404);
    throw new Error('Issue not found');
  }
});

// Export all controller functions
module.exports = {
  createIssue,
  getAllIssues,
  getMyIssues,
  getNearbyIssues,
  getIssueById,
  updateIssueStatus,
  upvoteIssue,
};