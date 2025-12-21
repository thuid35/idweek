'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './Gallery.module.css';
import classmatesData from '@/data/classmates.json';

export default function Gallery() {
  // 總共 36 個方格
  const totalSlots = 36;
  const photos = classmatesData.photos;
  
  // 追蹤每張照片的 hover 狀態
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  // 圖片載入追蹤
  const [loadedImages, setLoadedImages] = useState(0);
  const totalImages = useRef(0);
  const loadedImagesSet = useRef(new Set());
  const loadingTimeoutRef = useRef(null);
  const lastProgressRef = useRef(0);
  
  // 計算總圖片數
  useEffect(() => {
    // 只追蹤靜態圖片（不追蹤 overlay，因為它們會重複）
    // 老師：2 張靜態
    // 總召：2 張靜態
    // 同學：36 張靜態
    // GIF 預載：40 張（2 老師 + 2 總召 + 36 同學）
    // 總計：80 張
    totalImages.current = 80;
    
    // 設定 timeout，10 秒後強制完成
    loadingTimeoutRef.current = setTimeout(() => {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('updateLoadingProgress', {
          detail: { progress: 100, isComplete: true }
        }));
      }
    }, 10000);
    
    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);
  
  // 更新載入進度（平滑更新）
  useEffect(() => {
    if (totalImages.current > 0) {
      const newProgress = (loadedImages / totalImages.current) * 100;
      
      // 只有當新進度大於上次進度時才更新（防止倒退）
      if (newProgress > lastProgressRef.current) {
        lastProgressRef.current = newProgress;
        
        const isComplete = loadedImages >= totalImages.current;
        
        // 使用 requestAnimationFrame 平滑更新
        requestAnimationFrame(() => {
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('updateLoadingProgress', {
              detail: { progress: newProgress, isComplete }
            }));
          }
        });
        
        // 如果完成，清除 timeout
        if (isComplete && loadingTimeoutRef.current) {
          clearTimeout(loadingTimeoutRef.current);
        }
      }
    }
  }, [loadedImages]);

  
  // 處理圖片載入完成
  const handleImageLoad = (imageId) => {
    if (!loadedImagesSet.current.has(imageId)) {
      loadedImagesSet.current.add(imageId);
      setLoadedImages(prev => prev + 1);
    }
  };
  
  // 預載所有 GIF
  useEffect(() => {
    const preloadImages = [];
    
    // 老師 GIF
    preloadImages.push('/images/teachers_g/chang.gif');
    preloadImages.push('/images/teachers_g/lin.gif');
    
    // 總召 GIF
    preloadImages.push('/images/manager_g/wu.gif');
    preloadImages.push('/images/manager_g/lee.gif');
    
    // 同學 GIF
    photos.forEach(photo => {
      preloadImages.push(photo.gifSrc);
    });
    
    // 預載所有 GIF
    preloadImages.forEach((src, index) => {
      const img = new window.Image();
      img.onload = () => handleImageLoad(`preload-gif-${index}`);
      img.onerror = () => handleImageLoad(`preload-gif-${index}`); // 即使錯誤也計入，避免卡住
      img.src = src;
    });
  }, [photos]);

  
  // 建立方格陣列
  const slots = Array.from({ length: totalSlots }, (_, index) => {
    if (index < photos.length) {
      return photos[index];
    }
    return null; // 空白方格
  });

  return (
    <div className={styles.pageWrapper}>
      {/* 老師區塊 - 2 張照片 */}
      <div className={styles.sectionContainer}>
        <h2 className={styles.sectionTitle}>指導老師</h2>
        <div className={styles.photoColumn}>
          {/* 老師 1 */}
          <div className={styles.photoWithName}>
            <div 
              className={styles.specialPhotoSlot}
              onMouseEnter={() => setHoveredIndex('teacher1')}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={styles.photoWrapper}>
                <Image
                  src={hoveredIndex === 'teacher1' ? "/images/teachers_g/chang.gif" : "/images/teachers_p/chang.jpg"}
                  alt="老師照片 1"
                  fill
                  sizes="(max-width: 600px) 140px, (max-width: 1200px) 350px, 400px"
                  className={styles.photo}
                  style={{ objectFit: 'cover' }}
                  unoptimized={hoveredIndex === 'teacher1'}
                  onLoad={() => handleImageLoad('teacher1-static')}
                />
                <div className={styles.boxOverlay}>
                  <Image
                    src="/images/box2.png"
                    alt="Box overlay"
                    fill
                    sizes="(max-width: 600px) 140px, (max-width: 1200px) 350px, 400px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
            <p className={styles.photoName}>張俊元</p>
          </div>

          {/* 老師 2 */}
          <div className={styles.photoWithName}>
            <div 
              className={styles.specialPhotoSlot}
              onMouseEnter={() => setHoveredIndex('teacher2')}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={styles.photoWrapper}>
                <Image
                  src={hoveredIndex === 'teacher2' ? "/images/teachers_g/lin.gif" : "/images/teachers_p/lin.jpg"}
                  alt="老師照片 2"
                  fill
                  sizes="(max-width: 600px) 140px, (max-width: 1200px) 350px, 400px"
                  className={styles.photo}
                  style={{ objectFit: 'cover' }}
                  unoptimized={hoveredIndex === 'teacher2'}
                  onLoad={() => handleImageLoad('teacher2-static')}
                />
                <div className={styles.boxOverlay}>
                  <Image
                    src="/images/box2.png"
                    alt="Box overlay"
                    fill
                    sizes="(max-width: 600px) 140px, (max-width: 1200px) 350px, 400px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
            <p className={styles.photoName}>林淨暘</p>
          </div>
        </div>
      </div>

      {/* 總召區塊 - 2 張照片 */}
      <div className={styles.sectionContainer}>
        <h2 className={styles.sectionTitle}>總召 / 副總召</h2>
        <div className={styles.photoColumn}>
          {/* 總召 1 */}
          <div className={styles.photoWithName}>
            <div 
              className={styles.specialPhotoSlot}
              onMouseEnter={() => setHoveredIndex('coordinator1')}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={styles.photoWrapper}>
                <Image
                  src={hoveredIndex === 'coordinator1' ? "/images/manager_g/wu.gif" : "/images/manager_p/wu.jpg"}
                  alt="總召照片 1"
                  fill
                  sizes="(max-width: 600px) 140px, (max-width: 1200px) 350px, 400px"
                  className={styles.photo}
                  style={{ objectFit: 'cover' }}
                  unoptimized={hoveredIndex === 'coordinator1'}
                  onLoad={() => handleImageLoad('coordinator1-static')}
                />
                <div className={styles.boxOverlay}>
                  <Image
                    src="/images/box2.png"
                    alt="Box overlay"
                    fill
                    sizes="(max-width: 600px) 140px, (max-width: 1200px) 350px, 400px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
            <p className={styles.photoName}>吳廷恩</p>
          </div>

          {/* 總召 2 */}
          <div className={styles.photoWithName}>
            <div 
              className={styles.specialPhotoSlot}
              onMouseEnter={() => setHoveredIndex('coordinator2')}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={styles.photoWrapper}>
                <Image
                  src={hoveredIndex === 'coordinator2' ? "/images/manager_g/lee.gif" : "/images/manager_p/lee.jpg"}
                  alt="總召照片 2"
                  fill
                  sizes="(max-width: 600px) 140px, (max-width: 1200px) 350px, 400px"
                  className={styles.photo}
                  style={{ objectFit: 'cover' }}
                  unoptimized={hoveredIndex === 'coordinator2'}
                  onLoad={() => handleImageLoad('coordinator2-static')}
                />
                <div className={styles.boxOverlay}>
                  <Image
                    src="/images/box2.png"
                    alt="Box overlay"
                    fill
                    sizes="(max-width: 600px) 140px, (max-width: 1200px) 350px, 400px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
            <p className={styles.photoName}>李昀蓁</p>
          </div>
        </div>
      </div>

      {/* 同學照片網格 */}
      <div className={styles.galleryContainer}>
        <div className={styles.photoGrid}>
          {slots.map((photo, index) => (
            <div 
              key={index} 
              className={styles.photoSlot}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {photo ? (
                <div className={styles.photoWrapper}>
                  <Image
                    src={hoveredIndex === index ? photo.gifSrc : photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 600px) 140px, (max-width: 1200px) 350px, 400px"
                    className={styles.photo}
                    style={{ objectFit: 'cover' }}
                    unoptimized={hoveredIndex === index} // GIF 需要 unoptimized
                    onLoad={() => handleImageLoad(`classmate-${index}-static`)}
                  />
                  {/* 覆蓋的 box.png 圖片 */}
                  <div className={styles.boxOverlay}>
                    <Image
                      src="/images/box.png"
                      alt="Box overlay"
                      fill
                      sizes="(max-width: 600px) 140px, (max-width: 1200px) 350px, 400px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </div>
              ) : (
                <div className={styles.photoPlaceholder}>
                  <span className={styles.photoNumber}>-</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
