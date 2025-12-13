'use client';

import styles from '../../../styles/About3DPrinting.module.css';
import { Reveal } from '../../../components/animation/gsap';

export default function About3DPrinting() {
  return (
    <div className={styles.container}>
      <Reveal>
        <div className={styles.hero}>
          <h1 className={styles.title}>About 3D Printing</h1>
          <p>Bringing digital designs to physical reality.</p>
        </div>
      </Reveal>

      <section className={styles.section}>
        <Reveal>
          <h2 className={styles.sectionTitle}>FDM Technology</h2>
          <p>
            Fused Deposition Modeling (FDM) is our go-to for rapid prototyping and functional parts.
            We use a variety of filaments including PLA, ABS, and PETG.
          </p>
        </Reveal>
      </section>

      <section className={styles.section}>
        <Reveal delay={0.1}>
          <h2 className={styles.sectionTitle}>SLA Resin</h2>
          <p>
            For high-detail models and intricate designs, we employ Stereolithography (SLA) printing.
            This allows for smooth surface finishes and high precision.
          </p>
        </Reveal>
      </section>
    </div>
  );
}
