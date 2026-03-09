import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

//INTERNAL IMPORT
import {
  Header,
  Footer,
  Copyright,
  Loader,
  GlobalLoder,
} from "../PageComponents/Components";
import { useStateContext } from "../context/index";

const categories = [
  "Housing",
  "Rental",
  "Farmhouse",
  "Office",
  "Commercial",
  "Country",
];

// Parse the encoded description string
const parseDescription = (raw = "") => {
  const descParts = raw.split("---");
  const cleanDesc = descParts[0]?.trim() || "";
  let bedrooms = "", bathrooms = "", area = "";
  if (descParts.length > 1) {
    const line = descParts[1].split("||")[0].trim();
    bedrooms = (line.match(/Bedrooms:\s*(\d+)/) || [])[1] || "";
    bathrooms = (line.match(/Bathrooms:\s*(\d+)/) || [])[1] || "";
    area = (line.match(/Area:\s*([\d.]+)/) || [])[1] || "";
  }
  let city = "", state = "", country = "", zipCode = "";
  const locMatch = raw.match(/\|\|LOCATION:([^|\n]+)/);
  if (locMatch) {
    const p = locMatch[1].split(",");
    city = p[0]?.trim() || "";
    state = p[1]?.trim() || "";
    country = p[2]?.trim() || "";
    zipCode = p[3]?.trim() || "";
  }
  let rentalPrice = "";
  const rentalMatch = raw.match(/\|\|RENTAL:([^|\n]+)/);
  if (rentalMatch) rentalPrice = rentalMatch[1].trim();
  return { cleanDesc, bedrooms, bathrooms, area, city, state, country, zipCode, rentalPrice };
};

