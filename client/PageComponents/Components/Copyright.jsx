import React from "react";
import Link from "next/link";

const Copyright = () => {
  return (
    <>
      <div style={{
        background: "#07070f",
        borderTop: "1px solid rgba(112,72,232,0.2)",
        padding: "14px 0",
      }}>
        <div class="container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>

            {/* Left — copyright */}
            <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "1.14rem" }}>
              ©2026{" "}
              <span style={{ color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>BlockEstate</span>
              . All rights reserved.
            </span>

            {/* Center — links */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              {[
                { href: "/terms-condition", label: "Terms & Conditions" },
                { href: "/privacy",         label: "Privacy Policy" },
              ].map(({ href, label }, i) => (
                <React.Fragment key={href}>
                  {i > 0 && <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "1.07rem" }}>•</span>}
                  <Link href={href} style={{
                    color: "rgba(255,255,255,0.4)",
                    fontSize: "1.14rem",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = "#a78bfa"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
                  >{label}</Link>
                </React.Fragment>
              ))}
            </div>

            {/* Right — tagline */}
            <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "1.1rem", fontStyle: "italic" }}>
              Built on blockchain — own real estate on-chain.
            </span>

          </div>
        </div>
      </div>

      <div class="mouse-cursor cursor-outer"></div>
      <div class="mouse-cursor cursor-inner"></div>

      <div class="rn-progress-parent">
        <svg class="rn-back-circle svg-inner" width="100%" height="100%" viewBox="-1 -1 102 102">
          <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
        </svg>
      </div>
    </>
  );
};

export default Copyright;
