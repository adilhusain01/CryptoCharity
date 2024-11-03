const hre = require('hardhat');

async function main() {
  try {
    // Deploy TestCharity
    console.log('Deploying TestCharity contract...');
    const TestCharity = await hre.ethers.getContractFactory('TestCharity');
    const testCharity = await TestCharity.deploy();
    await testCharity.waitForDeployment();

    const charityAddress = await testCharity.getAddress();
    console.log('TestCharity deployed to:', charityAddress);

    return charityAddress;
  } catch (error) {
    console.error('Error deploying TestCharity:', error);
    throw error;
  }
}

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = main;
