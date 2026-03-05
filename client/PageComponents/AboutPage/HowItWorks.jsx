import React from "react";

const STEPS = [
  {
    number: "01",
    icon: "🔗",
    title: "Connect Your Wallet",
    desc: "Start by connecting your MetaMask or any Web3 wallet. Your wallet is your identity on BlockEstate — no sign-up form, no email, no password. Your Ethereum address is your account.",
    color: "#7B61FF",
  },
  {
    number: "02",
    icon: "🏡",
    title: "Browse & Explore Properties",
    desc: "Explore hundreds of verified real estate listings from around the world. Filter by category, price range, or location. Every listing shows the owner's wallet address, asking price in ETH, and community reviews.",
    color: "#E7524A",
  },
  {
    number: "03",
    icon: "📋",
    title: "List Your Property as an NFT",
    desc: "Have a property to sell? Fill in the details — title, description, category, address, images — set your price in ETH, and click List. Our smart contract mints your property as a unique NFT on the Ethereum blockchain instantly.",
    color: "#2D9CDB",
  },
  {
    number: "04",
    icon: "💸",
    title: "Buy with Crypto — No Banks",
    desc: "Found your dream property? Hit Buy. Our smart contract transfers the ETH from your wallet directly to the seller and transfers NFT ownership to you — all in one atomic transaction. No escrow, no waiting, no bank approval.",
    color: "#27AE60",
  },
  {
    number: "05",
    icon: "📜",
    title: "Ownership Recorded On-Chain",
    desc: "Once purchased, ownership is permanently recorded on the Ethereum blockchain. Your wallet address becomes the verified owner of the property NFT — visible to anyone, anywhere, at any time. Tamper-proof and immutable.",
    color: "#F2994A",
  },
  {
    number: "06",
    icon: "⭐",
    title: "Review & Rate Properties",
    desc: "After a transaction, buyers can leave on-chain reviews and star ratings. Other users can like helpful reviews. All feedback is stored permanently on-chain — no fake reviews, no deletions, full transparency.",
    color: "#9B51E0",
  },
];

