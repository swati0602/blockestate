require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const RPC_URL = process.env.SEPOLIA_RPC_URL || "";

module.exports = {
  solidity: "0.8.23",
  networks: {
    sepolia: {
      url: RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },
};
