import React from "react";
import Link from "next/link";

const BlogOne = () => {
  return (
    <div style={{ padding: "28px 0 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="container">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", paddingBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "linear-gradient(135deg, #7048e8, #a78bfa)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
            </div>
            <div>
              <h5 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 800, background: "linear-gradient(90deg, #fff 40%, #a78bfa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                BlockEstate Blog
              </h5>
              <p style={{ margin: 0, fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>Insights on blockchain real estate</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>
            <Link href="/" legacyBehavior><a style={{ color: "#a78bfa", textDecoration: "none", fontWeight: 600 }}>Home</a></Link>
            <span>/</span>
            <span>Blog</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogOne;
