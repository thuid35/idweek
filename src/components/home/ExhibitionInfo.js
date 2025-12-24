import styles from './ExhibitionInfo.module.css';

export default function ExhibitionInfo() {
  return (
    <section className={styles.container}>
      {/* Title Section */}
      <h2 className={styles.titleLine1}>𝟤𝟢𝟤𝟧東海工業設計週 ⌏❬ 孵化 ❭ ⌌</h2>
      <h3 className={styles.titleLine2}>⮑ ᴛʜᴜɪᴅ ᴡᴇᴇᴋ’𝟤𝟧 𓁹 ❬ ɪɴᴋᴜʙᴀᴛɪᴏɴ ❭ ⟣</h3>

      <div className={styles.separator}></div>

      {/* Keywords */}
      <div className={styles.keywords}>
        * 孕育 * 校驗 * 重生
      </div>

      <div className={styles.separator}></div>

      {/* Info Section */}
      <div className={styles.infoBlock}>
        <div className={styles.infoItem}>
          <span>展覽地點 / ᴠᴇɴᴜᴇ ⌏ ɪᴅ 𝟣𝟢𝟧 工業設計系館⌌</span>
        </div>
        <div className={styles.infoItem}>
            <span>展覽時間 / ᴛɪᴍᴇ ⌏ 𝟤𝟢𝟤𝟧.𝟣𝟤.𝟤𝟥 ㈡ ⭢ 𝟣𝟤.𝟤𝟫 ㈠ ⌌</span>
        </div>
      </div>
    </section>
  );
};
