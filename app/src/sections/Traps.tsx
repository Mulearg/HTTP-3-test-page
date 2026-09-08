import { Section } from '../components/Section'
import { IconTile } from '../components/IconTile'
import { traps } from '../content'
import styles from './Traps.module.css'

export function Traps() {
  return (
    <Section id="traps" eyebrow={traps.eyebrow} heading={traps.heading} headingWidth={900}>
      <ol className={styles.grid}>
        {traps.items.map((item) => (
          <li key={item.num} className={styles.card}>
            <IconTile>{item.num}</IconTile>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={`t-body ${styles.body}`}>{item.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
