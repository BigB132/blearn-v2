const express = require("express");
const mongoose = require('mongoose')
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();
const rateLimit = require("express-rate-limit");

const website = require('./src/routes/website')
const authRoutes = require('./src/routes/auth');
const dataRoutes = require('./src/routes/data');
const adRoutes = require('./src/routes/ads');

const app = express();

mongoose.connect(process.env.uri).then(() => {
  console.log("Connected to MongoDB (Mongoose)");
}).catch((err) => {
  console.error("Connection error:", err);
});

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // limit each IP to 100 requests per minute
  message: "Too many requests, please try again later.",
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(limiter);
app.set('trust proxy', 1);

// Routes
app.use('', website)
app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/ads', adRoutes);





app.listen(process.env.port, () => {
  console.log(`Server is running on Port ${process.env.port}`);
});