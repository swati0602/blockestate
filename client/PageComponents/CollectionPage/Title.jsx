import React from "react";
import Link from "next/link";

const Title = ({ title }) => {
  return (
    <div
      style={{
        position: "relative",
        background: "#0a0a14",
        overflow: "hidden",
        padding: "70px 0 60px",
      }}
    >
      {/* Ambient glow blobs */}
      <div style={{
        position: "absolute", top: "-80px", left: "10%",
        width: "420px", height: "420px",
        background: "radial-gradient(circle, rgba(139,92,246,0.13) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "-60px", right: "8%",
        width: "340px", height: "340px",
        background: "radial-gradient(circle, rgba(0,217,255,0.07) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />

      {/* Subtle grid lines */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        pointerEvents: "none",
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Breadcrumb */}
        <nav style={{ marginBottom: "28px" }}>
          <ol style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            margin: 0, padding: "7px 16px", listStyle: "none",
            background: "rgba(139,92,246,0.06)",
            border: "1px solid rgba(139,92,246,0.15)",
            borderRadius: "30px",
          }}>
            <li style={{ display: "flex", alignItems: "center" }}>
              <Link href="/" legacyBehavior>
                <a style={{ color: "#8b5cf6", textDecoration: "none", fontSize: "12px", fontWeight: 500, lineHeight: 1 }}>Home</a>
              </Link>
            </li>
            <li style={{ display: "flex", alignItems: "center", color: "rgba(139,92,246,0.4)", fontSize: "13px", lineHeight: 1 }}>›</li>
            <li style={{ display: "flex", alignItems: "center", color: "#acacac", fontSize: "12px", lineHeight: 1 }}>{title || "My Collection"}</li>
          </ol>
        </nav>

        {/* Hero text */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <p style={{
              margin: "0 0 10px",
              fontSize: "11px", fontWeight: 700, letterSpacing: "3px",
              textTransform: "uppercase", color: "#8b5cf6", opacity: 0.9,
            }}>BlockEstate — Saved</p>
            <h1 style={{
              margin: 0,
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              background: "linear-gradient(120deg, #ffffff 30%, #c4b5fd 65%, #818cf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              {title || "My Collection"}
            </h1>
            <p style={{
              margin: "14px 0 0",
              fontSize: "15px",
              color: "rgba(255,255,255,0.45)",
              maxWidth: "480px",
              lineHeight: 1.7,
            }}>
              Properties you've saved on-chain — your curated favourites, all in one place.
            </p>
          </div>

          {/* Decorative heart icon */}
          <div style={{
            width: "72px", height: "72px",
            borderRadius: "20px",
            background: "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(0,217,255,0.1))",
            border: "1px solid rgba(139,92,246,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "32px",
            boxShadow: "0 8px 32px rgba(139,92,246,0.2)",
            flexShrink: 0,
          }}>❤️</div>
        </div>

        {/* Divider */}
        <div style={{
          marginTop: "40px",
          height: "1px",
          background: "linear-gradient(90deg, rgba(139,92,246,0.4) 0%, rgba(139,92,246,0.08) 60%, transparent 100%)",
        }} />
      </div>
    </div>
  );
};

export default Title;
