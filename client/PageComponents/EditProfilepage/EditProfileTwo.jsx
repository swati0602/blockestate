import React, { useState, useEffect } from "react";
import { useStateContext } from "../../context";

const S = `
  @keyframes ep-fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes ep-checkPop { 0%{transform:scale(0) rotate(-15deg);opacity:0} 60%{transform:scale(1.2) rotate(4deg)} 100%{transform:scale(1) rotate(0);opacity:1} }
  @keyframes ep-gradShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
  @keyframes ep-slideIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
  @keyframes ep-focusRing { from{box-shadow:0 0 0 0 rgba(112,72,232,0.5)} to{box-shadow:0 0 0 4px rgba(112,72,232,0.15),0 0 24px rgba(112,72,232,0.1)} }
  @keyframes ep-glowPulse { 0%,100%{box-shadow:0 0 0 0 rgba(0,255,163,0)} 50%{box-shadow:0 0 0 4px rgba(0,255,163,0.2)} }
  @keyframes ep-shimmer { 0%{background-position: -200% 0} 100%{background-position: 200% 0} }

  .ep2-wrap { padding:40px 0 80px; }

  /* preview */
  .ep2-preview {
    background:linear-gradient(160deg,rgba(22,18,50,0.92),rgba(14,12,32,0.96));
    border:1px solid rgba(112,72,232,0.25); border-radius:24px; overflow:hidden;
    box-shadow:0 24px 64px rgba(0,0,0,0.55),inset 0 1px 0 rgba(255,255,255,0.07);
    position:sticky; top:90px;
    transition:transform .3s,box-shadow .3s;
  }
  .ep2-preview:hover { transform:translateY(-2px); box-shadow:0 32px 72px rgba(0,0,0,0.6),0 0 0 1px rgba(112,72,232,0.3),inset 0 1px 0 rgba(255,255,255,0.07); }
  .ep2-preview-cover { width:100%;height:130px;object-fit:cover;display:block; }
  .ep2-preview-cover-ph { width:100%;height:130px;background:linear-gradient(135deg,#0d0b1a,#1a1035 40%,#0a1628 70%,#0e1340); background-size:200% 200%; animation:ep-gradShift 6s ease infinite; }
  .ep2-preview-body { padding:0 20px 24px; }
  .ep2-preview-av-wrap { margin-top:-40px;margin-bottom:14px;display:inline-block;position:relative; }
  .ep2-preview-av {
    width:80px;height:80px;border-radius:50%;
    border:3px solid #0d0b1a;outline:2.5px solid rgba(112,72,232,0.65);
    object-fit:cover;background:linear-gradient(135deg,#7048e8,#a78bfa);
    box-shadow:0 8px 24px rgba(112,72,232,0.45);
    display:flex;align-items:center;justify-content:center;
    transition:transform .3s,box-shadow .3s;
  }
  .ep2-preview-av:hover { transform:scale(1.06);box-shadow:0 12px 32px rgba(112,72,232,0.6); }
  .ep2-preview-online { position:absolute;bottom:5px;right:2px;width:17px;height:17px;border-radius:50%;background:#00FFA3;border:2.5px solid #0d0b1a;box-shadow:0 0 10px rgba(0,255,163,0.6);animation:ep-glowPulse 2s ease-in-out infinite; }
  .ep2-preview-name { font-size:1.4rem;font-weight:800;color:#fff;margin-bottom:3px;letter-spacing:-0.2px; }
  .ep2-preview-addr { font-size:14px;color:rgba(255,255,255,0.28);font-family:monospace;letter-spacing:.05em;margin-bottom:13px;word-break:break-all; }
  .ep2-preview-badge { display:inline-flex;align-items:center;gap:5px;padding:5px 12px;border-radius:20px;font-size:14px;font-weight:700;background:rgba(112,72,232,0.18);color:#c4b5fd;border:1px solid rgba(112,72,232,0.38);margin-bottom:14px;transition:background .2s,border-color .2s; }
  .ep2-preview-badge:hover { background:rgba(112,72,232,0.28);border-color:rgba(112,72,232,0.55); }
  .ep2-preview-div { height:1px;background:rgba(255,255,255,0.06);margin:13px 0; }
  .ep2-preview-stat { display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:9px; }
  .ep2-preview-stat-lbl { font-size:14px;color:rgba(255,255,255,0.32);text-transform:uppercase;letter-spacing:.07em;flex-shrink:0; }
  .ep2-preview-stat-val { font-size:15px;font-weight:600;color:#a78bfa;text-align:right;word-break:break-all; }

  /* panel */
  .ep2-panel {
    background:linear-gradient(160deg,rgba(18,14,42,0.85),rgba(10,10,24,0.94));
    border:1px solid rgba(112,72,232,0.2);border-radius:24px;overflow:hidden;
    box-shadow:0 20px 60px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.05);
    backdrop-filter:blur(12px);
  }

  /* tabs */
  .ep2-tabs { display:flex;background:rgba(0,0,0,0.3);border-bottom:1px solid rgba(255,255,255,0.07);padding:0 8px;overflow-x:auto;gap:4px; }
  .ep2-tabs::-webkit-scrollbar { height:2px; }
  .ep2-tabs::-webkit-scrollbar-thumb { background:rgba(112,72,232,0.4);border-radius:2px; }
  .ep2-tab { display:flex;align-items:center;gap:8px;padding:16px 24px;background:none;border:none;outline:none;color:rgba(255,255,255,0.35);font-size:1.1rem;font-weight:600;cursor:pointer;white-space:nowrap;border-bottom:3px solid transparent;transition:all .25s;position:relative;bottom:-1px; }
  .ep2-tab:hover { color:rgba(255,255,255,0.72); }
  .ep2-tab.active { color:#a78bfa;border-bottom-color:#7c3aed; }
  .ep2-tab-icon { width:30px;height:30px;border-radius:9px;display:inline-flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.05);transition:all .25s;flex-shrink:0; }
  .ep2-tab.active .ep2-tab-icon { background:linear-gradient(135deg,rgba(112,72,232,0.42),rgba(99,179,237,0.22));box-shadow:0 4px 12px rgba(112,72,232,0.25); }
  .ep2-tab:not(.active):hover .ep2-tab-icon { background:rgba(255,255,255,0.08); }

  /* body */
  .ep2-tab-body { padding:36px 36px 32px;animation:ep-slideIn .3s ease; }
  .ep2-sec-title { font-size:1.5rem;font-weight:700;color:#e2d9ff;margin-bottom:8px;display:flex;align-items:center;gap:10px;letter-spacing:-0.2px; }
  .ep2-sec-title::before { content:"";display:inline-block;width:4px;height:24px;background:linear-gradient(180deg,#7c3aed,#60a5fa);border-radius:3px;flex-shrink:0; }
  .ep2-sec-desc { font-size:1.15rem;color:rgba(255,255,255,0.35);margin-bottom:32px;line-height:1.6; }

  /* ─── INPUT SYSTEM ─── */
  .ep2-form-row { display:grid;gap:20px;margin-bottom:20px; }
  .ep2-form-row.cols2 { grid-template-columns:1fr 1fr; }
  @media(max-width:575px){ .ep2-form-row.cols2 { grid-template-columns:1fr; } }

  .ep2-field {
    display:flex;flex-direction:column;gap:0;
    opacity:0;animation:ep-fadeUp .38s ease forwards;
  }
  .ep2-field:nth-child(1){animation-delay:.04s}
  .ep2-field:nth-child(2){animation-delay:.09s}
  .ep2-field:nth-child(3){animation-delay:.13s}
  .ep2-field:nth-child(4){animation-delay:.17s}
  .ep2-field:nth-child(5){animation-delay:.21s}
  .ep2-field:nth-child(6){animation-delay:.25s}

  /* label above input */
  .ep2-lbl {
    display:flex;align-items:center;gap:7px;
    font-size:1rem;font-weight:700;
    text-transform:uppercase;letter-spacing:0.8px;
    color:#6b7280;
    margin-bottom:8px;
    transition:color .22s;
    user-select:none;
  }
  .ep2-lbl i { font-size:15px;transition:color .22s; }
  .ep2-field:focus-within .ep2-lbl { color:#a78bfa; }
  .ep2-field:focus-within .ep2-lbl i { color:#a78bfa; }

  /* the input wrapper */
  .ep2-input-wrap {
    position:relative;
    display:flex;align-items:center;
  }

  /* the actual input */
  .ep2-inp {
    width:100%;
    height:64px;
    padding:0 16px;
    background:rgba(255,255,255,0.04);
    border:1.5px solid rgba(255,255,255,0.09);
    border-radius:13px;
    color:#e2d9ff;
    font-size:1.2rem;
    font-weight:500;
    outline:none;
    transition:border-color .25s, background .25s, box-shadow .25s;
    -webkit-appearance:none;
    appearance:none;
    box-sizing:border-box;
    letter-spacing:0.01em;
  }
  .ep2-inp::placeholder {
    color:rgba(255,255,255,0.2) !important;
    font-size:1.1rem;
    font-weight:400;
    opacity:1 !important;
  }
  .ep2-inp:hover {
    border-color:rgba(167,139,250,0.35);
    background:rgba(255,255,255,0.055);
  }
  .ep2-inp:focus {
    border-color:#7c3aed;
    background:rgba(112,72,232,0.07);
    box-shadow:0 0 0 3.5px rgba(112,72,232,0.18), 0 0 28px rgba(112,72,232,0.1);
  }
  input.ep2-inp:-webkit-autofill,
  input.ep2-inp:-webkit-autofill:focus {
    -webkit-box-shadow:0 0 0 1000px #0e0c1e inset !important;
    -webkit-text-fill-color:#e2d9ff !important;
    caret-color:#e2d9ff;
  }

  /* textarea */
  .ep2-textarea-wrap { position:relative; }
  .ep2-tarea {
    width:100%;min-height:120px;
    padding:16px 16px 16px 16px;
    background:rgba(255,255,255,0.04);
    border:1.5px solid rgba(255,255,255,0.09);
    border-radius:13px;
    color:#e2d9ff;font-size:1.2rem;font-weight:500;
    outline:none;resize:vertical;line-height:1.6;
    transition:border-color .25s,background .25s,box-shadow .25s;
    -webkit-appearance:none;appearance:none;
    box-sizing:border-box;
  }
  .ep2-tarea::placeholder { color:rgba(255,255,255,0.2) !important; font-size:1.1rem; font-weight:400; opacity:1 !important; }
  .ep2-tarea:hover { border-color:rgba(167,139,250,0.35);background:rgba(255,255,255,0.055); }
  .ep2-tarea:focus { border-color:#7c3aed;background:rgba(112,72,232,0.07);box-shadow:0 0 0 3.5px rgba(112,72,232,0.18),0 0 28px rgba(112,72,232,0.1); }
  .ep2-char { position:absolute;right:16px;bottom:12px;font-size:0.95rem;color:rgba(255,255,255,0.18);pointer-events:none;font-family:monospace;transition:color .22s; }
  .ep2-field:focus-within .ep2-char { color:rgba(167,139,250,0.6); }

  /* sub heading */
  .ep2-sub { font-size:1.05rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:rgba(167,139,250,0.55);margin:32px 0 20px;display:flex;align-items:center;gap:12px; }
  .ep2-sub::after { content:"";flex:1;height:1px;background:rgba(139,92,246,0.15); }

  /* upload */
  .ep2-upload-grid { display:grid;grid-template-columns:200px 1fr;gap:28px; }
  @media(max-width:767px){ .ep2-upload-grid { grid-template-columns:1fr; } }
  .ep2-upload-box { border:2px dashed rgba(112,72,232,0.28);border-radius:18px;background:rgba(112,72,232,0.04);padding:8px;transition:border-color .28s,background .28s,box-shadow .28s; }
  .ep2-upload-box:hover { border-color:rgba(112,72,232,0.55);background:rgba(112,72,232,0.08);box-shadow:0 0 20px rgba(112,72,232,0.12); }
  .ep2-upload-box.drag { border-color:#7c3aed;background:rgba(112,72,232,0.14);box-shadow:0 0 30px rgba(112,72,232,0.2); }
  .ep2-upload-prev-av { width:100%;aspect-ratio:1;border-radius:12px;object-fit:cover;display:block; }
  .ep2-upload-prev-cv { width:100%;height:200px;border-radius:12px;object-fit:cover;display:block; }
  .ep2-upload-empty { display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;color:#475569;font-size:1.1rem;text-align:center;padding:24px 12px; }
  .ep2-upload-ico { width:48px;height:48px;border-radius:14px;background:rgba(112,72,232,0.1);border:1px solid rgba(112,72,232,0.22);display:flex;align-items:center;justify-content:center;color:#7c3aed;font-size:1.3rem;transition:transform .2s,background .2s; }
  .ep2-upload-box:hover .ep2-upload-ico { transform:scale(1.1);background:rgba(112,72,232,0.18); }
  .ep2-upload-btn-row { display:flex;align-items:center;gap:10px;margin-top:14px; }
  .ep2-upload-lbl { display:inline-flex;align-items:center;gap:8px;padding:12px 24px;border-radius:12px;font-size:1.1rem;font-weight:600;cursor:pointer;background:linear-gradient(135deg,#7c3aed,#9f7aea);color:#fff;box-shadow:0 6px 20px rgba(112,72,232,0.35);transition:all .25s;white-space:nowrap;user-select:none; }
  .ep2-upload-lbl:hover { transform:translateY(-2px);box-shadow:0 8px 28px rgba(112,72,232,0.55); }
  .ep2-remove-btn { display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:11px;cursor:pointer;flex-shrink:0;background:rgba(239,68,68,0.1);color:#f87171;border:1px solid rgba(239,68,68,0.28);transition:all .25s; }
  .ep2-remove-btn:hover { transform:translateY(-2px) rotate(-5deg);background:rgba(239,68,68,0.22);box-shadow:0 6px 18px rgba(239,68,68,0.3); }
  .ep2-upload-sec-lbl { font-size:1.05rem;font-weight:700;color:rgba(167,139,250,0.55);text-transform:uppercase;letter-spacing:.08em;margin-bottom:12px;display:flex;align-items:center;gap:10px; }
  .ep2-upload-sec-lbl::before { content:'';width:6px;height:6px;border-radius:50%;background:#7c3aed;flex-shrink:0; }

  /* wallet chip */
  .ep2-wallet { display:flex;flex-direction:column;gap:12px;padding:18px 20px;border-radius:16px;background:rgba(112,72,232,0.07);border:1.5px solid rgba(112,72,232,0.25);transition:border-color .25s,background .25s; }
  .ep2-wallet:hover { border-color:rgba(112,72,232,0.45);background:rgba(112,72,232,0.1); }
  .ep2-wallet-top { display:flex;align-items:center;gap:12px;justify-content:space-between; }
  .ep2-wallet-ico { width:42px;height:42px;border-radius:12px;flex-shrink:0;background:linear-gradient(135deg,rgba(112,72,232,0.35),rgba(99,179,237,0.2));border:1px solid rgba(112,72,232,0.4);display:flex;align-items:center;justify-content:center;color:#a78bfa; }
  .ep2-wallet-lbl { font-size:1.1rem;font-weight:700;color:#a78bfa;text-transform:uppercase;letter-spacing:.1em;flex:1; }
  .ep2-wallet-addr { font-family:monospace;font-size:1.15rem;color:#e2d9ff;letter-spacing:.04em;word-break:break-all;line-height:1.65;padding:12px 16px;background:rgba(0,0,0,0.22);border-radius:10px;border:1px solid rgba(255,255,255,0.06); }
  .ep2-copy-btn { flex-shrink:0;background:rgba(124,58,237,0.14);border:1px solid rgba(124,58,237,0.3);border-radius:6px;padding:8px 12px;cursor:pointer;color:#a78bfa;display:inline-flex;align-items:center;gap:5px;font-size:0.9rem;font-weight:600;transition:all .22s;white-space:nowrap;width:fit-content; }
  .ep2-copy-btn:hover { background:rgba(124,58,237,0.28);color:#c4b5fd;transform:translateY(-1px); }

  /* divider + buttons */
  .ep2-divider { height:1px;background:linear-gradient(90deg,transparent,rgba(112,72,232,.3),rgba(99,179,237,.18),transparent);margin:28px 0;border:none; }
  .ep2-btn-row { display:flex;gap:12px;flex-wrap:wrap;align-items:center; }
  .ep2-btn-cancel { padding:14px 32px;border-radius:14px;background:rgba(255,255,255,0.06);border:1.5px solid rgba(255,255,255,0.1);color:#94a3b8;font-size:1.2rem;font-weight:600;cursor:pointer;transition:all .25s; }
  .ep2-btn-cancel:hover { background:rgba(255,255,255,.1);color:#cbd5e1;transform:translateY(-2px);border-color:rgba(255,255,255,0.2); }
  .ep2-btn-save { padding:14px 40px;border-radius:14px;min-width:180px;background:linear-gradient(135deg,#7c3aed,#9f7aea,#60a5fa);background-size:200% 200%;border:none;color:#fff;font-size:1.2rem;font-weight:700;cursor:pointer;box-shadow:0 8px 28px rgba(112,72,232,.4);transition:all .3s;animation:ep-gradShift 4s ease infinite;position:relative;overflow:hidden; }
  .ep2-btn-save::after { content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,0.12),transparent);opacity:0;transition:opacity .2s; }
  .ep2-btn-save:hover { transform:translateY(-3px);box-shadow:0 14px 32px rgba(112,72,232,.55); }
  .ep2-btn-save:hover::after { opacity:1; }
  .ep2-btn-save.saved { background:linear-gradient(135deg,#10b981,#34d399) !important;background-size:100% !important;animation:none !important;box-shadow:0 6px 22px rgba(16,185,129,.45); }
  .ep2-check { animation:ep-checkPop 0.4s cubic-bezier(.22,.68,0,1.2) both; }

  /* notifications */
  .ep2-notif-row { display:flex;align-items:center;gap:14px;padding:16px 18px;border-radius:16px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);margin-bottom:10px;transition:all .27s;cursor:pointer;position:relative;overflow:hidden; }
  .ep2-notif-row::before { content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:linear-gradient(180deg,#7c3aed,#60a5fa);border-radius:3px 0 0 3px;opacity:0;transition:opacity .25s; }
  .ep2-notif-row:hover::before,.ep2-notif-row.on::before { opacity:1; }
  .ep2-notif-row:hover { background:rgba(112,72,232,.07);border-color:rgba(112,72,232,.22);transform:translateX(5px);padding-left:20px; }
  .ep2-notif-ico { width:40px;height:40px;border-radius:12px;flex-shrink:0;display:flex;align-items:center;justify-content:center;transition:all .3s; }
  .ep2-toggle { position:relative;display:inline-block;width:46px;height:25px;flex-shrink:0;margin-left:auto; }
  .ep2-toggle input { opacity:0;width:0;height:0;position:absolute; }
  .ep2-toggle-sl { position:absolute;cursor:pointer;inset:0;border-radius:25px;background:rgba(255,255,255,0.1);transition:all .3s;border:1px solid rgba(255,255,255,0.08); }
  .ep2-toggle-sl::after { content:"";position:absolute;height:19px;width:19px;border-radius:50%;left:3px;bottom:2px;background:#fff;transition:left .3s cubic-bezier(.22,.68,0,1.2);box-shadow:0 2px 6px rgba(0,0,0,.35); }
  .ep2-toggle input:checked + .ep2-toggle-sl { background:linear-gradient(135deg,#7c3aed,#9f7aea);box-shadow:0 0 14px rgba(112,72,232,.5);border-color:transparent; }
  .ep2-toggle input:checked + .ep2-toggle-sl::after { left:24px; }

  /* delete account */
  .ep2-danger-zone { padding:24px;border-radius:13px;background:rgba(239,68,68,0.08);border:1.5px solid rgba(239,68,68,0.25);margin-top:24px; }
  .ep2-danger-title { font-size:1.25rem;font-weight:700;color:#ef4444;margin-bottom:8px;display:flex;align-items:center;gap:8px; }
  .ep2-danger-desc { font-size:1.05rem;color:rgba(255,255,255,0.3);margin-bottom:16px;line-height:1.6; }
  .ep2-btn-delete { padding:12px 28px;border-radius:10px;background:linear-gradient(135deg,#dc2626,#ef4444);border:none;color:#fff;font-size:1.1rem;font-weight:600;cursor:pointer;transition:all .25s;box-shadow:0 4px 16px rgba(239,68,68,0.3); }
  .ep2-btn-delete:hover { transform:translateY(-2px);box-shadow:0 8px 24px rgba(239,68,68,0.5); }
  .ep2-btn-delete.loading { opacity:0.6;cursor:not-allowed; }

  /* modal */
  .ep2-modal-overlay { position:fixed;inset:0;background:rgba(0,0,0,0.7);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:9999;animation:ep-fadeUp .25s ease; }
  .ep2-modal { background:linear-gradient(160deg,rgba(18,14,42,0.98),rgba(10,10,24,0.99));border:1px solid rgba(239,68,68,0.3);border-radius:20px;padding:32px;max-width:500px;width:90%;box-shadow:0 24px 80px rgba(0,0,0,0.8);animation:ep-slideIn .3s ease; }
  .ep2-modal-title { font-size:1.6rem;font-weight:700;color:#ef4444;margin-bottom:12px;display:flex;align-items:center;gap:10px; }
  .ep2-modal-text { font-size:1.1rem;color:rgba(255,255,255,0.5);margin-bottom:24px;line-height:1.6; }
  .ep2-modal-warning { background:rgba(239,68,68,0.1);border-left:3px solid #ef4444;padding:12px 14px;border-radius:8px;font-size:1rem;color:#fca5a5;margin-bottom:24px;line-height:1.5; }
  .ep2-modal-actions { display:flex;gap:12px;justify-content:flex-end; }
  .ep2-modal-cancel { padding:12px 28px;border-radius:10px;background:rgba(255,255,255,0.06);border:1.5px solid rgba(255,255,255,0.1);color:#cbd5e1;font-size:1.1rem;font-weight:600;cursor:pointer;transition:all .25s; }
  .ep2-modal-cancel:hover { background:rgba(255,255,255,0.1);border-color:rgba(255,255,255,0.2); }
  .ep2-modal-delete { padding:12px 28px;border-radius:10px;background:linear-gradient(135deg,#dc2626,#ef4444);border:none;color:#fff;font-size:1.1rem;font-weight:600;cursor:pointer;transition:all .25s;box-shadow:0 4px 16px rgba(239,68,68,0.3); }
  .ep2-modal-delete:hover { transform:translateY(-2px);box-shadow:0 8px 24px rgba(239,68,68,0.5); }
  .ep2-modal-delete.loading { opacity:0.6;cursor:not-allowed; }

  @media(max-width:575px){ .ep2-tab-body { padding:22px 18px 20px; } }
`;

