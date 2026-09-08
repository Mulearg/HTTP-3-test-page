import { Section } from '../components/Section'
import { whereItRuns } from '../content'
import styles from './WhereItRuns.module.css'

const { availability, entryPoints, callout } = whereItRuns

export function WhereItRuns() {
  return (
    <Section
      id="where"
      ground="band"
      eyebrow={whereItRuns.eyebrow}
      heading={whereItRuns.heading}
      centered
      headingWidth={900}
    >
      <div className={styles.row}>
        {/* --- Availability --------------------------------------------- */}
        <div className={styles.panel}>
          <h3 className={styles.panelTitle}>{availability.title}</h3>
          <ul className={styles.list}>
            {availability.rows.map((r) => (
              <li key={r.protocol} className={styles.listRow}>
                <span className={styles.protocol}>{r.protocol}</span>
                <span className={r.residentialOnly ? styles.scopeOnly : styles.scopeAll}>
                  {r.scope}
                </span>
              </li>
            ))}
          </ul>
          {/* Mobile Proxies are absent because the docs' availability table
              does not cover them — do not add a row until that is answered. */}
          <p className={styles.note}>{availability.note}</p>
        </div>

        {/* --- Entry points --------------------------------------------- */}
        <div className={styles.panel}>
          <h3 className={styles.panelTitle}>{entryPoints.title}</h3>
          <ul className={styles.epList}>
            {entryPoints.rows.map((r) => (
              <li key={r.hostname} className={styles.epRow}>
                <span className={styles.epName}>
                  <span className={styles.epRegion}>{r.region}</span>
                  <span className={styles.epHost}>{r.hostname}</span>
                </span>
                <span className={r.live ? styles.chipLive : styles.chipSoon}>
                  {r.live ? 'Live' : 'Coming soon'}
                </span>
              </li>
            ))}
          </ul>
          <p className={styles.note}>{entryPoints.note}</p>
        </div>
      </div>

      <aside className={styles.callout}>
        <strong className={styles.calloutLead}>{callout.lead}</strong>
        <span className={styles.calloutBody}>{callout.body}</span>
      </aside>
    </Section>
  )
}
