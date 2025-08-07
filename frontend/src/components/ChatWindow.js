// components/ChatWindow.jsx
import React, { useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

export default function ChatWindow({ messages }) {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-window">
      {messages.length === 0 && (
        <div className="start-message">
          <h2>Welcome Pavan</h2>
          <p>What's up?</p>
        </div>
      )}

      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`msg-row ${msg.role === "user" ? "right" : "left"}`}
        >
          <div className={`msg-bubble ${msg.role === "user" ? "user" : "bot"}`}>
            <ReactMarkdown
              children={msg.content}
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
            />
          </div>
        </div>
      ))}

      <div ref={chatEndRef} />
    </div>
  );
}
