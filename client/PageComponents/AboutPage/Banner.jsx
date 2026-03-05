import React, { useState, useEffect } from "react";

const FALLBACK_BG = "/bg/bg-image-18.jpg";
const FALLBACK_MOSAIC = [
  { src: "/portfolio/portfolio-01.jpg", label: "Residential",  price: "2.4 ETH" },
  { src: "/portfolio/portfolio-02.jpg", label: "Luxury Villa", price: "8.1 ETH" },
  { src: "/portfolio/portfolio-03.jpg", label: "Commercial",   price: "5.6 ETH" },
  { src: "/portfolio/portfolio-04.jpg", label: "Apartment",    price: "1.9 ETH" },
];
const FALLBACK_STRIP = [
  { src: "/portfolio/portfolio-05.jpg", label: "Penthouse" },
  { src: "/portfolio/portfolio-06.jpg", label: "Office Space" },
  { src: "/portfolio/portfolio-07.jpg", label: "Beach House" },
  { src: "/portfolio/portfolio-08.jpg", label: "Studio Flat" },
  { src: "/portfolio/portfolio-09.jpg", label: "Town House" },
];

const imgStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
  borderRadius: 10,
};

const overlayStyle = {
  position: "absolute",
  inset: 0,
  background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 55%)",
  borderRadius: 10,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  padding: "12px 14px",
  transition: "background 0.25s",
};

