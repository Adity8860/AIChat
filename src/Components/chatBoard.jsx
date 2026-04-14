import React, { useState, useRef, useEffect } from "react";
import { askAI } from "../Services/puter.js";

const ME = "me";
const BOT = "bot";

const formatTime = (date) =>
  date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
//Push to git
const SendIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const BotAvatar = () => (
  <div
    style={{
      width: 30,
      height: 30,
      borderRadius: "50%",
      background: "#2A3040",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}
  >
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#5B8DEF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <line x1="12" y1="7" x2="12" y2="11" />
      <line x1="8" y1="16" x2="8" y2="16" strokeWidth="3" />
      <line x1="12" y1="16" x2="12" y2="16" strokeWidth="3" />
      <line x1="16" y1="16" x2="16" y2="16" strokeWidth="3" />
    </svg>
  </div>
);

const TypingDots = () => (
  <div style={{ display: "flex", gap: 4 }}>
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#7A8594",
          animation: "bounce 1.2s infinite",
          animationDelay: `${i * 0.2}s`,
        }}
      />
    ))}
    <style>{`
      @keyframes bounce {
        0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
        30% { transform: translateY(-5px); opacity: 1; }
      }
    `}</style>
  </div>
);

const ChatBoard = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: BOT,
      text: "Hey! 👋 How can I help you today?",
      time: new Date(),
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;

    // Add user message
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), role: ME, text, time: new Date() },
    ]);

    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setIsTyping(true);

    try {
      const aiReply = await askAI(text);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: BOT,
          text: aiReply?.trim() || "No response from AI",
          time: new Date(),
        },
      ]);
      console.log("AI REPLY:", aiReply);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: BOT,
          text: "⚠️ Error getting response",
          time: new Date(),
        },
      ]);
    }

    setIsTyping(false);
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: "#F5F6F8",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#1E2228",
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <BotAvatar />
        <div>
          <p style={{ margin: 0, fontWeight: 600, color: "#E8ECF0" }}>
            AI Assistant
          </p>
          <p style={{ margin: 0, fontSize: 12, color: "#7A8594" }}>● Online</p>
        </div>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: "flex",
              flexDirection: msg.role === ME ? "row-reverse" : "row",
              gap: 8,
            }}
          >
            {msg.role === BOT && <BotAvatar />}
            <div>
              <div
                style={{
                  padding: "10px 14px",
                  background: msg.role === ME ? "#5B8DEF" : "#1E2228",
                  color: "#fff",
                  borderRadius: 12,
                  whiteSpace: "pre-wrap", // ✅ IMPORTANT
                  lineHeight: 1.5,
                }}
              >
                {msg.text}
              </div>
              <span style={{ fontSize: 10, color: "#9CA3AF" }}>
                {formatTime(msg.time)}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div style={{ display: "flex", gap: 8 }}>
            <BotAvatar />
            <TypingDots />
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div
        style={{
          padding: 10,
          display: "flex",
          gap: 10,
          background: "#1E2228",
        }}
      >
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          style={{
            flex: 1,
            borderRadius: 8,
            padding: 10,
            background: "#2A3040",
            color: "#fff",
            resize: "none",
          }}
        />

        <button
          onClick={sendMessage}
          disabled={!input.trim() || isTyping}
          style={{
            background: "#5B8DEF",
            border: "none",
            padding: "8px 12px",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default ChatBoard;
