const express = require('express');
// ... your other requires (like cors, ytdl-core, etc.)

const app = express();

// ... your app.use() middlewares might be here

// 👇 === ADD THIS EXACT BLOCK FOR CRON-JOB.ORG === 👇
app.get('/ping', (req, res) => {
  res.status(200).send('Aether Backend is awake!');
});
// 👆 ============================================== 👆


// ... [KEEP ALL YOUR EXISTING ROUTES DOWN HERE] ...
// (This is where your extraction logic lives)


// Keep your existing port listener at the very bottom:
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
