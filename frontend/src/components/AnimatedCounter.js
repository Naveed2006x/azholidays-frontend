import React, { useEffect, useState, useRef } from 'react';
import { animate } from 'framer-motion';

/**
 * Animated counter component for statistics
 * Counts up from 0 to target value when scrolled into view
 */
const AnimatedCounter = ({ 
  target, 
  duration = 2, 
  suffix = '', 
  prefix = '',
  style = {},
  decimals = 0
}) => {
  const ref = useRef(null);
  const [displayValue, setDisplayValue] = useState('0');
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            const controls = animate(0, target, {
              duration: duration,
              ease: [0.25, 0.1, 0.25, 1],
              onUpdate: (value) => {
                const formatted = decimals > 0 
                  ? value.toFixed(decimals) 
                  : Math.round(value).toLocaleString();
                setDisplayValue(formatted);
              }
            });
            
            return () => controls.stop();
          }
        });
      },
      { threshold: 0.1, rootMargin: '-100px' }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [target, duration, hasAnimated, decimals]);

  return (
    <span ref={ref} style={style}>
      {prefix}{displayValue}{suffix}
    </span>
  );
};

export default AnimatedCounter;
