import React, { useState } from "react";
import { Loader } from "../../PageComponents/Components";

const DetailTwo = ({
  property,
  parsedReviews,
  setLikeReviews,
  likeReviews,
  likeReviewCall,
  buyingProperty,
  toggleInterest,
  interestLoading,
  isInterested,
  address,
  isLoading,
  buyLoading,
  createReview,
  handleFormFieldChange,
  commentLoading,
}) => {
  const [activeTab, setActiveTab] = useState("details");
  const [imgIndex, setImgIndex] = useState(0);

  // ── Parse encoded description ───────────────────────────────────
  const rawDesc = property?.description || "";
  const descParts = rawDesc.split("---");
  const cleanDescription = descParts[0]?.trim() || "";

  let bedrooms = null, bathrooms = null, area = null;
  if (descParts.length > 1) {
    const detailsLine = descParts[1].split("||")[0].trim();
    const bedsMatch = detailsLine.match(/Bedrooms:\s*(\d+)/);
    const bathsMatch = detailsLine.match(/Bathrooms:\s*(\d+)/);
    const areaMatch = detailsLine.match(/Area:\s*([\d.]+)/);
    bedrooms = bedsMatch ? bedsMatch[1] : null;
    bathrooms = bathsMatch ? bathsMatch[1] : null;
    area = areaMatch ? areaMatch[1] : null;
  }

  let allImages = [property?.image].filter(Boolean);
  const extraImagesMatch = rawDesc.match(/\|\|EXTRA_IMAGES:([^|\n]+)/);
  if (extraImagesMatch) {
    const extraUrls = extraImagesMatch[1].split(",").filter(Boolean);
    allImages = [...allImages, ...extraUrls];
  }

  let city = null, state = null, country = null, zipCode = null;
  const locationMatch = rawDesc.match(/\|\|LOCATION:([^|\n]+)/);
  if (locationMatch) {
    const parts = locationMatch[1].split(",");
    city = parts[0]?.trim() || null;
    state = parts[1]?.trim() || null;
    country = parts[2]?.trim() || null;
    zipCode = parts[3]?.trim() || null;
  }

  let rentalPrice = null;
  const rentalMatch = rawDesc.match(/\|\|RENTAL:([^|\n]+)/);
  if (rentalMatch) rentalPrice = rentalMatch[1].trim();

  const locationDisplay = [city, state, country].filter(Boolean).join(", ") || property?.address || "-";

  const card = {
    background: "#0f0f1a",
    borderRadius: "16px",
    border: "1px solid rgba(139, 92, 246, 0.12)",
    boxShadow: "0 8px 40px rgba(0, 0, 0, 0.4)",
  };

  return (
    <section style={{ padding: "50px 0 70px" }}>
      <div className="container">
        <div className="row g-4" style={{ alignItems: "flex-start" }}>

          {/* LEFT PANEL */}
          <div className="col-lg-7 col-md-12 col-sm-12">
            <div style={{ ...card, overflow: "hidden" }}>
              <div style={{ position: "relative", height: "420px", background: "#0a0a14" }}>
                {isLoading ? (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "420px" }}>
                    <Loader />
                  </div>
                ) : (
                  <>
                    {allImages[imgIndex] ? (
                      <img
                        src={allImages[imgIndex]}
                        alt={property?.title || "Property"}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = `/portfolio/portfolio-0${((imgIndex % 8) + 1).toString().padStart(2, "0")}.jpg`;
                        }}
                      />
                    ) : (
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#1a0f2e" }}>
                        <span style={{ color: "#acacac", fontSize: "14px" }}>No image available</span>
                      </div>
                    )}
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "160px", background: "linear-gradient(to top, rgba(15,15,26,0.95) 0%, transparent 100%)", pointerEvents: "none" }} />
                    <div style={{ position: "absolute", top: "16px", left: "16px", background: "#1e1040", border: "1px solid rgba(139, 92, 246, 0.3)", borderRadius: "6px", padding: "5px 14px", fontSize: "11px", color: "#8b5cf6", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase" }}>
                      {property?.category || "Property"}
                    </div>
                    <div style={{ position: "absolute", top: "16px", right: "16px", background: "rgba(10,10,20,0.85)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "6px", padding: "4px 12px", fontSize: "11px", color: "#acacac", fontWeight: "600" }}>
                      #{property?.productID}
                    </div>
                    {allImages.length > 1 && (
                      <>
                        <button
                          onClick={() => setImgIndex((i) => Math.max(0, i - 1))}
                          disabled={imgIndex === 0}
                          style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "50%", width: "36px", height: "36px", color: "#fff", fontSize: "18px", cursor: imgIndex === 0 ? "not-allowed" : "pointer", opacity: imgIndex === 0 ? 0.35 : 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          &#8249;
                        </button>
                        <button
                          onClick={() => setImgIndex((i) => Math.min(allImages.length - 1, i + 1))}
                          disabled={imgIndex === allImages.length - 1}
                          style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "50%", width: "36px", height: "36px", color: "#fff", fontSize: "18px", cursor: imgIndex === allImages.length - 1 ? "not-allowed" : "pointer", opacity: imgIndex === allImages.length - 1 ? 0.35 : 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          &#8250;
                        </button>
                        <div style={{ position: "absolute", bottom: "54px", right: "16px", background: "rgba(0,0,0,0.55)", borderRadius: "20px", padding: "3px 10px", fontSize: "11px", color: "#acacac" }}>
                          {imgIndex + 1} / {allImages.length}
                        </div>
                      </>
                    )}
                    {/* Location + Interested overlay */}
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                      <div>
                        <p style={{ color: "#acacac", fontSize: "10px", margin: "0 0 3px", letterSpacing: "1px", textTransform: "uppercase" }}>Location</p>
                        <p style={{ color: "#fff", fontSize: "13px", margin: "0", fontWeight: "500" }}>{locationDisplay}</p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <p style={{ color: "#acacac", fontSize: "10px", margin: "0 0 3px", letterSpacing: "1px", textTransform: "uppercase" }}>Interested</p>
                        <p style={{ color: "#8b5cf6", fontSize: "18px", fontWeight: "700", margin: "0", lineHeight: "1" }}>{property?.interestedUsers?.length || 0}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div style={{ padding: "20px 24px", borderTop: "1px solid rgba(139, 92, 246, 0.08)" }}>
                {property?.title && (
                  <h3 style={{ color: "#ffffff", fontSize: "20px", fontWeight: "800", margin: "0 0 10px", lineHeight: "1.3", letterSpacing: "-0.3px" }}>{property.title}</h3>
                )}
                <p style={{ color: "#acacac", fontSize: "11px", margin: "0 0 6px", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase" }}>About This Property</p>
                <p style={{ color: "#acacac", fontSize: "14px", lineHeight: "1.7", margin: "0" }}>{cleanDescription || "No description available."}</p>
              </div>

              {/* Specs strip */}
              {(bedrooms || bathrooms || area) && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderTop: "1px solid rgba(139, 92, 246, 0.08)" }}>
                  {[
                    { label: "Bedrooms", value: bedrooms },
                    { label: "Bathrooms", value: bathrooms },
                    { label: "Area (sq.ft)", value: area },
                  ].filter((s) => s.value).map(({ label, value }, idx, arr) => (
                    <div key={label} style={{ padding: "14px 16px", textAlign: "center", borderRight: idx < arr.length - 1 ? "1px solid rgba(139, 92, 246, 0.06)" : "none" }}>
                      <p style={{ color: "#fff", fontSize: "20px", fontWeight: "800", margin: "0 0 3px", lineHeight: "1" }}>{value}</p>
                      <p style={{ color: "#acacac", fontSize: "10px", margin: "0", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "700" }}>{label}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Location details */}
              {(property?.address || city || state || country || zipCode) && (
                <div style={{ padding: "16px 24px 20px" }}>
                  <p style={{ color: "#acacac", fontSize: "11px", margin: "0 0 10px", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase" }}>Property Location</p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px" }}>
                    {[
                      { label: "Address", value: property?.address },
                      { label: "City", value: city },
                      { label: "State / Province", value: state },
                      { label: "Country", value: country },
                      { label: "Zip Code", value: zipCode },
                    ].filter((l) => l.value).map(({ label, value }) => (
                      <div key={label} style={{ background: "#0a0a14", border: "1px solid rgba(139, 92, 246, 0.06)", borderRadius: "8px", padding: "10px 14px" }}>
                        <p style={{ color: "#acacac", fontSize: "9px", margin: "0 0 3px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "700" }}>{label}</p>
                        <p style={{ color: "#fff", fontSize: "13px", margin: "0", fontWeight: "500" }}>{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="col-lg-5 col-md-12 col-sm-12">
            <div style={{ ...card, padding: "28px" }}>

              {/* Property name + location header */}
              <div style={{ marginBottom: "20px", paddingBottom: "18px", borderBottom: "1px solid rgba(139, 92, 246, 0.12)" }}>
                <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#fff", margin: "0 0 8px", lineHeight: "1.25", letterSpacing: "-0.3px" }}>
                  {property?.title || "Property"}
                </h2>
                {locationDisplay !== "-" && (
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ color: "#8b5cf6", fontSize: "13px" }}>&#9679;</span>
                    <span style={{ color: "#acacac", fontSize: "13px", fontWeight: "500" }}>{locationDisplay}</span>
                  </div>
                )}
              </div>

              {/* Header badge */}
              <div style={{ marginBottom: "16px" }}>
                <span style={{ background: "#1e1040", border: "1px solid rgba(139, 92, 246, 0.2)", borderRadius: "6px", padding: "4px 12px", fontSize: "11px", color: "#8b5cf6", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase" }}>
                  #{property?.productID}
                </span>
              </div>

              {/* Title hidden – shown at top header above */}

              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
                <div style={{ background: "#1a0f2e", border: "1px solid rgba(139, 92, 246, 0.12)", borderRadius: "10px", padding: "14px", textAlign: "center" }}>
                  <p style={{ color: "#acacac", fontSize: "10px", margin: "0 0 5px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px" }}>Interested</p>
                  <p style={{ color: "#8b5cf6", fontSize: "22px", fontWeight: "800", margin: "0", lineHeight: "1" }}>{property?.interestedUsers?.length || 0}</p>
                </div>
                <div style={{ background: "#1a0f2e", border: "1px solid rgba(139, 92, 246, 0.12)", borderRadius: "10px", padding: "14px", textAlign: "center" }}>
                  <p style={{ color: "#acacac", fontSize: "10px", margin: "0 0 5px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px" }}>Reviews</p>
                  <p style={{ color: "#8b5cf6", fontSize: "22px", fontWeight: "800", margin: "0", lineHeight: "1" }}>{parsedReviews?.length || 0}</p>
                </div>
              </div>

              {/* Express interest section */}
              <div style={{ background: "#0d2020", border: "1px solid rgba(0, 212, 170, 0.2)", borderRadius: "12px", padding: "14px 16px", marginBottom: "20px" }}>
                <p style={{ color: "#acacac", fontSize: "10px", margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "1.5px", fontWeight: "700" }}>
                  Interested In This Property?
                </p>
                <p style={{ color: "#d1fae5", fontSize: "12px", margin: "0 0 12px", lineHeight: "1.5" }}>
                  Click below to add/remove your interest. Each user can be interested only once.
                </p>
                <button
                  type="button"
                  disabled={interestLoading || !address}
                  onClick={() => toggleInterest && toggleInterest()}
                  style={{
                    width: "100%",
                    padding: "12px",
                    background: interestLoading || !address
                      ? "#16302d"
                      : isInterested
                      ? "linear-gradient(135deg,#ef4444,#b91c1c)"
                      : "linear-gradient(135deg,#00d4aa,#00a884)",
                    color: interestLoading || !address ? "#8aa9a3" : "#05211b",
                    border: "none",
                    borderRadius: "10px",
                    fontSize: "13px",
                    fontWeight: "800",
                    letterSpacing: "0.3px",
                    cursor: interestLoading || !address ? "not-allowed" : "pointer",
                    boxShadow: interestLoading || !address ? "none" : "0 6px 20px rgba(0,212,170,0.22)",
                  }}
                >
                  {interestLoading ? <Loader /> : (!address ? "Connect Wallet To Show Interest" : (isInterested ? "Remove Interest" : "I'm Interested"))}
                </button>
              </div>

              {/* Price */}
              <div style={{ background: "#1a0f2e", border: "1px solid rgba(139, 92, 246, 0.18)", borderRadius: "12px", padding: "16px 20px", marginBottom: rentalPrice ? "10px" : "22px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ color: "#acacac", fontSize: "10px", margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "2px", fontWeight: "700" }}>Sale Price</p>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                    <span style={{ fontSize: "26px", fontWeight: "800", color: "#8b5cf6", lineHeight: "1" }}>{property?.price}</span>
                    <span style={{ fontSize: "13px", fontWeight: "600", color: "#acacac" }}>ETH</span>
                  </div>
                </div>
                <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "#1e1040", border: "1px solid rgba(139, 92, 246, 0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "#8b5cf6", fontWeight: "800", fontSize: "11px" }}>ETH</span>
                </div>
              </div>

              {/* Rental price */}
              {rentalPrice && (
                <div style={{ background: "#0d2020", border: "1px solid rgba(0, 212, 170, 0.2)", borderRadius: "12px", padding: "12px 20px", marginBottom: "22px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ color: "#acacac", fontSize: "10px", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "2px", fontWeight: "700" }}>Rental Price</p>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                      <span style={{ fontSize: "20px", fontWeight: "800", color: "#00d4aa", lineHeight: "1" }}>{rentalPrice}</span>
                      <span style={{ fontSize: "13px", fontWeight: "600", color: "#acacac" }}>ETH / month</span>
                    </div>
                  </div>
                  <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "#0f2a26", border: "1px solid rgba(0, 212, 170, 0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: "#00d4aa", fontWeight: "800", fontSize: "10px" }}>RENT</span>
                  </div>
                </div>
              )}

              {/* Tabs */}
              <div style={{ display: "flex", gap: "2px", background: "#0a0a14", borderRadius: "10px", padding: "3px", marginBottom: "16px", border: "1px solid rgba(255,255,255,0.05)" }}>
                {["comments", "details", "interest"].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    style={{
                      flex: 1,
                      padding: "8px 4px",
                      background: activeTab === tab ? "#1a0f2e" : "transparent",
                      color: activeTab === tab ? "#8b5cf6" : "#acacac",
                      border: activeTab === tab ? "1px solid rgba(139, 92, 246, 0.2)" : "1px solid transparent",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "11px",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      transition: "all 0.2s ease",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {tab === "comments" ? `Comments (${parsedReviews?.length || 0})` : tab === "interest" ? `Interest (${property?.interestedUsers?.length || 0})` : "Details"}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div style={{ marginBottom: "20px" }}>

                {activeTab === "comments" && (
                  <div>
                    {!parsedReviews?.length ? (
                      <p style={{ color: "#acacac", fontSize: "13px", textAlign: "center", padding: "20px 0", margin: "0" }}>No reviews yet. Be the first!</p>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "220px", overflowY: "auto" }}>
                        {parsedReviews.map((review, i) => (
                          <div key={i} style={{ background: "#0a0a14", border: "1px solid rgba(139, 92, 246, 0.08)", borderRadius: "10px", padding: "12px 14px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "5px" }}>
                              <p style={{ color: "#acacac", fontSize: "11px", margin: "0", fontFamily: "monospace" }}>{review?.reviewer?.slice(0, 20)}...</p>
                              <span style={{ color: "#f59e0b", fontSize: "11px" }}>{"★".repeat(Number(review?.rating) || 0)}{"☆".repeat(5 - (Number(review?.rating) || 0))}</span>
                            </div>
                            <p style={{ color: "#fff", fontSize: "13px", margin: "0", lineHeight: "1.5" }}>{review?.comment}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "details" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {[
                      { label: "Owner", value: property?.owner ? `${property.owner.slice(0, 22)}...` : "-", accent: true },
                      { label: "Title", value: property?.title || "-" },
                      { label: "ID", value: `#${property?.productID ?? "-"}` },
                      { label: "Category", value: property?.category || "-" },
                      { label: "Sale Price", value: property?.price ? `${property.price} ETH` : "-" },
                      rentalPrice ? { label: "Rental Price", value: `${rentalPrice} ETH/mo`, green: true } : null,
                      bedrooms ? { label: "Bedrooms", value: bedrooms } : null,
                      bathrooms ? { label: "Bathrooms", value: bathrooms } : null,
                      area ? { label: "Area", value: `${area} sq.ft` } : null,
                      property?.address ? { label: "Address", value: property.address } : null,
                      city ? { label: "City", value: city } : null,
                      state ? { label: "State", value: state } : null,
                      country ? { label: "Country", value: country } : null,
                      zipCode ? { label: "Zip Code", value: zipCode } : null,
                    ].filter(Boolean).map(({ label, value, accent, green }) => (
                      <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 12px", background: "#0a0a14", border: "1px solid rgba(139, 92, 246, 0.06)", borderRadius: "8px", gap: "10px" }}>
                        <span style={{ color: "#acacac", fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px", flexShrink: 0 }}>{label}</span>
                        <span style={{ color: accent ? "#8b5cf6" : green ? "#00d4aa" : "#fff", fontSize: "12px", fontWeight: "500", textAlign: "right", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "185px", fontFamily: accent ? "monospace" : "inherit" }}>{value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "interest" && (
                  <div>
                    {!property?.interestedUsers?.length ? (
                      <p style={{ color: "#acacac", fontSize: "13px", textAlign: "center", padding: "20px 0", margin: "0" }}>No users have shown interest yet.</p>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px", maxHeight: "220px", overflowY: "auto" }}>
                        {property.interestedUsers.map((reviewer, i) => (
                          <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 12px", background: "#0a0a14", border: "1px solid rgba(139, 92, 246, 0.06)", borderRadius: "8px" }}>
                            <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#1e1040", border: "1px solid rgba(139, 92, 246, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#8b5cf6", fontSize: "11px", fontWeight: "700" }}>
                              {i + 1}
                            </div>
                            <span style={{ color: "#acacac", fontSize: "11px", fontFamily: "monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{reviewer}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

              </div>

              {/* Buy / Owner / Sold Button */}
              {(() => {
                const isOwner  = address?.toLowerCase() === property?.owner?.toLowerCase();
                const isSeller = address?.toLowerCase() === property?.seller?.toLowerCase();
                const isSold   = property?.isSold === true;
                if (isOwner || isSeller) return (
                  <button type="button" disabled style={{ width:"100%",padding:"14px",background:"#1a0f2e",color:"#acacac",border:"1px solid rgba(255,255,255,0.06)",borderRadius:"10px",fontSize:"14px",fontWeight:"700",cursor:"not-allowed",letterSpacing:"0.5px" }}>
                    {isOwner ? "You Own This Property" : "You Listed This Property"}
                  </button>
                );
                if (isSold) return (
                  <button type="button" disabled style={{ width:"100%",padding:"14px",background:"rgba(30,15,50,0.8)",color:"#ef4444",border:"1px solid rgba(255,255,255,0.06)",borderRadius:"10px",fontSize:"14px",fontWeight:"700",cursor:"not-allowed",letterSpacing:"0.5px" }}>
                    Property Already Sold
                  </button>
                );
                return (
                  <button onClick={() => buyingProperty()} type="button" style={{ width:"100%",padding:"14px",background:"linear-gradient(135deg,#8b5cf6 0%,#6d28d9 100%)",color:"#fff",border:"none",borderRadius:"10px",fontSize:"14px",fontWeight:"700",cursor:"pointer",letterSpacing:"0.5px",boxShadow:"0 6px 24px rgba(139,92,246,0.28)",transition:"all 0.3s ease" }}>
                    {buyLoading ? <Loader /> : `Buy for ${property?.price} ETH`}
                  </button>
                );
              })()}

            </div>
          </div>
        </div>

        {/* ── REVIEWS SECTION ─────────────────────────────────────── */}
        <div style={{ marginTop: "60px", paddingTop: "50px", borderTop: "1px solid rgba(139, 92, 246, 0.1)" }}>
          {/* Section header */}
          <div style={{ marginBottom: "36px" }}>
            <p style={{ color: "#8b5cf6", fontSize: "11px", fontWeight: "700", letterSpacing: "3px", textTransform: "uppercase", margin: "0 0 8px", opacity: 0.85 }}>Community Feedback</p>
            <h2 style={{ fontSize: "28px", fontWeight: "800", color: "#fff", margin: "0", lineHeight: "1.2" }}>
              Reviews &amp; Ratings
              <span style={{ marginLeft: "12px", fontSize: "16px", color: "#8b5cf6", fontWeight: "600" }}>({parsedReviews?.length || 0})</span>
            </h2>
          </div>

          <div className="row g-4">
            {/* Left — existing reviews */}
            <div className="col-lg-7 col-md-12">
              {!parsedReviews?.length ? (
                <div style={{ background: "#0f0f1a", border: "1px solid rgba(139, 92, 246, 0.1)", borderRadius: "16px", padding: "48px 32px", textAlign: "center" }}>
                  <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "#1a0f2e", border: "1px solid rgba(139, 92, 246, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: "22px" }}>&#9733;</div>
                  <p style={{ color: "#fff", fontSize: "16px", fontWeight: "700", margin: "0 0 6px" }}>No reviews yet</p>
                  <p style={{ color: "#acacac", fontSize: "13px", margin: "0" }}>Be the first to share your thoughts about this property.</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {parsedReviews.map((review, i) => (
                    <div key={i} style={{ background: "#0f0f1a", border: "1px solid rgba(139, 92, 246, 0.1)", borderRadius: "14px", padding: "20px 22px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#1a0f2e", border: "1px solid rgba(139, 92, 246, 0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#8b5cf6", fontSize: "12px", fontWeight: "800" }}>
                            {i + 1}
                          </div>
                          <p style={{ color: "#8b5cf6", fontSize: "12px", margin: "0", fontFamily: "monospace", fontWeight: "600" }}>{review?.reviewer?.slice(0, 28)}...</p>
                        </div>
                        <span style={{ color: "#f59e0b", fontSize: "14px", letterSpacing: "1px", flexShrink: 0 }}>
                          {"★".repeat(Number(review?.rating) || 0)}{"☆".repeat(5 - (Number(review?.rating) || 0))}
                        </span>
                      </div>
                      <p style={{ color: "#acacac", fontSize: "14px", margin: "0", lineHeight: "1.65" }}>{review?.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right — write a review */}
            <div className="col-lg-5 col-md-12">
              <div style={{ background: "#0f0f1a", border: "1px solid rgba(139, 92, 246, 0.12)", borderRadius: "16px", padding: "28px", position: "sticky", top: "24px" }}>
                <h4 style={{ color: "#fff", fontSize: "18px", fontWeight: "800", margin: "0 0 6px" }}>Leave a Review</h4>
                <p style={{ color: "#acacac", fontSize: "13px", margin: "0 0 24px" }}>Share your experience with this property.</p>

                <div style={{ marginBottom: "16px" }}>
                  <label style={{ color: "#acacac", fontSize: "10px", fontWeight: "700", letterSpacing: "1.5px", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>Rating</label>
                  <select onChange={(e) => handleFormFieldChange("rating", e)}
                    style={{ width: "100%", padding: "12px 14px", background: "#0a0a14", border: "1px solid rgba(139, 92, 246, 0.18)", borderRadius: "10px", color: "#fff", fontSize: "14px", cursor: "pointer", outline: "none" }}>
                    <option value="5">&#9733;&#9733;&#9733;&#9733;&#9733; — Excellent</option>
                    <option value="4">&#9733;&#9733;&#9733;&#9733;&#9734; — Very Good</option>
                    <option value="3">&#9733;&#9733;&#9733;&#9734;&#9734; — Good</option>
                    <option value="2">&#9733;&#9733;&#9734;&#9734;&#9734; — Fair</option>
                    <option value="1">&#9733;&#9734;&#9734;&#9734;&#9734; — Poor</option>
                  </select>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label style={{ color: "#acacac", fontSize: "10px", fontWeight: "700", letterSpacing: "1.5px", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>Your Comment</label>
                  <textarea rows={5} placeholder="Share your thoughts about this property..."
                    onChange={(e) => handleFormFieldChange("comment", e)}
                    style={{ width: "100%", padding: "12px 14px", background: "#0a0a14", border: "1px solid rgba(139, 92, 246, 0.18)", borderRadius: "10px", color: "#fff", fontSize: "14px", resize: "vertical", fontFamily: "inherit", outline: "none", lineHeight: "1.6" }} />
                </div>

                <button type="button" disabled={commentLoading} onClick={() => createReview()}
                  style={{ width: "100%", padding: "14px", background: commentLoading ? "#1a0f2e" : "linear-gradient(135deg, #8b5cf6, #6d28d9)", color: commentLoading ? "#acacac" : "#fff", border: commentLoading ? "1px solid rgba(139, 92, 246, 0.15)" : "none", borderRadius: "10px", fontSize: "14px", fontWeight: "700", cursor: commentLoading ? "not-allowed" : "pointer", letterSpacing: "0.3px", boxShadow: commentLoading ? "none" : "0 4px 20px rgba(139, 92, 246, 0.3)", transition: "all 0.3s ease" }}>
                  {commentLoading ? <Loader /> : "Submit Review"}
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default DetailTwo;