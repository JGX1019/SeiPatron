"use client";

import React from 'react';
import {
  DynamicContextProvider,
} from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

interface DynamicWalletProviderProps {
  children: React.ReactNode;
}

export const DynamicWalletProvider: React.FC<DynamicWalletProviderProps> = ({ children }) => {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: "8dc5a745-887b-47d8-a7b8-3b4d6306246d",
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      {children as any}
    </DynamicContextProvider>
  );
};

export default DynamicWalletProvider;