ath from "path";
import { fileURLToPath } from "url";

const BOT_TOKEN = process.env.BOT_TOKEN; // set this in Railway / env
const TOKEN_MINT = process.env.TOKEN_MINT || "4LxopEqFTyM2tMrDX6bHHtZkaQPctahZri3hwzd8kLnE";
const COMMUNITY = process.env.COMMUNITY_URL || "https://t.me/XX9ME";
const BOT_USERNAME = process.env.BOT_USERNAME || "@X9SCANBOT";
const PORT = process.env.PORT || 3000;

if (!BOT_TOKEN) {
  console.warn("⚠️ Warning: BOT_TOKEN is not set. Set the BOT_TOKEN environment variable before running.");
}

const bot = new Bot(BOT_TOKEN);

// express setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Simple API endpoints for the Mini App
app.get("/api/saldo", (req, res) => {
  // placeholder: replace with real blockchain queries
  res.json({ saldo: 1234 });
});

app.get("/api/preco", (req, res) => {
  res.json({ preco: 0.12, sol: 0.00045 });
});

app.get("/api/top10", (req, res) => {
  res.json([
    { user: "3Khx...a8Z", x9: 10500 },
    { user: "9Bxs...8fK", x9: 8900 },
    { user: "FhhT...23a", x9: 6500 }
  ]);
});

// Serve Mini App
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Telegram bot: sends a message with a web_app button to open the Mini App
bot.command("start", async (ctx) => {
  const url = process.env.APP_URL || (ctx.getChat ? (ctx.getChat().then(c=>null)) : null) || `https://YOUR_RAILWAY_URL`;
  await ctx.reply("👋 Abra o X9 Mini App:", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "🚀 Abrir Mini App", web_app: { url: url } }],
        [{ text: "💬 Comunidade", url: COMMUNITY }],
        [{ text: "ℹ️ Sobre X9", callback_data: "sobre" }]
      ]
    }
  });
});

bot.on("callback_query:data", async (ctx) => {
  const data = ctx.callbackQuery.data;
  if (data === "sobre") {
    await ctx.answerCallbackQuery();
    await ctx.editMessageText(
      "💎 X9 - Ecossistema e comunidade\n" +
      "- Projeto: x9 mini app\n" +
      "- Bot: " + BOT_USERNAME + "\n" +
      "- Token: Solana SPL (TOKEN_MINT)\n\n" +
      "Visite a comunidade: " + COMMUNITY
    );
  }
});

bot.start();
app.listen(PORT, () => console.log(`✅ X9 Mini App running on port ${PORT}`));
