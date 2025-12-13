'use client';

import styles from '../../styles/Goods.module.css';
import { Reveal } from '../../components/animation/gsap';

export default function Goods() {
  return (
    <div className={styles.container}>
      <Reveal>
        <div className={styles.hero}>
          <h1 className={styles.title}>Goods</h1>
          <p>Curated products for design enthusiasts.</p>
        </div>
      </Reveal>

      <div className={styles.grid}>
        {[1, 2, 3, 4].map((item) => (
          <Reveal key={item} delay={item * 0.1}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Product {item}</h2>
              <p>Description for product {item}. High quality and well designed.</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
