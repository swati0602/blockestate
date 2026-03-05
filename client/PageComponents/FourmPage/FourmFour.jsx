import React from "react";
import Link from "next/link";

const HIGHLIGHTS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "8,400+ Members",
    desc: "A growing community of property investors and builders.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00D9FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: "1,284 Threads",
    desc: "Dozens of new discussions every week on real estate and Web3.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00FFA3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: "Live Activity",
    desc: "Real-time replies, upvotes, and expert answers.",
  },
];

const FourmFour = () => {
  return (
    <div style={{ padding: "0 0 60px" }}>
      <div className="container">
        <div style={{ background: "linear-gradient(135deg, rgba(112,72,232,0.12), rgba(0,217,255,0.06))", border: "1px solid rgba(112,72,232,0.2)", borderRadius: "20px", padding: "48px 40px", textAlign: "center" }}>
          <h4 style={{ margin: "0 0 12px", fontSize: "1.7rem", fontWeight: 800, background: "linear-gradient(90deg, #fff 40%, #a78bfa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Join the Conversation
          </h4>
          <p style={{ margin: "0 auto 36px", fontSize: "15px", color: "rgba(255,255,255,0.5)", maxWidth: "520px", lineHeight: 1.7 }}>
            Have a question about tokenized real estate, blockchain transactions, or the BlockEstate platform? Our community has answers.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "40px" }}>
            {HIGHLIGHTS.map((h, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "14px", padding: "24px 20px" }}>
                <div style={{ marginBottom: "12px" }}>{h.icon}</div>
                <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "#fff", marginBottom: "6px" }}>{h.title}</div>
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>{h.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
            <a href="#" style={{ padding: "13px 32px", background: "linear-gradient(135deg, #7048e8, #a78bfa)", borderRadius: "12px", color: "#fff", fontWeight: 700, fontSize: "15px", textDecoration: "none" }}>Start a Thread</a>
            <Link href="/connect" legacyBehavior><a style={{ padding: "13px 32px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "12px", color: "rgba(255,255,255,0.8)", fontWeight: 600, fontSize: "15px", textDecoration: "none" }}>Connect Wallet</a></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FourmFour;
