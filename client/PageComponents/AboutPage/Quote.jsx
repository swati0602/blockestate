import React from "react";

const Quote = () => {
  return (
    <div className="rn-about-Quote-area rn-section-gapTop">
      <div className="container">
        <div className="row g-5 d-flex align-items-center">
          <div className="col-lg-6">
            <div className="rn-about-title-wrapper">
              <h3
                className="title"
                data-sal="slide-up"
                data-sal-duration="800"
                data-sal-delay="150"
              >
                List, Buy &amp; Sell Tokenized Real Estate on BlockEstate —
                Fully On-Chain
              </h3>
            </div>
          </div>
          <div className="col-lg-6">
            <div
              className="rn-about-wrapper"
              data-sal="slide-up"
              data-sal-duration="800"
              data-sal-delay="150"
            >
              <p>
                BlockEstate brings the global real estate market on-chain.
                Property listings are minted as NFTs, giving every buyer proof
                of authentic ownership stored permanently on the Ethereum
                blockchain. Our platform connects buyers, sellers, and investors
                worldwide — with zero paperwork, transparent pricing, and
                instant settlement powered by smart contracts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;
