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

  const { currentAccount, getUserPropertiesFunction, getPropertiesData } =
    useStateContext();

  //GET DATA
  const fetchProperty = useCallback(async () => {
    setIsLoading(true);
    const data = await getPropertiesData();
    const dataAuthor = await getUserPropertiesFunction();
    if (dataAuthor) setAuthor(dataAuthor);
    if (data) setProperties(data);
    setIsLoading(false);
  }, [currentAccount]);

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
      <AuthorThree properties={properties} author={author} />
      <Footer />
      <Copyright />
    </div>
  );
};

export default author;
