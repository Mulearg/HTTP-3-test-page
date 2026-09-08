import { Section } from '../components/Section'
import { proof } from '../content'
import styles from './Proof.module.css'

export function Proof() {
  return (
    <Section id="proof">
      <div className={styles.inner}>
        <figure className={styles.testimonial}>
          <img className={styles.quoteMark} src="/assets/icons/quote-mark.svg" alt="" width={34} height={26} />
          <blockquote className={styles.quote}>{proof.quote}</blockquote>
          <figcaption className={styles.attribution}>
            <span className={styles.name}>{proof.attributionName}</span>
            <span className={styles.role}>{proof.attributionRole}</span>
          </figcaption>
        </figure>

        {/* duotone-band at 9%, the body wash — NOT duotone-tint at 18%, which
            the token file scopes to imagery. */}
        <div className={styles.useCases}>
          <h3 className={styles.useEyebrow}>{proof.useCasesEyebrow}</h3>
          <ul className={styles.useList}>
            {proof.useCases.map((u) => (
              <li key={u.title} className={styles.useItem}>
                <span className={styles.useTitle}>{u.title}</span>
                <span className={styles.useBody}>{u.body}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
