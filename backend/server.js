const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const issueRoutes = require('./routes/issueRoutes');
const superAdminRoutes = require('./routes/superAdminRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: "http://localhost:5173", //local
//   origin: "https://civic-connect-y8dl.vercel.app", // production
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

// health
app.get('/', (req, res) => res.send('CivicConnect API running'));

// error handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
