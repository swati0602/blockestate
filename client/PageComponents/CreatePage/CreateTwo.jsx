import React, { useState } from "react";
import { ethers } from "ethers";
import axios from "axios";

import { Loader } from "../Components";
import { CreateThree } from ".";
import { useStateContext } from "../../context";

const CATEGORIES = ["Housing", "Rental", "Farmhouse", "Office", "Commercial", "Country"];
const MAX_IMAGES = 8;

// ─── Shared styles ────────────────────────────────────────────────
const glassCard = {
  background: "rgba(255,255,255,0.025)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: "16px",
  padding: "28px 24px",
};

const labelStyle = {
  fontSize: "0.78rem", fontWeight: 700,
  color: "rgba(200,215,230,0.55)",
  letterSpacing: "0.08em", textTransform: "uppercase",
  marginBottom: "8px", display: "block",
};

const makeInputStyle = (hasError, focused) => ({
  width: "100%",
  background: "rgba(255,255,255,0.04)",
  border: `1px solid ${hasError ? "#f87171" : focused ? "rgba(112,72,232,0.7)" : "rgba(255,255,255,0.1)"}`,
  borderRadius: "10px",
  padding: "11px 15px",
  color: "#fff",
  fontSize: "0.93rem",
  outline: "none",
  transition: "border-color 0.2s",
});

const errStyle = { fontSize: "0.78rem", color: "#f87171", marginTop: "4px" };

const sectionHead = (label, color = "#7048e8") => (
  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
    <div style={{ width: 3, height: 20, borderRadius: 2, background: color }} />
    <span style={{ fontSize: "1rem", fontWeight: 700, color: "#fff" }}>{label}</span>
  </div>
);

// ─── Field component ──────────────────────────────────────────────
const Field = ({ label, error, children }) => (
  <div style={{ display: "flex", flexDirection: "column", marginBottom: "18px" }}>
    {label && <label style={labelStyle}>{label}</label>}
    {children}
    {error && <span style={errStyle}>{error}</span>}
  </div>
);

