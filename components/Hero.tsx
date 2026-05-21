'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { person, heroStats } from '@/content/data'

/**
 * Hero — Broadsheet treatment.
 *
 * Single focal point is the proposition, set in big editorial Cormorant
 * with italic raspberry hitting "all of it." Everything else is in service.
 *
 *   [eyebrow]   Now · AI Acceleration   ·   Manager, AI Acceleration · HSF Kramer
 *
 *   ┌──────────────────────────────────┬──────────────────────────────┐
 *   │  AI didn't replace               │  Ten years inside the…       │
 *   │  my experience.                  │  [View work] [Oracle]        │
 *   │  It handed me the tools          │  ─ Or study the AI vocab…    │
 *   │  to finally use *all of it.*     │                              │
 *   └──────────────────────────────────┴──────────────────────────────┘
 *   ─────────────────────────────────────────────────────────────────────
 *   № 01    │  № 02    │  № 03    │  № 04
 *   2 days     5 years   13,000+    ● Open to talks
 *
 * The optional left spine is decorative — a thin rotated identity strip
 * that ties into the global Nav at top. Hidden under 1024.
 */
export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let cleanup: (() => void) | undefined

    const init = async () => {
      const { gsap } = await import('gsap')

      const eyebrow  = document.getElementById('hero-eyebrow')
      const headline = document.getElementById('hero-head')
      const deck     = document.getElementById('hero-deck')
      const ctas     = document.getElementById('hero-ctas')
      const fc       = document.getElementById('hero-fc')
      const cells    = document.querySelectorAll('.hero-cell')

      if (eyebrow)  gsap.fromTo(eyebrow,  { opacity: 0, y: 12 }, { opacity: 1, y: 0, delay: 0.20, duration: 0.55, ease: 'power2.out' })
      if (headline) {
        gsap.set(headline, { clipPath: 'inset(0 0 100% 0)', y: 36 })
        gsap.to(headline,  { clipPath: 'inset(0 0 0% 0)',   y: 0, delay: 0.32, duration: 1.05, ease: 'power3.out' })
      }
      if (deck)  gsap.fromTo(deck,  { opacity: 0, y: 14 }, { opacity: 1, y: 0, delay: 0.85, duration: 0.65, ease: 'power2.out' })
      if (ctas)  gsap.fromTo(ctas,  { opacity: 0, y: 12 }, { opacity: 1, y: 0, delay: 1.05, duration: 0.55, ease: 'power2.out' })
      if (fc)    gsap.fromTo(fc,    { opacity: 0, y: 10 }, { opacity: 1, y: 0, delay: 1.20, duration: 0.55, ease: 'power2.out' })
      cells.forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, y: 14 }, { opacity: 1, y: 0, delay: 1.30 + i * 0.08, duration: 0.5, ease: 'power2.out' })
      })

      cleanup = () => { gsap.killTweensOf('*') }
    }

    init()
    return () => cleanup?.()
  }, [])

  return (
    <section ref={containerRef} id="hero" className="hero-broadsheet">
      {/* Decorative side spine — identity strip rotated up the left edge.
          Hidden under 1024 to give mobile room. */}
      <aside className="hero-spine" aria-hidden="true">
        <span className="hero-spine-num">№ 01</span>
        <span className="hero-spine-strip">
          <b>{person.name}</b> &nbsp;·&nbsp; {person.role} &nbsp;·&nbsp; {person.location.split(',')[0]} &nbsp;·&nbsp; 2026
        </span>
        <span className="hero-spine-colophon">Hero · Broadsheet</span>
      </aside>

      <div className="hero-shell">
        {/* Eyebrow */}
        <div id="hero-eyebrow" className="hero-eyebrow" style={{ opacity: 0 }}>
          <span className="hero-pill">Now · AI Acceleration</span>
          <span className="hero-mono">
            {person.role} · {person.company}
          </span>
        </div>

        {/* Body: headline left, deck-col right */}
        <div className="hero-body">
          <div className="hero-head-wrap">
            <h1 id="hero-head" className="hero-head">
              <span>AI didn’t replace<br />my experience.</span>
              <br />
              <span className="warm">It handed me the tools<br />to finally use </span>
              <em className="rare">all&nbsp;of&nbsp;it.</em>
            </h1>
          </div>

          <div className="hero-deck-col">
            <p id="hero-deck" className="hero-deck" style={{ opacity: 0 }}>
              Ten years inside the infrastructure and operations layer before
              anyone was calling it AI.{' '}
              <b>I know what breaks, I know what holds, and I can build the thing myself.</b>{' '}
              That combination is still rare.
            </p>

            <div id="hero-ctas" className="hero-ctas" style={{ opacity: 0 }}>
              <a className="hero-cta hero-cta-primary" href="#work">
                View work <span className="hero-arrow" aria-hidden>→</span>
              </a>
              <Link href="/oracle" className="hero-cta hero-cta-oracle">
                Consult the Oracle
                <span className="hero-dot hero-dot-rare" aria-hidden />
              </Link>
            </div>

            <Link
              id="hero-fc"
              href="/redefined-by-ai"
              className="hero-fc"
              style={{ opacity: 0 }}
            >
              <span className="hero-fc-lead">Or read the AI vocabulary —</span>
              <b>Redefined by AI</b>
              <span className="hero-fc-meta">a series · ongoing</span>
              <span className="hero-fc-arr" aria-hidden>→</span>
            </Link>
          </div>
        </div>

        {/* Ledger: 3 stats + status */}
        <div className="hero-ledger">
          {heroStats.map((s, i) => (
            <Cell key={i} index={i + 1} from={s.from} value={s.number} label={s.label} />
          ))}
          <div className="hero-cell hero-cell-status" style={{ opacity: 0 }}>
            <span className="hero-cell-index">№ 04</span>
            <span className="hero-cell-from">Status</span>
            <span className="hero-status-row">
              <span className="hero-pulse" aria-hidden />
              Open to talks &amp; intros
            </span>
            <span className="hero-cell-label">
              Currently leading AI acceleration at {person.company}.
              Replying to most messages within a day.
            </span>
          </div>
        </div>
      </div>

      <style>{`
        .hero-broadsheet {
          position: relative;
          min-height: 100vh;
          padding: 120px 3rem 3rem calc(56px + 3rem);
          max-width: 1500px;
          margin: 0 auto;
          display: grid;
          grid-template-rows: auto 1fr auto;
        }

        /* ── Spine ── */
        .hero-spine {
          position: absolute;
          top: 60px;            /* sit below the global nav */
          bottom: 0;
          left: 0;
          width: 56px;
          border-right: 1px solid var(--rule);
          pointer-events: none;
        }
        .hero-spine-num,
        .hero-spine-colophon {
          position: absolute;
          left: 0; right: 0;
          text-align: center;
          font-family: var(--font-dm-mono);
          font-size: 0.6rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--warm);
        }
        .hero-spine-num      { top: 1.6rem; }
        .hero-spine-colophon { bottom: 1.6rem; }
        .hero-spine-strip {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%) rotate(-90deg);
          white-space: nowrap;
          font-family: var(--font-dm-mono);
          font-size: 0.6rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--warm);
        }
        .hero-spine-strip b { color: var(--ink); font-weight: 400; }

        @media (max-width: 1024px) {
          .hero-broadsheet { padding-left: 3rem; }
          .hero-spine { display: none; }
        }

        /* ── Shell ── */
        .hero-shell { display: contents; }

        /* ── Eyebrow ── */
        .hero-eyebrow {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 1rem;
          padding-top: 0.4rem;
        }
        .hero-pill {
          display: inline-flex; align-items: center; gap: 0.55rem;
          padding: 0.35rem 0.7rem;
          border: 1px solid var(--accent);
          color: var(--accent);
          font-family: var(--font-dm-mono);
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.18em;
        }
        .hero-mono {
          font-family: var(--font-dm-mono);
          font-size: 0.66rem;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: var(--warm);
        }

        /* ── Body ── */
        .hero-body {
          display: grid;
          grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
          column-gap: 4.5rem;
          align-content: center;
          padding: 2.5rem 0 2rem;
        }
        .hero-head-wrap { overflow: hidden; }
        .hero-head {
          font-family: var(--font-cormorant);
          font-weight: 300;
          font-size: clamp(2.4rem, 5.4vw, 5.4rem);
          line-height: 0.96;
          letter-spacing: -0.022em;
          color: var(--ink);
          max-width: 18ch;
          text-wrap: balance;
        }
        .hero-head .warm { color: var(--warm); }
        .hero-head em.rare {
          font-style: italic;
          color: var(--accent-rare);
          font-weight: 400;
          white-space: nowrap;
        }

        .hero-deck-col {
          display: flex;
          flex-direction: column;
          gap: 1.6rem;
          align-self: end;
          padding-bottom: 0.6rem;
        }
        .hero-deck {
          font-family: var(--font-dm-sans);
          font-weight: 300;
          font-size: 1.02rem;
          line-height: 1.6;
          color: var(--ink-soft);
          max-width: 40ch;
          text-wrap: pretty;
        }
        .hero-deck b { font-weight: 500; color: var(--ink); }

        /* ── CTAs ── */
        .hero-ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 0.65rem;
          align-items: center;
        }
        .hero-cta {
          display: inline-flex; align-items: center; gap: 0.7rem;
          font-family: var(--font-dm-mono);
          font-weight: 500;
          font-size: 0.66rem;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          text-decoration: none;
          padding: 0.95rem 1.25rem;
          line-height: 1;
          transition: transform 0.2s ease;
        }
        .hero-cta-primary { color: var(--paper); background: var(--ink); }
        .hero-cta-primary:hover .hero-arrow { transform: translateX(3px); }
        .hero-arrow { display: inline-block; transition: transform 0.2s ease; }

        .hero-cta-oracle {
          color: var(--accent-rare);
          border: 1px solid var(--accent-rare);
        }
        .hero-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent);
        }
        .hero-dot-rare { background: var(--accent-rare); }

        /* ── Flashcards inline ── */
        .hero-fc {
          display: inline-flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.55rem;
          font-family: var(--font-dm-mono);
          font-size: 0.66rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--warm);
          text-decoration: none;
          padding-top: 0.25rem;
          width: fit-content;
        }
        .hero-fc-lead { color: var(--warm); }
        .hero-fc b { color: var(--ink); font-weight: 500; }
        .hero-fc-meta { color: var(--warm); }
        .hero-fc-arr { color: var(--accent); transition: transform 0.2s ease; }
        .hero-fc:hover .hero-fc-arr { transform: translateX(3px); }
        .hero-fc:hover b {
          background-image: linear-gradient(var(--ink), var(--ink));
          background-size: 100% 1px;
          background-repeat: no-repeat;
          background-position: 0 100%;
        }

        /* ── Ledger ── */
        .hero-ledger {
          margin-top: auto;
          padding-top: 2.2rem;
          border-top: 1px solid var(--rule-strong, rgba(28,32,36,.22));
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        .hero-cell {
          padding: 1.4rem 1.6rem 0.4rem 0;
          position: relative;
          display: flex; flex-direction: column;
          gap: 0.55rem;
        }
        .hero-cell + .hero-cell {
          padding-left: 1.6rem;
          border-left: 1px solid var(--rule);
        }
        .hero-cell-index {
          position: absolute;
          top: -0.7rem; left: 0;
          background: var(--paper);
          padding-right: 0.55rem;
          font-family: var(--font-dm-mono);
          font-size: 0.58rem; letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--warm);
        }
        .hero-cell + .hero-cell .hero-cell-index { left: 1.6rem; }
        .hero-cell-from {
          font-family: var(--font-dm-mono);
          font-size: 0.58rem; letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--warm);
        }
        .hero-cell-num {
          font-family: var(--font-cormorant);
          font-weight: 300;
          font-size: clamp(1.6rem, 2.4vw, 2.4rem);
          line-height: 1;
          color: var(--accent);
          letter-spacing: -0.01em;
        }
        .hero-cell-num em {
          color: var(--warm);
          font-size: 0.6em;
          font-weight: 300;
          margin-left: 0.25em;
          font-style: normal;
        }
        .hero-cell-label {
          font-family: var(--font-dm-sans);
          font-size: 0.85rem;
          line-height: 1.45;
          color: var(--ink-soft);
          max-width: 28ch;
        }

        .hero-cell-status { justify-content: flex-end; }
        .hero-status-row {
          display: inline-flex; align-items: center; gap: 0.6rem;
          font-family: var(--font-dm-mono);
          font-size: 0.7rem; letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--ink);
        }
        .hero-pulse {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 22%, transparent);
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .hero-broadsheet { padding: 100px 2rem 2.5rem; }
          .hero-body {
            grid-template-columns: 1fr;
            column-gap: 0;
            row-gap: 1.75rem;
            padding: 2rem 0 2.5rem;
          }
          .hero-head { max-width: 100%; font-size: clamp(2.2rem, 6vw, 4rem); }
          .hero-deck-col { align-self: start; gap: 1.4rem; padding-bottom: 0; }
          .hero-deck { max-width: 100%; }
          .hero-ledger { grid-template-columns: repeat(2, 1fr); row-gap: 1rem; }
          .hero-cell:nth-child(odd) { border-left: none; padding-left: 0; }
          .hero-cell:nth-child(odd) .hero-cell-index { left: 0; }
          .hero-cell:nth-child(3),
          .hero-cell:nth-child(4) {
            border-top: 1px solid var(--rule);
            padding-top: 1.4rem;
          }
        }

        @media (max-width: 640px) {
          .hero-broadsheet { padding: 92px 1.25rem 2rem; }
          .hero-head { font-size: 2.1rem; }
          .hero-eyebrow { gap: 0.6rem; }
          .hero-ledger { grid-template-columns: 1fr; }
          .hero-cell { border-left: none !important; padding-left: 0 !important; }
          .hero-cell + .hero-cell {
            border-top: 1px solid var(--rule);
            padding-top: 1.4rem;
          }
          .hero-cell-index { left: 0 !important; }
          .hero-cta { flex: 1 1 auto; justify-content: center; padding: 0.9rem 1rem; }
          .hero-fc { font-size: 0.6rem; }
        }
      `}</style>
    </section>
  )
}

/* ── Stat cell — three of these + the status cell ── */
function Cell({
  index,
  from,
  value,
  label,
}: {
  index: number
  from: string
  value: string
  label: string
}) {
  // Pull the trailing units off the number (e.g. "2 days" → "2" + "days") so the
  // unit can render small + warm next to the big serif numeral.
  const m = value.match(/^([\d,.+]+)\s*(.*)$/)
  const num = m?.[1] ?? value
  const unit = m?.[2] ?? ''
  return (
    <div className="hero-cell" style={{ opacity: 0 }}>
      <span className="hero-cell-index">№ 0{index}</span>
      <span className="hero-cell-from">{from}</span>
      <span className="hero-cell-num">
        {num}
        {unit && <em> {unit}</em>}
      </span>
      <span className="hero-cell-label">{label}</span>
    </div>
  )
}
