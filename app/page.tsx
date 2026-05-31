import Hero from '@/components/Hero'
import Ticker from '@/components/Ticker'
import About from '@/components/About'
import SelectedWork from '@/components/SelectedWork'
import BuildsPreview from '@/components/BuildsPreview'
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

      <About />
      <SelectedWork />
      <BuildsPreview />
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
