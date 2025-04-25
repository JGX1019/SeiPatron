'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';
import { connectMetaMask, switchToSeiNetwork } from '@/lib/wallet';

interface WalletContextType {
  provider: ethers.providers.Web3Provider | null;
  signer: ethers.Signer | null;
  address: string | null;
  isConnecting: boolean;
  isConnected: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType>({
  provider: null,
  signer: null,
  address: null,
  isConnecting: false,
  isConnected: false,
  connectWallet: async () => {},
  disconnectWallet: () => {},
});

export const useWallet = () => useContext(WalletContext);

export const WalletKitProvider = ({ children }: { children: React.ReactNode }) => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Handle initial setup
  useEffect(() => {
    setIsMounted(true);

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);

  // Check if connected on component mount and force Sei testnet
  useEffect(() => {
    if (isMounted && window.ethereum) {
      (async () => {
        try {
          // Ensure ethereum is defined before making the request
          if (!window.ethereum) throw new Error("Ethereum provider not found");
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            // User is already connected
            const web3Provider = new ethers.providers.Web3Provider(window.ethereum as ethers.providers.ExternalProvider);
            setProvider(web3Provider);
            const newSigner = web3Provider.getSigner();
            setSigner(newSigner);
            setAddress(accounts[0]);
            setIsConnected(true);
            
            // Always force Sei testnet
            await switchToSeiNetwork();
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error);
        }
      })();
    }
  }, [isMounted]);

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      // User disconnected their wallet
      disconnectWallet();
    } else if (accounts[0] !== address) {
      setAddress(accounts[0]);
    }
  };

  const handleChainChanged = async () => {
    // Always force Sei network on any chain change
    await switchToSeiNetwork();
    
    if (provider) {
      // Reset connection with Sei network
      const newSigner = provider.getSigner();
      setSigner(newSigner);
      const newAddress = await newSigner.getAddress();
      setAddress(newAddress);
    }
  };

  const connectWallet = async () => {
    if (!isMounted) return;

    setIsConnecting(true);
    try {
      const web3Provider = await connectMetaMask();
      
      if (web3Provider) {
        // Always force Sei network
        await switchToSeiNetwork();
        
        setProvider(web3Provider);
        const newSigner = web3Provider.getSigner();
        setSigner(newSigner);
        const newAddress = await newSigner.getAddress();
        setAddress(newAddress);
        setIsConnected(true);
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setProvider(null);
    setSigner(null);
    setAddress(null);
    setIsConnected(false);
    // Note: MetaMask doesn't have a formal disconnect method
    // We just reset the state
  };

  return (
    <WalletContext.Provider
      value={{
        provider,
        signer,
        address,
        isConnecting,
        isConnected,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};