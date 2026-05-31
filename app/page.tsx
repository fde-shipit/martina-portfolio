import Hero from '@/components/Hero'
import SelectedWork from '@/components/SelectedWork'
import Contact from '@/components/Contact'
import GsapScrollAnimations from '@/components/gsap/ScrollAnimations'
import ScrollAnimations from '@/components/ScrollAnimations'
import { person } from '@/content/data'

export default function Home() {
  return (
    <main style={{ paddingBottom: '4rem' }}>
      <GsapScrollAnimations />
      <ScrollAnimations />

      <Hero />

      <div style={{
        padding: '4rem 3rem',
        maxWidth: '1500px',
        margin: '0 auto',
        width: '100%',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: 'var(--font-cormorant)',
          fontWeight: 300,
          fontStyle: 'italic',
          fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)',
          lineHeight: 1.3,
          color: 'var(--ink)',
          letterSpacing: '-0.01em',
        }}>
          Most enterprises are still entangled in red tape. I&apos;m months ahead. When you realise you need someone like me, you know where to find me.
        </p>
      </div>

      <SelectedWork />
      <Contact />

      <footer
        style={{
          borderTop: '1px solid var(--rule)',
          padding: '2rem 3rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1500px',
          margin: '2.5rem auto 0',
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
