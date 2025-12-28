'use client';

import styles from '../../styles/Goods.module.css';

export default function Goods() {
  return (
    <div className={styles.container} style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '60vh',
      flexDirection: 'column'
    }}>
      <h1 style={{ 
        fontSize: '1.5rem', 
        opacity: 0.8,
        color: '#fff',
        fontWeight: 'normal',
        letterSpacing: '2px'
      }}>
        抱歉...本頁正在維修中
      </h1>
    </div>
  );
}
