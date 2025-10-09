const express = require('express');
const router = express.Router();
const { registerUser, authUser, completeAuthorityRegistration } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/complete-authority-registration', completeAuthorityRegistration);

module.exports = router;