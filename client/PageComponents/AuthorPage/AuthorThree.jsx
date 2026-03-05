import React, { useState } from "react";
import { useRouter } from "next/router";
import { Loader } from "../Components";

//  helpers 

function parsePropertyDetails(description) {
  if (!description) return { bedrooms: null, bathrooms: null, sqft: null };
  const match = description.match(
    /Bedrooms:\s*([^\s|]+)\s*\|\s*Bathrooms:\s*([^\s|]+)\s*\|\s*Area:\s*([^\s]+)/
  );
  if (match) return { bedrooms: match[1], bathrooms: match[2], sqft: match[3] };
  return { bedrooms: null, bathrooms: null, sqft: null };
}

//  icons 

const BED_ICON = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 20v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8" />
    <path d="M5 10V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4" />
    <path d="M2 20h20" />
  </svg>
);

const BATH_ICON = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
    <line x1="3" y1="13" x2="21" y2="13" />
  </svg>
);

const AREA_ICON = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 3 21 3 21 9" />
    <polyline points="9 21 3 21 3 15" />
    <line x1="21" y1="3" x2="14" y2="10" />
    <line x1="3" y1="21" x2="10" y2="14" />
  </svg>
);

//  card 

const cardStyle = `
  @keyframes cardFadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
`;

const PropertyCard = ({ property, index, showUpdate }) => {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const details = parsePropertyDetails(property.description || "");
  const imgSrc =
    property.image && property.image.startsWith("http")
      ? property.image
      : `/portfolio/portfolio-0${(index % 8) + 1}.jpg`;

  return (
    <div
      onClick={() => router.push(`/detail?property=${property.productID}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#13131d",
        borderRadius: "16px",
        overflow: "hidden",
        cursor: "pointer",
        border: "1px solid rgba(255,255,255,0.07)",
        display: "flex",
        flexDirection: "column",
        animation: `cardFadeUp 0.45s ease both`,
        animationDelay: `${index * 80}ms`,
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "0 20px 50px rgba(0,0,0,0.5)" : "none",
        transition: "transform 0.22s ease, box-shadow 0.22s ease",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", width: "100%", height: "210px", overflow: "hidden" }}>
        <img
          src={imgSrc}
          alt={property.title}
          onError={(e) => { e.target.src = `/portfolio/portfolio-0${(index % 8) + 1}.jpg`; }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.4s ease",
            transform: hovered ? "scale(1.05)" : "scale(1)",
          }}
        />
        {/* Hover arrow overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(0,0,0,0.22)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.25s ease",
          pointerEvents: "none",
        }}>
          <div style={{
            width: "58px",
            height: "58px",
            borderRadius: "50%",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: hovered ? "scale(1)" : "scale(0.55)",
            transition: "transform 0.28s ease",
            boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>
        {showUpdate && (
          <a
            href={`/update?property=${property.productID}`}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              background: "rgba(112,72,232,0.92)",
              color: "#fff",
              padding: "9px 22px",
              borderRadius: "50px",
              fontSize: "1.05rem",
              fontWeight: "600",
              textDecoration: "none",
              backdropFilter: "blur(6px)",
              transition: "background 0.2s",
            }}
          >
            Update
          </a>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: "18px 18px 16px", flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
        {/* Title + price */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "10px" }}>
          <span style={{ fontSize: "1.9rem", fontWeight: "700", color: "#ffffff", lineHeight: 1.3, flex: 1 }}>
            {property.title && property.title.length > 28
              ? property.title.slice(0, 26) + ""
              : property.title || "Untitled"}
          </span>
          <span style={{
            background: "#0a2e1a",
            color: "#2ecc71",
            padding: "7px 18px",
            borderRadius: "50px",
            fontSize: "1.4rem",
            fontWeight: "600",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}>
            {property.price} ETH
          </span>
        </div>

        {/* Address */}
        {property.address ? (
          <p style={{ color: "#888", fontSize: "1.35rem", margin: 0, lineHeight: 1.4 }}>
            {property.address}
          </p>
        ) : (
          <p style={{ color: "#666", fontSize: "1.35rem", margin: 0 }}>
            Category: {property.category}
          </p>
        )}

        {/* Divider */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", margin: "2px 0" }} />

        {/* Stats */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", color: "#aaa" }}>
            {BED_ICON}
            <span style={{ fontSize: "1.3rem", fontWeight: "600", color: "#fff" }}>
              {details.bedrooms ? details.bedrooms + " Beds" : "--"}
            </span>
          </div>
          <div style={{ width: "1px", height: "42px", background: "rgba(255,255,255,0.1)" }} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", color: "#aaa" }}>
            {BATH_ICON}
            <span style={{ fontSize: "1.3rem", fontWeight: "600", color: "#fff" }}>
              {details.bathrooms ? details.bathrooms + " Baths" : "--"}
            </span>
          </div>
          <div style={{ width: "1px", height: "42px", background: "rgba(255,255,255,0.1)" }} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", color: "#aaa" }}>
            {AREA_ICON}
            <span style={{ fontSize: "1.3rem", fontWeight: "600", color: "#fff" }}>
              {details.sqft ? details.sqft + " sqft" : "--"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

//  main component 

const AuthorThree = ({ properties, author }) => {
  const [activeTab, setActiveTab] = useState("owned");

  const list = activeTab === "owned" ? author : properties;
  const showUpdate = activeTab === "owned";

  return (
    <>
      <style suppressHydrationWarning>{`
        ${cardStyle}
        .tab-btn {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .tab-btn:hover {
          background: rgba(112,72,232,0.1) !important;
          transform: translateY(-2px);
        }
        .tab-btn.active {
          box-shadow: 0 8px 20px rgba(112,72,232,0.25);
        }
      `}</style>
      <div style={{ padding: "60px 0 100px", minHeight: "600px" }}>
        <div className="container">
          {/* Header & Tabs Section */}
          <div style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "40px",
            flexWrap: "wrap",
            gap: "20px"
          }}>
            <div>
              <h3 style={{ fontSize: "2rem", fontWeight: "800", color: "#fff", marginBottom: "8px" }}>
                {activeTab === "owned" ? "Portfolio Assets" : "Market Listings"}
              </h3>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "1.1rem" }}>
                {activeTab === "owned"
                  ? "Manage and view your blockchain-verified real estate holdings."
                  : "Explore available investment opportunities across the platform."}
              </p>
            </div>

            {/* Premium Tab bar */}
            <div style={{
              display: "flex",
              gap: "12px",
              background: "rgba(255,255,255,0.03)",
              padding: "6px",
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.05)"
            }}>
              {[
                { key: "owned", label: "My Portfolio", count: author?.length ?? 0, icon: "feather-briefcase" },
                { key: "all", label: "All Properties", count: properties?.length ?? 0, icon: "feather-grid" },
              ].map(t => (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className={`tab-btn ${activeTab === t.key ? "active" : ""}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "12px 24px",
                    borderRadius: "12px",
                    border: "none",
                    background: activeTab === t.key ? "linear-gradient(135deg, #7048e8, #4c2fb3)" : "transparent",
                    color: activeTab === t.key ? "#fff" : "rgba(255,255,255,0.5)",
                    fontWeight: 700,
                    fontSize: "15px",
                    cursor: "pointer",
                    whiteSpace: "nowrap"
                  }}
                >
                  <i className={t.icon} style={{ fontSize: "14px" }} />
                  {t.label}
                  <span style={{
                    padding: "2px 8px",
                    borderRadius: "8px",
                    fontSize: "12px",
                    background: activeTab === t.key ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)",
                    color: "#fff"
                  }}>
                    {t.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Grid Container */}
          <div style={{
            background: "rgba(255,255,255,0.01)",
            borderRadius: "32px",
            border: "1px solid rgba(255,255,255,0.03)",
            padding: "40px",
            boxShadow: "inset 0 0 40px rgba(0,0,0,0.2)"
          }}>
            {!list || list.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 0" }}>
                <div style={{
                  width: "80px", height: "80px", background: "rgba(255,255,255,0.03)",
                  borderRadius: "50%", display: "flex", alignItems: "center",
                  justifyContent: "center", margin: "0 auto 24px"
                }}>
                  <i className="feather-search" style={{ fontSize: "32px", color: "rgba(255,255,255,0.2)" }} />
                </div>
                <h4 style={{ color: "#fff", fontWeight: "700", marginBottom: "12px" }}>No Properties Found</h4>
                <p style={{ color: "rgba(255,255,255,0.4)" }}>
                  There are currently no items to display in this category.
                </p>
              </div>
            ) : (
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                gap: "30px"
              }}>
                {list.map((property, i) => (
                  <PropertyCard key={property.productID || i} property={property} index={i} showUpdate={showUpdate} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthorThree;