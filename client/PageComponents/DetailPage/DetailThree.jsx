import React from "react";

const DetailThree = ({ properties = [] }) => {
  if (!properties || properties.length === 0) {
    return null;
  }

  return (
    <section style={{ paddingTop: "70px", paddingBottom: "80px", borderTop: "1px solid rgba(139, 92, 246, 0.08)" }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "40px" }}>
          <div>
            <p style={{ color: "#8b5cf6", fontSize: "11px", fontWeight: "700", letterSpacing: "3px", textTransform: "uppercase", margin: "0 0 8px", opacity: 0.8 }}>
              Browse More
            </p>
            <h2
              style={{
                fontSize: "30px",
                fontWeight: "800",
                margin: "0",
                color: "#fff",
                lineHeight: "1.2",
              }}
            >
              Recent Properties
            </h2>
          </div>
          <a
            href="/explor"
            style={{
              color: "#8b5cf6",
              fontSize: "13px",
              fontWeight: "600",
              textDecoration: "none",
              padding: "8px 18px",
              border: "1px solid rgba(139, 92, 246, 0.25)",
              borderRadius: "20px",
              background: "rgba(139, 92, 246, 0.06)",
              letterSpacing: "0.3px",
            }}
          >
            View All →
          </a>
        </div>

        <div className="row g-4">
          {properties.slice(0, 6).map((property, i) => (
            <div
              key={i}
              className="col-lg-4 col-md-6 col-sm-6 col-12"
            >
              <a href={`/detail?property=${property.productID}`} style={{ textDecoration: "none", display: "block" }}>
                <div
                  style={{
                  background: "#0f0f1a",
                  borderRadius: "16px",
                    overflow: "hidden",
                    border: "1px solid rgba(139, 92, 246, 0.1)",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.border = "1px solid rgba(139, 92, 246, 0.28)";
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 20px 60px rgba(0, 0, 0, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.border = "1px solid rgba(139, 92, 246, 0.1)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* Image */}
                  <div
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      height: "200px",
                      background: "#05050e",
                    }}
                  >
                    <img
                      src={property.image || `/portfolio/portfolio-0${((i % 8) + 1).toString().padStart(2, "0")}.jpg`}
                      alt={property.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        transition: "transform 0.5s ease",
                      }}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = `/portfolio/portfolio-0${((i % 8) + 1).toString().padStart(2, "0")}.jpg`;
                      }}
                      onMouseEnter={(e) => (e.target.style.transform = "scale(1.08)")}
                      onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                    />
                    {/* Category badge */}
                    <div
                      style={{
                        position: "absolute",
                        top: "12px",
                        left: "12px",
                        background: "rgba(0,0,0,0.65)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(139, 92, 246, 0.25)",
                        borderRadius: "20px",
                        padding: "4px 12px",
                        fontSize: "10px",
                        color: "#8b5cf6",
                        fontWeight: "700",
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                      }}
                    >
                      {property.category}
                    </div>
                    {/* Bottom gradient */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0, left: 0, right: 0,
                        height: "80px",
                        background: "linear-gradient(to top, rgba(11,11,29,0.9) 0%, transparent 100%)",
                        pointerEvents: "none",
                      }}
                    />
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: "18px 20px 20px" }}>
                    {/* Reviewer avatars */}
                    {property.reviewers?.length > 0 && (
                      <div style={{ display: "flex", gap: "4px", marginBottom: "12px", alignItems: "center" }}>
                        {property.reviewers.slice(0, 4).map((el, j) => (
                          <img
                            key={j}
                            src={`/client/client-${(j % 5) + 1}.png`}
                            alt="reviewer"
                            style={{
                              width: "26px",
                              height: "26px",
                              borderRadius: "50%",
                              border: "2px solid rgba(139, 92, 246, 0.3)",
                              marginLeft: j > 0 ? "-6px" : "0",
                              background: "#0b0b1d",
                            }}
                            title={`${el?.slice(0, 14)}...`}
                          />
                        ))}
                        {property.reviewers.length > 4 && (
                          <div
                            style={{
                              width: "26px",
                              height: "26px",
                              borderRadius: "50%",
                              background: "rgba(139, 92, 246, 0.1)",
                              border: "2px solid rgba(139, 92, 246, 0.3)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "9px",
                              color: "#8b5cf6",
                              fontWeight: "800",
                              marginLeft: "-6px",
                            }}
                          >
                            +{property.reviewers.length - 4}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Title */}
                    <h5
                      style={{
                        color: "#e6f1ff",
                        fontSize: "15px",
                        fontWeight: "700",
                        margin: "0 0 6px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        lineHeight: "1.3",
                      }}
                    >
                      {property.title?.length >= 28 ? `${property.title.slice(0, 25)}...` : property.title}
                    </h5>

                    {/* Divider + price + likes */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingTop: "14px",
                        borderTop: "1px solid rgba(139, 92, 246, 0.08)",
                        marginTop: "10px",
                      }}
                    >
                      <div>
                        <p style={{ color: "#8892b0", fontSize: "10px", margin: "0 0 3px", fontWeight: "600", letterSpacing: "0.5px", textTransform: "uppercase" }}>Price</p>
                        <span
                          style={{
                            fontSize: "16px",
                            fontWeight: "800",
                            color: "#8b5cf6",
                          }}
                        >
                          {property.price} ETH
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                          background: "rgba(139, 92, 246, 0.07)",
                          border: "1px solid rgba(139, 92, 246, 0.15)",
                          borderRadius: "20px",
                          padding: "5px 12px",
                        }}
                      >
                        <span style={{ color: "#f472b6", fontSize: "12px" }}>♥</span>
                        <span style={{ color: "#8892b0", fontSize: "12px", fontWeight: "600" }}>{property.reviewers?.length || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DetailThree;
