import { Fragment } from 'react'
import { Button } from '../components/Button'
import { StreamDiagram } from '../components/StreamDiagram'
import { hero } from '../content'
import styles from './Hero.module.css'
const BASE = import.meta.env.BASE_URL

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-headline">
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.copy}>
            <span className={`t-eyebrow ${styles.badge}`}>
              <img className={styles.dot} src={`${BASE}assets/icons/hero-dot.svg`} alt="" width={7} height={7} />
              {hero.eyebrow}
            </span>

            {/* The artboard breaks this headline across two lines. Rendering
                each line as a block-level span produced two adjacent text
                nodes with no whitespace between them, so anything reading
                textContent — crawlers, share scrapers, screen readers — got
                "HTTP/3 over QUIC,across 40M+ residential IPs" with the space
                missing. Joining with a real space and letting <br> do the
                break keeps the visual line break and the correct text. */}
            <h1 id="hero-headline" className={`t-h1 ${styles.headline}`}>
              {hero.headlineLines.map((line, i) => (
                <Fragment key={i}>
                  {i > 0 && (
                    <>
                      {' '}
                      <br />
                    </>
                  )}
                  {line}
                </Fragment>
              ))}
            </h1>

            <p className={`t-body ${styles.subhead}`}>{hero.subhead}</p>

            <div className={styles.actions}>
              <Button variant="primary">{hero.primaryCta}</Button>
              <Button variant="secondary" href="https://docs.rayobyte.com/proxies/">
                {hero.secondaryCta}
              </Button>
            </div>

            {/* States the availability fact positively â€” the line that replaces
                the removed pricing section's incorrect claim that HTTP/3
                shipped on Rotating ISP and Mobile too. */}
            <p className={styles.trust}>{hero.trustLine}</p>
          </div>

          <StreamDiagram />
        </div>
      </div>
    </section>
  )
}
