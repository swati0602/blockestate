import React from "react";

import {
  CreateOne,
  CreateTwo,
} from "../PageComponents/CreatePage";
import { Header, Footer, Copyright } from "../PageComponents/Components";

const CreateProperty = () => {
  return (
    <div className="template-color-1 nft-body-connect">
      <Header />
      <CreateOne title="Create Property" />
      <CreateTwo />
      <Footer />
      <Copyright />
    </div>
  );
};

export default CreateProperty;
