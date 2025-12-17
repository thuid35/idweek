'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import styles from '../styles/Home.module.css';

import { Reveal } from '../components/animation/gsap';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
};

export default function Home() {
  const container = useRef();
  const heroRef = useRef();
  const zoomBgRef = useRef();
  const titleGraphRef = useRef();
  const titleWrapperRef = useRef();
  const scrollIndicatorRef = useRef();
  const marqueeRef = useRef();

  const lineRef = useRef();
  const lineBottomRef = useRef();


  useGSAP(() => {
    // Initial entrance animation for title wrapper
    gsap.from(titleWrapperRef.current, {
      x: -50, // Start slightly to the left
      opacity: 0,
      duration: 1.5,
      ease: 'power3.out',
      delay: 0.5,
    });

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

    // Move title graph to the left
    tl.to(titleGraphRef.current, {
      x: '-20%', // Move left by 20% of its width/container
      ease: 'none',
    }, 0);

    // Scale up the background image
    tl.to(zoomBgRef.current, {
      scale: 50, // Zoom in massive
      transformOrigin: '57% 46%', // Change this to specify zoom position (e.g., '30% 40%')
      ease: 'power1.out',
    }, '<')
    .to(zoomBgRef.current, {
      filter: 'blur(10px)', // Add blur effect
      ease: 'power1.out',
    }, '<') // Run simultaneously with zoom
    .to(zoomBgRef.current, {
      opacity: 0,
      ease: 'power1.in',
    }, '<20%') // Start fading out after 20% of the zoom
    .to(titleGraphRef.current, {
      opacity: 0, 
      ease: 'power1.in'
    }, '<') // Fade out title graph with background
    // Animate Marquee and Line when they come into view
    gsap.fromTo(lineRef.current, 
      { width: '0%' }, 
      {
        width: '100%',
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: marqueeRef.current,
          start: 'top 80%', // Start when top of marquee section is 80% down viewport
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo(lineBottomRef.current, 
      { width: '0%' }, 
      {
        width: '100%',
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: marqueeRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.to(marqueeRef.current, {
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: marqueeRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });

  }, { scope: container });

  return (
    <div ref={container} className={styles.container}>


      <section ref={heroRef} className={styles.hero}>
        <div className={styles.zoomWrapper}>
          <img 
            ref={zoomBgRef} 
            src="/images_background/main_background.png" 
            alt="Background" 
            className={styles.heroImage} 
          />
          <div ref={titleWrapperRef} className={styles.titleWrapper}>
            <img 
              ref={titleGraphRef} 
              src="/images_background/main_title_graph.png" 
              alt="Title Graph" 
              className={styles.titleGraph} 
            />
          </div>
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

      {/* Marquee and Line Section - Normal Scroll */ }
      <div ref={marqueeRef} className={styles.marqueeWrapper}>
        <div ref={lineRef} className={styles.separatorLine}></div>
        <div className={styles.marqueeContainer}>
          <div className={styles.marqueeInner}>
             {/* Duplicated text for seamless loop */}
             <span className={styles.marqueeText}>❬ ɪɴᴋᴜʙᴀᴛɪᴏɴ ❭&nbsp;&nbsp;&nbsp;&nbsp;⌏❬ 孵化 ❭ ⌌&nbsp;&nbsp;&nbsp;&nbsp;❬ ɪɴᴋᴜʙᴀᴛɪᴏɴ ❭&nbsp;&nbsp;&nbsp;&nbsp;⌏❬ 孵化 ❭ ⌌&nbsp;&nbsp;&nbsp;&nbsp;</span>
             <span className={styles.marqueeText}>❬ ɪɴᴋᴜʙᴀᴛɪᴏɴ ❭&nbsp;&nbsp;&nbsp;&nbsp;⌏❬ 孵化 ❭ ⌌&nbsp;&nbsp;&nbsp;&nbsp;❬ ɪɴᴋᴜʙᴀᴛɪᴏɴ ❭&nbsp;&nbsp;&nbsp;&nbsp;⌏❬ 孵化 ❭ ⌌&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </div>
        </div>

        <div ref={lineBottomRef} className={styles.separatorLine}></div>
      </div>

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
};