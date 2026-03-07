import React from "react";
import Link from "next/link";

//INTERNAL IMPORT
import { Header, Footer, Copyright } from "../PageComponents/Components";

const pageNotFound = () => {
  return (
    <div className="template-color-1 nft-body-connect">
      <Header />
      <div className="not-found-section" style={styles.section}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div style={styles.wrapper}>
                {/* Animated 404 Illustration */}
                <div style={styles.illustrationContainer}>
                  <svg
                    width="300"
                    height="300"
                    viewBox="0 0 300 300"
                    style={styles.svg}
                  >
                    {/* House outline */}
                    <g style={styles.houseGroup}>
                      <path
                        d="M150 40 L240 100 L240 240 L60 240 L60 100 Z"
                        stroke="url(#gradient1)"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* Roof */}
                      <path
                        d="M150 40 L100 85 L200 85 Z"
                        stroke="url(#gradient2)"
                        strokeWidth="3"
                        fill="none"
                        opacity="0.7"
                      />
                      {/* Door */}
                      <rect x="135" y="200" width="30" height="40" stroke="url(#gradient1)" strokeWidth="2" fill="none" />
                      {/* Windows */}
                      <rect x="85" y="130" width="25" height="25" stroke="url(#gradient1)" strokeWidth="2" fill="none" opacity="0.6" />
                      <rect x="190" y="130" width="25" height="25" stroke="url(#gradient1)" strokeWidth="2" fill="none" opacity="0.6" />
                    </g>

                    {/* Question mark */}
                    <g style={styles.questionMark} opacity="0.3">
                      <text x="235" y="80" fontSize="60" fontWeight="bold" fill="url(#gradient1)">
                        ?
                      </text>
                    </g>

                    <defs>
                      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0066ff" />
                        <stop offset="100%" stopColor="#0099ff" />
                      </linearGradient>
                      <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00d9ff" />
                        <stop offset="100%" stopColor="#0066ff" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Error Code */}
                <h1 style={styles.errorCode}>404</h1>

                {/* Main Heading */}
                <h2 style={styles.mainHeading}>Oops! Page Not Found</h2>

                {/* Description */}
                <p style={styles.description}>
                  Sorry, the page you're looking for doesn't exist or has moved.
                  <br />
                  Let's help you find what you're looking for.
                </p>

                {/* Action Buttons */}
                <div style={styles.buttonsContainer}>
                  <Link href="/" style={{ ...styles.btn, ...styles.btnPrimary }}>
                    <span style={styles.btnContent}>
                      <span style={styles.btnIcon}>🏠</span>
                      Back to Home
                    </span>
                  </Link>
                  <Link href="/explor" style={{ ...styles.btn, ...styles.btnSecondary }}>
                    <span style={styles.btnContent}>
                      <span style={styles.btnIcon}>🔍</span>
                      Browse Properties
                    </span>
                  </Link>
                </div>

                {/* Suggested Links */}
                <div style={styles.suggestedSection}>
                  <p style={styles.suggestedLabel}>Need help? Try these:</p>
                  <div style={styles.suggestedGrid}>
                    <Link href="/explor" style={styles.suggestedLink}>
                      <span style={styles.linkIcon}>🏢</span>
                      <span>Explore Properties</span>
                    </Link>
                    <Link href="/about" style={styles.suggestedLink}>
                      <span style={styles.linkIcon}>ℹ️</span>
                      <span>About Us</span>
                    </Link>
                    <Link href="/contact" style={styles.suggestedLink}>
                      <span style={styles.linkIcon}>💬</span>
                      <span>Contact Support</span>
                    </Link>
                    <Link href="/blog" style={styles.suggestedLink}>
                      <span style={styles.linkIcon}>📰</span>
                      <span>Read Blog</span>
                    </Link>
                  </div>
                </div>

                {/* Footer Message */}
                <div style={styles.footerMessage}>
                  <p>Can't find what you need? <a href="mailto:support@blockestate.com" style={styles.emailLink}>Contact our support team</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Copyright />
    </div>
  );
};

const styles = {
  section: {
    minHeight: "70vh",
    display: "flex",
    alignItems: "center",
    padding: "80px 20px",
    background: "linear-gradient(135deg, #0a0a14 0%, #0f0f1a 100%)",
  },
  wrapper: {
    textAlign: "center",
    maxWidth: "700px",
    margin: "0 auto",
    animation: "fadeInUp 0.8s ease-out",
  },
  illustrationContainer: {
    marginBottom: "40px",
    animation: "float 3s ease-in-out infinite",
  },
  svg: {
    margin: "0 auto",
    display: "block",
    filter: "drop-shadow(0 20px 40px rgba(0, 102, 255, 0.15))",
  },
  houseGroup: {
    animation: "glow 2s ease-in-out infinite",
  },
  questionMark: {
    animation: "pulse 1.5s ease-in-out infinite",
  },
  errorCode: {
    fontSize: "clamp(48px, 12vw, 120px)",
    fontWeight: "900",
    background: "linear-gradient(135deg, #0066ff 0%, #00d9ff 100%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    margin: "0 0 15px 0",
    letterSpacing: "-2px",
  },
  mainHeading: {
    fontSize: "clamp(24px, 5vw, 40px)",
    fontWeight: "700",
    color: "#e8e9f3",
    marginBottom: "15px",
  },
  description: {
    fontSize: "16px",
    color: "#a0a0b0",
    marginBottom: "40px",
    lineHeight: "1.7",
    fontWeight: "400",
  },
  buttonsContainer: {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
    marginBottom: "60px",
    flexWrap: "wrap",
  },
  btn: {
    display: "inline-flex",
    alignItems: "center",
    padding: "16px 32px",
    fontSize: "15px",
    fontWeight: "600",
    borderRadius: "10px",
    textDecoration: "none",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    border: "none",
    cursor: "pointer",
  },
  btnPrimary: {
    background: "linear-gradient(135deg, #0066ff 0%, #0099ff 100%)",
    color: "#fff",
    boxShadow: "0 10px 30px rgba(0, 102, 255, 0.3)",
  },
  btnSecondary: {
    background: "transparent",
    color: "#00d9ff",
    border: "2px solid #00d9ff",
    boxShadow: "0 4px 15px rgba(0, 217, 255, 0.15)",
  },
  btnContent: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  btnIcon: {
    fontSize: "18px",
  },
  suggestedSection: {
    paddingTop: "50px",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    marginTop: "50px",
  },
  suggestedLabel: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#7a7a8e",
    textTransform: "uppercase",
    letterSpacing: "1.2px",
    marginBottom: "25px",
  },
  suggestedGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: "12px",
  },
  suggestedLink: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px 15px",
    color: "#00d9ff",
    textDecoration: "none",
    borderRadius: "10px",
    transition: "all 0.3s ease",
    border: "1px solid rgba(0, 217, 255, 0.2)",
    fontSize: "14px",
    fontWeight: "500",
    background: "rgba(0, 217, 255, 0.05)",
  },
  linkIcon: {
    fontSize: "28px",
    marginBottom: "8px",
  },
  footerMessage: {
    marginTop: "50px",
    fontSize: "14px",
    color: "#a0a0b0",
  },
  emailLink: {
    color: "#00d9ff",
    textDecoration: "none",
    fontWeight: "600",
    transition: "color 0.3s ease",
  },
};

export default pageNotFound;
