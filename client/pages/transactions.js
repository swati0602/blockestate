import React from "react";
import dynamic from "next/dynamic";
import { Header, Footer, Copyright } from "../PageComponents/Components";

const TransactionHistory = dynamic(
  () => import("../PageComponents/TransactionPage").then((m) => m.TransactionHistory),
  { ssr: false }
);

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
