import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useStateContext } from "../../context";

const Footer = () => {
  const { getPropertiesData } = useStateContext();
  const [recentProperties, setRecentProperties] = useState([]);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const data = await getPropertiesData();
        if (data && data.length) {
          // show last 3 listed (highest productID = most recent)
          const sorted = [...data].sort((a, b) => b.productID - a.productID);
          setRecentProperties(sorted.slice(0, 3));
        }
      } catch (e) {}
    };
    fetchRecent();
  }, []);

  const colHeadStyle = {
    fontSize: "1.1rem",
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#fff",
    marginBottom: "10px",
    paddingBottom: "6px",
    borderBottom: "2px solid",
    borderImage: "linear-gradient(90deg,#7048e8,#4f9cf9) 1",
    display: "inline-block",
  };

  const linkStyle = {
    color: "rgba(255,255,255,0.6)",
    fontSize: "1.35rem",
    textDecoration: "none",
    transition: "color 0.2s, padding-left 0.2s",
    display: "inline-block",
    lineHeight: 1.2,
  };

  return (
    <div style={{
      background: "linear-gradient(180deg, #0d0d1a 0%, #0a0a14 100%)",
      borderTop: "1px solid rgba(112,72,232,0.25)",
      paddingTop: "28px",
      paddingBottom: "20px",
      marginTop: "30px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* decorative glow blob */}
      <div style={{
        position: "absolute", top: "-120px", left: "-120px",
        width: "400px", height: "400px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(112,72,232,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div class="container" style={{ position: "relative" }}>
        <div class="row gx-4 gy-3">

          {/* ── Col 1 — Brand + newsletter ── */}
          <div class="col-lg-3 col-md-6 col-12">
            <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <div style={{
                width: "44px", height: "44px", borderRadius: "12px",
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 18px rgba(99,102,241,0.45)", flexShrink: 0,
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                  stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </div>
              <div style={{ lineHeight: 1 }}>
                <span style={{ fontSize: "1.7rem", fontWeight: 800, background: "linear-gradient(135deg,#a5b4fc,#c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Block</span>
                <span style={{ fontSize: "1.7rem", fontWeight: 800, color: "#fff" }}>Estate</span>
                <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", fontWeight: 600, letterSpacing: "0.1em", marginTop: "2px" }}>ON-CHAIN REAL ESTATE</div>
              </div>
            </Link>

            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "1.1rem", lineHeight: 1.6, marginBottom: "12px" }}>
              A decentralised real estate marketplace on Ethereum. Buy, sell and tokenise properties as NFTs — fully on-chain, transparent and trustless.
            </p>

            {/* Social icons */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
              {[
                { label: "X", d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
                { label: "Discord", d: "M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.033.054a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" },
                { label: "GitHub", d: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" },
              ].map(({ label, d }) => (
                <a key={label} href="#" title={label} style={{
                  width: "36px", height: "36px", borderRadius: "8px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(112,72,232,0.25)"; e.currentTarget.style.borderColor = "rgba(112,72,232,0.5)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="rgba(255,255,255,0.6)"><path d={d}/></svg>
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "8px", padding: "8px 10px" }}>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: "1.02rem", marginBottom: "1px" }}>Stay Updated</p>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.92rem", marginBottom: "6px" }}>No spam. Unsubscribe anytime.</p>
              <input type="email" placeholder="your@email.com" style={{
                width: "100%", padding: "3px 8px", marginBottom: "4px", height: "26px",
                background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "6px", outline: "none", color: "#fff", fontSize: "0.92rem",
                boxSizing: "border-box",
              }}/>
              <button type="button" style={{
                width: "100%", padding: "5px",
                background: "linear-gradient(135deg,#7048e8,#4f9cf9)",
                border: "none", borderRadius: "6px",
                color: "#fff", fontWeight: 700, fontSize: "0.95rem",
                cursor: "pointer", boxShadow: "0 3px 10px rgba(112,72,232,0.3)",
                letterSpacing: "0.04em",
              }}>Subscribe →</button>
            </div>
          </div>

          {/* ── Col 2 — BlockEstate links ── */}
          <div class="col-lg-3 col-md-6 col-6" style={{ paddingLeft: "4.5rem" }}>
            <h6 style={colHeadStyle}>BlockEstate</h6>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "7px" }}>
              {[
                { href: "/explor",     label: "Explore Properties" },
                { href: "/create",     label: "List a Property" },
                { href: "/collection", label: "My Collection" },
                { href: "/ranking",    label: "Top Rankings" },
                { href: "/active",     label: "Recent Activity" },
                { href: "/upcoming",   label: "Upcoming Listings" },
                { href: "/connect",    label: "Connect Wallet" },
              ].map(({ href, label }) => (
                <li key={href} style={{ margin: 0, padding: 0 }}>
                  <Link href={href} style={linkStyle}
                    onMouseEnter={e => { e.currentTarget.style.color = "#a78bfa"; e.currentTarget.style.paddingLeft = "6px"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.55)"; e.currentTarget.style.paddingLeft = "0"; }}
                  >→ {label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3 — Information links ── */}
          <div class="col-lg-3 col-md-6 col-6">
            <h6 style={colHeadStyle}>Information</h6>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "7px" }}>
              {[
                { href: "/about",        label: "About BlockEstate" },
                { href: "/contact",      label: "Contact Us" },
                { href: "/blog",         label: "Blog & News" },
                { href: "/news",         label: "Market News" },
                { href: "/transactions", label: "Transaction History" },
                { href: "/privacy",      label: "Privacy Policy" },
                { href: "/creator",      label: "Verified Agents" },
              ].map(({ href, label }) => (
                <li key={href} style={{ margin: 0, padding: 0 }}>
                  <Link href={href} style={linkStyle}
                    onMouseEnter={e => { e.currentTarget.style.color = "#a78bfa"; e.currentTarget.style.paddingLeft = "6px"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.55)"; e.currentTarget.style.paddingLeft = "0"; }}
                  >→ {label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 4 — Recently Listed ── */}
          <div class="col-lg-3 col-md-12 col-12">
            <h6 style={colHeadStyle}>Recently Listed</h6>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {(recentProperties.length > 0 ? recentProperties : [
                { productID: null, title: "Explore Properties",  category: "Connect wallet to load", price: null, image: "/portfolio/portfolio-01.jpg" },
                { productID: null, title: "List a Property",     category: "Tokenise & sell on-chain", price: null, image: "/portfolio/portfolio-02.jpg" },
              ]).map((property, i) => (
                <Link
                  key={property.productID || i}
                  href={property.productID ? `/detail?property=${property.productID}` : "/explor"}
                  style={{ textDecoration: "none" }}
                >
                  <div style={{
                    display: "flex", gap: "10px", alignItems: "center",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "10px", padding: "9px",
                    transition: "background 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(112,72,232,0.1)"; e.currentTarget.style.borderColor = "rgba(112,72,232,0.3)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                  >
                    <img
                      src={property.image && property.image.startsWith("http") ? property.image : `/portfolio/portfolio-0${(i % 8) + 1}.jpg`}
                      alt={property.title}
                      onError={e => { e.target.onerror = null; e.target.src = `/portfolio/portfolio-0${(i % 8) + 1}.jpg`; }}
                      style={{ width: "48px", height: "48px", borderRadius: "8px", objectFit: "cover", flexShrink: 0 }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ color: "#fff", fontWeight: 600, fontSize: "1.2rem", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {property.title?.length > 22 ? property.title.slice(0, 20) + "…" : property.title}
                      </p>
                      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "1rem", margin: "3px 0" }}>{property.category}</p>
                    </div>
                    {property.price != null && (
                      <span style={{
                        background: "linear-gradient(135deg,#7048e8,#4f9cf9)",
                        color: "#fff", fontWeight: 700, fontSize: "1rem",
                        padding: "4px 10px", borderRadius: "20px", whiteSpace: "nowrap", flexShrink: 0,
                      }}>
                        {parseFloat(property.price).toFixed(4)} ETH
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Footer;
