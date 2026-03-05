import React from "react";

const INFO_CARDS = [
  {
    icon: "🏠",
    title: "Tokenized Real Estate",
    desc: "Every property on BlockEstate is minted as a unique NFT on the Ethereum blockchain. Ownership is immutable, verifiable, and transferable without banks or brokers.",
  },
  {
    icon: "🔒",
    title: "Secure Smart Contracts",
    desc: "All transactions — listings, purchases, and ownership transfers — are executed by audited smart contracts. Funds are held and released automatically with no human intervention.",
  },
  {
    icon: "🌍",
    title: "Buy Globally with Crypto",
    desc: "Purchase real estate anywhere in the world using ETH. No paperwork, no currency conversion friction, and no waiting weeks for settlement — deals close in minutes.",
  },
  {
    icon: "⭐",
    title: "Community-Driven Reviews",
    desc: "Buyers and investors leave on-chain reviews and ratings for every property. Ratings are stored permanently on-chain, making fraud and fake testimonials impossible.",
  },
];

const InfoSection = () => {
  return (
    <div className="rn-section-gapTop">
      <div className="container">
        {/* About BlockEstate intro */}
        <div className="row mb--50">
          <div className="col-lg-8 offset-lg-2 text-center">
            <h3
              data-sal="slide-up"
              data-sal-duration="800"
              data-sal-delay="100"
            >
              About BlockEstate
            </h3>
            <p
              className="color-body mt--20"
              data-sal="slide-up"
              data-sal-duration="800"
              data-sal-delay="150"
            >
              BlockEstate is a decentralized real estate marketplace built on
              the Ethereum blockchain. Founded in 2024, our mission is to make
              property ownership accessible, transparent, and borderless. We
              combine the security of blockchain technology with an intuitive
              marketplace so that anyone — regardless of geography or
              background — can buy, sell, and invest in real estate with
              confidence.
            </p>
            <p
              className="color-body mt--15"
              data-sal="slide-up"
              data-sal-duration="800"
              data-sal-delay="200"
            >
              Properties are listed as NFTs, ensuring that every record of
              ownership is publicly verifiable and tamper-proof. Our smart
              contracts enforce every rule of a transaction automatically,
              eliminating the need for lawyers, real estate agents, or escrow
              services.
            </p>
          </div>
        </div>

        {/* Feature cards */}
        <div className="row g-5">
          {INFO_CARDS.map((card, i) => (
            <div className="col-lg-3 col-md-6" key={i}>
              <div
                className="rn-about-card text-center"
                data-sal="slide-up"
                data-sal-duration="800"
                data-sal-delay={`${150 + i * 50}`}
                style={{ height: "100%" }}
              >
                <div className="inner">
                  <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
                    {card.icon}
                  </div>
                  <h5 className="title" style={{ marginBottom: "0.75rem" }}>
                    {card.title}
                  </h5>
                  <p className="color-body mb--0" style={{ fontSize: "0.9rem" }}>
                    {card.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
