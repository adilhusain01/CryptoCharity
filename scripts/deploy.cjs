// const { ethers } = require('hardhat');

// async function main() {
//   const CharityDonation = await ethers.getContractFactory('CharityDonation');

//   // Deploy the contract
//   const charityDonation = await CharityDonation.deploy();

//   // Wait until the contract is deployed (optional, but good practice)
//   await charityDonation.waitForDeployment(); // Use this if you want to wait for deployment confirmations

//   console.log(charityDonation);

//   console.log('Contract deployed to:', charityDonation.target);
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

const hre = require('hardhat');

async function main() {
  try {
    // Get the contract factory
    const CharityDonation = await hre.ethers.getContractFactory(
      'CharityDonation'
    );

    // Deploy the contract
    console.log('Deploying CharityDonation contract...');
    const charityDonation = await CharityDonation.deploy();

    // Wait for deployment to finish
    await charityDonation.waitForDeployment();
    const contractAddress = await charityDonation.getAddress();

    console.log('CharityDonation contract deployed to:', contractAddress);
    console.log('Save this address for interaction script!');
  } catch (error) {
    console.error('Error during deployment:', error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
