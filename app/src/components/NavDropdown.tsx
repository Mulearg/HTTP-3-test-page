import { useEffect, useId, useRef, useState } from 'react'
import { RAIL, type Menu, type MenuItem } from '../navMenus'
import styles from './NavDropdown.module.css'
const BASE = import.meta.env.BASE_URL

/**
 * Which grid-column classes a menu uses. Three of the five menus size their
 * columns differently, and Culture is the one that does NOT grow at >=1440 â€”
 * see the notes in NavDropdown.module.css.
 */
const COLS_PREFIX = {
  default: 'cols',
  pricing: 'pcols',
  education: 'cols',
  culture: 'ccols',
} as const

/**
 * A nav mega-menu, matching live rayobyte.com.
 *
 * The live site opens these on hover (Webflow IX2) with no keyboard path. This
 * keeps the hover behaviour so it feels the same, and adds the keyboard one the
 * original lacks: the toggle is a real button with aria-expanded, Enter/Space
 * open it, Escape closes and returns focus, and the panel closes when focus
 * leaves it. That is additive â€” nothing about the pointer behaviour changes.
 */
export function NavDropdown({
  label,
  menu,
  /** Element the panel should span; supplied by Nav as the full-width row. */
  onOpenChange,
  isOpen,
}: {
  label: string
  menu: Menu
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelId = useId()

  // Escape closes and returns focus to the toggle.
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onOpenChange(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, onOpenChange])

  return (
    <div
      ref={rootRef}
      className={`${styles.root} ${isOpen ? styles.open : ''}`}
      onMouseEnter={() => onOpenChange(true)}
      onMouseLeave={() => onOpenChange(false)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) onOpenChange(false)
      }}
    >
      <button
        ref={toggleRef}
        className={styles.toggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => onOpenChange(!isOpen)}
        onFocus={() => onOpenChange(true)}
      >
        {label}
        <img className={styles.chevron} src={`${BASE}assets/icons/chevron-14.svg`} alt="" width={14} height={14} />
      </button>

      {isOpen && (
        <div className={styles.panel} id={panelId}>
          {/* groups + footer share one centred wrapper so the see-all button
              lines up with the cards above it â€” see .inner in the stylesheet. */}
          <div className={styles.inner}>
            <div className={styles.groups}>
            {menu.groups.map((group, gi) => (
              <div key={gi} className={styles.group}>
                {group.heading && (
                  <>
                    <div className={styles.heading}>{group.heading}</div>
                    <div className={styles.rule} />
                  </>
                )}
                <div
                  className={`${styles.grid} ${
                    styles[`${COLS_PREFIX[menu.variant ?? 'default']}${group.columns}`]
                  }`}
                >
                  {group.items.map((item) => (
                    <Card key={item.title} item={item} variant={menu.variant} />
                  ))}
                </div>
              </div>
              ))}
            </div>

            {menu.seeAll && (
              <div className={styles.footer}>
                <a
                  className={`${styles.seeAll} ${
                    menu.seeAll.tone === 'pink' ? styles.tonePink : styles.toneSky
                  }`}
                  href={menu.seeAll.href}
                >
                  {menu.seeAll.label}
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function Card({
  item,
  variant,
}: {
  item: MenuItem
  variant?: 'default' | 'pricing' | 'education' | 'culture'
}) {
  const isPricing = variant === 'pricing'
  const isEducation = variant === 'education'

  // The Culture menu's story tile is a different object entirely â€” a 300x300
  // image with the headline over a gradient â€” not a rail card.
  if (item.image) {
    return (
      <a
        className={styles.story}
        href={item.href}
        style={{ backgroundImage: `url(${BASE}assets/nav/${item.image})` }}
      >
        <span className={styles.storyTitle}>{item.title}</span>
      </a>
    )
  }

  return (
    <a
      className={[
        styles.card,
        isPricing ? styles.cardPricing : '',
        isEducation ? styles.cardEducation : '',
      ]
        .filter(Boolean)
        .join(' ')}
      href={item.href}
    >
      {/* The rail's tint is the only inline style here â€” it is per-item data,
          not a class, and the eight values live in navMenus.ts. */}
      <span className={styles.rail} style={{ background: RAIL[item.rail] }}>
        {item.icon && (
          <img
            className={styles.railIcon}
            src={`${BASE}assets/nav/${item.icon}.svg`}
            alt=""
            width={22}
            height={22}
          />
        )}
      </span>

      <span className={`${styles.body} ${isPricing ? styles.pricingBody : ''}`}>
        <span className={styles.title}>{item.title}</span>
        {item.desc && <span className={styles.desc}>{item.desc}</span>}
      </span>

      {/* On the live site the price is a right-hand column behind a vertical
          rule, NOT a line stacked under the description. Items without a price
          (Get Custom Pricing) simply omit both, and the body takes the width. */}
      {isPricing && item.price && (
        <>
          <span className={styles.priceDivider} aria-hidden="true" />
          <span className={styles.priceCol}>
            <span className={styles.priceColLabel}>{item.priceLabel}</span>
            <span className={styles.priceColValue}>{item.price}</span>
          </span>
        </>
      )}
    </a>
  )
}

/** The smaller utility-bar dropdowns (Partners, Log in). */
export function UtilityDropdown({
  label,
  items,
  className,
  children,
}: {
  label: string
  items: { label: string; href: string }[]
  className?: string
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const closeTimer = useRef<number | undefined>(undefined)

  /* ---------------------------------------------------------------------
     Close on a short grace period, not immediately.

     These panels are ~220px wide but hang off a ~77px toggle, overhanging
     ~143px to the LEFT. The strip beside the toggle â€” horizontally inside the
     panel, vertically above it â€” belongs to the utility bar, not to this
     dropdown. Any diagonal move toward a left-hand item crosses it, fires
     mouseleave, and the panel closes before the pointer arrives; that is what
     made these two menus unselectable.

     The mega-menus solve the same class of problem with a transparent bridge,
     but that will not work here: the dead strip is occupied by the other band
     links, so a bridge over it would swallow clicks on "Contact Us". A short
     delay leaves those links alone and covers every approach angle.
  --------------------------------------------------------------------- */
  const cancelClose = () => {
    if (closeTimer.current !== undefined) {
      clearTimeout(closeTimer.current)
      closeTimer.current = undefined
    }
  }

  const scheduleClose = () => {
    cancelClose()
    closeTimer.current = window.setTimeout(() => setOpen(false), 160)
  }

  // Don't leave a timer running if the nav unmounts mid-grace.
  useEffect(() => cancelClose, [])

  return (
    <div
      className={styles.utilRoot}
      onMouseEnter={() => {
        cancelClose()
        setOpen(true)
      }}
      onMouseLeave={scheduleClose}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false)
      }}
    >
      <button
        className={className}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={label}
        onClick={() => setOpen((o) => !o)}
        onFocus={() => setOpen(true)}
      >
        {children}
      </button>

      {open && (
        <div className={styles.utilPanel} id={panelId}>
          {items.map((i) => (
            <a key={i.label} className={styles.utilItem} href={i.href}>
              {i.label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
