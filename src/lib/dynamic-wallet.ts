import { ethers } from 'ethers';

// Type definitions for Dynamic Wallet
export interface DynamicWalletOptions {
  environmentId: string;
  appName?: string;
  appLogoUrl?: string;
}

export interface WalletConnectData {
  uri: string;
  qrCodeImageUrl?: string;
}

// URL to load the Dynamic Wallet iframe or redirect users to
const DYNAMIC_WALLET_URL = 'https://app.dynamic.xyz';

/**
 * Dynamic Wallet Integration
 * 
 * This class provides integration with Dynamic's global wallet solution,
 * allowing users to use their embedded wallets across multiple applications.
 */
export class DynamicWallet {
  private environmentId: string;
  private appName: string;
  private appLogoUrl?: string;
  private provider: ethers.providers.Web3Provider | null = null;
  
  constructor(options: DynamicWalletOptions) {
    this.environmentId = options.environmentId;
    this.appName = options.appName || 'SeiPatron';
    this.appLogoUrl = options.appLogoUrl;
  }
  
  /**
   * Initialize the Dynamic wallet
   * This method should be called once when your app loads
   */
  public async initialize(): Promise<void> {
    // Check if user has an existing session
    try {
      if (typeof window !== 'undefined' && window.ethereum) {
        this.provider = new ethers.providers.Web3Provider(window.ethereum as any);
        
        // Try to silently connect
        const accounts = await window.ethereum.request({ 
          method: 'eth_accounts' // This doesn't trigger a popup
        });
        
        if (accounts && accounts.length > 0) {
          console.log('User already connected:', accounts[0]);
          return;
        }
      }
    } catch (error) {
      console.error('Error initializing Dynamic wallet:', error);
    }
  }
  
  /**
   * Connect to the Dynamic wallet
   */
  public async connect(): Promise<ethers.providers.Web3Provider | null> {
    try {
      // Check if window.ethereum is available (browser wallet)
      if (typeof window !== 'undefined' && window.ethereum) {
        try {
          // Request accounts
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          
          // Create provider
          this.provider = new ethers.providers.Web3Provider(window.ethereum as any);
          return this.provider;
        } catch (error) {
          console.error('Error connecting to wallet:', error);
        }
      } else {
        // No browser wallet available, redirect to Dynamic Wallet
        this.redirectToDynamicWallet();
        return null;
      }
    } catch (error) {
      console.error('Error connecting to Dynamic wallet:', error);
      return null;
    }
    
    return null;
  }
  
  /**
   * Get WalletConnect URI for connecting to external wallets
   */
  public async getWalletConnectData(): Promise<WalletConnectData | null> {
    // In a real implementation, this would make an API call to Dynamic's backend
    // For now, we'll mock this functionality
    console.warn('WalletConnect integration requires the Dynamic SDK or API access');
    return null;
  }
  
  /**
   * Redirect user to Dynamic Wallet web app
   */
  private redirectToDynamicWallet(): void {
    if (typeof window !== 'undefined') {
      const redirectUrl = `${DYNAMIC_WALLET_URL}/connect?environmentId=${this.environmentId}&appName=${encodeURIComponent(this.appName)}`;
      window.open(redirectUrl, '_blank');
    }
  }
  
  /**
   * Check if user is connected
   */
  public async isConnected(): Promise<boolean> {
    if (!this.provider) return false;
    
    try {
      const accounts = await this.provider.listAccounts();
      return accounts.length > 0;
    } catch (error) {
      console.error('Error checking connection:', error);
      return false;
    }
  }
  
  /**
   * Get the user's address
   */
  public async getAddress(): Promise<string | null> {
    if (!this.provider) return null;
    
    try {
      const accounts = await this.provider.listAccounts();
      if (accounts.length === 0) return null;
      return accounts[0];
    } catch (error) {
      console.error('Error getting address:', error);
      return null;
    }
  }
  
  /**
   * Get the current ethers provider
   */
  public getProvider(): ethers.providers.Web3Provider | null {
    return this.provider;
  }
  
  /**
   * Get the current signer
   */
  public getSigner(): ethers.Signer | null {
    if (!this.provider) return null;
    return this.provider.getSigner();
  }
}