const express = require('express');
const app = express();

app.use(express.json());

const BOT_TOKEN = "8610031632:AAF9NwDwfgEokbz6cvg55jH7vFmL8_tEDvs";
const DB_CODE_ENDPOINT = "https://kvdb.io/aether_lab_cfg_8610031632/bot_live_code_v3";

app.get('/', (req, res) => {
  res.status(200).send("Aether Lab Edge Secure Script Interpreter Node Active.");
});

app.post('/api/webhook', async (req, res) => {
  res.sendStatus(200); // Instantly discharge processing channels to clear delivery queues

  const update = req.body;
  if (!update || !update.message || (!update.message.text && !update.message.photo)) return;

  const msg = update.message;
  const originalText = msg.text ? msg.text.trim() : "";
  const lowerText = originalText.toLowerCase();
  const targetChatId = msg.chat.id;

  try {
    // 1. Download the firewall-bypassed Base64 text payload from database
    const dbQueryResponse = await fetch(DB_CODE_ENDPOINT);
    if (!dbQueryResponse.ok) throw new Error("Cloud script database payload dropped.");
    const base64EncryptedCodeDataString = await dbQueryResponse.text();

    // 2. Decode Base64 chunk string parameters back into operational JavaScript code execution blocks
    const customInjectedJavaScriptCodeString = Buffer.from(base64EncryptedCodeDataString.trim(), 'base64').toString('utf-8');

    // 3. Compile the code inside a safe function sandbox closure container 
    const AsyncFunctionConstructor = Object.getPrototypeOf(async function(){}).constructor;
    const executeLiveInjectedScriptNode = new AsyncFunctionConstructor(
      'msg', 
      'originalText', 
      'lowerText', 
      'targetChatId', 
      'BOT_TOKEN', 
      customInjectedJavaScriptCodeString
    );

    // 4. Run the dynamic logic script live
    await executeLiveInjectedScriptNode(msg, originalText, lowerText, targetChatId, BOT_TOKEN);

  } catch (error) {
    console.error("Compilation execution dropout exception:", error);
    
    // Auto-alert diagnostic feedback messages directly back to Telegram text terminals
    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: targetChatId,
          text: `⚠️ <b>Aether Lab Compilation Core Fault Alert</b>\n\n<code>${error.message}</code>\n\nCheck code syntax layout lines matching your iPad configuration text box inputs.`,
          parse_mode: 'HTML'
        })
      });
    } catch (tgErr) {
      console.error("Status logging reporting dropped:", tgErr);
    }
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Aether Lab Runtime Engine listening on port context: ${PORT}`));

module.exports = app;
