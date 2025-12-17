'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import styles from './Loader.module.css';

export default function Loader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [ progress, setProgress ] = useState(0);
  const [ isVisible, setIsVisible ] = useState(true);
  const isInitialLoad = useRef(true);

  useEffect(() => {
    // Reset and start animation on path or search params change
    startLoading();
  }, [ pathname, searchParams ]);

  const startLoading = () => {
    setIsVisible(true);
    setProgress(0);

    let currentProgress = 0;
    const interval = setInterval(() => {
      // Logic to determine max progress based on loading state
      let maxProgress = 100;
      
      // On initial load, wait for document complete
      if (isInitialLoad.current) {
        if (typeof document !== 'undefined' && document.readyState !== 'complete') {
          maxProgress = 99;
        } else {
          // Once loaded, mark initial load as done
          isInitialLoad.current = false;
        }
      }

      // Random increment between 5 and 15
      const increment = Math.floor(Math.random() * 10) + 5;
      
      // Calculate potential new progress
      let nextProgress = currentProgress + increment;

      // Cap at maxProgress
      if (nextProgress > maxProgress) {
        nextProgress = maxProgress;
      }

      currentProgress = nextProgress;

      // If we reached 100, finish
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsVisible(false);
        }, 500); // Keep 100% visible for a moment
      }

      setProgress(currentProgress);
    }, 80); // Update values every X ms

    return () => clearInterval(interval);
  };

  // Initial load listener
  useEffect(() => {
    const handleLoad = () => {
      // This will allow the interval to proceed past 99
      // isInitialLoad.current will be checked in the interval
    };

    if (typeof window !== 'undefined') {
      if (document.readyState === 'complete') {
        // Already loaded
      } else {
        window.addEventListener('load', handleLoad);
      }
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('load', handleLoad);
      }
    };
  }, []);

  return (
    <div id="loader_container" className={`${styles.loaderContainer} ${!isVisible ? styles.hidden : ''}`}>
      <div className={styles.progressContainer}>
        <div className={styles.percentage}>{progress}</div>
      </div>
    </div>
  );
};