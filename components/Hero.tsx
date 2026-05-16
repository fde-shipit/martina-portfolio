'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { person, heroStats } from '@/content/data'

/**
 * Hero — one focal point: the proposition.
 *
 * Composition (top to bottom):
 *   - small eyebrow: name · dot · role
 *   - large display headline ("survive production" picks up --accent)
 *   - sub-deck paragraph
 *   - two CTAs side by side: "View work" + "Consult the Oracle"
 *   - bottom row: three stats + a live availability indicator
 *
 * No watermark, no absolutely-positioned floating Oracle, no
 * right-side stat stack competing with the tagline.
 */
export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let cleanup: (() => void) | undefined

    const init = async () => {
      const { gsap } = await import('gsap')

      const headline = document.getElementById('hero-headline')
      const eyebrow  = document.getElementById('hero-eyebrow')
      const sub      = document.getElementById('hero-sub')
      const ctas     = document.getElementById('hero-ctas')
      const meta     = document.querySelectorAll('.hero-meta-item')

      if (eyebrow)  gsap.fromTo(eyebrow,  { opacity: 0, y: 14 }, { opacity: 1, y: 0, delay: 0.20, duration: 0.6, ease: 'power2.out' })
      if (headline) {
        gsap.set(headline, { clipPath: 'inset(0 0 100% 0)', y: 40 })
        gsap.to(headline,  { clipPath: 'inset(0 0 0% 0)',   y: 0, delay: 0.35, duration: 1.0, ease: 'power3.out' })
      }
      if (sub)   gsap.fromTo(sub,   { opacity: 0, y: 16 }, { opacity: 1, y: 0, delay: 0.85, duration: 0.7, ease: 'power2.out' })
      if (ctas)  gsap.fromTo(ctas,  { opacity: 0, y: 12 }, { opacity: 1, y: 0, delay: 1.05, duration: 0.6, ease: 'power2.out' })
      meta.forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, y: 16 }, { opacity: 1, y: 0, delay: 1.20 + i * 0.10, duration: 0.6, ease: 'power2.out' })
      })

      cleanup = () => { gsap.killTweensOf('*') }
    }

    init()
    return () => cleanup?.()
  }, [])

  return (
    <section
      ref={containerRef}
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '0 3rem',
        paddingTop: '120px',
        paddingBottom: '3rem',
        maxWidth: '1500px',
        margin: '0 auto',
      }}
    >
      {/* Eyebrow */}
      <div
        id="hero-eyebrow"
        style={{
          opacity: 0,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '0.85rem',
          marginBottom: '2.5rem',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-dm-mono)',
            fontSize: '0.68rem',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: 'var(--ink)',
          }}
        >
          {person.name}
        </span>
        <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--accent)' }} />
        <span
          style={{
            fontFamily: 'var(--font-dm-mono)',
            fontSize: '0.68rem',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: 'var(--warm)',
          }}
        >
          {person.role} · {person.company} · {person.location.split(',')[0]}
        </span>
      </div>

      {/* Headline — the one focal point */}
      <div style={{ overflow: 'hidden', maxWidth: '55%' }}>
        <h1
          id="hero-headline"
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 300,
            fontSize: 'clamp(1.8rem, 4vw, 3.6rem)',
            lineHeight: 0.98,
            letterSpacing: '-0.025em',
            color: 'var(--ink)',
          }}
        >
          {person.headline}
        </h1>
      </div>

      {/* Sub-deck */}
      <p
        id="hero-sub"
        style={{
          opacity: 0,
          marginTop: '2rem',
          maxWidth: '54ch',
          fontFamily: 'var(--font-dm-sans)',
          fontSize: 'clamp(1rem, 1.4vw, 1.1rem)',
          fontWeight: 300,
          color: 'var(--warm)',
          lineHeight: 1.6,
        }}
      >
        {person.tagline}
      </p>

      {/* CTAs — Oracle is a peer to View Work, no longer floating */}
      <div
        id="hero-ctas"
        style={{
          opacity: 0,
          marginTop: '2.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center',
        }}
      >
        <a
          href="#work"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontFamily: 'var(--font-dm-mono)',
            fontSize: '0.65rem',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: 'var(--paper)',
            background: 'var(--ink)',
            padding: '0.95rem 1.3rem',
            textDecoration: 'none',
          }}
        >
          View work <span aria-hidden>→</span>
        </a>
        <Link
          href="/oracle"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.55rem',
            fontFamily: 'var(--font-dm-mono)',
            fontSize: '0.65rem',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: 'var(--accent-rare)',
            border: '1px solid var(--accent-rare)',
            padding: '0.9rem 1.25rem',
            textDecoration: 'none',
          }}
        >
          Consult the Oracle
          <span
            aria-hidden
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'var(--accent-rare)',
            }}
          />
        </Link>
      </div>

      {/* Bottom row — stats + status. Spans the full hero width. */}
      <div
        style={{
          marginTop: 'auto',
          paddingTop: '3.5rem',
          borderTop: '1px solid var(--rule)',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '2rem',
        }}
        className="hero-meta-grid"
      >
        {heroStats.map((stat, i) => (
          <div key={i} className="hero-meta-item" style={{ opacity: 0 }}>
            <div
              style={{
                fontFamily: 'var(--font-dm-mono)',
                fontSize: '0.6rem',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: 'var(--warm)',
                marginBottom: '0.5rem',
              }}
            >
              {stat.from}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontWeight: 300,
                fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
                color: 'var(--accent)',
                lineHeight: 1,
              }}
            >
              {stat.number}
            </div>
            <div
              style={{
                marginTop: '0.6rem',
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '0.82rem',
                color: 'var(--warm)',
                lineHeight: 1.45,
                maxWidth: '32ch',
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}

        <div
          className="hero-meta-item"
          style={{
            opacity: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            gap: '0.5rem',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-dm-mono)',
              fontSize: '0.6rem',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: 'var(--warm)',
            }}
          >
            Status
          </div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.55rem',
              fontFamily: 'var(--font-dm-mono)',
              fontSize: '0.65rem',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: 'var(--ink)',
            }}
          >
            <span
              aria-hidden
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'var(--accent)',
                boxShadow: '0 0 0 3px rgba(48,134,149,0.18)',
              }}
            />
            Open to talks &amp; introductions
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .hero-meta-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .hero-meta-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
