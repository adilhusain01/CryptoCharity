export const contractAddress = '0xA0fc84bd9b4F006f075A385bCd5094E497772862';
export const contractABI = [
  'function owner() public view returns (address)',
  'function registerCharity(address charity) public',
  'function donate(address charity) public payable',
  'function getCharities() public view returns (address[])',
  'function isCharityRegistered(address) public view returns (bool)',
  'function getDonationAmount(address) public view returns (uint256)',
  'event CharityRegistered(address indexed charity)',
  'event DonationMade(address indexed donor, address indexed charity, uint256 amount)',
];
