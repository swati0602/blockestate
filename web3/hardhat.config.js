require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const PRIVATE_KEY = "dca81380ad4a6559f5871c0474779cc2ad2f650ebf50e88df22e28eaa9070fe3";
const RPC_URL = "https://11155111.rpc.thirdweb.com/d391b93f5f62d9c15f67142e43841acc";

module.exports = {
  solidity: "0.8.23",
  networks: {
    sepolia: {
      url: RPC_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};
