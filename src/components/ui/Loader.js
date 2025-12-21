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
  const intervalRef = useRef(null);
  const useExternalProgress = useRef(false);

  useEffect(() => {
    // Reset and start animation on path or search params change
    startLoading();
  }, [ pathname, searchParams ]);

  // 滾動鎖定：當 Loader 顯示時禁止滾動
  useEffect(() => {
    if (isVisible) {
      // 鎖定滾動
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } else {
      // 恢復滾動
      document.body.style.overflow = '';
      document.body.style.height = '';
    }

    // 清理函數
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, [isVisible]);

  // 監聽外部進度更新事件
  useEffect(() => {
    const handleExternalProgress = (event) => {
      const { progress: externalProgress, isComplete } = event.detail;
      
      // 標記使用外部進度
      useExternalProgress.current = true;
      
      // 清除自動進度的 interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      
      // 更新進度
      setProgress(Math.round(externalProgress));
      
      // 如果完成，隱藏 loader
      if (isComplete && externalProgress >= 100) {
        setTimeout(() => {
          setIsVisible(false);
          useExternalProgress.current = false;
        }, 500);
      }
    };

    window.addEventListener('updateLoadingProgress', handleExternalProgress);
    
    return () => {
      window.removeEventListener('updateLoadingProgress', handleExternalProgress);
    };
  }, []);

  const startLoading = () => {
    setIsVisible(true);
    setProgress(0);
    useExternalProgress.current = false;

    let currentProgress = 0;
    const interval = setInterval(() => {
      // 如果使用外部進度，停止自動進度
      if (useExternalProgress.current) {
        clearInterval(interval);
        return;
      }

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

    intervalRef.current = interval;

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