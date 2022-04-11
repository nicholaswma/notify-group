require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
  solidity: "0.8.4",
  networks: {
    ropsten: {
      url: process.env.INFURA_URL_ROPSTEN,
      accounts: [process.env.ACCOUNT],
    },
    rinkeby: {
      url: process.env.INFURA_URL_RINKEBY,
      accounts: [process.env.ACCOUNT],
    },
  },
};
