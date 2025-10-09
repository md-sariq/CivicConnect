// const jwt = require('jsonwebtoken');

// const generateToken = (user) => {
//   return jwt.sign(
//     { id: user._id, role: user.role, name: user.name, email: user.email },
//     process.env.JWT_SECRET,
//     { expiresIn: '7d' }
//   );
// };

// module.exports = generateToken;

const jwt = require('jsonwebtoken');

const generateToken = (id, expiresIn = '30d') => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: expiresIn,
  });
};

module.exports = generateToken;