const UpdatePage = () => {
  const router = useRouter();
  const { query } = router;

  const [isLoading, setIsLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [property, setProperty] = useState(null);
  const [file, setFile] = useState(null);
  const [displayImg, setDisplayImg] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const {
    address,
    getPropertyFunction,
    updatePropertyFunction,
    PINATA_API_KEY,
    PINATA_SECRECT_KEY,
    setLoader,
    notifyError,
    notifySuccess,
    loader,
  } = useStateContext();

  const [form, setForm] = useState({
    productId: "",
    propertyTitle: "",
    description: "",
    category: "",
    price: "",
    images: "",
    propertyAddress: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    rentalPrice: "",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
  });

  // Fetch existing property and pre-fill
  useEffect(() => {
    const load = async () => {
      if (!query.property) return;
      setFetching(true);
      try {
        const data = await getPropertyFunction(query.property);
        if (data) {
          setProperty(data);
          const { cleanDesc, bedrooms, bathrooms, area, city, state, country, zipCode, rentalPrice } = parseDescription(data.description || "");
          setForm({
            productId: data.productID || query.property,
            propertyTitle: data.title || "",
            description: cleanDesc,
            category: data.category || "",
            price: data.price || "",
            images: data.image || "",
            propertyAddress: data.address || "",
            city,
            state,
            country,
            zipCode,
            rentalPrice,
            bedrooms,
            bathrooms,
            sqft: area,
          });
        }
      } catch (e) {
        console.error(e);
      }
      setFetching(false);
    };
    load();
  }, [query.property]);

  const handleFormFieldChange = (fieldName, e) => {
    setForm((prev) => ({ ...prev, [fieldName]: e.target.value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const detailsSuffix =
      form.bedrooms || form.bathrooms || form.sqft
        ? `\n---\nBedrooms: ${form.bedrooms || 0} | Bathrooms: ${form.bathrooms || 0} | Area: ${form.sqft || 0} sq.ft`
        : "";
    const locationSuffix = (form.city || form.state || form.country || form.zipCode)
      ? `\n||LOCATION:${form.city},${form.state},${form.country},${form.zipCode}`
      : "";
    const rentalSuffix = form.rentalPrice ? `\n||RENTAL:${form.rentalPrice}` : "";
    await updatePropertyFunction({
      ...form,
      description: form.description + detailsSuffix + locationSuffix + rentalSuffix,
      productId: query.property * 1,
    });
    setIsLoading(false);
  };

  const uploadToPinata = async () => {
    setLoader(true);
    setUploadStatus("Uploading...");
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const response = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_SECRECT_KEY,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
        setForm((prev) => ({ ...prev, images: ImgHash }));
        notifySuccess("Image uploaded successfully");
        setUploadStatus("Uploaded");
        setLoader(false);
        return ImgHash;
      } catch (error) {
        setLoader(false);
        setUploadStatus("");
        notifyError("Unable to upload image to Pinata");
      }
    }
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0];
    if (!data) return;
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
      setDisplayImg(URL.createObjectURL(e.target.files[0]));
    };
    e.preventDefault();
  };

  // ── Shared field style ────────────────────────────────────────────
  const inputStyle = {
    width: "100%",
    padding: "11px 14px",
    background: "#0a0a14",
    border: "1px solid rgba(139, 92, 246, 0.18)",
    borderRadius: "10px",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
    fontFamily: "inherit",
    transition: "border-color 0.2s",
  };
  const labelStyle = {
    color: "#acacac",
    fontSize: "10px",
    fontWeight: "700",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    display: "block",
    marginBottom: "8px",
  };
  const sectionCard = {
    background: "#0f0f1a",
    border: "1px solid rgba(139, 92, 246, 0.12)",
    borderRadius: "16px",
    padding: "28px",
    marginBottom: "24px",
  };

  const previewImg = displayImg || form.images || null;

  if (fetching) {
    return (
      <div className="template-color-1 nft-body-connect">
        <Header />
        <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0a14" }}>
          <div style={{ textAlign: "center" }}>
            <Loader />
            <p style={{ color: "#acacac", marginTop: "16px", fontSize: "14px" }}>Loading property data...</p>
          </div>
        </div>
        <Footer />
        <Copyright />
      </div>
    );
  }

  return (
    <div className="template-color-1 nft-body-connect">
      <Header />

      {/* Page header */}
      <div style={{ background: "#0f0f1a", padding: "28px 0", borderBottom: "1px solid rgba(139, 92, 246, 0.1)" }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6 col-12">
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{ width: "4px", height: "46px", background: "linear-gradient(180deg, #8b5cf6 0%, rgba(139,92,246,0) 100%)", borderRadius: "2px" }} />
                <div>
                  <p style={{ color: "#8b5cf6", fontSize: "11px", fontWeight: "700", letterSpacing: "3px", textTransform: "uppercase", margin: "0 0 4px", opacity: 0.8 }}>BlockEstate</p>
                  <h1 style={{ fontSize: "26px", fontWeight: "700", margin: "0", color: "#fff", lineHeight: "1.2" }}>Update Property</h1>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <nav style={{ display: "flex", justifyContent: "flex-end" }}>
                <ol style={{ display: "flex", alignItems: "center", flexWrap: "nowrap", gap: "8px", margin: 0, padding: "8px 18px", listStyle: "none", background: "rgba(139,92,246,0.05)", border: "1px solid rgba(139,92,246,0.12)", borderRadius: "30px", whiteSpace: "nowrap" }}>
                  <li style={{ display: "flex", alignItems: "center" }}><a href="/" style={{ color: "#8b5cf6", textDecoration: "none", fontSize: "13px", fontWeight: "500", lineHeight: "1" }}>Home</a></li>
                  <li style={{ display: "flex", alignItems: "center", color: "rgba(139,92,246,0.35)", fontSize: "14px", lineHeight: "1" }}>›</li>
                  <li style={{ display: "flex", alignItems: "center", color: "#acacac", fontSize: "13px", lineHeight: "1" }}>Update Property</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: "#0a0a14", padding: "50px 0 80px" }}>
        <div className="container">

          {/* Current property preview banner */}
          {property && (
            <div style={{ background: "#0f0f1a", border: "1px solid rgba(139,92,246,0.15)", borderRadius: "16px", overflow: "hidden", marginBottom: "40px" }}>
              <div style={{ padding: "10px 20px", background: "rgba(139,92,246,0.08)", borderBottom: "1px solid rgba(139,92,246,0.1)" }}>
                <p style={{ color: "#8b5cf6", fontSize: "11px", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase", margin: 0 }}>Current Listing — #{property.productID}</p>
              </div>
              <div className="row g-0">
                {previewImg && (
                  <div className="col-lg-3 col-md-4 col-12">
                    <img src={previewImg} alt={property.title} style={{ width: "100%", height: "100%", minHeight: "160px", objectFit: "cover", display: "block" }} />
                  </div>
                )}
                <div className={`col-lg-${previewImg ? 9 : 12} col-md-${previewImg ? 8 : 12} col-12`}>
                  <div style={{ padding: "22px 24px", display: "flex", flexWrap: "wrap", gap: "20px", alignItems: "flex-start" }}>
                    <div style={{ flex: "1 1 200px" }}>
                      <p style={{ color: "#acacac", fontSize: "10px", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "700" }}>Title</p>
                      <p style={{ color: "#fff", fontSize: "17px", fontWeight: "800", margin: 0 }}>{property.title || "—"}</p>
                    </div>
                    <div>
                      <p style={{ color: "#acacac", fontSize: "10px", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "700" }}>Category</p>
                      <span style={{ background: "#1e1040", border: "1px solid rgba(139,92,246,0.25)", borderRadius: "6px", padding: "3px 12px", fontSize: "12px", color: "#8b5cf6", fontWeight: "700" }}>{property.category || "—"}</span>
                    </div>
                    <div>
                      <p style={{ color: "#acacac", fontSize: "10px", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "700" }}>Sale Price</p>
                      <p style={{ color: "#8b5cf6", fontSize: "18px", fontWeight: "800", margin: 0 }}>{property.price} <span style={{ fontSize: "13px", color: "#acacac", fontWeight: "600" }}>ETH</span></p>
                    </div>
                    {property.address && (
                      <div>
                        <p style={{ color: "#acacac", fontSize: "10px", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "700" }}>Address</p>
                        <p style={{ color: "#fff", fontSize: "14px", fontWeight: "500", margin: 0 }}>{property.address}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="row g-4">
            {/* Left column — image */}
            <div className="col-lg-4 col-md-12">
              <div style={{ ...sectionCard, position: "sticky", top: "24px" }}>
                <p style={{ color: "#fff", fontSize: "15px", fontWeight: "700", margin: "0 0 6px" }}>Property Image</p>
                <p style={{ color: "#acacac", fontSize: "13px", margin: "0 0 20px" }}>Upload a new photo or keep the existing one.</p>

                <div style={{ position: "relative", borderRadius: "12px", overflow: "hidden", background: "#0a0a14", border: "2px dashed rgba(139,92,246,0.25)", marginBottom: "16px", minHeight: "200px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {previewImg ? (
                    <>
                      <img src={previewImg} alt="preview" style={{ width: "100%", height: "200px", objectFit: "cover", display: "block" }} />
                      <label htmlFor="imgUpload" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.45)", cursor: "pointer", opacity: 0, transition: "opacity 0.2s" }}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = 0}>
                        <span style={{ color: "#fff", fontSize: "13px", fontWeight: "700", background: "rgba(139,92,246,0.8)", padding: "8px 18px", borderRadius: "8px" }}>Change Photo</span>
                      </label>
                    </>
                  ) : (
                    <label htmlFor="imgUpload" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", cursor: "pointer", padding: "30px" }}>
                      <span style={{ fontSize: "32px" }}>&#128247;</span>
                      <span style={{ color: "#8b5cf6", fontSize: "13px", fontWeight: "600" }}>Click to upload image</span>
                      <span style={{ color: "#acacac", fontSize: "12px" }}>PNG, JPG, WEBP</span>
                    </label>
                  )}
                  <input id="imgUpload" type="file" accept="image/*" onChange={retrieveFile} style={{ display: "none" }} />
                </div>

                {file && (
                  <button onClick={() => uploadToPinata()} style={{ width: "100%", padding: "11px", background: uploadStatus === "Uploaded" ? "#0d2020" : "linear-gradient(135deg, #8b5cf6, #6d28d9)", color: uploadStatus === "Uploaded" ? "#00d4aa" : "#fff", border: uploadStatus === "Uploaded" ? "1px solid rgba(0,212,170,0.2)" : "none", borderRadius: "10px", fontSize: "13px", fontWeight: "700", cursor: "pointer", transition: "all 0.3s ease" }}>
                    {uploadStatus || "Upload to IPFS"}
                  </button>
                )}

                {form.images && !file && (
                  <p style={{ color: "#acacac", fontSize: "12px", textAlign: "center", margin: "10px 0 0", wordBreak: "break-all" }}>
                    <span style={{ color: "#00d4aa", marginRight: "6px" }}>&#10003;</span>Image on chain
                  </p>
                )}
              </div>
            </div>

            {/* Right column — form */}
            <div className="col-lg-8 col-md-12">

              {/* Basic info */}
              <div style={sectionCard}>
                <p style={{ color: "#8b5cf6", fontSize: "11px", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase", margin: "0 0 20px" }}>Basic Information</p>
                <div className="row g-3">
                  <div className="col-lg-8 col-md-8 col-12">
                    <label style={labelStyle}>Property Title</label>
                    <input style={inputStyle} type="text" value={form.propertyTitle} placeholder="e.g. Modern Villa in New York"
                      onChange={(e) => handleFormFieldChange("propertyTitle", e)} />
                  </div>
                  <div className="col-lg-4 col-md-4 col-12">
                    <label style={labelStyle}>Category</label>
                    <select style={{ ...inputStyle, cursor: "pointer" }} value={form.category}
                      onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}>
                      <option value="">Select...</option>
                      {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="col-12">
                    <label style={labelStyle}>Description</label>
                    <textarea style={{ ...inputStyle, resize: "vertical", lineHeight: "1.6" }} rows={4}
                      value={form.description} placeholder="Describe the property..."
                      onChange={(e) => handleFormFieldChange("description", e)} />
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div style={sectionCard}>
                <p style={{ color: "#8b5cf6", fontSize: "11px", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase", margin: "0 0 20px" }}>Pricing</p>
                <div className="row g-3">
                  <div className="col-lg-6 col-md-6 col-12">
                    <label style={labelStyle}>Sale Price (ETH)</label>
                    <input style={inputStyle} type="number" min="0" step="0.0001" value={form.price}
                      placeholder="e.g. 0.5" onChange={(e) => handleFormFieldChange("price", e)} />
                  </div>
                  <div className="col-lg-6 col-md-6 col-12">
                    <label style={labelStyle}>Rental Price (ETH/month) <span style={{ color: "#acacac", fontWeight: "400", textTransform: "none", letterSpacing: 0 }}>— optional</span></label>
                    <input style={inputStyle} type="number" min="0" step="0.0001" value={form.rentalPrice}
                      placeholder="e.g. 0.05" onChange={(e) => handleFormFieldChange("rentalPrice", e)} />
                  </div>
                </div>
              </div>

              {/* Property specs */}
              <div style={sectionCard}>
                <p style={{ color: "#8b5cf6", fontSize: "11px", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase", margin: "0 0 20px" }}>Property Specs</p>
                <div className="row g-3">
                  <div className="col-lg-4 col-md-4 col-12">
                    <label style={labelStyle}>Bedrooms</label>
                    <input style={inputStyle} type="number" min="0" value={form.bedrooms}
                      placeholder="e.g. 3" onChange={(e) => handleFormFieldChange("bedrooms", e)} />
                  </div>
                  <div className="col-lg-4 col-md-4 col-12">
                    <label style={labelStyle}>Bathrooms</label>
                    <input style={inputStyle} type="number" min="0" value={form.bathrooms}
                      placeholder="e.g. 2" onChange={(e) => handleFormFieldChange("bathrooms", e)} />
                  </div>
                  <div className="col-lg-4 col-md-4 col-12">
                    <label style={labelStyle}>Area (sq.ft)</label>
                    <input style={inputStyle} type="number" min="0" value={form.sqft}
                      placeholder="e.g. 1200" onChange={(e) => handleFormFieldChange("sqft", e)} />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div style={sectionCard}>
                <p style={{ color: "#8b5cf6", fontSize: "11px", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase", margin: "0 0 20px" }}>Location</p>
                <div className="row g-3">
                  <div className="col-12">
                    <label style={labelStyle}>Street Address</label>
                    <input style={inputStyle} type="text" value={form.propertyAddress}
                      placeholder="e.g. 123 Main St" onChange={(e) => handleFormFieldChange("propertyAddress", e)} />
                  </div>
                  <div className="col-lg-6 col-md-6 col-12">
                    <label style={labelStyle}>City</label>
                    <input style={inputStyle} type="text" value={form.city}
                      placeholder="e.g. New York" onChange={(e) => handleFormFieldChange("city", e)} />
                  </div>
                  <div className="col-lg-6 col-md-6 col-12">
                    <label style={labelStyle}>State / Province</label>
                    <input style={inputStyle} type="text" value={form.state}
                      placeholder="e.g. NY" onChange={(e) => handleFormFieldChange("state", e)} />
                  </div>
                  <div className="col-lg-6 col-md-6 col-12">
                    <label style={labelStyle}>Country</label>
                    <input style={inputStyle} type="text" value={form.country}
                      placeholder="e.g. USA" onChange={(e) => handleFormFieldChange("country", e)} />
                  </div>
                  <div className="col-lg-6 col-md-6 col-12">
                    <label style={labelStyle}>Zip Code</label>
                    <input style={inputStyle} type="text" value={form.zipCode}
                      placeholder="e.g. 10001" onChange={(e) => handleFormFieldChange("zipCode", e)} />
                  </div>
                </div>
              </div>

              {/* Save */}
              <button onClick={handleSubmit} disabled={isLoading}
                style={{ width: "100%", padding: "16px", background: isLoading ? "#1e1040" : "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)", color: isLoading ? "#acacac" : "#fff", border: isLoading ? "1px solid rgba(139,92,246,0.2)" : "none", borderRadius: "12px", fontSize: "16px", fontWeight: "800", cursor: isLoading ? "not-allowed" : "pointer", letterSpacing: "0.3px", boxShadow: isLoading ? "none" : "0 6px 28px rgba(139,92,246,0.35)", transition: "all 0.3s ease" }}>
                {isLoading ? <Loader /> : "Save Changes"}
              </button>
            </div>
          </div>

        </div>
      </div>

      <Footer />
      <Copyright />
      {loader && <GlobalLoder />}
    </div>
  );
};

export default UpdatePage;
