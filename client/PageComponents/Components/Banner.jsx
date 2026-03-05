import React from "react";
import Link from "next/link";

const CATEGORIES = [
  { name: "Housing",    link: "/housing",    icon: "feather-home",        color: "#7048e8", light: "rgba(112,72,232,0.15)" },
  { name: "Office",     link: "/office",     icon: "feather-briefcase",   color: "#0ea5e9", light: "rgba(14,165,233,0.15)"  },
  { name: "Farmhouse",  link: "/farmhouse",  icon: "feather-sun",         color: "#f59e0b", light: "rgba(245,158,11,0.15)"  },
  { name: "Rental",     link: "/rental",     icon: "feather-key",         color: "#10b981", light: "rgba(16,185,129,0.15)", svg: true  },
  { name: "Commercial", link: "/commercial", icon: "feather-shopping-bag",color: "#ef4444", light: "rgba(239,68,68,0.15)"   },
  { name: "Country",    link: "/country",    icon: "feather-map-pin",     color: "#a78bfa", light: "rgba(167,139,250,0.15)" },
];

const Banner = () => {
  return (
    <>
      {/* ── HERO ── */}
      <div
        style={{
          position: "relative",
          minHeight: "88vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          background: "linear-gradient(135deg, #0d0d1a 0%, #1a1a2e 60%, #16213e 100%)",
          paddingTop: "100px",
          paddingBottom: "60px",
        }}
      >
        {/* background blob */}
        <div style={{
          position: "absolute", top: "-200px", right: "-200px",
          width: "600px", height: "600px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(112,72,232,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "-150px", left: "5%",
          width: "400px", height: "400px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,200,150,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div class="container" style={{ position: "relative", zIndex: 1 }}>
          <div class="row align-items-center g-5">

            {/* LEFT – copy */}
            <div class="col-lg-6">
              {/* pill */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "rgba(112,72,232,0.15)", border: "1px solid rgba(112,72,232,0.4)",
                borderRadius: "50px", padding: "6px 16px", marginBottom: "28px",
              }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#7048e8", display: "inline-block" }} />
                <span style={{ color: "#a78bfa", fontSize: "13px", fontWeight: 600, letterSpacing: "0.5px" }}>
                  Blockchain-Powered Real Estate
                </span>
              </div>

              <h1 style={{
                fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                fontWeight: 800,
                lineHeight: 1.15,
                color: "#fff",
                marginBottom: "22px",
              }}>
                Explore the best<br />
                <span style={{ background: "linear-gradient(90deg,#7048e8,#00c896)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  properties
                </span>{" "}with<br />expert services.
              </h1>

              <p style={{ color: "#a0aec0", fontSize: "1.05rem", lineHeight: 1.75, maxWidth: "480px", marginBottom: "36px" }}>
                Discover a diverse range of premium properties — from luxurious apartments to
                spacious villas — secured transparently on the blockchain.
              </p>

              {/* CTAs */}
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "48px" }}>
                <Link legacyBehavior href="/explor">
                  <a style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "14px 34px",
                    borderRadius: "50px",
                    background: "linear-gradient(135deg, #7048e8 0%, #4f9cf9 100%)",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "1rem",
                    letterSpacing: "0.04em",
                    boxShadow: "0 4px 24px rgba(112,72,232,0.5)",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    textDecoration: "none",
                    border: "none",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 8px 32px rgba(112,72,232,0.65)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 4px 24px rgba(112,72,232,0.5)"; }}>
                    View Properties →
                  </a>
                </Link>
                <Link legacyBehavior href="/create">
                  <a style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "14px 34px",
                    borderRadius: "50px",
                    background: "transparent",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "1rem",
                    letterSpacing: "0.04em",
                    border: "2px solid rgba(255,255,255,0.25)",
                    backdropFilter: "blur(6px)",
                    transition: "transform 0.2s, border-color 0.2s, background 0.2s",
                    textDecoration: "none",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.6)"; e.currentTarget.style.background="rgba(255,255,255,0.08)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.25)"; e.currentTarget.style.background="transparent"; }}>
                    List Your Property
                  </a>
                </Link>
              </div>

            </div>

            {/* RIGHT – hero image card */}
            <div class="col-lg-6" style={{ position: "relative" }}>
              <div style={{ position: "relative", borderRadius: "20px", overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.5)" }}>
                <img
                  src="/banner/h-three-banner-01.jpg"
                  alt="Featured Property"
                  style={{ width: "100%", height: "460px", objectFit: "cover", display: "block" }}
                />
                {/* gradient overlay */}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)" }} />
                {/* bottom info card */}
                <div style={{
                  position: "absolute", bottom: "24px", left: "24px", right: "24px",
                  background: "rgba(13,13,26,0.85)", backdropFilter: "blur(12px)",
                  borderRadius: "12px", padding: "16px 20px",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}>
                  <div>
                    <div style={{ color: "#fff", fontWeight: 700, fontSize: "1rem" }}>Premium Estate</div>
                    <div style={{ color: "#a0aec0", fontSize: "0.82rem", marginTop: "2px" }}>
                      <i class="feather-map-pin" style={{ marginRight: "4px" }} />Blockchain Verified
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ color: "#7048e8", fontWeight: 800, fontSize: "1.1rem" }}>Buy / Sell</div>
                    <div style={{ color: "#00c896", fontSize: "0.8rem" }}>
                      <i class="feather-shield" style={{ marginRight: "4px" }} />Secured on-chain
                    </div>
                  </div>
                </div>
              </div>

              {/* floating badge */}
              <div style={{
                position: "absolute", top: "24px", right: "24px",
                background: "linear-gradient(135deg,#7048e8,#9f7aea)",
                borderRadius: "10px", padding: "10px 18px",
                boxShadow: "0 8px 24px rgba(112,72,232,0.4)",
                textAlign: "center",
              }}>
                <div style={{ color: "#fff", fontWeight: 800, fontSize: "1.1rem" }}>ETH</div>
                <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.72rem" }}>Crypto Payments</div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── CATEGORY CARDS ── */}
      <div style={{ background: "#0d0d1a", padding: "60px 0" }}>
        <div class="container">
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <p style={{ color: "#7048e8", fontSize: "20px", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>
              Property Categories
            </p>
            <h3 style={{ color: "#fff", fontSize: "clamp(2.1rem,3vw,2.7rem)", fontWeight: 700 }}>
              Explore best properties with expert services.
            </h3>
          </div>
          <div class="row g-4">
            {CATEGORIES.map((cat, i) => (
              <div key={i} class="col-xl-2 col-lg-4 col-md-4 col-sm-6 col-6">
                <Link legacyBehavior href={{ pathname: `/category${cat.link}`, query: { name: cat.name } }}>
                  <a style={{ display: "block", textDecoration: "none" }}>
                    <div style={{
                      position: "relative", borderRadius: "14px", overflow: "hidden",
                      aspectRatio: "3/4", cursor: "pointer",
                      background: `linear-gradient(145deg, #12122a, #1a1a35)`,
                      border: `1px solid ${cat.color}33`,
                      display: "flex", flexDirection: "column",
                      alignItems: "center", justifyContent: "center",
                      transition: "transform 0.3s, box-shadow 0.3s, border-color 0.3s",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-6px)";
                      e.currentTarget.style.boxShadow = `0 16px 40px ${cat.color}55`;
                      e.currentTarget.style.borderColor = cat.color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "";
                      e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.4)";
                      e.currentTarget.style.borderColor = `${cat.color}33`;
                    }}
                    >
                      {/* glow blob */}
                      <div style={{
                        position: "absolute", width: "120px", height: "120px",
                        borderRadius: "50%", background: cat.light,
                        filter: "blur(30px)", top: "20%",
                        pointerEvents: "none",
                      }} />

                      {/* big icon circle */}
                      <div style={{
                        width: "72px", height: "72px", borderRadius: "50%",
                        background: cat.light,
                        border: `1.5px solid ${cat.color}66`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        marginBottom: "18px", position: "relative",
                      }}>
                        {cat.svg ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"
                            fill="none" stroke={cat.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="7.5" cy="15.5" r="5.5"/>
                            <path d="M21 2l-9.6 9.6"/>
                            <path d="M15.5 7.5l3 3L22 7l-3-3"/>
                          </svg>
                        ) : (
                          <i class={cat.icon} style={{ color: cat.color, fontSize: "30px" }} />
                        )}
                      </div>

                      {/* label */}
                      <div style={{ color: "#fff", fontWeight: 700, fontSize: "1.55rem", textAlign: "center", position: "relative" }}>
                        {cat.name}
                      </div>
                      <div style={{ color: "#a0aec0", fontSize: "1.25rem", marginTop: "4px", position: "relative" }}>
                        View listings
                      </div>
                    </div>
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
