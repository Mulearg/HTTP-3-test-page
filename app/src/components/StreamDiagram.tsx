import { streamDiagram } from '../content'
import styles from './StreamDiagram.module.css'

/**
 * The hero's stream diagram (27882:28).
 *
 * Decorative in the accessibility tree — the caption below it states the same
 * fact in words, and the section's own copy makes the claim. Marking the bars
 * up as data would announce a wall of meaningless segments.
 */
export function StreamDiagram() {
  return (
    <figure className={styles.panel}>
      <figcaption className={styles.label}>{streamDiagram.label}</figcaption>

      {streamDiagram.blocks.map((block, i) => (
        <div
          key={block.name}
          className={`${styles.block} ${
            i === 0 ? styles.blockDivided : styles.blockLast
          }`}
        >
          <div className={styles.head}>
            <span className={styles.name}>{block.name}</span>
            <span className={styles.verdict}>{block.verdict}</span>
          </div>

          <div className={styles.bars} aria-hidden="true">
            {block.rows.map((row, r) => (
              <div key={r} className={styles.row}>
                {'full' in row ? (
                  <span className={`${styles.bar} ${styles.full} ${styles[row.full]}`} />
                ) : (
                  <>
                    <span className={`${styles.bar} ${styles.lead} ${styles[row.lead]}`} />
                    <span className={`${styles.bar} ${styles.marker} ${styles[row.marker]}`} />
                    <span className={`${styles.bar} ${styles.tail} ${styles[row.tail]}`} />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <p className={styles.caption}>{streamDiagram.caption}</p>
    </figure>
  )
}
