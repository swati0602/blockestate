import React from "react";

const Action = () => {
  return (
    <div className="rn-callto-action rn-section-gapTop">
      <div className="container-fluid about-fluidimg-cta">
        <div className="row">
          <div className="col-lg-12">
            <div
              className="bg_image--6 bg_image bg-image-border"
              data-black-overlay="7"
            >
              <div className="row">
                <div className="col-lg-12">
                  <div className="call-to-action-wrapper">
                    <h3
                      data-sal="slide-up"
                      data-sal-duration="800"
                      data-sal-delay="150"
                    >
                      List Your Property Today <br /> and Reach Global Buyers
                    </h3>
                    <p
                      data-sal="slide-up"
                      data-sal-duration="800"
                      data-sal-delay="150"
                    >
                      BlockEstate makes it effortless to tokenize and list any
                      property as an NFT. Reach thousands of crypto-enabled
                      buyers worldwide, receive payment instantly in ETH, and
                      transfer ownership in minutes — all secured by smart
                      contracts.
                    </p>
                    <div
                      className="callto-action-btn-wrapper"
                      data-sal="slide-up"
                      data-sal-duration="800"
                      data-sal-delay="150"
                    >
                      <a href="/create" className="btn btn-primary btn-large">
                        List a Property
                      </a>
                      <a
                        href="/contact"
                        className="btn btn-primary-alta btn-large"
                      >
                        Contact Us
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Action;
