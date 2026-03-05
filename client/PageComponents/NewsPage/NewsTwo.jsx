import React, { useState } from "react";

const PERKS = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: "Market Updates",
    desc: "Weekly on-chain property price trends and volume reports.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00FFA3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
    title: "New Listings First",
    desc: "Get notified before anyone else when new properties drop.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00D9FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "No Spam. Ever.",
    desc: "Monthly digest only. Unsubscribe with one click anytime.",
  },
];

const NewsTwo = () => {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setLoading(true);
    setTimeout(() => { setDone(true); setLoading(false); }, 1000);
  };

  return (
    <div style={{ padding: "64px 0 0" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}
          className="newsletter-grid">

          {/* LEFT */}
          <div>
            <p style={{ margin: "0 0 12px", fontSize: "12px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#7048e8" }}>The Tide</p>
            <h2 style={{ margin: "0 0 18px", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 900, lineHeight: 1.2, background: "linear-gradient(135deg, #fff 30%, #a78bfa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              BlockEstate's official newsletter
            </h2>
            <p style={{ margin: "0 0 32px", fontSize: "1rem", color: "rgba(200,215,230,0.5)", lineHeight: 1.8, maxWidth: "440px" }}>
              Monthly insights on tokenized real estate, DeFi property finance, on-chain ownership trends, and what the team is building next.
            </p>

            {/* Perks */}
            <div style={{ display: "flex", flexDirection: "column", gap: "18px", marginBottom: "40px" }}>
              {PERKS.map((p, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {p.icon}
                  </div>
                  <div>
                    <p style={{ margin: "0 0 3px", fontSize: "0.92rem", fontWeight: 700, color: "#fff" }}>{p.title}</p>
                    <p style={{ margin: 0, fontSize: "0.82rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            {done ? (
              <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", background: "rgba(0,255,163,0.07)", border: "1px solid rgba(0,255,163,0.25)", borderRadius: "14px", padding: "16px 24px" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00FFA3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span style={{ fontSize: "0.95rem", fontWeight: 600, color: "#00FFA3" }}>You're subscribed! Welcome aboard.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ maxWidth: "380px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  style={{ display: "block", width: "100%", boxSizing: "border-box", background: "#1e1b2e", border: "1.5px solid #4a3f7a", borderRadius: "10px", padding: "12px 16px", color: "#ffffff", fontSize: "14px", outline: "none", fontFamily: "inherit" }}
                  onFocus={(e) => { e.target.style.borderColor = "#7048e8"; e.target.style.background = "#221c3a"; }}
                  onBlur={(e) => { e.target.style.borderColor = "#4a3f7a"; e.target.style.background = "#1e1b2e"; }}
                />
                <button
                  type="submit"
                  disabled={loading}
                  style={{ display: "block", width: "100%", boxSizing: "border-box", padding: "12px 0", borderRadius: "10px", border: "none", background: loading ? "rgba(112,72,232,0.4)" : "linear-gradient(135deg, #7048e8, #a78bfa)", color: "#fff", fontWeight: 700, fontSize: "14px", cursor: loading ? "not-allowed" : "pointer", boxShadow: "0 4px 16px rgba(112,72,232,0.3)" }}
                  onMouseEnter={(e) => { if (!loading) e.currentTarget.style.opacity = "0.85"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                >
                  {loading ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
            )}
            <p style={{ margin: "12px 0 0", fontSize: "11px", color: "rgba(255,255,255,0.25)" }}>No spam. Unsubscribe anytime.</p>
          </div>

          {/* RIGHT — visual */}
          <div style={{ position: "relative" }}>
            {/* Glow */}
            <div style={{ position: "absolute", inset: "-30px", borderRadius: "30px", background: "radial-gradient(ellipse at center, rgba(112,72,232,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "relative", borderRadius: "24px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 24px 64px rgba(0,0,0,0.4)" }}>
              <img
                src="/portfolio/portfolio-01.jpg"
                alt="Newsletter"
                style={{ width: "100%", height: "380px", objectFit: "cover", display: "block" }}
              />
              {/* Overlay card */}
              <div style={{ position: "absolute", bottom: "20px", left: "20px", right: "20px", background: "rgba(10,10,20,0.75)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "18px 20px" }}>
                <p style={{ margin: "0 0 4px", fontSize: "11px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Latest Issue</p>
                <p style={{ margin: "0 0 8px", fontSize: "0.95rem", fontWeight: 700, color: "#fff" }}>February 2026 Digest</p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {["On-Chain Stats", "New Features", "Community"].map((tag) => (
                    <span key={tag} style={{ background: "rgba(112,72,232,0.2)", border: "1px solid rgba(112,72,232,0.35)", borderRadius: "999px", padding: "3px 10px", fontSize: "10px", color: "#a78bfa", fontWeight: 600 }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .newsletter-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default NewsTwo;
