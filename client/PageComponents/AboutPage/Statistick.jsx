import React, { useEffect, useState } from "react";
import { useStateContext } from "../../context";

const Statistick = () => {
  const {
    totalPropertyFunction,
    totalReviewsFunction,
    getHighestRatedProduct,
    getPropertiesData,
  } = useStateContext();

  const [stats, setStats] = useState({
    totalProperties: "—",
    uniqueOwners: "—",
    totalReviews: "—",
    topPropertyId: "—",
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [totalProps, totalRevs, allProps] = await Promise.all([
          totalPropertyFunction(),
          totalReviewsFunction(),
          getPropertiesData(),
        ]);
        const uniqueOwnerSet = new Set(
          (allProps || []).map((p) => p.owner?.toLowerCase())
        );
        setStats({
          totalProperties: totalProps ?? 0,
          uniqueOwners: uniqueOwnerSet.size ?? 0,
          totalReviews: totalRevs ?? 0,
          topPropertyId: getHighestRatedProduct || "—",
        });
      } catch (err) {
        console.log("Stats fetch error:", err);
      }
    };
    fetchStats();
  }, [getHighestRatedProduct]);

  const cards = [
    {
      value: stats.totalProperties,
      label: "Properties Listed",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
      color: "#00FFA3",
      glow: "rgba(0,255,163,0.15)",
    },
    {
      value: stats.uniqueOwners,
      label: "Unique Owners",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      color: "#00D9FF",
      glow: "rgba(0,217,255,0.15)",
    },
    {
      value: stats.totalReviews,
      label: "Reviews Submitted",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ),
      color: "#a78bfa",
      glow: "rgba(167,139,250,0.15)",
    },
    {
      value: stats.topPropertyId !== "—" ? `#${stats.topPropertyId}` : "—",
      label: "Top Liked Property",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      ),
      color: "#f472b6",
      glow: "rgba(244,114,182,0.15)",
    },
  ];

  return (
    <div style={{ background: "#0a0a14", padding: "0 0 90px" }}>
      <div className="container">

        {/* Divider */}
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.2), transparent)", marginBottom: "64px" }} />

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(0,255,163,0.07)", border: "1px solid rgba(0,255,163,0.16)", borderRadius: "30px", padding: "5px 16px", marginBottom: "18px" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#00FFA3", boxShadow: "0 0 8px #00FFA3", display: "inline-block" }} />
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#00FFA3", letterSpacing: "2px", textTransform: "uppercase" }}>Live On-Chain Data</span>
          </div>
          <h2 style={{ margin: "0 0 12px", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800, background: "linear-gradient(120deg, #fff 40%, #a78bfa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Platform Statistics
          </h2>
          <p style={{ margin: 0, color: "rgba(255,255,255,0.36)", fontSize: "15px" }}>
            Real numbers, sourced directly from the blockchain
          </p>
        </div>

        {/* Stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
          {cards.map((card, i) => (
            <div
              key={i}
              style={{ background: "#0f0f1a", border: `1px solid ${card.color}1a`, borderRadius: "18px", padding: "32px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", position: "relative", overflow: "hidden", transition: "transform 0.25s, box-shadow 0.25s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = `0 16px 40px ${card.glow}`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              {/* Subtle glow overlay */}
              <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at top, ${card.glow} 0%, transparent 65%)`, pointerEvents: "none" }} />
              {/* Icon */}
              <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: card.glow, border: `1px solid ${card.color}28`, display: "flex", alignItems: "center", justifyContent: "center", color: card.color, position: "relative" }}>
                {card.icon}
              </div>
              {/* Value */}
              <div style={{ fontSize: "3rem", fontWeight: 900, lineHeight: 1, background: `linear-gradient(135deg, ${card.color}, #ffffff)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", position: "relative" }}>
                {card.value}
              </div>
              {/* Label */}
              <div style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.38)", textAlign: "center", letterSpacing: "0.5px", position: "relative" }}>
                {card.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Statistick;
