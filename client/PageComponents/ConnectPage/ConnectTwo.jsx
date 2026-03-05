import React from "react";
import { useStateContext } from "../../context";

const WALLETS = [
  {
    id: "metamask",
    name: "MetaMask",
    desc: "The most popular self-custody Ethereum wallet. Connect securely via browser extension.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg",
    tag: "Most Popular",
    tagColor: { color: "#00FFA3", bg: "rgba(0,255,163,0.1)", border: "rgba(0,255,163,0.25)" },
    available: true,
  },
];

const FEATURES = [
  {
    title: "Non-Custodial",
    desc: "We never store or access your private keys. You stay in full control.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7048e8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
  },
  {
    title: "On-Chain Verified",
    desc: "Every property transaction is recorded immutably on the blockchain.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00FFA3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
  },
  {
    title: "Encrypted & Safe",
    desc: "All wallet interactions use industry-standard encryption protocols.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00D9FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
];

const ConnectTwo = () => {
  const { connectWallet, currentAccount } = useStateContext();

  return (
    <div style={{ padding: "60px 0 100px" }}>
      <div className="container">

        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <p style={{ margin: "0 0 10px", fontSize: "12px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#7048e8" }}>
            Web3 Access
          </p>
          <h2 style={{ margin: "0 0 16px", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, background: "linear-gradient(90deg, #fff 30%, #a78bfa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1.2 }}>
            Choose your wallet
          </h2>
          <p style={{ margin: "0 auto", maxWidth: "480px", fontSize: "15px", color: "rgba(255,255,255,0.45)", lineHeight: 1.8 }}>
            Link your crypto wallet to buy, sell and manage tokenized real estate on BlockEstate.
          </p>
        </div>

        {/* Already connected banner */}
        {currentAccount && (
          <div style={{ display: "flex", alignItems: "center", gap: "14px", background: "rgba(0,255,163,0.07)", border: "1px solid rgba(0,255,163,0.2)", borderRadius: "16px", padding: "16px 24px", marginBottom: "40px", maxWidth: "560px", margin: "0 auto 40px" }}>
            <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "linear-gradient(135deg, #00FFA3, #00D9FF)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: "#00FFA3" }}>Wallet Connected</p>
              <p style={{ margin: "2px 0 0", fontSize: "11px", fontFamily: "monospace", color: "rgba(255,255,255,0.5)" }}>{currentAccount}</p>
            </div>
          </div>
        )}

        {/* Wallet cards */}
        <div style={{ display: "flex", justifyContent: "center", margin: "0 auto 64px" }}>
          {WALLETS.map((w) => (
            <div
              key={w.id}
              style={{ position: "relative", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "20px", padding: "40px 40px 36px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", transition: "transform 0.25s, border-color 0.25s, box-shadow 0.25s", cursor: w.available ? "pointer" : "default", width: "360px", maxWidth: "100%" }}
              onMouseEnter={(e) => { if (w.available) { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.borderColor = "rgba(112,72,232,0.5)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(112,72,232,0.18)"; } }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              {/* Tag badge */}
              <div style={{ position: "absolute", top: "18px", right: "18px", background: w.tagColor.bg, border: `1px solid ${w.tagColor.border}`, borderRadius: "999px", padding: "3px 11px", fontSize: "10px", fontWeight: 700, color: w.tagColor.color, letterSpacing: "0.05em" }}>
                {w.tag}
              </div>

              {/* Logo */}
              <div style={{ width: "72px", height: "72px", borderRadius: "20px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                <img src={w.logo} alt={w.name} width="44" height="44" style={{ objectFit: "contain" }} />
              </div>

              {/* Name */}
              <h4 style={{ margin: "0 0 10px", fontSize: "1.1rem", fontWeight: 800, color: "#fff" }}>{w.name}</h4>

              {/* Desc */}
              <p style={{ margin: "0 0 28px", fontSize: "13px", color: "rgba(255,255,255,0.4)", lineHeight: 1.7, minHeight: "56px" }}>{w.desc}</p>

              {/* Button */}
              {w.available ? (
                <button
                  onClick={connectWallet}
                  style={{ width: "100%", padding: "13px 0", borderRadius: "999px", background: "linear-gradient(135deg, #7048e8, #a78bfa)", border: "none", color: "#fff", fontWeight: 700, fontSize: "14px", cursor: "pointer", letterSpacing: "0.04em", boxShadow: "0 6px 24px rgba(112,72,232,0.35)", transition: "opacity 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  Connect MetaMask
                </button>
              ) : (
                <button disabled style={{ width: "100%", padding: "13px 0", borderRadius: "999px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.3)", fontWeight: 700, fontSize: "14px", cursor: "not-allowed", letterSpacing: "0.04em" }}>
                  Coming Soon
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)", margin: "0 auto 56px", maxWidth: "960px" }} />

        {/* Features row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px", maxWidth: "960px", margin: "0 auto" }}>
          {FEATURES.map((f) => (
            <div key={f.title} style={{ display: "flex", gap: "16px", alignItems: "flex-start", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px 22px" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {f.icon}
              </div>
              <div>
                <h5 style={{ margin: "0 0 6px", fontSize: "0.95rem", fontWeight: 700, color: "#fff" }}>{f.title}</h5>
                <p style={{ margin: 0, fontSize: "12px", color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ConnectTwo;
