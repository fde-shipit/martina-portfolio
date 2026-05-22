'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { person } from '@/content/data'

/**
 * Hero — quiet editorial.
 *
 * Single column. Generous whitespace. No ornament.
 *
 *   ─────────────────────────────────────────────────────────  (hairline)
 *   Manager, AI Acceleration · HSF Kramer        Melbourne, Australia · 2026
 *   ─────────────────────────────────────────────────────────  (hairline)
 *
 *      AI didn't replace my experience. It handed me the tools
 *      to finally use *all of it.*
 *
 *      Ten years inside the infrastructure and operations layer
 *      before anyone was calling it AI. **I know what breaks, …**
 *
 *      View work →   Consult the Oracle   Redefined by AI →
 *
 *   ─────────────────────────────────────────────────────────  (hairline)
 *   ● Open to talks & introductions             Replying within a day
 *
 * No spine, no clamp-to-massive headline, no four-cell ledger.
 * The proposition does the heavy lifting; everything else is in service.
 */
export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let cleanup: (() => void) | undefined

    const init = async () => {
      const { gsap } = await import('gsap')

      const meta     = document.getElementById('hero-meta')
      const headline = document.getElementById('hero-head')
      const deck     = document.getElementById('hero-deck')
      const ctas     = document.getElementById('hero-ctas')
      const foot     = document.getElementById('hero-foot')

      if (meta)     gsap.fromTo(meta,     { opacity: 0, y: 10 }, { opacity: 1, y: 0, delay: 0.18, duration: 0.55, ease: 'power2.out' })
      if (headline) {
        gsap.set(headline, { clipPath: 'inset(0 0 100% 0)', y: 28 })
        gsap.to(headline,  { clipPath: 'inset(0 0 0% 0)',   y: 0, delay: 0.32, duration: 0.95, ease: 'power3.out' })
      }
      if (deck)  gsap.fromTo(deck,  { opacity: 0, y: 14 }, { opacity: 1, y: 0, delay: 0.80, duration: 0.6, ease: 'power2.out' })
      if (ctas)  gsap.fromTo(ctas,  { opacity: 0, y: 12 }, { opacity: 1, y: 0, delay: 1.00, duration: 0.55, ease: 'power2.out' })
      if (foot)  gsap.fromTo(foot,  { opacity: 0, y: 10 }, { opacity: 1, y: 0, delay: 1.15, duration: 0.55, ease: 'power2.out' })

      cleanup = () => { gsap.killTweensOf('*') }
    }

    init()
    return () => cleanup?.()
  }, [])

  return (
    <section ref={containerRef} id="hero" className="hero-quiet">
      <div className="hero-inner">
        {/* Eyebrow — role/company · location/year, both hairline-divided */}
        <div id="hero-meta" className="hero-meta" style={{ opacity: 0 }}>
          <span className="hero-role">
            {person.role} <span className="hero-role-soft">· {person.company}</span>
          </span>
          <span className="hero-loc">{person.location} · 2026</span>
        </div>

        {/* Center stack — proposition */}
        <div className="hero-stack">
          <div className="hero-head-wrap">
            <h1 id="hero-head" className="hero-head">
              AI let me move at the speed of the idea. It handed me the tools to close the gap <em>myself.</em>
            </h1>
          </div>

          <p id="hero-deck" className="hero-deck" style={{ opacity: 0 }}>
            Ten years inside the infrastructure and operations layer before the tooling existed to move at this speed.{' '}
            <b>I know what breaks, I know what holds, and I can build the thing myself.</b>{' '}
            That combination is still rare.
          </p>

          <div id="hero-ctas" className="hero-ctas" style={{ opacity: 0 }}>
            <a className="hero-cta" href="#work">
              View work <span className="hero-arr" aria-hidden>→</span>
            </a>
            <Link className="hero-cta hero-cta-oracle" href="/oracle">
              Consult the Oracle
            </Link>
            <Link className="hero-cta hero-cta-series" href="/redefined-by-ai">
              Redefined by AI <span className="hero-arr" aria-hidden>→</span>
            </Link>
          </div>
        </div>

        {/* Bottom row — status only */}
        <div id="hero-foot" className="hero-foot" style={{ opacity: 0 }}>
          <span className="hero-status">
            <span className="hero-dot" aria-hidden />
            Open to talks &amp; introductions
          </span>
          <span className="hero-foot-right">Replying within a day</span>
        </div>
      </div>

      <style>{`
        .hero-quiet {
          position: relative;
          min-height: 100vh;
          padding-top: 60px;             /* below the global fixed nav */
          display: flex;
          flex-direction: column;
        }
        .hero-inner {
          max-width: 1180px;
          margin: 0 auto;
          width: 100%;
          padding: 0 3rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        /* Eyebrow row */
        .hero-meta {
          margin-top: 1.6rem;
          padding-bottom: 1.2rem;
          border-bottom: 1px solid var(--rule);
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 1rem;
        }
        .hero-role,
        .hero-loc {
          font-family: var(--font-dm-mono);
          font-size: 0.66rem;
          text-transform: uppercase;
          letter-spacing: 0.16em;
        }
        .hero-role      { color: var(--ink); }
        .hero-role-soft { color: var(--warm); }
        .hero-loc       { color: var(--warm); }

        /* Center stack */
        .hero-stack {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 2.4rem 0;
          max-width: 880px;
        }
        .hero-head-wrap { overflow: hidden; }
        .hero-head {
          font-family: var(--font-cormorant);
          font-weight: 300;
          font-size: clamp(1.9rem, 3.2vw, 2.8rem);
          line-height: 1.15;
          letter-spacing: -0.015em;
          color: var(--ink);
          max-width: 36ch;
          text-wrap: balance;
        }
        .hero-head em {
          font-style: italic;
          font-weight: 400;
        }

        .hero-deck {
          margin-top: 1.2rem;
          max-width: 56ch;
          font-family: var(--font-dm-sans);
          font-weight: 300;
          font-size: 1rem;
          line-height: 1.6;
          color: var(--warm);
        }
        .hero-deck b {
          color: var(--ink);
          font-weight: 400;
        }

        /* CTAs — minimal text links, no buttons */
        .hero-ctas {
          margin-top: 1.6rem;
          display: flex;
          gap: 2.4rem;
          align-items: center;
          flex-wrap: wrap;
        }
        .hero-cta {
          font-family: var(--font-dm-mono);
          font-size: 0.66rem;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          text-decoration: none;
          color: var(--ink);
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding-bottom: 0.35rem;
          border-bottom: 1px solid var(--ink);
        }
        .hero-cta-oracle {
          color: var(--accent-rare);
          border-bottom-color: var(--accent-rare);
        }
        .hero-cta-series {
          color: var(--accent);
          border-bottom-color: var(--accent);
        }
        .hero-arr { transition: transform 0.2s ease; display: inline-block; }
        .hero-cta:hover .hero-arr { transform: translateX(3px); }

        /* Bottom row */
        .hero-foot {
          margin-top: auto;
          padding: 1.2rem 0 1.8rem;
          border-top: 1px solid var(--rule);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1.5rem;
        }
        .hero-status {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          font-family: var(--font-dm-mono);
          font-size: 0.66rem;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: var(--ink);
        }
        .hero-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 22%, transparent);
        }
        .hero-foot-right {
          font-family: var(--font-dm-mono);
          font-size: 0.66rem;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: var(--warm);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero-inner { padding: 0 1.25rem; }
          .hero-meta {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.4rem;
            margin-top: 1.4rem;
          }
          .hero-stack {
            padding: 2rem 0;
            max-width: 100%;
          }
          .hero-head {
            font-size: 1.9rem;
            max-width: 100%;
          }
          .hero-deck { font-size: 0.95rem; }
          .hero-ctas {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          .hero-foot {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
            padding-bottom: 2rem;
          }
        }
      `}</style>
    </section>
  )
}
