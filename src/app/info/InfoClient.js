'use client';

import styles from '../../styles/Info.module.css';
import { Reveal } from '../../components/animation/gsap';

export default function Info() {
  return (
    <div className={styles.container}>
      <Reveal>
        <div className={styles.hero}>
          <h1 className={styles.title}>Information</h1>
          <p>Get in touch and learn more about us.</p>
        </div>
      </Reveal>

      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Contact Us</h2>
          <p>Email: contact@idweek.com</p>
          <p>Phone: +123 456 7890</p>
        </section>
      </Reveal>

      <Reveal delay={0.1}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Location</h2>
          <p>123 Design Avenue, Creative City, 10101</p>
        </section>
      </Reveal>
    </div>
  );
}