const Banner = () => {
  const [heroBg, setHeroBg]     = useState(FALLBACK_BG);
  const [mosaic, setMosaic]     = useState(FALLBACK_MOSAIC);
  const [strip, setStrip]       = useState(FALLBACK_STRIP);

  useEffect(() => {
    const load = async () => {
      try {
        const res  = await fetch("/api/properties");
        if (!res.ok) return;
        const { data } = await res.json();
        if (!data || !data.length) return;

        // Sort by updatedAt desc so the latest upload appears first
        const sorted = [...data].sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );

        // Hero banner = first image of the most recently updated property
        const latestImg = sorted[0]?.images?.[0];
        if (latestImg) setHeroBg(latestImg);

        // Mosaic = first 4 properties
        const mosaicItems = sorted.slice(0, 4).map((p) => ({
          src:   p.images?.[0] || FALLBACK_MOSAIC[0].src,
          label: p.category   || "Property",
          price: `${p.price} ETH`,
        }));
        // pad with fallbacks if fewer than 4
        while (mosaicItems.length < 4)
          mosaicItems.push(FALLBACK_MOSAIC[mosaicItems.length]);
        setMosaic(mosaicItems);

        // Strip = next 5 properties (positions 4-8)
        const stripItems = sorted.slice(4, 9).map((p) => ({
          src:   p.images?.[0] || FALLBACK_STRIP[0].src,
          label: p.title       || "Property",
        }));
        while (stripItems.length < 5)
          stripItems.push(FALLBACK_STRIP[stripItems.length]);
        setStrip(stripItems);
      } catch (e) {
        // keep fallbacks on error
      }
    };
    load();
  }, []);

  return (
    <div className="rn-about-banner-area" style={{ paddingTop: "60px" }}>
      {/* ── Headline ── */}
      <div className="container" style={{ marginBottom: "24px" }}>
        <div className="row">
          <div className="col-12">
            {/* eyebrow badge */}
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(0,255,163,0.08)",
              border: "1px solid rgba(0,255,163,0.25)",
              borderRadius: "50px",
              padding: "5px 16px",
              marginBottom: "16px",
            }}>
              <span style={{
                width: "7px", height: "7px", borderRadius: "50%",
                background: "#00FFA3",
                boxShadow: "0 0 8px #00FFA3",
                display: "inline-block",
              }} />
              <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "#00FFA3", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Blockchain Real Estate
              </span>
            </div>

            <h2
              className="title about-title-m"
              style={{
                fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
                fontWeight: 800,
                lineHeight: 1.12,
                letterSpacing: "-0.03em",
                margin: 0,
                background: "linear-gradient(135deg, #ffffff 0%, #a5f3dc 50%, #00D9FF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Tokenizing Real Estate. <br />
              Empowering Every Investor.
            </h2>

            <p style={{
              marginTop: "14px",
              fontSize: "1.05rem",
              color: "rgba(200,220,230,0.55)",
              fontWeight: 400,
              maxWidth: "520px",
              lineHeight: 1.65,
            }}>
              Own a fraction of premium properties worldwide — verified on-chain, traded instantly, no banks needed.
            </p>
          </div>
        </div>
      </div>

      {/* ── Hero image strip ── */}
      <div className="container-fluid about-fluidimg">
        <div className="row">
          <div className="img-wrapper">
            <img
              src="https://gateway.pinata.cloud/ipfs/QmQLvEG3n8XoQL6E4RnyVSM3Cp1kMbxcNexYiy1rKBWcPo"
              alt="BlockEstate Hero"
              style={{
                width: "100%",
                maxHeight: "420px",
                objectFit: "cover",
                objectPosition: "center 30%",
                display: "block",
                borderRadius: "10px",
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Text card + Property mosaic ── */}
      <div className="container">
        <div className="row g-5 align-items-start">
          {/* Left — text card */}
          <div className="col-lg-5">
            <div className="h--100">
              <div className="rn-about-card mt_dec--50 widge-wrapper rbt-sticky-top-adjust">
                <div className="inner">
                  <h2 className="title">Why BlockEstate?</h2>
                  <p className="about-disc">
                    BlockEstate is a blockchain-powered real estate marketplace
                    where property ownership is represented as an NFT on the
                    Ethereum network. We eliminate intermediaries, reduce
                    transaction costs, and give buyers and sellers full
                    transparency — every listing, sale, and ownership transfer
                    is verifiable on-chain, 24/7.
                  </p>
                  <ul
                    className="about-disc mt--20"
                    style={{ listStyle: "none", padding: 0, lineHeight: 2 }}
                  >
                    <li>✔ Verified on-chain property ownership</li>
                    <li>✔ Buy &amp; sell with crypto — no banks needed</li>
                    <li>✔ Community reviews and transparent ratings</li>
                    <li>✔ List any property globally in minutes</li>
                  </ul>
                  <a href="/explor" className="btn btn-primary btn-large mt--25">
                    Explore Properties
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right — 2×2 property image mosaic */}
          <div className="col-lg-7">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridTemplateRows: "220px 220px",
                gap: 18,
                marginTop: 0,
                padding: "18px 18px 18px 0",
              }}
            >
              {mosaic.map((item, i) => (
                <div
                  key={i}
                  style={{ position: "relative", borderRadius: 10, overflow: "hidden" }}
                >
                  <img src={item.src} alt={item.label} style={imgStyle} />
                  <div style={overlayStyle}>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#a78bfa",
                        marginBottom: 2,
                      }}
                    >
                      {item.label}
                    </span>
                    <span style={{ fontSize: "1rem", fontWeight: 700, color: "#fff" }}>
                      {item.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Featured property strip ── */}
        <div className="row mt--40 mb--20">
          <div className="col-12">
            <h5
              className="title mb--25"
              style={{ fontSize: "1rem", opacity: 0.75, fontWeight: 600 }}
            >
              More Featured Properties
            </h5>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: 18,
                padding: "8px 0 18px",
              }}
            >
              {strip.map((item, i) => (
                <div
                  key={i}
                  style={{
                    position: "relative",
                    borderRadius: 10,
                    overflow: "hidden",
                    height: 130,
                  }}
                >
                  <img src={item.src} alt={item.label} style={imgStyle} />
                  <div
                    style={{
                      ...overlayStyle,
                      padding: "8px 10px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        color: "#fff",
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
