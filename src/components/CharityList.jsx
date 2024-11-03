import React from 'react';
import { useCharity } from '../contexts/CharityContext';

import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Wallet, Timer, Users, ChevronRight, Gift } from 'lucide-react';

const CharityList = () => {
  const { charities } = useCharity();

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center space-x-2'>
          <Users className='h-5 w-5 text-indigo-600' />
          <span>Registered Charities</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className='divide-y divide-slate-100'>
          {charities.map((charity) => (
            <li key={charity.address} className='py-3'>
              <div className='flex justify-between items-center group'>
                <span className='text-slate-600 font-medium'>
                  {charity.address}
                </span>
                <div className='flex items-center space-x-2'>
                  <span className='font-semibold text-indigo-600'>
                    {charity.donations} ETH
                  </span>
                  <ChevronRight className='h-4 w-4 text-slate-400 group-hover:text-indigo-600 transition-colors' />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default CharityList;
