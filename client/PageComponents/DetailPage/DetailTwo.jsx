import React, { useState } from "react";
import { Loader } from "../../PageComponents/Components";

const DetailTwo = ({
  property,
  parsedReviews,
  setLikeReviews,
  likeReviews,
  likeReviewCall,
  buyingProperty,
  address,
  isLoading,
  buyLoading,
  createReview,
  handleFormFieldChange,
  commentLoading,
}) => {
  const [activeTab, setActiveTab] = useState("details");
  return (
    <div class="product-details-area rn-section-gapTop">
      <div class="container">
        <div class="row g-5">
          <div class="col-lg-7 col-md-12 col-sm-12">
            <div class="product-tab-wrapper rbt-sticky-top-adjust">
              <div class="pd-tab-inner">
                <div
                  class="nav rn-pd-nav rn-pd-rt-content nav-pills"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <button
                    class="nav-link active"
                    id="v-pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-home"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-home"
                    aria-selected="true"
                  >
                    <span class="rn-pd-sm-thumbnail">
                      <img
                        src="/portfolio/portfolio-01.jpg"
                        alt="Nft_Profile"
                      />
                    </span>
                  </button>
                  <button
                    class="nav-link"
                    id="v-pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-profile"
                    aria-selected="false"
                  >
                    <span class="rn-pd-sm-thumbnail">
                      <img
                        src="/portfolio/portfolio-02.jpg"
                        alt="Nft_Profile"
                      />
                    </span>
                  </button>
                  <button
                    class="nav-link"
                    id="v-pills-messages-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-messages"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-messages"
                    aria-selected="false"
                  >
                    <span class="rn-pd-sm-thumbnail">
                      <img
                        src="/portfolio/portfolio-03.jpg"
                        alt="Nft_Profile"
                      />
                    </span>
                  </button>
                </div>

                <div class="tab-content rn-pd-content" id="v-pills-tabContent">
                  <div
                    class="tab-pane fade show active"
                    id="v-pills-home"
                    role="tabpanel"
                    aria-labelledby="v-pills-home-tab"
                  >
                    <div class="rn-pd-thumbnail">
                      {isLoading ? (
                        <Loader />
                      ) : (
                        <img src={property?.image} alt="Nft_Profile" />
                      )}
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="v-pills-profile"
                    role="tabpanel"
                    aria-labelledby="v-pills-profile-tab"
                  >
                    <div class="rn-pd-thumbnail">
                      <img
                        src="/portfolio/portfolio-02.jpg"
                        alt="Nft_Profile"
                      />
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="v-pills-messages"
                    role="tabpanel"
                    aria-labelledby="v-pills-messages-tab"
                  >
                    <div class="rn-pd-thumbnail">
                      <img
                        src="/portfolio/portfolio-03.jpg"
                        alt="Nft_Profile"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-5 col-md-12 col-sm-12 mt_md--50 mt_sm--60">
            <div class="rn-pd-content-area">
              <div class="pd-title-area">
                <h4 class="title">{property?.title?.slice(0, 25)}..</h4>
                <div class="pd-react-area">
                  <div class="heart-count">
                    <span>{parsedReviews?.length}</span>
                  </div>
                  <div class="count">
                    <div class="share-btn share-btn-activation dropdown">
                      <button
                        class="icon"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <svg
                          viewBox="0 0 14 4"
                          fill="none"
                          width="16"
                          height="16"
                          class="sc-bdnxRM sc-hKFxyN hOiKLt"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M3.5 2C3.5 2.82843 2.82843 3.5 2 3.5C1.17157 3.5 0.5 2.82843 0.5 2C0.5 1.17157 1.17157 0.5 2 0.5C2.82843 0.5 3.5 1.17157 3.5 2ZM8.5 2C8.5 2.82843 7.82843 3.5 7 3.5C6.17157 3.5 5.5 2.82843 5.5 2C5.5 1.17157 6.17157 0.5 7 0.5C7.82843 0.5 8.5 1.17157 8.5 2ZM11.999 3.5C12.8274 3.5 13.499 2.82843 13.499 2C13.499 1.17157 12.8274 0.5 11.999 0.5C11.1706 0.5 10.499 1.17157 10.499 2C10.499 2.82843 11.1706 3.5 11.999 3.5Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </button>

                      <div class="share-btn-setting dropdown-menu dropdown-menu-end">
                        <button
                          type="button"
                          class="btn-setting-text share-text"
                          data-bs-toggle="modal"
                          data-bs-target="#shareModal"
                        >
                          Share
                        </button>
                        {property?.owner == address && (
                          <button
                            type="button"
                            class="btn-setting-text report-text"
                            data-bs-toggle="modal"
                            data-bs-target="#reportModal"
                          >
                            Update Price
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h6 class="title-name">
                #{property?.productID} Portal , Info bellow
              </h6>
              <div class="catagory-collection">
                <div class="catagory">
                  <span>
                    Catagory <span class="color-body">10% royalties</span>
                  </span>
                  <div class="top-seller-inner-one">
                    <div class="top-seller-wrapper">
                      <div class="thumbnail">
                        <a href="#">
                          <img src="/client/client-1.png" alt="Nft_Profile" />
                        </a>
                      </div>
                      <div class="top-seller-content">
                        <a href="#">
                          <h6 class="name">Only 10% Own</h6>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="collection">
                  <span>Collections</span>
                  <div class="top-seller-inner-one">
                    <div class="top-seller-wrapper">
                      <div class="thumbnail">
                        <a href="#">
                          <img src="/client/client-2.png" alt="Nft_Profile" />
                        </a>
                      </div>
                      <div class="top-seller-content">
                        <a href="#">
                          <h6 class="name">{property?.category}</h6>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="rn-bid-details">
                <div class="tab-wrapper-one">
                  <nav class="tab-button-one">
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                      <button
                        type="button"
                        className={`nav-link${activeTab === "comments" ? " active" : ""}`}
                        onClick={() => setActiveTab("comments")}
                      >
                        Comments ({parsedReviews?.length || 0})
                      </button>
                      <button
                        type="button"
                        className={`nav-link${activeTab === "details" ? " active" : ""}`}
                        onClick={() => setActiveTab("details")}
                      >
                        Details
                      </button>
                      <button
                        type="button"
                        className={`nav-link${activeTab === "interest" ? " active" : ""}`}
                        onClick={() => setActiveTab("interest")}
                      >
                        Users Interest ({property?.reviewers?.length || 0})
                      </button>
                    </div>
                  </nav>
                  <div class="tab-content rn-bid-content">

                    {/* ── Comments ── */}
                    {activeTab === "comments" && (
                      <div class="tab-pane fade show active">
                        {!parsedReviews?.length ? (
                          <p style={{ color: "#aaa", padding: "16px 0" }}>No comments yet. Be the first to comment!</p>
                        ) : (
                          parsedReviews.map((review, i) => (
                            <div
                              key={i}
                              class="top-seller-inner-one"
                              onClick={() => setLikeReviews({ ...likeReviews, reviewIndex: review.reviewIndex })}
                            >
                              <div class="top-seller-wrapper">
                                <div class="thumbnail">
                                  <a href="#">
                                    <img src={`/client/client-${(i % 15) + 1}.png`} alt="Nft_Profile" />
                                  </a>
                                </div>
                                <div class="top-seller-content">
                                  <span style={{ fontSize: "0.78rem", color: "#aaa" }}>
                                    {review?.reviewer?.slice(0, 18)}...
                                  </span>
                                  <div style={{ display: "flex", alignItems: "center", gap: "8px", margin: "4px 0" }}>
                                    <span style={{ color: "#f5c518", fontSize: "0.85rem" }}>
                                      {"★".repeat(Number(review?.rating) || 0)}{"☆".repeat(5 - (Number(review?.rating) || 0))}
                                    </span>
                                    <div
                                      class="react-area"
                                      style={{ cursor: "pointer" }}
                                      onClick={(e) => { e.stopPropagation(); likeReviewCall(property, i); }}
                                    >
                                      <svg viewBox="0 0 17 16" fill="none" width="14" height="14" class="sc-bdnxRM sc-hKFxyN kBvkOu">
                                        <path d="M8.2112 14L12.1056 9.69231L14.1853 7.39185C15.2497 6.21455 15.3683 4.46116 14.4723 3.15121V3.15121C13.3207 1.46757 10.9637 1.15351 9.41139 2.47685L8.2112 3.5L6.95566 2.42966C5.40738 1.10976 3.06841 1.3603 1.83482 2.97819V2.97819C0.777858 4.36443 0.885104 6.31329 2.08779 7.57518L8.2112 14Z" stroke="currentColor" stroke-width="2"></path>
                                      </svg>
                                      <span class="number" style={{ fontSize: "0.78rem", marginLeft: "3px" }}>{review?.likes}</span>
                                    </div>
                                  </div>
                                  <span class="count-number" style={{ fontSize: "0.88rem", color: "#ddd" }}>
                                    {review?.comment}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    )}

                    {/* ── Details ── */}
                    {activeTab === "details" && (
                      <div class="tab-pane fade show active">
                        <div class="rn-pd-bd-wrapper">
                          <div class="top-seller-inner-one">
                            <h6 class="name-title">Owner</h6>
                            <div class="top-seller-wrapper">
                              <div class="thumbnail">
                                <a href="#"><img src="/client/client-1.png" alt="Nft_Profile" /></a>
                              </div>
                              <div class="top-seller-content">
                                <a href="#"><h6 class="name">{property?.owner?.slice(0, 20)}..</h6></a>
                              </div>
                            </div>
                          </div>
                          <div class="rn-pd-sm-property-wrapper">
                            <div class="pd-property-inner">
                              <h6 class="pd-property-title">Title</h6>
                              <span class="color-white value">{property?.title}</span>
                            </div>
                            <div class="pd-property-inner">
                              <h6 class="pd-property-title">Description</h6>
                              <span class="color-white value">{property?.description}</span>
                            </div>
                            <div class="pd-property-inner">
                              <h6 class="pd-property-title">Address</h6>
                              <span class="color-white value">{property?.address}</span>
                            </div>
                            <div class="pd-property-inner">
                              <h6 class="pd-property-title">Price: {property?.price} ETH</h6>
                            </div>
                            <div class="pd-property-inner">
                              <h6 class="pd-property-title">Property ID: {property?.productID}</h6>
                            </div>
                          </div>
                          <div class="rn-pd-sm-property-wrapper">
                            <h6 class="pd-property-title">Category</h6>
                            <div class="catagory-wrapper">
                              <div class="pd-property-inner">
                                <span class="color-body type">TYPE</span>
                                <span class="color-white value">{property?.category}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ── Users Interest ── */}
                    {activeTab === "interest" && (
                      <div class="tab-pane fade show active">
                        {!property?.reviewers?.length ? (
                          <p style={{ color: "#aaa", padding: "16px 0" }}>No users have shown interest yet.</p>
                        ) : (
                          <>
                            <p style={{ color: "#aaa", fontSize: "0.85rem", marginBottom: "12px" }}>
                              {property.reviewers.length} user{property.reviewers.length !== 1 ? "s" : ""} interested
                            </p>
                            {property.reviewers.map((reviewer, i) => {
                              const totalLikes = parsedReviews
                                ?.filter((r) => r.reviewer?.toLowerCase() === reviewer?.toLowerCase())
                                .reduce((acc, r) => acc + Number(r.likes || 0), 0);
                              return (
                                <div key={i} class="top-seller-inner-one">
                                  <div class="top-seller-wrapper">
                                    <div class="thumbnail">
                                      <a href="#"><img src={`/client/client-${(i % 15) + 1}.png`} alt="Nft_Profile" /></a>
                                    </div>
                                    <div class="top-seller-content">
                                      <span class="count-number">{reviewer?.slice(0, 25)}...</span>
                                      <span style={{ fontSize: "0.78rem", color: "#aaa" }}>
                                        {totalLikes > 0 ? `${totalLikes} like${totalLikes !== 1 ? "s" : ""}` : "No likes yet"}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </>
                        )}
                      </div>
                    )}

                  </div>
                </div>
                <div class="place-bet-area">
                  <div class="rn-bet-create">
                    <div class="bid-list winning-bid">
                      <h6 class="title">Recent Comment</h6>
                      {parsedReviews
                        ?.reverse()
                        .map((recentReview, i) => (
                          <div class="top-seller-inner-one">
                            <div class="top-seller-wrapper">
                              <div class="thumbnail">
                                <a href="#">
                                  <img
                                    src="/client/client-7.png"
                                    alt="Nft_Profile"
                                  />
                                </a>
                              </div>
                              <div class="top-seller-content">
                                <span class="heighest-bid">
                                  {recentReview?.reviewer.slice(0, 20)}...
                                </span>
                                <span class="count-number">
                                  {" "}
                                  {recentReview?.comment.length >= 50
                                    ? `${recentReview?.comment.slice(0, 60)}...`
                                    : recentReview?.comment}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))
                        .slice(0, 1)}
                    </div>
                    <div class="bid-list left-bid">
                      <h6 class="title">Property Stats</h6>
                      <div class=" mt--15" data-date="2025-12-09">
                        <div class="countdown-container days">
                          <span class="countdown-value">Price: </span>
                          <span class="countdown-heading">
                            {property?.price} ETH
                          </span>
                        </div>
                        <div class="countdown-container hours">
                          <span class="countdown-value">Comments: </span>
                          <span class="countdown-heading">
                            {parsedReviews?.length}
                          </span>
                        </div>
                        <div class="countdown-container minutes">
                          <span class="countdown-value"> Interest: </span>
                          <span class="countdown-heading">
                            {parsedReviews?.length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => buyingProperty()}
                    type="button"
                    class="btn btn-primary-alta mt--30"
                  >
                    {buyLoading ? (
                      <Loader />
                    ) : (
                      <>
                        {address == property?.owner
                          ? "You can't buy your owned Property"
                          : `${property?.price} ETH Buy Property`}
                      </>
                    )}
                  </button>

                  {/* ── Inline Add Comment ── */}
                  <div style={{ marginTop: "24px", background: "#1a1a2e", borderRadius: "10px", padding: "20px", border: "1px solid #333" }}>
                    <h6 style={{ marginBottom: "12px", color: "#fff" }}>Add a Comment</h6>
                    <div style={{ marginBottom: "10px" }}>
                      <label style={{ fontSize: "0.8rem", color: "#aaa", display: "block", marginBottom: "4px" }}>Rating (1–5)</label>
                      <select
                        onChange={(e) => handleFormFieldChange("rating", e)}
                        style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", background: "#0d0d1a", border: "1px solid #555", color: "#fff", fontSize: "0.9rem" }}
                      >
                        <option value="5">⭐⭐⭐⭐⭐ (5)</option>
                        <option value="4">⭐⭐⭐⭐ (4)</option>
                        <option value="3">⭐⭐⭐ (3)</option>
                        <option value="2">⭐⭐ (2)</option>
                        <option value="1">⭐ (1)</option>
                      </select>
                    </div>
                    <div style={{ marginBottom: "12px" }}>
                      <label style={{ fontSize: "0.8rem", color: "#aaa", display: "block", marginBottom: "4px" }}>Comment</label>
                      <textarea
                        rows={3}
                        placeholder="Write your comment..."
                        onChange={(e) => handleFormFieldChange("comment", e)}
                        style={{ width: "100%", padding: "10px 12px", borderRadius: "6px", background: "#0d0d1a", border: "1px solid #555", color: "#fff", fontSize: "0.9rem", resize: "vertical" }}
                      />
                    </div>
                    <button
                      type="button"
                      class="btn btn-primary-alta"
                      style={{ width: "100%" }}
                      onClick={() => createReview()}
                      disabled={commentLoading}
                    >
                      {commentLoading ? <Loader /> : "Submit Comment"}
                    </button>
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

export default DetailTwo;
