import React from "react";

const DetailOne = () => {
  return (
    <div
      style={{
        background: "#0f0f1a",
        padding: "30px 0",
        borderBottom: "1px solid rgba(139, 92, 246, 0.1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative background glow */}
      <div
        style={{
          position: "absolute",
          top: "-80px",
          left: "20%",
          width: "500px",
          height: "220px",
          background: "radial-gradient(ellipse, rgba(139, 92, 246, 0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-6 col-12">
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div
                style={{
                  width: "4px",
                  height: "46px",
                  background: "linear-gradient(180deg, #8b5cf6 0%, rgba(139, 92, 246, 0) 100%)",
                  borderRadius: "2px",
                  flexShrink: 0,
                }}
              />
              <div>
                <p
                  style={{
                    color: "#8b5cf6",
                    fontSize: "11px",
                    fontWeight: "700",
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    margin: "0 0 4px",
                    opacity: 0.8,
                  }}
                >
                  BlockEstate
                </p>
                <h1
                  style={{
                    fontSize: "28px",
                    fontWeight: "700",
                    margin: "0",
                    color: "#fff",
                    lineHeight: "1.2",
                  }}
                >
                  Property Details
                </h1>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-12">
            <nav style={{ display: "flex", justifyContent: "flex-end" }}>
              <ol
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  margin: 0,
                  padding: "8px 18px",
                  listStyle: "none",
                  background: "rgba(139, 92, 246, 0.05)",
                  border: "1px solid rgba(139, 92, 246, 0.12)",
                  borderRadius: "30px",
                }}
              >
                <li style={{ display: "flex", alignItems: "center" }}>
                  <a
                    href="/"
                    style={{
                      color: "#8b5cf6",
                      textDecoration: "none",
                      fontSize: "13px",
                      fontWeight: "500",
                      lineHeight: "1",
                    }}
                  >
                    Home
                  </a>
                </li>
                <li style={{ display: "flex", alignItems: "center", color: "rgba(139, 92, 246, 0.35)", fontSize: "14px", lineHeight: "1" }}>›</li>
                <li style={{ display: "flex", alignItems: "center", color: "#acacac", fontSize: "13px", lineHeight: "1" }}>Property Details</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailOne;
