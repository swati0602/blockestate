import React, { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useStateContext } from "../../context/index";
import PropertyCard from "../../components/PropertyCard/PropertyCard";

const CATEGORIES = [
  { filter: "*", label: "All Items" },
  { filter: "Housing", label: "Housing" },
  { filter: "Office", label: "Office" },
  { filter: "Rental", label: "Rental" },
  { filter: "Farmhouse", label: "Farmhouse" },
  { filter: "Country", label: "Country" },
  { filter: "Commercial", label: "Commercial" },
];

// PropertyCard is now the animated Framer Motion component in components/PropertyCard/

const Product = ({ properties = [] }) => {
  const [activeCategory, setActiveCategory] = useState("*");
  const router = useRouter();
  const { currentAccount } = useStateContext();

  const source = [...properties].sort((a, b) => {
    // Sort: listed (isSold=false) first, then sold (isSold=true)
    if (a.isSold === b.isSold) return (b.productID || 0) - (a.productID || 0);
    return (a.isSold ? 1 : 0) - (b.isSold ? 1 : 0);
  });

  const cards = (activeCategory === "*"
    ? source
    : source.filter((p) => p.category?.toLowerCase() === activeCategory.toLowerCase())
  ).map((p, i) => ({
    img: p.image || `/portfolio/portfolio-0${(i % 8) + 1}.jpg`,
    name: p.title || "Untitled",
    price: `${p.price || "0"} ETH`,
    address: p.address || "",
    rawDescription: p.description || "",
    category: p.category || "",
    id: p.productID,
    owner: p.owner || "",
    isSold: p.isSold || false,
  }));

  return (
    <div class="rn-product-area" style={{ paddingTop: "32px" }}>
      <div class="container">
        <div class="row mb--30 align-items-center">
          <div class="col-lg-4">
            <div class="section-title">
              <p style={{ color: "#7048e8", fontSize: "13px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "6px" }}>
                Properties
              </p>
              <h3 style={{
                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                fontWeight: 800,
                margin: 0,
                background: "linear-gradient(135deg, #fff 30%, #7048e8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                lineHeight: 1.2,
              }}>
                Explore Properties
              </h3>
            </div>
          </div>
          <div class="col-lg-8 mt_md--30 mt_sm--30">
            <div className="d-flex justify-content-start justify-content-lg-end" style={{ gap: "10px", flexWrap: "nowrap", overflowX: "auto", paddingBottom: "4px" }}>
              {CATEGORIES.map((cat) => {
                const active = activeCategory === cat.filter;
                return (
                  <button
                    key={cat.filter}
                    onClick={() => setActiveCategory(cat.filter)}
                    style={{
                      padding: "8px 20px",
                      borderRadius: "50px",
                      border: active ? "none" : "1.5px solid rgba(255,255,255,0.15)",
                      background: active
                        ? "linear-gradient(135deg, #7048e8 0%, #4f9cf9 100%)"
                        : "rgba(255,255,255,0.04)",
                      color: active ? "#fff" : "rgba(255,255,255,0.65)",
                      fontWeight: active ? 700 : 500,
                      fontSize: "0.88rem",
                      letterSpacing: "0.03em",
                      boxShadow: active ? "0 4px 16px rgba(112,72,232,0.45)" : "none",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      backdropFilter: "blur(6px)",
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={e => {
                      if (!active) {
                        e.currentTarget.style.background = "rgba(112,72,232,0.15)";
                        e.currentTarget.style.borderColor = "rgba(112,72,232,0.5)";
                        e.currentTarget.style.color = "#fff";
                      }
                    }}
                    onMouseLeave={e => {
                      if (!active) {
                        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                        e.currentTarget.style.color = "rgba(255,255,255,0.65)";
                      }
                    }}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {cards.length > 0 ? (() => {
          const listed = cards.filter(c => !c.isSold);
          const sold = cards.filter(c => c.isSold);
          return (
            <>
              {/* ── Listed section ── */}
              <div style={{ width: "100%", margin: "0 0 28px", display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ flex: 1, height: "1px", background: "rgba(16,185,129,0.2)" }} />
                <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 18px", background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.25)", borderRadius: "50px" }}>
                  <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#10b981" }} />
                  <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#10b981", textTransform: "uppercase", letterSpacing: "1.5px" }}>Listed Properties</span>
                  <span style={{ fontSize: "0.75rem", color: "rgba(16,185,129,0.65)", fontWeight: 600 }}>{listed.length}</span>
                </div>
                <div style={{ flex: 1, height: "1px", background: "rgba(16,185,129,0.2)" }} />
              </div>

              <motion.div
                className="row g-5"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              >
                {listed.map((card, i) => {
                  const items = [];

                  // Inject CTA card at index 2
                  if (i === 2) {
                    items.push(
                      <div key="cta-card" className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                    <motion.div
                      variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                      style={{
                        height: "100%",
                        minHeight: "320px",
                        borderRadius: "16px",
                        background: "linear-gradient(145deg, rgba(112,72,232,0.18) 0%, rgba(0,217,255,0.10) 100%)",
                        border: "1px solid rgba(112,72,232,0.35)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "36px 28px",
                        gap: "18px",
                        textAlign: "center",
                        boxShadow: "0 0 30px rgba(112,72,232,0.12)",
                        cursor: "default",
                      }}
                    >
                      {/* Icon */}
                      <div style={{
                        width: 64, height: 64, borderRadius: "50%",
                        background: "rgba(112,72,232,0.18)",
                        border: "1px solid rgba(112,72,232,0.4)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7048e8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                          <polyline points="9 22 9 12 15 12 15 22"/>
                        </svg>
                      </div>

                      {/* Headline */}
                      <div>
                        <p style={{ margin: "0 0 6px", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7048e8" }}>
                          For Owners
                        </p>
                        <h4 style={{
                          margin: 0,
                          fontSize: "1.5rem",
                          fontWeight: 800,
                          lineHeight: 1.2,
                          background: "linear-gradient(135deg, #fff 30%, #7048e8 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}>
                          List Your Property On-Chain
                        </h4>
                      </div>

                      {/* Body text */}
                      <p style={{ margin: 0, fontSize: "0.9rem", color: "rgba(200,215,230,0.55)", lineHeight: 1.6, maxWidth: "260px" }}>
                        Tokenize your real estate asset, set your price in ETH, and reach a global audience — no middlemen.
                      </p>

                      {/* Feature pills */}
                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center" }}>
                        {["On-Chain Ownership", "IPFS Media", "No Fees"].map((tag) => (
                          <span key={tag} style={{
                            padding: "4px 12px",
                            borderRadius: "50px",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            background: "rgba(112,72,232,0.12)",
                            border: "1px solid rgba(112,72,232,0.3)",
                            color: "rgba(200,200,255,0.7)",
                          }}>{tag}</span>
                        ))}
                      </div>

                      {/* CTA button */}
                      <button
                        onClick={() => router.push("/create-property")}
                        style={{
                          padding: "12px 32px",
                          borderRadius: "50px",
                          border: "none",
                          background: "linear-gradient(135deg, #7048e8 0%, #4f9cf9 100%)",
                          color: "#fff",
                          fontWeight: 700,
                          fontSize: "0.9rem",
                          cursor: "pointer",
                          boxShadow: "0 6px 20px rgba(112,72,232,0.45)",
                          transition: "transform 0.2s ease, box-shadow 0.2s ease",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(112,72,232,0.6)"; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(112,72,232,0.45)"; }}
                      >
                        Create Listing →
                      </button>
                    </motion.div>
                  </div>
                );
              }

              items.push(
                  <div key={card.id || i} className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                    <PropertyCard
                      card={card}
                      index={i}
                      onClick={() => router.push(`/detail?property=${card.id}`)}
                    />
                  </div>
                );

                  return items;
                })}
              </motion.div>

              {/* ── Sold section ── */}
              {sold.length > 0 && (
                <>
                  <div style={{ width: "100%", margin: "40px 0 28px", display: "flex", alignItems: "center", gap: "16px" }}>
                    <div style={{ flex: 1, height: "1px", background: "rgba(220,38,38,0.2)" }} />
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 18px", background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.25)", borderRadius: "50px" }}>
                      <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#f87171" }} />
                      <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#f87171", textTransform: "uppercase", letterSpacing: "1.5px" }}>Sold Properties</span>
                      <span style={{ fontSize: "0.75rem", color: "rgba(248,113,113,0.6)", fontWeight: 600 }}>{sold.length}</span>
                    </div>
                    <div style={{ flex: 1, height: "1px", background: "rgba(220,38,38,0.2)" }} />
                  </div>
                  <motion.div
                    className="row g-5"
                    initial="hidden"
                    animate="visible"
                    variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
                  >
                    {sold.map((card, i) => (
                      <div key={card.id || i} className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                        <PropertyCard
                          card={card}
                          index={i}
                          onClick={() => router.push(`/detail?property=${card.id}`)}
                        />
                      </div>
                    ))}
                  </motion.div>
                </>
              )}
            </>
          );
        })() : (
            <div className="col-12 text-center" style={{ padding: "60px 0" }}>
              <p style={{ color: "var(--color-body)", fontSize: "16px" }}>
                No properties found{activeCategory !== "*" ? ` in "${activeCategory}"` : ""}.
              </p>
            </div>
          )}
      </div>
    </div>
  );
};

export default Product;