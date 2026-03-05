import React, { useState } from "react";
import Link from "next/link";

const BLOGS = [
  {
    img: "/blog/blog-01.jpg",
    fallback: "/portfolio/portfolio-01.jpg",
    category: "Blockchain",
    categoryColor: { color: "#a78bfa", bg: "rgba(112,72,232,0.12)", border: "rgba(112,72,232,0.3)" },
    time: "5 min read",
    date: "Jan 14, 2026",
    title: "How Blockchain Secures Real Estate Transactions",
    excerpt: "Discover how distributed ledger technology eliminates fraud, enforces transparency, and creates immutable ownership records for property on-chain.",
    author: "Aryan Shah",
  },
  {
    img: "/blog/blog-02.jpg",
    fallback: "/portfolio/portfolio-03.jpg",
    category: "Real Estate",
    categoryColor: { color: "#00FFA3", bg: "rgba(0,255,163,0.1)", border: "rgba(0,255,163,0.25)" },
    time: "7 min read",
    date: "Jan 22, 2026",
    title: "Benefits of Tokenized Property Investment",
    excerpt: "Tokenization lowers the barrier to real estate ownership, enabling fractional investing, instant liquidity, and borderless transactions.",
    author: "Priya Mehta",
  },
  {
    img: "/blog/blog-03.jpg",
    fallback: "/portfolio/portfolio-05.jpg",
    category: "MetaMask",
    categoryColor: { color: "#fbbf24", bg: "rgba(251,191,36,0.1)", border: "rgba(251,191,36,0.3)" },
    time: "4 min read",
    date: "Feb 3, 2026",
    title: "How to Connect MetaMask to BlockEstate",
    excerpt: "A step-by-step walkthrough — install MetaMask, fund your wallet with Sepolia ETH, and start exploring on-chain properties in minutes.",
    author: "Rahul Verma",
  },
  {
    img: "/blog/blog-04.jpg",
    fallback: "/portfolio/portfolio-07.jpg",
    category: "Security",
    categoryColor: { color: "#00D9FF", bg: "rgba(0,217,255,0.1)", border: "rgba(0,217,255,0.25)" },
    time: "6 min read",
    date: "Feb 17, 2026",
    title: "How Smart Contracts Protect Property Ownership",
    excerpt: "Self-executing contracts on Ethereum ensure that ownership transfers only happen when all conditions are met — no middlemen, no delays.",
    author: "Neha Joshi",
  },
  {
    img: "/blog/blog-05.jpg",
    fallback: "/portfolio/portfolio-09.jpg",
    category: "DeFi",
    categoryColor: { color: "#f472b6", bg: "rgba(244,114,182,0.1)", border: "rgba(244,114,182,0.25)" },
    time: "8 min read",
    date: "Feb 24, 2026",
    title: "DeFi Meets Real Estate: The Future of Property Finance",
    excerpt: "Explore how decentralized lending, yield protocols, and liquidity pools are reshaping how people finance and invest in real property.",
    author: "Dev Kapoor",
  },
  {
    img: "/blog/blog-06.jpg",
    fallback: "/portfolio/portfolio-11.jpg",
    category: "Guide",
    categoryColor: { color: "#a78bfa", bg: "rgba(112,72,232,0.12)", border: "rgba(112,72,232,0.3)" },
    time: "10 min read",
    date: "Feb 28, 2026",
    title: "Beginners Guide to On-Chain Property Listing",
    excerpt: "From uploading your documents to minting your first NFT deed — this guide walks you through listing your property on BlockEstate.",
    author: "Aryan Shah",
  },
];

const FILTERS = ["All", "Blockchain", "Real Estate", "MetaMask", "Security", "DeFi", "Guide"];

