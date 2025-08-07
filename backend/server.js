// server.js
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./database");

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

function cleanAIResponse(text) {
  if (!text) return "";

  // Optional: Remove <think>...</think> if used by some models
  text = text.replace(/<think>[\s\S]*?<\/think>/gi, "");

  // Collapse extra newlines
  text = text.replace(/\n{3,}/g, "\n\n");

  return text.trim();
}

app.post("/api/chat", async (req, res) => {
  const { content, persona, history = [] } = req.body;

  const messages = [
    { role: "system", content: persona || "You are a helpful assistant." },
    ...history,
    { role: "user", content },
  ];

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-oss-20b",
        messages,
        stream: false,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const aiMessage = response.data.choices?.[0]?.message;
    if (aiMessage?.content) {
      aiMessage.content = cleanAIResponse(aiMessage.content);
    }

    res.json(response.data);
  } catch (err) {
    console.error("OpenRouter API error:", err.response?.data || err.message);
    res.status(500).send("API error");
  }
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
