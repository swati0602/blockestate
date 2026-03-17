import React, { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";

/* ─── Activity-type metadata ─────────────────────────────────────────────── */
const TYPE_CFG = {
  PROPERTY_PURCHASED: {
    label: "Purchase",
    color: "#a78bfa",
    bg:    "rgba(167,139,250,0.15)",
    border:"rgba(167,139,250,0.35)",
    icon:  "feather-shopping-cart",
    why:   "Property ownership transferred on-chain via MetaMask",
  },
  PROPERTY_LISTED: {
    label: "Listed",
    color: "#34d399",
    bg:    "rgba(52,211,153,0.15)",
    border:"rgba(52,211,153,0.35)",
    icon:  "feather-plus-circle",
    why:   "New property published to the marketplace on-chain via MetaMask",
  },
  PROPERTY_UPDATED: {
    label: "Updated",
    color: "#60a5fa",
    bg:    "rgba(96,165,250,0.15)",
    border:"rgba(96,165,250,0.35)",
    icon:  "feather-edit-2",
    why:   "Property details updated on the blockchain via MetaMask",
  },
  PRICE_UPDATED: {
    label: "Price Change",
    color: "#fbbf24",
    bg:    "rgba(251,191,36,0.15)",
    border:"rgba(251,191,36,0.35)",
    icon:  "feather-tag",
    why:   "Listing price updated on-chain via MetaMask",
  },
  REVIEW_ADDED: {
    label: "Review",
    color: "#f97316",
    bg:    "rgba(249,115,22,0.15)",
    border:"rgba(249,115,22,0.35)",
    icon:  "feather-star",
    why:   "Interest / review recorded on the blockchain via MetaMask",
  },
  REVIEW_LIKED: {
    label: "Liked",
    color: "#f43f5e",
    bg:    "rgba(244,63,94,0.15)",
    border:"rgba(244,63,94,0.35)",
    icon:  "feather-heart",
    why:   "Review liked — interaction recorded on-chain via MetaMask",
  },
};

const TABS = [
  { key: "ALL",                label: "All Activity",  icon: "feather-layers"        },
  { key: "PROPERTY_PURCHASED", label: "Purchases",     icon: "feather-shopping-cart" },
  { key: "PROPERTY_LISTED",    label: "Listings",      icon: "feather-plus-circle"   },
  { key: "PROPERTY_UPDATED",   label: "Updates",       icon: "feather-edit-2"        },
  { key: "PRICE_UPDATED",      label: "Price Changes", icon: "feather-tag"           },
  { key: "REVIEW_ADDED",       label: "Reviews",       icon: "feather-star"          },
  { key: "REVIEW_LIKED",       label: "Liked",         icon: "feather-heart"         },
];

const PAGE_SIZE = 15;
const ETHERSCAN = "https://sepolia.etherscan.io/tx/";

const fmtAddr = (a) =>
  a && a.length > 12 ? a.slice(0, 8) + "…" + a.slice(-6) : a || "—";

const fmtTime = (ts) => {
  if (!ts) return "—";
  const d = new Date(ts);
  return (
    d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) +
    " " +
    d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
  );
};

/* Convert a legacy Transaction doc into the unified activity shape */
const txToActivity = (t) => ({
  _id:        t._id,
  type:       "PROPERTY_PURCHASED",
  actor:      t.buyer,
  propertyId: t.propertyId,
  txHash:     t.txHash,
  blockNumber:t.blockNumber,
  amount:     t.amount,
  reason:     `Purchased Property #${t.propertyId} for ${parseFloat(t.amount || 0).toFixed(4)} ETH`,
  metadata:   { seller: t.seller },
  timestamp:  t.timestamp,
  _legacy:    true,
});

