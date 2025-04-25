import React, { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant = 'primary', size = 'md', disabled, isLoading, leftIcon, rightIcon, ...props }, ref) => {
    const variants = {
      primary: 'bg-primary-600 text-white focus:ring-primary-500',
      secondary: 'bg-gray-100 text-gray-900 focus:ring-gray-500',
      outline: 'border border-gray-300 text-gray-700 focus:ring-gray-500',
      ghost: 'text-gray-700 focus:ring-gray-500',
      link: 'text-primary-600 underline-offset-4 hover:underline focus:ring-primary-500 p-0',
      success: 'bg-success-500 text-white hover:bg-success-600 focus:ring-success-400',
      danger: 'bg-error-500 text-white hover:bg-error-600 focus:ring-error-400',
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-6 text-base',
      icon: 'h-10 w-10',
    };

    const isDisabled = disabled || isLoading;

    return (
      <motion.div 
        className="inline-block"
        whileTap={{ scale: isDisabled ? 1 : 0.97 }}
      >
        <button
          className={cn(
            'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
            variants[variant],
            sizes[size],
            isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none',
            className
          )}
          disabled={isDisabled}
          ref={ref}
          {...props}
        >
          {isLoading && (
            <svg 
              className="mr-2 h-4 w-4 animate-spin" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              ></circle>
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
          {children}
          {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
        </button>
      </motion.div>
    );
  }
);

Button.displayName = "Button";

export { Button };