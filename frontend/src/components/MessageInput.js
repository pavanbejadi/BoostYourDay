import React, { useState } from "react";

export default function MessageInput({ onSend }) {
  const [input, setInput] = useState("");
  const handleSend = () => {
    if (input.trim()) onSend(input);
    setInput("");
  };

  return (
    <form
      className="msg-input"
      onSubmit={(e) => {
        e.preventDefault();
        handleSend();
      }}
      autoComplete="off"
    >
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message…"
        autoFocus
      />
      <button type="submit" title="Send">
        {/* Send icon */}
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    </form>
  );
}
