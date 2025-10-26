// const express = require('express');
// const path = require('path');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const connectDB = require('./config/db');
// const userRoutes = require('./routes/userRoutes');
// const issueRoutes = require('./routes/issueRoutes');
// const superAdminRoutes = require('./routes/superAdminRoutes');
// const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// dotenv.config();
// connectDB();

// const app = express();
// app.use(cors({
//   origin: "http://localhost:5173", //local
// //   origin: "https://civic-connect-y8dl.vercel.app", // production
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true
// }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // serve uploads folder
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// // routes
// app.use('/api/users', userRoutes);
// app.use('/api/issues', issueRoutes);
// app.use('/api/superadmin', superAdminRoutes);

// // health
// app.get('/', (req, res) => res.send('CivicConnect API running'));

// // error handlers
// app.use(notFound);
// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));






// const express = require('express');
// const path = require('path');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const connectDB = require('./config/db');
// const userRoutes = require('./routes/userRoutes');
// const issueRoutes = require('./routes/issueRoutes');
// const superAdminRoutes = require('./routes/superAdminRoutes');
// const authRoutes = require('./routes/authRoutes'); // <-- NEW IMPORT
// const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// dotenv.config();
// connectDB();

// const app = express();
// app.use(cors({
//   origin: "http://localhost:5173", //local
// //   origin: "https://civic-connect-y8dl.vercel.app", // production
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true
// }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // serve uploads folder
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// // routes
// app.use('/api/users', userRoutes);
// app.use('/api/issues', issueRoutes);
// app.use('/api/superadmin', superAdminRoutes);
// app.use('/api/auth', authRoutes); // <-- NEW ROUTE USED

// // health
// app.get('/', (req, res) => res.send('CivicConnect API running'));

// // error handlers
// app.use(notFound);
// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));











// const express = require('express');
// const path = require('path');
// const dotenv = require('dotenv');
// const cors = require('cors');

// // MOVED TO THE TOP: Load environment variables immediately
// dotenv.config();

// const connectDB = require('./config/db');
// const userRoutes = require('./routes/userRoutes');
// const issueRoutes = require('./routes/issueRoutes');
// const superAdminRoutes = require('./routes/superAdminRoutes');
// const authRoutes = require('./routes/authRoutes');
// const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// // Connect to DB after loading env variables
// connectDB();

// const app = express();

// // --- UPDATED CORS CONFIGURATION ---
// // Define the list of allowed domains (origins)
// const allowedOrigins = [
//   "http://localhost:5173", // Your local development frontend
//   "https://civic-connect-y8dl.vercel.app" // Your production frontend
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     // Check if the incoming request's origin is in our allowed list
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//       // If it is (or if it's a request with no origin like from a mobile app), allow it.
//       callback(null, true);
//     } else {
//       // Otherwise, block it with a CORS error
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true
// }));
// // --- END OF UPDATED CORS CONFIGS ---

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // serve uploads folder
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// // routes
// app.use('/api/users', userRoutes);
// app.use('/api/issues', issueRoutes);
// app.use('/api/superadmin', superAdminRoutes);
// app.use('/api/auth', authRoutes);

// // health
// app.get('/', (req, res) => res.send('CivicConnect API running'));

// // error handlers
// app.use(notFound);
// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));







const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');

// MOVED TO THE TOP: Load environment variables immediately
dotenv.config();

const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const issueRoutes = require('./routes/issueRoutes');
const superAdminRoutes = require('./routes/superAdminRoutes');
const authRoutes = require('./routes/authRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Connect to DB after loading env variables
connectDB();

const app = express();

app.use(cors({
  // origin: "http://localhost:5173", //local
  origin: "https://civic-connect-y8dl.vercel.app", // production
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve uploads folder
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// routes
app.use('/api/users', userRoutes);
app.use('/api/issues', issueRoutes);
app.use('/api/superadmin', superAdminRoutes);
app.use('/api/auth', authRoutes);

// health
app.get('/', (req, res) => res.send('CivicConnect API running'));

// error handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
