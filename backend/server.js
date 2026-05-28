const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// 👇 The keep-alive route for cron-job.org 👇
app.get('/ping', (req, res) => {
  res.status(200).send('Pong! Aether Backend is awake.');
});

// A placeholder for your Extraction Matrix
app.get('/api/rip', (req, res) => {
  res.status(500).send('Extraction Matrix Failed');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
