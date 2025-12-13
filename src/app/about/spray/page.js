'use client';

import styles from '../../../styles/AboutSpray.module.css';
import { Reveal } from '../../../components/animation/gsap';

export default function AboutSpray() {
  return (
    <div className={styles.container}>
      <Reveal>
        <div className={styles.hero}>
          <h1 className={styles.title}>About Spray Painting</h1>
          <p>Mastering the art of surface finishing.</p>
        </div>
      </Reveal>

      <section className={styles.section}>
        <Reveal>
          <h2 className={styles.sectionTitle}>Techniques</h2>
          <p>
            We utilize advanced spray painting techniques to achieve flawless finishes on various materials.
            From matte to high-gloss, our process ensures durability and aesthetic appeal.
          </p>
        </Reveal>
      </section>

      <section className={styles.section}>
        <Reveal delay={0.1}>
          <h2 className={styles.sectionTitle}>Materials</h2>
          <p>
            Our expertise covers plastics, metals, and composites. We select the right primers and paints
            for each substrate to guarantee adhesion and longevity.
          </p>
        </Reveal>
      </section>
    </div>
  );
}
