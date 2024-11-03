const hre = require('hardhat');
require('dotenv').config();
const deployCharity = require('./deployCharity.cjs');

async function main() {
  try {
    // Contract addresses
    const DONATION_CONTRACT = '0xA0fc84bd9b4F006f075A385bCd5094E497772862';

    // First deploy the test charity
    console.log('Deploying test charity...');
    const charityAddress = await deployCharity();
    console.log('Test charity deployed at:', charityAddress);

    // Get signer
    const [signer] = await hre.ethers.getSigners();
    console.log(
      'Interacting with contracts using address:',
      await signer.getAddress()
    );

    // Get contract instances
    const CharityDonation = await hre.ethers.getContractFactory(
      'CharityDonation'
    );
    const charityDonation = CharityDonation.attach(DONATION_CONTRACT);

    const TestCharity = await hre.ethers.getContractFactory('TestCharity');
    const testCharity = TestCharity.attach(charityAddress);

    // Check if charity is registered
    const isRegistered = await charityDonation.isCharityRegistered(
      charityAddress
    );
    console.log('Is charity registered?', isRegistered);

    if (!isRegistered) {
      console.log('Registering charity...');
      const tx = await charityDonation.registerCharity(charityAddress);
      await tx.wait();
      console.log('Charity registered successfully!');
    }

    // Get initial balances
    const initialBalance = await testCharity.getBalance();
    console.log(
      'Initial charity balance:',
      hre.ethers.formatEther(initialBalance),
      'ETH'
    );

    // Make a donation
    console.log('Making donation...');
    const donationAmount = hre.ethers.parseEther('0.001'); // 0.001 ETH
    const donateTx = await charityDonation.donate(charityAddress, {
      value: donationAmount,
    });
    await donateTx.wait();
    console.log('Donation successful!');

    // Check final balances
    const finalBalance = await testCharity.getBalance();
    console.log(
      'Final charity balance:',
      hre.ethers.formatEther(finalBalance),
      'ETH'
    );

    // Check donation amount in contract
    const totalDonations = await charityDonation.getDonationAmount(
      charityAddress
    );
    console.log(
      'Total recorded donations:',
      hre.ethers.formatEther(totalDonations),
      'ETH'
    );
  } catch (error) {
    console.error('Error during interaction:');
    console.error(error.message);
    if (error.data) {
      try {
        const abiCoder = new hre.ethers.AbiCoder();
        const decodedError = abiCoder.decode(
          ['string'],
          '0x' + error.data.slice(10)
        );
        console.error('Decoded error:', decodedError);
      } catch (e) {
        console.error('Raw error data:', error.data);
      }
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
