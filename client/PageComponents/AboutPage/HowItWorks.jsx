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
    <div style={{ background: "#0a0a14" }}>

      {/* ── How It Works ── */}
      <div style={{ position: "relative", padding: "80px 0", overflow: "hidden" }}>
        {/* Glow blobs */}
        <div style={{ position: "absolute", top: "-60px", right: "10%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-60px", left: "5%", width: "360px", height: "360px", background: "radial-gradient(circle, rgba(0,217,255,0.06) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          {/* Section header */}
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: "30px", padding: "5px 16px", marginBottom: "18px" }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#8b5cf6", boxShadow: "0 0 8px #8b5cf6", display: "inline-block" }} />
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#8b5cf6", letterSpacing: "2px", textTransform: "uppercase" }}>How It Works</span>
            </div>
            <h2 style={{ margin: "0 0 14px", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, background: "linear-gradient(120deg, #fff 40%, #a78bfa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              BlockEstate in 6 Steps
            </h2>
            <p style={{ margin: "0 auto", maxWidth: "480px", fontSize: "15px", color: "rgba(255,255,255,0.38)", lineHeight: 1.7 }}>
              From wallet connection to on-chain ownership — the complete journey.
            </p>
          </div>

          {/* Steps grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
            {STEPS.map((step, i) => (
              <div
                key={i}
                style={{ position: "relative", background: "#0f0f1a", border: `1px solid ${step.color}20`, borderTop: `3px solid ${step.color}`, borderRadius: "16px", padding: "28px 26px", overflow: "hidden", transition: "box-shadow 0.25s, transform 0.25s" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 12px 40px ${step.color}18`; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                {/* Watermark number */}
                <span style={{ position: "absolute", top: "-8px", right: "16px", fontSize: "5.5rem", fontWeight: 900, color: step.color, opacity: 0.06, lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>{step.number}</span>
                {/* Icon + step label */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                  <div style={{ width: "46px", height: "46px", borderRadius: "12px", background: `${step.color}18`, border: `1px solid ${step.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0 }}>{step.icon}</div>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: step.color, letterSpacing: "2px", textTransform: "uppercase" }}>Step {step.number}</span>
                </div>
                <h5 style={{ margin: "0 0 10px", fontSize: "16px", fontWeight: 800, color: "#f1f5f9" }}>{step.title}</h5>
                <p style={{ margin: 0, fontSize: "13px", color: "rgba(255,255,255,0.42)", lineHeight: 1.78 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mission ── */}
      <div style={{ padding: "0 0 80px" }}>
        <div className="container">
          <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.18), transparent)", marginBottom: "70px" }} />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "40px", alignItems: "center", marginBottom: "70px" }}>
            {/* Left text */}
            <div>
              <p style={{ margin: "0 0 12px", fontSize: "11px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "#00FFA3" }}>Our Mission</p>
              <h2 style={{ margin: "0 0 18px", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 800, background: "linear-gradient(120deg, #fff 40%, #a5f3dc 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Real Estate for Everyone, Everywhere
              </h2>
              <p style={{ margin: "0 0 28px", fontSize: "15px", color: "rgba(255,255,255,0.42)", lineHeight: 1.8 }}>
                Make real estate ownership borderless, transparent, and accessible to everyone — powered by the Ethereum blockchain.
              </p>
              <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(0,255,163,0.3), transparent)", marginBottom: "28px" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {[
                  { n: "01", text: "Eliminate the need for banks, brokers and paperwork" },
                  { n: "02", text: "Give full ownership transparency via on-chain records" },
                  { n: "03", text: "Enable global property investment with zero borders" },
                ].map((item) => (
                  <div key={item.n} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <span style={{ fontSize: "12px", fontWeight: 800, color: "rgba(0,255,163,0.45)", fontFamily: "monospace", flexShrink: 0, minWidth: "22px" }}>{item.n}</span>
                    <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.05)" }} />
                    <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.52)", fontWeight: 500, textAlign: "right", maxWidth: "280px" }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Right quote card */}
            <div style={{ background: "#0f0f1a", border: "1px solid rgba(0,255,163,0.14)", borderRadius: "20px", padding: "36px 32px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "200px", height: "200px", background: "radial-gradient(circle, rgba(0,255,163,0.08) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
              <div style={{ fontSize: "52px", color: "rgba(0,255,163,0.2)", lineHeight: 1, marginBottom: "16px", fontFamily: "Georgia, serif" }}>"</div>
              <p style={{ margin: "0 0 28px", fontSize: "17px", fontWeight: 600, color: "rgba(255,255,255,0.72)", lineHeight: 1.8, fontStyle: "italic" }}>
                The future of property ownership is decentralized, borderless, and belongs to everyone — not just the privileged few.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "linear-gradient(135deg, #00FFA3, #00D9FF)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>🏗</div>
                <div>
                  <p style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: "#fff" }}>BlockEstate Team</p>
                  <p style={{ margin: 0, fontSize: "11px", color: "rgba(255,255,255,0.33)" }}>Founders, 2024</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <p style={{ margin: "0 0 20px", fontSize: "11px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "#8b5cf6" }}>Tech Stack</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "1px", background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.1)", borderRadius: "16px", overflow: "hidden" }}>
            {TECH_STACK.map((item, i) => (
              <div
                key={i}
                style={{ background: "#0f0f1a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px", padding: "22px 10px", transition: "background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(139,92,246,0.08)"}
                onMouseLeave={e => e.currentTarget.style.background = "#0f0f1a"}
              >
                {item.icon}
                <span style={{ fontSize: "13px", fontWeight: 800, color: "#fff", lineHeight: 1 }}>{item.value}</span>
                <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.33)", fontWeight: 600 }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
