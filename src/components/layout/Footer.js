import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <span className={styles.logoText}>2025 東海工設週</span>
          <p className={styles.copyright}>&copy; {currentYear} THU ID WEEK. All rights reserved.</p>
        </div>
        
        <div className={styles.links}>
          <Link href="/" className={styles.link}>Home</Link>
          <Link href="/intro/spray" className={styles.link}>Spray</Link>
          <Link href="/intro/3dprinting" className={styles.link}>3D Printing</Link>
          <Link href="/goods" className={styles.link}>Goods</Link>
        </div>
      </div>
    </footer>
  );
};