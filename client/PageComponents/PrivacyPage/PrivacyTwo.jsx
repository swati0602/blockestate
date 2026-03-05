import React, { useState } from "react";
import Link from "next/link";

const SECTIONS = [
  { id: "overview",     title: "Overview" },
  { id: "collection",  title: "Information We Collect" },
  { id: "usage",       title: "How We Use Your Data" },
  { id: "blockchain",  title: "Blockchain & Wallet Data" },
  { id: "sharing",     title: "Data Sharing" },
  { id: "security",    title: "Security" },
  { id: "rights",      title: "Your Rights" },
  { id: "contact",     title: "Contact Us" },
];

const Section = ({ id, title, children }) => (
  <div id={id} style={{ marginBottom: "48px" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
      <div style={{ width: "4px", height: "28px", borderRadius: "2px", background: "linear-gradient(180deg, #7048e8, #a78bfa)", flexShrink: 0 }} />
      <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 800, color: "#fff" }}>{title}</h3>
    </div>
    <div style={{ paddingLeft: "16px", borderLeft: "1px solid rgba(112,72,232,0.15)" }}>
      {children}
    </div>
  </div>
);

const P = ({ children }) => (
  <p style={{ margin: "0 0 14px", fontSize: "0.95rem", color: "rgba(200,215,230,0.6)", lineHeight: 1.85 }}>{children}</p>
);

const Li = ({ children }) => (
  <li style={{ fontSize: "0.95rem", color: "rgba(200,215,230,0.6)", lineHeight: 1.85, marginBottom: "8px", paddingLeft: "6px" }}>{children}</li>
);