const BlogTwo = () => {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? BLOGS : BLOGS.filter((b) => b.category === active);

  return (
    <div style={{ padding: "48px 0 100px" }}>
      <div className="container">

        {/* Section header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "36px" }}>
          <div>
            <p style={{ margin: "0 0 6px", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7048e8" }}>Latest Articles</p>
            <h3 style={{ margin: 0, fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, background: "linear-gradient(90deg, #fff 40%, #a78bfa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              News &amp; Insights
            </h3>
          </div>
          <span style={{ background: "rgba(112,72,232,0.15)", border: "1px solid rgba(112,72,232,0.35)", borderRadius: "999px", padding: "6px 16px", fontSize: "13px", color: "#a78bfa", fontWeight: 600 }}>
            {BLOGS.length} articles
          </span>
        </div>

        {/* Filter pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "40px" }}>
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              style={{
                display: "inline-block", width: "auto", whiteSpace: "nowrap",
                padding: "7px 18px", borderRadius: "999px", border: "1px solid",
                borderColor: active === f ? "rgba(112,72,232,0.6)" : "rgba(255,255,255,0.1)",
                background: active === f ? "rgba(112,72,232,0.18)" : "transparent",
                color: active === f ? "#a78bfa" : "rgba(255,255,255,0.45)",
                fontWeight: 600, fontSize: "13px", cursor: "pointer", transition: "all 0.2s",
              }}
            >{f}</button>
          ))}
        </div>

        {/* Cards grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "28px" }}>
          {filtered.map((blog, i) => (
            <Link key={i} href="/blogdetail" legacyBehavior>
              <a style={{ textDecoration: "none" }}>
                <div
                  style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "20px", overflow: "hidden", display: "flex", flexDirection: "column", height: "100%", transition: "transform 0.25s, border-color 0.25s, box-shadow 0.25s", cursor: "pointer" }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.borderColor = "rgba(112,72,232,0.4)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(112,72,232,0.15)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  {/* Image */}
                  <div style={{ position: "relative", overflow: "hidden", height: "200px" }}>
                    <img
                      src={blog.img}
                      alt={blog.title}
                      onError={(e) => { e.target.onerror = null; e.target.src = blog.fallback; }}
                      style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    />
                    {/* Category badge */}
                    <div style={{ position: "absolute", top: "14px", left: "14px", background: blog.categoryColor.bg, border: `1px solid ${blog.categoryColor.border}`, borderRadius: "999px", padding: "4px 12px", fontSize: "11px", fontWeight: 700, color: blog.categoryColor.color, backdropFilter: "blur(8px)" }}>
                      {blog.category}
                    </div>
                    {/* Read time badge */}
                    <div style={{ position: "absolute", top: "14px", right: "14px", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "999px", padding: "4px 10px", fontSize: "11px", color: "rgba(255,255,255,0.6)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", gap: "5px" }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                      </svg>
                      {blog.time}
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: "22px 22px 24px", display: "flex", flexDirection: "column", flex: 1, gap: "12px" }}>
                    {/* Date */}
                    <p style={{ margin: 0, fontSize: "11px", color: "rgba(255,255,255,0.3)", display: "flex", alignItems: "center", gap: "5px" }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                      {blog.date}
                    </p>

                    {/* Title */}
                    <h4 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700, color: "#fff", lineHeight: 1.45 }}>{blog.title}</h4>

                    {/* Excerpt */}
                    <p style={{ margin: 0, fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.75, flex: 1 }}>{blog.excerpt}</p>

                    {/* Footer */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "6px", paddingTop: "14px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: "linear-gradient(135deg, #7048e8, #00D9FF)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                          </svg>
                        </div>
                        <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", fontWeight: 600 }}>{blog.author}</span>
                      </div>
                      <span style={{ fontSize: "12px", color: "#a78bfa", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
                        Read more
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>

        {/* Load more */}
        {filtered.length > 0 && (
          <div style={{ textAlign: "center", marginTop: "56px" }}>
            <button style={{ padding: "13px 40px", borderRadius: "999px", background: "transparent", border: "1px solid rgba(112,72,232,0.4)", color: "#a78bfa", fontWeight: 700, fontSize: "14px", cursor: "pointer", letterSpacing: "0.04em", transition: "all 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(112,72,232,0.15)"; e.currentTarget.style.borderColor = "rgba(112,72,232,0.7)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(112,72,232,0.4)"; }}
            >
              Load More Articles
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default BlogTwo;
