import React, { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { useCharity } from '../contexts/CharityContext';

export const CharityRegistration = () => {
  const [newCharity, setNewCharity] = useState('');
  const { isOwner } = useWallet();
  const { registerCharity, setStatus } = useCharity();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerCharity(newCharity);
    setNewCharity('');
  };
  if (!isOwner) return null;

  return (
    <div className='mb-8 p-4 border rounded'>
      {' '}
      <h2 className='text-xl font-semibold mb-4'>Register New Charity</h2>{' '}
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input
          type='text'
          value={newCharity}
          onChange={(e) => setNewCharity(e.target.value)}
          placeholder='Charity Address'
          className='w-full p-2 border rounded'
        />{' '}
        <button
          type='submit'
          className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'
        >
          Register Charity{' '}
        </button>{' '}
      </form>{' '}
    </div>
  );
};
