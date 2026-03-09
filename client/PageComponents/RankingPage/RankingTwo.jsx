import React from "react";
import Link from "next/link";
import { Loader } from "../../PageComponents/Components";

const MEDAL = ["🥇", "🥈", "🥉"];
const MEDAL_COLORS = [
  { bg: "rgba(251,191,36,0.08)", border: "rgba(251,191,36,0.3)", glow: "rgba(251,191,36,0.2)", color: "#fbbf24", bar: "linear-gradient(90deg,#fbbf24,#f59e0b)" },
  { bg: "rgba(148,163,184,0.06)", border: "rgba(148,163,184,0.22)", glow: "rgba(148,163,184,0.12)", color: "#94a3b8", bar: "linear-gradient(90deg,#94a3b8,#cbd5e1)" },
  { bg: "rgba(249,115,22,0.07)", border: "rgba(249,115,22,0.25)", glow: "rgba(249,115,22,0.15)", color: "#f97316", bar: "linear-gradient(90deg,#f97316,#fb923c)" },
];

const RankingTwo = ({ properties = [], isLoading }) => {
  if (isLoading) {
    return (
      <div style={{ minHeight: "40vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0a14", padding: "80px 0" }}>
        <div style={{ textAlign: "center" }}>
          <Loader />
          <p style={{ color: "#acacac", marginTop: "16px", fontSize: "14px" }}>Loading rankings...</p>
        </div>
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
  const totalValue = properties.reduce((s, p) => s + parseFloat(p.price || 0), 0);
  const totalCategories = Object.keys(catCount).length;

  const colStyle = {
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.3)",
    whiteSpace: "nowrap",
  };

  return (
    <div style={{ background: "#0a0a14", padding: "48px 0 90px" }}>
      <div className="container">

        {/* Stats bar */}
        {hasData && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1px", background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.12)", borderRadius: "16px", overflow: "hidden", marginBottom: "36px" }}>
            {[
              { label: "Total Listings", value: ranked.length, suffix: "", gradient: "linear-gradient(90deg,#fff,#a78bfa)" },
              { label: "Total Value", value: totalValue.toFixed(2), suffix: " ETH", gradient: "linear-gradient(90deg,#00FFA3,#00D9FF)" },
              { label: "Categories", value: totalCategories, suffix: "", gradient: "linear-gradient(90deg,#fbbf24,#f97316)" },
              { label: "Top Interest", value: ranked[0]?.reviewers?.length || 0, suffix: " views", gradient: "linear-gradient(90deg,#f472b6,#a78bfa)" },
            ].map((s) => (
              <div key={s.label} style={{ padding: "20px 24px", background: "#0f0f1a" }}>
                <p style={{ margin: "0 0 4px", fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#acacac" }}>{s.label}</p>
                <p style={{ margin: 0, fontSize: "22px", fontWeight: 800, background: s.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  {s.value}<span style={{ fontSize: "13px", fontWeight: 600 }}>{s.suffix}</span>
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Section header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
          <div>
            <p style={{ margin: "0 0 4px", fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#8b5cf6" }}>Leaderboard</p>
            <h3 style={{ margin: 0, fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", fontWeight: 800, background: "linear-gradient(90deg,#fff 40%,#a78bfa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Most Wanted Properties
            </h3>
          </div>
          {hasData && (
            <span style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.25)", borderRadius: "999px", padding: "6px 16px", fontSize: "12px", color: "#a78bfa", fontWeight: 700 }}>
              {ranked.length} listing{ranked.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {hasData ? (
          <div style={{ background: "#0f0f1a", border: "1px solid rgba(139,92,246,0.12)", borderRadius: "20px", overflow: "hidden" }}>

            {/* Table header */}
            <div style={{ display: "grid", gridTemplateColumns: "56px 1fr 190px 140px 120px 130px 80px", padding: "14px 24px", borderBottom: "1px solid rgba(139,92,246,0.1)", background: "rgba(139,92,246,0.05)", gap: "8px", alignItems: "center" }}>
              {["#", "Property", "Interest", "Price", "Category", "Owner", "Cat."].map((h) => (
                <span key={h} style={colStyle}>{h}</span>
              ))}
            </div>

            {/* Rows */}
            {ranked.map((p, i) => {
              const price = parseFloat(p.price || 0);
              const reviewerCount = p.reviewers?.length || 0;
              const shortOwner = p.owner ? `${p.owner.slice(0, 6)}…${p.owner.slice(-4)}` : "—";
              const categoryItems = catCount[(p.category || "Other").toLowerCase()] || 1;
              const imgSrc = p.image && p.image.startsWith("http") ? p.image : `/portfolio/portfolio-0${(i % 8) + 1}.jpg`;
              const medal = MEDAL_COLORS[i] || { bg: "transparent", border: "rgba(139,92,246,0.15)", glow: "transparent", color: "rgba(255,255,255,0.35)", bar: "linear-gradient(90deg,#8b5cf6,#a78bfa)" };
              const pct = Math.round((reviewerCount / maxInterest) * 100);
              const isTop3 = i < 3;

              return (
                <div
                  key={p.productID}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "56px 1fr 190px 140px 120px 130px 80px",
                    padding: "16px 24px",
                    borderBottom: i < ranked.length - 1 ? "1px solid rgba(139,92,246,0.07)" : "none",
                    alignItems: "center",
                    gap: "8px",
                    background: isTop3 ? medal.bg : "transparent",
                    borderLeft: isTop3 ? `3px solid ${medal.color}` : "3px solid transparent",
                    transition: "background 0.2s, box-shadow 0.2s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = isTop3 ? `${medal.bg}` : "rgba(139,92,246,0.05)";
                    e.currentTarget.style.boxShadow = isTop3 ? `inset 0 0 40px ${medal.glow}` : "none";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = isTop3 ? medal.bg : "transparent";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* Rank badge */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {isTop3 ? (
                      <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: `linear-gradient(135deg, ${medal.color}22, ${medal.color}11)`, border: `1px solid ${medal.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", boxShadow: `0 4px 12px ${medal.glow}` }}>
                        {MEDAL[i]}
                      </div>
                    ) : (
                      <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, color: "rgba(255,255,255,0.3)" }}>
                        {i + 1}
                      </div>
                    )}
                  </div>

                  {/* Property info */}
                  <Link href={`/detail?property=${p.productID}`} legacyBehavior>
                    <a style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "13px", overflow: "hidden" }}>
                      <div style={{ position: "relative", flexShrink: 0 }}>
                        <img
                          src={imgSrc}
                          alt={p.title}
                          onError={(e) => { e.target.onerror = null; e.target.src = `/portfolio/portfolio-0${(i % 8) + 1}.jpg`; }}
                          style={{ width: "46px", height: "46px", borderRadius: "12px", objectFit: "cover", border: `1px solid ${medal.border}`, display: "block" }}
                        />
                        {isTop3 && (
                          <div style={{ position: "absolute", inset: 0, borderRadius: "12px", boxShadow: `0 0 12px ${medal.glow}`, pointerEvents: "none" }} />
                        )}
                      </div>
                      <div style={{ overflow: "hidden" }}>
                        <p style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "#f1f5f9", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.title || "Untitled"}</p>
                        <p style={{ margin: "2px 0 0", fontSize: "11px", color: "rgba(255,255,255,0.3)", whiteSpace: "nowrap" }}>#{p.productID} · on-chain</p>
                      </div>
                    </a>
                  </Link>

                  {/* Interest */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <span style={{ fontSize: "12px", fontWeight: 600, color: reviewerCount > 0 ? "#34d399" : "rgba(255,255,255,0.25)" }}>
                      {reviewerCount > 0 ? `${reviewerCount} interested` : "No activity"}
                    </span>
                    <div style={{ height: "5px", borderRadius: "3px", background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                      <div style={{ height: "100%", borderRadius: "3px", width: `${pct}%`, background: medal.bar, transition: "width 0.4s" }} />
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <span style={{ fontSize: "14px", fontWeight: 800, background: "linear-gradient(90deg,#00FFA3,#00D9FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                      {price.toFixed(3)}
                    </span>
                    <span style={{ fontSize: "11px", color: "#acacac", fontWeight: 600, marginLeft: "4px" }}>ETH</span>
                  </div>

                  {/* Category */}
                  <span style={{ display: "inline-block", background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.22)", borderRadius: "999px", padding: "4px 12px", fontSize: "11px", color: "#c4b5fd", fontWeight: 700, whiteSpace: "nowrap" }}>
                    {p.category || "—"}
                  </span>

                  {/* Owner */}
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "linear-gradient(135deg,#8b5cf6,#06b6d4)", flexShrink: 0 }} />
                    <span title={p.owner} style={{ fontFamily: "monospace", fontSize: "11px", color: "rgba(255,255,255,0.4)", whiteSpace: "nowrap" }}>{shortOwner}</span>
                  </div>

                  {/* In category */}
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "rgba(255,255,255,0.4)" }}>{categoryItems}</span>
                </div>
              );
            })}
          </div>
        ) : (
          /* ── Empty state ── */
          <div style={{ textAlign: "center", padding: "90px 24px", borderRadius: "24px", border: "1px dashed rgba(139,92,246,0.18)", background: "linear-gradient(135deg,rgba(139,92,246,0.04) 0%,rgba(251,191,36,0.03) 100%)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "300px", height: "300px", background: "radial-gradient(circle,rgba(139,92,246,0.08) 0%,transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
            <div style={{ width: "80px", height: "80px", borderRadius: "24px", background: "linear-gradient(135deg,rgba(251,191,36,0.15),rgba(139,92,246,0.1))", border: "1px solid rgba(251,191,36,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "36px", margin: "0 auto 24px", boxShadow: "0 8px 32px rgba(251,191,36,0.15)", position: "relative" }}>🏆</div>
            <h3 style={{ color: "#f1f5f9", marginBottom: "12px", fontSize: "1.5rem", fontWeight: 800 }}>No properties listed yet</h3>
            <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "14px", maxWidth: "380px", margin: "0 auto 32px", lineHeight: 1.8 }}>
              Be the first to list your property on-chain and claim the top spot.
            </p>
            <Link href="/create-property" legacyBehavior>
              <a style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "13px 32px", borderRadius: "999px", background: "linear-gradient(135deg,#8b5cf6,#06b6d4)", color: "#fff", fontWeight: 700, fontSize: "14px", textDecoration: "none", boxShadow: "0 6px 24px rgba(139,92,246,0.35)" }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                Create Listing
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default RankingTwo;
