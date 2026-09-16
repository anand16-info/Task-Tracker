const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDatabase = require('./config/db');

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Connect to MongoDB.
connectDatabase();

// Middleware.
app.use(cors());
app.use(express.json());

// Health-check route.
app.get('/', (req, res) => {
  res.json({
    message: 'Task Tracker API is running',
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});