import React, { useState } from "react";
import ChatBoard from "./chatBoard";

const C = {
  sidebar: "rgb(28, 35, 51)",
  sidebarHover: "#2E3A52",
  accent: "#C8623A",
  accentHover: "#b5562f",
  text: "#E8E4DC",
  textMuted: "#C8C4BC",
  muted: "#5A6880",
  divider: "#2C3340",
  iconColor: "#8A97AE",
  deleteHover: "#E05C5C",
  mainBg: "#F0EDE8",
};

const ChatIcon = () => (
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
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const PlusIcon = () => (
  <svg
    width="13"
    height="13"
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
    width="12"
    height="12"
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
    width="14"
    height="14"
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
    width="17"
    height="17"
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

const BotAvatar = ({ size = 32 }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: 10,
      background: "#2E3A52",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}
  >
    <svg
      width={size * 0.47}
      height={size * 0.47}
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

const DotsIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <circle cx="12" cy="5" r="1.5" fill="currentColor" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <circle cx="12" cy="19" r="1.5" fill="currentColor" />
  </svg>
);

const Sidepanel = ({
  userName = "John Doe",
  userPlan = "Free plan",
  userInitials = "JD",
}) => {
  const [open, setOpen] = useState(true);
  const [chats, setChats] = useState([]);
  const [hoveredChat, setHoveredChat] = useState(null);
  const [activeChat, setActiveChat] = useState(null);

  const handleDeleteChat = (e, id) => {
    e.stopPropagation();
    setChats((prev) => prev.filter((c) => c.id !== id));
    if (activeChat === id) setActiveChat(null);
  };

  const handleNewChat = () => {
    const id = Date.now();
    const newChat = { id, title: "New conversation", time: "now" };
    setChats((prev) => [newChat, ...prev]);
    setActiveChat(id);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
        background: C.mainBg,
      }}
    >
      {/* ── Sidebar ── */}
      {open && (
        <div
          style={{
            width: 280,
            background: C.sidebar,
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
            borderRight: `1px solid ${C.divider}`,
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "16px 14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: `1px solid ${C.divider}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <BotAvatar size={32} />
              <span
                style={{
                  color: C.text,
                  fontWeight: 600,
                  fontSize: 14,
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
                color: C.muted,
                fontSize: 18,
                lineHeight: 1,
                width: 26,
                height: 26,
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "color 0.15s, background 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = C.text;
                e.currentTarget.style.background = C.sidebarHover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = C.muted;
                e.currentTarget.style.background = "none";
              }}
            >
              ×
            </button>
          </div>

          {/* New Chat */}
          <div style={{ padding: "12px 12px 8px" }}>
            <button
              onClick={handleNewChat}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 7,
                padding: "9px 0",
                background: C.accent,
                color: "#FAF5EE",
                border: "none",
                borderRadius: 9,
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
                transition: "background 0.15s",
                letterSpacing: "0.01em",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = C.accentHover)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = C.accent)
              }
            >
              <PlusIcon /> New chat
            </button>
          </div>

          {/* Section label */}
          <div
            style={{
              padding: "6px 14px 5px",
              fontSize: 10,
              color: C.muted,
              textTransform: "uppercase",
              letterSpacing: "0.09em",
              fontWeight: 600,
            }}
          >
            Recent
          </div>

          {/* Chat list */}
          <div style={{ flex: 1, overflowY: "auto", padding: "0 8px" }}>
            {chats.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "36px 0",
                  color: C.muted,
                  fontSize: 12.5,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: C.sidebarHover,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 10px",
                  }}
                >
                  <ChatIcon />
                </div>
                No chats yet
              </div>
            ) : (
              chats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setActiveChat(chat.id)}
                  onMouseEnter={() => setHoveredChat(chat.id)}
                  onMouseLeave={() => setHoveredChat(null)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 10px",
                    borderRadius: 8,
                    marginBottom: 2,
                    cursor: "pointer",
                    background:
                      hoveredChat === chat.id || activeChat === chat.id
                        ? C.sidebarHover
                        : "transparent",
                    borderLeft:
                      activeChat === chat.id
                        ? `2px solid ${C.accent}`
                        : "2px solid transparent",
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
                    <span
                      style={{
                        color: activeChat === chat.id ? C.iconColor : C.muted,
                        flexShrink: 0,
                      }}
                    >
                      <ChatIcon />
                    </span>
                    <span
                      style={{
                        fontSize: 13,
                        color: activeChat === chat.id ? C.text : C.textMuted,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {chat.title}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ fontSize: 10, color: C.muted }}>
                      {chat.time}
                    </span>
                    <button
                      onClick={(e) => handleDeleteChat(e, chat.id)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: C.muted,
                        padding: "2px 3px",
                        borderRadius: 4,
                        opacity: hoveredChat === chat.id ? 1 : 0,
                        transition: "opacity 0.12s, color 0.12s",
                        display: "flex",
                        alignItems: "center",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = C.deleteHover)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = C.muted)
                      }
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div
            style={{
              padding: "10px 8px 14px",
              borderTop: `1px solid ${C.divider}`,
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
                color: C.muted,
                borderRadius: 8,
                fontSize: 13,
                transition: "background 0.12s, color 0.12s",
                marginBottom: 4,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = C.sidebarHover;
                e.currentTarget.style.color = C.textMuted;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "none";
                e.currentTarget.style.color = C.muted;
              }}
            >
              <SettingsIcon />
              <span style={{ fontWeight: 500 }}>Settings</span>
            </button>

            {/* User row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 9,
                padding: "8px 10px",
                borderRadius: 8,
                cursor: "pointer",
                transition: "background 0.12s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = C.sidebarHover)
              }
              onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: C.accent,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#FAF5EE",
                  flexShrink: 0,
                }}
              >
                {userInitials}
              </div>
              <div style={{ overflow: "hidden" }}>
                <div
                  style={{
                    fontSize: 13,
                    color: C.textMuted,
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {userName}
                </div>
                <div style={{ fontSize: 10, color: C.muted }}>{userPlan}</div>
              </div>
              <span style={{ marginLeft: "auto", color: C.muted }}>
                <DotsIcon />
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ── Main area ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          background: C.mainBg,
        }}
      >
        {!open && (
          <div
            style={{
              padding: "13px 16px",
              borderBottom: `0.5px solid rgb(78, 77, 77)`,
              background: "rgb(28, 35, 51)",
            }}
          >
            <button
              onClick={() => setOpen(true)}
              style={{
                background: "rgb(28, 35, 51)",
                border: "none",
                borderRadius: 8,
                padding: "7px 10px",
                cursor: "pointer",
                color: C.textMuted,
                display: "flex",
                alignItems: "center",
                transition: "background 0.12s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#2E3A52")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgb(28, 35, 51)")
              }
            >
              <MenuIcon />
            </button>
          </div>
        )}
        <ChatBoard />
      </div>
    </div>
  );
};

export default Sidepanel;
