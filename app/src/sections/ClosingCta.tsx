import { Button } from '../components/Button'
import { closingCta } from '../content'
import styles from './ClosingCta.module.css'

export function ClosingCta() {
  return (
    <section id="start" className={styles.wrap}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.copy}>
            <h2 className={`t-h2 ${styles.heading}`}>{closingCta.heading}</h2>
            <p className={`t-body ${styles.body}`}>{closingCta.body}</p>
          </div>
          <div className={styles.actions}>
            <Button variant="primary">{closingCta.primaryCta}</Button>
            <Button variant="secondary">{closingCta.secondaryCta}</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
