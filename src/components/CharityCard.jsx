import React from 'react';
import { Progress } from '@/components/ui/progress';
export const CharityCard = ({ charity }) => {
  const percentageComplete = (charity.currentAmount / charity.goalAmount) * 100;
  return (
    <div className='bg-white rounded-lg shadow-md p-6'>
      <div className='relative h-48 mb-4'>
        <img
          src={charity.imageUrl || '/api/placeholder/400/300'}
          alt={charity.name}
          className='w-full h-full object-cover rounded-lg'
        />{' '}
        <div className='absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm'>
          {' '}
          {charity.category}{' '}
        </div>{' '}
      </div>{' '}
      <h3 className='text-xl font-semibold mb-2'>{charity.name}</h3>{' '}
      <p className='text-gray-600 mb-4 line-clamp-2'>{charity.description}</p>{' '}
      <div className='mb-4'>
        {' '}
        <Progress value={percentageComplete} className='h-2' />{' '}
        <div className='flex justify-between mt-2 text-sm'>
          {' '}
          <span>{charity.currentAmount} ETH raised</span>{' '}
          <span>{charity.goalAmount} ETH goal</span>{' '}
        </div>{' '}
      </div>{' '}
      <div className='flex justify-between items-center text-sm text-gray-500'>
        {' '}
        <span>{charity.totalDonors} donors</span>{' '}
        <span>{charity.daysLeft} days left</span>{' '}
      </div>{' '}
    </div>
  );
};
