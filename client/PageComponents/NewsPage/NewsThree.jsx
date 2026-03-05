import React from "react";
import Link from "next/link";

const UPDATES = [
  {
    tag: "Product",
    tagColor: { color: "#a78bfa", bg: "rgba(112,72,232,0.12)", border: "rgba(112,72,232,0.3)" },
    date: "Feb 28, 2026",
    title: "Smart Contract v2.1 Deployed on Sepolia",
    desc: "Upgraded escrow logic with multi-sig support and lower gas fees for property transfer transactions.",
    img: "/portfolio/portfolio-02.jpg",
  },
  {
    tag: "Community",
    tagColor: { color: "#00FFA3", bg: "rgba(0,255,163,0.1)", border: "rgba(0,255,163,0.25)" },
    date: "Feb 21, 2026",
    title: "BlockEstate Discord Hits 5,000 Members",
    desc: "Our community has grown massively — join the conversation on listings, tokenization tips, and Web3 real estate.",
    img: "/portfolio/portfolio-04.jpg",
  },
  {
    tag: "Partnership",
    tagColor: { color: "#00D9FF", bg: "rgba(0,217,255,0.1)", border: "rgba(0,217,255,0.25)" },
    date: "Feb 14, 2026",
    title: "BlockEstate Partners with PropTech India",
    desc: "We've joined forces with PropTech India to bridge traditional real estate markets with on-chain tokenization.",
    img: "/portfolio/portfolio-06.jpg",
  },
  {
    tag: "Security",
    tagColor: { color: "#fbbf24", bg: "rgba(251,191,36,0.1)", border: "rgba(251,191,36,0.3)" },
    date: "Feb 5, 2026",
    title: "Third-Party Smart Contract Audit Complete",
    desc: "Our contracts passed an independent security audit with zero critical findings. Full report available on GitHub.",
    img: "/portfolio/portfolio-08.jpg",
  },
  {
    tag: "Feature",
    tagColor: { color: "#f472b6", bg: "rgba(244,114,182,0.1)", border: "rgba(244,114,182,0.25)" },
    date: "Jan 28, 2026",
    title: "Introducing Property Interest Tracking",
    desc: "Users can now express interest in any listing — sellers see demand in real time before setting a final price.",
    img: "/portfolio/portfolio-10.jpg",
  },
  {
    tag: "Guide",
    tagColor: { color: "#a78bfa", bg: "rgba(112,72,232,0.12)", border: "rgba(112,72,232,0.3)" },
    date: "Jan 20, 2026",
    title: "How to Mint Your First Property NFT",
    desc: "Step-by-step walkthrough — from document upload to on-chain ownership deed, minted in under 5 minutes.",
    img: "/portfolio/portfolio-12.jpg",
  },
];

const NewsThree = () => {
  return (
    <div style={{ padding: "72px 0 100px" }}>
      <div className="container">

        {/* Divider + header */}
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(112,72,232,0.3), transparent)", marginBottom: "56px" }} />

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "40px" }}>
          <div>
            <p style={{ margin: "0 0 6px", fontSize: "12px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#7048e8" }}>What's New</p>
            <h3 style={{ margin: 0, fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, background: "linear-gradient(90deg, #fff 40%, #a78bfa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Latest Updates
            </h3>
          </div>
          <Link href="/blog" legacyBehavior>
            <a style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 600, color: "#a78bfa", textDecoration: "none" }}>
              View all articles
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </Link>
        </div>

        {/* Cards grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" }}>
          {UPDATES.map((item, i) => (
            <div
              key={i}
              style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "18px", overflow: "hidden", display: "flex", flexDirection: "column", transition: "transform 0.25s, border-color 0.25s, box-shadow 0.25s", cursor: "pointer" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.borderColor = "rgba(112,72,232,0.4)"; e.currentTarget.style.boxShadow = "0 14px 44px rgba(112,72,232,0.14)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              {/* Image */}
              <div style={{ position: "relative", height: "170px", overflow: "hidden" }}>
                <img
                  src={item.img}
                  alt={item.title}
                  onError={(e) => { e.target.onerror = null; e.target.src = "/portfolio/portfolio-01.jpg"; }}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
                <div style={{ position: "absolute", top: "12px", left: "12px", background: item.tagColor.bg, border: `1px solid ${item.tagColor.border}`, borderRadius: "999px", padding: "3px 11px", fontSize: "10px", fontWeight: 700, color: item.tagColor.color, backdropFilter: "blur(8px)" }}>
                  {item.tag}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "20px 20px 22px", display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                <p style={{ margin: 0, fontSize: "11px", color: "rgba(255,255,255,0.3)", display: "flex", alignItems: "center", gap: "5px" }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  {item.date}
                </p>
                <h4 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "#fff", lineHeight: 1.4 }}>{item.title}</h4>
                <p style={{ margin: 0, fontSize: "0.83rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.75, flex: 1 }}>{item.desc}</p>
                <div style={{ paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "flex-end" }}>
                  <span style={{ fontSize: "12px", color: "#a78bfa", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
                    Read more
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default NewsThree;
