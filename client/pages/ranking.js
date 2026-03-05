import React, { useState, useEffect } from "react";
import { Header, Footer, Copyright } from "../PageComponents/Components";
import { RankingOne, RankingTwo } from "../PageComponents/RankingPage";
import { useStateContext } from "../context";

const Ranking = () => {
  const { getPropertiesData } = useStateContext();
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getPropertiesData();
        if (data && data.length > 0) setProperties(data);
      } catch (e) {}
      finally { setIsLoading(false); }
    };
    load();
  }, []);

  return (
    <div class="template-color-1 nft-body-connect">
      <Header />
      <RankingOne />
      <RankingTwo properties={properties} isLoading={isLoading} />
      <Footer />
      <Copyright />
    </div>
  );
};

export default Ranking;
