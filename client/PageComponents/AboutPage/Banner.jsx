import React, { useState, useEffect } from "react";
import Link from "next/link";

const FALLBACK_MOSAIC = [
  { src: "/portfolio/portfolio-01.jpg", label: "Residential",  price: "2.4 ETH" },
  { src: "/portfolio/portfolio-02.jpg", label: "Luxury Villa", price: "8.1 ETH" },
  { src: "/portfolio/portfolio-03.jpg", label: "Commercial",   price: "5.6 ETH" },
  { src: "/portfolio/portfolio-04.jpg", label: "Apartment",    price: "1.9 ETH" },
];
const FALLBACK_STRIP = [
  { src: "/portfolio/portfolio-05.jpg", label: "Penthouse" },
  { src: "/portfolio/portfolio-06.jpg", label: "Office Space" },
  { src: "/portfolio/portfolio-07.jpg", label: "Beach House" },
  { src: "/portfolio/portfolio-08.jpg", label: "Studio Flat" },
  { src: "/portfolio/portfolio-09.jpg", label: "Town House" },
];

const Banner = () => {
  const [mosaic, setMosaic]     = useState(FALLBACK_MOSAIC);
  const [strip, setStrip]       = useState(FALLBACK_STRIP);

  useEffect(() => {
    const load = async () => {
      try {
        const res  = await fetch("/api/properties");
        if (!res.ok) return;
        const { data } = await res.json();
        if (!data || !data.length) return;

        // Sort by updatedAt desc so the latest upload appears first
        const sorted = [...data].sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );

        // Mosaic = first 4 properties
        const mosaicItems = sorted.slice(0, 4).map((p) => ({
          src:   p.images?.[0] || FALLBACK_MOSAIC[0].src,
          label: p.category   || "Property",
          price: `${p.price} ETH`,
        }));
        // pad with fallbacks if fewer than 4
        while (mosaicItems.length < 4)
          mosaicItems.push(FALLBACK_MOSAIC[mosaicItems.length]);
        setMosaic(mosaicItems);

        // Strip = next 5 properties (positions 4-8)
        const stripItems = sorted.slice(4, 9).map((p) => ({
          src:   p.images?.[0] || FALLBACK_STRIP[0].src,
          label: p.title       || "Property",
        }));
        while (stripItems.length < 5)
          stripItems.push(FALLBACK_STRIP[stripItems.length]);
        setStrip(stripItems);
      } catch (e) {
        // keep fallbacks on error
      }
    };
    load();
  }, []);

  return (
    <div style={{ background: "#0a0a14" }}>

      {/* ── Hero Banner ── */}
      <div style={{ position: "relative", overflow: "hidden", padding: "70px 0 60px" }}>
        {/* Glow blobs */}
        <div style={{ position: "absolute", top: "-80px", left: "5%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(0,255,163,0.09) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "-40px", right: "5%", width: "420px", height: "420px", background: "radial-gradient(circle, rgba(0,217,255,0.07) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-80px", left: "40%", width: "360px", height: "360px", background: "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        {/* Grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          {/* Breadcrumb */}
          <nav style={{ marginBottom: "32px" }}>
            <ol style={{ display: "inline-flex", alignItems: "center", gap: "8px", margin: 0, padding: "7px 16px", listStyle: "none", background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.15)", borderRadius: "30px" }}>
              <li style={{ display: "flex", alignItems: "center" }}>
                <Link href="/" legacyBehavior><a style={{ color: "#8b5cf6", textDecoration: "none", fontSize: "12px", fontWeight: 500, lineHeight: 1 }}>Home</a></Link>
              </li>
              <li style={{ display: "flex", alignItems: "center", color: "rgba(139,92,246,0.4)", fontSize: "13px", lineHeight: 1 }}>›</li>
              <li style={{ display: "flex", alignItems: "center", color: "#acacac", fontSize: "12px", lineHeight: 1 }}>About</li>
            </ol>
          </nav>

          <div style={{ display: "flex", alignItems: "flex-start", gap: "60px", flexWrap: "wrap" }}>
            {/* Left text */}
            <div style={{ flex: "1 1 380px", maxWidth: "520px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(0,255,163,0.07)", border: "1px solid rgba(0,255,163,0.2)", borderRadius: "30px", padding: "5px 14px", marginBottom: "20px" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#00FFA3", boxShadow: "0 0 8px #00FFA3", display: "inline-block" }} />
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#00FFA3", letterSpacing: "2px", textTransform: "uppercase" }}>Blockchain Real Estate</span>
              </div>
              <h1 style={{ margin: 0, fontSize: "clamp(2.2rem, 5vw, 3.4rem)", fontWeight: 800, lineHeight: 1.1, background: "linear-gradient(120deg, #ffffff 20%, #a5f3dc 55%, #00D9FF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Tokenizing Real Estate.<br />Empowering Every Investor.
              </h1>
              <p style={{ margin: "18px 0 32px", fontSize: "15px", color: "rgba(255,255,255,0.42)", lineHeight: 1.8, maxWidth: "460px" }}>
                Own verified on-chain properties worldwide — traded instantly, no banks, no paperwork. Your wallet is all you need.
              </p>
              {/* Feature checklist */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "36px" }}>
                {["Verified on-chain property ownership", "Buy & sell with crypto — no banks needed", "Community reviews & transparent ratings", "List any property globally in minutes"].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "rgba(0,255,163,0.12)", border: "1px solid rgba(0,255,163,0.28)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><polyline points="2 6 5 9 10 3" stroke="#00FFA3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/explor" legacyBehavior>
                <a style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "13px 28px", borderRadius: "999px", background: "linear-gradient(135deg, #00FFA3, #00D9FF)", color: "#0a0a14", fontWeight: 800, fontSize: "14px", textDecoration: "none", boxShadow: "0 6px 24px rgba(0,255,163,0.22)" }}>
                  Explore Properties
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </a>
              </Link>
            </div>

            {/* Right — 2×2 mosaic */}
            <div style={{ flex: "1 1 360px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                {mosaic.map((item, i) => (
                  <div key={i} style={{ position: "relative", borderRadius: "14px", overflow: "hidden", height: "190px", border: "1px solid rgba(139,92,246,0.14)" }}>
                    <img src={item.src} alt={item.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,20,0.85) 0%, transparent 55%)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "12px 14px" }}>
                      <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#a78bfa", marginBottom: "3px" }}>{item.label}</span>
                      <span style={{ fontSize: "15px", fontWeight: 800, color: "#fff" }}>{item.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Gradient divider */}
        <div style={{ marginTop: "56px", height: "1px", background: "linear-gradient(90deg, rgba(0,255,163,0.3) 0%, rgba(139,92,246,0.2) 50%, transparent 100%)" }} />
      </div>

      {/* ── Why BlockEstate + Property strip ── */}
      <div style={{ padding: "60px 0" }}>
        <div className="container">
          {/* Pillar cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px", marginBottom: "52px" }}>
            {[
              { icon: "🔓", title: "Open Access", text: "No banks. No paperwork. Anyone with a wallet can buy or list property instantly.", bg: "rgba(0,255,163,0.07)", border: "rgba(0,255,163,0.18)", accent: "#00FFA3" },
              { icon: "🔗", title: "On-Chain Truth", text: "Every sale, every ownership transfer — permanently recorded on Ethereum. Tamper-proof.", bg: "rgba(0,217,255,0.07)", border: "rgba(0,217,255,0.16)", accent: "#00D9FF" },
              { icon: "🌍", title: "Global Market", text: "List or invest in property from anywhere in the world. No borders, no middlemen.", bg: "rgba(139,92,246,0.07)", border: "rgba(139,92,246,0.18)", accent: "#a78bfa" },
            ].map((p) => (
              <div key={p.title} style={{ background: p.bg, border: `1px solid ${p.border}`, borderRadius: "18px", padding: "28px 24px" }}>
                <div style={{ fontSize: "28px", lineHeight: 1, marginBottom: "12px" }}>{p.icon}</div>
                <h4 style={{ margin: "0 0 10px", fontSize: "16px", fontWeight: 800, color: p.accent }}>{p.title}</h4>
                <p style={{ margin: 0, fontSize: "13px", color: "rgba(255,255,255,0.45)", lineHeight: 1.75 }}>{p.text}</p>
              </div>
            ))}
          </div>

          {/* Featured strip */}
          <p style={{ margin: "0 0 16px", fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#8b5cf6" }}>Featured Properties</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "12px" }}>
            {strip.map((item, i) => (
              <div key={i} style={{ position: "relative", borderRadius: "12px", overflow: "hidden", height: "120px", border: "1px solid rgba(139,92,246,0.12)" }}>
                <img src={item.src} alt={item.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,20,0.8) 0%, transparent 50%)", display: "flex", alignItems: "flex-end", padding: "8px 10px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 600, color: "#fff" }}>{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
