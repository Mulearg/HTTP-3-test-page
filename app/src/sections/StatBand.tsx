import { stats } from '../content'
import styles from './StatBand.module.css'

export function StatBand() {
  return (
    <section id="stats" className={styles.band} aria-label="Key figures">
      <div className="container">
        <dl className={styles.row}>
          {stats.map((s) => (
            <div key={s.label} className={styles.cell}>
              <dd className={styles.value}>{s.value}</dd>
              <dt className={styles.label}>{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
