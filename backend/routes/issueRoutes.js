


// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// // UPDATED: Import 'authorityAdmin' instead of the old 'admin'
// const { protect, authorityAdmin } = require('../middleware/authMiddleware'); 
// const {
//   createIssue,
//   getAllIssues,
//   getIssueById,
//   updateIssueStatus,
//   getNearbyIssues,
//   upvoteIssue,
//   getMyIssues,
// } = require('../controllers/issueController');

// // multer setup (no changes here)
// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename(req, file, cb) {
//     cb(null, `${Date.now()}${path.extname(file.originalname)}`);
//   },
// });
// const upload = multer({ storage });


// // --- Define Routes ---
// router.route('/').post(protect, upload.single('image'), createIssue).get(getAllIssues);

// // IMPORTANT: Specific routes must come BEFORE dynamic routes like /:id
// router.get('/my-issues', protect, getMyIssues);
// router.get('/nearby', protect, getNearbyIssues);

// // Dynamic routes
// router.route('/:id').get(protect, getIssueById);
// // UPDATED: Use the 'authorityAdmin' middleware to protect this route
// router.route('/:id/status').put(protect, authorityAdmin, updateIssueStatus);
// router.route('/:id/upvote').put(protect, upvoteIssue);


// module.exports = router;















// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const { protect, authorityAdmin } = require('../middleware/authMiddleware');
// const {
//   createIssue,
//   getAllIssues,
//   getIssueById,
//   updateIssueStatus,
//   getNearbyIssues,
//   upvoteIssue,
//   getMyIssues,
// } = require('../controllers/issueController');

// // multer setup
// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename(req, file, cb) {
//     cb(null, `${Date.now()}${path.extname(file.originalname)}`);
//   },
// });
// const upload = multer({ storage });

// // --- Define Routes ---
// router.route('/')
//   .post(protect, upload.single('image'), createIssue)
//   .get(protect, getAllIssues); // <-- protect middleware added here

// // Specific routes must come BEFORE dynamic routes like /:id
// router.get('/my-issues', protect, getMyIssues);
// router.get('/nearby', protect, getNearbyIssues);

// // Dynamic routes
// router.route('/:id').get(protect, getIssueById);
// router.route('/:id/status').put(protect, authorityAdmin, updateIssueStatus);
// router.route('/:id/upvote').put(protect, upvoteIssue);

// module.exports = router;

















// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const { protect, authorityAdmin } = require('../middleware/authMiddleware');
// const {
//   createIssue,
//   getAllIssues,
//   getIssueById,
//   updateIssueStatus,
//   getNearbyIssues,
//   upvoteIssue,
//   getMyIssues,
// } = require('../controllers/issueController');

// // multer setup
// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     // --- UPDATED LINE ---
//     // Use path.resolve to get the correct absolute path to 'backend/uploads'
//     // This goes one level up from 'routes' and then into 'uploads'
//     cb(null, path.resolve(__dirname, '..', 'uploads'));
//   },
//   filename(req, file, cb) {
//     cb(null, `${Date.now()}${path.extname(file.originalname)}`);
//   },
// });
// const upload = multer({ storage });

// // --- Define Routes ---
// router.route('/')
//   .post(protect, upload.single('image'), createIssue)
//   .get(protect, getAllIssues); // <-- protect middleware added here

// // Specific routes must come BEFORE dynamic routes like /:id
// router.get('/my-issues', protect, getMyIssues);
// router.get('/nearby', protect, getNearbyIssues);

// // Dynamic routes
// router.route('/:id').get(protect, getIssueById);
// router.route('/:id/status').put(protect, authorityAdmin, updateIssueStatus);
// router.route('/:id/upvote').put(protect, upvoteIssue);

// module.exports = router;













// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const { protect, authorityAdmin } = require('../middleware/authMiddleware');
// const {
//   createIssue,
//   getAllIssues,
//   getIssueById,
//   updateIssueStatus,
//   getNearbyIssues,
//   upvoteIssue,
//   getMyIssues,
// } = require('../controllers/issueController');

// // multer setup
// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     // --- THIS IS THE FIX ---
//     // The original code 'uploads/' saved to 'backend/routes/uploads'.
//     // This new line goes up one directory ('..') from 'routes' 
//     // and correctly saves the file in 'backend/uploads'.
//     cb(null, path.resolve(__dirname, '..', 'uploads'));
//   },
//   filename(req, file, cb) {
//     cb(null, `${Date.now()}${path.extname(file.originalname)}`);
//   },
// });
// const upload = multer({ storage });

// // --- Define Routes ---
// router.route('/')
//   .post(protect, upload.single('image'), createIssue)
//   .get(protect, getAllIssues);

// // Specific routes must come BEFORE dynamic routes like /:id
// router.get('/my-issues', protect, getMyIssues);
// router.get('/nearby', protect, getNearbyIssues);

// // Dynamic routes
// router.route('/:id').get(protect, getIssueById);
// router.route('/:id/status').put(protect, authorityAdmin, updateIssueStatus);
// router.route('/:id/upvote').put(protect, upvoteIssue);

// module.exports = router;














const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
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

// multer setup
const storage = multer.diskStorage({
  destination(req, file, cb) {
    // --- UPDATED LINE ---
    // Changed path.resolve() to path.join(process.cwd(), 'uploads')
    // This perfectly matches the 'express.static' path in your server.js
    // and ensures multer saves to 'backend/uploads'.
    cb(null, path.join(process.cwd(), 'uploads'));
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

// --- Define Routes ---
router.route('/')
  .post(protect, upload.single('image'), createIssue)
  .get(protect, getAllIssues);

// Specific routes must come BEFORE dynamic routes like /:id
router.get('/my-issues', protect, getMyIssues);
router.get('/nearby', protect, getNearbyIssues);

// Dynamic routes
router.route('/:id').get(protect, getIssueById);
router.route('/:id/status').put(protect, authorityAdmin, updateIssueStatus);
router.route('/:id/upvote').put(protect, upvoteIssue);

module.exports = router;
