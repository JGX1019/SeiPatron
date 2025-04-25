"use client";

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import MainLayout from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Shield, Zap, Clock, Coins, Fingerprint, Users, FileCode } from 'lucide-react';

// Animation variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
};

// Feature section items
const features = [
  {
    icon: <Coins className="h-6 w-6 text-accent-500" />,
    title: 'Lower Fees',
    description: 'Only 3% platform fee vs. 8-12% on traditional platforms with no hidden charges.'
  },
  {
    icon: <Zap className="h-6 w-6 text-accent-500" />,
    title: 'Instant Payments',
    description: 'Creators receive funds instantly without waiting periods or payment thresholds.'
  },
  {
    icon: <Shield className="h-6 w-6 text-accent-500" />,
    title: 'Censorship Resistance',
    description: 'No arbitrary demonetization. Your content remains permanently available.'
  },
  {
    icon: <Clock className="h-6 w-6 text-accent-500" />,
    title: 'Flexible Subscription Options',
    description: 'Offer daily, weekly, or monthly subscription tiers to your audience.'
  },
  {
    icon: <Users className="h-6 w-6 text-accent-500" />,
    title: 'Global Access',
    description: 'No banking or geographic restrictions. Accessible to creators worldwide.'
  },
  {
    icon: <Fingerprint className="h-6 w-6 text-accent-500" />,
    title: 'Transparent Economics',
    description: 'On-chain verification of subscriber counts and public proof of creator success.'
  },
];

// How it works steps
const steps = [
  {
    number: '01',
    title: 'Connect Your Wallet',
    description: 'Connect your Dynamax wallet to SeiPatron with a single click.'
  },
  {
    number: '02',
    title: 'Create Your Profile',
    description: 'Set up your creator profile and define your subscription tiers.'
  },
  {
    number: '03',
    title: 'Publish Exclusive Content',
    description: 'Share content with your subscribers through token-gated access.'
  },
  {
    number: '04',
    title: 'Earn Instantly',
    description: 'Receive subscription payments directly to your wallet with no delays.'
  }
];

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-primary-50 dark:from-gray-900 dark:to-gray-800 pt-20 pb-32">
        <div className="container mx-auto px-4 pt-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <motion.div 
              className="md:w-1/2 text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">Decentralized</span> Creator Subscriptions on Sei
              </h1>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-lg mx-auto md:mx-0">
                SeiPatron lets creators monetize content through recurring payments in SEI tokens with only 3% fees, instant payouts, and true content ownership.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button size="lg" className="font-semibold">
                  Explore Creators
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="secondary" className="font-semibold">
                  Become a Creator
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-700">
                <div className="relative w-full aspect-video bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <div className="text-center p-6">
                    <FileCode size={64} className="mx-auto mb-4 text-primary-500" />
                    <p className="text-gray-500 dark:text-gray-400">Platform Preview Image</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Creators</p>
              <h3 className="text-3xl font-bold text-primary-600 dark:text-primary-400">1,000+</h3>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Active Subscribers</p>
              <h3 className="text-3xl font-bold text-primary-600 dark:text-primary-400">25,000+</h3>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Platform Fee</p>
              <h3 className="text-3xl font-bold text-accent-500">Only 3%</h3>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Creator Earnings</p>
              <h3 className="text-3xl font-bold text-accent-500">1M+ SEI</h3>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Why Creators Choose <span className="text-primary-600 dark:text-primary-400">SeiPatron</span>
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Our blockchain-powered platform offers benefits that traditional subscription services can't match.
            </motion.p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700"
                variants={itemVariants}
              >
                <div className="bg-primary-100 dark:bg-primary-900/30 p-3 rounded-full w-fit mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              How It Works
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Get started with SeiPatron in four simple steps
            </motion.p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 relative overflow-hidden"
                variants={itemVariants}
              >
                <div className="absolute -right-4 -top-4 bg-primary-100 dark:bg-primary-900/30 w-16 h-16 rounded-full flex items-center justify-center font-bold text-primary-600 dark:text-primary-400 text-xl opacity-30">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="mt-16 text-center">
            <Button size="lg" className="font-semibold">
              Learn More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* For Creators Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                For <span className="text-primary-600 dark:text-primary-400">Creators</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                SeiPatron gives you the tools to build a sustainable income stream with lower fees and instant access to your earnings.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  'Simple dashboard for subscription tier management',
                  'Content management system with token-gating',
                  'Subscriber analytics and retention metrics',
                  'One-click withdrawal of earnings',
                  'Custom community badges and NFT perks'
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-6 w-6 text-accent-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              
              <Button size="lg" className="font-semibold">
                Start Creating
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-700">
                <div className="relative w-full aspect-video bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <div className="text-center p-6">
                    <FileCode size={64} className="mx-auto mb-4 text-primary-500" />
                    <p className="text-gray-500 dark:text-gray-400">Creator Dashboard Preview</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* For Subscribers Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              className="lg:w-1/2 order-2 lg:order-1"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-700">
                <div className="relative w-full aspect-video bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <div className="text-center p-6">
                    <FileCode size={64} className="mx-auto mb-4 text-accent-500" />
                    <p className="text-gray-500 dark:text-gray-400">Subscriber Experience Preview</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2 order-1 lg:order-2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                For <span className="text-accent-500">Subscribers</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Support your favorite creators directly while accessing exclusive content through a seamless blockchain experience.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  'One-time wallet connection with auto-renewals',
                  'Browse creator marketplace',
                  'Manage active subscriptions',
                  'Tiered access to exclusive content',
                  'On-chain proof of support',
                  'Community engagement features'
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-6 w-6 text-primary-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              
              <Button size="lg" variant="secondary" className="font-semibold">
                Explore Creators
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary-600 dark:bg-primary-900">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to Join the Decentralized Creator Economy?
            </h2>
            <p className="text-xl text-primary-100 mb-10">
              Create or support content with full transparency, lower fees, and instant payments.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="font-semibold">
                Become a Creator
              </Button>
              <Button size="lg" className="font-semibold bg-accent-500 hover:bg-accent-600 text-white">
                Connect Wallet
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}
