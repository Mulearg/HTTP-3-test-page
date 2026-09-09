import type { ReactNode } from 'react'
import styles from './IconTile.module.css'
const BASE = import.meta.env.BASE_URL

/**
 * A glyph or numeral in a washed tile.
 *
 * `icon` names an SVG exported from the artboard (public/assets/icons). The
 * glyphs are used as exported rather than redrawn â€” an earlier pass guessed at
 * them before the artboards were reachable and got all three wrong.
 */
export function IconTile({ icon, children }: { icon?: string; children?: ReactNode }) {
  return (
    <span className={styles.tile}>
      {icon ? (
        <img className={styles.glyph} src={`${BASE}assets/icons/${icon}.svg`} alt="" width={30} height={30} />
      ) : (
        <span className={styles.numeral}>{children}</span>
      )}
    </span>
  )
}
