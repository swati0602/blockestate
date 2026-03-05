import React from "react";

//INTERNAL IMPORT
import {
  ContactOne,
  ContactThree,
  ContactTwo,
} from "../PageComponents/ContactPage";
import { Header, Footer, Copyright } from "../PageComponents/Components";
import ContactFour from "../PageComponents/ContactPage/ContactFour";
const contact = () => {
  return (
    <div className="template-color-1 nft-body-connect">
      <Header />
      <ContactOne />
      <ContactTwo />
      <ContactThree />
      <ContactFour />
      <Footer />
      <Copyright />
    </div>
  );
};

export default contact;
