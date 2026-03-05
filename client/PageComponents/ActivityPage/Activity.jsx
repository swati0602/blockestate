import Link from "next/link";
import React, { useState } from "react";
import { getTopCreators } from "../../utils";

const CATEGORIES = ["All", "Housing", "Rental", "Office", "Commercial", "Farmhouse", "Country"];

const Activity = ({ properties = [], totalReviews, popular }) => {
  const creators = getTopCreators(properties || []);
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? properties
      : properties.filter((p) => p.category === activeCategory);

  return (
    <div style={{ padding: "0 0 80px" }}>

      {/* Page bar */}
      <div style={{ padding: "28px 0 0", borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: "40px" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px", paddingBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(112,72,232,0.18)", border: "1px solid rgba(112,72,232,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <div>
                <h5 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700, background: "linear-gradient(90deg, #fff 40%, #a78bfa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Activity Feed
                </h5>
                <p style={{ margin: 0, fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>Live on-chain property activity</p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Link href="/" legacyBehavior>
                <a style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", textDecoration: "none" }}
                  onMouseEnter={(e) => (e.target.style.color = "#a78bfa")}
                  onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.4)")}>
                  Home
                </a>
              </Link>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
              <span style={{ color: "#7048e8", fontSize: "12px", fontWeight: 500 }}>Activity</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "32px", alignItems: "start" }}>

          {/* LEFT: activity feed */}
          <div>
            {/* Category filter */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: "6px 16px",
                    borderRadius: "999px",
                    border: activeCategory === cat ? "1px solid #7048e8" : "1px solid rgba(255,255,255,0.1)",
                    background: activeCategory === cat ? "rgba(112,72,232,0.2)" : "rgba(255,255,255,0.04)",
                    color: activeCategory === cat ? "#a78bfa" : "rgba(255,255,255,0.5)",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    width: "auto",
                    display: "inline-block",
                    whiteSpace: "nowrap",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Activity list */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {filtered && filtered.length > 0 ? (
                filtered.map((activity, i) => {
                  const imgSrc =
                    activity.image && activity.image.startsWith("http")
                      ? activity.image
                      : `/activity/activity-0${(i % 9) + 1}.jpg`;

                  return (
                    <div
                      key={activity.productID || i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        padding: "14px 18px",
                        background: "rgba(255,255,255,0.025)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        borderRadius: "14px",
                        transition: "border-color 0.2s, box-shadow 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "rgba(112,72,232,0.4)";
                        e.currentTarget.style.boxShadow = "0 4px 24px rgba(112,72,232,0.12)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <Link href={`/detail?property=${activity.productID}`} legacyBehavior>
                        <a style={{ flexShrink: 0 }}>
                          <img
                            src={imgSrc}
                            alt={activity.title}
                            onError={(e) => { e.target.onerror = null; e.target.src = `/activity/activity-0${(i % 9) + 1}.jpg`; }}
                            style={{ width: "56px", height: "56px", borderRadius: "12px", objectFit: "cover", border: "1px solid rgba(255,255,255,0.1)" }}
                          />
                        </a>
                      </Link>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <Link href={`/detail?property=${activity.productID}`} legacyBehavior>
                          <a style={{ textDecoration: "none" }}>
                            <h6 style={{ margin: "0 0 4px", fontSize: "0.9rem", fontWeight: 700, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {activity.title}
                            </h6>
                          </a>
                        </Link>
                        <p style={{ margin: "0 0 6px", fontSize: "11px", color: "rgba(255,255,255,0.4)", fontFamily: "monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {activity.owner ? `${activity.owner.slice(0, 10)}...${activity.owner.slice(-6)}` : "-"}
                        </p>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <Link href={`/category/${activity.category}`} legacyBehavior>
                            <a style={{
                              display: "inline-flex", alignItems: "center", gap: "4px",
                              background: "rgba(112,72,232,0.12)", border: "1px solid rgba(112,72,232,0.25)",
                              borderRadius: "999px", padding: "2px 10px",
                              fontSize: "11px", color: "#a78bfa", fontWeight: 600, textDecoration: "none",
                            }}>
                              {activity.category || "-"}
                            </a>
                          </Link>
                          <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>#{i + 1}</span>
                        </div>
                      </div>

                      <div style={{ flexShrink: 0, textAlign: "right" }}>
                        <span style={{
                          fontSize: "0.88rem", fontWeight: 700,
                          background: "linear-gradient(90deg, #00FFA3, #00D9FF)",
                          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                        }}>
                          {parseFloat(activity.price || 0).toFixed(4)} ETH
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div style={{ textAlign: "center", padding: "60px 24px", borderRadius: "16px", border: "1px dashed rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.02)" }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "12px" }}>
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem" }}>No activity found for this category.</p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", position: "sticky", top: "100px" }}>

            <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "20px" }}>
              <p style={{ margin: "0 0 16px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
                Analytics
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {[
                  { label: "Total Listings", value: properties.length, color: "#7048e8",
                    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7048e8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
                  { label: "Unique Owners", value: creators.length, color: "#00D9FF",
                    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00D9FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
                  { label: "Total Reviews", value: totalReviews ?? "-", color: "#00FFA3",
                    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00FFA3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
                ].map((s) => (
                  <div key={s.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: "rgba(255,255,255,0.03)", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      {s.icon}
                      <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)" }}>{s.label}</span>
                    </div>
                    <span style={{ fontSize: "1rem", fontWeight: 700, color: s.color }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {popular && (
              <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(112,72,232,0.25)", borderRadius: "16px", padding: "20px" }}>
                <p style={{ margin: "0 0 14px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
                  Top Rated
                </p>
                <Link href={{ pathname: "/detail", query: { property: `${popular}` } }} legacyBehavior>
                  <a style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                    padding: "11px 20px", borderRadius: "999px",
                    background: "linear-gradient(135deg, #7048e8, #00D9FF)",
                    color: "#fff", fontWeight: 700, fontSize: "13px", textDecoration: "none",
                    boxShadow: "0 4px 20px rgba(112,72,232,0.3)",
                  }}>
                    View Top Property
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                    </svg>
                  </a>
                </Link>
              </div>
            )}

            <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "20px" }}>
              <p style={{ margin: "0 0 14px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
                Quick Links
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {[
                  { label: "Explore All Properties", href: "/explor" },
                  { label: "Create a Listing", href: "/create-property" },
                  { label: "My Collection", href: "/collection" },
                  { label: "Rankings", href: "/ranking" },
                ].map((lnk) => (
                  <Link key={lnk.href} href={lnk.href} legacyBehavior>
                    <a style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "9px 14px", borderRadius: "10px",
                      background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
                      fontSize: "13px", color: "rgba(255,255,255,0.6)", textDecoration: "none",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(112,72,232,0.4)"; e.currentTarget.style.color = "#a78bfa"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
                    >
                      {lnk.label}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </a>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;
