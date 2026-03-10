import React from "react";
import { Header, Footer, Copyright } from "../PageComponents/Components";
import { TransactionHistory } from "../PageComponents/TransactionPage";

const transactions = () => {
  return (
    <div className="template-color-1 nft-body-connect">
      <Header />
      <TransactionHistory />
      <Footer />
      <Copyright />
    </div>
  );
};

export default transactions;
