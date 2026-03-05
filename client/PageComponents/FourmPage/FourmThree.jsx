import React, { useState } from "react";
import Link from "next/link";

const THREADS = [
  {
    id: 1, category: "Real Estate", title: "How does property tokenization work on BlockEstate?",
    excerpt: "I am new here and trying to understand how fractional ownership is represented on-chain. Can someone walk me through the process from listing to token purchase?",
    author: "alex_prop", authorInitial: "A", date: "2h ago", replies: 18, likes: 42, tags: ["Tokenization","On-Chain","Guide"], hot: true,
  },
  {
    id: 2, category: "MetaMask", title: "MetaMask keeps disconnecting after page refresh",
    excerpt: "Every time I refresh the /connect page my wallet disconnects and I have to reconnect manually. Is there a persistent session solution in the works?",
    author: "web3_dev", authorInitial: "W", date: "5h ago", replies: 9, likes: 14, tags: ["MetaMask","Bug","UX"],
  },
  {
    id: 3, category: "Blockchain", title: "Gas fees on ZKsync vs Ethereum mainnet — which should we use?",
    excerpt: "Comparing deployment and transaction costs between L1 and ZKsync Era for property listings. Sharing my findings and opening the floor for debate.",
    author: "zkfan99", authorInitial: "Z", date: "1d ago", replies: 31, likes: 67, tags: ["ZKsync","Gas","Layer2"], hot: true,
  },
  {
    id: 4, category: "DeFi", title: "Using rental yield as collateral for DeFi loans?",
    excerpt: "Has anyone explored using tokenized rental income streams as collateral in Aave or Compound? Curious what the legal and technical hurdles look like.",
    author: "defi_realty", authorInitial: "D", date: "2d ago", replies: 23, likes: 38, tags: ["DeFi","Yield","Collateral"],
  },
  {
    id: 5, category: "General", title: "Best neighborhoods in Dubai for tokenized real estate investment",
    excerpt: "Looking at Dubai Marina vs Downtown. Anyone have data on which area has seen more on-chain activity or better ROI on BlockEstate?",
    author: "reim_uae", authorInitial: "R", date: "3d ago", replies: 12, likes: 29, tags: ["Dubai","Investment","ROI"],
  },
  {
    id: 6, category: "Help", title: "Cannot upload property images — getting 413 error",
    excerpt: "Trying to create a new listing but image uploads fail with a 413 payload too large error. Is there a file size limit and how do I compress without losing quality?",
    author: "newlister", authorInitial: "N", date: "4d ago", replies: 6, likes: 5, tags: ["Upload","Error","Help"],
  },
];

const TRENDING = [
  "Property tokenization explained",
  "ZKsync gas fee comparison",
  "MetaMask disconnect bug",
  "Fractional ownership legality",
  "Rental yield DeFi strategies",
];

const ACTIVE_MEMBERS = [
  { name: "alex_prop", posts: 142, initial: "A" },
  { name: "zkfan99", posts: 98, initial: "Z" },
  { name: "defi_realty", posts: 77, initial: "D" },
  { name: "web3_dev", posts: 65, initial: "W" },
];

const CAT_COLORS = {
  "Real Estate": "#00FFA3", "MetaMask": "#F6851B",
  "Blockchain": "#00D9FF", "DeFi": "#7048e8",
  "General": "#a78bfa", "Help": "#f7c948",
};

const FourmThree = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{ padding: "40px 0 80px" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 290px", gap: "28px", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {THREADS.map(t => (
              <div key={t.id} onMouseEnter={() => setHovered(t.id)} onMouseLeave={() => setHovered(null)} style={{ background: "rgba(255,255,255,0.025)", border: hovered === t.id ? "1px solid rgba(167,139,250,0.3)" : "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "22px 24px", transition: "border 0.2s, transform 0.2s, box-shadow 0.2s", transform: hovered === t.id ? "translateY(-2px)" : "none", boxShadow: hovered === t.id ? "0 8px 32px rgba(112,72,232,0.12)" : "none" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "linear-gradient(135deg,#7048e8,#a78bfa)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#fff", fontSize: "15px", flexShrink: 0 }}>{t.authorInitial}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "8px" }}>
                      <span style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 700, background: "rgba(0,0,0,0.25)", color: CAT_COLORS[t.category] || "#a78bfa", border: `1px solid ${CAT_COLORS[t.category] || "#a78bfa"}44`, whiteSpace: "nowrap", width: "auto", display: "inline-block" }}>{t.category}</span>
                      {t.hot && <span style={{ padding: "2px 8px", borderRadius: "20px", fontSize: "10px", fontWeight: 700, background: "rgba(255,100,60,0.15)", color: "#ff6e40", border: "1px solid rgba(255,100,60,0.3)", whiteSpace: "nowrap", width: "auto", display: "inline-block" }}>HOT</span>}
                    </div>
                    <h6 style={{ margin: "0 0 8px", fontSize: "1.0rem", fontWeight: 700, color: "#fff", lineHeight: 1.4 }}>{t.title}</h6>
                    <p style={{ margin: "0 0 14px", fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{t.excerpt}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "14px" }}>
                      {t.tags.map(tag => (
                        <span key={tag} style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "11px", background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.09)", whiteSpace: "nowrap", width: "auto", display: "inline-block" }}>{tag}</span>
                      ))}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>by <span style={{ color: "#a78bfa", fontWeight: 600 }}>{t.author}</span></span>
                        <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>{t.date}</span>
                        <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                          {t.replies}
                        </span>
                        <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ff6e40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                          {t.likes}
                        </span>
                      </div>
                      <a href="#" style={{ fontSize: "12px", color: "#7048e8", fontWeight: 600, textDecoration: "none" }}>View Thread</a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button style={{ padding: "12px 0", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "12px", color: "rgba(255,255,255,0.5)", fontSize: "13px", fontWeight: 600, cursor: "pointer", width: "100%" }}>Load More Threads</button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px", position: "sticky", top: "24px" }}>
            <a href="#" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", padding: "13px 20px", background: "linear-gradient(135deg, #7048e8, #a78bfa)", borderRadius: "12px", color: "#fff", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Start a Discussion
            </a>
            <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "14px", padding: "20px" }}>
              <h6 style={{ margin: "0 0 14px", fontSize: "13px", fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "0.06em" }}>Trending Topics</h6>
              {TRENDING.map((topic, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 0", borderBottom: i < TRENDING.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "#7048e8", minWidth: "18px" }}>#{i + 1}</span>
                  <a href="#" style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)", textDecoration: "none" }}>{topic}</a>
                </div>
              ))}
            </div>
            <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "14px", padding: "20px" }}>
              <h6 style={{ margin: "0 0 14px", fontSize: "13px", fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "0.06em" }}>Top Contributors</h6>
              {ACTIVE_MEMBERS.map((m, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 0", borderBottom: i < ACTIVE_MEMBERS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                  <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "linear-gradient(135deg,#7048e8,#a78bfa)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, color: "#fff", flexShrink: 0 }}>{m.initial}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>{m.name}</div>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)" }}>{m.posts} posts</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FourmThree;
