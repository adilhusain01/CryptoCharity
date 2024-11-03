import React, { useState } from 'react';
import { useCharity } from '../contexts/CharityContext';

import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Wallet, Timer, Users, ChevronRight, Gift } from 'lucide-react';

const DonationForm = () => {
  const [selectedCharity, setSelectedCharity] = useState('');
  const [donationAmount, setDonationAmount] = useState('');
  const { charities, makeDonation } = useCharity();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await makeDonation(selectedCharity, donationAmount);
    setDonationAmount('');
  };

  return (
    <Card className='mb-8'>
      <CardHeader>
        <CardTitle className='flex items-center space-x-2'>
          <Heart className='h-5 w-5 text-indigo-600' />
          <span>Make a Donation</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <select
            value={selectedCharity}
            onChange={(e) => setSelectedCharity(e.target.value)}
            className='w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none'
          >
            <option value=''>Select a Charity</option>
            {charities.map((charity) => (
              <option key={charity.address} value={charity.address}>
                {charity.address} ({charity.donations} ETH received)
              </option>
            ))}
          </select>
          <input
            type='number'
            step='0.001'
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            placeholder='Amount in ETH'
            className='w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none'
          />
          <button
            type='submit'
            className='w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all font-medium'
          >
            Make Donation
          </button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DonationForm;
