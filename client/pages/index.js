import React, { useState, useEffect } from "react";

///INTERNAL IMPORT
import {
  Header,
  Banner,
  Service,
  Product,
  TopSeller,
  Collection,
  Footer,
  Copyright,
} from "../PageComponents/Components";

///INTERNAL IMPORT
import { useStateContext } from "../context/index";
import { getTopCreators } from "../utils";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState([]);

  const { currentAccount, getPropertiesData } = useStateContext();

  //GET DATA
  const fetchProperty = async () => {
    setIsLoading(true);
    const data = await getPropertiesData();

    setProperties(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProperty();
  }, []);

  //CATEGORIES
  const housing = [];
  const rental = [];
  const farmhouse = [];
  const office = [];
  const commercial = [];
  const country = [];

  if (!isLoading) {
    properties?.map((el) => {
      if (el.category === "country") {
        country.push(el);
      } else if (el.category === "Commercial") {
        commercial.push(el);
      } else if (el.category === "Office") {
        office.push(el);
      } else if (el.category === "Farmhouse") {
        farmhouse.push(el);
      } else if (el.category === "Rental") {
        rental.push(el);
      } else if (el.category === "Housing") {
        housing.push(el);
      }
    });
  }

  // const creators = getTopCreators(properties);

 return (
  <div className="template-color-1 nft-body-connect">
    <Header />
    <Banner />

    <Service />
    <Product properties={properties || []} />

    <Collection
      housing={housing.length}
      rental={rental.length}
      farmhouse={farmhouse.length}
      office={office.length}
    />

    <Footer />
    <Copyright />
  </div>
);
};

export default Index;
