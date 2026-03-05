import React from "react";

const TermsTwo = () => {
  return (
    <div class="rn-privacy-policy-area rn-section-gapTop">
      <div class="container">
        <div class="row mb_dec--50">
          <div class="offset-lg-2 col-lg-8">
            <div class="privacy-wrapper">

              <h4>Welcome to BlockEstate</h4>
              <p>
                By accessing or using the BlockEstate platform — a blockchain-based real
                estate marketplace — you agree to be bound by these Terms &amp; Conditions.
                Please read them carefully before listing, purchasing, or interacting with
                any property asset on the platform.
              </p>

              <h4>1. Acceptance of Terms</h4>
              <ol>
                <li>
                  By connecting your wallet and using BlockEstate, you confirm that you are
                  at least 18 years of age and have the legal capacity to enter into a
                  binding agreement.
                </li>
                <li>
                  BlockEstate reserves the right to update these terms at any time.
                  Continued use of the platform after changes constitutes your acceptance
                  of the revised terms.
                </li>
                <li>
                  These terms govern your use of the BlockEstate website, smart contracts,
                  and any associated services or APIs.
                </li>
              </ol>

              <h4>2. Blockchain Transactions</h4>
              <ol>
                <li>
                  All property listings and transactions on BlockEstate are recorded on the
                  blockchain and are irreversible. Once confirmed, a transaction cannot be
                  cancelled, reversed, or refunded.
                </li>
                <li>
                  You are solely responsible for ensuring the accuracy of any transaction
                  details — including property price, wallet address, and metadata — before
                  signing with your wallet.
                </li>
                <li>
                  BlockEstate does not control the underlying blockchain network and cannot
                  guarantee transaction speeds or gas fee amounts. Network congestion may
                  affect your experience.
                </li>
              </ol>

              <h4>3. Property Listings</h4>
              <ol>
                <li>
                  Users who list properties on BlockEstate affirm that they have the legal
                  right to tokenise and sell the property, and that all provided information
                  (title, price, images, description) is accurate and not misleading.
                </li>
                <li>
                  BlockEstate reserves the right to remove any listing that violates these
                  terms, infringes on third-party rights, or is deemed fraudulent.
                </li>
                <li>
                  Listing a property on BlockEstate does not constitute legal transfer of
                  real-world ownership unless explicitly accompanied by the required
                  off-chain legal documentation in your jurisdiction.
                </li>
              </ol>

              <h4>4. Intellectual Property</h4>
              <ol>
                <li>
                  All content on the BlockEstate platform — including the brand, UI design,
                  smart contract code, and documentation — is the intellectual property of
                  BlockEstate and may not be copied or redistributed without permission.
                </li>
                <li>
                  Users retain ownership of property images and descriptions they upload,
                  but grant BlockEstate a non-exclusive licence to display this content on
                  the platform.
                </li>
              </ol>

              <h4>5. Limitation of Liability</h4>
              <ol>
                <li>
                  BlockEstate is provided "as is" without warranties of any kind. We are
                  not liable for any financial loss arising from the use of the platform,
                  including but not limited to smart contract bugs, wallet compromise, or
                  market volatility.
                </li>
                <li>
                  Users interact with the blockchain at their own risk. BlockEstate strongly
                  recommends using a hardware wallet and conducting independent due diligence
                  before any transaction.
                </li>
              </ol>

              <h4>6. Contact</h4>
              <p>
                If you have any questions about these Terms &amp; Conditions, please reach
                out via our{" "}
                <a href="/contact" style={{ color: "#6366f1" }}>Contact page</a>.
              </p>

              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "1.2rem", marginTop: "30px" }}>
                Last updated: February 2026
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsTwo;
