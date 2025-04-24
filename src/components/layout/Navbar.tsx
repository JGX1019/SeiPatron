"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { shortenAddress } from '@/lib/contract';
import { Wallet, Menu, X, ChevronDown } from 'lucide-react';
import { connectWallet, switchToSeiNetwork, setupAccountChangedListener, setupChainChangedListener } from '@/lib/wallet';

// Navigation menu items
const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Explore', href: '/explore' },
  { name: 'For Creators', href: '/creators' },
  { name: 'How It Works', href: '/how-it-works' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Check scroll position to add background to navbar
  useEffect(() => {
    setIsMounted(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Setup wallet listeners
  useEffect(() => {
    if (!isMounted) return;

    // Setup listeners for wallet changes
    const accountsCleanup = setupAccountChangedListener((accounts: string[]) => {
      if (accounts.length === 0) {
        setWalletAddress(null);
      } else {
        setWalletAddress(accounts[0]);
      }
    });

    const chainCleanup = setupChainChangedListener(() => {
      window.location.reload();
    });

    return () => {
      accountsCleanup();
      chainCleanup();
    };
  }, [isMounted]);

  // Handle wallet connection
  const handleConnectWallet = async () => {
    if (!isMounted) return;
    
    setIsConnecting(true);
    try {
      const provider = await connectWallet();
      
      if (provider) {
        await switchToSeiNetwork();
        
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setWalletAddress(null);
    // Note: This just resets the UI state since many wallets don't support programmatic disconnection
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 w-full z-50 py-4 transition-all duration-300',
          isScrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur shadow-sm' : 'bg-transparent'
        )}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo on the left */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              className="text-primary-600 dark:text-primary-400 font-bold text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              SeiPatron
            </motion.div>
          </Link>

          {/* Desktop menu in the center */}
          <nav className="hidden md:flex items-center justify-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium text-sm transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Connect Wallet button on the right */}
          <div className="flex items-center">
            {walletAddress ? (
              <div className="relative group">
                <Button
                  variant="outline"
                  className="flex items-center space-x-2 border border-primary-500 text-primary-600"
                  rightIcon={<ChevronDown className="h-4 w-4" />}
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  <span>{shortenAddress(walletAddress)}</span>
                </Button>
                <div className="absolute right-0 top-full mt-2 w-48 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out">
                  <div className="py-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                    <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                      Dashboard
                    </Link>
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                      Profile
                    </Link>
                    <button 
                      onClick={disconnectWallet}
                      className="w-full text-left px-4 py-2 text-sm text-error-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Disconnect
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Button
                onClick={handleConnectWallet}
                isLoading={isConnecting}
                leftIcon={<Wallet className="h-4 w-4" />}
              >
                Connect Wallet
              </Button>
            )}
            
            {/* Mobile menu button */}
            <button
              className="ml-4 md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-800 dark:text-gray-200" />
              ) : (
                <Menu className="h-6 w-6 text-gray-800 dark:text-gray-200" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed top-[72px] left-0 right-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;