const TECH_STACK = [
  {
    label: "Ethereum",
    value: "EVM",
    icon: (
      <div style={{ width: 44, height: 44, borderRadius: 10, background: "#1a1a2e", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="24" height="38" viewBox="0 0 256 417" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon fill="#343434" points="127.9611,0 125.1661,9.5 125.1661,285.168 127.9611,287.958 255.9231,212.32"/>
          <polygon fill="#8C8C8C" points="127.9611,0 0,212.32 127.9611,287.958 127.9611,154.158"/>
          <polygon fill="#3C3C3B" points="127.9611,312.1866 126.3861,314.1066 126.3861,412.3056 127.9611,416.9066 255.9991,236.5866"/>
          <polygon fill="#8C8C8C" points="127.9611,416.9066 127.9611,312.1866 0,236.5866"/>
          <polygon fill="#141414" points="127.9611,287.9577 255.9211,212.3207 127.9611,154.1587"/>
          <polygon fill="#393939" points="0.0009,212.3207 127.9609,287.9577 127.9609,154.1587"/>
        </svg>
      </div>
    ),
  },
  {
    label: "Solidity",
    value: "^0.8.9",
    icon: (
      <div style={{ width: 44, height: 44, borderRadius: 10, background: "#2b2b2b", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="28" height="28" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
          <path d="M 80.11 2 L 48.12 2 L 32.12 29.5 L 48.12 57 L 80.11 57 L 96.11 29.5 Z" fill="#5c6bc0" opacity="0.4"/>
          <path d="M 48.11 126 L 80.1 126 L 96.1 98.5 L 80.1 71 L 48.11 71 L 32.11 98.5 Z" fill="#5c6bc0" opacity="0.9"/>
          <path d="M 80.11 2 L 112.1 2 L 128.1 29.5 L 112.1 57 L 80.11 57 L 64.11 29.5 Z" fill="#7986cb" opacity="0.6"/>
          <path d="M 48.11 126 L 16.12 126 L 0.12 98.5 L 16.12 71 L 48.11 71 L 64.11 98.5 Z" fill="#7986cb" opacity="0.6"/>
        </svg>
      </div>
    ),
  },
  {
    label: "Next.js",
    value: "v15.2",
    icon: (
      <div style={{ width: 44, height: 44, borderRadius: 10, background: "#000", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.15)" }}>
        <svg width="26" height="26" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
          <path d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64c11.2 0 21.7-2.9 30.8-7.9L48.4 55.3v36.6H35.1V40.4h28.1l48.6 75.5C122.1 106.5 128 86 128 64c0-35.3-28.7-64-64-64zm22.1 84.6l-7.5-11.3V40.4h7.5v44.2z" fill="white"/>
        </svg>
      </div>
    ),
  },
  {
    label: "MetaMask",
    value: "Web3",
    icon: (
      <div style={{ width: 44, height: 44, borderRadius: 10, background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="30" height="28" viewBox="0 0 318.6 298.6" xmlns="http://www.w3.org/2000/svg">
          <path fill="#E2761B" stroke="#E2761B" strokeLinecap="round" strokeLinejoin="round" d="M274.1 35.5l-99.7 74.1 18.4-43.6z"/>
          <path fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round" d="M44.4 35.5l98.7 74.9-17.5-44.4zM238.3 206.8l-26.5 40.6 56.7 15.6 16.3-55.3zM33.9 207.7L50.1 263l56.7-15.6-26.5-40.6z"/>
          <path fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round" d="M103.6 138.2l-15.8 23.9 56.3 2.5-2-60.5zM214.9 138.2l-39.3-34.8-1.3 61.2 56.2-2.5zM106.8 247.4l33.8-16.5-29.2-22.8zM177.9 230.9l33.9 16.5-4.7-39.3z"/>
          <path fill="#F6851B" stroke="#F6851B" strokeLinecap="round" strokeLinejoin="round" d="M211.8 247.4l-33.9-16.5 2.7 22.1-.3 9.3zM106.8 247.4l31.5 14.9-.2-9.3 2.5-22.1z"/>
        </svg>
      </div>
    ),
  },
  {
    label: "IPFS",
    value: "Pinata",
    icon: (
      <div style={{ width: 44, height: 44, borderRadius: 10, background: "#469EA2", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0L1.608 6v12L12 24l10.392-6V6zm-1.073 1.445h.001a1.8 1.8 0 002.138 0l7.534 4.35a1.794 1.794 0 000 .403l-7.535 4.35a1.8 1.8 0 00-2.137 0l-7.536-4.35a1.795 1.795 0 000-.402zM21.324 7.4c.109.08.226.147.349.201v8.7a1.8 1.8 0 00-1.069 1.852l-7.535 4.35a1.8 1.8 0 00-.349-.2V13.6a1.8 1.8 0 001.069-1.852zM2.676 7.4l7.535 4.35A1.8 1.8 0 0011.28 13.6v8.704a1.8 1.8 0 00-.349.2l-7.535-4.35a1.8 1.8 0 00-1.069-1.853v-8.7c.123-.054.24-.12.35-.2z"/>
        </svg>
      </div>
    ),
  },
  {
    label: "ethers.js",
    value: "v5",
    icon: (
      <div style={{ width: 44, height: 44, borderRadius: 10, background: "#2535A8", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="3" y="18" fontFamily="Georgia, serif" fontSize="18" fontWeight="900" fill="white" fontStyle="italic">e</text>
          <text x="13" y="12" fontFamily="monospace" fontSize="8" fontWeight="bold" fill="rgba(255,255,255,0.7)">js</text>
        </svg>
      </div>
    ),
  },
];

const HowItWorks = () => {
  return (
    <>
      {/* ── How It Works Steps ── */}
      <div style={{ paddingTop: "48px", paddingBottom: "0" }}>
        <div className="container">
          <div className="row mb--30">
            <div className="col-12 text-center">
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(123,97,255,0.1)",
                border: "1px solid rgba(123,97,255,0.25)",
                borderRadius: "50px",
                padding: "4px 14px",
                marginBottom: "12px",
              }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#7B61FF", boxShadow: "0 0 8px #7B61FF", display: "inline-block" }} />
                <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#7B61FF", letterSpacing: "0.08em", textTransform: "uppercase" }}>How It Works</span>
              </div>
              <h3 style={{ margin: 0 }}>BlockEstate in 6 Steps</h3>
              <p
                className="color-body mt--10"
                style={{ maxWidth: 520, margin: "0.5rem auto 0", fontSize: "1rem" }}
              >
                From wallet connection to on-chain ownership — the complete journey.
              </p>
            </div>
          </div>

          <div className="row g-4">
            {STEPS.map((step, i) => (
              <div className="col-lg-4 col-md-6" key={i}>
                <div
                  className="rn-about-card"
                  style={{
                    height: "100%",
                    borderTop: `3px solid ${step.color}`,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Step number watermark */}
                  <span
                    style={{
                      position: "absolute",
                      top: "-10px",
                      right: "16px",
                      fontSize: "5.3rem",
                      fontWeight: 900,
                      color: step.color,
                      opacity: 0.08,
                      lineHeight: 1,
                      userSelect: "none",
                      pointerEvents: "none",
                    }}
                  >
                    {step.number}
                  </span>
                  <div className="inner">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <span
                        style={{
                          background: step.color + "22",
                          borderRadius: "50%",
                          width: 48,
                          height: 48,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "1.7rem",
                          flexShrink: 0,
                        }}
                      >
                        {step.icon}
                      </span>
                      <span
                        style={{
                          fontSize: "1.05rem",
                          fontWeight: 700,
                          color: step.color,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                        }}
                      >
                        Step {step.number}
                      </span>
                    </div>
                    <h5
                      className="title"
                      style={{ marginBottom: "0.75rem", fontSize: "1.3rem" }}
                    >
                      {step.title}
                    </h5>
                    <p
                      className="color-body mb--0"
                      style={{ fontSize: "1.18rem", lineHeight: 1.7 }}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tech Stack + Mission ── */}
      <div style={{ paddingTop: "40px", paddingBottom: "48px" }}>
        <div className="container">
          {/* divider */}
          <div style={{
            height: "1px",
            background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)",
            marginBottom: "40px",
          }} />
          <div className="row g-3 align-items-start">
            {/* Mission */}
            <div className="col-12">
              <div style={{ padding: "0 0 8px 0" }}>

                {/* eyebrow + headline */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                  <div style={{
                    width: "3px", height: "36px", borderRadius: "4px",
                    background: "linear-gradient(to bottom, #00FFA3, #00D9FF)",
                    flexShrink: 0,
                  }} />
                  <h4 className="title" style={{ margin: 0, fontSize: "1.6rem" }}>Our Mission</h4>
                </div>

                {/* single tagline */}
                <p style={{ fontSize: "1.05rem", color: "rgba(200,215,225,0.55)", lineHeight: 1.7, marginBottom: "24px", maxWidth: "620px" }}>
                  Make real estate ownership borderless, transparent, and accessible to everyone — powered by blockchain.
                </p>

                {/* 3 minimal pillars */}
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                  {[
                    { icon: "🔓", title: "Open Access", text: "No banks. No paperwork. Anyone with a wallet can buy or list." },
                    { icon: "🔗", title: "On-Chain Truth", text: "Every sale, every owner — permanently recorded on Ethereum." },
                    { icon: "🌍", title: "Global Market", text: "List or invest in property from anywhere in the world." },
                  ].map((p, i) => (
                    <div key={i} style={{
                      flex: "1 1 200px",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      borderRadius: "12px",
                      padding: "18px 20px",
                      display: "flex",
                      gap: "14px",
                      alignItems: "flex-start",
                    }}>
                      <span style={{ fontSize: "1.5rem", lineHeight: 1, flexShrink: 0 }}>{p.icon}</span>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#fff", marginBottom: "5px" }}>{p.title}</div>
                        <div style={{ fontSize: "0.88rem", color: "rgba(200,215,225,0.5)", lineHeight: 1.6 }}>{p.text}</div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* Tech Stack */}
            <div className="col-12" style={{ marginTop: "1rem" }}>
              <h4 className="title" style={{ marginBottom: "0.5rem", fontSize: "1.5rem" }}>
                Package Versions
              </h4>
              {/* horizontal card */}
              <div style={{
                display: "flex",
                alignItems: "stretch",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "14px",
                overflow: "hidden",
                marginTop: "1rem",
              }}>
                {TECH_STACK.map((item, i) => (
                  <React.Fragment key={i}>
                    {i !== 0 && (
                      <div style={{ width: "1px", background: "rgba(255,255,255,0.1)", margin: "16px 0" }} />
                    )}
                    <div style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      padding: "18px 8px",
                    }}>
                      {item.icon}
                      <span style={{ fontSize: "1.15rem", fontWeight: 700, color: "#fff", lineHeight: 1 }}>
                        {item.value}
                      </span>
                      <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>
                        {item.label}
                      </span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
              <p style={{ marginTop: "1.25rem", fontSize: "0.9rem", color: "rgba(200,210,220,0.45)", lineHeight: 1.8 }}>
                BlockEstate is built on Ethereum and powered by Solidity smart contracts. The frontend uses Next.js + React,
                wallets connect via MetaMask &amp; Web3Modal, assets are stored on IPFS through Pinata, and all on-chain interactions
                use ethers.js v5.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
