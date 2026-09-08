import type { ReactNode } from 'react'
import styles from './Section.module.css'

type Ground = 'white' | 'tint' | 'band' | 'dark'

/**
 * Section shell: full-bleed ground, contained content, standard head block.
 *
 * `ground` maps to the token file's wash rule — `band` is duotone-band (G-05)
 * over ground.tint, the only wash a non-hero full-bleed section may use.
 */
export function Section({
  id,
  ground = 'white',
  eyebrow,
  heading,
  lede,
  centered = false,
  headingWidth,
  children,
}: {
  id?: string
  ground?: Ground
  eyebrow?: string
  heading?: string
  lede?: string
  /** The artboard centres some section heads and left-aligns others. */
  centered?: boolean
  /** The artboard sets an explicit measure on each heading. */
  headingWidth?: number
  children: ReactNode
}) {
  return (
    <section id={id} className={`${styles.section} ${styles[ground]}`}>
      <div className="container">
        {(eyebrow || heading || lede) && (
          <div className={`${styles.head} ${centered ? styles.headCentered : ''}`}>
            {eyebrow && <span className={`t-eyebrow ${styles.eyebrow}`}>{eyebrow}</span>}
            {heading && (
              <h2 className="t-h2" style={headingWidth ? { maxWidth: headingWidth } : undefined}>
                {heading}
              </h2>
            )}
            {lede && <p className={`t-body ${styles.lede}`}>{lede}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
