'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import styles from '../styles/Home.module.css';

import { Reveal } from '../components/animation/gsap';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Home() {
  const container = useRef();
  const heroRef = useRef();
  const zoomBgRef = useRef();
  const scrollIndicatorRef = useRef();


  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: '+=1500', // Scroll distance to complete animation
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Scale up the image
    tl.to(zoomBgRef.current, {
      scale: 50, // Zoom in massive
      transformOrigin: '56% 47%', // Change this to specify zoom position (e.g., '30% 40%')
      ease: 'power1.out',
    })
    .to(zoomBgRef.current, {
      opacity: 0,
      ease: 'power1.in',
    }, '<20%') // Start fading out after 20% of the zoom
    .to(scrollIndicatorRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'power1.out',
    }, '<'); // Fade out indicator immediately on scroll

  }, { scope: container });

  return (
    <div ref={container} className={styles.container}>


      <section ref={heroRef} className={styles.hero}>
        <div className={styles.zoomWrapper}>
          <img 
            ref={zoomBgRef} 
            src="/images_background/background_test.png" 
            alt="Background" 
            className={styles.heroImage} 
          />
        </div>
        <div ref={scrollIndicatorRef} className={styles.scrollIndicator}>
          <span className={styles.scrollText}>Scroll down for more</span>
          <div className={styles.scrollArrow}>
            <svg viewBox="0 0 24 24">
              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
            </svg>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <Reveal>
          <h2 className={styles.sectionTitle}>Welcome</h2>
          <p className={styles.sectionContent}>
            Explore the intersection of design and technology. 
            Scroll down to see more content revealed with GSAP animations.
          </p>
        </Reveal>
      </section>

      <section className={styles.section}>
        <Reveal delay={0.2}>
          <h2 className={styles.sectionTitle}>Featured Works</h2>
          <p className={styles.sectionContent}>
            Discover our latest projects in 3D printing, spray painting, and more.
          </p>
        </Reveal>
      </section>
    </div>
  );
}
