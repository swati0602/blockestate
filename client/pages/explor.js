import React, { useState, useEffect } from "react";

//INTERNAL IMPORT
import { Header, Footer, Copyright, Product } from "../PageComponents/Components";
import { ExplorOne } from "../PageComponents/ExplorePage";
import { useStateContext } from "../context/index";

const explor = () => {
  const [properties, setProperties] = useState([]);
  const { getPropertiesData } = useStateContext();

  useEffect(() => {
    getPropertiesData().then((data) => setProperties(data || []));
  }, []);

  return (
    <div className="template-color-1 nft-body-connect">
      <Header />
      <ExplorOne />
      <Product properties={properties} />
      <Footer />
      <Copyright />
    </div>
  );
};

export default explor;
