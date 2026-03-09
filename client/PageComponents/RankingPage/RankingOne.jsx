import React from "react";
import Link from "next/link";

const RankingOne = () => {
  return (
    <div
      style={{
        position: "relative",
        background: "#0a0a14",
        overflow: "hidden",
        padding: "70px 0 60px",
      }}
    >
      {/* Glow blobs */}
      <div style={{ position: "absolute", top: "-100px", left: "5%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(139,92,246,0.11) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "-60px", right: "10%", width: "360px", height: "360px", background: "radial-gradient(circle, rgba(251,191,36,0.07) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-80px", right: "20%", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(0,217,255,0.06) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
      {/* Grid overlay */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Breadcrumb */}
        <nav style={{ marginBottom: "28px" }}>
          <ol style={{ display: "inline-flex", alignItems: "center", gap: "8px", margin: 0, padding: "7px 16px", listStyle: "none", background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.15)", borderRadius: "30px" }}>
            <li style={{ display: "flex", alignItems: "center" }}>
              <Link href="/" legacyBehavior><a style={{ color: "#8b5cf6", textDecoration: "none", fontSize: "12px", fontWeight: 500, lineHeight: 1 }}>Home</a></Link>
            </li>
            <li style={{ display: "flex", alignItems: "center", color: "rgba(139,92,246,0.4)", fontSize: "13px", lineHeight: 1 }}>›</li>
            <li style={{ display: "flex", alignItems: "center", color: "#acacac", fontSize: "12px", lineHeight: 1 }}>Ranking</li>
          </ol>
        </nav>

        {/* Hero */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <p style={{ margin: "0 0 10px", fontSize: "11px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "#8b5cf6", opacity: 0.9 }}>BlockEstate — Leaderboard</p>
            <h1 style={{ margin: 0, fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 800, lineHeight: 1.1, background: "linear-gradient(120deg, #ffffff 30%, #fbbf24 60%, #a78bfa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Top Property Rankings
            </h1>
            <p style={{ margin: "14px 0 0", fontSize: "15px", color: "rgba(255,255,255,0.45)", maxWidth: "480px", lineHeight: 1.7 }}>
              The most sought-after on-chain real estate, ranked by buyer interest and market value.
            </p>
          </div>
          {/* Trophy icon */}
          <div style={{ width: "72px", height: "72px", borderRadius: "20px", background: "linear-gradient(135deg, rgba(251,191,36,0.18), rgba(139,92,246,0.12))", border: "1px solid rgba(251,191,36,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "34px", boxShadow: "0 8px 32px rgba(251,191,36,0.18)", flexShrink: 0 }}>🏆</div>
        </div>

        {/* Divider */}
        <div style={{ marginTop: "40px", height: "1px", background: "linear-gradient(90deg, rgba(251,191,36,0.35) 0%, rgba(139,92,246,0.2) 50%, transparent 100%)" }} />
      </div>
    </div>
  );
};

export default RankingOne;
