const express = require('express');
const cors = require('cors');
const ytdl = require('@distube/ytdl-core');
const app = express();

app.use(cors({ origin: 'https://aether-lab.web.app' }));

app.get('/ping', (req, res) => res.status(200).send('AWAKE'));

app.get('/api/rip', async (req, res) => {
    try {
        const url = req.query.url;
        const info = await ytdl.getInfo(url);
        res.header('Content-Disposition', 'attachment; filename="video.mp4"');
        ytdl(url, { format: 'mp4' }).pipe(res);
    } catch (e) { res.status(500).send(e.message); }
});

app.get('/api/proxy', async (req, res) => {
    try {
        const response = await fetch(req.query.url);
        res.json(await response.json());
    } catch (e) { res.status(500).json({ error: e.message }); }
});

app.listen(process.env.PORT || 3000);
