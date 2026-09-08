import { Nav } from './sections/Nav'
import { Hero } from './sections/Hero'
import { StatBand } from './sections/StatBand'
import { WhyHttp3 } from './sections/WhyHttp3'
import { Comparison } from './sections/Comparison'
import { Protocols } from './sections/Protocols'
import { HowYouConnect } from './sections/HowYouConnect'
import { WhereItRuns } from './sections/WhereItRuns'
import { Traps } from './sections/Traps'
import { Proof } from './sections/Proof'
import { ClosingCta } from './sections/ClosingCta'
import { Footer } from './sections/Footer'

/**
 * Section order matches both Figma artboards (desktop 27881:14, mobile
 * 27889:14) and the section plan in CONTENT-v2.
 *
 * There is deliberately NO pricing section. The old one advertised "HTTP/3
 * included" on Residential, Rotating ISP and Mobile; two of those three were
 * wrong. Do not reinstate it without re-checking the docs' availability table.
 */
export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <StatBand />
        <WhyHttp3 />
        <Comparison />
        <Protocols />
        <HowYouConnect />
        <WhereItRuns />
        <Traps />
        <Proof />
        <ClosingCta />
      </main>
      <Footer />
    </>
  )
}
