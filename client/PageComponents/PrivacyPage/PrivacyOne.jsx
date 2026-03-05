import React from "react";
import Link from "next/link";

const PrivacyOne = () => {
  return (
    <div style={{ padding: "28px 0 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="container">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", paddingBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "linear-gradient(135deg, #7048e8, #a78bfa)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div>
              <h5 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 800, background: "linear-gradient(90deg, #fff 40%, #a78bfa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Privacy Policy
              </h5>
              <p style={{ margin: 0, fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>Last updated: February 28, 2026</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>
            <Link href="/" legacyBehavior><a style={{ color: "#a78bfa", textDecoration: "none", fontWeight: 600 }}>Home</a></Link>
            <span>/</span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyOne;
