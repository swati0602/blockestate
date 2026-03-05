import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

//INTERNAL IMPORT
import { CreateOne } from "../PageComponents/CreatePage";
import {
  Header,
  Footer,
  Copyright,
  Loader,
  GlobalLoder,
} from "../PageComponents/Components";
import { useStateContext } from "../context/index";
import { checkIfImage } from "../utils";

const categories = [
  "Housing",
  "Rental",
  "Farmhouse",
  "Office",
  "Commercial",
  "Country",
];

const create = () => {
  const router = useRouter();
  const { query } = router;

  ///STATE VARIABLE
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [file, setFile] = useState(null);
  const [diplayImg, setDiplayImg] = useState(null);
  const [fileName, setFileName] = useState("Upload Image");
  const {
    address,
    contract,
    updatePropertyFunction,
    PINATA_API_KEY,
    PINATA_SECRECT_KEY,
    setLoader,
    notifyError,
    notifySuccess,
    loader,
  } = useStateContext();

  const [form, setForm] = useState({
    productId: "",
    propertyTitle: "",
    description: "",
    category: "",
    price: "",
    images: "",
    propertyAddress: "",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const detailsSuffix =
      form.bedrooms || form.bathrooms || form.sqft
        ? `\n---\nBedrooms: ${form.bedrooms || 0} | Bathrooms: ${form.bathrooms || 0} | Area: ${form.sqft || 0} sq.ft`
        : "";
    await updatePropertyFunction({
      ...form,
      description: form.description + detailsSuffix,
      productId: query.property * 1,
    });
    setIsLoading(false);
  };

  const uploadToPinata = async () => {
    setLoader(true);
    setFileName("Image Uploading...");
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_SECRECT_KEY,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

        setForm({ ...form, images: ImgHash });
        notifySuccess("Successfully uploaded");
        setFileName("Image Uploaded");
        setLoader(false);
        return ImgHash;
      } catch (error) {
        setLoader(false);
        notifyError("Unable to upload image to Pinata, Check API Key");
      }
    }
  };

  const retrieveFile = (event) => {
    const data = event.target.files[0];

    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);

    reader.onloadend = () => {
      setFile(event.target.files[0]);

      if (event.target.files && event.target.files[0]) {
        setDiplayImg(URL.createObjectURL(event.target.files[0]));
      }
    };

    event.preventDefault();
  };

  return (
    <div class="template-color-1 nft-body-connect">
      <Header />
      <CreateOne title="Update Property" />
      <div class="creat-collection-area pt--80">
        <div class="container">
          <div class="row g-5 ">
            <div class="col-lg-3 offset-1 ml_md--0 ml_sm--0">
              <div class="collection-single-wized banner">
                <label class="title required">Logo image</label>

                <div class="create-collection-input logo-image">
                  <div class="logo-c-image logo">
                    <img
                      id="rbtinput1"
                      src={diplayImg || "/profile/profile-01.jpg"}
                      alt="Profile-NFT"
                    />
                    <label for="fatima" title="No File Choosen">
                      <span class="text-center color-white">
                        <i class="feather-edit"></i>
                      </span>
                    </label>
                  </div>
                  <div class="button-area">
                    <div class="brows-file-wrapper">
                      <input
                        name="fatima"
                        id="fatima"
                        type="file"
                        onChange={retrieveFile}
                      />
                    </div>
                  </div>
                </div>
                {file && (
                  <a
                    onClick={() => uploadToPinata()}
                    class="btn btn-primary-alta btn-large"
                  >
                    {fileName}
                  </a>
                )}
              </div>

              <div class="collection-single-wized banner">
                <label class="title">Cover Image</label>
                <div class="create-collection-input feature-image">
                  <div class="logo-c-image feature">
                    <img
                      id="rbtinput2"
                      src="/profile/cover-04.png"
                      alt="Profile-NFT"
                    />
                    <label for="nipa" title="No File Choosen">
                      <span class="text-center color-white">
                        <i class="feather-edit"></i>
                      </span>
                    </label>
                  </div>
                  <div class="button-area">
                    <div class="brows-file-wrapper">
                      <input name="nipa" id="nipa" type="file" />
                    </div>
                  </div>
                </div>
              </div>

              <div class="collection-single-wized banner">
                <label class="title">Featured image</label>
                <div class="create-collection-input feature-image">
                  <div class="logo-c-image feature">
                    <img
                      id="createfileImage"
                      src="/profile/cover-03.jpg"
                      alt="Profile-NFT"
                    />
                    <label for="createinputfile" title="No File Choosen">
                      <span class="text-center color-white">
                        <i class="feather-edit"></i>
                      </span>
                    </label>
                  </div>
                  <div class="button-area">
                    <div class="brows-file-wrapper">
                      <input
                        name="createinputfile"
                        id="createinputfile"
                        type="file"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-7">
              <div class="create-collection-form-wrapper">
                <div class="row">
                  <div class="col-lg-6">
                    <div class="collection-single-wized">
                      <label for="name" class="title required">
                        Property Title
                      </label>
                      <div class="create-collection-input">
                        <input
                          id="name"
                          class="name"
                          type="text"
                          placeholder="propertyTitle"
                          onChange={(e) =>
                            handleFormFieldChange("propertyTitle", e)
                          }
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div class="col-lg-12">
                    <div class="collection-single-wized">
                      <label class="title required">Category</label>
                      <div class="create-collection-input">
                        <select
                          class="name mb--30"
                          style={{ width: "100%", padding: "0 20px", height: "50px", backgroundColor: "#1a1a2e", color: "#ffffff", border: "2px solid #444", borderRadius: "4px", appearance: "auto", cursor: "pointer" }}
                          value={form.category}
                          onChange={(e) => setForm({ ...form, category: e.target.value })}
                        >
                          <option value="" style={{ background: "#1a1a2e", color: "#ffffff" }}>Select Category</option>
                          {categories.map((el, i) => (
                            <option key={i} value={el} style={{ background: "#1a1a2e", color: "#ffffff" }}>{el}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="collection-single-wized">
                      <label for="description" class="title">
                        Description
                      </label>
                      <div class="create-collection-input">
                        <textarea
                          id="description"
                          class="text-area"
                          placeholder="description"
                          onChange={(e) =>
                            handleFormFieldChange("description", e)
                          }
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div class="col-lg-4">
                    <div class="collection-single-wized">
                      <label for="bedrooms" class="title">
                        Bedrooms
                      </label>
                      <div class="create-collection-input">
                        <input
                          id="bedrooms"
                          class="url"
                          type="number"
                          min="0"
                          placeholder="e.g. 3"
                          value={form.bedrooms}
                          onChange={(e) => handleFormFieldChange("bedrooms", e)}
                        />
                      </div>
                    </div>
                  </div>

                  <div class="col-lg-4">
                    <div class="collection-single-wized">
                      <label for="bathrooms" class="title">
                        Bathrooms
                      </label>
                      <div class="create-collection-input">
                        <input
                          id="bathrooms"
                          class="url"
                          type="number"
                          min="0"
                          placeholder="e.g. 2"
                          value={form.bathrooms}
                          onChange={(e) => handleFormFieldChange("bathrooms", e)}
                        />
                      </div>
                    </div>
                  </div>

                  <div class="col-lg-4">
                    <div class="collection-single-wized">
                      <label for="sqft" class="title">
                        Area (sq.ft)
                      </label>
                      <div class="create-collection-input">
                        <input
                          id="sqft"
                          class="url"
                          type="number"
                          min="0"
                          placeholder="e.g. 1200"
                          value={form.sqft}
                          onChange={(e) => handleFormFieldChange("sqft", e)}
                        />
                      </div>
                    </div>
                  </div>

                  <div class="col-lg-6">
                    <div class="collection-single-wized">
                      <label for="price" class="title">
                        Price (ETH)
                      </label>
                      <div class="create-collection-input">
                        <input
                          id="price"
                          class="url"
                          type="number"
                          min="0"
                          step="0.001"
                          placeholder="e.g. 0.5"
                          value={form.price}
                          onChange={(e) => handleFormFieldChange("price", e)}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="collection-single-wized">
                      <label for="wallet" class="title">
                        Property address
                      </label>
                      <div class="create-collection-input">
                        <input
                          id="wallet"
                          class="url"
                          type="text"
                          placeholder="propertyAddress"
                          onChange={(e) =>
                            handleFormFieldChange("propertyAddress", e)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="nuron-information mb--30">
                      <div class="single-notice-setting">
                        <div class="input">
                          <input
                            type="checkbox"
                            id="themeSwitch"
                            name="theme-switch"
                            class="theme-switch__input"
                          />
                          <label for="themeSwitch" class="theme-switch__label">
                            <span></span>
                          </label>
                        </div>
                        <div class="content-text">
                          <p>Explicit & sensitive content</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="button-wrapper">
                      <a
                        onClick={() => handleSubmit()}
                        class="btn btn-primary-alta btn-large"
                      >
                        {isLoading ? <Loader /> : "Update"}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Copyright />
      {loader && <GlobalLoder />}
    </div>
  );
};

export default create;
