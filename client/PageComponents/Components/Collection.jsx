import React from "react";
import Link from "next/link";

const ICONS = ["feather-home", "feather-briefcase", "feather-sun", "feather-key"];

const Collection = ({ housing = 0, rental = 0, farmhouse = 0, office = 0 }) => {
  const categories = [
    { name: "Housing",   link: "/housing",   count: housing,   icon: ICONS[0], img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&auto=format&fit=crop" },
    { name: "Office",    link: "/office",    count: office,    icon: ICONS[1], img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop" },
    { name: "Farmhouse", link: "/farmhouse", count: farmhouse, icon: ICONS[2], img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop" },
    { name: "Rental",    link: "/rental",    count: rental,    icon: ICONS[3], img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop" },
  ];

  return (
    <div style={{ padding: "80px 0", background: "#0d0d1a" }}>
      <div class="container">

        {/* Header */}
        <div class="row mb--40 align-items-end">
          <div class="col-lg-7">
            <p style={{ color: "#7048e8", fontSize: "16px", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "10px" }}>
              Categories
            </p>
            <h3 style={{ color: "#fff", fontSize: "clamp(1.7rem,3vw,2.3rem)", fontWeight: 700, margin: 0 }}>
              Browse properties by category
            </h3>
          </div>
          <div class="col-lg-5 text-lg-end mt_mobile--16">
            <Link legacyBehavior href="/explor">
              <a style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "13px 30px",
                borderRadius: "50px",
                background: "linear-gradient(135deg, #7048e8 0%, #4f9cf9 100%)",
                color: "#fff",
                fontWeight: 600,
                fontSize: "0.95rem",
                letterSpacing: "0.04em",
                boxShadow: "0 4px 20px rgba(112,72,232,0.45)",
                transition: "transform 0.2s, box-shadow 0.2s",
                textDecoration: "none",
                border: "none",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 8px 28px rgba(112,72,232,0.6)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 4px 20px rgba(112,72,232,0.45)"; }}>
                View All Properties →
              </a>
            </Link>
          </div>
        </div>

        {/* Cards */}
        <div class="row g-4">
          {categories.map((cat, i) => (
            <div key={i} class="col-lg-3 col-md-6 col-sm-6 col-12">
              <Link legacyBehavior href={{ pathname: `/category${cat.link}`, query: { name: cat.name } }}>
                <a style={{ display: "block", textDecoration: "none" }}>
                  <div
                    style={{
                      position: "relative", borderRadius: "16px", overflow: "hidden",
                      height: "280px", cursor: "pointer",
                      boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                      transition: "transform 0.3s, box-shadow 0.3s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = "0 20px 48px rgba(112,72,232,0.3)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.4)"; }}
                  >
                    <img src={cat.img} alt={cat.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    {/* gradient */}
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 55%)" }} />
                    {/* top badge */}
                    <div style={{
                      position: "absolute", top: "16px", right: "16px",
                      background: "rgba(13,13,26,0.7)", backdropFilter: "blur(8px)",
                      border: "1px solid rgba(112,72,232,0.4)", borderRadius: "50px",
                      padding: "4px 12px", fontSize: "1.05rem", color: "#a78bfa", fontWeight: 600,
                    }}>
                      {cat.count} listings
                    </div>
                    {/* bottom info */}
                    <div style={{ position: "absolute", bottom: "20px", left: "20px", right: "20px" }}>
                      <div style={{
                        width: "40px", height: "40px", borderRadius: "10px",
                        background: "rgba(112,72,232,0.25)", display: "flex",
                        alignItems: "center", justifyContent: "center", marginBottom: "10px",
                      }}>
                        <i class={cat.icon} style={{ color: "#a78bfa", fontSize: "21px" }} />
                      </div>
                      <div style={{ color: "#fff", fontWeight: 700, fontSize: "1.3rem" }}>{cat.name}</div>
                      <div style={{ color: "#a0aec0", fontSize: "1.08rem", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
                        <i class="feather-arrow-right" style={{ color: "#7048e8" }} />
                        Explore category
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Collection;
