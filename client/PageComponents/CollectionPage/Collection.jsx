import React from "react";
import Link from "next/link";
import { Loader } from "../../PageComponents/Components";

const Collection = ({ likedProperties = [], isLoading, likedIds = [] }) => {
  if (isLoading) {
    return (
      <div style={{
        minHeight: "40vh", display: "flex", alignItems: "center",
        justifyContent: "center", background: "#0a0a14", padding: "80px 0",
      }}>
        <div style={{ textAlign: "center" }}>
          <Loader />
          <p style={{ color: "#acacac", marginTop: "16px", fontSize: "14px" }}>Loading your collection...</p>
        </div>
      </div>
    );
  }

  const hasLiked = likedProperties.length > 0;

  return (
    <div style={{ background: "#0a0a14", padding: "48px 0 90px" }}>
      <div className="container">

        {/* Stats bar */}
        {hasLiked && (
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: "12px",
            background: "#0f0f1a",
            border: "1px solid rgba(139,92,246,0.12)",
            borderRadius: "14px",
            padding: "16px 24px",
            marginBottom: "36px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
              <div>
                <p style={{ margin: 0, fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#acacac" }}>Saved Properties</p>
                <p style={{
                  margin: "2px 0 0", fontSize: "22px", fontWeight: 800,
                  background: "linear-gradient(90deg, #fff, #a78bfa)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>{likedProperties.length}</p>
              </div>
              <div style={{ width: "1px", height: "36px", background: "rgba(139,92,246,0.15)" }} />
              <div>
                <p style={{ margin: 0, fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#acacac" }}>Total Value</p>
                <p style={{
                  margin: "2px 0 0", fontSize: "22px", fontWeight: 800,
                  background: "linear-gradient(90deg, #00FFA3, #00D9FF)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>{ likedProperties.reduce((s, p) => s + parseFloat(p.price || 0), 0).toFixed(3) } ETH</p>
              </div>
            </div>
            <Link href="/explor" legacyBehavior>
              <a style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                padding: "9px 20px", borderRadius: "999px",
                background: "rgba(139,92,246,0.12)",
                border: "1px solid rgba(139,92,246,0.25)",
                color: "#a78bfa", fontWeight: 600, fontSize: "13px",
                textDecoration: "none", transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(139,92,246,0.22)"; e.currentTarget.style.borderColor = "rgba(139,92,246,0.5)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(139,92,246,0.12)"; e.currentTarget.style.borderColor = "rgba(139,92,246,0.25)"; }}
              >
                + Explore More
              </a>
            </Link>
          </div>
        )}

        {hasLiked ? (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
            gap: "28px",
          }}>
            {likedProperties.map((el, i) => (
              <Link key={el.productID} href={`/detail?property=${el.productID}`} legacyBehavior>
                <a style={{ textDecoration: "none", display: "block" }}>
                  <div
                    style={{
                      background: "#0f0f1a",
                      border: "1px solid rgba(139,92,246,0.12)",
                      borderRadius: "18px",
                      overflow: "hidden",
                      transition: "transform 0.25s, border-color 0.25s, box-shadow 0.25s",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-6px)";
                      e.currentTarget.style.borderColor = "rgba(139,92,246,0.45)";
                      e.currentTarget.style.boxShadow = "0 20px 50px rgba(139,92,246,0.2)";
                      const img = e.currentTarget.querySelector("img");
                      if (img) img.style.transform = "scale(1.06)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.borderColor = "rgba(139,92,246,0.12)";
                      e.currentTarget.style.boxShadow = "none";
                      const img = e.currentTarget.querySelector("img");
                      if (img) img.style.transform = "scale(1)";
                    }}
                  >
                    {/* Image */}
                    <div style={{ position: "relative", height: "210px", overflow: "hidden", background: "#080810" }}>
                      <img
                        src={el.image && el.image.startsWith("http") ? el.image : `/portfolio/portfolio-0${(i % 8) + 1}.jpg`}
                        alt={el.title}
                        onError={(e) => { e.target.onerror = null; e.target.src = `/portfolio/portfolio-0${(i % 8) + 1}.jpg`; }}
                        style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                      />
                      {/* Gradient overlay */}
                      <div style={{
                        position: "absolute", inset: 0,
                        background: "linear-gradient(to top, rgba(15,15,26,0.85) 0%, rgba(15,15,26,0.1) 50%, transparent 100%)",
                      }} />
                      {/* Category badge */}
                      <span style={{
                        position: "absolute", top: "14px", left: "14px",
                        background: "rgba(10,10,20,0.75)", backdropFilter: "blur(10px)",
                        border: "1px solid rgba(139,92,246,0.3)",
                        borderRadius: "999px", padding: "4px 12px",
                        fontSize: "11px", color: "#c4b5fd", fontWeight: 700,
                        letterSpacing: "0.5px",
                      }}>{el.category || "Property"}</span>
                      {/* Heart badge */}
                      <span style={{
                        position: "absolute", top: "14px", right: "14px",
                        background: "rgba(239,68,68,0.9)",
                        borderRadius: "999px", width: "30px", height: "30px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "13px", boxShadow: "0 2px 10px rgba(239,68,68,0.4)",
                      }}>❤️</span>
                      {/* Price pinned on image bottom */}
                      <div style={{
                        position: "absolute", bottom: "14px", right: "14px",
                        background: "rgba(10,10,20,0.8)", backdropFilter: "blur(10px)",
                        border: "1px solid rgba(0,217,255,0.25)",
                        borderRadius: "10px", padding: "5px 12px",
                      }}>
                        <span style={{
                          fontSize: "14px", fontWeight: 800,
                          background: "linear-gradient(90deg, #00FFA3, #00D9FF)",
                          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                        }}>{parseFloat(el.price).toFixed(3)} ETH</span>
                      </div>
                    </div>

                    {/* Info */}
                    <div style={{ padding: "18px 20px 20px" }}>
                      <h6 style={{
                        margin: "0 0 8px", fontSize: "1rem", fontWeight: 700,
                        color: "#f1f5f9", whiteSpace: "nowrap",
                        overflow: "hidden", textOverflow: "ellipsis",
                      }}>{el.title}</h6>

                      {/* Location row */}
                      <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "14px" }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(139,92,246,0.6)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                        </svg>
                        <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.38)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {el.address || "On-Chain Property"}
                        </span>
                      </div>

                      {/* Divider */}
                      <div style={{ height: "1px", background: "rgba(139,92,246,0.1)", marginBottom: "14px" }} />

                      {/* Footer row */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                          <div style={{
                            width: "26px", height: "26px", borderRadius: "50%",
                            background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: "11px", fontWeight: 700, color: "#fff",
                          }}>#{el.productID}</div>
                          <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", fontWeight: 500 }}>Token ID</span>
                        </div>
                        <span style={{
                          display: "inline-flex", alignItems: "center", gap: "4px",
                          fontSize: "11px", fontWeight: 700, color: "#8b5cf6",
                          background: "rgba(139,92,246,0.1)",
                          border: "1px solid rgba(139,92,246,0.2)",
                          borderRadius: "999px", padding: "3px 10px",
                        }}>View Details →</span>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        ) : (
          /* ── Empty state ── */
          <div style={{
            textAlign: "center",
            padding: "90px 24px",
            borderRadius: "24px",
            border: "1px dashed rgba(139,92,246,0.18)",
            background: "linear-gradient(135deg, rgba(139,92,246,0.04) 0%, rgba(6,182,212,0.03) 100%)",
            position: "relative", overflow: "hidden",
          }}>
            {/* Background glow */}
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
              width: "300px", height: "300px",
              background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
              borderRadius: "50%", pointerEvents: "none",
            }} />
            {/* Icon */}
            <div style={{
              width: "80px", height: "80px", borderRadius: "24px",
              background: "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(6,182,212,0.08))",
              border: "1px solid rgba(139,92,246,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "36px", margin: "0 auto 24px",
              boxShadow: "0 8px 32px rgba(139,92,246,0.15)",
              position: "relative",
            }}>🏠</div>
            <h3 style={{
              color: "#f1f5f9", marginBottom: "12px",
              fontSize: "1.5rem", fontWeight: 800,
            }}>Your collection is empty</h3>
            <p style={{
              color: "rgba(255,255,255,0.38)", fontSize: "14px",
              maxWidth: "380px", margin: "0 auto 32px", lineHeight: 1.8,
            }}>
              Tap the ♥ icon on any property card while browsing to save it here instantly.
            </p>
            <Link href="/explor" legacyBehavior>
              <a style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "13px 32px", borderRadius: "999px",
                background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                color: "#fff", fontWeight: 700, fontSize: "14px",
                textDecoration: "none",
                boxShadow: "0 6px 24px rgba(139,92,246,0.35)",
                transition: "opacity 0.2s, transform 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                Explore Properties
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

export default Collection;
