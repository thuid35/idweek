'use client';

import styles from '../styles/Home.module.css';
import ThreeCanvas from '../components/three/ThreeCanvas';
import SceneHome from '../components/three/SceneHome';
import { Reveal } from '../components/animation/gsap';

export default function Home() {
  return (
    <div className={styles.container}>
      <ThreeCanvas className={styles.canvas}>
        <SceneHome />
      </ThreeCanvas>

      <section className={styles.hero}>
        <Reveal>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>IDWeek</h1>
            <p className={styles.subtitle}>Innovation & Design Week</p>
          </div>
        </Reveal>
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
