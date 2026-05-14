'use client'

import { useEffect, useRef } from 'react'
import { person, heroStats } from '@/content/data'

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let gsap: typeof import('gsap').gsap
    let ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger

    const init = async () => {
      const gsapModule = await import('gsap')
      const { ScrollTrigger: ST } = await import('gsap/ScrollTrigger')
      gsap = gsapModule.gsap
      ScrollTrigger = ST
      gsap.registerPlugin(ScrollTrigger)

      const eyebrow = document.getElementById('hero-eyebrow')
      const line1 = document.getElementById('hero-name-line-1')
      const line2 = document.getElementById('hero-name-line-2')
      const desc = document.getElementById('hero-desc')
      const stats = document.querySelectorAll('.hero-stat')
      const cta = document.getElementById('hero-cta')
      const bgText = document.getElementById('hero-bg-text')

      if (eyebrow) gsap.fromTo(eyebrow, { opacity: 0, y: 20 }, { opacity: 1, y: 0, delay: 0.5, duration: 0.8, ease: 'power2.out' })

      if (line1) {
        gsap.set(line1, { clipPath: 'inset(0 0 100% 0)', y: 60 })
        gsap.to(line1, { clipPath: 'inset(0 0 0% 0)', y: 0, delay: 0.6, duration: 1, ease: 'power3.out' })
      }
      if (line2) {
        gsap.set(line2, { clipPath: 'inset(0 0 100% 0)', y: 60 })
        gsap.to(line2, { clipPath: 'inset(0 0 0% 0)', y: 0, delay: 0.75, duration: 1, ease: 'power3.out' })
      }

      if (desc) gsap.fromTo(desc, { opacity: 0, y: 20 }, { opacity: 1, y: 0, delay: 1, duration: 0.8, ease: 'power2.out' })

      stats.forEach((stat, i) => {
        gsap.fromTo(stat, { opacity: 0, x: 30 }, { opacity: 1, x: 0, delay: 0.8 + i * 0.15, duration: 0.8, ease: 'power2.out' })
      })

      if (cta) gsap.fromTo(cta, { opacity: 0, y: 20 }, { opacity: 1, y: 0, delay: 1.25, duration: 0.8, ease: 'power2.out' })

      if (bgText) {
        gsap.to(bgText, {
          y: () => window.innerHeight * 0.35,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    }

    init()
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
        justifyContent: 'center',
        padding: '0 3rem',
        paddingTop: '60px',
        overflow: 'hidden',
      }}
    >
      {/* Large background text */}
      <div
        id="hero-bg-text"
        style={{
          position: 'absolute',
          bottom: '-2rem',
          left: '-0.05em',
          fontFamily: 'var(--font-cormorant)',
          fontWeight: 300,
          fontSize: 'clamp(4rem, 12vw, 12rem)',
          color: 'transparent',
          WebkitTextStroke: '1px var(--rule)',
          lineHeight: 1,
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          userSelect: 'none',
        }}
      >
        {person.hashtag}
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px' }}>
        {/* Eyebrow */}
        <div
          id="hero-eyebrow"
          style={{ opacity: 0 }}
        >
          <span
            style={{
              fontFamily: 'var(--font-dm-mono)',
              fontSize: '0.68rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'var(--rust)',
            }}
          >
            {person.role} — {person.company}
          </span>
        </div>

        {/* Name */}
        <div style={{ margin: '1.5rem 0 2rem', overflow: 'hidden' }}>
          <div
            id="hero-name-line-1"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              color: 'var(--ink)',
            }}
          >
            {person.name.split(' ')[0]}
          </div>
          <div
            id="hero-name-line-2"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              lineHeight: 0.95,
              fontStyle: 'italic',
              letterSpacing: '-0.02em',
              color: 'var(--teal)',
            }}
          >
            {person.name.split(' ')[1]}
          </div>
        </div>

        {/* Tagline */}
        <p
          id="hero-desc"
          style={{
            opacity: 0,
            maxWidth: '560px',
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: 'var(--warm)',
            lineHeight: 1.6,
            fontWeight: 300,
          }}
        >
          {person.tagline}
        </p>

        {/* CTA */}
        <div id="hero-cta" style={{ opacity: 0, marginTop: '2.5rem' }}>
          <a
            href="#work"
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-dm-mono)',
              fontSize: '0.68rem',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--ink)',
              textDecoration: 'none',
              borderBottom: '1px solid var(--ink)',
              paddingBottom: '2px',
            }}
          >
            View Work ↓
          </a>
        </div>
      </div>

      {/* Stats — right side */}
      <div
        style={{
          position: 'absolute',
          right: '3rem',
          bottom: '3rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          maxWidth: '260px',
        }}
        className="hero-stats-block"
      >
        {heroStats.map((stat, i) => (
          <div key={i} className="hero-stat" style={{ opacity: 0 }}>
            <div
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontWeight: 300,
                fontSize: '2rem',
                color: 'var(--rust)',
                lineHeight: 1,
              }}
            >
              {stat.number}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '0.78rem',
                color: 'var(--warm)',
                marginTop: '0.35rem',
                lineHeight: 1.4,
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-stats-block {
            position: static !important;
            margin-top: 3rem;
            flex-direction: row !important;
            flex-wrap: wrap;
            gap: 1.5rem !important;
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  )
}
