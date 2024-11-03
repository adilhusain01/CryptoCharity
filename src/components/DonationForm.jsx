import React, { useState } from 'react';
import { useCharity } from '../contexts/CharityContext';
export const DonationForm = () => {
  const [selectedCharity, setSelectedCharity] = useState('');
  const [donationAmount, setDonationAmount] = useState('');
  const { charities, makeDonation } = useCharity();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await makeDonation(selectedCharity, donationAmount);
    setDonationAmount('');
  };
  return (
    <div className='mb-8 p-4 border rounded'>
      {' '}
      <h2 className='text-xl font-semibold mb-4'>Make a Donation</h2>{' '}
      <form onSubmit={handleSubmit} className='space-y-4'>
        {' '}
        <select
          value={selectedCharity}
          onChange={(e) => setSelectedCharity(e.target.value)}
          className='w-full p-2 border rounded'
        >
          {' '}
          <option value=''>Select a Charity</option>{' '}
          {charities.map((charity) => (
            <option key={charity.address} value={charity.address}>
              {' '}
              {charity.address} ({charity.donations} ETH received){' '}
            </option>
          ))}{' '}
        </select>{' '}
        <input
          type='number'
          step='0.001'
          value={donationAmount}
          onChange={(e) => setDonationAmount(e.target.value)}
          placeholder='Amount in ETH'
          className='w-full p-2 border rounded'
        />{' '}
        <button
          type='submit'
          className='bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600'
        >
          {' '}
          Donate{' '}
        </button>{' '}
      </form>{' '}
    </div>
  );
};