const PrivacyTwo = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const scrollTo = (id) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{ padding: "56px 0 100px" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "48px", alignItems: "start" }} className="privacy-grid">

          {/* Sticky TOC sidebar */}
          <div style={{ position: "sticky", top: "100px" }}>
            <p style={{ margin: "0 0 14px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>Contents</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              {SECTIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  style={{ display: "block", width: "100%", textAlign: "left", background: activeSection === s.id ? "rgba(112,72,232,0.15)" : "transparent", border: "none", borderLeft: `2px solid ${activeSection === s.id ? "#7048e8" : "transparent"}`, borderRadius: "0 8px 8px 0", padding: "8px 14px", fontSize: "13px", color: activeSection === s.id ? "#a78bfa" : "rgba(255,255,255,0.4)", fontWeight: activeSection === s.id ? 700 : 400, cursor: "pointer", transition: "all 0.2s" }}
                  onMouseEnter={(e) => { if (activeSection !== s.id) e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
                  onMouseLeave={(e) => { if (activeSection !== s.id) e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
                >
                  {s.title}
                </button>
              ))}
            </div>

            <div style={{ marginTop: "32px", background: "rgba(0,255,163,0.05)", border: "1px solid rgba(0,255,163,0.2)", borderRadius: "12px", padding: "16px" }}>
              <p style={{ margin: "0 0 6px", fontSize: "11px", fontWeight: 700, color: "#00FFA3", textTransform: "uppercase", letterSpacing: "0.06em" }}>Questions?</p>
              <p style={{ margin: "0 0 10px", fontSize: "12px", color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>Reach out anytime about your data rights.</p>
              <Link href="/contact" legacyBehavior>
                <a style={{ fontSize: "12px", fontWeight: 600, color: "#00FFA3", textDecoration: "none" }}>Contact us</a>
              </Link>
            </div>
          </div>

          {/* Main content */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "20px", padding: "40px 44px" }}>

            <Section id="overview" title="Overview">
              <P>Welcome to BlockEstate. We are committed to protecting your personal information and your right to privacy. This Privacy Policy describes how BlockEstate collects, uses, and shares information about you when you use our platform to buy, sell, and manage tokenized real estate on the blockchain.</P>
              <P>By accessing or using our services, you agree to the collection and use of information as described in this policy. If you do not agree, please discontinue use of our platform.</P>
            </Section>

            <Section id="collection" title="Information We Collect">
              <P>We collect information you provide directly and information collected automatically when you use our services:</P>
              <ul style={{ paddingLeft: "20px", margin: "0 0 14px" }}>
                <Li><strong style={{ color: "#fff" }}>Account data</strong> — name, email address, and profile information you provide during registration.</Li>
                <Li><strong style={{ color: "#fff" }}>Wallet address</strong> — your public Ethereum wallet address used to interact with our smart contracts.</Li>
                <Li><strong style={{ color: "#fff" }}>Property data</strong> — documents, images, descriptions, and metadata submitted when listing a property.</Li>
                <Li><strong style={{ color: "#fff" }}>Usage data</strong> — pages visited, features used, search queries, and interaction logs.</Li>
                <Li><strong style={{ color: "#fff" }}>Device data</strong> — browser type, IP address, operating system, and referring URLs.</Li>
              </ul>
              <P>We do not collect private keys or seed phrases. You are solely responsible for the security of your wallet credentials.</P>
            </Section>

            <Section id="usage" title="How We Use Your Data">
              <P>We use the data we collect to:</P>
              <ul style={{ paddingLeft: "20px", margin: "0 0 14px" }}>
                <Li>Provide, maintain, and improve the BlockEstate platform and smart contract services.</Li>
                <Li>Process property listings, sales, and on-chain ownership transfers.</Li>
                <Li>Send transactional emails, platform updates, and newsletters (with your consent).</Li>
                <Li>Prevent fraud, abuse, and illegal activity on the platform.</Li>
                <Li>Comply with applicable legal obligations and regulatory requirements.</Li>
              </ul>
              <P>We will never sell your personal data to third parties for advertising purposes.</P>
            </Section>

            <Section id="blockchain" title="Blockchain & Wallet Data">
              <P>BlockEstate operates on the Ethereum blockchain. When you create a listing, purchase a property, or sign a transaction, your wallet address and transaction data are permanently recorded on the public blockchain. This data is immutable and visible to anyone.</P>
              <P>We have no ability to delete or modify on-chain records. By using BlockEstate, you acknowledge that transactions are irreversible and that blockchain data is inherently public.</P>
              <P>We only store your wallet address; we never have access to your private keys, recovery phrases, or control over your funds.</P>
            </Section>

            <Section id="sharing" title="Data Sharing">
              <P>We do not sell your personal information. We may share data with:</P>
              <ul style={{ paddingLeft: "20px", margin: "0 0 14px" }}>
                <Li><strong style={{ color: "#fff" }}>Service providers</strong> — trusted third parties such as hosting, analytics, and email delivery that process data on our behalf.</Li>
                <Li><strong style={{ color: "#fff" }}>Legal authorities</strong> — when required by law, court order, or to protect the rights and safety of our users.</Li>
                <Li><strong style={{ color: "#fff" }}>Business transfers</strong> — in the event of a merger, acquisition, or sale of assets, your data may be transferred as part of that transaction.</Li>
              </ul>
              <P>All third-party partners are contractually obligated to handle your data in accordance with this policy.</P>
            </Section>

            <Section id="security" title="Security">
              <P>We implement industry-standard security measures to protect your data, including TLS encryption in transit, secure server infrastructure, and access controls limiting who can view your information.</P>
              <P>However, no system is 100% secure. We encourage you to use a strong password, enable two-factor authentication where available, and keep your wallet recovery phrase offline and private.</P>
              <P>In the event of a data breach affecting your personal information, we will notify you promptly in accordance with applicable laws.</P>
            </Section>

            <Section id="rights" title="Your Rights">
              <P>Depending on your location, you may have the following rights regarding your personal data:</P>
              <ul style={{ paddingLeft: "20px", margin: "0 0 14px" }}>
                <Li><strong style={{ color: "#fff" }}>Access</strong> — request a copy of the personal data we hold about you.</Li>
                <Li><strong style={{ color: "#fff" }}>Correction</strong> — request that inaccurate data be corrected.</Li>
                <Li><strong style={{ color: "#fff" }}>Deletion</strong> — request deletion of your off-chain personal data (note: on-chain data cannot be deleted).</Li>
                <Li><strong style={{ color: "#fff" }}>Opt-out</strong> — unsubscribe from marketing communications at any time.</Li>
                <Li><strong style={{ color: "#fff" }}>Portability</strong> — request a machine-readable export of your data.</Li>
              </ul>
              <P>To exercise any of these rights, contact us at privacy@blockestate.io.</P>
            </Section>

            <Section id="contact" title="Contact Us">
              <P>If you have any questions, concerns, or requests regarding this Privacy Policy, please reach out:</P>
              <div style={{ background: "rgba(112,72,232,0.08)", border: "1px solid rgba(112,72,232,0.2)", borderRadius: "12px", padding: "20px 24px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "rgba(255,255,255,0.6)" }}><span style={{ color: "#a78bfa", fontWeight: 600 }}>Email:</span> privacy@blockestate.io</p>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "rgba(255,255,255,0.6)" }}><span style={{ color: "#a78bfa", fontWeight: 600 }}>Address:</span> BlockEstate Technologies, Mumbai, India</p>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "rgba(255,255,255,0.6)" }}><span style={{ color: "#a78bfa", fontWeight: 600 }}>Response time:</span> Within 5 business days</p>
              </div>
            </Section>

          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .privacy-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default PrivacyTwo;
