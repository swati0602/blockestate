import React from "react";

//INTERNAL IMPORT
import { Header, Footer, Copyright } from "../PageComponents/Components";
import {
  Banner,
  Statistick,
  HowItWorks,
} from "../PageComponents/AboutPage";

const about = () => {
  return (
    <div class="template-color-1 nft-body-connect">
      <Header />
      <Banner />
      <HowItWorks />
      <Statistick />
      <Footer />
      <Copyright />
    </div>
  );
};

export default about;
