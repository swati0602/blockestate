import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";

const S = `
  @keyframes tx-fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
  @keyframes tx-spin { to{transform:rotate(360deg)} }

  .tx-wrap { padding:60px 0 80px;min-height:70vh; }

  .tx-hero { text-align:center;margin-bottom:44px; }
  .tx-hero-badge {
    display:inline-flex;align-items:center;gap:7px;
    padding:5px 16px;border-radius:20px;margin-bottom:16px;
    background:rgba(112,72,232,0.12);border:1px solid rgba(112,72,232,0.3);
    color:#a78bfa;font-size:0.82rem;font-weight:700;letter-spacing:.09em;text-transform:uppercase;
  }
  .tx-hero-title {
    font-size:clamp(2rem,4vw,3rem);font-weight:800;
    background:linear-gradient(135deg,#e2d9ff 0%,#a78bfa 50%,#60a5fa 100%);
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
    margin-bottom:10px;letter-spacing:-.5px;
  }
  .tx-hero-sub { font-size:1.05rem;color:rgba(255,255,255,0.5);max-width:500px;margin:0 auto;line-height:1.7; }

  .tx-stats { display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:32px; }
  .tx-stat {
    display:flex;align-items:center;gap:10px;padding:14px 22px;
    border-radius:12px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);
    min-width:140px;
  }
  .tx-stat-ico { width:38px;height:38px;border-radius:9px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
  .tx-stat-val { font-size:1.4rem;font-weight:800;color:#e2d9ff; }
  .tx-stat-lbl { font-size:0.78rem;color:rgba(255,255,255,0.45);text-transform:uppercase;letter-spacing:.07em;font-weight:600; }

  .tx-toolbar { display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:20px; }
  .tx-search-wrap { position:relative;flex:1;min-width:200px; }
  .tx-search-ico { position:absolute;left:13px;top:50%;transform:translateY(-50%);color:#6b7280;font-size:15px;pointer-events:none; }
  .tx-search {
    width:100%;height:46px;padding:0 14px 0 40px;
    background:rgba(255,255,255,0.04);border:1.5px solid rgba(255,255,255,0.09);
    border-radius:10px;color:#e2d9ff;font-size:1rem;outline:none;
    transition:border-color .22s,box-shadow .22s;box-sizing:border-box;
  }
  .tx-search::placeholder { color:rgba(255,255,255,0.35); }
  .tx-search:focus { border-color:#7c3aed;box-shadow:0 0 0 3px rgba(112,72,232,0.15); }

  .tx-panel {
    background:linear-gradient(160deg,rgba(18,14,42,0.85),rgba(10,10,24,0.94));
    border:1px solid rgba(112,72,232,0.18);border-radius:20px;overflow:hidden;
    box-shadow:0 20px 60px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.05);
  }

  .tx-table { width:100%;border-collapse:collapse; }
  .tx-table thead tr { background:rgba(0,0,0,0.28);border-bottom:1px solid rgba(255,255,255,0.07); }
  .tx-table th {
    padding:15px 18px;text-align:left;white-space:nowrap;
    font-size:0.8rem;font-weight:700;text-transform:uppercase;letter-spacing:.09em;color:rgba(255,255,255,0.5);
  }
  .tx-table tbody tr { border-bottom:1px solid rgba(255,255,255,0.04);transition:background .15s;animation:tx-fadeUp .32s ease both; }
  .tx-table tbody tr:last-child { border-bottom:none; }
  .tx-table tbody tr:hover { background:rgba(112,72,232,0.06); }
  .tx-table td { padding:15px 18px;font-size:1rem;vertical-align:middle; }

  .tx-num { color:rgba(255,255,255,0.4);font-size:0.9rem; }
  .tx-addr {
    font-family:monospace;font-size:1.05rem;color:#a78bfa;
    background:rgba(112,72,232,0.1);padding:6px 14px;border-radius:6px;white-space:nowrap;cursor:pointer;
    transition:background .18s;
  }
  .tx-addr:hover { background:rgba(112,72,232,0.2); }
  .tx-pid {
    display:inline-flex;align-items:center;justify-content:center;
    min-width:34px;height:34px;padding:0 10px;border-radius:8px;font-weight:800;font-size:0.95rem;
    background:linear-gradient(135deg,rgba(112,72,232,0.3),rgba(99,179,237,0.2));
    color:#c4b5fd;border:1px solid rgba(112,72,232,0.3);text-decoration:none;
    transition:box-shadow .18s;
  }
  .tx-pid:hover { box-shadow:0 0 0 3px rgba(112,72,232,0.2); }
  .tx-amount { font-weight:700;color:#34d399;font-size:1rem;display:inline-flex;align-items:center;gap:5px; }
  .tx-time { color:rgba(255,255,255,0.5);font-size:0.9rem;white-space:nowrap; }
  .tx-hash-cell { display:flex;align-items:center;gap:8px; }
  .tx-hash { font-family:monospace;font-size:0.82rem;color:rgba(255,255,255,0.45);max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap; }
  .tx-ext {
    display:inline-flex;align-items:center;justify-content:center;
    width:28px;height:28px;border-radius:6px;flex-shrink:0;
    background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.09);
    color:rgba(255,255,255,0.45);font-size:12px;cursor:pointer;text-decoration:none;
    transition:all .17s;
  }
  .tx-ext:hover { background:rgba(112,72,232,0.2);border-color:rgba(112,72,232,0.4);color:#a78bfa; }

  .tx-empty { text-align:center;padding:64px 20px; }
  .tx-spinner { width:38px;height:38px;border-radius:50%;border:3px solid rgba(112,72,232,0.18);border-top-color:#7c3aed;animation:tx-spin .75s linear infinite;margin:0 auto 14px; }
  .tx-empty-ico { font-size:3rem;margin-bottom:14px;opacity:.35; }
  .tx-empty-txt { color:rgba(255,255,255,0.45);font-size:1.05rem; }

  .tx-pag { display:flex;justify-content:center;align-items:center;gap:7px;padding:20px 16px; }
  .tx-pag-btn {
    padding:8px 16px;border-radius:8px;font-size:0.9rem;font-weight:600;cursor:pointer;
    background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.09);color:rgba(255,255,255,0.55);
    transition:all .17s;
  }
  .tx-pag-btn:hover:not(:disabled) { background:rgba(112,72,232,0.15);border-color:rgba(112,72,232,0.4);color:#a78bfa; }
  .tx-pag-btn:disabled { opacity:.3;cursor:not-allowed; }
  .tx-pag-btn.active { background:rgba(112,72,232,0.25);border-color:#7c3aed;color:#c4b5fd; }
  .tx-pag-info { font-size:0.9rem;color:rgba(255,255,255,0.4);padding:0 4px; }

  .tx-copied { position:fixed;bottom:28px;left:50%;transform:translateX(-50%);background:#7c3aed;color:#fff;padding:9px 22px;border-radius:10px;font-size:0.95rem;font-weight:600;z-index:9999;pointer-events:none;animation:tx-fadeUp .25s ease; }

  @media(max-width:767px){
    .tx-table thead { display:none; }
    .tx-table tbody tr { display:block;padding:12px 14px;border-bottom:1px solid rgba(255,255,255,0.06); }
    .tx-table td { display:flex;justify-content:space-between;align-items:center;padding:5px 0;font-size:0.8rem;border:none; }
    .tx-table td::before { content:attr(data-label);font-size:0.65rem;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:rgba(255,255,255,0.28);flex-shrink:0;margin-right:8px; }
  }
`;

