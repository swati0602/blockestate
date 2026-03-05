import React from "react";
import Link from "next/link";
import { ethers } from "ethers";
import { Loader } from "../../PageComponents/Components";

const groupByDate = (properties) => {
  const groups = {};
  properties.forEach((p) => {
    const ts = Number(p.createdAt || 0);
    const date = ts
      ? new Date(ts * 1000).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
      : "Recently Listed";
    if (!groups[date]) groups[date] = [];
    groups[date].push(p);
  });
  return groups;
};

const formatPrice = (price) => {
  try { return parseFloat(ethers.utils.formatEther(price || "0")).toFixed(4); }
  catch { return parseFloat(price || 0).toFixed(4); }
};

const shortAddr = (addr) => addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "-";

const STATUS_BADGES = ["New", "Hot", "Featured", "On-Chain", "Verified"];

const UpcomingTwo = ({ properties = [], isLoading }) => {
  const groups = groupByDate(properties);
  const dateKeys = Object.keys(groups);

  if (isLoading) {
    return <div style={{ padding: "80px 0" }}><Loader /></div>;
  }

  return (
    <div style={{ padding: "40px 0 80px" }}>
      <div className="container">

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "36px" }}>
          <div>
            <p style={{ margin: "0 0 4px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7048e8" }}>Latest</p>
            <h3 style={{ margin: 0, fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 800, background: "linear-gradient(90deg, #fff 40%, #a78bfa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              New Listings
            </h3>
          </div>
          {dateKeys.length > 0 && (
            <span style={{ background: "rgba(112,72,232,0.15)", border: "1px solid rgba(112,72,232,0.35)", borderRadius: "999px", padding: "6px 16px", fontSize: "13px", color: "#a78bfa", fontWeight: 600 }}>
              {properties.length} listing{properties.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {dateKeys.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 24px", borderRadius: "20px", border: "1px dashed rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.02)" }}>
            <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(112,72,232,0.12)", border: "1px solid rgba(112,72,232,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <h4 style={{ color: "#f1f5f9", marginBottom: "10px", fontSize: "1.2rem", fontWeight: 700 }}>No properties listed yet</h4>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem", margin: "0 auto 28px", maxWidth: "340px", lineHeight: 1.7 }}>
              Be the first to tokenize your real estate on-chain.
            </p>
            <Link href="/create-property" legacyBehavior>
              <a style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 28px", borderRadius: "999px", background: "linear-gradient(135deg, #7048e8, #00D9FF)", color: "#fff", fontWeight: 700, fontSize: "14px", textDecoration: "none", boxShadow: "0 4px 20px rgba(112,72,232,0.35)" }}>
                Create Listing
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            {dateKeys.map((date) => (
              <div key={date}>
                {/* Date separator */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7048e8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    <span style={{ fontSize: "13px", fontWeight: 700, color: "#a78bfa" }}>{date}</span>
                  </div>
                  <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(112,72,232,0.3), transparent)" }} />
                  <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", fontWeight: 600 }}>
                    {groups[date].length} listing{groups[date].length !== 1 ? "s" : ""}
                  </span>
                </div>

                {/* Table */}
                <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", overflow: "hidden" }}>
                  {/* Header */}
                  <div style={{ display: "grid", gridTemplateColumns: "44px 1fr 130px 130px 180px 160px 90px", padding: "12px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.03)", gap: "16px", alignItems: "center" }}>
                    {["#", "Property", "Category", "Price", "Interest", "Owner", "Status"].map((h) => (
                      <span key={h} style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", whiteSpace: "nowrap" }}>{h}</span>
                    ))}
                  </div>

                  {/* Rows */}
                  {groups[date].map((p, i) => {
                    const price = formatPrice(p.price);
                    const usd = (parseFloat(price) * 2400).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    const reviewerCount = p.reviewers?.length || 0;
                    const pct = Math.min(reviewerCount * 20, 100);
                    const imgSrc = p.image?.startsWith("http") ? p.image : `/portfolio/portfolio-0${(i % 8) + 1}.jpg`;
                    const badge = STATUS_BADGES[i % STATUS_BADGES.length];
                    const badgeStyles = {
                      Hot:      { color: "#ff6b6b", bg: "rgba(255,107,107,0.12)", border: "rgba(255,107,107,0.3)" },
                      Featured: { color: "#00D9FF", bg: "rgba(0,217,255,0.1)",    border: "rgba(0,217,255,0.25)" },
                      Verified: { color: "#00FFA3", bg: "rgba(0,255,163,0.1)",    border: "rgba(0,255,163,0.25)" },
                      "On-Chain":{ color: "#fbbf24", bg: "rgba(251,191,36,0.1)",  border: "rgba(251,191,36,0.3)" },
                      New:      { color: "#a78bfa", bg: "rgba(112,72,232,0.12)",  border: "rgba(112,72,232,0.3)" },
                    };
                    const bs = badgeStyles[badge] || badgeStyles.New;

                    return (
                      <div
                        key={p.productID}
                        style={{ display: "grid", gridTemplateColumns: "44px 1fr 130px 130px 180px 160px 90px", padding: "16px 20px", borderBottom: i < groups[date].length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", alignItems: "center", gap: "16px", transition: "background 0.2s" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(112,72,232,0.06)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        {/* # */}
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.4)" }}>{i + 1}</span>
                        </div>

                        {/* Property */}
                        <Link href={`/detail?property=${p.productID}`} legacyBehavior>
                          <a style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
                            <img
                              src={imgSrc}
                              alt={p.title}
                              onError={(e) => { e.target.onerror = null; e.target.src = `/portfolio/portfolio-0${(i % 8) + 1}.jpg`; }}
                              style={{ width: "48px", height: "48px", borderRadius: "12px", objectFit: "cover", border: "1px solid rgba(255,255,255,0.1)", flexShrink: 0 }}
                            />
                            <div style={{ minWidth: 0 }}>
                              <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                {p.title || "Untitled Property"}
                              </div>
                              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", display: "flex", alignItems: "center", gap: "4px", marginTop: "3px" }}>
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                                </svg>
                                {p.location || p.state || "On-Chain"}
                              </div>
                            </div>
                          </a>
                        </Link>

                        {/* Category */}
                        <span style={{ display: "inline-flex", alignItems: "center", background: "rgba(112,72,232,0.12)", border: "1px solid rgba(112,72,232,0.25)", borderRadius: "999px", padding: "5px 14px", fontSize: "11px", color: "#a78bfa", fontWeight: 600, whiteSpace: "nowrap" }}>
                          {p.category || "General"}
                        </span>

                        {/* Price */}
                        <div>
                          <div style={{ fontSize: "0.9rem", fontWeight: 700, background: "linear-gradient(90deg, #00FFA3, #00D9FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                            {price} ETH
                          </div>
                          <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", marginTop: "2px" }}>~${usd} USD</div>
                        </div>

                        {/* Interest */}
                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                            <span style={{ fontSize: "11px", fontWeight: 600, color: reviewerCount > 0 ? "#00FFA3" : "rgba(255,255,255,0.25)" }}>
                              {reviewerCount > 0 ? `${reviewerCount} interested` : "No interest yet"}
                            </span>
                            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>{pct}%</span>
                          </div>
                          <div style={{ height: "5px", borderRadius: "4px", background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                            <div style={{ height: "100%", borderRadius: "4px", width: `${pct}%`, background: pct > 0 ? "linear-gradient(90deg, #7048e8, #a78bfa)" : "transparent", transition: "width 0.6s ease" }} />
                          </div>
                        </div>

                        {/* Owner */}
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "linear-gradient(135deg, #7048e8, #00D9FF)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                            </svg>
                          </div>
                          <span title={p.owner} style={{ fontFamily: "monospace", fontSize: "11px", color: "rgba(255,255,255,0.45)" }}>
                            {shortAddr(p.owner)}
                          </span>
                        </div>

                        {/* Status badge */}
                        <div>
                          <span style={{ display: "inline-flex", alignItems: "center", background: bs.bg, border: `1px solid ${bs.border}`, borderRadius: "999px", padding: "4px 12px", fontSize: "10px", color: bs.color, fontWeight: 700, letterSpacing: "0.06em", whiteSpace: "nowrap" }}>
                            {badge}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingTwo;
