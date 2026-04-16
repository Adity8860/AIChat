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
      borderRadius: 10,
      background: "#2E3A52",
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
      stroke="#7B9FD4"
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
  <div
    style={{
      background: "rgb(28, 35, 51)",
      borderRadius: 12,
      borderBottomLeftRadius: 4,
      padding: "12px 16px",
      display: "flex",
      gap: 5,
      alignItems: "center",
    }}
  >
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#5A6880",
          animation: "bounce 1.3s infinite",
          animationDelay: `${i * 0.18}s`,
        }}
      />
    ))}
    <style>{`
      @keyframes bounce {
        0%, 60%, 100% { transform: translateY(0); opacity: 0.35; }
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
      text: "Hey! How can I help you today?",
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

  const handleInput = (e) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: "#F0EDE8",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "rgb(28, 35, 51)",
          padding: "14px 18px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexShrink: 0,
        }}
      >
        <BotAvatar />
        <div>
          <p
            style={{
              margin: 0,
              fontWeight: 600,
              color: "#E8E4DC",
              fontSize: 14,
              letterSpacing: "0.01em",
            }}
          >
            AI Assistant
          </p>
          <p
            style={{
              margin: 0,
              fontSize: 11,
              color: "#6B7A91",
              display: "flex",
              alignItems: "center",
              gap: 5,
              marginTop: 2,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#4CAF7D",
                display: "inline-block",
              }}
            />
            Online
          </p>
        </div>

        {/* Header action buttons */}
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          {/* Search */}
          <button
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              background: "#2E3A52",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#8A97AE",
            }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
          {/* More */}
          <button
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              background: "#2E3A52",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#8A97AE",
            }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="5" r="1.5" fill="currentColor" />
              <circle cx="12" cy="12" r="1.5" fill="currentColor" />
              <circle cx="12" cy="19" r="1.5" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "18px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {/* Date divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 11,
            color: "#9E9890",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          <span style={{ flex: 1, height: 1, background: "#D8D4CE" }} />
          Today
          <span style={{ flex: 1, height: 1, background: "#D8D4CE" }} />
        </div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: "flex",
              flexDirection: msg.role === ME ? "row-reverse" : "row",
              gap: 10,
              alignItems: "flex-end",
            }}
          >
            {msg.role === BOT && <BotAvatar />}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "72%",
                alignItems: msg.role === ME ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  padding: "10px 14px",
                  background: msg.role === ME ? "#C8623A" : "rgb(28, 35, 51)",
                  color: msg.role === ME ? "#FAF5EE" : "#DDD9D2",
                  borderRadius: 12,
                  borderBottomRightRadius: msg.role === ME ? 4 : 12,
                  borderBottomLeftRadius: msg.role === BOT ? 4 : 12,
                  whiteSpace: "pre-wrap",
                  lineHeight: 1.55,
                  fontSize: 13.5,
                }}
              >
                {msg.text}
              </div>
              <span
                style={{
                  fontSize: 10,
                  color: "#A09890",
                  marginTop: 4,
                  padding: "0 2px",
                }}
              >
                {formatTime(msg.time)}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
            <BotAvatar />
            <TypingDots />
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div
        style={{
          background: "rgb(28, 35, 51)",
          padding: "12px 14px",
          display: "flex",
          gap: 10,
          alignItems: "flex-end",
          flexShrink: 0,
        }}
      >
        {/* Input wrap */}
        <div
          style={{
            flex: 1,
            background: "#2E3A52",
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            padding: "0 12px",
            gap: 8,
          }}
        >
          {/* Attach icon */}
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#5A6880",
              display: "flex",
              alignItems: "center",
              padding: "2px",
              flexShrink: 0,
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
            </svg>
          </button>

          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            rows={1}
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              resize: "none",
              color: "#DDD9D2",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13.5,
              padding: "10px 0",
              lineHeight: 1.5,
              maxHeight: 120,
              overflowY: "auto",
            }}
          />
        </div>

        {/* Send button */}
        <button
          onClick={sendMessage}
          disabled={!input.trim() || isTyping}
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            background: !input.trim() || isTyping ? "#3A485F" : "#C8623A",
            border: "none",
            cursor: !input.trim() || isTyping ? "default" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: !input.trim() || isTyping ? "#5A6880" : "#FAF5EE",
            flexShrink: 0,
            transition: "background 0.15s",
          }}
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default ChatBoard;
