import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper function to merge Tailwind CSS classes without conflicts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper to shorten address for display
export const shortenAddress = (address: string): string => {
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

// Format currency amounts (SEI tokens) for display
export function formatCurrency(amount: number | string, decimals: number = 4): string {
  const value = typeof amount === 'string' ? parseFloat(amount) : amount;
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

// Format large numbers with k, m, b suffixes
export function formatCompactNumber(number: number): string {
  return Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(number);
}

// Calculate time remaining in a nice human readable format
export function getTimeRemaining(targetDate: number): string {
  const now = Math.floor(Date.now() / 1000);
  const seconds = targetDate - now;
  
  if (seconds < 0) return 'Expired';
  
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (days > 0) return `${days}d ${hours}h remaining`;
  if (hours > 0) return `${hours}h ${minutes}m remaining`;
  return `${minutes}m remaining`;
}

// Get readable time period from seconds
export function getSubscriptionPeriod(seconds: number): string {
  switch(seconds) {
    case 86400: return 'Daily';
    case 604800: return 'Weekly';
    case 2592000: return 'Monthly';
    default: return `${seconds / 86400} days`;
  }
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

// Generate a gradient for creator banners based on their address
export function generateGradient(address: string): string {
  const hash = address.substring(2, 10); // Use a portion of the address
  const hue1 = parseInt(hash.substring(0, 3), 16) % 360;
  const hue2 = (hue1 + 40) % 360;
  return `linear-gradient(135deg, hsl(${hue1}, 70%, 60%) 0%, hsl(${hue2}, 70%, 50%) 100%)`;
}