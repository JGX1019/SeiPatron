import { ethers } from 'ethers';
import { seiTestnetConfig } from './contract';
import { DynamicWallet } from './dynamic-wallet';

// Create a singleton instance of Dynamic wallet
const dynamicWalletInstance = new DynamicWallet({
  environmentId: '8dc5a745-887b-47d8-a7b8-3b4d6306246d',
  appName: 'SeiPatron'
});

// Initialize Dynamic wallet when the module loads
if (typeof window !== 'undefined') {
  dynamicWalletInstance.initialize().catch(console.error);
}

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

// Function to get Ethereum provider from window object
export const getEthereumProvider = () => {
  if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    return window.ethereum;
  }
  return null;
};

// Function to request connection to wallet
export const connectWallet = async (): Promise<ethers.providers.Web3Provider | null> => {
  try {
    // First try to connect with Dynamic wallet
    const provider = await dynamicWalletInstance.connect();
    if (provider) {
      return provider;
    }
    
    // Fallback to generic wallet provider
    const ethereum = getEthereumProvider();
    if (!ethereum) {
      console.error('No Ethereum provider found. Please install a compatible wallet.');
      return null;
    }
    
    // Request account access
    await ethereum.request({ method: 'eth_requestAccounts' });
    
    // Create ethers provider
    return new ethers.providers.Web3Provider(ethereum as any);
  } catch (error) {
    console.error("Error connecting to wallet:", error);
    return null;
  }
};

// Function to switch to Sei Network
export const switchToSeiNetwork = async (): Promise<boolean> => {
  const ethereum = getEthereumProvider();
  if (!ethereum) return false;
  
  try {
    // Try to switch to Sei network
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: seiTestnetConfig.chainId }],
    });
    return true;
  } catch (switchError: any) {
    // If the Sei network is not added to wallet yet, add it
    if (switchError.code === 4902) {
      try {
        await ethereum.request({
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

// Get Dynamic wallet instance
export const getDynamicWallet = () => {
  return dynamicWalletInstance;
};

// Listen for account changes
export const setupAccountChangedListener = (callback: (accounts: string[]) => void): () => void => {
  const ethereum = getEthereumProvider();
  if (!ethereum) return () => {};
  
  ethereum.on('accountsChanged', callback);
  
  // Return cleanup function
  return () => {
    ethereum.removeListener('accountsChanged', callback);
  };
};

// Listen for chain changes
export const setupChainChangedListener = (callback: (chainId: string) => void): () => void => {
  const ethereum = getEthereumProvider();
  if (!ethereum) return () => {};
  
  ethereum.on('chainChanged', callback);
  
  // Return cleanup function
  return () => {
    ethereum.removeListener('chainChanged', callback);
  };
};

// Types for window.ethereum
declare global {
  interface Window {
    ethereum?: {
      request: (request: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: any) => void;
      removeListener: (event: string, callback: any) => void;
    };
  }
}