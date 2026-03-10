import React, { useState, useEffect } from "react";

//INTERNAL IMPORT
import { Header, Footer, Copyright, Product } from "../PageComponents/Components";
import { ExplorOne } from "../PageComponents/ExplorePage";
import { useStateContext } from "../context/index";

const explor = () => {
  const [properties, setProperties] = useState([]);
  const { getPropertiesData } = useStateContext();

  useEffect(() => {
    const load = async () => {
      const data = await getPropertiesData();
      if (!data) return setProperties([]);

      // Merge isSold from MongoDB
      try {
        const res = await fetch("/api/properties");
        if (res.ok) {
          const json = await res.json();
          const dbList = json.data || json;
          const isSoldMap = {};
          dbList.forEach((p) => { if (p.tokenId != null) isSoldMap[p.tokenId] = p.isSold || false; });
          setProperties(data.map((p) => ({ ...p, isSold: isSoldMap[p.productID] || false })));
        } else {
          setProperties(data);
        }
      } catch (_) {
        setProperties(data);
      }
    };
    load();
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
