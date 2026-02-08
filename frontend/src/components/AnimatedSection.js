import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

/**
 * Reusable animated section component
 * Provides consistent scroll-triggered animations across the site
 */
const AnimatedSection = ({ 
  children, 
  delay = 0, 
  duration = 0.5,
  direction = 'up', // 'up', 'down', 'left', 'right', 'fade'
  distance = 30,
  className = '',
  style = {}
}) => {
  const { ref, isInView } = useScrollAnimation({ margin: "-80px" });

  const directionVariants = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    fade: { y: 0, x: 0 }
  };

  const initial = {
    opacity: 0,
    ...directionVariants[direction]
  };

  const animate = {
    opacity: isInView ? 1 : 0,
    x: isInView ? 0 : directionVariants[direction].x || 0,
    y: isInView ? 0 : directionVariants[direction].y || 0
  };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1] // ease-out cubic bezier
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
