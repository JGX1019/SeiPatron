"use client";

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, WagmiProvider, createConfig } from 'wagmi';
import { sei, seiTestnet } from 'viem/chains';

// Import Dynamic-specific components
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector';

// Create query client for React Query
const queryClient = new QueryClient();

interface DynamicWalletProviderProps {
  children: React.ReactNode;
}

export const DynamicWalletProvider: React.FC<DynamicWalletProviderProps> = ({ children }) => {
  // Create Wagmi configuration - only allowing seiTestnet
  const config = createConfig({
    chains: [seiTestnet],
    transports: {
      [seiTestnet.id]: http(),
    },
  });
  
  return (
    // Step 1: Wrap with DynamicContextProvider
    <DynamicContextProvider
      settings={{
        environmentId: "8dc5a745-887b-47d8-a7b8-3b4d6306246d", // Using the existing environmentId from the previous implementation
      }}
    >
      {/* Step 2: Add Wagmi provider */}
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          {/* Step 3: Connect Dynamic to Wagmi */}
          <DynamicWagmiConnector>
            {children}
          </DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
};

export default DynamicWalletProvider;