/* ─── reusable field ─── */
const Field = ({ label, icon, children }) => (
  <div className="ep2-field">
    <label className="ep2-lbl">
      <i className={icon} />
      {label}
    </label>
    {children}
  </div>
);

const EditProfileTwo = () => {
  const { currentAccount, notifySuccess, notifyError } = useStateContext();
  const key = (s) => `${(currentAccount || "guest").toLowerCase()}_${s}`;

  const [activeTab, setActiveTab] = useState("image");
  const [profile, setProfile] = useState({ username: "", firstName: "", lastName: "", email: "", bio: "", role: "", phone: "", website: "", twitter: "", instagram: "" });
  const [notifications, setNotifications] = useState({ orderConfirmation: false, newItems: false, newBid: false, paymentCard: false, endingBid: false, approveProduct: false });
  const [profileSaved, setProfileSaved] = useState(false);
  const [notifSaved, setNotifSaved] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [coverPic, setCoverPic] = useState(null);
  const [copied, setCopied] = useState(false);
  const [dragOver, setDragOver] = useState(null);
  const [bioLen, setBioLen] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (currentAccount) {
        try {
          const res = await fetch(`/api/users/${currentAccount}`);
          if (res.ok) {
            const { data } = await res.json();
            const p = { username: data.username || "", firstName: data.firstName || "", lastName: data.lastName || "", email: data.email || "", bio: data.bio || "", role: data.role || "", phone: data.phone || "", website: data.website || "", twitter: data.twitter || "", instagram: data.instagram || "" };
            setProfile(p);
            setBioLen((p.bio || "").length);
            localStorage.setItem(key("be_profile"), JSON.stringify(p));
          }
        } catch (_) { }
      } else {
        try { const s = localStorage.getItem(key("be_profile")); if (s) { const p = JSON.parse(s); setProfile(p); setBioLen((p.bio || "").length); } } catch (_) { }
      }
      try { const s = localStorage.getItem(key("be_notifications")); if (s) setNotifications(JSON.parse(s)); } catch (_) { }
      setProfilePic(localStorage.getItem(key("be_profileImg")) || null);
      setCoverPic(localStorage.getItem(key("be_coverImg")) || null);
    };
    load();
  }, [currentAccount]);

  const readFile = (file, setter, lsKey) => {
    const reader = new FileReader();
    reader.onload = (ev) => { setter(ev.target.result); localStorage.setItem(key(lsKey), ev.target.result); window.dispatchEvent(new Event("storage")); };
    reader.readAsDataURL(file);
  };
  const removeImg = (setter, lsKey) => { setter(null); localStorage.removeItem(key(lsKey)); window.dispatchEvent(new Event("storage")); };
  const handleDrop = (e, setter, lsKey) => { e.preventDefault(); setDragOver(null); const f = e.dataTransfer.files[0]; if (f && f.type.startsWith("image/")) readFile(f, setter, lsKey); };

  const saveProfile = async (e) => {
    e.preventDefault();
    localStorage.setItem(key("be_profile"), JSON.stringify(profile));
    const fullName = [profile.firstName, profile.lastName].filter(Boolean).join(" ");
    if (fullName) { localStorage.setItem(key("be_displayName"), fullName); window.dispatchEvent(new Event("storage")); }
    if (currentAccount) {
      try {
        const res = await fetch(`/api/users/${currentAccount}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: profile.username || fullName || undefined, firstName: profile.firstName, lastName: profile.lastName, email: profile.email, bio: profile.bio, role: profile.role, phone: profile.phone, website: profile.website, twitter: profile.twitter, instagram: profile.instagram }) });
        if (!res.ok) throw new Error();
        notifySuccess("Profile saved!");
      } catch { notifyError("Could not save to database"); }
    }
    setProfileSaved(true); setTimeout(() => setProfileSaved(false), 2500);
  };

  const saveNotifications = (e) => { e.preventDefault(); localStorage.setItem(key("be_notifications"), JSON.stringify(notifications)); setNotifSaved(true); setTimeout(() => setNotifSaved(false), 2500); };

  const handleDeleteAccount = async () => {
    if (!currentAccount) {
      notifyError("Wallet not connected");
      return;
    }
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/users/${currentAccount}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error();
      notifySuccess("Account deleted successfully!");
      setShowDeleteModal(false);
      
      // Clear local storage
      localStorage.removeItem(key("be_profile"));
      localStorage.removeItem(key("be_notifications"));
      localStorage.removeItem(key("be_profileImg"));
      localStorage.removeItem(key("be_coverImg"));
      
      // Redirect after delay
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (err) {
      setIsDeleting(false);
      notifyError("Failed to delete account. Please try again.");
    }
  };

  const shortAddr = currentAccount ? currentAccount.slice(0, 8) + "..." + currentAccount.slice(-6) : "Not connected";
  const displayName = [profile.firstName, profile.lastName].filter(Boolean).join(" ") || shortAddr;
  const tabs = [
    { id: "image", icon: "feather-camera", label: "Profile Images" },
    { id: "info", icon: "feather-user", label: "Personal Info" },
    { id: "notif", icon: "feather-bell", label: "Notifications" },
    { id: "account", icon: "feather-settings", label: "Account Settings" },
  ];

  return (
    <>
      <style suppressHydrationWarning>{S}</style>
      <div className="ep2-wrap">
        <div className="container">
          <div className="row g-4">

            {/* preview */}
            <div className="col-lg-3 col-md-4 d-none d-md-block">
              <div className="ep2-preview">
                {coverPic ? <img src={coverPic} alt="Cover" className="ep2-preview-cover" /> : <div className="ep2-preview-cover-ph" />}
                <div className="ep2-preview-body">
                  <div className="ep2-preview-av-wrap">
                    {profilePic ? <img src={profilePic} alt="Avatar" className="ep2-preview-av" /> : <div className="ep2-preview-av"><i className="feather-user" style={{ color: "#fff", fontSize: "1.9rem" }} /></div>}
                    <div className="ep2-preview-online" />
                  </div>
                  <div className="ep2-preview-name">{displayName}</div>
                  <div className="ep2-preview-addr">{currentAccount || "—"}</div>
                  <span className="ep2-preview-badge">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                    Verified Creator
                  </span>
                  <div className="ep2-preview-div" />
                  {profile.bio && <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.4)", marginBottom: 15, lineHeight: 1.6 }}>{profile.bio.slice(0, 90)}{profile.bio.length > 90 ? "…" : ""}</p>}
                  {[{ label: "Role", value: profile.role || "—" }, { label: "Email", value: profile.email || "—" }].map(s => (
                    <div className="ep2-preview-stat" key={s.label}>
                      <span className="ep2-preview-stat-lbl">{s.label}</span>
                      <span className="ep2-preview-stat-val">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* form panel */}
            <div className="col-lg-9 col-md-8 col-12">
              <div className="ep2-panel">
                <div className="ep2-tabs">
                  {tabs.map(t => (
                    <button key={t.id} type="button" className={`ep2-tab${activeTab === t.id ? " active" : ""}`} onClick={() => setActiveTab(t.id)}>
                      <span className="ep2-tab-icon"><i className={t.icon} style={{ fontSize: 13 }} /></span>
                      {t.label}
                    </button>
                  ))}
                </div>

                <div className="ep2-tab-body">

                  {/* IMAGE TAB */}
                  {activeTab === "image" && (
                    <div key="image">
                      <div className="ep2-sec-title">Upload Your Images</div>
                      <p className="ep2-sec-desc">Stored locally on your browser and displayed on your author profile. Drag & drop or click to upload.</p>
                      <div className="ep2-upload-grid">
                        <div>
                          <div className="ep2-upload-sec-lbl">Profile Picture</div>
                          <div className={`ep2-upload-box${dragOver === "profile" ? " drag" : ""}`} onDragOver={e => { e.preventDefault(); setDragOver("profile") }} onDragLeave={() => setDragOver(null)} onDrop={e => handleDrop(e, setProfilePic, "be_profileImg")}>
                            {profilePic ? <img src={profilePic} alt="Profile" className="ep2-upload-prev-av" /> : <div className="ep2-upload-empty" style={{ height: 150 }}><div className="ep2-upload-ico"><i className="feather-user" /></div><div>Drop photo here<br /><span style={{ color: "#6b7280", fontSize: "0.72rem" }}>or click Upload</span></div></div>}
                          </div>
                          <div className="ep2-upload-btn-row">
                            <div style={{ position: "relative", display: "inline-block" }}>
                              <input id="ep2-pf" type="file" accept="image/*" onChange={e => e.target.files[0] && readFile(e.target.files[0], setProfilePic, "be_profileImg")} style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer", width: "100%", height: "100%" }} />
                              <label htmlFor="ep2-pf" className="ep2-upload-lbl"><i className="feather-upload" style={{ fontSize: 11 }} /> Upload</label>
                            </div>
                            {profilePic && <button type="button" className="ep2-remove-btn" onClick={() => removeImg(setProfilePic, "be_profileImg")}><i className="feather-trash-2" style={{ fontSize: 13 }} /></button>}
                          </div>
                        </div>
                        <div>
                          <div className="ep2-upload-sec-lbl">Cover Photo</div>
                          <div className={`ep2-upload-box${dragOver === "cover" ? " drag" : ""}`} onDragOver={e => { e.preventDefault(); setDragOver("cover") }} onDragLeave={() => setDragOver(null)} onDrop={e => handleDrop(e, setCoverPic, "be_coverImg")}>
                            {coverPic ? <img src={coverPic} alt="Cover" className="ep2-upload-prev-cv" /> : <div className="ep2-upload-empty" style={{ height: 200 }}><div className="ep2-upload-ico"><i className="feather-image" /></div><div>Drop banner here<br /><span style={{ color: "#6b7280", fontSize: "0.72rem" }}>Recommended 1200×300</span></div></div>}
                          </div>
                          <div className="ep2-upload-btn-row">
                            <div style={{ position: "relative", display: "inline-block" }}>
                              <input id="ep2-cf" type="file" accept="image/*" onChange={e => e.target.files[0] && readFile(e.target.files[0], setCoverPic, "be_coverImg")} style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer", width: "100%", height: "100%" }} />
                              <label htmlFor="ep2-cf" className="ep2-upload-lbl"><i className="feather-image" style={{ fontSize: 11 }} /> Upload</label>
                            </div>
                            {coverPic && <button type="button" className="ep2-remove-btn" onClick={() => removeImg(setCoverPic, "be_coverImg")}><i className="feather-trash-2" style={{ fontSize: 13 }} /></button>}
                          </div>
                        </div>
                      </div>
                      <hr className="ep2-divider" />
                      <div className="ep2-upload-sec-lbl" style={{ marginBottom: 14 }}>Connected Wallet</div>
                      {currentAccount ? (
                        <div className="ep2-wallet">
                          <div className="ep2-wallet-top">
                            <div className="ep2-wallet-ico"><i className="feather-link" style={{ fontSize: 16 }} /></div>
                            <span className="ep2-wallet-lbl">Wallet Address</span>
                            <button type="button" className="ep2-copy-btn" onClick={() => { navigator.clipboard.writeText(currentAccount); setCopied(true); setTimeout(() => setCopied(false), 1800); }}>
                              <i className={copied ? "feather-check" : "feather-copy"} style={{ fontSize: 12, color: copied ? "#34d399" : undefined }} />
                              {copied ? "Copied!" : "Copy"}
                            </button>
                          </div>
                          <div className="ep2-wallet-addr">{currentAccount}</div>
                        </div>
                      ) : (
                        <div className="ep2-wallet">
                          <div className="ep2-wallet-top">
                            <div className="ep2-wallet-ico"><i className="feather-wifi-off" style={{ fontSize: 16 }} /></div>
                            <span className="ep2-wallet-lbl">No wallet connected</span>
                          </div>
                          <div className="ep2-wallet-addr" style={{ color: "rgba(255,255,255,0.25)" }}>Connect your wallet to unlock all features</div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* INFO TAB */}
                  {activeTab === "info" && (
                    <div key="info">
                      <div className="ep2-sec-title">Personal Information</div>
                      <p className="ep2-sec-desc">All fields are saved to the database and shown on your public profile.</p>
                      <form onSubmit={saveProfile}>

                        <div className="ep2-sub">Identity</div>
                        <div className="ep2-form-row cols2">
                          <Field label="Username" icon="feather-at-sign">
                            <input className="ep2-inp" id="ep2-username" name="username" type="text" value={profile.username} onChange={e => setProfile(p => ({ ...p, username: e.target.value }))} placeholder="e.g. john_doe" autoComplete="off" />
                          </Field>
                          <Field label="Your Role" icon="feather-briefcase">
                            <input className="ep2-inp" id="ep2-role" name="role" type="text" value={profile.role} onChange={e => setProfile(p => ({ ...p, role: e.target.value }))} placeholder="e.g. Property Investor" autoComplete="off" />
                          </Field>
                        </div>

                        <div className="ep2-form-row cols2">
                          <Field label="First Name" icon="feather-user">
                            <input className="ep2-inp" id="ep2-firstname" name="firstName" type="text" value={profile.firstName} onChange={e => setProfile(p => ({ ...p, firstName: e.target.value }))} placeholder="John" autoComplete="off" />
                          </Field>
                          <Field label="Last Name" icon="feather-user">
                            <input className="ep2-inp" id="ep2-lastname" name="lastName" type="text" value={profile.lastName} onChange={e => setProfile(p => ({ ...p, lastName: e.target.value }))} placeholder="Doe" autoComplete="off" />
                          </Field>
                        </div>

                        <div className="ep2-form-row">
                          <Field label="Bio" icon="feather-edit-3">
                            <div style={{ position: 'relative' }}>
                              <textarea className="ep2-tarea" id="ep2-bio" name="bio" value={profile.bio} onChange={e => { setProfile(p => ({ ...p, bio: e.target.value })); setBioLen(e.target.value.length); }} placeholder="Tell the world about yourself — your experience, interests, and goals in real estate..." maxLength={300} />
                              <span className="ep2-char">{bioLen}/300</span>
                            </div>
                          </Field>
                        </div>

                        <div className="ep2-sub">Contact</div>
                        <div className="ep2-form-row cols2">
                          <Field label="Email Address" icon="feather-mail">
                            <input className="ep2-inp" id="ep2-email" name="email" type="email" value={profile.email} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))} placeholder="your@email.com" />
                          </Field>
                          <Field label="Phone Number" icon="feather-phone">
                            <input className="ep2-inp" id="ep2-phone" name="phone" type="text" value={profile.phone} onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))} placeholder="+1 000 000 0000" />
                          </Field>
                        </div>

                        <div className="ep2-sub">Social &amp; Web</div>
                        <div className="ep2-form-row">
                          <Field label="Website URL" icon="feather-globe">
                            <input className="ep2-inp" id="ep2-website" name="website" type="url" value={profile.website} onChange={e => setProfile(p => ({ ...p, website: e.target.value }))} placeholder="https://yoursite.com" />
                          </Field>
                        </div>
                        <div className="ep2-form-row cols2">
                          <Field label="Twitter / X" icon="feather-twitter">
                            <input className="ep2-inp" id="ep2-twitter" name="twitter" type="text" value={profile.twitter} onChange={e => setProfile(p => ({ ...p, twitter: e.target.value }))} placeholder="@yourhandle" />
                          </Field>
                          <Field label="Instagram" icon="feather-instagram">
                            <input className="ep2-inp" id="ep2-instagram" name="instagram" type="text" value={profile.instagram} onChange={e => setProfile(p => ({ ...p, instagram: e.target.value }))} placeholder="@yourhandle" />
                          </Field>
                        </div>

                        <hr className="ep2-divider" />
                        <div className="ep2-btn-row">
                          <button type="button" className="ep2-btn-cancel" onClick={() => { try { const s = localStorage.getItem(key("be_profile")); if (s) setProfile(JSON.parse(s)); } catch (_) { } }}>Discard</button>
                          <button type="submit" className={`ep2-btn-save${profileSaved ? " saved" : ""}`}>{profileSaved ? <><span className="ep2-check">✓ </span>Saved!</> : "Save Changes"}</button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* NOTIFICATIONS TAB */}
                  {activeTab === "notif" && (
                    <div key="notif">
                      <div className="ep2-sec-title">Notification Preferences</div>
                      <p className="ep2-sec-desc">Choose which alerts you'd like to receive. Saved per wallet address.</p>
                      <form onSubmit={saveNotifications}>
                        {[
                          { k: "orderConfirmation", label: "Order Confirmation", icon: "feather-shopping-bag", desc: "Get notified on successful orders" },
                          { k: "newItems", label: "New Listings", icon: "feather-package", desc: "Alert when new properties are listed" },
                          { k: "newBid", label: "New Bid Activity", icon: "feather-trending-up", desc: "Updates on bids placed on your properties" },
                          { k: "paymentCard", label: "Payment Notifications", icon: "feather-credit-card", desc: "Alerts for payment events" },
                          { k: "endingBid", label: "Bid Ending (5 min)", icon: "feather-clock", desc: "Warning before a bid closes" },
                          { k: "approveProduct", label: "Property Approval", icon: "feather-check-circle", desc: "When your listing gets approved" },
                        ].map(({ k, label, desc, icon }, idx) => (
                          <div className={`ep2-notif-row${notifications[k] ? " on" : ""}`} key={k} style={{ animationDelay: `${idx * .05}s` }} onClick={() => setNotifications(p => ({ ...p, [k]: !p[k] }))}>
                            <div className="ep2-notif-ico" style={{ background: notifications[k] ? "linear-gradient(135deg,rgba(112,72,232,.38),rgba(99,179,237,.22))" : "rgba(255,255,255,.05)", border: `1px solid ${notifications[k] ? "rgba(112,72,232,.45)" : "rgba(255,255,255,.07)"}` }}>
                              <i className={icon} style={{ fontSize: 15, color: notifications[k] ? "#a78bfa" : "#4b5563", transition: "color .3s" }} />
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontWeight: 600, color: notifications[k] ? "#c4b5fd" : "#cbd5e1", fontSize: "1.25rem", transition: "color .25s" }}>{label}</div>
                              <div style={{ fontSize: "1.05rem", color: "rgba(255,255,255,.3)", marginTop: 4 }}>{desc}</div>
                            </div>
                            <label className="ep2-toggle" onClick={e => e.stopPropagation()}>
                              <input type="checkbox" checked={notifications[k]} onChange={() => setNotifications(p => ({ ...p, [k]: !p[k] }))} />
                              <span className="ep2-toggle-sl"><span /></span>
                            </label>
                          </div>
                        ))}
                        <hr className="ep2-divider" />
                        <div className="ep2-btn-row">
                          <button type="submit" className={`ep2-btn-save${notifSaved ? " saved" : ""}`}>{notifSaved ? <><span className="ep2-check">✓ </span>Saved!</> : "Save Preferences"}</button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* ACCOUNT SETTINGS TAB */}
                  {activeTab === "account" && (
                    <div key="account">
                      <div className="ep2-sec-title">Account Settings</div>
                      <p className="ep2-sec-desc">Manage your account settings and security options.</p>
                      
                      <div className="ep2-danger-zone">
                        <div className="ep2-danger-title">
                          <i className="feather-alert-triangle" style={{ fontSize: 20 }} />
                          Danger Zone
                        </div>
                        <p className="ep2-danger-desc">
                          Once you delete your account, there is no going back. All your data, including your profile information, listings, and activity history will be permanently removed.
                        </p>
                        <button 
                          type="button" 
                          className="ep2-btn-delete" 
                          onClick={() => setShowDeleteModal(true)}
                        >
                          <i className="feather-trash-2" style={{ marginRight: 8, fontSize: 14 }} />
                          Delete Account
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {showDeleteModal && (
        <div className="ep2-modal-overlay" onClick={() => !isDeleting && setShowDeleteModal(false)}>
          <div className="ep2-modal" onClick={e => e.stopPropagation()}>
            <div className="ep2-modal-title">
              <i className="feather-alert-circle" />
              Delete Account?
            </div>
            <p className="ep2-modal-text">
              This action cannot be undone. Your account and all associated data will be permanently deleted.
            </p>
            <div className="ep2-modal-warning">
              ⚠️ <strong>Warning:</strong> You will lose access to all your properties, saved favorites, and profile information.
            </div>
            <div className="ep2-modal-actions">
              <button 
                className="ep2-modal-cancel" 
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button 
                className={`ep2-modal-delete${isDeleting ? " loading" : ""}`}
                onClick={handleDeleteAccount}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Yes, Delete Account"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfileTwo;
