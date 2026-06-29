import {
  useState,
  useEffect,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useTranslation } from "react-i18next";

// ── Direct Groq API call (bypass proxy) ──────────────────────────────
const callGroqDirect = async (messages, language) => {
  const apiKey =
    import.meta.env.VITE_GROQ_API_KEY ||
    process.env.REACT_APP_GROQ_API_KEY ||
    "";

  const systemPrompt = `You are a friendly, professional project consultant for Tut Wonders — a digital agency based in Egypt that builds websites, mobile apps, AI solutions, and custom digital products. Your goal is to have a warm conversation that uncovers exactly what the client needs so our team can prepare a precise proposal.

Collect these details naturally through conversation (never ask everything at once — 1-2 questions per message):
1. Full name
2. Email address
3. Phone / WhatsApp number (optional but helpful)
4. Type of project/service needed:
   - Web Development (corporate, SaaS, landing page)
   - Mobile App (iOS, Android, or cross-platform)
   - UI/UX Design
   - AI Solutions (automation, chatbots, smart integrations)
   - Custom Software Development
   - E-Commerce
   - Digital Transformation / Consulting
   - Maintenance & Support
   - Other
5. Project description & goals — what problem does it solve? Who is the audience?
6. Key features / functionality they need (be specific — ask follow-up questions)
7. Design preferences — do they have brand guidelines, references, or a style in mind?
8. Budget range (rough is fine — e.g. "under $1k", "$1k–$5k", "$5k–$20k", "$20k+")
9. Timeline / deadline — when do they need it ready?
10. Any existing systems, platforms, or integrations to consider?

Be conversational, warm, and genuinely curious. When you get an answer, briefly acknowledge it and naturally move to the next piece of information. Ask smart follow-up questions to flesh out requirements — for example, if they say "I need a mobile app", ask what it does and who uses it.

When you have enough info (at minimum: name, email, service type, project description, and key features), present a concise project brief summary and ask the user to confirm it.

When the user confirms, output EXACTLY this JSON block with no other text:
READY_TO_SEND:{"name":"...","email":"...","phone":"...","service":"...","description":"...","features":"...","design":"...","budget":"...","timeline":"...","integrations":"..."}

For quick-reply suggestions, include them as: CHIPS:["option1","option2","option3"] on its own line at the very end of your message.

Keep responses to 2-4 sentences. Be warm but efficient. Reference Tut Wonders naturally when relevant. Never use markdown headers or bullet lists — natural flowing prose only.

Respond in the language: ${language === "ar" ? "Arabic" : language === "fr" ? "French" : language === "es" ? "Spanish" : language === "de" ? "German" : language === "ru" ? "Russian" : "English"}`;

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "system", content: systemPrompt }, ...messages],
        max_tokens: 1024,
      }),
    },
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.error?.message || `API error ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "";
};

const ProjectBot = forwardRef((props, ref) => {
  const { t, i18n } = useTranslation();
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
  const initializedRef = useRef(false);

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
  }));

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, confirmData]);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const initBot = useCallback(() => {
    const openingMsg = t("bot.welcome");
    const initHistory = [
      { role: "user", content: "Hello" },
      { role: "assistant", content: openingMsg },
    ];
    setHistory(initHistory);
    setMessages([
      {
        role: "assistant",
        text: openingMsg,
        chips: [
          t("bot.chips.idea"),
          t("bot.chips.website"),
          t("bot.chips.app"),
        ],
      },
    ]);
  }, [t]);

  useEffect(() => {
    if (open && !initializedRef.current) {
      initializedRef.current = true;
      initBot();
    }
    if (open) setUnread(false);
  }, [open, initBot]);

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
        const fullText = await callGroqDirect(updatedHistory, i18n.language);

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
      } catch (err) {
        console.error("ProjectBot error:", err);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: t("bot.error"),
            chips: [],
          },
        ]);
      }

      setLoading(false);
    },
    [history, loading, sent, t, i18n.language],
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
      "Key Features:",
      confirmData.features || "Not specified",
      "",
      `Design Preferences: ${confirmData.design || "Not specified"}`,
      `Budget: ${confirmData.budget || "Not specified"}`,
      `Timeline: ${confirmData.timeline || "Not specified"}`,
      `Integrations: ${confirmData.integrations || "Not specified"}`,
      "",
      "---",
      "Sent via Tut Wonders AI Project Assistant",
    ].join("\n");

    const subject = `New Project Inquiry: ${confirmData.service} — ${confirmData.name}`;
    window.open(
      `mailto:info@tutwonders.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`,
      "_blank",
    );

    const serviceName = confirmData.service;
    setSent(true);
    setConfirmData(null);
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        text: t("bot.success").replace("{service}", serviceName),
        chips: [],
        success: true,
      },
    ]);
  }, [confirmData, t]);

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
    [input, sendMessage],
  );

  // ... rest of the component JSX remains the same, using t('bot.toggle'), t('bot.header'), etc.
  // The JSX is the same as before, just use t() for all text

  return (
    <>
      {/* ── Floating toggle ── */}
      <button
        className="bot-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open project assistant"
      >
        {open ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span className="bot-toggle-label">{t("bot.toggle")}</span>
          </>
        )}
        {unread && !open && <span className="bot-badge" />}
      </button>

      {/* ── Chat panel ── */}
      {open && (
        <div className="bot-panel">
          <div className="bot-header">
            <div className="bot-header-avatar">TW</div>
            <div className="bot-header-info">
              <h3>{t("bot.header")}</h3>
              <p>
                <span className="bot-status-dot" />
                {t("bot.status")}
              </p>
            </div>
            <button
              className="bot-close"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

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

            {confirmData && (
              <div className="bot-msg assistant">
                <div className="bot-msg-avatar">TW</div>
                <div className="bot-bubble">
                  <p style={{ marginBottom: "10px", fontSize: "13px" }}>
                    {t("bot.confirm.title")}
                  </p>
                  <div className="bot-confirm-card">
                    <h4>{t("bot.confirm.brief")}</h4>
                    {[
                      ["Name", confirmData.name],
                      ["Email", confirmData.email],
                      ["Phone", confirmData.phone || "Not provided"],
                      ["Service", confirmData.service],
                      ["Description", confirmData.description],
                      ["Key Features", confirmData.features],
                      ["Design Prefs", confirmData.design],
                      ["Budget", confirmData.budget || "Not specified"],
                      ["Timeline", confirmData.timeline || "Not specified"],
                      ["Integrations", confirmData.integrations],
                    ].map(([label, value]) =>
                      value &&
                      value !== "undefined" &&
                      value !== "Not specified" ? (
                        <div className="bot-confirm-row" key={label}>
                          <span>{label}</span>
                          <span>{value}</span>
                        </div>
                      ) : null,
                    )}
                    <div className="bot-confirm-actions">
                      <button
                        className="bot-btn-confirm"
                        onClick={handleConfirm}
                      >
                        {t("bot.confirm.send")}
                      </button>
                      <button className="bot-btn-edit" onClick={handleEdit}>
                        {t("bot.confirm.edit")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {!sent && (
            <div className="bot-input-area">
              <textarea
                ref={inputRef}
                className="bot-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t("bot.placeholder")}
                rows={1}
                disabled={loading || !!confirmData}
              />
              <button
                className="bot-send"
                onClick={() => sendMessage(input)}
                disabled={loading || !input.trim() || !!confirmData}
                aria-label={t("bot.send")}
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
});

ProjectBot.displayName = "ProjectBot";
export default ProjectBot;
