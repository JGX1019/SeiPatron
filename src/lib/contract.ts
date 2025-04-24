import { ethers } from 'ethers';

// ABI will be filled by the user
export const SeiPatronABI = [];

// Contract address will be filled by the user
export const SeiPatronAddress = '';

// SEI Token ABI (basic ERC20 interface)
export const SEITokenABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (boolean)",
  "function transfer(address to, uint256 amount) returns (boolean)",
  "function transferFrom(address from, address to, uint256 amount) returns (boolean)"
];

// Sei Testnet configuration
export const seiTestnetConfig = {
  chainId: '0x530', // 1328 in hex
  chainName: 'Sei Testnet',
  nativeCurrency: {
    name: 'SEI',
    symbol: 'SEI',
    decimals: 18
  },
  rpcUrls: ['https://evm-rpc-testnet.sei-apis.com'],
  blockExplorerUrls: ['https://testnet.seistream.app']
};

// Create contract instance with signer
export const getSeiPatronContract = (providerOrSigner: ethers.providers.Provider | ethers.Signer) => {
  return new ethers.Contract(SeiPatronAddress, SeiPatronABI, providerOrSigner);
};

// Create SEI token contract instance
export const getSEITokenContract = (tokenAddress: string, providerOrSigner: ethers.providers.Provider | ethers.Signer) => {
  return new ethers.Contract(tokenAddress, SEITokenABI, providerOrSigner);
};

// Helper to format SEI tokens from wei
export const formatSEI = (wei: ethers.BigNumberish) => {
  return ethers.utils.formatEther(wei);
};

// Helper to parse SEI tokens to wei
export const parseSEI = (sei: string) => {
  return ethers.utils.parseEther(sei);
};

// Helper to shorten address for display
export const shortenAddress = (address: string) => {
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

// Enum for subscription intervals (matches contract)
export enum SubscriptionInterval {
  DAILY = 86400,
  WEEKLY = 604800,
  MONTHLY = 2592000
}

// Enum for subscription status (matches contract)
export enum SubscriptionStatus {
  Inactive = 0,
  Active = 1,
  Cancelled = 2
}

// Enum for content types (matches contract)
export enum ContentType {
  Text = 0,
  Image = 1,
  Video = 2,
  Audio = 3,
  File = 4
}

// Helper to convert timestamp to readable date
export const formatDate = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleString();
};

// Helper to determine if a subscription needs renewal
export const isSubscriptionExpired = (nextPaymentTime: number) => {
  return Math.floor(Date.now() / 1000) >= nextPaymentTime;
};