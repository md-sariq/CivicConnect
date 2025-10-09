// const asyncHandler = require('express-async-handler');
// const Issue = require('../models/issueModel');

// // Create issue
// const createIssue = asyncHandler(async (req, res) => {
//   const { title, description, category, lat, lng, address } = req.body;
//   // image - multer stores file at req.file if provided
//   let imageUrl = null;
//   if (req.file) {
//     imageUrl = `/uploads/${req.file.filename}`;
//   } else if (req.body.imageUrl) {
//     imageUrl = req.body.imageUrl;
//   }

//   const issue = new Issue({
//     title,
//     description,
//     category,
//     imageUrl,
//     location: lat && lng ? { lat: +lat, lng: +lng } : undefined,
//     address,
//     reportedBy: req.user._id
//   });

//   const created = await issue.save();
//   res.status(201).json(created);
// });

// // Get all issues (admin) or user's own issues if query by mine
// const getIssues = asyncHandler(async (req, res) => {
//   const { mine } = req.query;
//   let issues;
//   if (mine === 'true') {
//     issues = await Issue.find({ reportedBy: req.user._id }).populate('reportedBy', 'name email');
//   } else {
//     // admin or public list
//     issues = await Issue.find().populate('reportedBy', 'name email').sort({ createdAt: -1 });
//   }
//   res.json(issues);
// });

// // Update status (admin)
// const updateIssueStatus = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;
//   const issue = await Issue.findById(id);
//   if (!issue) {
//     res.status(404);
//     throw new Error('Issue not found');
//   }
//   issue.status = status || issue.status;
//   const updated = await issue.save();
//   res.json(updated);
// });

// // Get single issue
// const getIssueById = asyncHandler(async (req, res) => {
//   const issue = await Issue.findById(req.params.id).populate('reportedBy', 'name email');
//   if (!issue) {
//     res.status(404);
//     throw new Error('Issue not found');
//   }
//   res.json(issue);
// });

// module.exports = { createIssue, getIssues, updateIssueStatus, getIssueById };



const asyncHandler = require('express-async-handler');
const Issue = require('../models/issueModel');

// @desc    Create a new issue
// @route   POST /api/issues
// @access  Private
const createIssue = asyncHandler(async (req, res) => {
  const { title, description, category, lat, lng, address } = req.body;
  let imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  const location = {
    type: 'Point',
    coordinates: [parseFloat(lng), parseFloat(lat)], // [longitude, latitude]
  };

  const issue = new Issue({
    title,
    description,
    category,
    imageUrl,
    address,
    location,
    reportedBy: req.user._id,
  });

  const createdIssue = await issue.save();
  res.status(201).json(createdIssue);
});

// @desc    Get all public issues
// @route   GET /api/issues
// @access  Public/Private
const getAllIssues = asyncHandler(async (req, res) => {
  const issues = await Issue.find({}).populate('reportedBy', 'name').sort({ createdAt: -1 });
  res.json(issues);
});

// @desc    Get issues for the logged-in user
// @route   GET /api/issues/my-issues
// @access  Private
const getMyIssues = asyncHandler(async (req, res) => {
  const issues = await Issue.find({ reportedBy: req.user._id }).sort({ createdAt: -1 });
  res.json(issues);
});

// @desc    Get nearby issues based on user location
// @route   GET /api/issues/nearby
// @access  Private
const getNearbyIssues = asyncHandler(async (req, res) => {
  const { lat, lng } = req.query;
  const maxDistance = 5000; // 5 kilometers

  const issues = await Issue.find({
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [parseFloat(lng), parseFloat(lat)],
        },
        $maxDistance: maxDistance,
      },
    },
  });
  
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
  const issue = await Issue.findById(req.params.id).populate('reportedBy', 'name');
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
/* const updateIssueStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const issue = await Issue.findById(req.params.id);

  if (issue) {
    issue.status = status;
    const updatedIssue = await issue.save();
    res.json(updatedIssue);
  } else {
    res.status(404);
    throw new Error('Issue not found');
  }
});  */


// In backend/controllers/issueController.js

// @desc    Update issue status
// @route   PUT /api/issues/:id/status
// @access  Private/AuthorityAdmin
const updateIssueStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  // Use findByIdAndUpdate for a direct, atomic update
  const updatedIssue = await Issue.findByIdAndUpdate(
    req.params.id, 
    { status: status }, 
    { 
      new: true, // This option returns the document after the update has been applied
      runValidators: true // This ensures the new status respects the schema's enum
    }
  );

  if (updatedIssue) {
    res.json(updatedIssue);
  } else {
    res.status(404);
    throw new Error('Issue not found');
  }
});


// In backend/controllers/issueController.js

// @desc    Update issue status
// @route   PUT /api/issues/:id/status
// @access  Private/AuthorityAdmin
// const updateIssueStatus = asyncHandler(async (req, res) => {
//   // --- Start Debugging Logs ---
//   console.log('--- TRIGGERED: updateIssueStatus Controller ---');
//   console.log('Request received for Issue ID:', req.params.id);
//   console.log('New Status from request body:', req.body.status);
//   console.log('User performing action:', { id: req.user._id, role: req.user.role });
//   // --- End Debugging Logs ---

//   const { status } = req.body;
//   const issue = await Issue.findById(req.params.id);

//   if (issue) {
//     console.log('SUCCESS: Issue found in database.');
//     issue.status = status;
//     const updatedIssue = await issue.save();
//     console.log('SUCCESS: New status saved to database.');
//     res.json(updatedIssue);
//   } else {
//     console.log('ERROR: Issue not found in database with that ID.');
//     res.status(404);
//     throw new Error('Issue not found');
//   }
// });

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

module.exports = {
  createIssue,
  getAllIssues,
  getMyIssues,
  getNearbyIssues,
  getIssueById,
  updateIssueStatus,
  upvoteIssue,
};