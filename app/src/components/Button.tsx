import type { AnchorHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.css'

/**
 * The three button roles.
 *
 * Mirrors the Figma component sets:
 *   Button / Primary   28004:50  (State x Layout, 6 variants)
 *   Button / Secondary 28006:20  (3 variants)
 *   Button / Nav       28006:27  (3 variants)
 *
 * State is handled by CSS pseudo-classes rather than a prop — the Figma
 * variants exist because Figma has no hover, not because the states are
 * addressable in code.
 *
 * Both Primary and Secondary carry component documentation in Figma that
 * flags production quirks; see the notes in Button.module.css.
 */
type Variant = 'primary' | 'secondary' | 'nav'

type ButtonProps = {
  variant?: Variant
  /** Maps to the `Label` text property on all three Figma components. */
  children: ReactNode
  /** Primary only — pins the badge and centres the label (Layout=Fill). */
  fullWidth?: boolean
  href?: string
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>

export function Button({
  variant = 'primary',
  children,
  fullWidth = false,
  href = '#',
  className,
  ...rest
}: ButtonProps) {
  const classes = [
    styles.base,
    styles[variant],
    fullWidth && variant === 'primary' ? styles.fullWidth : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <a className={classes} href={href} {...rest}>
      {variant === 'primary' && (
        <span className={styles.badge}>
          {/* Exported from the artboard rather than redrawn — the glyph is a
              diagonal arrow, not the horizontal one an earlier pass guessed. */}
          <img
            className={styles.badgeGlyph}
            src="/assets/icons/badge-arrow.svg"
            alt=""
            width={24}
            height={24}
          />
        </span>
      )}
      <span>{children}</span>
    </a>
  )
}
