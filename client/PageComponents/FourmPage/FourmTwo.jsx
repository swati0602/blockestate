import React, { useState } from "react";

const CATEGORIES = ["All", "General", "Real Estate", "Blockchain", "MetaMask", "DeFi", "Help"];

const STATS = [
  { label: "Total Threads", value: "1,284" },
  { label: "Community Members", value: "8,410" },
  { label: "Posts Today", value: "37" },
  { label: "Active Now", value: "124" },
];

const FourmTwo = () => {
  const [active, setActive] = useState("All");

  return (
    <div style={{ padding: "36px 0 0" }}>
      <div className="container">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center" }}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActive(cat)} style={{ padding: "6px 16px", borderRadius: "20px", border: active === cat ? "1.5px solid #7048e8" : "1.5px solid rgba(255,255,255,0.1)", background: active === cat ? "rgba(112,72,232,0.18)" : "rgba(255,255,255,0.04)", color: active === cat ? "#a78bfa" : "rgba(255,255,255,0.55)", fontWeight: active === cat ? 700 : 400, fontSize: "13px", cursor: "pointer", whiteSpace: "nowrap", width: "auto", display: "inline-block" }}>
                {cat}
              </button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "12px", width: "100%", maxWidth: "700px" }}>
            {STATS.map(s => (
              <div key={s.label} style={{ textAlign: "center", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "14px 8px" }}>
                <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#a78bfa" }}>{s.value}</div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "4px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FourmTwo;
