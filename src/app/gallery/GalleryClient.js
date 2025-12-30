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

    // 收集所有需要預載入的圖片
    const getAllImages = () => {
      const staticImages = [
        '/images/items/camera.png',
        '/images/items/can1.png',
        '/images/items/can2.png',
        '/images/items/tamiyacan.png',
        '/images/items/can3.png',
        '/images/box.png',
        '/images/box2.png',
        // 老師照片
        '/images/teachers_p/chang.jpg',
        '/images/teachers_g/chang.gif',
        '/images/teachers_p/lin.jpg',
        '/images/teachers_g/lin.gif',
        // 總召照片
        '/images/manager_p/wu.jpg',
        '/images/manager_g/wu.gif',
        '/images/manager_p/lee.jpg',
        '/images/manager_g/lee.gif',
      ];

      const classmateImages = photos.flatMap(photo => [photo.src, photo.gifSrc]);
      return [...staticImages, ...classmateImages];
    };

    const preloadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new window.Image();
        img.src = src;
        img.onload = () => resolve(src);
        img.onerror = () => resolve(src); // 即使失敗也視為完成，避免卡住
      });
    };

    const loadAllImages = async () => {
      console.log('[Gallery] 開始預載入圖片');
      updateProgress(10);
      
      const allImages = getAllImages();
      const totalImages = allImages.length;
      let loadedCount = 0;

      // 分批載入以避免過多並發請求（可選，這裡簡單起見直接全部並發，瀏覽器有上限）
      const loadPromises = allImages.map(src => {
        return preloadImage(src).then(() => {
          loadedCount++;
          // 計算進度：10% ~ 90%
          const currentProgress = 10 + Math.floor((loadedCount / totalImages) * 80);
          updateProgress(currentProgress);
        });
      });

      try {
        await Promise.all(loadPromises);
        console.log('[Gallery] 所有圖片載入完成');
      } catch (error) {
        console.error('[Gallery] 圖片載入發生錯誤', error);
      }

      // 完成
      updateProgress(100);
      // 稍微延遲一點點讓使用者看到 100%
      setTimeout(() => {
        setIsPageReady(true);
      }, 500);
    };

    // 開始載入流程
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', loadAllImages);
    } else {
      loadAllImages();
    }

    // 設定最大等待時間（20 秒，因為圖片較多）
    const maxTimeout = setTimeout(() => {
      console.log('[Gallery] 達到最大等待時間，強制完成');
      updateProgress(100);
      setIsPageReady(true);
    }, 20000);

    return () => {
      document.removeEventListener('DOMContentLoaded', loadAllImages);
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
      <div className={styles.pageHeader}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.mainTitle}>設計師照片</h1>
          <div style={{ position: 'absolute', top: '-50px', right: '-170px', width: '180px', height: '180px' }}>
            <Image
              src="/images/items/camera.png"
              alt="Camera"
              fill
              sizes="180px"
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
        <p className={styles.guidanceText}>穿上實驗服，站在系館工廠的紅色大門前。背景中藏著製造的痕跡與空氣，象徵在創意與實作之間反覆試驗、逐步成形的我們。</p>
        <p className={styles.guidanceSubText}>點擊拍立得，讓大家動起來吧！</p>
      </div>

      <div className={styles.teacherGroupWrapper}>
        {/* 頁面角落裝飾照片 - 相對於 teacherGroupWrapper */}
        <div className={styles.pageCornerPhoto} style={{ top: '-160px', left: '-100px', rotate: '-15deg'}}>
          <Image
            src="/images/items/can1.png"
            alt="角落裝飾"
            width={250}
            height={400}
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className={styles.pageCornerPhoto} style={{ top: '110px', right: '-400px', rotate: '15deg' }}>
          <Image
            src="/images/items/can2.png"
            alt="角落裝飾"
            width={300}
            height={350}
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className={styles.pageCornerPhoto} style={{ top: '650px', left: '-20px', rotate: '-15deg' }}>
          <Image
            src="/images/items/tamiyacan.png"
            alt="角落裝飾"
            width={140}
            height={300}
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className={styles.pageCornerPhoto} style={{ top: '750px', right: '-460px', rotate: '15deg' }}>
          <Image
            src="/images/items/can3.png"
            alt="角落裝飾"
            width={160}
            height={300}
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
              <p className={styles.photoName}>張俊元 屌nm殺逼一個</p>
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
      </div>


      {/* 總召區塊 - 2 張照片 */}
      <div className={styles.sectionContainer}>
        
        <h2 className={styles.sectionTitle}>總召 & 副總召</h2>
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