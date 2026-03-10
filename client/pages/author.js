import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import {
  AuthorFive,
  AuthorFour,
  AuthorOne,
  AuthorThree,
  AuthorTwo,
} from "../PageComponents/AuthorPage";
import { Header, Footer, Copyright } from "../PageComponents/Components";

import { useStateContext } from "../context/index";

const author = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [author, setAuthor] = useState([]);
  const [relistingId, setRelistingId] = useState(null);

  const { currentAccount, getUserPropertiesFunction, getPropertiesData, updatePriceFunction } =
    useStateContext();

  //GET DATA
  const fetchProperty = useCallback(async () => {
    setIsLoading(true);
    const data = await getPropertiesData();
    const dataAuthor = await getUserPropertiesFunction();
    if (data) setProperties(data);
    // Merge isSold from MongoDB so profile page knows sold status
    if (dataAuthor && dataAuthor.length > 0) {
      try {
        const dbRes = await fetch("/api/properties");
        const dbJson = await dbRes.json();
        if (dbJson.success && dbJson.data) {
          const isSoldMap = {};
          dbJson.data.forEach((p) => { isSoldMap[p.tokenId] = p.isSold; });
          setAuthor(dataAuthor.map((p) => ({ ...p, isSold: isSoldMap[p.productID] || false })));
        } else {
          setAuthor(dataAuthor);
        }
      } catch (_) {
        setAuthor(dataAuthor);
      }
    } else if (dataAuthor) {
      setAuthor(dataAuthor);
    }
    setIsLoading(false);
  }, [currentAccount]);

  //RE-LIST PROPERTY (only from profile page)
  const relistProperty = async (productID, newPrice) => {
    setRelistingId(productID);
    try {
      if (newPrice && parseFloat(newPrice) > 0) {
        await updatePriceFunction({ productID, price: newPrice });
      }
      await fetch(`/api/properties/${productID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isSold: false }),
      });
      fetchProperty();
    } catch (err) {
      console.error("Relist error:", err);
    } finally {
      setRelistingId(null);
    }
  };

  useEffect(() => {
    fetchProperty();
  }, [fetchProperty]);

  // Re-fetch whenever navigation completes (e.g. returning from /update)
  useEffect(() => {
    const handleRouteChange = () => fetchProperty();
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [fetchProperty]);

  return (
    <div
      className="template-color-1 nft-body-connect"
      style={{
        background: "#080810",
        minHeight: "100vh",
        backgroundImage: "radial-gradient(circle at 50% -20%, rgba(112,72,232,0.08) 0%, transparent 50%)",
        backgroundAttachment: "fixed"
      }}
    >
      <Header />
      <AuthorOne />
      <AuthorTwo address={currentAccount} author={author} />
      <AuthorThree
        properties={properties}
        author={author}
        relistProperty={relistProperty}
        relistingId={relistingId}
      />
      <Footer />
      <Copyright />
    </div>
  );
};

export default author;
