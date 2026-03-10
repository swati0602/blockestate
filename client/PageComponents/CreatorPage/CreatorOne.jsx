import React, { useState } from "react";
import Link from "next/link";

const STATIC = [
  { name: "JOne Lee",  volume: "$900K",   count: 3,  img: "/client/client-3.png",  verified: false },
  { name: "Malinga",   volume: "$2.4M",   count: 8,  img: "/client/client-4.png",  verified: true  },
  { name: "Favis",     volume: "$290K",   count: 1,  img: "/client/client-5.png",  verified: false },
  { name: "Fakir",     volume: "$2.99M",  count: 11, img: "/client/client-6.png",  verified: false },
  { name: "Sajib",     volume: "$1.1M",   count: 4,  img: "/client/client-7.png",  verified: true  },
  { name: "Mikel",     volume: "$2.5M",   count: 9,  img: "/client/client-9.png",  verified: false },
  { name: "Kolik",     volume: "$9.9M",   count: 35, img: "/client/client-8.png",  verified: true  },
  { name: "LAkiba",    volume: "$652K",   count: 2,  img: "/client/client-1.png",  verified: false },
  { name: "Murkis",    volume: "$2.5M",   count: 9,  img: "/client/client-6.png",  verified: false },
  { name: "Mr.Faks",   volume: "$5.9M",   count: 21, img: "/client/client-1.png",  verified: true  },
  { name: "Ranbir",    volume: "$2.5M",   count: 9,  img: "/client/client-9.png",  verified: false },
  { name: "Dabvira",   volume: "$26.6M",  count: 97, img: "/client/client-11.png", verified: false },
  { name: "Jaki Shah", volume: "$6.5M",   count: 24, img: "/client/client-5.png",  verified: true  },
  { name: "Torpedo",   volume: "$8.5M",   count: 30, img: "/client/client-10.png", verified: false },
];

const TABS = ["All Time", "This Month", "This Week"];

const MEDAL = ["#FFD700", "#C0C0C0", "#CD7F32"];

const CreatorOne = ({ creators = [] }) => {
  const [tab, setTab] = useState("All Time");
  const [hovered, setHovered] = useState(null);

  const onChain = creators.map((c, i) => ({
    name: c.owner ? c.owner.slice(0, 6) + "..." + c.owner.slice(-4) : "0x???",
    volume: c.total ? `${parseFloat(c.total.toFixed(4))} ETH` : "—",
    count: c.count || 0,
    img: `/client/client-${(i % 11) + 1}.png`,
    verified: true,
  }));

  const allCreators = onChain.length > 0 ? onChain : STATIC;

  return (
    <div style={{ paddingBottom: "80px" }}>
      {/* Page Bar */}
      <div style={{ padding: "28px 0 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", paddingBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "linear-gradient(135deg, #7048e8, #a78bfa)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <div>
                <h5 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 800, background: "linear-gradient(90deg, #fff 40%, #a78bfa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Top Creators</h5>
                <p style={{ margin: 0, fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>Ranked by total property volume on BlockEstate</p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>
              <Link href="/" legacyBehavior><a style={{ color: "#a78bfa", textDecoration: "none", fontWeight: 600 }}>Home</a></Link>
              <span>/</span>
              <span>Creators</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Filter */}
      <div style={{ padding: "32px 0 0" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "32px" }}>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {TABS.map(t => (
                <button key={t} onClick={() => setTab(t)} style={{ padding: "7px 18px", borderRadius: "20px", border: tab === t ? "1.5px solid #7048e8" : "1.5px solid rgba(255,255,255,0.1)", background: tab === t ? "rgba(112,72,232,0.18)" : "rgba(255,255,255,0.04)", color: tab === t ? "#a78bfa" : "rgba(255,255,255,0.55)", fontWeight: tab === t ? 700 : 400, fontSize: "13px", cursor: "pointer", whiteSpace: "nowrap", width: "auto", display: "inline-block" }}>{t}</button>
              ))}
            </div>
            <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)" }}>{allCreators.length} creators</span>
          </div>

          {/* Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "14px" }}>
            {allCreators.map((c, i) => (
              <div key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} style={{ background: "rgba(255,255,255,0.025)", border: hovered === i ? "1px solid rgba(167,139,250,0.35)" : "1px solid rgba(255,255,255,0.07)", borderRadius: "14px", padding: "16px 14px", textAlign: "center", transition: "all 0.2s", transform: hovered === i ? "translateY(-3px)" : "none", boxShadow: hovered === i ? "0 8px 24px rgba(112,72,232,0.12)" : "none", cursor: "pointer", position: "relative" }}>
                {i < 3 && (
                  <div style={{ position: "absolute", top: "14px", left: "14px", width: "22px", height: "22px", borderRadius: "50%", background: MEDAL[i], display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 800, color: "#000" }}>{i + 1}</div>
                )}
                {i >= 3 && (
                  <div style={{ position: "absolute", top: "14px", left: "14px", fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.3)" }}>#{i + 1}</div>
                )}
                <div style={{ position: "relative", width: "52px", height: "52px", margin: "0 auto 10px", borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(112,72,232,0.5)" }}>
                  <img src={c.img} alt={c.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.target.style.display = "none"; e.target.parentNode.style.background = "linear-gradient(135deg,#7048e8,#a78bfa)"; }} />
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginBottom: "6px" }}>
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "#fff" }}>{c.name}</span>
                  {c.verified && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#7048e8" stroke="none">
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10a11.955 11.955 0 00-1.382-5.516z" fillRule="evenodd" clipRule="evenodd"/>
                      <path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    </svg>
                  )}
                </div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginBottom: "8px" }}>Property Creator</div>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "8px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.8px", fontWeight: 600 }}>Owned</span>
                    <span style={{ fontSize: "14px", fontWeight: 800, color: "#a78bfa" }}>{c.count ?? "—"}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.8px", fontWeight: 600 }}>Volume</span>
                    <span style={{ fontSize: "13px", fontWeight: 700, color: "#fff", wordBreak: "break-all", textAlign: "right", maxWidth: "80px" }}>{c.volume}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorOne;
