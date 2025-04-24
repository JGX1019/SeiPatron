"use client";

// Re-export specific parts of framer-motion we need to avoid the "export *" issue
import {
  motion as m,
  AnimatePresence as AP,
  useAnimation,
  useMotionValue,
  useTransform,
  useScroll,
  type Variants,
  type PanInfo,
  type MotionProps
} from 'framer-motion';

// Re-export with proper names
export const motion = m;
export const AnimatePresence = AP;

// Export hooks
export { 
  useAnimation, 
  useMotionValue, 
  useTransform, 
  useScroll 
};

// Export types
export type { 
  Variants, 
  PanInfo, 
  MotionProps 
};