import React from "react";

const ContactFour = () => {
  return (
    <div style={{ padding: "0 0 80px" }}>
      <div className="container">

        {/* Divider */}
        <div style={{ height: "1px", background: "linear-gradient(to right, transparent, rgba(112,72,232,0.3), transparent)", marginBottom: "48px" }} />

        {/* Label */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
          <div style={{ width: 36, height: 36, borderRadius: "10px", background: "rgba(112,72,232,0.15)", border: "1px solid rgba(112,72,232,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9d7cf4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: "0.88rem", fontWeight: 700, color: "#9d7cf4", letterSpacing: "0.08em", textTransform: "uppercase" }}>Our Location</p>
            <p style={{ margin: 0, fontSize: "1rem", color: "rgba(200,215,230,0.45)" }}>Mumbai, India — Global operations</p>
          </div>
        </div>

        {/* Map */}
        <div style={{
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid rgba(112,72,232,0.2)",
          boxShadow: "0 0 40px rgba(112,72,232,0.1)",
        }}>
          <iframe
            title="BlockEstate Location"
            src="https://www.google.com/maps?q=Mumbai,India&output=embed"
            height="480"
            style={{ border: 0, width: "100%", display: "block" }}
            allowFullScreen
            loading="lazy"
          />
        </div>

      </div>
    </div>
  );
};

export default ContactFour;