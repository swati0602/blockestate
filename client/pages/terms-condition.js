import React from "react";

//INTERNAL IMPORT
import { Header, Footer, Copyright } from "../PageComponents/Components";
import { TermsOne, TermsTwo } from "../PageComponents/TermsPage";

const TermsCondition = () => {
  return (
    <div class="template-color-1 nft-body-connect">
      <Header />
      <TermsOne />
      <TermsTwo />
      <Footer />
      <Copyright />
    </div>
  );
};

export default TermsCondition;
