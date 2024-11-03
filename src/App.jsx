import { WalletProvider } from './contexts/WalletContext';
import { CharityProvider } from './contexts/CharityContext';
import Navbar from './components/Navbar';
import CharityRegistration from './components/CharityRegistration';
import DonationForm from './components/DonationForm';
import CharityList from './components/CharityList';

const App = () => {
  return (
    <WalletProvider>
      <CharityProvider>
        <div className='min-h-screen bg-slate-50'>
          <Navbar />
          <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
              <div className='lg:col-span-2'>
                <CharityList />
              </div>
              <div className='space-y-6'>
                <CharityRegistration />
                <DonationForm />
              </div>
            </div>
          </main>
        </div>
      </CharityProvider>
    </WalletProvider>
  );
};

export default App;
