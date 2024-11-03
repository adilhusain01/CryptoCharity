require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.27',
  networks: {
    aia: {
      url: 'https://aia-dataseed1-testnet.aiachain.org',
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
