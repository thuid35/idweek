'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import clsx from 'clsx';

export default function Header() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileOpen(false);
    setIsAboutOpen(false);
  }, [pathname]);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Link href="/">IDWeek</Link>
        </div>

        {/* Hamburger Button */}
        <button 
          className={clsx(styles.hamburger, isMobileOpen ? styles.active : (isClosing ? styles.closing : ''))}
          onClick={() => {
            if (isMobileOpen) {
              setIsClosing(true);
              setIsMobileOpen(false);
            } else {
              setIsMobileOpen(true);
              setIsClosing(false);
            }
          }}
          aria-label="Toggle menu"
        >
          <span />
          <span />
        </button>

        {/* Desktop & Mobile Menu */}
        <div className={clsx(styles.menuContainer, isMobileOpen && styles.open)}>
          <ul className={styles.menu}>
            <li><Link href="/">首頁</Link></li>
            
            {/* Mobile: Always show. Desktop: Hover */}
            <li 
              className={styles.dropdown}
              onMouseEnter={() => !isMobileOpen && setIsAboutOpen(true)}
              onMouseLeave={() => !isMobileOpen && setIsAboutOpen(false)}
            >
              <span className={styles.dropdownTrigger}>
                關於展覽 {!isMobileOpen && <span className={styles.arrow}>{isAboutOpen ? '▲' : '▼'}</span>}
              </span>
              
              <ul className={clsx(styles.dropdownMenu, (isAboutOpen || isMobileOpen) && styles.show)}>
                <li><Link href="/intro/spray">噴漆</Link></li>
                <li><Link href="/intro/3dprinting">3D列印</Link></li>
              </ul>
            </li>
            
            <li><Link href="/goods">周邊商品</Link></li>
            <li><Link href="/gallery">設計師</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
};