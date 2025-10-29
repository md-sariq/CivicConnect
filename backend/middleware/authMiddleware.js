

// const jwt = require('jsonwebtoken');
// const asyncHandler = require('express-async-handler');
// const User = require('../models/userModel');

// const protect = asyncHandler(async (req, res, next) => {
//   let token;
//   console.log('--- ENTERING protect middleware ---'); // Log entry

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     try {
//       token = req.headers.authorization.split(' ')[1];
//       console.log('Token found:', token ? 'Yes' : 'No');

//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       console.log('Token decoded. User ID:', decoded.id);

//       req.user = await User.findById(decoded.id).select('-password');
      
//       if (!req.user) {
//          console.error('ERROR in protect: User not found for decoded ID.'); // Log user not found
//          res.status(401);
//          throw new Error('Not authorized, user not found');
//       }

//       console.log('SUCCESS in protect: User found and attached to req.user.'); // Log success
//       next(); // Proceed to the next middleware/controller

//     } catch (error) {
//       console.error('ERROR in protect: Token verification failed or user lookup failed.'); // Log any error
//       console.error(error);
//       res.status(401);
//       throw new Error('Not authorized, token failed');
//     }
//   }

//   if (!token) {
//     console.error('ERROR in protect: No token found in headers.'); // Log no token
//     res.status(401);
//     throw new Error('Not authorized, no token');
//   }
// });

// // Middleware to check for Authority Admin role
// const authorityAdmin = (req, res, next) => {
//   if (req.user && req.user.role === 'authorityAdmin') {
//     next();
//   } else {
//     // --- CORRECTED THIS LINE ---
//     res.status(403).json({ message: 'Not authorized. Authority admin access only.' });
//   }
// };


// // Middleware to check for Super Admin role
// const superAdmin = (req, res, next) => {
//   if (req.user && req.user.role === 'superAdmin') {
//     next();
//   } else {
//     res.status(403).json({ message: 'Not authorized. Super admin access only.' });
//   }
// };

// module.exports = { protect, authorityAdmin, superAdmin };

















const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token's ID
      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user) {
         // Keep this error for genuine user not found cases
         console.error('ERROR in protect: User not found for decoded ID.'); 
         res.status(401);
         throw new Error('Not authorized, user not found');
      }

      next(); // Proceed to the next middleware/controller

    } catch (error) {
      // Keep this error for token verification failures
      console.error('ERROR in protect: Token verification failed or user lookup failed.'); 
      console.error(error); // Log the specific JWT error
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    // Keep this error for missing token cases
    console.error('ERROR in protect: No token found in headers.'); 
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// Middleware to check for Authority Admin role
const authorityAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'authorityAdmin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized. Authority admin access only.' });
  }
};


// Middleware to check for Super Admin role
const superAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'superAdmin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized. Super admin access only.' });
  }
};

module.exports = { protect, authorityAdmin, superAdmin };

