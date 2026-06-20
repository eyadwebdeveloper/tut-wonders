import { useState, useEffect, useRef, useCallback } from "react";

const SYSTEM_PROMPT = `You are a friendly, professional sales assistant for Tut Wonders — a digital agency based in Egypt that builds websites, mobile apps, and digital experiences. Your goal is to gather all the information needed to send a project inquiry email on behalf of the client.

Collect these details through natural conversation (don't ask all at once):
1. Full name
2. Email address
3. Phone/WhatsApp number (optional)
4. Type of project/service needed (Web Development, Mobile App, UI/UX Design, E-Commerce, Maintenance & Support, Digital Strategy, or Other)
5. Project description & goals
6. Budget range (rough idea is fine — e.g. "under $1k", "$1k-$5k", "$5k-$20k", "$20k+")
7. Timeline/deadline (when do they need it?)
8. Any specific features or references

Be conversational, warm, and concise. Ask 1-2 things at a time. When you have all key info (name, email, project type, and description at minimum), present a summary and ask the user to confirm.

When you have enough info and the user is ready to confirm, output EXACTLY this JSON block (no other text around it):
READY_TO_SEND:{"name":"...","email":"...","phone":"...","service":"...","description":"...","budget":"...","timeline":"..."}

For suggestions/chips in your responses, include them as: CHIPS:["option1","option2","option3"] at the very end of your message (separate line, after your main text).

Keep responses short (2-4 sentences max per message). Use a professional but warm tone. Reference Tut Wonders naturally. Don't use markdown headers or bullet lists — just natural prose.`;

// Points to your serverless proxy — the API key never leaves your server
const API_PROXY_URL = "/api/chat";

const ProjectBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmData, setConfirmData] = useState(null);
  const [sent, setSent] = useState(false);
  const [unread, setUnread] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  // Use a ref for the init guard — avoids stale-closure issues with useEffect deps
  const initializedRef = useRef(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, confirmData]);

  const initBot = useCallback(() => {
    const openingMsg =
      "Welcome to Tut Wonders! ✨ I'm here to help you kick off your project. I'll collect a few details and send them straight to our team. To start — what's your name?";
    const initHistory = [
      { role: "user", content: "Hello" },
      { role: "assistant", content: openingMsg },
    ];
    setHistory(initHistory);
    setMessages([{ role: "assistant", text: openingMsg, chips: [] }]);
  }, []);

  useEffect(() => {
    if (open && !initializedRef.current) {
      initializedRef.current = true;
      initBot();
    }
    if (open) setUnread(false);
  }, [open, initBot]);

  const callApi = useCallback(async (updatedHistory) => {
    const res = await fetch(API_PROXY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system: SYSTEM_PROMPT,
        messages: updatedHistory,
      }),
    });
    if (!res.ok) throw new Error(`Proxy error: ${res.status}`);
    const data = await res.json();
    return data.content?.[0]?.text || "";
  }, []);

  const sendMessage = useCallback(
    async (text) => {
      if (!text.trim() || loading || sent) return;
      const userMsg = text.trim();
      setInput("");
      setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
      const updatedHistory = [...history, { role: "user", content: userMsg }];
      setHistory(updatedHistory);
      setLoading(true);

      try {
        const fullText = await callApi(updatedHistory);

        if (fullText.includes("READY_TO_SEND:")) {
          const match = fullText.match(/READY_TO_SEND:(\{[\s\S]*?\})/);
          if (match) {
            try {
              const parsed = JSON.parse(match[1]);
              setConfirmData(parsed);
              setHistory((prev) => [
                ...prev,
                { role: "assistant", content: fullText },
              ]);
            } catch {
              setMessages((prev) => [
                ...prev,
                {
                  role: "assistant",
                  text: "Let me confirm your details — can you review what we have?",
                  chips: [],
                },
              ]);
            }
          }
        } else {
          let mainText = fullText;
          let chips = [];
          if (fullText.includes("CHIPS:")) {
            const parts = fullText.split("CHIPS:");
            mainText = parts[0].trim();
            try {
              chips = JSON.parse(parts[1].trim());
            } catch {
              chips = [];
            }
          }
          setHistory((prev) => [
            ...prev,
            { role: "assistant", content: fullText },
          ]);
          setMessages((prev) => [
            ...prev,
            { role: "assistant", text: mainText, chips },
          ]);
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: "Apologies, I had a connection issue. Could you repeat that?",
            chips: [],
          },
        ]);
      }

      setLoading(false);
    },
    [history, loading, sent, callApi]
  );

  const handleConfirm = useCallback(() => {
    if (!confirmData) return;
    const emailBody = [
      "New Project Inquiry from Tut Wonders Bot",
      "",
      `Name: ${confirmData.name}`,
      `Email: ${confirmData.email}`,
      `Phone: ${confirmData.phone || "Not provided"}`,
      `Service: ${confirmData.service}`,
      "",
      "Project Description:",
      confirmData.description,
      "",
      `Budget: ${confirmData.budget || "Not specified"}`,
      `Timeline: ${confirmData.timeline || "Not specified"}`,
      "",
      "---",
      "Sent via Tut Wonders AI Assistant",
    ].join("\n");

    const subject = `New Project Inquiry: ${confirmData.service} - ${confirmData.name}`;
    window.open(
      `mailto:info@tutwonders.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`,
      "_blank"
    );

    const serviceName = confirmData.service;
    setSent(true);
    setConfirmData(null);
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        text: `Your project brief has been sent to the Tut Wonders team! 🎉 We'll review your ${serviceName} inquiry and get back to you within 24 hours. We look forward to building something great together.`,
        chips: [],
        success: true,
      },
    ]);
  }, [confirmData]);

  const handleEdit = useCallback(() => {
    setConfirmData(null);
    sendMessage("I want to make some changes to my details.");
  }, [sendMessage]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage(input);
      }
    },
    [input, sendMessage]
  );

  return (
    <>
      {/* Floating toggle button */}
      <button
        className="bot-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open project assistant"
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
        {unread && !open && <span className="bot-badge" />}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="bot-panel">
          {/* Header */}
          <div className="bot-header">
            <div className="bot-header-avatar">TW</div>
            <div className="bot-header-info">
              <h3>Tut Wonders Assistant</h3>
              <p>
                <span className="bot-status-dot" />
                Online · Replies instantly
              </p>
            </div>
            <button
              className="bot-close"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="bot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`bot-msg ${msg.role}`}>
                {msg.role === "assistant" && (
                  <div className="bot-msg-avatar">TW</div>
                )}
                {msg.role === "user" && (
                  <div className="bot-msg-avatar user-av">You</div>
                )}
                <div
                  className={`bot-bubble${msg.success ? " bot-bubble-success" : ""}`}
                >
                  {msg.success && <div className="bot-success-icon">✓</div>}
                  <p>{msg.text}</p>
                  {msg.chips && msg.chips.length > 0 && (
                    <div className="bot-chips">
                      {msg.chips.map((chip, ci) => (
                        <button
                          key={ci}
                          className="bot-chip"
                          onClick={() => sendMessage(chip)}
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="bot-msg assistant">
                <div className="bot-msg-avatar">TW</div>
                <div className="bot-bubble bot-typing">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}

            {/* Confirm card */}
            {confirmData && (
              <div className="bot-msg assistant">
                <div className="bot-msg-avatar">TW</div>
                <div className="bot-bubble">
                  <p style={{ marginBottom: "10px", fontSize: "13px" }}>
                    Here's a summary of your project inquiry. Ready to send?
                  </p>
                  <div className="bot-confirm-card">
                    <h4>Project Brief</h4>
                    {[
                      ["Name", confirmData.name],
                      ["Email", confirmData.email],
                      ["Phone", confirmData.phone || "Not provided"],
                      ["Service", confirmData.service],
                      ["Description", confirmData.description],
                      ["Budget", confirmData.budget || "Not specified"],
                      ["Timeline", confirmData.timeline || "Not specified"],
                    ].map(([label, value]) =>
                      value && value !== "undefined" ? (
                        <div className="bot-confirm-row" key={label}>
                          <span>{label}</span>
                          <span>{value}</span>
                        </div>
                      ) : null
                    )}
                    <div className="bot-confirm-actions">
                      <button
                        className="bot-btn-confirm"
                        onClick={handleConfirm}
                      >
                        ✓ Send to Tut Wonders
                      </button>
                      <button className="bot-btn-edit" onClick={handleEdit}>
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          {!sent && (
            <div className="bot-input-area">
              <textarea
                ref={inputRef}
                className="bot-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message…"
                rows={1}
                disabled={loading || !!confirmData}
              />
              <button
                className="bot-send"
                onClick={() => sendMessage(input)}
                disabled={loading || !input.trim() || !!confirmData}
                aria-label="Send"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProjectBot;