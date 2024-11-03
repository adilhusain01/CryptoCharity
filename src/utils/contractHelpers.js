// contractHelpers.js
import { ethers } from 'ethers';
import charityABI from './charity.json';

const charityContractAddress = '0xYourCharityContractAddress';

const getCharityContract = () => {
  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(charityContractAddress, charityABI, signer);
};

export const donateToCharity = async (charityAddress, amount) => {
  const contract = getCharityContract();
  const txn = await contract.donate(charityAddress, {
    value: ethers.utils.parseEther(amount.toString()),
  });
  await txn.wait();
};
