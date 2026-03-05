import React, { useState } from "react";

const TOPICS = [
  "General Inquiry",
  "Property Listing Help",
  "Buying a Property",
  "Smart Contract Issue",
  "Wallet / Connection Problem",
  "Partnership Opportunity",
  "Other",
];

const INIT = { name: "", email: "", wallet: "", topic: "", message: "", terms: false };

const inputStyle = {
  width: "100%",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "10px",
  padding: "12px 16px",
  color: "#fff",
  fontSize: "1.05rem",
  outline: "none",
  transition: "border-color 0.2s",
};

const ContactThree = () => {
  const [form, setForm] = useState(INIT);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState("");

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!form.email.includes("@")) errs.email = "Enter a valid email.";
    if (!form.topic) errs.topic = "Please select a topic.";
    if (!form.message.trim()) errs.message = "Message is required.";
    if (!form.terms) errs.terms = "You must accept the terms.";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    setErrors({ ...errors, [name]: undefined });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => { setSubmitted(true); setLoading(false); setForm(INIT); }, 1200);
  };

  if (submitted)
    return (
      <div style={{ padding: "60px 0 80px", textAlign: "center" }}>
        <div style={{
          display: "inline-flex", flexDirection: "column", alignItems: "center", gap: "16px",
          background: "rgba(0,255,163,0.05)", border: "1px solid rgba(0,255,163,0.25)",
          borderRadius: "20px", padding: "48px 56px",
        }}>
          <div style={{ fontSize: "3rem" }}>✅</div>
          <h3 style={{ margin: 0, color: "#fff", fontWeight: 800, fontSize: "1.85rem" }}>Message Sent!</h3>
          <p style={{ margin: 0, color: "rgba(200,220,230,0.5)", maxWidth: "320px" }}>
            We&rsquo;ll get back to you at <strong style={{ color: "#00FFA3" }}>{form.email || "your email"}</strong>.
          </p>
          <button onClick={() => setSubmitted(false)} style={{
            marginTop: "8px", padding: "10px 28px", borderRadius: "50px",
            border: "1px solid rgba(0,255,163,0.4)", background: "rgba(0,255,163,0.08)",
            color: "#00FFA3", fontWeight: 600, cursor: "pointer", fontSize: "1.02rem",
          }}>Send Another</button>
        </div>
      </div>
    );

  const field = (name, label, type = "text") => (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label style={{ fontSize: "0.93rem", fontWeight: 600, color: "rgba(200,215,230,0.55)", letterSpacing: "0.05em", textTransform: "uppercase" }}>{label}</label>
      <input
        type={type}
        name={name}
        value={form[name]}
        onChange={handleChange}
        onFocus={() => setFocused(name)}
        onBlur={() => setFocused("")}
        style={{ ...inputStyle, borderColor: errors[name] ? "#f87171" : focused === name ? "rgba(112,72,232,0.7)" : "rgba(255,255,255,0.1)" }}
        placeholder={label}
      />
      {errors[name] && <span style={{ fontSize: "0.9rem", color: "#f87171" }}>{errors[name]}</span>}
    </div>
  );

  return (
    <div style={{ paddingBottom: "72px" }}>
      <div className="container">
        <div className="row g-5 align-items-start">

          {/* LEFT */}
          <div className="col-lg-4">
            <div style={{ position: "sticky", top: "100px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(112,72,232,0.1)", border: "1px solid rgba(112,72,232,0.3)", borderRadius: "50px", padding: "4px 14px", marginBottom: "16px" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#7048e8", display: "inline-block" }} />
                <span style={{ fontSize: "0.93rem", fontWeight: 700, color: "#9d7cf4", letterSpacing: "0.08em", textTransform: "uppercase" }}>Say Hello</span>
              </div>

              <h2 style={{
                fontSize: "clamp(2rem, 3.5vw, 2.7rem)", fontWeight: 800, margin: "0 0 14px",
                background: "linear-gradient(135deg, #fff 30%, #7048e8 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>Get in Touch</h2>

              <p style={{ color: "rgba(200,215,230,0.5)", fontSize: "1.15rem", lineHeight: 1.7, margin: "0 0 28px" }}>
                Fill out the form and our team will respond within 24 hours. You can also reach us directly on Discord or email.
              </p>

              {/* Quick facts */}
              {[
                { icon: "⚡", text: "Response under 24h" },
                { icon: "🔒", text: "No data sold, ever" },
                { icon: "🌐", text: "Global support" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <span style={{ fontSize: "1.4rem" }}>{item.icon}</span>
                  <span style={{ color: "rgba(200,215,230,0.55)", fontSize: "1.1rem" }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — FORM */}
          <div className="col-lg-8">
            <div style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "20px",
              padding: "36px 32px",
            }}>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

                {/* Name + Email row */}
                <div className="row g-3">
                  <div className="col-md-6">{field("name", "Full Name")}</div>
                  <div className="col-md-6">{field("email", "Email Address", "email")}</div>
                </div>

                {/* Wallet */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "rgba(200,215,230,0.55)", letterSpacing: "0.05em", textTransform: "uppercase" }}>Wallet Address (optional)</label>
                  <input
                    name="wallet"
                    value={form.wallet}
                    onChange={handleChange}
                    onFocus={() => setFocused("wallet")}
                    onBlur={() => setFocused("")}
                    placeholder="0x..."
                    style={{ ...inputStyle, fontFamily: "monospace", fontSize: "0.88rem", borderColor: focused === "wallet" ? "rgba(112,72,232,0.7)" : "rgba(255,255,255,0.1)" }}
                  />
                </div>

                {/* Topic */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "rgba(200,215,230,0.55)", letterSpacing: "0.05em", textTransform: "uppercase" }}>Topic</label>
                  <select
                    name="topic"
                    value={form.topic}
                    onChange={handleChange}
                    style={{ ...inputStyle, borderColor: errors.topic ? "#f87171" : "rgba(255,255,255,0.1)", appearance: "none", cursor: "pointer" }}
                  >
                    <option value="" style={{ background: "#1a1a2e" }}>Select a topic...</option>
                    {TOPICS.map((t) => <option key={t} value={t} style={{ background: "#1a1a2e" }}>{t}</option>)}
                  </select>
                  {errors.topic && <span style={{ fontSize: "0.78rem", color: "#f87171" }}>{errors.topic}</span>}
                </div>

                {/* Message */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "rgba(200,215,230,0.55)", letterSpacing: "0.05em", textTransform: "uppercase" }}>Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused("")}
                    rows={5}
                    placeholder="Tell us what you need..."
                    style={{ ...inputStyle, resize: "vertical", borderColor: errors.message ? "#f87171" : focused === "message" ? "rgba(112,72,232,0.7)" : "rgba(255,255,255,0.1)" }}
                  />
                  {errors.message && <span style={{ fontSize: "0.78rem", color: "#f87171" }}>{errors.message}</span>}
                </div>

                {/* Terms */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <input
                    type="checkbox"
                    name="terms"
                    id="terms"
                    checked={form.terms}
                    onChange={handleChange}
                    style={{ marginTop: "3px", accentColor: "#7048e8", width: 16, height: 16, cursor: "pointer", flexShrink: 0 }}
                  />
                  <label htmlFor="terms" style={{ fontSize: "0.88rem", color: "rgba(200,215,230,0.5)", lineHeight: 1.5, cursor: "pointer" }}>
                    I agree to the <a href="/terms-condition" style={{ color: "#9d7cf4", textDecoration: "none" }}>Terms of Service</a> and <a href="/privacy" style={{ color: "#9d7cf4", textDecoration: "none" }}>Privacy Policy</a>.
                  </label>
                </div>
                {errors.terms && <span style={{ fontSize: "0.78rem", color: "#f87171", marginTop: "-14px" }}>{errors.terms}</span>}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    alignSelf: "center",
                    width: "fit-content",
                    padding: "13px 40px",
                    borderRadius: "50px",
                    border: "none",
                    background: loading ? "rgba(112,72,232,0.4)" : "linear-gradient(135deg, #7048e8 0%, #4f9cf9 100%)",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    cursor: loading ? "not-allowed" : "pointer",
                    boxShadow: loading ? "none" : "0 6px 20px rgba(112,72,232,0.45)",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                  onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(112,72,232,0.6)"; }}}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(112,72,232,0.45)"; }}
                >
                  {loading ? (
                    <><span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }}></span> Sending...</>
                  ) : (
                    <>Send Message <span style={{ fontSize: "1.1rem" }}>→</span></>
                  )}
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactThree;