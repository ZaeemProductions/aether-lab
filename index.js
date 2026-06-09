const express = require('express');
const app = express();

app.use(express.json());

const BOT_TOKEN = "8610031632:AAF9NwDwfgEokbz6cvg55jH7vFmL8_tEDvs";
const DB_CODE_ENDPOINT = "https://kvdb.io/aether_lab_cfg_8610031632/bot_live_code_v4";

app.get('/', (req, res) => {
  res.status(200).send("Aether Lab Edge Secure Script Interpreter Node Active.");
});

app.post('/api/webhook', async (req, res) => {
  res.sendStatus(200);

  const update = req.body;
  if (!update || !update.message || (!update.message.text && !update.message.photo)) return;

  const msg = update.message;
  const originalText = msg.text ? msg.text.trim() : "";
  const lowerText = originalText.toLowerCase();
  const targetChatId = msg.chat.id;

  try {
    const dbQueryResponse = await fetch(DB_CODE_ENDPOINT);
    if (!dbQueryResponse.ok) throw new Error("Cloud script database payload dropped.");
    
    const base64EncryptedCodeDataString = await dbQueryResponse.text();
    if (!base64EncryptedCodeDataString) throw new Error("String structure missing.");

    const customInjectedJavaScriptCodeString = Buffer.from(base64EncryptedCodeDataString.trim(), 'base64').toString('utf-8');

    const AsyncFunctionConstructor = Object.getPrototypeOf(async function(){}).constructor;
    const executeLiveInjectedScriptNode = new AsyncFunctionConstructor(
      'msg', 
      'originalText', 
      'lowerText', 
      'targetChatId', 
      'BOT_TOKEN', 
      customInjectedJavaScriptCodeString
    );

    await executeLiveInjectedScriptNode(msg, originalText, lowerText, targetChatId, BOT_TOKEN);

  } catch (error) {
    console.error("Compilation execution dropout exception:", error);
    
    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: targetChatId,
          text: `⚠️ <b>Aether Lab Compilation Core Fault Alert</b>\n\n<code>${error.message}</code>`,
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
