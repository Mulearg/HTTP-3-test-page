import { Section } from '../components/Section'
import { CodeBlock } from '../components/CodeBlock'
import { howYouConnect } from '../content'
import styles from './HowYouConnect.module.css'
const BASE = import.meta.env.BASE_URL

export function HowYouConnect() {
  return (
    <Section id="connect">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <span className="t-eyebrow" style={{ color: 'var(--color-image-sky-deep)', letterSpacing: '1.4px' }}>
            {howYouConnect.eyebrow}
          </span>
          <h2 className="t-h2" style={{ maxWidth: 470 }}>
            {howYouConnect.heading}
          </h2>
          <p className={`t-body ${styles.body}`}>{howYouConnect.body}</p>

          {/* CONTENT-v2 headed this list "Two rules" but supplied three, and
              the artboard ships all three. The count is dropped from the
              rendered heading; flagged for the copy owner. */}
          <ul className={styles.rules}>
            {howYouConnect.rules.map((rule) => (
              <li key={rule} className={styles.rule}>
                <img className={styles.check} src={`${BASE}assets/icons/check-19.svg`} alt="" width={19} height={19} />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        <CodeBlock lines={howYouConnect.code} label="Connecting over HTTP/3 in Python" />
      </div>
    </Section>
  )
}
