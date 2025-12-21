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
  
  // 頁面載入追蹤
  const [isPageReady, setIsPageReady] = useState(false);
  
  // 監聽頁面完整渲染
  useEffect(() => {
    let progress = 0;
    const updateProgress = (value) => {
      progress = value;
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('updateLoadingProgress', {
          detail: { progress, isComplete: progress >= 100 }
        }));
      }
    };

    // 初始進度
    updateProgress(0);
    console.log('[Gallery] 開始載入頁面');

    // DOM 載入完成
    if (document.readyState === 'loading') {
      const handleDOMContentLoaded = () => {
        console.log('[Gallery] DOM 載入完成');
        updateProgress(30);
      };
      document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
    } else {
      updateProgress(30);
    }

    // 監聽所有資源載入完成
    const handleLoad = () => {
      console.log('[Gallery] 所有資源載入完成');
      updateProgress(70);
      
      // 等待一小段時間確保渲染完成
      setTimeout(() => {
        console.log('[Gallery] 頁面渲染完成');
        updateProgress(100);
        setIsPageReady(true);
      }, 500);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    // 設定最大等待時間（10 秒）
    const maxTimeout = setTimeout(() => {
      console.log('[Gallery] 達到最大等待時間，強制完成');
      updateProgress(100);
      setIsPageReady(true);
    }, 10000);

    return () => {
      document.removeEventListener('DOMContentLoaded', () => {});
      window.removeEventListener('load', handleLoad);
      clearTimeout(maxTimeout);
    };
  }, []);

  
  // 建立方格陣列
  const slots = Array.from({ length: totalSlots }, (_, index) => {
    if (index < photos.length) {
      return photos[index];
    }
    return null; // 空白方格
  });

  return (
    <div className={styles.pageWrapper}>
      {/* 頁面角落裝飾照片 */}
      <div className={styles.pageCornerPhoto} style={{ top: '300px', left: '-60px', rotate: '-5deg'}}>
        <Image
          src="/images/items/can1.png"
          alt="角落裝飾"
          width={150}
          height={200}
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className={styles.pageCornerPhoto} style={{ top: '210px', right: '-180px', rotate: '15deg' }}>
        <Image
          src="/images/items/can2.png"
          alt="角落裝飾"
          width={200}
          height={250}
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className={styles.pageCornerPhoto} style={{ top: '750px', left: '-20px', rotate: '-15deg' }}>
        <Image
          src="/images/items/tamiyacan.png"
          alt="角落裝飾"
          width={100}
          height={200}
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className={styles.pageCornerPhoto} style={{ top: '850px', right: '-220px' }}>
        <Image
          src="/images/items/can3.png"
          alt="角落裝飾"
          width={120}
          height={250}
          style={{ objectFit: 'cover' }}
        />
      </div>

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
