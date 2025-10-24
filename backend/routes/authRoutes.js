// const express = require('express');
// const router = express.Router();
// const { sendOtp, verifyOtpAndLogin } = require('../controllers/authController');

// router.post('/send-otp', sendOtp);
// router.post('/verify-otp', verifyOtpAndLogin);

// module.exports = router;




const express = require('express');
const router = express.Router();
const { 
  sendLoginOtp, 
  sendRegisterOtp, 
  verifyOtpAndLogin 
} = require('../controllers/authController');

router.post('/send-login-otp', sendLoginOtp);
router.post('/send-register-otp', sendRegisterOtp);
router.post('/verify-otp', verifyOtpAndLogin);

module.exports = router;