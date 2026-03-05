import React from "react";
import Link from "next/link";
import { Loader } from "../../PageComponents/Components";

const MEDAL = ["🥇", "🥈", "🥉"];
const MEDAL_COLORS = [
  { bg: "rgba(255,200,0,0.12)", border: "rgba(255,200,0,0.35)", color: "#fbbf24" },
  { bg: "rgba(180,180,200,0.12)", border: "rgba(180,180,200,0.3)", color: "#94a3b8" },
  { bg: "rgba(200,130,80,0.12)", border: "rgba(200,130,80,0.3)", color: "#f97316" },
];

const RankingTwo = ({ properties = [], isLoading }) => {
  if (isLoading) {
    return (
      <div style={{ padding: "80px 0" }}>
        <Loader />
      </div>
    );
  }

  const catCount = {};
  properties.forEach((p) => {
    const c = (p.category || "Other").toLowerCase();
    catCount[c] = (catCount[c] || 0) + 1;
  });

  const ranked = [...properties].sort(
    (a, b) =>
      (b.reviewers?.length || 0) - (a.reviewers?.length || 0) ||
      parseFloat(b.price || 0) - parseFloat(a.price || 0)
  );

  const maxInterest = ranked[0]?.reviewers?.length || 1;
  const hasData = ranked.length > 0;

  const colStyle = {
    padding: "0 12px",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.35)",
    whiteSpace: "nowrap",
  };

  return (
    <div style={{ padding: "40px 0 80px" }}>
      <div className="container">

        {/* Section header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "28px",
          }}
        >
          <div>
            <p style={{ margin: "0 0 4px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7048e8" }}>
              Leaderboard
            </p>
            <h3
              style={{
                margin: 0,
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                fontWeight: 800,
                background: "linear-gradient(90deg, #fff 40%, #a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Most Wanted Properties
            </h3>
          </div>
          {hasData && (
            <span
              style={{
                background: "rgba(112,72,232,0.15)",
                border: "1px solid rgba(112,72,232,0.35)",
                borderRadius: "999px",
                padding: "6px 16px",
                fontSize: "13px",
                color: "#a78bfa",
                fontWeight: 600,
              }}
            >
              {ranked.length} listing{ranked.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {hasData ? (
          <div
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "20px",
              overflow: "hidden",
            }}
          >
            {/* Table header */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "48px 1fr 180px 130px 110px 120px 90px",
                padding: "14px 20px",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                background: "rgba(255,255,255,0.03)",
                gap: "8px",
                alignItems: "center",
              }}
            >
              {["#", "Property", "Interest", "Price", "Category", "Owner", "In Cat."].map((h) => (
                <span key={h} style={colStyle}>{h}</span>
              ))}
            </div>

            {/* Rows */}
            {ranked.map((p, i) => {
              const price = parseFloat(p.price || 0);
              const reviewerCount = p.reviewers?.length || 0;
              const shortOwner = p.owner
                ? `${p.owner.slice(0, 6)}…${p.owner.slice(-4)}`
                : "—";
              const categoryItems = catCount[(p.category || "Other").toLowerCase()] || 1;
              const imgSrc =
                p.image && p.image.startsWith("http")
                  ? p.image
                  : `/portfolio/portfolio-0${(i % 8) + 1}.jpg`;
              const medal = MEDAL_COLORS[i] || null;
              const pct = Math.round((reviewerCount / maxInterest) * 100);

              return (
                <div
                  key={p.productID}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "48px 1fr 180px 130px 110px 120px 90px",
                    padding: "14px 20px",
                    borderBottom: i < ranked.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                    alignItems: "center",
                    gap: "8px",
                    background: i < 3 ? medal.bg : "transparent",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(112,72,232,0.07)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = i < 3 ? medal.bg : "transparent")}
                >
                  {/* Rank */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {i < 3 ? (
                      <span
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "8px",
                          background: medal.bg,
                          border: `1px solid ${medal.border}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "16px",
                        }}
                      >
                        {MEDAL[i]}
                      </span>
                    ) : (
                      <span
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "8px",
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          fontWeight: 700,
                          color: "rgba(255,255,255,0.4)",
                        }}
                      >
                        {i + 1}
                      </span>
                    )}
                  </div>

                  {/* Property */}
                  <Link href={`/detail?property=${p.productID}`} legacyBehavior>
                    <a style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "12px" }}>
                      <img
                        src={imgSrc}
                        alt={p.title}
                        onError={(e) => { e.target.onerror = null; e.target.src = `/portfolio/portfolio-0${(i % 8) + 1}.jpg`; }}
                        style={{
                          width: "44px",
                          height: "44px",
                          borderRadius: "10px",
                          objectFit: "cover",
                          border: i < 3 ? `1px solid ${medal.border}` : "1px solid rgba(255,255,255,0.1)",
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontSize: "0.88rem",
                          fontWeight: 600,
                          color: "#fff",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {p.title || "Untitled"}
                      </span>
                    </a>
                  </Link>

                  {/* Interest bar */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    <span style={{ fontSize: "12px", color: reviewerCount > 0 ? "#00FFA3" : "rgba(255,255,255,0.3)" }}>
                      {reviewerCount > 0 ? `${reviewerCount} interested` : "No interest yet"}
                    </span>
                    <div style={{ height: "4px", borderRadius: "2px", background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
                      <div
                        style={{
                          height: "100%",
                          borderRadius: "2px",
                          width: `${pct}%`,
                          background: i === 0
                            ? "linear-gradient(90deg, #fbbf24, #f59e0b)"
                            : i === 1
                            ? "linear-gradient(90deg, #94a3b8, #cbd5e1)"
                            : i === 2
                            ? "linear-gradient(90deg, #f97316, #fb923c)"
                            : "linear-gradient(90deg, #7048e8, #a78bfa)",
                        }}
                      />
                    </div>
                  </div>

                  {/* Price */}
                  <span
                    style={{
                      fontSize: "0.88rem",
                      fontWeight: 700,
                      background: "linear-gradient(90deg, #00FFA3, #00D9FF)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {price.toFixed(4)} ETH
                  </span>

                  {/* Category */}
                  <span
                    style={{
                      display: "inline-block",
                      background: "rgba(112,72,232,0.12)",
                      border: "1px solid rgba(112,72,232,0.25)",
                      borderRadius: "999px",
                      padding: "3px 10px",
                      fontSize: "11px",
                      color: "#a78bfa",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {p.category || "—"}
                  </span>

                  {/* Owner */}
                  <span
                    title={p.owner}
                    style={{
                      fontFamily: "monospace",
                      fontSize: "11px",
                      color: "rgba(255,255,255,0.45)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {shortOwner}
                  </span>

                  {/* In category */}
                  <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>
                    {categoryItems}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty state */
          <div
            style={{
              textAlign: "center",
              padding: "80px 24px",
              borderRadius: "20px",
              border: "1px dashed rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                background: "rgba(112,72,232,0.12)",
                border: "1px solid rgba(112,72,232,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "32px",
                margin: "0 auto 20px",
              }}
            >
              🏆
            </div>
            <h4 style={{ color: "#f1f5f9", marginBottom: "10px", fontSize: "1.2rem", fontWeight: 700 }}>
              No properties listed yet
            </h4>
            <p
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: "0.9rem",
                margin: "0 auto 28px",
                maxWidth: "340px",
                lineHeight: 1.7,
              }}
            >
              Be the first to list your property on-chain.
            </p>
            <Link href="/create-property" legacyBehavior>
              <a
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 28px",
                  borderRadius: "999px",
                  background: "linear-gradient(135deg, #7048e8, #00D9FF)",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "14px",
                  textDecoration: "none",
                  boxShadow: "0 4px 20px rgba(112,72,232,0.35)",
                }}
              >
                Create Listing →
              </a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default RankingTwo;
