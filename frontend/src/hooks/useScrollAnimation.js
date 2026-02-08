import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

/**
 * Custom hook for scroll-triggered animations
 * Respects user's motion preferences
 */
export const useScrollAnimation = (options = {}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: options.margin || "-100px",
    ...options
  });

  return { ref, isInView };
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};
