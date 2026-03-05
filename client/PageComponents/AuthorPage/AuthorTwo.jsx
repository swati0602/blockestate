import React, { useState, useEffect } from "react";

const AuthorTwo = ({ address, author }) => {
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    if (address) {
      const savedImg = localStorage.getItem(`${address.toLowerCase()}_be_profileImg`);
      setProfilePic(savedImg);
    }
  }, [address]);

  return (
    <div style={{ position: "relative", marginTop: "-90px", zIndex: 10 }}>
      <div className="container">
        <div style={{
          background: "rgba(19, 19, 29, 0.85)",
          backdropFilter: "blur(12px)",
          borderRadius: "24px",
          padding: "32px",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          gap: "28px"
        }}>
          {/* Profile Image with Glow */}
          <div style={{ position: "relative" }}>
            <div style={{
              width: "140px", height: "140px", borderRadius: "20px", overflow: "hidden",
              border: "3px solid #13131d", boxShadow: "0 0 30px rgba(112,72,232,0.3)"
            }}>
              {profilePic ? (
                <img src={profilePic} alt="Author" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{
                  width: "100%", height: "100%", background: "linear-gradient(135deg, #7048e8, #a78bfa)",
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  <i className="feather-user" style={{ color: "#fff", fontSize: "3.5rem" }} />
                </div>
              )}
            </div>
            {/* Online Status */}
            <div style={{
              position: "absolute", bottom: "-8px", right: "-8px", width: "24px", height: "24px",
              borderRadius: "50%", background: "#00FFA3", border: "4px solid #13131d",
              boxShadow: "0 0 15px rgba(0,255,163,0.6)"
            }} />
          </div>

          {/* Info Content */}
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <span style={{
                background: "rgba(112,72,232,0.18)", color: "#a78bfa", padding: "6px 14px",
                borderRadius: "20px", fontSize: "0.85rem", fontWeight: "700", border: "1px solid rgba(112,72,232,0.35)",
                textTransform: "uppercase", letterSpacing: "1px"
              }}>
                Verified Investor
              </span>
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.9rem" }}>
                {address?.slice(0, 12)}...{address?.slice(-8)}
              </span>
            </div>

            <h2 style={{ fontSize: "2.4rem", fontWeight: "800", color: "#fff", marginBottom: "16px" }}>
              Profile Overview
            </h2>

            <div style={{ display: "flex", gap: "24px" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>
                  Owned Property
                </span>
                <span style={{ fontSize: "2rem", fontWeight: "800", color: "#7048e8" }}>
                  {author.length || 0}
                </span>
              </div>
              <div style={{ width: "1px", height: "40px", background: "rgba(255,255,255,0.1)", alignSelf: "center" }} />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>
                  Total Value
                </span>
                <span style={{ fontSize: "2rem", fontWeight: "800", color: "#fff" }}>
                  {author.reduce((acc, p) => acc + parseFloat(p.price), 0).toFixed(2)} ETH
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorTwo;
