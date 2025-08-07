import React from "react";

const personas = {
  default: "You are a helpful assistant.",
  coach: "You are a motivational coach who speaks with energy and clarity.",
  friend: "You are a casual, friendly companion who keeps things light.",
  teacher: "You are a patient teacher who explains things step by step.",
};

export default function Sidebar({
  chatList,
  activeChat,
  onNewChat,
  onSelectChat,
  darkMode,
  toggleTheme,
  persona,
  setPersona,
}) {
  return (
    <div className="sidebar">
      <h2>Chats</h2>
      <button className="new-chat-btn" onClick={onNewChat}>
        + New Chat
      </button>

      <div className="chat-list">
        {chatList.map((chat, i) => (
          <div
            key={chat.id}
            className={`chat-list-item${activeChat === i ? " active" : ""}`}
            onClick={() => onSelectChat(i)}
          >
            Chat {i + 1}
          </div>
        ))}
      </div>

      {/* Persona Selector */}
      <select
        value={persona}
        onChange={(e) => setPersona(e.target.value)}
        style={{
          marginTop: "12px",
          background: "#292c35",
          color: "#fff",
          borderRadius: "14px",
          padding: "8px",
          border: "1px solid #444860",
          fontSize: "0.95rem",
        }}
      >
        {Object.entries(personas).map(([key, value]) => (
          <option key={key} value={value}>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </option>
        ))}
      </select>

      {/* Theme Toggle */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <button
          className="theme-toggle-btn"
          onClick={toggleTheme}
          style={{
            marginTop: "auto",
            marginBottom: "58px", // Increased from 12px to 32px for better visibility
            background: "transparent",
            color: "#84b9f7",
            border: "1px solid #84b9f7",
            borderRadius: "20px",
            padding: "8px",
            cursor: "pointer",
            alignSelf: "center",
          }}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
    </div>
  );
}
