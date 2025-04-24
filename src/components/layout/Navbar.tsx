"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { shortenAddress } from '@/lib/contract';
import { Menu, X } from 'lucide-react';
import { DynamicWidget } from '@dynamic-labs/sdk-react-core';

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

          {/* Dynamic Wallet Widget */}
          <div className="flex items-center">
            {isMounted && <DynamicWidget />}
            
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