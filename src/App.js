import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [history, setHistory] = useState([]); // for memory

  const sendMessage = async () => {
    if (!input) return;

    const newUserMsg = { role: "user", parts: [{ text: input }] };
    const newChat = [...chat, { sender: "You", text: input }];

    const res = await axios.post("http://localhost:5000/chat", {
      message: input,
      history,
    });

    const newBotMsg = { role: "model", parts: [{ text: res.data.reply }] };
    setHistory([...history, newUserMsg, newBotMsg]);

    setChat([...newChat, { sender: "Gemini", text: res.data.reply }]);
    setInput("");
  };

  return (
    <div className="chat-container">
      <h2>AI Chatbot (Pavan Edition)</h2>
      <div className="chat-box">
        {chat.map((msg, idx) => (
          <p key={idx}>
            <strong>{msg.sender}:</strong> {msg.text}
          </p>
        ))}
      </div>
      <div className="input-area">
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
