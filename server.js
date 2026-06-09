const express = require('express');
const app = express();

// Enable express json payload data body interceptors
app.use(express.json());

const BOT_TOKEN = "8610031632:AAF9NwDwfgEokbz6cvg55jH7vFmL8_tEDvs";

// Root diagnostic verification channel endpoint
app.get('/', (req, res) => {
  res.status(200).send("Aether Lab AI Core Operational Matrix // 24-7 Resilient Node Status: NOMINAL");
});

// Main Live Webhook Stream Endpoint Matrix
app.post(`/webhook/${BOT_TOKEN}`, async (req, res) => {
  // Instantly return HTTP 200 state response loop to clear Telegram queue lines
  res.sendStatus(200);

  const update = req.body;
  if (!update || !update.message || !update.message.text) return;

  const msg = update.message;
  const parsedCleanText = msg.text.trim();
  const lowerText = parsedCleanText.toLowerCase();
  const targetChatId = msg.chat.id;
  let finalResponsePayloadText = "";

  // -------------------------------------------------------------------------
  // PHASE A: DETERMINISTIC STATIC COMMAND CORING RULES
  // -------------------------------------------------------------------------
  if (lowerText.includes('/start') || lowerText.includes('hello') || lowerText.includes('hi') || lowerText.includes('সালাম')) {
    finalResponsePayloadText = `আসসালামু আলাইকুম <b>${msg.from.first_name || 'শিক্ষার্থী'}</b>! ক্যাডেট মিশন AI অটো-বট পোর্টালে আপনাকে স্বাগত।\n\n• ফলাফল চেক করতে টাইপ করুন: <b>result</b>\n• পরীক্ষা ও ক্লাসের রুটিন দেখতে টাইপ করুন: <b>notice</b>\n\n• যেকোনো পড়ালেখার বা সাধারণ জ্ঞানের প্রশ্ন সরাসরি এখানে টাইপ করুন, আমাদের AI সাথে সাথে উত্তর দিয়ে দেবে!`;
  } 
  else if (lowerText.includes('result') || lowerText.includes('রেজাল্ট') || lowerText.includes('মার্কশিট')) {
    finalResponsePayloadText = `<b>ক্যাডেট মিশন পঞ্চম শ্রেণী ফলাফল জেনারেটর:</b>\n\nমডেল পরীক্ষার মেধা তালিকা ও ডিজিটাল মার্কশিট সিস্টেমে আপলোড করা হয়েছে। নিচের লিংকে গিয়ে রোল ইনপুট দিন:\n\n👉 https://aether-lab.web.app/class5.html`;
  } 
  else if (lowerText.includes('notice') || lowerText.includes('নোটিশ') || lowerText.includes('রুটিন')) {
    finalResponsePayloadText = `<b>ক্যাডেট মিশন অফিশিয়াল নোটিশ আপডেট:</b>\n\n• <b>মডেল টেস্ট:</b> আগামী ১৪ই জুন রবিবার থেকে স্কুলভিত্তিক চূড়ান্ত মডেল টেস্ট শুরু হবে।\n• <b>প্রবেশপত্র:</b> ১২ই জুন বৃহস্পতিবারের মধ্যে প্রবেশপত্র সংগ্রহ করতে হবে।\n• <b>ফি:</b> মডেল ফি ৩০০/- টাকা।`;
  } 
  
  // -------------------------------------------------------------------------
  // PHASE B: LIVE CONVERSATIONAL AI CHAT PORT (POLLINATIONS BACKEND PIPELINE)
  // -------------------------------------------------------------------------
  else {
    try {
      const aiPayloadResponse = await fetch('https://text.pollinations.ai/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { 
              role: 'system', 
              content: 'You are the official Aether Lab AI Assistant deployed for Cadet Mission Coaching Center (Class 5 Boys group) in Mymensingh, Bangladesh. You help primary school students understand math (unitary method, fractions, geometry), english grammar (parts of speech, tenses), and general knowledge. Keep answers highly accurate, polite, extremely short, clean, and very easy for a 10-year-old Class 5 student to read. Respond beautifully in Bengali or English based on the language they write to you in.' 
            },
            { role: 'user', content: parsedCleanText }
          ],
          model: 'openai'
        })
      });

      finalResponsePayloadText = await aiPayloadResponse.text();
    } catch (aiError) {
      console.error("Pollinations AI pipeline route error:", aiError);
      finalResponsePayloadText = "দুঃখিত <b>" + (msg.from.first_name || 'শিক্ষার্থী') + "</b>, এই মুহূর্তে আমার এআই কোর নেটওয়ার্ক পোর্টে সাময়িক সমস্যা হচ্ছে। অনুগ্রহ করে কিছুক্ষণ পর আবার প্রশ্ন করুন।";
    }
  }

  // Dispatch final output text block back to the student over Telegram API
  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: targetChatId,
        text: finalResponsePayloadText,
        parse_mode: 'HTML'
      })
    });
  } catch (err) {
    console.error("Outbound relay failed to broadcast:", err);
  }
});

// Start listening execution threads
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server matrix live on execution port: ${PORT}`);
});

// -------------------------------------------------------------------------
// PHASE C: ANTI-SLEEP SELF-PING MATRIX INTERNAL CRON LOOP
// -------------------------------------------------------------------------
// Automatically targets and fetches its own root URL path every 10 minutes (600,000 ms)
// This prevents Render from ever turning the web service node off on the free tier.
setInterval(async () => {
  try {
    const selfPingRequest = await fetch('https://aether-lab.onrender.com/');
    const statusReportText = await selfPingRequest.text();
    console.log(`[SELF-PING MATRIX EXECUTION]: Server pulse sustained. Status: ${selfPingRequest.status}`);
  } catch (e) {
    console.warn("[SELF-PING MATRIX]: Pipeline handshake failed to loop, network busy.");
  }
}, 600000);
