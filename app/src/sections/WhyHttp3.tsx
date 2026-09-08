import { Section } from '../components/Section'
import { IconTile } from '../components/IconTile'
import { whyHttp3 } from '../content'
import styles from './WhyHttp3.module.css'

export function WhyHttp3() {
  return (
    <div className={styles.section}>
      <Section id="why" eyebrow={whyHttp3.eyebrow} heading={whyHttp3.heading} centered headingWidth={720}>
        <div className={styles.grid}>
          {whyHttp3.cards.map((card) => (
            <article key={card.title} className={styles.card}>
              <IconTile icon={card.icon} />
              <h3 className="t-card">{card.title}</h3>
              <p className={`t-body ${styles.body}`}>{card.body}</p>
            </article>
          ))}
        </div>
      </Section>
    </div>
  )
}
