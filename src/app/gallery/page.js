'use client';

import Image from 'next/image';
import styles from './Gallery.module.css';
import classmatesData from '@/data/classmates.json';

export default function Gallery() {
  // 總共 40 個方格（2 列 × 20 行）
  const totalSlots = 40;
  const photos = classmatesData.photos;
  
  // 建立 40 個方格的陣列，前 37 個有照片，後 3 個為空白
  const slots = Array.from({ length: totalSlots }, (_, index) => {
    if (index < photos.length) {
      return photos[index];
    }
    return null; // 空白方格
  });

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.galleryContainer}>
        <div className={styles.photoGrid}>
          {slots.map((photo, index) => (
            <div key={index} className={styles.photoSlot}>
              {photo ? (
                <div className={styles.photoWrapper}>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 600px) 95vw, (max-width: 1200px) 42vw, 33vw"
                    className={styles.photo}
                    style={{ objectFit: 'cover' }}
                  />
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
