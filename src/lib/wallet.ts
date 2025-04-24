import { ethers } from 'ethers';
import { seiTestnetConfig } from './contract';

// Interface for wallet provider
export interface WalletProvider {
  provider: ethers.providers.Web3Provider | null;
  signer: ethers.Signer | null;
  address: string | null;
  chainId: number | null;
  isConnected: boolean;
  isConnecting: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  switchToSeiNetwork: () => Promise<boolean>;
}

// Function to detect Dynamax wallet
export const isDynamaxAvailable = (): boolean => {
  return window && typeof window.ethereum !== 'undefined' && window.ethereum.isDynamax === true;
};

// Function to request connection to Dynamax wallet
export const connectDynamaxWallet = async (): Promise<ethers.providers.Web3Provider | null> => {
  if (!isDynamaxAvailable()) {
    window.open('https://dynamax.io/download', '_blank');
    throw new Error('Dynamax wallet not found. Please install Dynamax wallet to continue.');
  }
  
  try {
    // Request account access
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    
    // Create ethers provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return provider;
  } catch (error) {
    console.error("Error connecting to Dynamax wallet:", error);
    return null;
  }
};

// Function to switch to Sei Network
export const switchToSeiNetwork = async (): Promise<boolean> => {
  if (!window.ethereum) return false;
  
  try {
    // Try to switch to Sei network
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: seiTestnetConfig.chainId }],
    });
    return true;
  } catch (switchError: any) {
    // If the Sei network is not added to wallet yet, add it
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: seiTestnetConfig.chainId,
              chainName: seiTestnetConfig.chainName,
              nativeCurrency: seiTestnetConfig.nativeCurrency,
              rpcUrls: seiTestnetConfig.rpcUrls,
              blockExplorerUrls: seiTestnetConfig.blockExplorerUrls
            }
          ],
        });
        return true;
      } catch (addError) {
        console.error("Error adding Sei network:", addError);
        return false;
      }
    }
    console.error("Error switching network:", switchError);
    return false;
  }
};

// Function to get user's ETH address
export const getAddress = async (provider: ethers.providers.Web3Provider): Promise<string | null> => {
  try {
    const signer = provider.getSigner();
    return await signer.getAddress();
  } catch (error) {
    console.error("Error fetching address:", error);
    return null;
  }
};

// Listen for account changes
export const setupAccountChangedListener = (callback: (accounts: string[]) => void): void => {
  if (window.ethereum) {
    window.ethereum.on('accountsChanged', callback);
  }
};

// Listen for chain changes
export const setupChainChangedListener = (callback: (chainId: string) => void): void => {
  if (window.ethereum) {
    window.ethereum.on('chainChanged', callback);
  }
};

// Types for window.ethereum
declare global {
  interface Window {
    ethereum?: {
      isDynamax?: boolean;
      request: (request: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: any) => void;
      removeListener: (event: string, callback: any) => void;
    };
  }
}