import React from "react";
import Link from "next/link";
import { Loader } from "../../PageComponents/Components";

const Collection = ({ likedProperties = [], isLoading, likedIds = [] }) => {
  if (isLoading) {
    return (
      <div style={{ padding: "80px 0" }}>
        <Loader />
      </div>
    );
  }

  const hasLiked = likedProperties.length > 0;

  return (
    <div style={{ padding: "40px 0 80px" }}>
      <div className="container">

        {/* Header row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "36px",
          }}
        >
          <div>
            <p
              style={{
                margin: "0 0 4px",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#7048e8",
              }}
            >
              My Collection
            </p>
            <h3
              style={{
                margin: 0,
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                fontWeight: 800,
                background: "linear-gradient(90deg, #fff 40%, #a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Liked Properties
            </h3>
          </div>
          {hasLiked && (
            <span
              style={{
                background: "rgba(112,72,232,0.15)",
                border: "1px solid rgba(112,72,232,0.35)",
                borderRadius: "999px",
                padding: "6px 16px",
                fontSize: "13px",
                color: "#a78bfa",
                fontWeight: 600,
              }}
            >
              {likedProperties.length} saved
            </span>
          )}
        </div>

        {hasLiked ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "24px",
            }}
          >
            {likedProperties.map((el, i) => (
              <Link key={el.productID} href={`/detail?property=${el.productID}`} legacyBehavior>
                <a style={{ textDecoration: "none", display: "block" }}>
                  <div
                    style={{
                      background: "rgba(255,255,255,0.025)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      borderRadius: "16px",
                      overflow: "hidden",
                      transition: "transform 0.2s, border-color 0.2s, box-shadow 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.borderColor = "rgba(112,72,232,0.45)";
                      e.currentTarget.style.boxShadow = "0 12px 40px rgba(112,72,232,0.18)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {/* Image */}
                    <div style={{ position: "relative", height: "180px", overflow: "hidden" }}>
                      <img
                        src={
                          el.image && el.image.startsWith("http")
                            ? el.image
                            : `/portfolio/portfolio-0${(i % 8) + 1}.jpg`
                        }
                        alt={el.title}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `/portfolio/portfolio-0${(i % 8) + 1}.jpg`;
                        }}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.4s",
                        }}
                      />
                      {/* Category badge */}
                      <span
                        style={{
                          position: "absolute",
                          top: "12px",
                          left: "12px",
                          background: "rgba(0,0,0,0.6)",
                          backdropFilter: "blur(8px)",
                          border: "1px solid rgba(255,255,255,0.15)",
                          borderRadius: "999px",
                          padding: "3px 10px",
                          fontSize: "11px",
                          color: "rgba(255,255,255,0.85)",
                          fontWeight: 600,
                        }}
                      >
                        {el.category || "Property"}
                      </span>
                      {/* Heart badge */}
                      <span
                        style={{
                          position: "absolute",
                          top: "12px",
                          right: "12px",
                          background: "rgba(239,68,68,0.85)",
                          borderRadius: "999px",
                          width: "28px",
                          height: "28px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "13px",
                        }}
                      >
                        ❤️
                      </span>
                    </div>

                    {/* Info */}
                    <div style={{ padding: "16px 18px 18px" }}>
                      <h6
                        style={{
                          margin: "0 0 6px",
                          fontSize: "0.95rem",
                          fontWeight: 700,
                          color: "#fff",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {el.title}
                      </h6>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <span
                          style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)" }}
                        >
                          {el.location || "On-Chain"}
                        </span>
                        <span
                          style={{
                            fontSize: "13px",
                            fontWeight: 700,
                            background: "linear-gradient(90deg, #00FFA3, #00D9FF)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }}
                        >
                          {parseFloat(el.price).toFixed(4)} ETH
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        ) : (
          /* Empty state */
          <div
            style={{
              textAlign: "center",
              padding: "80px 24px",
              borderRadius: "20px",
              border: "1px dashed rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                background: "rgba(112,72,232,0.12)",
                border: "1px solid rgba(112,72,232,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "32px",
                margin: "0 auto 20px",
              }}
            >
              🏠
            </div>
            <h4
              style={{
                color: "#f1f5f9",
                marginBottom: "10px",
                fontSize: "1.2rem",
                fontWeight: 700,
              }}
            >
              No liked properties yet
            </h4>
            <p
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: "0.9rem",
                marginBottom: "28px",
                maxWidth: "340px",
                margin: "0 auto 28px",
                lineHeight: 1.7,
              }}
            >
              Tap the ♥ icon on any property card to save it here.
            </p>
            <Link href="/explor" legacyBehavior>
              <a
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 28px",
                  borderRadius: "999px",
                  background: "linear-gradient(135deg, #7048e8, #00D9FF)",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "14px",
                  textDecoration: "none",
                  boxShadow: "0 4px 20px rgba(112,72,232,0.35)",
                }}
              >
                Explore Properties →
              </a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
