const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// 🟢 Status Route (for your taskbar telemetry)
app.get('/ping', (req, res) => res.status(200).json({ status: 'online' }));

// 🔴 Secure Redirector (Ghost Router)
app.get('/api/rip', (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send('Missing URL');
  // Use a reliable, unblocked third-party frontend as the target
  res.redirect(`https://en.savefrom.net/${url}`);
});

app.listen(process.env.PORT || 3000, () => console.log('Aether Node Online'));
