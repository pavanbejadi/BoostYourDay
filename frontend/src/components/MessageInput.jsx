import React, { useState } from "react";

export default function MessageInput({ onSend }) {
  const [input, setInput] = useState("");
  const handleSend = () => {
    if (input.trim()) onSend(input);
    setInput("");
  };
  return (
    <div className="msg-input">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Type your message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}