const CreateTwo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageSlots, setImageSlots] = useState([]);
  const [focused, setFocused] = useState("");
  const { createPropertyFunction } = useStateContext();

  const [form, setForm] = useState({
    propertyTitle: "",
    description: "",
    category: "",
    price: "",
    rentalPrice: "",
    images: "",
    propertyAddress: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    isExplicit: false,
  });

  const [errors, setErrors] = useState({});

  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.propertyTitle.trim()) e.propertyTitle = "Property title is required.";
    if (!form.category) e.category = "Please select a category.";
    if (!form.description.trim()) e.description = "Description is required.";
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) e.price = "Enter a valid price > 0.";
    if (!form.propertyAddress.trim()) e.propertyAddress = "Street address is required.";
    if (!form.city.trim()) e.city = "City is required.";
    if (!form.country.trim()) e.country = "Country is required.";
    if (form.bedrooms === "" || isNaN(form.bedrooms) || Number(form.bedrooms) < 0) e.bedrooms = "Enter bedrooms.";
    if (form.bathrooms === "" || isNaN(form.bathrooms) || Number(form.bathrooms) < 0) e.bathrooms = "Enter bathrooms.";
    if (!form.sqft || isNaN(form.sqft) || Number(form.sqft) <= 0) e.sqft = "Enter area in sq.ft.";
    const done = imageSlots.filter((s) => s.status === "done");
    const pending = imageSlots.filter((s) => s.status === "pending");
    if (done.length === 0) e.images = "Upload at least one property image.";
    else if (pending.length > 0) e.images = "Some images are selected but not uploaded yet.";
    return e;
  };

  const handleSubmit = async () => {
    const ve = validate();
    if (Object.keys(ve).length > 0) {
      setErrors(ve);
      const first = document.getElementById(Object.keys(ve)[0]);
      if (first) first.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setIsLoading(true);
    try {
      const doneUrls = imageSlots.filter((s) => s.status === "done").map((s) => s.ipfsUrl);
      const primaryImage = doneUrls[0];
      const extraImages = doneUrls.slice(1);
      const detailsSuffix = `\n---\nBedrooms: ${form.bedrooms} | Bathrooms: ${form.bathrooms} | Area: ${form.sqft} sq.ft`;
      const extraSuffix = extraImages.length > 0 ? `\n||EXTRA_IMAGES:${extraImages.join(",")}` : "";
      const locationSuffix = `\n||LOCATION:${form.city},${form.state},${form.country},${form.zipCode}`;
      const rentalSuffix = form.rentalPrice ? `\n||RENTAL:${form.rentalPrice}` : "";
      const combinedDescription = form.description + detailsSuffix + extraSuffix + locationSuffix + rentalSuffix;
      await createPropertyFunction({
        ...form,
        images: primaryImage,
        description: combinedDescription,
        price: ethers.utils.parseUnits(form.price.toString().trim(), 18),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // ── Image upload handlers ───────────────────────────────────────
  const handlePickImages = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    const remaining = MAX_IMAGES - imageSlots.length;
    const toAdd = files.slice(0, remaining).map((f) => ({
      id: Date.now() + Math.random(),
      file: f,
      localUrl: URL.createObjectURL(f),
      ipfsUrl: "",
      status: "pending",
    }));
    setImageSlots((prev) => [...prev, ...toAdd]);
    setErrors((prev) => ({ ...prev, images: "" }));
    e.target.value = "";
  };

  const uploadSlot = async (id) => {
    const slot = imageSlots.find((s) => s.id === id);
    if (!slot || slot.status === "done" || slot.status === "uploading") return;
    setImageSlots((prev) => prev.map((s) => s.id === id ? { ...s, status: "uploading" } : s));
    try {
      const fd = new FormData();
      fd.append("file", slot.file);
      const res = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: fd,
        headers: {
          pinata_api_key: `2d780626fec955e1b3fc`,
          pinata_secret_api_key: `5b404c65d0cd8a679de45027045eb59b50036991768e2ff573ff2610f92d20bf`,
          "Content-Type": "multipart/form-data",
        },
      });
      const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
      setImageSlots((prev) => {
        const next = prev.map((s) => s.id === id ? { ...s, status: "done", ipfsUrl } : s);
        const first = next.find((s) => s.status === "done");
        if (first) setForm((f) => ({ ...f, images: first.ipfsUrl }));
        return next;
      });
    } catch {
      setImageSlots((prev) => prev.map((s) => s.id === id ? { ...s, status: "error" } : s));
    }
  };

  const removeSlot = (id) => {
    setImageSlots((prev) => {
      const next = prev.filter((s) => s.id !== id);
      const first = next.find((s) => s.status === "done");
      setForm((f) => ({ ...f, images: first ? first.ipfsUrl : "" }));
      return next;
    });
  };

  // ── Input helpers ───────────────────────────────────────────────
  const inp = (key, placeholder, type = "text", extra = {}) => (
    <input
      id={key}
      type={type}
      placeholder={placeholder}
      value={form[key]}
      onChange={(e) => set(key, e.target.value)}
      onFocus={() => setFocused(key)}
      onBlur={() => setFocused("")}
      style={makeInputStyle(!!errors[key], focused === key)}
      {...extra}
    />
  );

  const uploadedCount = imageSlots.filter((s) => s.status === "done").length;
  const pendingCount = imageSlots.filter((s) => s.status === "pending").length;

  return (
    <>
      <div style={{ paddingBottom: "80px" }}>
        <div className="container">
          <div className="row g-4">

            {/* ── LEFT: Image Upload ───────────────────────────── */}
            <div className="col-lg-4">
              <div style={{ ...glassCard, position: "sticky", top: "90px" }}>
                {sectionHead("Property Images", "#00FFA3")}

                {/* Image grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "12px" }}>
                  {imageSlots.map((slot, idx) => (
                    <div key={slot.id} style={{
                      position: "relative", borderRadius: "8px", overflow: "hidden",
                      border: slot.status === "error" ? "2px solid #f87171"
                        : slot.status === "done" ? "2px solid #00FFA3"
                        : "2px solid rgba(255,255,255,0.1)",
                    }}>
                      <img src={slot.localUrl} alt={`img-${idx}`} style={{ width: "100%", height: "86px", objectFit: "cover", display: "block" }} />
                      {idx === 0 && (
                        <span style={{ position: "absolute", top: 4, left: 4, background: "rgba(0,0,0,0.75)", color: "#fbbf24", fontSize: "0.68rem", padding: "2px 6px", borderRadius: "4px", fontWeight: 700 }}>COVER</span>
                      )}
                      {slot.status === "done" && (
                        <span style={{ position: "absolute", top: 4, right: 20, background: "#00FFA3", color: "#000", fontSize: "0.68rem", padding: "2px 5px", borderRadius: "4px", fontWeight: 700 }}>✓</span>
                      )}
                      <button type="button" onClick={() => removeSlot(slot.id)} style={{
                        position: "absolute", top: 3, right: 3, background: "rgba(0,0,0,0.7)",
                        border: "none", color: "#fff", borderRadius: "50%", width: 16, height: 16,
                        cursor: "pointer", fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center", padding: 0,
                      }}>✕</button>
                      {slot.status !== "done" && (
                        <button type="button" onClick={() => uploadSlot(slot.id)} disabled={slot.status === "uploading"} style={{
                          width: "100%", padding: "4px 0", fontSize: "0.72rem", fontWeight: 600,
                          background: slot.status === "error" ? "rgba(248,113,113,0.2)" : slot.status === "uploading" ? "rgba(255,255,255,0.05)" : "rgba(112,72,232,0.25)",
                          color: slot.status === "error" ? "#f87171" : slot.status === "uploading" ? "rgba(255,255,255,0.4)" : "#c4b5fd",
                          border: "none", cursor: slot.status === "uploading" ? "not-allowed" : "pointer",
                        }}>
                          {slot.status === "uploading" ? "Uploading…" : slot.status === "error" ? "Retry" : "Upload"}
                        </button>
                      )}
                    </div>
                  ))}

                  {/* Add slot */}
                  {imageSlots.length < MAX_IMAGES && (
                    <label htmlFor="multiImagePicker" style={{
                      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                      height: 86, border: errors.images ? "2px dashed #f87171" : "2px dashed rgba(255,255,255,0.12)",
                      borderRadius: 8, background: "rgba(255,255,255,0.02)", cursor: "pointer", gap: 6,
                      color: "rgba(255,255,255,0.3)", fontSize: "0.78rem", transition: "border-color 0.2s",
                    }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                      </svg>
                      Add Photo
                    </label>
                  )}
                </div>

                <input id="multiImagePicker" type="file" accept="image/*" multiple style={{ display: "none" }} onChange={handlePickImages} />

                {pendingCount > 0 && (
                  <button type="button" onClick={() => imageSlots.filter((s) => s.status === "pending").forEach((s) => uploadSlot(s.id))} style={{
                    width: "100%", padding: "10px", borderRadius: "8px", border: "none",
                    background: "linear-gradient(135deg, #7048e8, #4f9cf9)", color: "#fff",
                    fontWeight: 700, fontSize: "0.88rem", cursor: "pointer", marginBottom: "8px",
                  }}>
                    Upload All to IPFS ({pendingCount})
                  </button>
                )}

                {imageSlots.length > 0 && (
                  <p style={{ fontSize: "0.8rem", color: "rgba(200,215,230,0.4)", textAlign: "center", margin: "6px 0 0" }}>
                    {uploadedCount} / {imageSlots.length} uploaded · up to {MAX_IMAGES} images
                  </p>
                )}
                {errors.images && <p style={errStyle}>{errors.images}</p>}

                {/* Tips */}
                <div style={{ marginTop: "20px", padding: "14px 16px", background: "rgba(112,72,232,0.07)", borderRadius: "10px", border: "1px solid rgba(112,72,232,0.15)" }}>
                  <p style={{ margin: "0 0 8px", fontSize: "0.78rem", fontWeight: 700, color: "#9d7cf4", textTransform: "uppercase", letterSpacing: "0.07em" }}>Tips</p>
                  {["Use high-res landscape photos", "First image becomes the cover", "IPFS storage is permanent"].map((t, i) => (
                    <p key={i} style={{ margin: "4px 0", fontSize: "0.82rem", color: "rgba(200,215,230,0.45)", display: "flex", gap: 6 }}>
                      <span style={{ color: "#7048e8" }}>›</span> {t}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT: Form ──────────────────────────────────── */}
            <div className="col-lg-8">

              {/* ── Section 1: Basic Info ── */}
              <div style={{ ...glassCard, marginBottom: "20px" }}>
                {sectionHead("Basic Information")}
                <div className="row g-3">
                  <div className="col-12">
                    <Field label="Property Title *" error={errors.propertyTitle}>
                      {inp("propertyTitle", "e.g. Modern 3-BHK Apartment in Downtown")}
                    </Field>
                  </div>
                  <div className="col-md-6">
                    <Field label="Category *" error={errors.category}>
                      <select
                        id="category"
                        value={form.category}
                        onChange={(e) => set("category", e.target.value)}
                        style={{ ...makeInputStyle(!!errors.category, focused === "category"), appearance: "none", cursor: "pointer" }}
                        onFocus={() => setFocused("category")}
                        onBlur={() => setFocused("")}
                      >
                        <option value="" style={{ background: "#1a1a2e" }}>Select category…</option>
                        {CATEGORIES.map((c) => <option key={c} value={c} style={{ background: "#1a1a2e" }}>{c}</option>)}
                      </select>
                    </Field>
                  </div>
                  <div className="col-md-6">
                    <Field label="Price (ETH) *" error={errors.price}>
                      {inp("price", "e.g. 1.5", "number", { min: "0", step: "0.0001" })}
                    </Field>
                  </div>
                  <div className="col-12">
                    <Field label="Description *" error={errors.description}>
                      <textarea
                        id="description"
                        placeholder="Describe the property — features, condition, nearby amenities…"
                        value={form.description}
                        onChange={(e) => set("description", e.target.value)}
                        onFocus={() => setFocused("description")}
                        onBlur={() => setFocused("")}
                        rows={4}
                        style={{ ...makeInputStyle(!!errors.description, focused === "description"), resize: "vertical" }}
                      />
                    </Field>
                  </div>
                </div>
              </div>

              {/* ── Section 2: Location ── */}
              <div style={{ ...glassCard, marginBottom: "20px" }}>
                {sectionHead("Location Details", "#00D9FF")}
                <div className="row g-3">
                  <div className="col-12">
                    <Field label="Street Address *" error={errors.propertyAddress}>
                      {inp("propertyAddress", "e.g. 123 Marine Drive")}
                    </Field>
                  </div>
                  <div className="col-md-6">
                    <Field label="City *" error={errors.city}>
                      {inp("city", "e.g. Mumbai")}
                    </Field>
                  </div>
                  <div className="col-md-6">
                    <Field label="State / Province" error={errors.state}>
                      {inp("state", "e.g. Maharashtra")}
                    </Field>
                  </div>
                  <div className="col-md-6">
                    <Field label="Country *" error={errors.country}>
                      {inp("country", "e.g. India")}
                    </Field>
                  </div>
                  <div className="col-md-6">
                    <Field label="ZIP / Postal Code" error={errors.zipCode}>
                      {inp("zipCode", "e.g. 400001")}
                    </Field>
                  </div>
                </div>
              </div>

              {/* ── Section 3: Property Specs ── */}
              <div style={{ ...glassCard, marginBottom: "20px" }}>
                {sectionHead("Property Specs", "#a78bfa")}
                <div className="row g-3">
                  <div className="col-md-4">
                    <Field label="Bedrooms *" error={errors.bedrooms}>
                      {inp("bedrooms", "e.g. 3", "number", { min: "0" })}
                    </Field>
                  </div>
                  <div className="col-md-4">
                    <Field label="Bathrooms *" error={errors.bathrooms}>
                      {inp("bathrooms", "e.g. 2", "number", { min: "0" })}
                    </Field>
                  </div>
                  <div className="col-md-4">
                    <Field label="Area (sq.ft) *" error={errors.sqft}>
                      {inp("sqft", "e.g. 1200", "number", { min: "0" })}
                    </Field>
                  </div>
                </div>
              </div>

              {/* ── Section 4: Settings ── */}
              <div style={{ ...glassCard, marginBottom: "28px" }}>
                {sectionHead("Settings", "#f472b6")}
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <input
                    type="checkbox"
                    id="isExplicit"
                    checked={form.isExplicit}
                    onChange={(e) => set("isExplicit", e.target.checked)}
                    style={{ width: 18, height: 18, accentColor: "#7048e8", cursor: "pointer", flexShrink: 0 }}
                  />
                  <label htmlFor="isExplicit" style={{ fontSize: "0.9rem", color: "rgba(200,215,230,0.55)", cursor: "pointer", margin: 0 }}>
                    This listing contains explicit or sensitive content
                  </label>
                </div>
                <p style={{ margin: "10px 0 0", fontSize: "0.78rem", color: "rgba(200,215,230,0.3)" }}>
                  <span style={{ color: "#f87171" }}>*</span> Marked fields are required. All images are stored permanently on IPFS via Pinata.
                </p>
              </div>

              {/* ── Submit ── */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                {/* spacer left */}
                <div style={{ flex: 1 }} />

                {/* center: publish button */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  style={{
                    padding: "14px 44px", borderRadius: "50px", border: "none",
                    background: isLoading ? "rgba(112,72,232,0.35)" : "linear-gradient(135deg, #7048e8 0%, #4f9cf9 100%)",
                    color: "#fff", fontWeight: 700, fontSize: "1rem",
                    cursor: isLoading ? "not-allowed" : "pointer",
                    boxShadow: isLoading ? "none" : "0 6px 24px rgba(112,72,232,0.5)",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={e => { if (!isLoading) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 32px rgba(112,72,232,0.65)"; }}}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(112,72,232,0.5)"; }}
                >
                  {isLoading ? (
                    <><span style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} /> Publishing…</>
                  ) : (
                    <>Publish Listing <span style={{ fontSize: "1.1rem" }}>→</span></>
                  )}
                </button>

                {/* right: cancel */}
                <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                  <a href="/" style={{
                    padding: "13px 28px", borderRadius: "50px",
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.04)",
                    color: "rgba(200,215,230,0.55)", fontWeight: 600,
                    fontSize: "0.92rem", textDecoration: "none",
                    transition: "border-color 0.2s, color 0.2s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "rgba(200,215,230,0.55)"; }}
                  >Cancel</a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <CreateThree data={form} />
    </>
  );
};

export default CreateTwo;
