import { footer } from '../content'
import styles from './Footer.module.css'
const BASE = import.meta.env.BASE_URL

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container-chrome">
        <div className={styles.inner}>
          {/* --- Brand ---------------------------------------------------- */}
          <div className={styles.brand}>
            <img className={styles.logo} src={`${BASE}assets/logo-white.svg`} alt="Rayobyte" width={157} height={30} />
            <p className={styles.copyright}>{footer.copyright}</p>

            <div className={styles.legal}>
              {footer.legal.map((l, i) => (
                <span key={l} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  {i > 0 && <span className={styles.legalSep} />}
                  <a className={styles.legalLink} href="#">
                    {l}
                  </a>
                </span>
              ))}
            </div>

            <p className={styles.awardLine}>{footer.awardLine}</p>
            <img className={styles.award} src={`${BASE}assets/award.png`} alt="Proxyway award" width={65} height={65} />
          </div>

          {/* --- Link columns --------------------------------------------- */}
          {footer.columns.map((col) => (
            <nav key={col.title} className={styles.column}>
              <h2 className={styles.columnTitle}>{col.title}</h2>
              <ul className={styles.links}>
                {col.links.map((l) => {
                  const label = typeof l === 'string' ? l : l.label
                  const chevron = typeof l === 'string' ? false : l.chevron
                  return (
                    <li key={label}>
                      <a className={styles.link} href="#">
                        {label}
                        {chevron && (
                          <img
                            className={styles.linkChevron}
                            src={`${BASE}assets/icons/chevron-footer.svg`}
                            alt=""
                            width={14}
                            height={14}
                          />
                        )}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>
          ))}

          {/* --- Contact -------------------------------------------------- */}
          <div className={styles.contact}>
            <div className={styles.social}>
              {/* The bordered box ships inside each asset â€” do not redraw it. */}
              <a href="#" aria-label="Rayobyte on YouTube">
                <img className={styles.socialIcon} src={`${BASE}assets/youtube.svg`} alt="" width={44} height={44} />
              </a>
              <a href="#" aria-label="Rayobyte on X">
                <img className={styles.socialIcon} src={`${BASE}assets/x.svg`} alt="" width={44} height={44} />
              </a>
            </div>
            <h2 className={styles.contactTitle}>{footer.contact.title}</h2>
            <p className={styles.address}>{footer.contact.address}</p>
            <img className={styles.qr} src={`${BASE}assets/qr.svg`} alt="" width={75} height={76} />
          </div>
        </div>
      </div>
    </footer>
  )
}
