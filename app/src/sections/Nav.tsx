import { useState } from 'react'
import { Button } from '../components/Button'
import { NavDropdown, UtilityDropdown } from '../components/NavDropdown'
import { nav } from '../content'
import { navMenus, utilityMenus } from '../navMenus'
import styles from './Nav.module.css'
const BASE = import.meta.env.BASE_URL

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  /** Only one mega-menu is open at a time, as on the live site. */
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  return (
    <header className={styles.wrap}>
      {/* Utility band â€” warm grey, right-aligned, bottom corners only. */}
      <div className="container-chrome">
        <div className={styles.band}>
          <a className={styles.bandLink} href="https://rayobyte.com/contact-us/">
            {nav.utility.contact}
          </a>
          <span className={styles.sep} />

          <UtilityDropdown label="Partners" items={utilityMenus.Partners} className={styles.bandLink}>
            {nav.utility.partners}
            <img className={styles.chevronSm} src={`${BASE}assets/icons/chevron-13.svg`} alt="" width={13} height={13} />
          </UtilityDropdown>

          <span className={styles.sep} />

          <UtilityDropdown
            label="Log in"
            items={utilityMenus['Log in']}
            className={`${styles.bandLink} ${styles.bandLogin}`}
          >
            <img className={styles.avatar} src={`${BASE}assets/icons/user-22.svg`} alt="" width={22} height={22} />
            {nav.utility.login}
            <img className={styles.chevronSm} src={`${BASE}assets/icons/chevron-13b.svg`} alt="" width={13} height={13} />
          </UtilityDropdown>
        </div>
      </div>

      {/* The mega-menu panels span the full nav width and drop from its bottom
          edge, so this row is their positioning context â€” not each toggle. */}
      <div className={styles.rowHost}>
        <div className="container-chrome">
          <div className={styles.row}>
            <a href="/" aria-label="Rayobyte home">
              {/* The lockup's wordmark is chrome.wordmark #231F20, deliberately
                  a different black from ink.primary. It ships inside the asset
                  â€” do not recolour it. */}
              <img className={styles.logo} src={`${BASE}assets/logo-black.svg`} alt="Rayobyte" width={157} height={30} />
            </a>

            <nav className={styles.links}>
              {nav.links.map((label) => (
                <NavDropdown
                  key={label}
                  label={label}
                  menu={navMenus[label]}
                  isOpen={openMenu === label}
                  onOpenChange={(open) => setOpenMenu(open ? label : null)}
                />
              ))}
            </nav>

            <button
              className={styles.toggle}
              onClick={() => setMobileOpen((o) => !o)}
              aria-expanded={mobileOpen}
              aria-label="Toggle navigation"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                {mobileOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
              </svg>
            </button>

            <span className={styles.navCta}>
              <Button variant="nav">{nav.cta}</Button>
            </span>
          </div>
        </div>
      </div>

      {/* Mobile: the live 3-across panel cannot survive a phone width, so the
          menus collapse to a plain nested list. */}
      {mobileOpen && (
        <div className="container-chrome">
          <div className={styles.panel}>
            {nav.links.map((label) => (
              <details key={label} className={styles.mobileGroup}>
                <summary className={styles.mobileSummary}>
                  {label}
                  <img className={styles.chevron} src={`${BASE}assets/icons/chevron-14.svg`} alt="" width={14} height={14} />
                </summary>
                <div className={styles.mobileItems}>
                  {navMenus[label].groups.flatMap((g) => g.items).map((item) => (
                    <a key={item.title} className={styles.mobileItem} href={item.href}>
                      {item.title}
                    </a>
                  ))}
                </div>
              </details>
            ))}

            <a className={styles.link} href="https://rayobyte.com/contact-us/">
              {nav.utility.contact}
            </a>
            <a className={styles.link} href="https://app.rayobyte.com/auth/login">
              {nav.utility.login}
            </a>
            <span className={styles.panelCta}>
              <Button variant="nav">{nav.cta}</Button>
            </span>
          </div>
        </div>
      )}
    </header>
  )
}
