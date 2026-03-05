import React from "react";

const EditProfileOne = () => {
  return (
    <>
      <style suppressHydrationWarning>{`
        /* ── Keyframes ── */
        @keyframes ep1-fadeSlideDown {
          from { opacity: 0; transform: translateY(-26px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes ep1-fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ep1-shimmerBg {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes ep1-borderGlow {
          0%, 100% { opacity: 0.5; transform: scaleX(0.7); }
          50%       { opacity: 1;   transform: scaleX(1); }
        }
        @keyframes ep1-scanLine {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100vw); }
        }
        @keyframes ep1-iconPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(112,72,232,0.5), 0 0 12px rgba(112,72,232,0.25); }
          50%       { box-shadow: 0 0 0 8px rgba(112,72,232,0), 0 0 28px rgba(112,72,232,0.55); }
        }
        @keyframes ep1-textGlow {
          0%, 100% { filter: drop-shadow(0 0 6px rgba(167,139,250,0.3)); }
          50%       { filter: drop-shadow(0 0 18px rgba(167,139,250,0.7)) drop-shadow(0 0 32px rgba(99,179,237,0.35)); }
        }
        @keyframes ep1-floatOrb {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(30px, -20px) scale(1.08); }
          66%       { transform: translate(-20px, 15px) scale(0.95); }
        }
        @keyframes ep1-particleFade {
          0%   { opacity: 0; transform: translateY(0) scale(0); }
          20%  { opacity: 1; transform: translateY(-8px) scale(1); }
          80%  { opacity: 0.6; }
          100% { opacity: 0; transform: translateY(-40px) scale(0.5); }
        }
        @keyframes ep1-crumbSlide {
          from { opacity: 0; transform: translateX(18px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes ep1-gradShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* ── Banner wrapper ── */
        .ep1-banner {
          position: relative;
          padding: 52px 0 46px;
          overflow: hidden;
          background: linear-gradient(120deg, #0a0a18 0%, #14103a 30%, #0e1c36 60%, #0a0a18 100%);
          background-size: 300% 300%;
          animation: ep1-shimmerBg 10s ease infinite;
        }

        /* Ambient orbs */
        .ep1-orb1, .ep1-orb2, .ep1-orb3 {
          position: absolute; border-radius: 50%; pointer-events: none;
        }
        .ep1-orb1 {
          width: 380px; height: 380px;
          top: -120px; left: -80px;
          background: radial-gradient(circle, rgba(112,72,232,0.22) 0%, transparent 65%);
          animation: ep1-floatOrb 9s ease-in-out infinite;
        }
        .ep1-orb2 {
          width: 280px; height: 280px;
          top: -60px; right: -40px;
          background: radial-gradient(circle, rgba(99,179,237,0.16) 0%, transparent 65%);
          animation: ep1-floatOrb 12s ease-in-out infinite reverse;
        }
        .ep1-orb3 {
          width: 180px; height: 180px;
          bottom: -50px; left: 40%;
          background: radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 65%);
          animation: ep1-floatOrb 7s ease-in-out infinite 2s;
        }

        /* Floating particles */
        .ep1-particle {
          position: absolute; border-radius: 50%; pointer-events: none;
          background: rgba(167,139,250,0.7);
        }
        .ep1-particle:nth-child(1) { width:4px; height:4px; left:12%; bottom:20%; animation: ep1-particleFade 4s ease-in-out infinite 0s; }
        .ep1-particle:nth-child(2) { width:3px; height:3px; left:28%; bottom:30%; animation: ep1-particleFade 5s ease-in-out infinite 0.8s; background:rgba(99,179,237,0.8); }
        .ep1-particle:nth-child(3) { width:5px; height:5px; left:55%; bottom:15%; animation: ep1-particleFade 3.5s ease-in-out infinite 1.5s; }
        .ep1-particle:nth-child(4) { width:3px; height:3px; left:72%; bottom:40%; animation: ep1-particleFade 4.5s ease-in-out infinite 0.3s; background:rgba(196,181,253,0.9); }
        .ep1-particle:nth-child(5) { width:4px; height:4px; left:88%; bottom:25%; animation: ep1-particleFade 6s ease-in-out infinite 1s; background:rgba(99,179,237,0.7); }

        /* Scan line */
        .ep1-scan {
          position: absolute; top: 0; left: 0;
          width: 120px; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(167,139,250,0.07), transparent);
          animation: ep1-scanLine 5s linear infinite;
          pointer-events: none;
        }

        /* Bottom glow line */
        .ep1-glow-line {
          position: absolute;
          bottom: 0; left: 10%; right: 10%;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(112,72,232,0.8), rgba(99,179,237,0.6), rgba(167,139,250,0.8), transparent);
          animation: ep1-borderGlow 3s ease-in-out infinite;
          border-radius: 2px;
        }
        /* Top subtle accent */
        .ep1-top-line {
          position: absolute;
          top: 0; left: 20%; right: 20%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(167,139,250,0.3), transparent);
        }

        /* ── Icon tag ── */
        .ep1-icon-tag {
          display: inline-flex; align-items: center; justify-content: center;
          width: 50px; height: 50px; border-radius: 14px; margin-right: 16px;
          background: linear-gradient(135deg, rgba(112,72,232,0.35), rgba(99,179,237,0.2));
          border: 1px solid rgba(112,72,232,0.5);
          animation: ep1-fadeSlideDown 0.5s cubic-bezier(.22,.68,0,1.2) both,
                     ep1-iconPulse 3s ease-in-out infinite 0.5s;
          flex-shrink: 0;
          position: relative;
        }
        .ep1-icon-tag::after {
          content:"";
          position:absolute; inset:-1px; border-radius:14px;
          background:linear-gradient(135deg,rgba(167,139,250,0.4),rgba(99,179,237,0.2));
          opacity:0;
          transition:opacity 0.3s;
        }
        .ep1-icon-tag:hover::after { opacity:1; }

        /* ── Title ── */
        .ep1-title {
          font-size: 3.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #ffffff 0%, #c4b5fd 40%, #7dd3fc 75%, #a78bfa 100%);
          background-size: 250% 250%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: ep1-fadeSlideDown 0.55s cubic-bezier(.22,.68,0,1.2) both,
                     ep1-textGlow 4s ease-in-out infinite 0.5s,
                     ep1-gradShift 6s ease infinite;
          letter-spacing: -0.5px;
          line-height: 1.2;
        }

        /* ── Breadcrumb ── */
        .ep1-breadcrumb {
          animation: ep1-crumbSlide 0.6s 0.15s cubic-bezier(.22,.68,0,1.2) both;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
        .ep1-breadcrumb .breadcrumb-list {
          list-style: none;
          padding: 7px 20px;
          margin: 0;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 30px;
          backdrop-filter: blur(8px);
          line-height: 1;
        }
        .ep1-breadcrumb .breadcrumb-list li {
          display: inline-flex;
          align-items: center;
          line-height: 1;
        }
        .ep1-breadcrumb .breadcrumb-list li.item a {
          color: #a78bfa;
          text-decoration: none;
          font-size: 1.35rem;
          font-weight: 500;
          line-height: 1;
          transition: color 0.2s, text-shadow 0.2s;
          white-space: nowrap;
        }
        .ep1-breadcrumb .breadcrumb-list li.item a:hover {
          color: #e9d5ff;
          text-shadow: 0 0 12px rgba(167,139,250,0.6);
        }
        .ep1-breadcrumb .breadcrumb-list li.separator {
          color: #4b5563;
          font-size: 0.95rem;
          line-height: 1;
          display: inline-flex;
          align-items: center;
        }
        .ep1-breadcrumb .breadcrumb-list li.item.current {
          color: #cbd5e1;
          font-size: 1.35rem;
          font-weight: 500;
          white-space: nowrap;
          line-height: 1;
        }

        @media (max-width: 767px) {
          .ep1-breadcrumb { justify-content: center; margin-top: 14px; }
          .ep1-title { font-size: 1.6rem; }
        }
      `}</style>

      <div className="ep1-banner">
        {/* Ambient orbs */}
        <div className="ep1-orb1" />
        <div className="ep1-orb2" />
        <div className="ep1-orb3" />
        {/* Particles */}
        <div className="ep1-particle" />
        <div className="ep1-particle" />
        <div className="ep1-particle" />
        <div className="ep1-particle" />
        <div className="ep1-particle" />
        {/* Scan line */}
        <div className="ep1-scan" />
        {/* Edge lines */}
        <div className="ep1-glow-line" />
        <div className="ep1-top-line" />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="row align-items-center">

            <div className="col-lg-6 col-md-6 col-12 d-flex align-items-center">
              <span className="ep1-icon-tag">
                <i className="feather-user" style={{ color: "#c4b5fd", fontSize: "1.75rem" }} />
              </span>
              <h5 className="ep1-title mb-0">Edit Profile</h5>
            </div>

            <div className="col-lg-6 col-md-6 col-12 ep1-breadcrumb">
              <ul className="breadcrumb-list">
                <li className="item">
                  <a href="/">Home</a>
                </li>
                <li className="separator">
                  <i className="feather-chevron-right" />
                </li>
                <li className="item current">Edit Profile</li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfileOne;
