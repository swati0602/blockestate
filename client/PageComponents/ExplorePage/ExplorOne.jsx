import React from "react";

const ExplorOne = () => {
  return (
    <div
      style={{
        padding: "28px 0 0",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "8px",
            paddingBottom: "20px",
          }}
        >
          {/* Left: title */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "rgba(112,72,232,0.18)",
                border: "1px solid rgba(112,72,232,0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
              }}
            >
              🏘️
            </div>
            <div>
              <h5
                style={{
                  margin: 0,
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  background: "linear-gradient(90deg, #fff 40%, #a78bfa 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Explore Properties
              </h5>
              <p style={{ margin: 0, fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>
                Tokenized real estate on-chain
              </p>
            </div>
          </div>

          {/* Right: breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <a
              href="/"
              style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", textDecoration: "none" }}
              onMouseEnter={(e) => (e.target.style.color = "#a78bfa")}
              onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.4)")}
            >
              Home
            </a>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <span style={{ color: "#7048e8", fontSize: "12px", fontWeight: 500 }}>
              Explore
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorOne;
