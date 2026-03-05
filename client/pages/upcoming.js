import React, { useEffect, useState } from "react";

//INTERNAL IMPORT
import { Header, Footer, Copyright } from "../PageComponents/Components";
import { UpcomingOne, UpcomingTwo } from "../PageComponents/UpcomingPage";
import { useStateContext } from "../context";

const upcoming = () => {
  const { getPropertiesData } = useStateContext();
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getPropertiesData();
        // Sort newest first
        const sorted = [...(data || [])].sort(
          (a, b) =>
            Number(b.createdAt || 0) - Number(a.createdAt || 0)
        );
        setProperties(sorted);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div class="template-color-1 nft-body-connect">
      <Header />
      <UpcomingOne />
      <UpcomingTwo properties={properties} isLoading={isLoading} />
      <Footer />
      <Copyright />
    </div>
  );
};

export default upcoming;
