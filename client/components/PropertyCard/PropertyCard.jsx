/**
 * PropertyCard — reusable animated real estate card
 *
 * Props
 * ─────
 *  card    {object}   Required. Shape:
 *    .img            string   — image URL
 *    .name           string   — property title
 *    .price          string   — e.g. "1.4 ETH"
 *    .address        string   — location text
 *    .category       string   — e.g. "Housing"
 *    .rawDescription string   — "Bedrooms: 3 | Bathrooms: 2 | Area: 1200"
 *  onClick  {fn}      Called when card is clicked
 *  index    {number}  Position in list — used to stagger entrance delay
 *
 * Dependencies: framer-motion (already in node_modules)
 */

"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── localStorage helpers ─────────────────────────────────────────────────────
const LIKED_KEY = "be_liked";
export function getLiked() {
  try { return JSON.parse(localStorage.getItem(LIKED_KEY) || "[]"); } catch { return []; }
}
function toggleLiked(id) {
  const arr = getLiked();
  const next = arr.includes(String(id))
    ? arr.filter((x) => x !== String(id))
    : [...arr, String(id)];
  localStorage.setItem(LIKED_KEY, JSON.stringify(next));
  return next.includes(String(id));
}

// ─── tiny helpers ────────────────────────────────────────────────────────────

function parseDetails(raw) {
  if (!raw) return { bedrooms: null, bathrooms: null, sqft: null };
  const m = raw.match(
    /Bedrooms:\s*([^\s|]+)\s*\|\s*Bathrooms:\s*([^\s|]+)\s*\|\s*Area:\s*([^\s]+)/
  );
  if (m) return { bedrooms: m[1], bathrooms: m[2], sqft: m[3] };
  return { bedrooms: null, bathrooms: null, sqft: null };
}

const CATEGORY_COLORS = {
  housing:    { bg: "rgba(99,102,241,0.18)",  text: "#818cf8", dot: "#818cf8" },
  office:     { bg: "rgba(234,179,8,0.15)",   text: "#facc15", dot: "#facc15" },
  rental:     { bg: "rgba(59,130,246,0.15)",  text: "#60a5fa", dot: "#60a5fa" },
  farmhouse:  { bg: "rgba(34,197,94,0.15)",   text: "#4ade80", dot: "#4ade80" },
  country:    { bg: "rgba(249,115,22,0.15)",  text: "#fb923c", dot: "#fb923c" },
  commercial: { bg: "rgba(236,72,153,0.15)",  text: "#f472b6", dot: "#f472b6" },
};
function categoryStyle(cat) {
  return CATEGORY_COLORS[(cat || "").toLowerCase()] || {
    bg: "rgba(255,255,255,0.1)",
    text: "#cbd5e1",
    dot: "#94a3b8",
  };
}

// ─── SVG icons ───────────────────────────────────────────────────────────────

const IconBed = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 7v13"/>
    <path d="M21 7v13"/>
    <path d="M3 18h18"/>
    <path d="M3 11h18"/>
    <path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2"/>
    <path d="M7 11V9a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2"/>
    <path d="M13 11V9a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2"/>
  </svg>
);
const IconBath = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3z"/>
    <path d="M4 12V7a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1"/>
    <path d="M7 19v2m10-2v2"/>
  </svg>
);
const IconArea = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="5 9 2 12 5 15"/>
    <polyline points="9 5 12 2 15 5"/>
    <polyline points="15 19 12 22 9 19"/>
    <polyline points="19 9 22 12 19 15"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <line x1="12" y1="2" x2="12" y2="22"/>
  </svg>
);
const IconPin = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);
const IconHeart = ({ filled }) => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill={filled ? "#f43f5e" : "none"}
    stroke={filled ? "#f43f5e" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

// ─── animation variants ───────────────────────────────────────────────────────

/** Entrance: each card slides up + fades in, stagger via `custom` (index) */
const cardVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.97 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.52,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
  // Triggered by whileHover="hover" — also propagates to child motion elements
  hover: {
    y: -8,
    boxShadow: "0 0 20px rgba(0,255,163,0.3), 0 0 40px rgba(0,217,255,0.15), 0 8px 32px rgba(0,0,0,0.4)",
    borderColor: "rgba(0,255,163,0.35)",
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

/** Image zooms in when the parent card is hovered */
const imageVariants = {
  rest: { scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
  hover: { scale: 1.05, transition: { duration: 0.3, ease: "easeOut" } },
};

/** Overlay fades in on hover */
const overlayVariants = {
  rest: { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 0.25 } },
};

/** Center "view" icon pops in on hover */
const viewIconVariants = {
  rest: { scale: 0, rotate: -20 },
  hover: { scale: 1, rotate: 0, transition: { type: "spring", stiffness: 280, damping: 18 } },
};

/** Arrow in CTA button slides right on hover */
const arrowVariants = {
  rest: { x: 0 },
  hover: { x: 5, transition: { type: "spring", stiffness: 400, damping: 20 } },
};

// ─── Stat pill sub-component ──────────────────────────────────────────────────

const StatPill = ({ icon, value, label }) => (
  <div style={{
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "6px",
    padding: "14px 4px",
  }}>
    <span style={{ color: "rgba(255,255,255,0.6)", display: "flex" }}>{icon}</span>
    <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", lineHeight: 1 }}>
      {value ? `${value} ${label}` : `— ${label}`}
    </span>
  </div>
);

// ─── Main PropertyCard ────────────────────────────────────────────────────────

const PropertyCard = ({ card = {}, onClick, index = 0 }) => {
  const details = parseDetails(card.rawDescription);
  const catStyle = categoryStyle(card.category);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (card.id) setLiked(getLiked().includes(String(card.id)));
  }, [card.id]);

  const handleLike = (e) => {
    e.stopPropagation();
    if (!card.id) return;
    const isNowLiked = toggleLiked(card.id);
    setLiked(isNowLiked);
    // fire storage event so collection page can react
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onClick={onClick}
      className="property-card"
      style={{
        position: "relative",
        borderRadius: "20px",
        overflow: "hidden",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        /* glass-dark base */
        background: "linear-gradient(145deg, rgba(22,22,38,0.95) 0%, rgba(13,13,26,0.98) 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: "0 4px 28px rgba(0,0,0,0.45)",
        willChange: "transform, box-shadow",
      }}
    >
      {/* ── IMAGE ─────────────────────────────────────────── */}
      <div style={{ position: "relative", width: "100%", height: "220px", overflow: "hidden" }}>

        {/* zooming image */}
        <motion.img
          src={card.img || "/portfolio/portfolio-01.jpg"}
          alt={card.name || "Property"}
          variants={imageVariants}
          className="property-image"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transformOrigin: "center center",
          }}
        />

        {/* dark overlay on hover */}
        <motion.div
          variants={overlayVariants}
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* center circle arrow removed */}

        {/* category badge — bottom-left */}
        {card.category ? (
          <div style={{
            position: "absolute",
            bottom: "14px",
            left: "14px",
            background: catStyle.bg,
            border: `1px solid ${catStyle.text}44`,
            color: catStyle.text,
            borderRadius: "50px",
            padding: "4px 12px",
            fontSize: "1.15rem",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "5px",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}>
            <span style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: catStyle.dot,
              display: "inline-block",
              flexShrink: 0,
            }} />
            {card.category}
          </div>
        ) : null}

        {/* heart like button — top-right of image */}
        <motion.button
          onClick={handleLike}
          whileTap={{ scale: 0.8 }}
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            background: liked ? "rgba(244,63,94,0.18)" : "rgba(0,0,0,0.55)",
            border: liked ? "1px solid rgba(244,63,94,0.5)" : "1px solid rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: liked ? "#f43f5e" : "rgba(255,255,255,0.7)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            zIndex: 2,
            outline: "none",
            transition: "background 0.2s, border-color 0.2s",
          }}
          title={liked ? "Remove from collection" : "Save to collection"}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={liked ? "liked" : "unliked"}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.15 }}
              style={{ display: "flex", alignItems: "center" }}
            >
              <IconHeart filled={liked} />
            </motion.span>
          </AnimatePresence>
        </motion.button>

      </div>

      {/* ── BODY ──────────────────────────────────────────── */}
      <div style={{
        padding: "8px 10px 10px",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "0px",
      }}>

        {/* ── Row 1: title LEFT  |  price RIGHT ── */}
