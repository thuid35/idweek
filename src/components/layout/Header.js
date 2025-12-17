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
            <li><Link href="/">Home</Link></li>
            
            {/* Mobile: Click to toggle sub-menu. Desktop: Hover */}
            <li 
              className={styles.dropdown}
              onMouseEnter={() => !isMobileOpen && setIsAboutOpen(true)}
              onMouseLeave={() => !isMobileOpen && setIsAboutOpen(false)}
              onClick={() => isMobileOpen && setIsAboutOpen(!isAboutOpen)}
            >
              <span className={styles.dropdownTrigger}>
                About <span className={styles.arrow}>{isAboutOpen ? '▲' : '▼'}</span>
              </span>
              
              <ul className={clsx(styles.dropdownMenu, isAboutOpen && styles.show)}>
                <li><Link href="/about/spray">Spray</Link></li>
                <li><Link href="/about/3d-printing">3D Printing</Link></li>
              </ul>
            </li>
            
            <li><Link href="/goods">Goods</Link></li>
            <li><Link href="/info">Info</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
};