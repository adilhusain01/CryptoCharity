import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWallet } from './WalletContext';
import { contractABI, contractAddress } from '../config/contract';

const CharityContext = createContext();

export const CharityProvider = ({ children }) => {
  const [contract, setContract] = useState(null);
  const [charities, setCharities] = useState([]);
  const [status, setStatus] = useState('');
  const { signer, setIsOwner } = useWallet();

  useEffect(() => {
    if (signer) {
      initContract();
    }
  }, [signer]);

  const initContract = async () => {
    try {
      const contractInstance = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      setContract(contractInstance);

      // Check if connected account is owner
      const contractOwner = await contractInstance.owner();
      setIsOwner(
        contractOwner.toLowerCase() ===
          (await signer.getAddress()).toLowerCase()
      );

      await loadCharities(contractInstance);
    } catch (error) {
      console.error('Contract initialization error:', error);
      setStatus('Failed to initialize contract');
    }
  };

  const loadCharities = async (contractInstance) => {
    try {
      const charitiesList = await contractInstance.getCharities();
      const charitiesWithDonations = await Promise.all(
        charitiesList.map(async (address) => {
          const donations = await contractInstance.getDonationAmount(address);
          return {
            address,
            donations: ethers.formatEther(donations),
          };
        })
      );
      setCharities(charitiesWithDonations);
    } catch (error) {
      console.error('Error loading charities:', error);
      setStatus('Failed to load charities');
    }
  };

  const registerCharity = async (address) => {
    if (!ethers.isAddress(address)) {
      setStatus('Invalid charity address');
      return;
    }

    try {
      setStatus('Registering charity...');
      const tx = await contract.registerCharity(address);
      await tx.wait();
      setStatus('Charity registered successfully!');
      await loadCharities(contract);
    } catch (error) {
      console.error('Registration error:', error);
      setStatus('Failed to register charity: ' + error.message);
    }
  };

  const makeDonation = async (charityAddress, amount) => {
    if (!charityAddress || !amount) {
      setStatus('Please select a charity and enter donation amount');
      return;
    }

    try {
      setStatus('Processing donation...');
      const amountInWei = ethers.parseEther(amount);
      const tx = await contract.donate(charityAddress, { value: amountInWei });
      await tx.wait();
      setStatus('Donation successful!');
      await loadCharities(contract);
    } catch (error) {
      console.error('Donation error:', error);
      setStatus('Failed to make donation: ' + error.message);
    }
  };

  return (
    <CharityContext.Provider
      value={{
        charities,
        status,
        registerCharity,
        makeDonation,
        setStatus,
      }}
    >
      {children}
    </CharityContext.Provider>
  );
};

export const useCharity = () => useContext(CharityContext);
