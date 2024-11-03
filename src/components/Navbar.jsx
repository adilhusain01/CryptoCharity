import { useWallet } from '../contexts/WalletContext';
import { Heart, Wallet } from 'lucide-react';

const Navbar = () => {
  const { account, connectWallet } = useWallet();

  return (
    <nav className='bg-white border-b border-gray-200'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <div className='flex items-center space-x-3'>
            <Heart className='h-8 w-8 text-blue-600' />
            <h1 className='text-2xl font-bold text-blue-600'>CryptoCharity</h1>
          </div>
          <button
            onClick={connectWallet}
            className='flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200'
          >
            <Wallet className='h-4 w-4' />
            <span>
              {account
                ? `${account.slice(0, 6)}...${account.slice(-4)}`
                : 'Connect Wallet'}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
