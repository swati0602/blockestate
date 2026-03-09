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

  const totalValue = properties.reduce((s, p) => s + parseFloat(p.price || 0), 0);

  return (
    <div style={{ background: "#0a0a14" }}>

      {/* ── Hero Banner ── */}
      <div style={{ position: "relative", overflow: "hidden", padding: "70px 0 60px" }}>
        {/* Glow blobs */}
        <div style={{ position: "absolute", top: "-80px", left: "8%", width: "450px", height: "450px", background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-60px", right: "6%", width: "380px", height: "380px", background: "radial-gradient(circle, rgba(0,217,255,0.07) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "20px", right: "30%", width: "260px", height: "260px", background: "radial-gradient(circle, rgba(52,211,153,0.06) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        {/* Grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          {/* Breadcrumb */}
          <nav style={{ marginBottom: "28px" }}>
            <ol style={{ display: "inline-flex", alignItems: "center", gap: "8px", margin: 0, padding: "7px 16px", listStyle: "none", background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.15)", borderRadius: "30px" }}>
              <li style={{ display: "flex", alignItems: "center" }}>
                <Link href="/" legacyBehavior><a style={{ color: "#8b5cf6", textDecoration: "none", fontSize: "12px", fontWeight: 500, lineHeight: 1 }}>Home</a></Link>
              </li>
              <li style={{ display: "flex", alignItems: "center", color: "rgba(139,92,246,0.4)", fontSize: "13px", lineHeight: 1 }}>›</li>
              <li style={{ display: "flex", alignItems: "center", color: "#acacac", fontSize: "12px", lineHeight: 1 }}>Activity</li>
            </ol>
          </nav>

          {/* Hero text + icon */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}>
            <div>
              <p style={{ margin: "0 0 10px", fontSize: "11px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "#8b5cf6", opacity: 0.9 }}>BlockEstate — Live Feed</p>
              <h1 style={{ margin: 0, fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 800, lineHeight: 1.1, background: "linear-gradient(120deg, #ffffff 30%, #34d399 65%, #a78bfa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Activity Feed
              </h1>
              <p style={{ margin: "14px 0 0", fontSize: "15px", color: "rgba(255,255,255,0.45)", maxWidth: "480px", lineHeight: 1.7 }}>
                Real-time on-chain property listings — browse, filter by category, and discover what's happening now.
              </p>
            </div>
            <div style={{ width: "72px", height: "72px", borderRadius: "20px", background: "linear-gradient(135deg, rgba(52,211,153,0.18), rgba(139,92,246,0.12))", border: "1px solid rgba(52,211,153,0.3)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 32px rgba(52,211,153,0.18)", flexShrink: 0 }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
          </div>

          {/* Stats strip */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", marginTop: "36px" }}>
            {[
              { label: "Listings", value: properties.length, gradient: "linear-gradient(90deg,#fff,#a78bfa)" },
              { label: "Unique Owners", value: creators.length, gradient: "linear-gradient(90deg,#00FFA3,#00D9FF)" },
              { label: "Total Reviews", value: totalReviews ?? "—", gradient: "linear-gradient(90deg,#fbbf24,#f97316)" },
              { label: "Total Value", value: `${totalValue.toFixed(2)} ETH`, gradient: "linear-gradient(90deg,#34d399,#06b6d4)" },
            ].map((s) => (
              <div key={s.label} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "20px", fontWeight: 800, background: s.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{s.value}</span>
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", fontWeight: 600 }}>{s.label}</span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{ marginTop: "36px", height: "1px", background: "linear-gradient(90deg, rgba(52,211,153,0.35) 0%, rgba(139,92,246,0.15) 50%, transparent 100%)" }} />
        </div>
      </div>

      {/* ── Main content ── */}
      <div style={{ padding: "48px 0 90px" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "32px", alignItems: "start" }}>

            {/* LEFT: activity feed */}
            <div>
              {/* Category filter */}
              <div style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", gap: "6px", overflowX: "auto", marginBottom: "28px", paddingBottom: "4px" }}>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      padding: "4px 12px",
                      borderRadius: "999px",
                      border: activeCategory === cat ? "1px solid rgba(139,92,246,0.6)" : "1px solid rgba(255,255,255,0.08)",
                      background: activeCategory === cat ? "rgba(139,92,246,0.18)" : "rgba(255,255,255,0.03)",
                      color: activeCategory === cat ? "#c4b5fd" : "rgba(255,255,255,0.4)",
                      fontSize: "11px",
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "all 0.2s",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                      width: "auto",
                      display: "inline-block",
                      lineHeight: "1.6",
                      boxShadow: activeCategory === cat ? "0 0 12px rgba(139,92,246,0.2)" : "none",
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Results count */}
              {filtered.length > 0 && (
                <p style={{ margin: "0 0 16px", fontSize: "12px", color: "rgba(255,255,255,0.3)", fontWeight: 600 }}>
                  Showing <span style={{ color: "#8b5cf6" }}>{filtered.length}</span> {activeCategory !== "All" ? activeCategory : ""} propert{filtered.length !== 1 ? "ies" : "y"}
                </p>
              )}

              {/* Activity list */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
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
                          padding: "16px 20px",
                          background: "#0f0f1a",
                          border: "1px solid rgba(139,92,246,0.1)",
                          borderLeft: "3px solid rgba(139,92,246,0.35)",
                          borderRadius: "14px",
                          transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "rgba(139,92,246,0.4)";
                          e.currentTarget.style.borderLeftColor = "#8b5cf6";
                          e.currentTarget.style.boxShadow = "0 6px 28px rgba(139,92,246,0.14)";
                          e.currentTarget.style.transform = "translateX(3px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "rgba(139,92,246,0.1)";
                          e.currentTarget.style.borderLeftColor = "rgba(139,92,246,0.35)";
                          e.currentTarget.style.boxShadow = "none";
                          e.currentTarget.style.transform = "translateX(0)";
                        }}
                      >
                        {/* Rank number */}
                        <div style={{ flexShrink: 0, width: "28px", textAlign: "center" }}>
                          <span style={{ fontSize: "11px", fontWeight: 700, color: "rgba(139,92,246,0.5)" }}>#{i + 1}</span>
                        </div>

                        {/* Thumbnail */}
                        <Link href={`/detail?property=${activity.productID}`} legacyBehavior>
                          <a style={{ flexShrink: 0 }}>
                            <div style={{ position: "relative", width: "60px", height: "60px" }}>
                              <img
                                src={imgSrc}
                                alt={activity.title}
                                onError={(e) => { e.target.onerror = null; e.target.src = `/activity/activity-0${(i % 9) + 1}.jpg`; }}
                                style={{ width: "60px", height: "60px", borderRadius: "12px", objectFit: "cover", border: "1px solid rgba(139,92,246,0.2)", display: "block" }}
                              />
                            </div>
                          </a>
                        </Link>

                        {/* Info */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <Link href={`/detail?property=${activity.productID}`} legacyBehavior>
                            <a style={{ textDecoration: "none" }}>
                              <h6 style={{ margin: "0 0 5px", fontSize: "14px", fontWeight: 700, color: "#f1f5f9", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                {activity.title}
                              </h6>
                            </a>
                          </Link>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                            <Link href={`/category/${activity.category}`} legacyBehavior>
                              <a style={{ display: "inline-flex", alignItems: "center", background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.22)", borderRadius: "999px", padding: "2px 10px", fontSize: "11px", color: "#c4b5fd", fontWeight: 700, textDecoration: "none" }}>
                                {activity.category || "—"}
                              </a>
                            </Link>
                            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", fontFamily: "monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "160px" }}>
                              {activity.owner ? `${activity.owner.slice(0, 8)}…${activity.owner.slice(-5)}` : "—"}
                            </span>
                          </div>
                        </div>

                        {/* Price */}
                        <div style={{ flexShrink: 0, textAlign: "right" }}>
                          <p style={{ margin: 0, fontSize: "15px", fontWeight: 800, background: "linear-gradient(90deg,#00FFA3,#00D9FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                            {parseFloat(activity.price || 0).toFixed(3)}
                          </p>
                          <p style={{ margin: 0, fontSize: "11px", color: "rgba(255,255,255,0.3)", fontWeight: 600 }}>ETH</p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div style={{ textAlign: "center", padding: "80px 24px", borderRadius: "20px", border: "1px dashed rgba(139,92,246,0.18)", background: "linear-gradient(135deg,rgba(139,92,246,0.04),rgba(52,211,153,0.03))", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "260px", height: "260px", background: "radial-gradient(circle,rgba(139,92,246,0.07) 0%,transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
                    <div style={{ width: "64px", height: "64px", borderRadius: "18px", background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.22)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(139,92,246,0.6)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                      </svg>
                    </div>
                    <h4 style={{ color: "#f1f5f9", marginBottom: "10px", fontSize: "1.2rem", fontWeight: 700 }}>No activity in this category</h4>
                    <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "14px", margin: 0 }}>Try selecting a different category above.</p>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT: sidebar */}
            <div style={{ display: "flex", flexDirection: "column", gap: "18px", position: "sticky", top: "100px" }}>

              {/* Analytics card */}
              <div style={{ background: "#0f0f1a", border: "1px solid rgba(139,92,246,0.12)", borderRadius: "18px", overflow: "hidden" }}>
                <div style={{ padding: "14px 20px", background: "rgba(139,92,246,0.06)", borderBottom: "1px solid rgba(139,92,246,0.1)" }}>
                  <p style={{ margin: 0, fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#8b5cf6" }}>Analytics</p>
                </div>
                <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                  {[
                    { label: "Total Listings", value: properties.length, gradient: "linear-gradient(90deg,#a78bfa,#8b5cf6)",
                      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
                    { label: "Unique Owners", value: creators.length, gradient: "linear-gradient(90deg,#00FFA3,#00D9FF)",
                      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00D9FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
                    { label: "Total Reviews", value: totalReviews ?? "—", gradient: "linear-gradient(90deg,#fbbf24,#f97316)",
                      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
                    { label: "Total Value", value: `${totalValue.toFixed(2)} ETH`, gradient: "linear-gradient(90deg,#34d399,#06b6d4)",
                      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
                  ].map((s) => (
                    <div key={s.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: "rgba(139,92,246,0.04)", borderRadius: "10px", border: "1px solid rgba(139,92,246,0.08)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                        {s.icon}
                        <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>{s.label}</span>
                      </div>
                      <span style={{ fontSize: "13px", fontWeight: 800, background: s.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top rated CTA */}
              {popular && (
                <div style={{ background: "#0f0f1a", border: "1px solid rgba(139,92,246,0.2)", borderRadius: "18px", overflow: "hidden" }}>
                  <div style={{ padding: "14px 20px", background: "rgba(139,92,246,0.07)", borderBottom: "1px solid rgba(139,92,246,0.1)" }}>
                    <p style={{ margin: 0, fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#8b5cf6" }}>⭐ Top Rated</p>
                  </div>
                  <div style={{ padding: "16px 20px" }}>
                    <p style={{ margin: "0 0 14px", fontSize: "13px", color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>The highest-rated property on the platform. Don't miss it.</p>
                    <Link href={{ pathname: "/detail", query: { property: `${popular}` } }} legacyBehavior>
                      <a style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "11px 20px", borderRadius: "999px", background: "linear-gradient(135deg,#8b5cf6,#06b6d4)", color: "#fff", fontWeight: 700, fontSize: "13px", textDecoration: "none", boxShadow: "0 6px 20px rgba(139,92,246,0.3)", transition: "opacity 0.2s, transform 0.2s" }}
                        onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                        onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
                      >
                        View Top Property
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                        </svg>
                      </a>
                    </Link>
                  </div>
                </div>
              )}

              {/* Quick links */}
              <div style={{ background: "#0f0f1a", border: "1px solid rgba(139,92,246,0.1)", borderRadius: "18px", overflow: "hidden" }}>
                <div style={{ padding: "14px 20px", background: "rgba(139,92,246,0.04)", borderBottom: "1px solid rgba(139,92,246,0.08)" }}>
                  <p style={{ margin: 0, fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#8b5cf6" }}>Quick Links</p>
                </div>
                <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  {[
                    { label: "Explore All Properties", href: "/explor", icon: "🏠" },
                    { label: "Create a Listing", href: "/create-property", icon: "✚" },
                    { label: "My Collection", href: "/collection", icon: "❤️" },
                    { label: "Rankings", href: "/ranking", icon: "🏆" },
                  ].map((lnk) => (
                    <Link key={lnk.href} href={lnk.href} legacyBehavior>
                      <a style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderRadius: "10px", background: "rgba(139,92,246,0.04)", border: "1px solid rgba(139,92,246,0.07)", fontSize: "13px", color: "rgba(255,255,255,0.55)", textDecoration: "none", transition: "all 0.2s" }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(139,92,246,0.35)"; e.currentTarget.style.color = "#c4b5fd"; e.currentTarget.style.background = "rgba(139,92,246,0.09)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(139,92,246,0.07)"; e.currentTarget.style.color = "rgba(255,255,255,0.55)"; e.currentTarget.style.background = "rgba(139,92,246,0.04)"; }}
                      >
                        <span style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                          <span style={{ fontSize: "14px" }}>{lnk.icon}</span>
                          {lnk.label}
                        </span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6"/>
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
    </div>
  );
};

export default Activity;
