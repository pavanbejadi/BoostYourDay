const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sqlite3 = require("sqlite3").verbose();
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();
console.log("🔐 Gemini API KEY:", process.env.GEMINI_API_KEY);

const app = express();
app.use(cors());
app.use(express.json());

// SQLite setup
const db = new sqlite3.Database("chat.db");
db.run(
  "CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY, prompt TEXT, reply TEXT)"
);

// Gemini setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Chat endpoint with Gemini
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Log incoming message
    console.log("💬 User message:", message);

    const result = await model.generateContent(message);
    const reply = result.response.text();

    console.log("🤖 Gemini reply:", reply);

    // Save to DB
    db.run("INSERT INTO messages (prompt, reply) VALUES (?, ?)", [
      message,
      reply,
    ]);

    res.json({ reply });
  } catch (err) {
    console.error("🔥 Gemini API Error:");
    console.error(err);

    res.status(500).json({ error: "Error talking to Gemini model" });
  }
});

// Start server
app.listen(5000, () =>
  console.log("✅ Gemini backend running on http://localhost:5000")
);
