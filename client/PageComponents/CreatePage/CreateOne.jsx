import React from "react";

const CreateOne = ({ title }) => {
  return (
    <div style={{ paddingTop: "72px", paddingBottom: "48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      {/* Glow blob */}
      <div style={{
        position: "absolute", top: "-80px", left: "50%", transform: "translateX(-50%)",
        width: "700px", height: "320px", borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(112,72,232,0.2) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Eyebrow */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(112,72,232,0.1)", border: "1px solid rgba(112,72,232,0.3)", borderRadius: "50px", padding: "4px 16px", marginBottom: "18px" }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#7048e8", boxShadow: "0 0 8px #7048e8", display: "inline-block" }} />
          <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#9d7cf4", letterSpacing: "0.1em", textTransform: "uppercase" }}>Blockchain Real Estate</span>
        </div>
        <h1 style={{
          fontSize: "clamp(2rem, 4.5vw, 3.2rem)", fontWeight: 900, margin: "0 0 14px",
          background: "linear-gradient(135deg, #ffffff 0%, #c4b5fd 50%, #7048e8 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          lineHeight: 1.15,
        }}>
          List Your Property On-Chain
        </h1>
        <p style={{ margin: "0 auto", fontSize: "1rem", color: "rgba(200,215,230,0.5)", maxWidth: "480px", lineHeight: 1.7 }}>
          Tokenize your real estate asset, upload media to IPFS, and reach global buyers — no middlemen.
        </p>
        <div style={{ marginTop: "24px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontSize: "0.85rem" }}>
          <a href="/" style={{ color: "rgba(200,200,255,0.4)", textDecoration: "none" }}>Home</a>
          <span style={{ color: "rgba(200,200,255,0.2)" }}>›</span>
          <span style={{ color: "#9d7cf4", fontWeight: 600 }}>{title}</span>
        </div>
      </div>
    </div>
  );
};

export default CreateOne;
