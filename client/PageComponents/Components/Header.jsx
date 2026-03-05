import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useStateContext } from "../../context";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Explore", href: "/explor" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const router = useRouter();
  const { currentAccount, connectWallet, disconnectWallet, userBlance, getPropertiesData } = useStateContext();

  const [displayName, setDisplayName] = useState(""); // empty = no name set yet
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [notificationCount, setNotificationCount] = useState(0);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const userMenuRef = useRef(null);

  // scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close user dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // display name from localStorage — only set if user explicitly saved it via Edit Profile
  useEffect(() => {
    const load = () => {
      if (!currentAccount) { setDisplayName(""); return; }
      const saved = localStorage.getItem(`${currentAccount.toLowerCase()}_be_displayName`);
      setDisplayName(saved && saved.trim() ? saved.trim() : "");
    };
    load();
    window.addEventListener("storage", load);
    return () => window.removeEventListener("storage", load);
  }, [currentAccount]);

  // profile image — synced from localStorage whenever user uploads via Edit Profile
  const [profileImg, setProfileImg] = React.useState(null);
  useEffect(() => {
    const load = () => {
      if (!currentAccount) { setProfileImg(null); return; }
      const saved = localStorage.getItem(`${currentAccount.toLowerCase()}_be_profileImg`);
      setProfileImg(saved || null);
    };
    load();
    window.addEventListener("storage", load);
    return () => window.removeEventListener("storage", load);
  }, [currentAccount]);

  // notification count
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!currentAccount) { setNotificationCount(0); return; }
      try {
        const data = await getPropertiesData();
        if (!data) return;
        const myProps = data.filter((p) => p.owner?.toLowerCase() === currentAccount.toLowerCase());
        const total = myProps.reduce((sum, p) => sum + (p.reviewers?.length || 0), 0);
        const lastSeen = parseInt(localStorage.getItem(`${currentAccount.toLowerCase()}_be_notif_seen`) || "0", 10);
        setNotificationCount(Math.max(0, total - lastSeen));
      } catch (e) { }
    };
    fetchNotifications();
  }, [currentAccount]);

  const handleBellClick = async (e) => {
    e.preventDefault();
    if (currentAccount) {
      try {
        const data = await getPropertiesData();
        if (data) {
          const myProps = data.filter((p) => p.owner?.toLowerCase() === currentAccount.toLowerCase());
          const total = myProps.reduce((sum, p) => sum + (p.reviewers?.length || 0), 0);
          localStorage.setItem(`${currentAccount.toLowerCase()}_be_notif_seen`, total.toString());
        }
      } catch (e) { }
    }
    setNotificationCount(0);
    router.push("/activity");
  };

  const saveName = () => {
    if (nameInput.trim() && currentAccount) {
      localStorage.setItem(`${currentAccount.toLowerCase()}_be_displayName`, nameInput.trim());
      setDisplayName(nameInput.trim());
    }
    setEditingName(false);
    setNameInput("");
  };

  const shortAddr = currentAccount
    ? `${currentAccount.slice(0, 6)}...${currentAccount.slice(-4)}`
    : "";

  /* â”€â”€ styles â”€â”€ */
  const navStyle = {
    position: "fixed",
    top: scrolled ? "14px" : "0",
    left: scrolled ? "20px" : "0",
    right: scrolled ? "20px" : "0",
    zIndex: 1000,
    background: scrolled ? "rgba(10,10,20,0.96)" : "rgba(10,10,20,0.80)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderRadius: scrolled ? "60px" : "0px",
    border: scrolled ? "1px solid rgba(255,255,255,0.10)" : "1px solid transparent",
    boxShadow: scrolled ? "0 8px 40px rgba(0,0,0,0.45)" : "none",
    transition: "all 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
  };

  const iconBtn = {
    position: "relative",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: "50px",
    width: "44px",
    height: "44px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "#cbd5e0",
    fontSize: "17px",
    transition: "background 0.2s, border-color 0.2s",
  };

  return (
    <>
      <nav style={navStyle}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: scrolled ? "0 20px" : "0 28px", display: "flex", alignItems: "center", height: scrolled ? "64px" : "72px", gap: "24px", transition: "all 0.45s cubic-bezier(0.4, 0, 0.2, 1)" }}>

          {/* â”€â”€ LOGO â”€â”€ */}
          <Link legacyBehavior href="/">
            <a style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", flexShrink: 0 }}>
              {/* Building icon */}
              <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              {/* Wordmark */}
              <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
                <span style={{ fontSize: "1.6rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
                  <span style={{ color: "#fff" }}>Block</span>
                  <span style={{ background: "linear-gradient(90deg, #818cf8, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Estate</span>
                </span>
                <span style={{ fontSize: "0.7rem", letterSpacing: "0.12em", color: "rgba(255,255,255,0.45)", fontWeight: 600, marginTop: "2px" }}>ON-CHAIN REAL ESTATE</span>
              </div>
            </a>
          </Link>

          {/* â”€â”€ NAV LINKS (desktop) â”€â”€ */}
          <div style={{ display: "flex", gap: "4px", flex: 1, justifyContent: "center" }} className="d-none d-lg-flex">
            {NAV_LINKS.map((link) => {
              const active = router.pathname === link.href;
              return (
                <Link legacyBehavior href={link.href} key={link.href}>
                  <a style={{
                    padding: "9px 22px",
                    borderRadius: "50px",
                    fontSize: "1.5rem",
                    fontWeight: active ? 700 : 500,
                    color: active ? "#fff" : "#94a3b8",
                    background: active ? "rgba(112,72,232,0.20)" : "transparent",
                    textDecoration: "none",
                    transition: "all 0.2s",
                    whiteSpace: "nowrap",
                    letterSpacing: "0.01em",
                  }}
                    onMouseEnter={(e) => { if (!active) { e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; } }}
                    onMouseLeave={(e) => { if (!active) { e.currentTarget.style.color = "#94a3b8"; e.currentTarget.style.background = "transparent"; } }}
                  >
                    {link.label}
                  </a>
                </Link>
              );
            })}
          </div>

          {/* â”€â”€ RIGHT SIDE â”€â”€ */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginLeft: "auto" }}>

            {/* NOTIFICATION BELL */}
            <button
              onClick={handleBellClick}
              style={iconBtn}
              title="Notifications"
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(112,72,232,0.2)"; e.currentTarget.style.borderColor = "rgba(112,72,232,0.5)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)"; }}
            >
              <i className="feather-bell" />
              {notificationCount > 0 && (
                <span style={{
                  position: "absolute", top: "-6px", right: "-6px",
                  background: "#7048e8", color: "#fff",
                  fontSize: "10px", fontWeight: 700,
                  minWidth: "18px", height: "18px",
                  borderRadius: "50px", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  padding: "0 4px", lineHeight: 1,
                  border: "2px solid #0a0a14",
                }}>
                  {notificationCount > 99 ? "99+" : notificationCount}
                </span>
              )}
            </button>

            {/* CONNECT WALLET  or  USER AVATAR */}
            {!currentAccount ? (
              <button
                onClick={() => connectWallet()}
                style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  background: "linear-gradient(135deg,#7048e8,#9f7aea)",
                  border: "none", borderRadius: "50px",
                  padding: "10px 22px", color: "#fff",
                  fontSize: "1.5rem", fontWeight: 700,
                  cursor: "pointer", whiteSpace: "nowrap",
                  boxShadow: "0 4px 14px rgba(112,72,232,0.4)",
                  transition: "opacity 0.2s, transform 0.2s",
                  letterSpacing: "0.01em",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = ""; }}
              >
                <i className="feather-zap" style={{ fontSize: "14px" }} />
                Connect Wallet
              </button>
            ) : (
              <div ref={userMenuRef} style={{ position: "relative" }}>
                <button
                  onClick={() => setUserMenuOpen((v) => !v)}
                  style={{
                    display: "flex", alignItems: "center", gap: "12px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "50px", padding: "6px 18px 6px 6px",
                    cursor: "pointer", color: "#fff",
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(112,72,232,0.5)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
                >
                  {profileImg ? (
                    <img
                      src={profileImg}
                      alt="avatar"
                      style={{ width: "38px", height: "38px", borderRadius: "50%", objectFit: "cover" }}
                    />
                  ) : (
                    <div style={{
                      width: "38px", height: "38px", borderRadius: "50%",
                      background: "rgba(112,72,232,0.25)",
                      border: "1px solid rgba(112,72,232,0.4)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <i className="feather-user" style={{ fontSize: "17px", color: "#a78bfa" }} />
                    </div>
                  )}
                  <div style={{ textAlign: "left", lineHeight: 1.3 }}>
                    {/* Show name only if user set it via Edit Profile; otherwise address is the primary label */}
                    {displayName ? (
                      <>
                        <div style={{ fontSize: "1.5rem", fontWeight: 600, color: "#fff" }}>{displayName}</div>
                        <div style={{ fontSize: "1.1rem", color: "#7048e8" }}>{shortAddr}</div>
                      </>
                    ) : (
                      <div style={{ fontSize: "1.4rem", fontWeight: 600, color: "#a78bfa" }}>{shortAddr}</div>
                    )}
                  </div>
                  <i className="feather-chevron-down" style={{ fontSize: "13px", color: "#94a3b8", marginLeft: "2px" }} />
                </button>

                {/* DROPDOWN */}
                {userMenuOpen && (
                  <div style={{
                    position: "absolute", top: "calc(100% + 10px)", right: 0,
                    width: "240px",
                    background: "#12121f",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "14px",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                    overflow: "hidden",
                    zIndex: 200,
                  }}>
                    {/* balance */}
                    <div style={{ padding: "16px 18px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontSize: "1rem", color: "#64748b", marginBottom: "3px" }}>Wallet Balance</div>
                        <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff" }}>{userBlance?.slice(0, 7)} ETH</div>
                      </div>
                      <div style={{ background: "rgba(112,72,232,0.15)", borderRadius: "8px", padding: "6px 10px", fontSize: "1rem", color: "#a78bfa", fontWeight: 600 }}>
                        Connected
                      </div>
                    </div>

                    {/* links */}
                    {[
                      { icon: "feather-user", label: "My Profile", href: "/author" },
                      { icon: "feather-settings", label: "Edit Profile", href: "/edit-profile" },
                      { icon: "feather-activity", label: "Activity", href: "/activity" },
                      { icon: "feather-plus-circle", label: "List Property", href: "/create" },
                      { icon: "feather-credit-card", label: "Manage Funds", href: "/connect" },
                    ].map((item) => (
                      <a key={item.href} href={item.href} onClick={() => setUserMenuOpen(false)} style={{
                        display: "flex", alignItems: "center", gap: "10px",
                        padding: "11px 18px", color: "#cbd5e0", fontSize: "1.5rem",
                        textDecoration: "none", transition: "background 0.15s",
                      }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "#fff"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#cbd5e0"; }}
                      >
                        <i className={item.icon} style={{ fontSize: "15px", color: "#7048e8", width: "18px" }} />
                        {item.label}
                      </a>
                    ))}

                    {/* disconnect */}
                    <div style={{ padding: "10px 14px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <button
                        onClick={() => { disconnectWallet(); setUserMenuOpen(false); router.push("/"); }}
                        style={{
                          width: "100%", padding: "10px", borderRadius: "8px",
                          background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
                          color: "#f87171", fontSize: "1.5rem", fontWeight: 600,
                          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                          transition: "background 0.2s",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.2)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.1)"; }}
                      >
                        <i className="feather-log-out" style={{ fontSize: "14px" }} /> Disconnect
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* MOBILE HAMBURGER */}
            <button
              className="d-block d-lg-none"
              onClick={() => setMobileOpen((v) => !v)}
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "50px",
                padding: "9px 18px",
                cursor: "pointer", color: "#fff",
                fontSize: "0.95rem", fontWeight: 600,
                letterSpacing: "0.02em",
                transition: "background 0.2s",
                marginLeft: "4px",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.13)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
            >
              <i className="feather-menu" style={{ fontSize: "16px" }} />
            </button>

          </div>
        </div>

        {/* â”€â”€ FULL-SCREEN OVERLAY MENU â”€â”€ */}
        {mobileOpen && (
          <div style={{
            position: "fixed",
            inset: 0,
            zIndex: 2000,
            background: "rgba(8,8,18,0.97)",
            backdropFilter: "blur(24px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "40px 32px",
          }}>
            {/* close button */}
            <button
              onClick={() => setMobileOpen(false)}
              style={{
                position: "absolute", top: "22px", right: "24px",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "10px", width: "46px", height: "46px",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "#fff", fontSize: "20px",
              }}
            >
              <i className="feather-x" />
            </button>

            {/* logo inside overlay */}
            <div style={{ marginBottom: "48px", opacity: 0.6 }}>
              <img src="/logo/logo-white.png" alt="BlockEstate" style={{ height: "38px", objectFit: "contain" }} />
            </div>

            {/* big nav links */}
            <nav style={{ width: "100%", maxWidth: "420px", textAlign: "center" }}>
              {NAV_LINKS.map((link, i) => {
                const active = router.pathname === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: "block",
                      padding: "18px 0",
                      fontSize: "clamp(2rem, 7vw, 3.5rem)",
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                      color: active ? "#a78bfa" : "#fff",
                      textDecoration: "none",
                      borderBottom: i < NAV_LINKS.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
                      transition: "color 0.2s, padding-left 0.2s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#a78bfa"; e.currentTarget.style.paddingLeft = "12px"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = active ? "#a78bfa" : "#fff"; e.currentTarget.style.paddingLeft = "0"; }}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* bottom row */}
            <div style={{ marginTop: "48px", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", width: "100%", maxWidth: "320px" }}>
              {!currentAccount ? (
                <button
                  onClick={() => { setMobileOpen(false); connectWallet(); }}
                  style={{
                    width: "100%", padding: "15px",
                    background: "linear-gradient(135deg,#7048e8,#9f7aea)",
                    border: "none", borderRadius: "12px", color: "#fff",
                    fontSize: "1.05rem", fontWeight: 700, cursor: "pointer",
                    boxShadow: "0 6px 24px rgba(112,72,232,0.45)",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  }}
                >
                  <i className="feather-zap" /> Connect Wallet
                </button>
              ) : (
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "0.82rem", color: "#64748b", marginBottom: "4px" }}>Connected as</div>
                  <div style={{ fontSize: "1rem", fontWeight: 600, color: "#a78bfa" }}>{shortAddr}</div>
                </div>
              )}
              <p style={{ color: "#334155", fontSize: "0.78rem", margin: 0 }}>BlockEstate Â· Blockchain Real Estate</p>
            </div>
          </div>
        )}
      </nav>

      {/* spacer so content doesn't hide under fixed nav */}
      <div style={{ height: "72px" }} />
    </>
  );
};

export default Header;

