import React, { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { useCharity } from '../contexts/CharityContext';

import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Wallet, Timer, Users, ChevronRight, Gift } from 'lucide-react';

const CharityRegistration = () => {
  const [newCharity, setNewCharity] = useState('');
  const { isOwner } = useWallet();
  const { registerCharity } = useCharity();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerCharity(newCharity);
    setNewCharity('');
  };

  if (!isOwner) return null;

  return (
    <Card className='mb-8'>
      <CardHeader>
        <CardTitle className='flex items-center space-x-2'>
          <Gift className='h-5 w-5 text-indigo-600' />
          <span>Register New Charity</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <input
            type='text'
            value={newCharity}
            onChange={(e) => setNewCharity(e.target.value)}
            placeholder='Charity Address'
            className='w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none'
          />
          <button
            type='submit'
            className='w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all font-medium'
          >
            Register Charity
          </button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CharityRegistration;
