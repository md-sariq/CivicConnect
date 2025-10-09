const express = require('express');
const router = express.Router();
const { protect, superAdmin } = require('../middleware/authMiddleware');

// CORRECTED: All controller functions are imported on a single line
const { 
  inviteAuthority, 
  getAuthorities 
} = require('../controllers/superAdminController');

// All routes in this file are protected and require Super Admin role
router.use(protect, superAdmin);

// Define the routes
router.post('/invite-authority', inviteAuthority);
router.get('/authorities', getAuthorities);

module.exports = router;