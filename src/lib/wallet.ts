import { ethers } from 'ethers';
import { seiTestnetConfig } from './contract';

// Check if MetaMask is installed
export const isMetaMaskInstalled = (): boolean => {
  return typeof window !== 'undefined' && !!window.ethereum && !!window.ethereum.isMetaMask;
};

// Connect to MetaMask
export const connectMetaMask = async (): Promise<ethers.providers.Web3Provider | null> => {
  if (!isMetaMaskInstalled()) {
    window.open('https://metamask.io/download/', '_blank');
    throw new Error('MetaMask not installed. Please install MetaMask to continue.');
  }
  
  try {
    // Request account access
    await window.ethereum!.request({ method: 'eth_requestAccounts' });
    
    // Create ethers provider - use non-null assertion since we already checked in isMetaMaskInstalled
    const provider = new ethers.providers.Web3Provider(window.ethereum as ethers.providers.ExternalProvider);
    
    // Force switch to Sei testnet
    await switchToSeiNetwork();
    
    return provider;
  } catch (error) {
    console.error("Error connecting to MetaMask:", error);
    return null;
  }
};

// Switch to Sei Network
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

// Get the user's address
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

// Remove listeners when no longer needed
export const removeListeners = (): void => {
  if (window.ethereum) {
    window.ethereum.removeListener('accountsChanged', () => {});
    window.ethereum.removeListener('chainChanged', () => {});
  }
};

// Types for window.ethereum
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (request: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: any) => void;
      removeListener: (event: string, callback: any) => void;
    };
  }
}