<div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0px" }}>

          {/* title */}
          <h3
            className="property-title"
            style={{
              margin: 0,
              flex: 1,
              minWidth: 0,
              fontSize: "2rem",
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: "-0.02em",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {card.name || "Untitled Property"}
          </h3>

          {/* price badge — right */}
          <div style={{
            background: "rgba(10,10,20,0.75)",
            border: "2px solid rgba(0,208,132,0.5)",
            color: "#00d084",
            borderRadius: "50px",
            padding: "8px 20px",
            fontSize: "1.2rem",
            fontWeight: 700,
            flexShrink: 0,
            letterSpacing: "0.01em",
            whiteSpace: "nowrap",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}>
            {card.price || "N/A"}
          </div>
        </div>

        {/* address */}
        {card.address ? (
          <div style={{
            color: "rgba(200,210,220,0.55)",
            fontSize: "1.625rem",
            fontWeight: 500,
            marginTop: "-2px",
            marginBottom: "4px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}>
            {card.address}
          </div>
        ) : null}

        {/* stats */}
        <div style={{
          display: "flex",
          alignItems: "stretch",
          marginTop: "4px",
        }}>
          <StatPill icon={<IconBed />}  value={details.bedrooms}  label="Bedrooms" />
          <div style={{ width: "1px", background: "rgba(255,255,255,0.1)", margin: "10px 0" }} />
          <StatPill icon={<IconBath />} value={details.bathrooms} label="Bathrooms" />
          <div style={{ width: "1px", background: "rgba(255,255,255,0.1)", margin: "10px 0" }} />
          <StatPill icon={<IconArea />} value={details.sqft ? `${details.sqft}` : null} label="sq.ft" />
        </div>

        {/* CTA button */}
        <motion.button
          onClick={(e) => { e.stopPropagation(); onClick && onClick(); }}
          whileHover={{ background: "linear-gradient(135deg, rgba(99,102,241,0.32) 0%, rgba(79,70,229,0.22) 100%)" }}
          style={{
            marginTop: "4px",
            width: "100%",
            padding: "12px 20px",
            borderRadius: "12px",
            border: "1px solid rgba(99,102,241,0.35)",
            background: "linear-gradient(135deg, rgba(99,102,241,0.18) 0%, rgba(79,70,229,0.1) 100%)",
            color: "#a5b4fc",
            fontSize: "1.2rem",
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            letterSpacing: "0.02em",
            outline: "none",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          View Property
          <motion.span variants={arrowVariants} style={{ display: "flex", alignItems: "center" }}>
            <IconArrow />
          </motion.span>
        </motion.button>
      </div>

      {/* subtle inner top-edge highlight line */}
      <div style={{
        position: "absolute",
        top: 0,
        left: "20%",
        right: "20%",
        height: "1px",
        background: "linear-gradient(to right, transparent, rgba(255,255,255,0.12), transparent)",
        pointerEvents: "none",
      }} />
    </motion.div>
  );
};

export default PropertyCard;
