import React, { useState } from "react";
import ChatBoard from "./chatBoard";

const COLORS = {
  sidebar: "#1E2228",
  sidebarHover: "#2A3040",
  accent: "#5B8DEF",
  accentText: "#fff",
  chatBg: "#F5F6F8",
  text: "#E8ECF0",
  muted: "#7A8594",
  divider: "#2C3340",
  deleteHover: "#E05C5C",
  mainBg: "#F5F6F8",
  mainText: "#1E2228",
  mainMuted: "#6B7280",
  buttonBg: "#5B8DEF",
  buttonHover: "#4A7ADE",
};

const ChatIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const PlusIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const TrashIcon = () => (
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
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6M14 11v6" />
  </svg>
);

const SettingsIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const BotIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke={COLORS.accent}
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
);

const LargeBotIcon = () => (
  <svg
    width="52"
    height="52"
    viewBox="0 0 24 24"
    fill="none"
    stroke={COLORS.accent}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <line x1="12" y1="7" x2="12" y2="11" />
    <line x1="8" y1="16" x2="8" y2="16" strokeWidth="2.5" />
    <line x1="12" y1="16" x2="12" y2="16" strokeWidth="2.5" />
    <line x1="16" y1="16" x2="16" y2="16" strokeWidth="2.5" />
  </svg>
);

const Sidepanel = () => {
  const [open, setOpen] = useState(true);
  const [chats, setChats] = useState([]);
  const [hoveredChat, setHoveredChat] = useState(null);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
        background: COLORS.mainBg,
      }}
    >
      {/* Sidebar */}
      {open && (
        <div
          style={{
            width: 300,
            background: COLORS.sidebar,
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
            borderRight: `1px solid ${COLORS.divider}`,
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "18px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: `1px solid ${COLORS.divider}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <BotIcon />
              <span
                style={{
                  color: COLORS.text,
                  fontWeight: 600,
                  fontSize: 15,
                  letterSpacing: "-0.2px",
                }}
              >
                AI Chat
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: COLORS.muted,
                fontSize: 18,
                lineHeight: 1,
                padding: "2px 6px",
                borderRadius: 4,
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.text)}
              onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.muted)}
              aria-label="close sidebar"
            >
              ×
            </button>
          </div>

          {/* New Chat */}
          <div style={{ padding: "14px 12px 10px" }}>
            <button
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 7,
                padding: "9px 0",
                background: COLORS.accent,
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 13.5,
                cursor: "pointer",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = COLORS.buttonHover)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = COLORS.accent)
              }
            >
              <PlusIcon /> New Chat
            </button>
          </div>

          {/* Divider label */}
          <div style={{ padding: "4px 16px 6px" }}>
            <span
              style={{
                fontSize: 10.5,
                color: COLORS.muted,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontWeight: 600,
              }}
            >
              Recent
            </span>
          </div>

          {/* Chat List */}
          <div style={{ flex: 1, overflowY: "auto", padding: "0 8px" }}>
            {chats.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "32px 0",
                  color: COLORS.muted,
                  fontSize: 13,
                }}
              >
                No chats yet
              </div>
            ) : (
              chats.map((chat) => (
                <div
                  key={chat.id}
                  onMouseEnter={() => setHoveredChat(chat.id)}
                  onMouseLeave={() => setHoveredChat(null)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 10px",
                    borderRadius: 7,
                    marginBottom: 2,
                    cursor: "pointer",
                    background:
                      hoveredChat === chat.id
                        ? COLORS.sidebarHover
                        : "transparent",
                    transition: "background 0.12s",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      overflow: "hidden",
                    }}
                  >
                    <span style={{ color: COLORS.muted, flexShrink: 0 }}>
                      <ChatIcon />
                    </span>
                    <span
                      style={{
                        fontSize: 13.5,
                        color: COLORS.text,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {chat.title}
                    </span>
                  </div>
                  <button
                    onClick={(e) => handleDeleteChat(e, chat.id)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: COLORS.muted,
                      padding: "2px 4px",
                      borderRadius: 4,
                      flexShrink: 0,
                      opacity: hoveredChat === chat.id ? 1 : 0,
                      transition: "opacity 0.12s, color 0.12s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = COLORS.deleteHover)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = COLORS.muted)
                    }
                    aria-label="delete chat"
                  >
                    <TrashIcon />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Settings */}
          <div
            style={{
              padding: "10px 8px 16px",
              borderTop: `1px solid ${COLORS.divider}`,
            }}
          >
            <button
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 9,
                padding: "8px 10px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: COLORS.muted,
                borderRadius: 7,
                fontSize: 13.5,
                transition: "background 0.12s, color 0.12s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = COLORS.sidebarHover;
                e.currentTarget.style.color = COLORS.text;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "none";
                e.currentTarget.style.color = COLORS.muted;
              }}
            >
              <SettingsIcon />
              <span style={{ fontWeight: 500 }}>Settings</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          background: COLORS.mainBg,
        }}
      >
        {/* Top bar when sidebar is closed */}
        {!open && (
          <div
            style={{ padding: "14px 16px", borderBottom: `1px solid #E5E7EB` }}
          >
            <button
              onClick={() => setOpen(true)}
              style={{
                background: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: 8,
                padding: "7px 10px",
                cursor: "pointer",
                color: COLORS.mainText,
                display: "flex",
                alignItems: "center",
                transition: "background 0.12s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#F3F4F6")
              }
              onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
              aria-label="open sidebar"
            >
              <MenuIcon />
            </button>
          </div>
        )}

        {/* Center content */}
        <ChatBoard />
        {/* <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 32,
          }}
        >
          <div style={{ textAlign: "center", maxWidth: 420 }}>
            <div style={{ marginBottom: 20 }}>
              <LargeBotIcon />
            </div>
            <h1
              style={{
                fontSize: 26,
                fontWeight: 700,
                color: COLORS.mainText,
                margin: "0 0 10px",
                letterSpacing: "-0.5px",
              }}
            >
              Welcome to AI Chat
            </h1>
            <p
              style={{
                fontSize: 15,
                color: COLORS.mainMuted,
                margin: "0 0 28px",
                lineHeight: 1.6,
              }}
            >
              Start a new conversation or pick up where you left off.
            </p>
            <button
              style={{
                padding: "10px 28px",
                background: COLORS.buttonBg,
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 14,
                cursor: "pointer",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = COLORS.buttonHover)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = COLORS.buttonBg)
              }
            >
              Start New Chat
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Sidepanel;
