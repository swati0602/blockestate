import React from "react";

const AuthorOne = () => {
  return (
    <div style={{ position: "relative", width: "100%", height: "280px", overflow: "hidden", background: "#080810" }}>
      <style suppressHydrationWarning>{`
        @keyframes meshOrbit {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes shimmer {
          0% { opacity: 0.3; }
          50% { opacity: 0.6; }
          100% { opacity: 0.3; }
        }
      `}</style>

      {/* Mesh Background */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #0d0b1a 0%, #1a1035 40%, #0d1a2e 100%)" }} />

      {/* Animated Orbs */}
      <div style={{
        position: "absolute", top: "-10%", left: "10%", width: "40%", height: "80%",
        background: "radial-gradient(circle, rgba(112,72,232,0.25) 0%, transparent 70%)",
        filter: "blur(60px)", animation: "meshOrbit 15s ease-in-out infinite"
      }} />
      <div style={{
        position: "absolute", bottom: "-10%", right: "10%", width: "45%", height: "90%",
        background: "radial-gradient(circle, rgba(0,217,255,0.15) 0%, transparent 70%)",
        filter: "blur(70px)", animation: "meshOrbit 18s ease-in-out infinite reverse"
      }} />

      {/* Texture overlay */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')",
        opacity: 0.05, pointerEvents: "none"
      }} />

      {/* Glass gradient at bottom */}
      <div style={{
        position: "absolute", bottom: 0, width: "100%", height: "100px",
        background: "linear-gradient(to top, #0d0b1a, transparent)", zIndex: 2
      }} />

      {/* Decorative Dots */}
      <div style={{ position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "8px", zIndex: 3 }}>
        {[...Array(3)].map((_, i) => (
          <div key={i} style={{
            width: i === 1 ? "12px" : "6px", height: "6px", borderRadius: "3px",
            background: i === 1 ? "#7048e8" : "rgba(255,255,255,0.2)",
            boxShadow: i === 1 ? "0 0 10px #7048e8" : "none"
          }} />
        ))}
      </div>
    </div>
  );
};

export default AuthorOne;
