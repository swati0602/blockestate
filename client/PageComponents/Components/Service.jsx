import React from "react";
import Link from "next/link";

const STEPS = [
  {
    step: "Step 01",
    icon: "feather-cpu",
    color: "#7048e8",
    bg: "rgba(112,72,232,0.12)",
    title: "Connect Your Wallet",
    desc: "Link your MetaMask or compatible Web3 wallet securely to access the BlockEstate marketplace.",
    link: "/connect",
  },
  {
    step: "Step 02",
    icon: "feather-search",
    color: "#00c896",
    bg: "rgba(0,200,150,0.1)",
    title: "Browse Properties",
    desc: "Explore hundreds of verified properties across categories — Housing, Office, Rental, Farmhouse & more.",
    link: "/explor",
  },
  {
    step: "Step 03",
    icon: "feather-tag",
    color: "#f6ad55",
    bg: "rgba(246,173,85,0.1)",
    title: "List or Buy",
    desc: "Sellers can list properties with a fixed price. Buyers can purchase instantly using ETH — no middlemen.",
    link: "/create",
  },
  {
    step: "Step 04",
    icon: "feather-shield",
    color: "#63b3ed",
    bg: "rgba(99,179,237,0.1)",
    title: "Ownership on-Chain",
    desc: "Every transaction is recorded immutably on the blockchain — your ownership is transparent and tamper-proof.",
    link: "/about",
  },
];

const Service = () => {
  return (
    <div style={{ padding: "80px 0", background: "#0d0d1a" }}>
      <div class="container">
        <div class="row mb--50">
          <div class="col-12" style={{ textAlign: "center" }}>
            <p style={{ color: "#7048e8", fontSize: "16px", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "10px" }}>
              How it works
            </p>
            <h3 style={{ color: "#fff", fontSize: "clamp(1.7rem,3vw,2.3rem)", fontWeight: 700, marginBottom: "14px" }}>
              Buy &amp; sell real estate on the blockchain
            </h3>
            <p style={{ color: "#718096", fontSize: "1.25rem", maxWidth: "520px", margin: "0 auto" }}>
              A seamless four-step process to discover, purchase, and own property — fully on-chain.
            </p>
          </div>
        </div>

        <div class="row g-5">
          {STEPS.map((s, i) => (
            <div key={i} class="col-xl-3 col-lg-6 col-md-6 col-12">
              <Link legacyBehavior href={s.link}>
                <a style={{ textDecoration: "none", display: "block", height: "100%" }}>
                  <div style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "16px",
                    padding: "32px 28px",
                    height: "100%",
                    transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.borderColor = s.color;
                    e.currentTarget.style.boxShadow = `0 16px 40px rgba(0,0,0,0.3)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                    e.currentTarget.style.boxShadow = "";
                  }}
                  >
                    {/* icon */}
                    <div style={{
                      width: "56px", height: "56px", borderRadius: "14px",
                      background: s.bg, display: "flex", alignItems: "center",
                      justifyContent: "center", marginBottom: "20px",
                    }}>
                      <i class={s.icon} style={{ color: s.color, fontSize: "27px" }} />
                    </div>

                    <div style={{ color: "#718096", fontSize: "1.05rem", fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "10px" }}>
                      {s.step}
                    </div>
                    <h4 style={{ color: "#fff", fontSize: "1.35rem", fontWeight: 700, marginBottom: "12px" }}>
                      {s.title}
                    </h4>
                    <p style={{ color: "#718096", fontSize: "1.18rem", lineHeight: 1.7, margin: 0 }}>
                      {s.desc}
                    </p>

                    <div style={{ marginTop: "20px", color: s.color, fontSize: "1.12rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
                      Learn more <i class="feather-arrow-right" />
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;
