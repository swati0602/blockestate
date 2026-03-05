import React from "react";
import { useRouter } from "next/router";
import { useStateContext } from "../../context/index";

const Live = ({ properties = [] }) => {
  const router = useRouter();
  const { addReviewFunction, currentAccount, notifyError } = useStateContext();

  const handleLike = async (e, productID) => {
    e.preventDefault();
    e.stopPropagation();
    if (!currentAccount) {
      notifyError("Please connect your wallet first");
      return;
    }
    if (!productID) return;
    await addReviewFunction({ productID, rating: 5, comment: "Interested" });
  };

  // Sort by productID descending — most recently added first
  const recent = [...properties]
    .sort((a, b) => (b.productID || 0) - (a.productID || 0))
    .slice(0, 5);

  if (recent.length === 0) return null;

  return (
    <div class="rn-live-bidding-area rn-section-gapTop">
      <div class="container">
        <div class="row mb--30">
          <div class="col-lg-12">
            <div class="section-title">
              <p
                style={{ color: "var(--color-body)", fontSize: "14px", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}
                data-sal-delay="100"
                data-sal="slide-up"
                data-sal-duration="800"
              >
                Browse freshly listed real estate — be the first to explore
              </p>
              <h3
                class="title mb--0 live-bidding-title"
                data-sal-delay="150"
                data-sal="slide-up"
                data-sal-duration="800"
              >
                Recently Added
              </h3>
            </div>
          </div>
        </div>
        <div class="row g-5">
          {recent.map((property, i) => (
            <div
              key={property.productID || i}
              class="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
            >
              <div
                class="product-style-one no-overlay"
                style={{ cursor: "pointer" }}
                onClick={() => router.push(`/detail?property=${property.productID}`)}
              >
                <div class="card-thumbnail">
                  <img src={property.image} alt={property.title} />
                </div>
                <div class="product-share-wrapper">
                  <div class="profile-share">
                    {property.reviewers.slice(0, 3).map((el, idx) => (
                      <a
                        key={idx}
                        class="avatar"
                        data-tooltip={`${el.slice(0, 15)}..`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <img
                          src={`/client/client-${idx + 1}.png`}
                          alt="Nft_Profile"
                        />
                      </a>
                    ))}
                    {property.reviewers.length > 0 && (
                      <a class="more-author-text" href="#" onClick={(e) => e.stopPropagation()}>
                        Interested Users
                      </a>
                    )}
                  </div>
                </div>
                <span class="product-name">
                  {property.title.length >= 25
                    ? `${property.title.slice(0, 22)}...`
                    : property.title}
                </span>
                <span class="latest-bid">Category: {property.category}</span>
                <div class="bid-react-area">
                  <div class="last-bid">{property.price} ETH</div>
                  <button
                    className="react-area"
                    style={{ background: "none", border: "none", padding: "2px 8px", cursor: "pointer" }}
                    onClick={(e) => handleLike(e, property.productID)}
                    title={currentAccount ? "Show Interest" : "Connect wallet to like"}
                  >
                    <svg viewBox="0 0 17 16" fill="none" width="16" height="16" className="sc-bdnxRM sc-hKFxyN kBvkOu">
                      <path
                        d="M8.2112 14L12.1056 9.69231L14.1853 7.39185C15.2497 6.21455 15.3683 4.46116 14.4723 3.15121V3.15121C13.3207 1.46757 10.9637 1.15351 9.41139 2.47685L8.2112 3.5L6.95566 2.42966C5.40738 1.10976 3.06841 1.3603 1.83482 2.97819V2.97819C0.777858 4.36443 0.885104 6.31329 2.08779 7.57518L8.2112 14Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      ></path>
                    </svg>
                    <span className="number">{property.reviewers.length}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Live;
