import React, { useState, useEffect } from "react";

//INTERNAL IMPORT
import { Title, Collection } from "../PageComponents/CollectionPage";
import { Header, Footer, Copyright } from "../PageComponents/Components";
import { useStateContext } from "../context";
import { getLiked } from "../components/PropertyCard/PropertyCard";

const CollectionPage = () => {
  const { getPropertiesData } = useStateContext();
  const [allProperties, setAllProperties] = useState([]);
  const [likedIds, setLikedIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshLiked = () => setLikedIds(getLiked());

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getPropertiesData();
        if (data && data.length > 0) setAllProperties(data);
      } catch (e) {}
      finally { setIsLoading(false); }
    };
    load();
    refreshLiked();
    window.addEventListener("storage", refreshLiked);
    return () => window.removeEventListener("storage", refreshLiked);
  }, []);

  const likedProperties = allProperties.filter((p) =>
    likedIds.includes(String(p.productID))
  );

  return (
    <div class="template-color-1 nft-body-connect">
      <Header />
      <Title title="My Collection" />
      <Collection
        likedProperties={likedProperties}
        isLoading={isLoading}
        likedIds={likedIds}
      />
      <Footer />
      <Copyright />
    </div>
  );
};

export default CollectionPage;
