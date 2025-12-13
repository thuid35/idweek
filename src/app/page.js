'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import styles from '../styles/Home.module.css';
import ThreeCanvas from '../components/three/ThreeCanvas';
import SceneHome from '../components/three/SceneHome';
import { Reveal } from '../components/animation/gsap';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Home() {
  const container = useRef();
  const heroRef = useRef();
  const zoomBgRef = useRef();
  const heroContentRef = useRef();

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: '+=1000', // Scroll distance to complete animation
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Scale up the background circle to fill the screen
    tl.to(zoomBgRef.current, {
      scale: 20, // Scale massive to ensure it covers everything
      borderRadius: '0%', 
      backgroundColor: '#ffffff',
      ease: 'power1.inOut',
    })
    // Scale up text as well (zoom in effect) and fade out
    .to(heroContentRef.current, {
      opacity: 0,
      scale: 3, // Zoom in
      ease: 'power1.in',
    }, '<'); // Run at start of timeline

  }, { scope: container });

  return (
    <div ref={container} className={styles.container}>
      <ThreeCanvas className={styles.canvas}>
        <SceneHome />
      </ThreeCanvas>

      <section ref={heroRef} className={styles.hero}>
        <div className={styles.zoomWrapper}>
          <div ref={zoomBgRef} className={styles.zoomBackground} />
          <div ref={heroContentRef} className={styles.heroContent}>
            <h1 className={styles.title}>IDWeek</h1>
            <p className={styles.subtitle}>Innovation & Design Week</p>
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