/* ─────────────────────────────────────────────────────────────── CSS ─────── */
const S = `
  @keyframes af-up   { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
  @keyframes af-spin { to{transform:rotate(360deg)} }

  .af-wrap { padding:56px 0 90px;min-height:70vh;background:#06060f; }

  /* Hero */
  .af-hero { text-align:center;padding:0 0 48px;position:relative; }
  .af-hero::after { content:'';position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:360px;height:1px;background:linear-gradient(90deg,transparent,rgba(139,92,246,0.45),transparent); }
  .af-badge { display:inline-flex;align-items:center;gap:6px;padding:5px 16px;border-radius:20px;margin-bottom:16px;background:rgba(139,92,246,0.1);border:1px solid rgba(139,92,246,0.25);color:#a78bfa;font-size:0.78rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase; }
  .af-title { font-size:clamp(2rem,4.5vw,3.2rem);font-weight:800;background:linear-gradient(135deg,#fff 0%,#c4b5fd 45%,#60a5fa 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 10px;letter-spacing:-.5px; }
  .af-sub { font-size:1rem;color:rgba(255,255,255,0.42);max-width:600px;margin:0 auto;line-height:1.75; }

  /* Stats */
  .af-stats { display:flex;gap:11px;justify-content:center;flex-wrap:wrap;margin:38px 0 30px; }
  .af-stat { display:flex;align-items:center;gap:10px;padding:13px 16px;border-radius:12px;background:rgba(255,255,255,0.023);border:1px solid rgba(255,255,255,0.065);min-width:126px; }
  .af-stat-ico { width:34px;height:34px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
  .af-stat-val { font-size:1.28rem;font-weight:800;color:#e2d9ff;line-height:1; }
  .af-stat-lbl { font-size:0.69rem;color:rgba(255,255,255,0.34);text-transform:uppercase;letter-spacing:.07em;font-weight:600;margin-top:2px; }

  /* Tabs */
  .af-tabs {
    display:flex;
    gap:6px;
    flex-wrap:nowrap;
    overflow-x:auto;
    overflow-y:hidden;
    margin-bottom:16px;
    padding-bottom:4px;
    scrollbar-width:thin;
  }
  .af-tab {
    display:inline-flex;
    align-items:center;
    gap:5px;
    padding:7px 13px;
    border-radius:8px;
    border:1px solid rgba(255,255,255,0.07);
    background:rgba(255,255,255,0.025);
    color:rgba(255,255,255,0.42);
    font-size:0.9rem;
    font-weight:600;
    cursor:pointer;
    transition:all .17s;
    white-space:nowrap;
    flex:0 0 auto;
    width:auto;
  }
  .af-tab:hover  { background:rgba(139,92,246,0.1);border-color:rgba(139,92,246,0.28);color:#c4b5fd; }
  .af-tab.active { background:rgba(139,92,246,0.2);border-color:#7c3aed;color:#c4b5fd; }
  .af-tab-cnt { font-size:0.78rem;background:rgba(255,255,255,0.09);padding:1px 7px;border-radius:10px; }
  .af-tab.active .af-tab-cnt { background:rgba(139,92,246,0.35); }

  /* Search */
  .af-search-wrap { position:relative;margin-bottom:16px; }
  .af-search-ico  { position:absolute;left:12px;top:50%;transform:translateY(-50%);color:#555;font-size:13px;pointer-events:none; }
  .af-search { width:100%;height:46px;padding:0 14px 0 38px;background:rgba(255,255,255,0.028);border:1.5px solid rgba(255,255,255,0.075);border-radius:10px;color:#e2d9ff;font-size:1rem;outline:none;box-sizing:border-box;transition:border-color .2s; }
  .af-search::placeholder { color:rgba(255,255,255,0.24); }
  .af-search:focus { border-color:#7c3aed; }

  /* Panel */
  .af-panel { background:linear-gradient(160deg,rgba(14,10,32,0.93),rgba(6,6,18,0.97));border:1px solid rgba(139,92,246,0.15);border-radius:20px;overflow:hidden;box-shadow:0 22px 60px rgba(0,0,0,0.6); }

  /* Table */
  .af-table { width:100%;border-collapse:collapse; }
  .af-table thead tr { background:rgba(0,0,0,0.3);border-bottom:1px solid rgba(255,255,255,0.055); }
  .af-table th { padding:13px 15px;text-align:left;white-space:nowrap;font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.09em;color:rgba(255,255,255,0.36); }
  .af-table tbody tr { border-bottom:1px solid rgba(255,255,255,0.034);transition:background .14s;animation:af-up .3s ease both; }
  .af-table tbody tr:last-child { border-bottom:none; }
  .af-table tbody tr:hover { background:rgba(139,92,246,0.048); }
  .af-table td { padding:13px 15px;font-size:0.9rem;vertical-align:middle; }

  /* Type badge */
  .af-type-badge { display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:6px;font-size:0.71rem;font-weight:700;white-space:nowrap;letter-spacing:.04em; }

  /* Actor */
  .af-actor { font-family:monospace;font-size:0.85rem;color:#a78bfa;background:rgba(139,92,246,0.1);padding:4px 9px;border-radius:6px;white-space:nowrap;cursor:pointer;transition:background .16s;display:inline-flex;align-items:center;gap:5px; }
  .af-actor:hover { background:rgba(139,92,246,0.2); }

  /* Property link */
  .af-pid { display:inline-flex;align-items:center;justify-content:center;min-width:30px;height:30px;padding:0 8px;border-radius:7px;font-weight:800;font-size:0.85rem;background:linear-gradient(135deg,rgba(139,92,246,0.26),rgba(96,165,250,0.16));color:#c4b5fd;border:1px solid rgba(139,92,246,0.26);text-decoration:none;transition:box-shadow .16s; }
  .af-pid:hover { box-shadow:0 0 0 3px rgba(139,92,246,0.2); }

  /* Reason */
  .af-reason { color:rgba(255,255,255,0.62);font-size:0.83rem;max-width:250px;line-height:1.4; }
  .af-why    { display:inline-block;margin-top:5px;font-size:0.68rem;color:rgba(255,255,255,0.28);background:rgba(255,255,255,0.035);padding:2px 8px;border-radius:4px;border:1px solid rgba(255,255,255,0.07); }

  /* Amount */
  .af-amount     { font-weight:700;color:#34d399;display:inline-flex;align-items:center;gap:4px;font-size:0.9rem; }
  .af-amount-nil { color:rgba(255,255,255,0.2);font-size:0.78rem; }

  /* Tx hash */
  .af-hash-cell { display:flex;align-items:center;gap:5px; }
  .af-hash { font-family:monospace;font-size:0.76rem;color:rgba(255,255,255,0.36);max-width:110px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor:pointer;transition:color .15s; }
  .af-hash:hover { color:#a78bfa; }
  .af-ext { display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:6px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);color:rgba(255,255,255,0.35);font-size:10px;text-decoration:none;flex-shrink:0;transition:all .16s; }
  .af-ext:hover { background:rgba(139,92,246,0.16);border-color:rgba(139,92,246,0.38);color:#a78bfa; }
  .af-no-tx { color:rgba(255,255,255,0.16);font-size:0.76rem; }

  /* Time */
  .af-time { color:rgba(255,255,255,0.38);font-size:0.8rem;white-space:nowrap; }

  /* Empty / loader */
  .af-empty     { text-align:center;padding:68px 20px; }
  .af-spinner   { width:34px;height:34px;border-radius:50%;border:3px solid rgba(139,92,246,0.14);border-top-color:#7c3aed;animation:af-spin .75s linear infinite;margin:0 auto 14px; }
  .af-empty-ico { font-size:2.6rem;margin-bottom:12px;opacity:.28; }
  .af-empty-txt { color:rgba(255,255,255,0.36);font-size:0.96rem; }

  /* Pagination */
  .af-pag { display:flex;justify-content:center;align-items:center;gap:6px;padding:18px 14px; }
  .af-pag-btn { padding:7px 14px;border-radius:8px;font-size:0.83rem;font-weight:600;cursor:pointer;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);color:rgba(255,255,255,0.46);transition:all .16s; }
  .af-pag-btn:hover:not(:disabled) { background:rgba(139,92,246,0.13);border-color:rgba(139,92,246,0.36);color:#c4b5fd; }
  .af-pag-btn:disabled { opacity:.22;cursor:not-allowed; }
  .af-pag-info { font-size:0.83rem;color:rgba(255,255,255,0.32);padding:0 6px; }

  /* Toast */
  .af-toast { position:fixed;bottom:26px;left:50%;transform:translateX(-50%);background:#7c3aed;color:#fff;padding:9px 22px;border-radius:10px;font-size:0.88rem;font-weight:600;z-index:9999;pointer-events:none;animation:af-up .25s ease; }

  /* Mobile */
  @media(max-width:1100px){
    .af-table th:nth-child(7),.af-table td:nth-child(7) { display:none; }
  }
  @media(max-width:900px){
    .af-table th:nth-child(6),.af-table td:nth-child(6) { display:none; }
  }
  @media(max-width:767px){
    .af-table thead { display:none; }
    .af-table tbody tr { display:block;padding:14px 14px;border-bottom:1px solid rgba(255,255,255,0.05); }
    .af-table td { display:flex;justify-content:space-between;align-items:flex-start;padding:5px 0;border:none; }
    .af-table td::before { content:attr(data-label);font-size:0.6rem;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:rgba(255,255,255,0.23);flex-shrink:0;margin-right:8px;padding-top:2px; }
    .af-reason { max-width:none; }
  }
`;