const PAGE_SIZE = 15;
const ETHERSCAN = "https://sepolia.etherscan.io/tx/";

const fmtAddr = (a) => (a && a.length > 12 ? a.slice(0, 8) + "..." + a.slice(-6) : a || "-");
const fmtTime = (ts) => {
  if (!ts) return "-";
  const d = new Date(ts);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) +
    " " + d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
};

export default function TransactionHistory() {
  const [txList, setTxList]   = useState([]);
  const [total, setTotal]     = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState("");
  const [page, setPage]       = useState(1);
  const [copied, setCopied]   = useState("");

  const fetchTx = useCallback(async (pg = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: pg, limit: PAGE_SIZE });
      const res  = await fetch(`/api/transactions?${params}`);
      const json = await res.json();
      if (json.success) {
        setTxList(json.data);
        setTotal(json.total);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchTx(page); }, [page, fetchTx]);

  const filtered = search.trim()
    ? txList.filter((t) => {
        const q = search.trim().toLowerCase();
        return (
          t.txHash?.toLowerCase().includes(q) ||
          t.buyer?.toLowerCase().includes(q) ||
          t.seller?.toLowerCase().includes(q) ||
          String(t.propertyId).includes(q)
        );
      })
    : txList;

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const totalVol = txList.reduce((s, t) => s + (parseFloat(t.amount) || 0), 0);
  const uniqueBuyers = new Set(txList.map((t) => t.buyer)).size;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(text);
      setTimeout(() => setCopied(""), 1800);
    });
  };

  return (
    <>
      <style suppressHydrationWarning>{S}</style>
      {copied && <div className="tx-copied">Copied!</div>}
      <div className="tx-wrap">
        <div className="container">
          <div className="tx-hero">
            <div className="tx-hero-badge">
              <i className="feather-activity" style={{ fontSize: 11 }} />
              Public Ledger
            </div>
            <h1 className="tx-hero-title">Transaction History</h1>
            <p className="tx-hero-sub">
              Every property sale on BlockEstate - recorded on-chain and stored here for full transparency.
            </p>
          </div>

          <div className="tx-stats">
            {[
              { ico: "feather-repeat",  bg: "rgba(112,72,232,0.18)", ic: "#a78bfa", val: total,                       lbl: "Total Sales" },
              { ico: "feather-zap",     bg: "rgba(52,211,153,0.15)", ic: "#34d399", val: totalVol.toFixed(4)+" ETH",  lbl: "Volume (this page)" },
              { ico: "feather-users",   bg: "rgba(96,165,250,0.15)", ic: "#60a5fa", val: uniqueBuyers,                lbl: "Unique Buyers" },
            ].map((s, i) => (
              <div className="tx-stat" key={i}>
                <div className="tx-stat-ico" style={{ background: s.bg }}>
                  <i className={s.ico} style={{ color: s.ic, fontSize: 14 }} />
                </div>
                <div>
                  <div className="tx-stat-val">{loading ? "-" : s.val}</div>
                  <div className="tx-stat-lbl">{s.lbl}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="tx-toolbar">
            <div className="tx-search-wrap">
              <i className="feather-search tx-search-ico" />
              <input
                className="tx-search"
                placeholder="Search by buyer address, property ID or tx hash..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="tx-panel">
            {loading ? (
              <div className="tx-empty">
                <div className="tx-spinner" />
                <div className="tx-empty-txt">Loading transactions...</div>
              </div>
            ) : filtered.length === 0 ? (
              <div className="tx-empty">
                <div className="tx-empty-ico">&#128205;</div>
                <div className="tx-empty-txt">
                  {search ? "No transactions match your search." : "No transactions recorded yet."}
                </div>
              </div>
            ) : (
              <>
                <table className="tx-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Buyer Wallet Address</th>
                      <th>Property ID</th>
                      <th>Token Amount</th>
                      <th>Timestamp</th>
                      <th>Transaction Hash</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((tx, i) => (
                      <tr key={tx._id || tx.txHash} style={{ animationDelay: `${i * 0.035}s` }}>
                        <td data-label="#"><span className="tx-num">{(page-1)*PAGE_SIZE+i+1}</span></td>
                        <td data-label="Buyer Wallet">
                          <span className="tx-addr" title={tx.buyer} onClick={() => copyToClipboard(tx.buyer)}>
                            {fmtAddr(tx.buyer)}
                          </span>
                        </td>
                        <td data-label="Property ID">
                          <Link href={`/detail?property=${tx.propertyId}`} className="tx-pid">#{tx.propertyId}</Link>
                        </td>
                        <td data-label="Token Amount">
                          <span className="tx-amount">
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                            {parseFloat(tx.amount||0).toFixed(4)} ETH
                          </span>
                        </td>
                        <td data-label="Timestamp"><span className="tx-time">{fmtTime(tx.timestamp)}</span></td>
                        <td data-label="Tx Hash">
                          <div className="tx-hash-cell">
                            <span className="tx-hash" title={tx.txHash} style={{cursor:"pointer"}} onClick={() => copyToClipboard(tx.txHash)}>{tx.txHash}</span>
                            <a href={ETHERSCAN+tx.txHash} target="_blank" rel="noopener noreferrer" className="tx-ext" title="View on Etherscan">
                              <i className="feather-external-link" style={{fontSize:10}} />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {totalPages > 1 && (
                  <div className="tx-pag">
                    <button className="tx-pag-btn" disabled={page===1} onClick={()=>setPage(1)}>&#171;</button>
                    <button className="tx-pag-btn" disabled={page===1} onClick={()=>setPage(p=>p-1)}>&#8249; Prev</button>
                    <span className="tx-pag-info">Page {page} of {totalPages}</span>
                    <button className="tx-pag-btn" disabled={page===totalPages} onClick={()=>setPage(p=>p+1)}>Next &#8250;</button>
                    <button className="tx-pag-btn" disabled={page===totalPages} onClick={()=>setPage(totalPages)}>&#187;</button>
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
