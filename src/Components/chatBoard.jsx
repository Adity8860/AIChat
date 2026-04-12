import React, { useState, useRef, useEffect } from "react";
import { askAI } from "../Services/puter.js";

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

  // Call Puter AI
  const aiReply = await askAI(text);

  setIsTyping(false);
  setMessages((prev) => [
    ...prev,
    { id: Date.now() + 1, role: BOT, text: aiReply, time: new Date() },
  ]);

  textareaRef.current?.focus();
};

const ME = "me";
const BOT = "bot";

const BOT_REPLIES = [
  "Got it! Anything else you'd like to discuss?",
  "That's interesting — tell me more.",
  "Sure, I'm here to help.",
  "Makes sense. What would you like to do next?",
  "I understand. Let me know how I can assist.",
  "Good point! Let's explore that further.",
];

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
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 4,
      padding: "3px 2px",
    }}
  >
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

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), role: ME, text, time: new Date() },
    ]);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setIsTyping(true);

    setTimeout(
      () => {
        const reply =
          BOT_REPLIES[Math.floor(Math.random() * BOT_REPLIES.length)];
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, role: BOT, text: reply, time: new Date() },
        ]);
      },
      900 + Math.random() * 700,
    );

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
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#1E2228",
          borderBottom: "1px solid #2C3340",
          padding: "14px 20px",
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
              fontSize: 14,
              color: "#E8ECF0",
            }}
          >
            AI Assistant
          </p>
          <p
            style={{
              margin: 0,
              fontSize: 12,
              color: "#7A8594",
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#4ADE80",
                display: "inline-block",
              }}
            />
            Online
          </p>
        </div>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: "flex",
              flexDirection: msg.role === ME ? "row-reverse" : "row",
              alignItems: "flex-end",
              gap: 8,
            }}
          >
            {msg.role === BOT && <BotAvatar />}
            <div
              style={{
                maxWidth: "70%",
                display: "flex",
                flexDirection: "column",
                gap: 4,
                alignItems: msg.role === ME ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  padding: "10px 14px",
                  background: msg.role === ME ? "#5B8DEF" : "#1E2228",
                  color: msg.role === ME ? "#fff" : "#E8ECF0",
                  borderRadius:
                    msg.role === ME
                      ? "16px 16px 4px 16px"
                      : "16px 16px 16px 4px",
                  fontSize: 13.5,
                  lineHeight: 1.6,
                  border: msg.role === BOT ? "1px solid #2C3340" : "none",
                  wordBreak: "break-word",
                }}
              >
                {msg.text}
              </div>
              <span
                style={{
                  fontSize: 11,
                  color: "#9CA3AF",
                  paddingLeft: 4,
                  paddingRight: 4,
                }}
              >
                {formatTime(msg.time)}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
            <BotAvatar />
            <div
              style={{
                padding: "10px 14px",
                background: "#1E2228",
                border: "1px solid #2C3340",
                borderRadius: "16px 16px 16px 4px",
              }}
            >
              <TypingDots />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div
        style={{
          background: "#1E2228",
          borderTop: "1px solid #2C3340",
          padding: "12px 16px",
          display: "flex",
          alignItems: "flex-end",
          gap: 10,
          flexShrink: 0,
        }}
      >
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
          }}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          rows={1}
          style={{
            flex: 1,
            resize: "none",
            border: "1px solid #2C3340",
            borderRadius: 10,
            padding: "10px 14px",
            fontSize: 13.5,
            color: "#E8ECF0",
            background: "#2A3040",
            outline: "none",
            fontFamily: "inherit",
            lineHeight: 1.5,
            overflow: "hidden",
            transition: "border-color 0.15s",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#5B8DEF")}
          onBlur={(e) => (e.target.style.borderColor = "#2C3340")}
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim()}
          style={{
            width: 38,
            height: 38,
            borderRadius: 9,
            border: "none",
            background: input.trim() ? "#5B8DEF" : "#2A3040",
            color: input.trim() ? "#fff" : "#7A8594",
            cursor: input.trim() ? "pointer" : "not-allowed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "background 0.15s, color 0.15s",
          }}
          aria-label="Send"
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default ChatBoard;
