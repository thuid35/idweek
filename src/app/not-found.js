'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function NotFound() {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} style={{
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#000',
      color: '#fff',
      padding: '2rem',
      textAlign: 'center',
      marginTop: '100px' // Offset for fixed header
    }}>
      <h1 style={{
        fontSize: 'clamp(8rem, 20vw, 15rem)',
        fontWeight: '900',
        lineHeight: '1',
        letterSpacing: '-0.05em',
        background: 'linear-gradient(180deg, #fff 0%, #666 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        margin: 0,
        fontFamily: 'var(--font-geist-mono, monospace)'
      }}>
        404
      </h1>
      
      <div style={{
        marginTop: '-1rem',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <div style={{ width: '50px', height: '2px', background: '#333' }}></div>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 'normal',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#888'
        }}>
          Page Not Found
        </h2>
        <div style={{ width: '50px', height: '2px', background: '#333' }}></div>
      </div>

      <p style={{
        fontSize: '1.2rem',
        maxWidth: '600px',
        color: '#666',
        lineHeight: '1.6',
        marginBottom: '3rem'
      }}>
        ⌏❬ 孵化失敗 ❭ ⌌ <br/>
        您要找的頁面似乎還未完成孵化，或者已經被移除了。<br/>
        請嘗試返回首頁重新探索。
      </p>

      <Link href="/" style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem 3rem',
        background: '#fff',
        color: '#000',
        textDecoration: 'none',
        fontSize: '1rem',
        fontWeight: 'bold',
        letterSpacing: '2px',
        borderRadius: '50px',
        transition: 'all 0.3s ease',
        border: '1px solid #fff'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = '#000';
        e.currentTarget.style.color = '#fff';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = '#fff';
        e.currentTarget.style.color = '#000';
      }}
      >
        返回首頁
      </Link>
    </div>
  );
}
