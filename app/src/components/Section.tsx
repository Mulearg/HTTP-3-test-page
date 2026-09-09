import { useId, type ReactNode } from 'react'
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
  label,
  labelledBy,
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
  /** For a section whose head lives in `children` rather than in the `heading`
      prop: the id of the heading that names it. */
  labelledBy?: string
  /** For a section with no heading of its own to point at. */
  label?: string
  children: ReactNode
}) {
  // A <section> is only exposed as a landmark once it has an accessible name.
  // Where there is a visible heading, point at it rather than repeating the
  // string in an aria-label that could later drift from it.
  const headingId = useId()

  return (
    <section
      id={id}
      className={`${styles.section} ${styles[ground]}`}
      aria-labelledby={labelledBy ?? (heading ? headingId : undefined)}
      aria-label={label}
    >
      <div className="container">
        {(eyebrow || heading || lede) && (
          <div className={`${styles.head} ${centered ? styles.headCentered : ''}`}>
            {eyebrow && <span className={`t-eyebrow ${styles.eyebrow}`}>{eyebrow}</span>}
            {heading && (
              <h2
                id={headingId}
                className="t-h2"
                style={headingWidth ? { maxWidth: headingWidth } : undefined}
              >
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
