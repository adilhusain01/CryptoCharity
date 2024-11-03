import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Wallet, Timer, Users, ChevronRight, Gift } from 'lucide-react';

const CharityCard = ({ charity }) => {
  const percentageComplete = (charity.currentAmount / charity.goalAmount) * 100;

  return (
    <Card className='overflow-hidden hover:shadow-lg transition-all duration-300'>
      <div className='relative h-48'>
        <img
          src={charity.imageUrl || '/api/placeholder/400/300'}
          alt={charity.name}
          className='w-full h-full object-cover'
        />
        <div className='absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-indigo-600'>
          {charity.category}
        </div>
      </div>
      <CardContent className='p-6'>
        <h3 className='text-xl font-semibold mb-3'>{charity.name}</h3>
        <p className='text-slate-600 mb-4 line-clamp-2'>
          {charity.description}
        </p>

        <div className='mb-4'>
          <Progress
            value={percentageComplete}
            className='h-2 bg-slate-100'
            indicatorClassName='bg-gradient-to-r from-indigo-600 to-purple-600'
          />
          <div className='flex justify-between mt-2 text-sm font-medium'>
            <span className='text-indigo-600'>
              {charity.currentAmount} ETH raised
            </span>
            <span className='text-slate-600'>
              {charity.goalAmount} ETH goal
            </span>
          </div>
        </div>

        <div className='flex justify-between items-center text-sm text-slate-500'>
          <div className='flex items-center space-x-1'>
            <Users className='h-4 w-4' />
            <span>{charity.totalDonors} donors</span>
          </div>
          <div className='flex items-center space-x-1'>
            <Timer className='h-4 w-4' />
            <span>{charity.daysLeft} days left</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CharityCard;