export default function TransactionHistory() {
  const [activities, setActivities] = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [activeTab,  setActiveTab]  = useState("ALL");
  const [search,     setSearch]     = useState("");
  const [page,       setPage]       = useState(1);
  const [toast,      setToast]      = useState("");

  /* Fetch both data sources in parallel */
  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const [actRes, txRes] = await Promise.all([
        fetch("/api/activity?limit=200"),
        fetch("/api/transactions?limit=200"),
      ]);
      const [actJson, txJson] = await Promise.all([actRes.json(), txRes.json()]);

      const fromActivity = actJson.success ? actJson.data : [];
      // Legacy transactions — deduplicate against activity log by txHash
      const fromTx = txJson.success
        ? txJson.data
            .filter((t) => !fromActivity.some((a) => a.txHash && a.txHash === t.txHash))
            .map(txToActivity)
        : [];

      const merged = [...fromActivity, ...fromTx].sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );
      setActivities(merged);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadAll(); }, [loadAll]);

  /* Reset to page 1 when filter/search changes */
  useEffect(() => { setPage(1); }, [activeTab, search]);

  /* Per-type counts for tab badges */
  const counts = useMemo(() => {
    const c = { ALL: activities.length };
    activities.forEach((a) => { c[a.type] = (c[a.type] || 0) + 1; });
    return c;
  }, [activities]);

  /* Filtered list */
  const filtered = useMemo(() => {
    let list = activeTab === "ALL" ? activities : activities.filter((a) => a.type === activeTab);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (a) =>
          a.actor?.toLowerCase().includes(q) ||
          a.txHash?.toLowerCase().includes(q) ||
          String(a.propertyId ?? "").includes(q) ||
          a.reason?.toLowerCase().includes(q) ||
          a.metadata?.seller?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activities, activeTab, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageSlice  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  /* Summary stats */
  const totalEth     = activities
    .filter((a) => a.type === "PROPERTY_PURCHASED")
    .reduce((s, a) => s + (parseFloat(a.amount) || 0), 0);
  const uniqueActors = new Set(activities.map((a) => a.actor).filter(Boolean)).size;

  const copy = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      setToast("Copied!");
      setTimeout(() => setToast(""), 1800);
    });
  };

  return (
    <>
      <style suppressHydrationWarning>{S}</style>
      {toast && <div className="af-toast">{toast}</div>}

      <div className="af-wrap">
        <div className="container">

          {/* ── Hero ── */}
          <div className="af-hero">
            <div className="af-badge">
              <i className="feather-zap" style={{ fontSize: 10 }} />
              On-Chain Activity
            </div>
            <h1 className="af-title">Full Activity History</h1>
            <p className="af-sub">
              Every on-chain action on BlockEstate — property listings, purchases, price changes,
              reviews and likes — all triggered via&nbsp;
              <span style={{ color: "#f97316", fontWeight: 600 }}>MetaMask</span> and recorded
              on the blockchain with full transparency.
            </p>
          </div>

          {/* ── Stats strip ── */}
          <div className="af-stats">
            {[
              { ico: "feather-layers",        bg: "rgba(139,92,246,0.18)",  ic: "#a78bfa", val: counts.ALL || 0,                lbl: "Total Events"   },
              { ico: "feather-shopping-cart", bg: "rgba(167,139,250,0.18)", ic: "#c4b5fd", val: counts.PROPERTY_PURCHASED || 0, lbl: "Purchases"      },
              { ico: "feather-plus-circle",   bg: "rgba(52,211,153,0.15)",  ic: "#34d399", val: counts.PROPERTY_LISTED || 0,    lbl: "Listings"       },
              { ico: "feather-edit-2",        bg: "rgba(96,165,250,0.15)",  ic: "#60a5fa", val: counts.PROPERTY_UPDATED || 0,   lbl: "Updates"        },
              { ico: "feather-tag",           bg: "rgba(251,191,36,0.15)",  ic: "#fbbf24", val: counts.PRICE_UPDATED || 0,      lbl: "Price Changes"  },
              { ico: "feather-star",          bg: "rgba(249,115,22,0.15)",  ic: "#f97316", val: counts.REVIEW_ADDED || 0,       lbl: "Reviews"        },
              { ico: "feather-heart",         bg: "rgba(244,63,94,0.15)",   ic: "#f43f5e", val: counts.REVIEW_LIKED || 0,       lbl: "Liked"          },
              { ico: "feather-zap",           bg: "rgba(52,211,153,0.13)",  ic: "#34d399", val: `${totalEth.toFixed(3)} ETH`,   lbl: "Total Volume"   },
              { ico: "feather-users",         bg: "rgba(96,165,250,0.15)",  ic: "#60a5fa", val: uniqueActors,                  lbl: "Unique Wallets" },
            ].map((s, i) => (
              <div className="af-stat" key={i}>
                <div className="af-stat-ico" style={{ background: s.bg }}>
                  <i className={s.ico} style={{ color: s.ic, fontSize: 13 }} />
                </div>
                <div>
                  <div className="af-stat-val">{loading ? "—" : s.val}</div>
                  <div className="af-stat-lbl">{s.lbl}</div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Filter Tabs ── */}
          <div className="af-tabs">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                className={`af-tab${activeTab === tab.key ? " active" : ""}`}
                onClick={() => setActiveTab(tab.key)}
              >
                <i className={tab.icon} style={{ fontSize: 11 }} />
                {tab.label}
                <span className="af-tab-cnt">{counts[tab.key] || 0}</span>
              </button>
            ))}
          </div>

          {/* ── Search ── */}
          <div className="af-search-wrap">
            <i className="feather-search af-search-ico" />
            <input
              className="af-search"
              placeholder="Search wallet address, property ID, tx hash or reason…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* ── Activity Table ── */}
          <div className="af-panel">
            {loading ? (
              <div className="af-empty">
                <div className="af-spinner" />
                <div className="af-empty-txt">Loading activity…</div>
              </div>
            ) : pageSlice.length === 0 ? (
              <div className="af-empty">
                <div className="af-empty-ico">📋</div>
                <div className="af-empty-txt">
                  {search ? "No activity matches your search." : "No activity recorded yet."}
                </div>
              </div>
            ) : (
              <>
                <table className="af-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Type</th>
                      <th>Wallet (Actor)</th>
                      <th>Property</th>
                      <th>Reason / Why This Happened</th>
                      <th>Amount</th>
                      <th>MetaMask Tx</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageSlice.map((act, i) => {
                      const cfg = TYPE_CFG[act.type] || TYPE_CFG.PROPERTY_PURCHASED;
                      return (
                        <tr
                          key={act._id || act.txHash || i}
                          style={{ animationDelay: `${i * 0.028}s` }}
                        >
                          {/* Row number */}
                          <td data-label="#">
                            <span style={{ color: "rgba(255,255,255,0.28)", fontSize: "0.8rem" }}>
                              {(page - 1) * PAGE_SIZE + i + 1}
                            </span>
                          </td>

                          {/* Type badge */}
                          <td data-label="Type">
                            <span
                              className="af-type-badge"
                              style={{
                                color:      cfg.color,
                                background: cfg.bg,
                                border:     `1px solid ${cfg.border}`,
                              }}
                            >
                              <i className={cfg.icon} style={{ fontSize: 10 }} />
                              {cfg.label}
                            </span>
                          </td>

                          {/* Wallet / Actor */}
                          <td data-label="Wallet">
                            <span
                              className="af-actor"
                              title={act.actor}
                              onClick={() => copy(act.actor)}
                            >
                              <i className="feather-copy" style={{ fontSize: 9, opacity: 0.45 }} />
                              {fmtAddr(act.actor)}
                            </span>
                          </td>

                          {/* Property link */}
                          <td data-label="Property">
                            {act.propertyId != null ? (
                              <Link href={`/detail?property=${act.propertyId}`} className="af-pid">
                                #{act.propertyId}
                              </Link>
                            ) : (
                              <span style={{ color: "rgba(255,255,255,0.18)", fontSize: "0.78rem" }}>—</span>
                            )}
                          </td>

                          {/* Reason + Why badge */}
                          <td data-label="Reason">
                            <div className="af-reason">
                              {act.reason || "—"}
                              <div className="af-why">
                                <i className="feather-info" style={{ fontSize: 8, marginRight: 3 }} />
                                {cfg.why}
                              </div>
                            </div>
                          </td>

                          {/* Amount */}
                          <td data-label="Amount">
                            {act.amount > 0 ? (
                              <span className="af-amount">
                                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                                </svg>
                                {parseFloat(act.amount).toFixed(4)} ETH
                              </span>
                            ) : (
                              <span className="af-amount-nil">—</span>
                            )}
                          </td>

                          {/* MetaMask Tx hash */}
                          <td data-label="MetaMask Tx">
                            {act.txHash ? (
                              <div className="af-hash-cell">
                                <span
                                  className="af-hash"
                                  title={act.txHash}
                                  onClick={() => copy(act.txHash)}
                                >
                                  {act.txHash}
                                </span>
                                <a
                                  href={ETHERSCAN + act.txHash}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="af-ext"
                                  title="View on Sepolia Etherscan"
                                >
                                  <i className="feather-external-link" style={{ fontSize: 9 }} />
                                </a>
                              </div>
                            ) : (
                              <span className="af-no-tx">—</span>
                            )}
                          </td>

                          {/* Timestamp */}
                          <td data-label="Time">
                            <span className="af-time">{fmtTime(act.timestamp)}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="af-pag">
                    <button
                      className="af-pag-btn"
                      disabled={page === 1}
                      onClick={() => setPage(1)}
                    >
                      «
                    </button>
                    <button
                      className="af-pag-btn"
                      disabled={page === 1}
                      onClick={() => setPage((p) => p - 1)}
                    >
                      ‹ Prev
                    </button>
                    <span className="af-pag-info">
                      Page {page} of {totalPages} &nbsp;·&nbsp; {filtered.length} events
                    </span>
                    <button
                      className="af-pag-btn"
                      disabled={page === totalPages}
                      onClick={() => setPage((p) => p + 1)}
                    >
                      Next ›
                    </button>
                    <button
                      className="af-pag-btn"
                      disabled={page === totalPages}
                      onClick={() => setPage(totalPages)}
                    >
                      »
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
