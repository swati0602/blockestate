import React, { useEffect, useState, useContext, createContext } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import toast from "react-hot-toast";

//INTERNAL  IMPORT
import {
  PINATA_API_KEY,
  PINATA_SECRECT_KEY,
  REAL_ESTATE_ABI,
  REAL_ESTATE_ADDRESS,
  handleNetworkSwitch,
  ACTIVE_NETWORK,
} from "./constants";

//FETCH CONTRACT
const FETCH_CONTRACT = (PROVIDER) =>
  new ethers.Contract(REAL_ESTATE_ADDRESS, REAL_ESTATE_ABI, PROVIDER);

//CONNECTING WITH CONTRACT (always uses the active MetaMask provider)
const connectingWithSmartContract = async () => {
  try {
    // Use the MetaMask provider selected during connectWallet, or fall back to window.ethereum
    const rawProvider = (typeof window !== "undefined" && window._selectedProvider)
      ? window._selectedProvider
      : window.ethereum;
    const provider = new ethers.providers.Web3Provider(rawProvider);
    const PROVIDER = provider.getSigner();
    const contract = FETCH_CONTRACT(PROVIDER);
    return contract;
  } catch (error) {
    console.log(error);
  }
};
// INTERNAL
const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const router = useRouter();
  //STATE VARIABLE
  const [currentAccount, setCurrentAccount] = useState();
  const [accountBalance, setAccountBalance] = useState();
  const [userBlance, setUserBlance] = useState();
  const [getHighestRatedProduct, setGetHighestRatedProduct] = useState();
  const [loader, setLoader] = useState(false);
  const [count, setCount] = useState(0);

  //NOTIFICATION
  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  //---CHECK IF WALLET IS CONNECTD
  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) return;
      // If user manually disconnected, don't auto-reconnect
      if (localStorage.getItem("walletDisconnected") === "true") return;

      // Use eth_accounts (read-only, no popup) to check existing connection
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const getBalance = await provider.getBalance(accounts[0]);
        const convertBal = ethers.utils.formatEther(getBalance);
        setAccountBalance(convertBal);
        setUserBlance(convertBal);
      } else {
        console.log("NO ACCOUNT");
      }

      return accounts[0];
    } catch (error) {
      console.log("NO CONNACTION");
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  //---DISCONNECT WALLET
  const disconnectWallet = () => {
    localStorage.setItem("walletDisconnected", "true");
    setCurrentAccount(null);
    setAccountBalance(null);
    setUserBlance(null);
    try {
      const web3modal = new Web3Modal();
      web3modal.clearCachedProvider();
    } catch (err) { }
    notifySuccess("Wallet disconnected");
  };

  //---CONNECT WALLET FUNCTION (MetaMask only)
  const connectWallet = async () => {
    try {
      if (typeof window === "undefined" || !window.ethereum) {
        return notifyError("MetaMask not found. Please install the MetaMask extension.");
      }

      // Resolve the MetaMask provider (handles multi-provider environments like Brave)
      const providers = window.ethereum.providers || [window.ethereum];
      const provider =
        providers.find((p) => p.isMetaMask && !p.isBraveWallet) ||
        (window.ethereum.isMetaMask ? window.ethereum : null);

      if (!provider) return notifyError("MetaMask not found. Please install the MetaMask extension.");

      localStorage.removeItem("walletDisconnected");
      setLoader(true);

      // Force MetaMask account-picker popup every time so user can choose which account
      await provider.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }],
      });

      const accounts = await provider.request({ method: "eth_requestAccounts" });

      if (!accounts || !accounts.length) {
        setLoader(false);
        return notifyError("No account selected. Please choose an account in MetaMask.");
      }

      await handleNetworkSwitch();

      window._selectedProvider = provider;
      setCurrentAccount(accounts[0]);
      setLoader(false);
      notifySuccess("Wallet connected successfully");
      setCount((c) => c + 1);

      // SAVE / UPDATE USER IN MONGODB
      try {
        await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ walletAddress: accounts[0] }),
        });
      } catch (dbErr) {
        console.log("DB user sync error:", dbErr);
      }
    } catch (error) {
      setLoader(false);
      if (error.code === 4001) {
        notifyError("Connection rejected by user.");
      } else {
        notifyError("Failed to connect wallet. Please try again.");
      }
      console.log(error);
    }
  };

  //CREATE PROPERTY
  const createPropertyFunction = async (form) => {
    const {
      propertyTitle,
      description,
      category,
      price,
      images,
      propertyAddress,
      bedrooms,
      bathrooms,
      sqft,
    } = form;

    try {
      setLoader(true);
      const contract = await connectingWithSmartContract();

      const address = await checkIfWalletConnected();

      const transaction = await contract.listProperty(
        address,
        price,
        propertyTitle,
        category,
        images,
        propertyAddress,
        description
      );

      const receipt = await transaction.wait();

      // Extract tokenId from PropertyListed event
      let tokenId = null;
      try {
        const event = receipt.events?.find((e) => e.event === "PropertyListed");
        tokenId = event?.args?.id?.toNumber() ?? null;
      } catch (_) {}

      // SAVE PROPERTY TO MONGODB
      try {
        await fetch("/api/properties", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tokenId,
            owner: address,
            title: propertyTitle,
            description,
            category,
            price: parseFloat(ethers.utils.formatEther(price.toString())),
            images: [images],
            location: { address: propertyAddress },
            bedrooms: parseInt(bedrooms) || 0,
            bathrooms: parseInt(bathrooms) || 0,
            area: parseFloat(sqft) || 0,
          }),
        });
      } catch (dbErr) {
        console.log("DB property sync error:", dbErr);
      }

      setLoader(false);
      notifySuccess("Transaction went successfully");
      setCount(count + 1);
      router.push("/author");
      console.log("contract call successs", transaction);
    } catch (err) {
      setLoader(false);
      notifyError("Something went wrong");
      console.log("contract call failure", err);
      window.location.reload();
    }
  };

  //UPDATE PROPERTY
  const updatePropertyFunction = async (form) => {
    const {
      productId,
      propertyTitle,
      description,
      category,
      price,
      images,
      propertyAddress,
      bedrooms,
      bathrooms,
      sqft,
    } = form;

    try {
      const contract = await connectingWithSmartContract();

      const address = await checkIfWalletConnected();
      const transaction = await contract.updateProperty(
        address,
        productId,
        propertyTitle,
        category,
        images,
        propertyAddress,
        description
      );

      await transaction.wait();

      // Also update price if provided
      if (price && price.toString().trim() !== "" && parseFloat(price) > 0) {
        const priceTransaction = await contract.updatePrice(
          address,
          productId,
          ethers.utils.parseEther(price.toString())
        );
        await priceTransaction.wait();
      }

      // UPDATE PROPERTY IN MONGODB
      try {
        await fetch(`/api/properties/${productId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: propertyTitle,
            description,
            category,
            price: parseFloat(price) || 0,
            images: [images],
            location: { address: propertyAddress },
            ...(bedrooms  !== undefined && { bedrooms:  parseInt(bedrooms)  || 0 }),
            ...(bathrooms !== undefined && { bathrooms: parseInt(bathrooms) || 0 }),
            ...(sqft      !== undefined && { area:      parseFloat(sqft)    || 0 }),
          }),
        });
      } catch (dbErr) {
        console.log("DB update sync error:", dbErr);
      }

      setLoader(false);
      notifySuccess("Transaction went successfully");
      setCount(count + 1);
      router.push("/author");
    } catch (err) {
      setLoader(false);
      notifyError("Something went wrong");
      console.log("contract call failure", err);
      window.location.reload();
    }
  };

  //UPDATE PRICE
  const updatePriceFunction = async (form) => {
    const { productID, price } = form;
    try {
      const contract = await connectingWithSmartContract();

      const address = await checkIfWalletConnected();
      const transaction = await contract.updatePrice(
        address,
        productID,
        ethers.utils.parseEther(price)
      );

      await transaction.wait();
      setLoader(false);
      notifySuccess("Transaction went successfully");
      setCount(count + 1);
      console.info("contract call successs", transaction);
    } catch (err) {
      setLoader(false);
      notifyError("Something went wrong");
      console.log("contract call failure", err);
      window.location.reload();
    }
  };

  //BUY PROPERTY
  const buyPropertyFunction = async (buying) => {
    const { productID, amount, owner } = buying;
    const money = ethers.utils.parseEther(amount);

    try {
      const contract = await connectingWithSmartContract();

      const address = await checkIfWalletConnected();

      if (!address) {
        notifyError("Please connect your wallet first");
        return;
      }

      if (owner && address.toLowerCase() === owner.toLowerCase()) {
        notifyError("You cannot buy your own property");
        return;
      }

      const transaction = await contract.buyProperty(productID, address, {
        value: money.toString(),
      });
      await transaction.wait();
      console.info("contract call successs", transaction);

      // UPDATE OWNER IN MONGODB AFTER BUY
      try {
        const { owner: newOwner } = buying;
        await fetch(`/api/properties/${productID}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ owner: address?.toLowerCase(), isSold: true }),
        });
        // add property to buyer's user record
        await fetch(`/api/users/${address}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ $push: { properties: productID } }),
        });
      } catch (dbErr) {
        console.log("DB buy sync error:", dbErr);
      }

      setLoader(false);
      notifySuccess("Transaction went successfully");
      setCount(count + 1);
      router.push("/author");
    } catch (err) {
      setLoader(false);
      notifyError("Something went wrong");
      console.log("contract call failure", err);
      window.location.reload();
    }
  };

  //ADD REVIEW
  const addReviewFunction = async (from) => {
    const { productID, rating, comment } = from;

    try {
      const contract = await connectingWithSmartContract();

      const address = await checkIfWalletConnected();
      if (!address) {
        notifyError("Please connect your wallet first");
        return;
      }

      const transaction = await contract.addReview(
        productID,
        rating,
        comment,
        address
      );
      await transaction.wait();
      setLoader(false);
      notifySuccess("Interest recorded successfully!");
      setCount(count + 1);
      window.location.reload();
    } catch (err) {
      setLoader(false);
      notifyError("Transaction failed. You may have already shown interest.");
      console.log("contract call failure", err);
    }
  };

  //REVIEW - LIKE
  const likeReviewFunction = async (productID, reviewIndex) => {
    try {
      const contract = await connectingWithSmartContract();
      const address = await checkIfWalletConnected();
      const transaction = await contract.likeReview(
        productID,
        reviewIndex,
        address
      );
      await transaction.wait();
      setLoader(false);
      notifySuccess("Transaction went successfully");
      setCount(count + 1);
      window.location.reload();
    } catch (err) {
      setLoader(false);
      notifyError("Something went wrong");
      console.log("contract call failure", err);
      window.location.reload();
    }
  };

  //GET PROPERTIES DATA NORAML

  //getAllProperties()
  const getPropertiesData = async () => {
    const address = await checkIfWalletConnected();
    try {
      if (address) {
        const contract = await connectingWithSmartContract();

        const properties = await contract?.getAllProperties();

        const parsedProperties = properties?.map((property, i) => ({
          owner: property.owner,
          title: property.propertyTitle,
          description: property.description,
          category: property.category,
          price: ethers.utils.formatEther(property.price.toString()),
          productID: property.productID.toNumber(),
          reviewers: property.reviewers,
          reviews: property.reviews,
          image: property.images,
          address: property.propertyAddress,
        }));
        console.log(parsedProperties);
        return parsedProperties;
      }
    } catch (error) {
      console.log(error);
    }
  };

  //getHighestRatedProduct()
  const getHighestRatedProductFunction = async () => {
    try {
      const address = await checkIfWalletConnected();
      if (address) {
        const contract = await connectingWithSmartContract();
        const totalReviews = await contract.getHighestRatedProduct();

        setGetHighestRatedProduct(totalReviews.toNumber());
      }
    } catch (error) {
      console.log(error);
    }
  };

  //getProductReviews()
  const getProductReviewsFunction = async (productId) => {
    try {
      const address = await checkIfWalletConnected();
      if (address) {
        const contract = await connectingWithSmartContract();

        const getProductReviews = await contract.getProductReviews(
          Number(productId)
        );

        const parsedReviews = getProductReviews?.map((review, i) => ({
          reviewer: review.reviewer,
          likes: review.likes.toNumber(),
          comment: review.comment,
          rating: review.rating,
          productID: review.productId.toNumber(),
          reviewIndex: review.reviewIndex.toNumber(),
        }));
        return parsedReviews;
      }
    } catch (error) {
      console.log(error);
    }
  };

  //getProperty()
  const getPropertyFunction = async (id) => {
    try {
      const address = await checkIfWalletConnected();
      if (address) {
        const contract = await connectingWithSmartContract();
        const propertyItem = await contract.getProperty(Number(id));

        const property = {
          productID: propertyItem?.[0].toNumber(),
          owner: propertyItem?.[1],
          title: propertyItem?.[3],
          category: propertyItem?.[4],
          description: propertyItem?.[7],
          price: ethers.utils.formatEther(propertyItem?.[2].toString()),
          address: propertyItem?.[6],
          image: propertyItem?.[5],
        };

        return property;
      }
    } catch (error) {
      console.log(error);
    }
  };

  //getUserProperties()
  const getUserPropertiesFunction = async () => {
    try {
      const address = await checkIfWalletConnected();
      if (address) {
        const contract = await connectingWithSmartContract();

        const properties = await contract.getUserProperties(address);

        const parsedProperties = properties.map((property, i) => ({
          owner: property.owner,
          title: property.propertyTitle,
          description: property.description,
          category: property.category,
          price: ethers.utils.formatEther(property.price.toString()),
          productID: property.productID.toNumber(),
          reviewers: property.reviewers,
          reviews: property.reviews,
          image: property.images,
          address: property.propertyAddress,
        }));

        return parsedProperties;
      }
    } catch (error) {
      console.log(error);
    }
  };

  //getUserReviews()
  const getUserReviewsFunction = async () => {
    try {
      const address = await checkIfWalletConnected();
      if (address) {
        const contract = await connectingWithSmartContract();
        const getUserReviews = await contract.getUserReviews(address);

        const parsedUserReviews = getUserReviews.map((property, i) => ({
          comment: property.comment,
          likes: property.likes.toNumber(),
          productId: property.productId.toNumber(),
          rating: property.rating,
          reviewIndex: property.reviewIndex.toNumber(),
          reviewer: property.reviewer,
        }));

        return parsedUserReviews;
      }
    } catch (error) {
      console.log(error);
    }
  };

  //totalProperty()
  const totalPropertyFunction = async () => {
    try {
      const address = await checkIfWalletConnected();
      if (address) {
        const contract = await connectingWithSmartContract();

        const totalProperty = await contract.propertyIndex();

        return totalProperty.toNumber();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const totalReviewsFunction = async () => {
    try {
      const address = await checkIfWalletConnected();
      if (address) {
        const contract = await connectingWithSmartContract();

        const totalReviews = await contract.reviewsCounter();

        return totalReviews.toNumber();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHighestRatedProductFunction();
    getUserReviewsFunction();
    totalPropertyFunction();
    totalReviewsFunction();
  }, [currentAccount]);

  return (
    <StateContext.Provider
      value={{
        //CONTRACT
        currentAccount,
        connectWallet,
        disconnectWallet,
        accountBalance,
        //PROPERTY
        createPropertyFunction,
        updatePropertyFunction,
        updatePriceFunction,
        buyPropertyFunction,
        getPropertyFunction,
        getUserPropertiesFunction,
        totalPropertyFunction,
        getPropertiesData,
        //REVIEW
        addReviewFunction,
        likeReviewFunction,
        getProductReviewsFunction,
        getUserReviewsFunction,
        totalReviewsFunction,
        getHighestRatedProduct,
        //STATE VARIABLE
        userBlance,
        PINATA_API_KEY,
        PINATA_SECRECT_KEY,
        loader,
        setLoader,
        notifySuccess,
        notifyError,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
