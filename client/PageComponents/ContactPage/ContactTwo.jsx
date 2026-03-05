import React from "react";

const INFO_CARDS = [
  {
    color: "#7048e8",
    glow: "rgba(112,72,232,0.15)",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: "Community Chat",
    lines: [
      { label: "Discord Server", href: "https://discord.gg/blockestate" },
      { label: "Telegram Channel", href: "https://t.me/blockestate" },
    ],
  },
  {
    color: "#00D9FF",
    glow: "rgba(0,217,255,0.15)",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    title: "Email Us",
    lines: [
      { label: "support@blockestate.io", href: "mailto:support@blockestate.io" },
      { label: "partnerships@blockestate.io", href: "mailto:partnerships@blockestate.io" },
    ],
  },
  {
    color: "#00FFA3",
    glow: "rgba(0,255,163,0.15)",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: "Blockchain Network",
    lines: [
      { label: "Ethereum Mainnet", href: null },
      { label: "Sepolia Testnet (dev)", href: null },
    ],
  },
];

const ContactTwo = () => {
  return (
    <div style={{ paddingBottom: "56px" }}>
      <div className="container">

        {/* Info cards */}
        <div className="row g-4">
          {INFO_CARDS.map((card, i) => (
            <div key={i} className="col-lg-4 col-md-6 col-12">
              <div style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${card.color}22`,
                borderRadius: "16px",
                padding: "28px 24px",
                boxShadow: `0 0 28px ${card.glow}`,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}>
                {/* Icon */}
                <div style={{
                  width: 48, height: 48, borderRadius: "12px",
                  background: card.glow,
                  border: `1px solid ${card.color}44`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: card.color,
                  flexShrink: 0,
                }}>
                  {card.icon}
                </div>

                {/* Title */}
                <h4 style={{ margin: 0, fontSize: "1.28rem", fontWeight: 700, color: "#fff" }}>
                  {card.title}
                </h4>

                {/* Links */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {card.lines.map((line, j) => (
                    line.href ? (
                      <a key={j} href={line.href} target="_blank" rel="noreferrer" style={{
                        color: card.color, fontSize: "1.05rem", textDecoration: "none",
                        fontWeight: 500, opacity: 0.85,
                        transition: "opacity 0.2s",
                      }}
                        onMouseEnter={e => e.currentTarget.style.opacity = "1"}
                        onMouseLeave={e => e.currentTarget.style.opacity = "0.85"}
                      >
                        {line.label}
                      </a>
                    ) : (
                      <span key={j} style={{ color: "rgba(200,215,230,0.5)", fontSize: "1.05rem" }}>
                        {line.label}
                      </span>
                    )
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactTwo;