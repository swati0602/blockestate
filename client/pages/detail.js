import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import { Header, Footer, Copyright } from "../PageComponents/Components";
import {
  DetailEight,
  DetailFive,
  DetailFour,
  DetailOne,
  DetailSeven,
  DetailSix,
  DetailThree,
  DetailTwo,
} from "../PageComponents/DetailPage";

import { Loader, GlobalLoder } from "../PageComponents/Components";

import { useStateContext } from "../context/index";

const detail = () => {
  const [property, setProperty] = useState();
  const [parsedReviews, setParsedReviews] = useState();
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatePriceLoading, setUpdatePriceLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [interestLoading, setInterestLoading] = useState(false);
  const [buyLoading, setBuyLoading] = useState(false);

  const {
    currentAccount,
    addReviewFunction,
    getProductReviewsFunction,
    likeReviewFunction,
    buyPropertyFunction,
    getPropertyFunction,
    getPropertiesData,
    updatePriceFunction,
    loader,
  } = useStateContext();

  const router = useRouter();
  const { query } = router;

  //GET PROPERTY DATA
  const fetchProperty = async () => {
    const data = await getPropertyFunction(query.property);
    const dataReviews = await getProductReviewsFunction(query.property);
    const dataProperties = await getPropertiesData();
    setProperties(dataProperties);

    // Merge isSold from MongoDB so the UI knows if already purchased
    try {
      const dbRes = await fetch(`/api/properties/${query.property}`);
      const dbJson = await dbRes.json();
      if (dbJson.success && dbJson.data) {
        setProperty({
          ...data,
          isSold:  dbJson.data.isSold,
          owner:   dbJson.data.owner  || data?.owner,
          seller:  dbJson.data.seller || data?.owner, // original lister, fallback to owner
          interestedUsers: dbJson.data.interestedUsers || [],
        });
      } else {
        setProperty(data);
      }
    } catch (_) {
      setProperty(data);
    }

    setParsedReviews(dataReviews);
    setIsLoading(false);
  };

  useEffect(() => {
    if (query) fetchProperty();
  }, [query]);

  //ADD REVIEW
  const [review, setReview] = useState({
    productID: "",
    rating: 4,
    comment: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setReview({ ...review, [fieldName]: e.target.value });
  };

  const createReview = async () => {
    setCommentLoading(true);
    const data = await addReviewFunction({
      ...review,
      productID: property.productID,
    });
    setCommentLoading(false);
  };

  const toggleInterest = async () => {
    if (!currentAccount || !property?.productID) return;

    const wallet = currentAccount.toLowerCase();
    const interestedUsers = property?.interestedUsers || [];
    const alreadyInterested = interestedUsers.includes(wallet);

    setInterestLoading(true);
    try {
      await fetch(`/api/properties/${property.productID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          alreadyInterested
            ? { $pull: { interestedUsers: wallet } }
            : { $addToSet: { interestedUsers: wallet } }
        ),
      });

      await fetch(`/api/users/${wallet}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          alreadyInterested
            ? { $pull: { interestedProperties: property.productID } }
            : { $addToSet: { interestedProperties: property.productID } }
        ),
      });

      setProperty((prev) => {
        const prevList = prev?.interestedUsers || [];
        return {
          ...prev,
          interestedUsers: alreadyInterested
            ? prevList.filter((a) => a !== wallet)
            : [...new Set([...prevList, wallet])],
        };
      });
    } finally {
      setInterestLoading(false);
    }
  };

  //LIKE REVIEW
  const [likeReviews, setLikeReviews] = useState({
    productID: "",
    reviewIndex: "",
  });
  const likeReviewCall = async (property, reviewIndex) => {
    const data = await likeReviewFunction(property.productID, reviewIndex);
  };

  //BUY PROPERTY
  const buying = {
    productID: property?.productID,
    amount: property?.price,
    owner: property?.owner,
    seller: property?.seller, // original lister — used to block self-purchase
  };
  const buyingProperty = async () => {
    setBuyLoading(true);
    const data = await buyPropertyFunction(buying);
    setBuyLoading(false);
  };

  //UPDATE PRICE
  const [updatePropertyPrice, setUpdatePropertyPrice] = useState({
    productID: property?.productID,
    price: "",
  });
  const updatepropertyPrice = async () => {
    setUpdatePriceLoading(true);
    const data = await updatePriceFunction({
      ...updatePropertyPrice,
      productID: property?.productID,
    });
    setUpdatePriceLoading(false);
    window.location.reload();
  };
  //
  return (
    <div class="template-color-1 nft-body-connect">
      <Header />
      <DetailOne />

      <DetailTwo
        property={property}
        parsedReviews={parsedReviews}
        setLikeReviews={setLikeReviews}
        likeReviewCall={likeReviewCall}
        buyingProperty={buyingProperty}
        toggleInterest={toggleInterest}
        interestLoading={interestLoading}
        isInterested={Boolean(currentAccount && property?.interestedUsers?.includes(currentAccount.toLowerCase()))}
        address={currentAccount}
        isLoading={isLoading}
        buyLoading={buyLoading}
        createReview={createReview}
        handleFormFieldChange={handleFormFieldChange}
        commentLoading={commentLoading}
      />

      <DetailThree properties={properties} />
      <DetailFive />
      <DetailSix />
      <DetailSeven
        property={property}
        setUpdatePropertyPrice={setUpdatePropertyPrice}
        updatepropertyPrice={updatepropertyPrice}
        updatePriceLoading={updatePriceLoading}
      />
      <DetailEight
        createReview={createReview}
        handleFormFieldChange={handleFormFieldChange}
        commentLoading={commentLoading}
      />

      <Footer />
      <Copyright />
      {loader && <GlobalLoder />}
    </div>
  );
};

export default detail;
