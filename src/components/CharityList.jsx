import React from 'react';
import { useCharity } from '../contexts/CharityContext';
export const CharityList = () => {
  const { charities } = useCharity();
  return (
    <div className='mb-4 p-4 border rounded'>
      {' '}
      <h2 className='text-xl font-semibold mb-4'>Registered Charities</h2>{' '}
      <ul className='space-y-2'>
        {' '}
        {charities.map((charity) => (
          <li key={charity.address} className='text-gray-700'>
            {' '}
            <div className='flex justify-between items-center'>
              {' '}
              <span>{charity.address}</span>{' '}
              <span className='font-semibold'>{charity.donations} ETH</span>{' '}
            </div>{' '}
          </li>
        ))}{' '}
      </ul>{' '}
    </div>
  );
};
