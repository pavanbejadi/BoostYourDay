// App.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";
import "./App.css";

function App() {
  const [chats, setChats] = useState([[]]);
  const [activeChat, setActiveChat] = useState(0);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") !== "light"
  );
  const [persona, setPersona] = useState("You are a helpful assistant.");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleSend = async (content) => {
    const history = [...chats[activeChat], { content, role: "user" }];

    setChats((oldChats) =>
      oldChats.map((chatArr, idx) =>
        idx === activeChat ? [...chatArr, { content, role: "user" }] : chatArr
      )
    );

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, persona, history }),
      });

      if (!res.ok) throw new Error("Failed to get response from server");

      const data = await res.json();
      const aiContent = data.choices?.[0]?.message?.content || "";

      setChats((oldChats) =>
        oldChats.map((chatArr, idx) =>
          idx === activeChat
            ? [...chatArr, { content: aiContent, role: "assistant" }]
            : chatArr
        )
      );
    } catch (err) {
      console.error("Fetch error:", err);
      setChats((oldChats) =>
        oldChats.map((chatArr, idx) =>
          idx === activeChat
            ? [
                ...chatArr,
                { content: "Error: Could not reach AI", role: "assistant" },
              ]
            : chatArr
        )
      );
    }
  };

  const handleNewChat = () => {
    setChats((prev) => [...prev, []]);
    setActiveChat(chats.length);
  };

  const handleSelectChat = (idx) => setActiveChat(idx);

  return (
    <div className="main-layout">
      <Sidebar
        chatList={chats.map((_, i) => ({ id: i }))}
        activeChat={activeChat}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        darkMode={darkMode}
        toggleTheme={() => setDarkMode((prev) => !prev)}
        persona={persona}
        setPersona={setPersona}
      />
      <div className="chat-area">
        <ChatWindow messages={chats[activeChat]} />
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
}

export default App;
