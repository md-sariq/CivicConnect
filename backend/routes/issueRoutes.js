// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const { protect, admin } = require('../middleware/authMiddleware');
// const { createIssue, getIssues, updateIssueStatus, getIssueById } = require('../controllers/issueController');

// // multer setup - store in /uploads
// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename(req, file, cb) {
//     cb(null, `${Date.now()}${path.extname(file.originalname)}`);
//   }
// });
// const upload = multer({ storage });

// router.post('/', protect, upload.single('image'), createIssue);
// router.get('/', protect, getIssues);
// router.get('/:id', protect, getIssueById);
// router.put('/:id/status', protect, admin, updateIssueStatus);

// module.exports = router;


const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
// UPDATED: Import 'authorityAdmin' instead of the old 'admin'
const { protect, authorityAdmin } = require('../middleware/authMiddleware'); 
const {
  createIssue,
  getAllIssues,
  getIssueById,
  updateIssueStatus,
  getNearbyIssues,
  upvoteIssue,
  getMyIssues,
} = require('../controllers/issueController');

// multer setup (no changes here)
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });


// --- Define Routes ---
router.route('/').post(protect, upload.single('image'), createIssue).get(getAllIssues);

// IMPORTANT: Specific routes must come BEFORE dynamic routes like /:id
router.get('/my-issues', protect, getMyIssues);
router.get('/nearby', protect, getNearbyIssues);

// Dynamic routes
router.route('/:id').get(protect, getIssueById);
// UPDATED: Use the 'authorityAdmin' middleware to protect this route
router.route('/:id/status').put(protect, authorityAdmin, updateIssueStatus);
router.route('/:id/upvote').put(protect, upvoteIssue);


module.exports = router;
