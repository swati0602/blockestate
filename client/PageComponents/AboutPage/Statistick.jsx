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
    <div style={{ padding: "56px 0 64px" }}>
      <div className="container">

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(0,255,163,0.08)", border: "1px solid rgba(0,255,163,0.2)",
            borderRadius: "50px", padding: "4px 16px", marginBottom: "14px",
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#00FFA3", boxShadow: "0 0 8px #00FFA3", display: "inline-block" }} />
            <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#00FFA3", letterSpacing: "0.08em", textTransform: "uppercase" }}>Live On-Chain Data</span>
          </div>
          <h3 style={{ margin: "0 0 10px", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800 }}>
            Platform Statistics
          </h3>
          <p style={{ margin: 0, color: "rgba(200,215,225,0.45)", fontSize: "1rem" }}>
            Real numbers, sourced directly from the blockchain
          </p>
        </div>

        {/* Stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
          {cards.map((card, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${card.color}22`,
              borderRadius: "16px",
              padding: "28px 24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              boxShadow: `0 0 24px ${card.glow}`,
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}>
              {/* icon circle */}
              <div style={{
                width: 48, height: 48, borderRadius: "50%",
                background: card.glow,
                border: `1px solid ${card.color}44`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: card.color,
              }}>
                {card.icon}
              </div>

              {/* value */}
              <div style={{
                fontSize: "2.8rem",
                fontWeight: 900,
                lineHeight: 1,
                background: `linear-gradient(135deg, ${card.color}, white)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                {card.value}
              </div>

              {/* label */}
              <div style={{
                fontSize: "0.88rem",
                fontWeight: 500,
                color: "rgba(200,215,225,0.5)",
                textAlign: "center",
                letterSpacing: "0.02em",
              }}>
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
