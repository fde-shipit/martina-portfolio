import Hero from '@/components/Hero'
import Ticker from '@/components/Ticker'
import OracleSection from '@/components/OracleSection'
import About from '@/components/About'
import Work from '@/components/Work'
import PullQuote from '@/components/PullQuote'
import Career from '@/components/Career'
import Writing from '@/components/Writing'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import GsapScrollAnimations from '@/components/gsap/ScrollAnimations'
import ScrollAnimations from '@/components/ScrollAnimations'
import { person } from '@/content/data'

export default function Home() {
  return (
    <main style={{ paddingBottom: '6rem' }}>
      <GsapScrollAnimations />
      <ScrollAnimations />

      <Hero />
      <Ticker />

      {/* Oracle preview — promoted from buried hero link to its own section,
          sitting between Hero and Work so it's the second thing a visitor sees. */}
      <OracleSection />

      <About />
      <Work />
      <PullQuote />
      <Skills />
      <Career />
      <Writing />
      <Contact />

      <footer
        style={{
          borderTop: '1px solid var(--rule)',
          padding: '2rem 3rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1500px',
          margin: '4rem auto 0',
        }}
      >
        <span
          className="font-mono-label"
          style={{ color: 'var(--warm)', fontSize: '0.62rem' }}
        >
          {person.name} © {new Date().getFullYear()}
        </span>
        <span
          className="font-mono-label"
          style={{ color: 'var(--warm)', fontSize: '0.62rem' }}
        >
          {person.hashtag}
        </span>
      </footer>
    </main>
  )
}
