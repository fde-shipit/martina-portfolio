'use client'

import { useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { person } from '@/content/data'

/**
 * Hero — quiet editorial.
 *
 * Eyebrow · Headline · Deck · Feature cards (3 products) · Status bar
 *
 * Feature cards:
 *   Redefined by AI  |  The Oracle  |  News Agent
 * Each card has a text CTA and a shiny confetti button.
 * All confetti is golden and contained.
 */
export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)

  const handleConfetti = useCallback(async () => {
    try {
      const confetti = (await import('canvas-confetti')).default
      void confetti({
        particleCount: 40,
        spread: 45,
        origin: { y: 0.65 },
        colors: ['#FFD700', '#D4AF37', '#C9A227', '#FFF4A0', '#E8C40A'],
      })
    } catch { /* animation is non-essential */ }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let cleanup: (() => void) | undefined

    const init = async () => {
      const { gsap } = await import('gsap')

      const meta     = document.getElementById('hero-meta')
      const headline = document.getElementById('hero-head')
      const deck     = document.getElementById('hero-deck')
      const cards    = document.querySelectorAll<HTMLElement>('.hero-feature-card')
      const foot     = document.getElementById('hero-foot')

      if (meta)     gsap.fromTo(meta,     { opacity: 0, y: 10 }, { opacity: 1, y: 0, delay: 0.18, duration: 0.55, ease: 'power2.out' })
      if (headline) {
        gsap.set(headline, { clipPath: 'inset(0 0 100% 0)', y: 28 })
        gsap.to(headline,  { clipPath: 'inset(0 0 0% 0)',   y: 0, delay: 0.32, duration: 0.95, ease: 'power3.out' })
      }
      if (deck)          gsap.fromTo(deck,  { opacity: 0, y: 14 }, { opacity: 1, y: 0, delay: 0.80, duration: 0.60, ease: 'power2.out' })
      if (cards.length)  gsap.fromTo(cards, { opacity: 0, y: 18 }, { opacity: 1, y: 0, stagger: 0.10, delay: 1.05, duration: 0.55, ease: 'power2.out' })
      if (foot)          gsap.fromTo(foot,  { opacity: 0, y: 10 }, { opacity: 1, y: 0, delay: 1.40, duration: 0.55, ease: 'power2.out' })

      cleanup = () => { gsap.killTweensOf('*') }
    }

    init()
    return () => cleanup?.()
  }, [])

  return (
    <section ref={containerRef} id="hero" className="hero-quiet">
      <div className="hero-inner">

        {/* ── Eyebrow ── */}
        <div id="hero-meta" className="hero-meta" style={{ opacity: 0 }}>
          <span className="hero-role">
            {person.role} <span className="hero-role-soft">· {person.company}</span>
          </span>
          <span className="hero-loc">{person.location} · 2026</span>
        </div>

        {/* ── Headline + deck ── */}
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
        </div>

        {/* ── Feature cards ── */}
        <div className="hero-features">

          {/* Redefined by AI */}
          <div className="hero-feature-card hfc-series" style={{ opacity: 0 }}>
            <div className="hfc-eyebrow">Series · 8 reads</div>
            <div className="hfc-title">Redefined by AI</div>
            <p className="hfc-body">
              A vocabulary for AI, in working language. A series about the words AI borrowed
              and quietly redefined. Temperature. Token. Harness. Written from inside the work.
              The posts feed the flashcards. The flashcards feed the quiz.
            </p>
            <div className="hfc-card-actions">
              <Link href="/redefined-by-ai" className="hfc-cta">
                Read the latest <span className="hfc-arr" aria-hidden="true">→</span>
              </Link>
              <a
                href="/flashcards"
                className="hfc-confetti-btn"
                onMouseEnter={handleConfetti}
              >
                Launch the quiz
              </a>
            </div>
          </div>

          {/* The Oracle */}
          <div className="hero-feature-card hfc-oracle" style={{ opacity: 0 }}>
            <div className="hfc-eyebrow hfc-eyebrow--rare">AI artefact · guardrailed</div>
            <div className="hfc-title">The Oracle</div>
            <p className="hfc-body">
              <em>&ldquo;Idk. I need a magic 8 ball&hellip; maybe I can build one!&rdquo;</em>{' '}
              is how this started. Have some fun and ask the Oracle anything.
              Her answers might surprise you.
            </p>
            <div className="hfc-card-actions">
              <Link href="/oracle" className="hfc-cta hfc-cta--rare">
                How it&apos;s built <span className="hfc-arr" aria-hidden="true">→</span>
              </Link>
              <a
                href="/oracle"
                className="hfc-confetti-btn hfc-confetti-btn--rare"
                onMouseEnter={handleConfetti}
              >
                Try the Oracle
              </a>
            </div>
          </div>

          {/* News Agent */}
          <div className="hero-feature-card hfc-news" style={{ opacity: 0 }}>
            <div className="hfc-eyebrow">Open source · Claude API</div>
            <div className="hfc-title">News Agent</div>
            <p className="hfc-body">
              Live web search agent. Open source, documented, and deployable in an evening.
              Try it and then deploy it yourself with the topics you love most. Mine is about AI.
            </p>
            <div className="hfc-card-actions">
              <a
                href="https://martina-edwards.vercel.app/setup-guide-windows.html"
                className="hfc-cta hfc-guide"
                target="_blank"
                rel="noopener noreferrer"
              >
                Setup guide <span className="hfc-arr" aria-hidden="true">→</span>
              </a>
              <a
                href="https://ai-news-agent-gules.vercel.app"
                className="hfc-confetti-btn"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={handleConfetti}
              >
                Open the agent
              </a>
            </div>
          </div>

        </div>

        {/* ── Status bar ── */}
        <div id="hero-foot" className="hero-foot" style={{ opacity: 0 }}>
          <span className="hero-status">
            <span className="hero-dot" aria-hidden="true" />
            Open to talks &amp; introductions
          </span>
          <span className="hero-foot-right">Replying within a day</span>
        </div>

      </div>

      <style>{`
        /* ─── hero shell ─────────────────────────────────────────── */
        .hero-quiet {
          position: relative;
          min-height: 100vh;
          padding-top: 60px;
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

        /* ─── eyebrow ────────────────────────────────────────────── */
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

        /* ─── headline + deck ────────────────────────────────────── */
        .hero-stack {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 2.4rem 0 2rem;
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
        .hero-head em { font-style: italic; font-weight: 400; }
        .hero-deck {
          margin-top: 1.2rem;
          max-width: 56ch;
          font-family: var(--font-dm-sans);
          font-weight: 300;
          font-size: 1rem;
          line-height: 1.6;
          color: var(--warm);
        }
        .hero-deck b { color: var(--ink); font-weight: 400; }

        /* ─── feature cards ──────────────────────────────────────── */
        .hero-features {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: var(--rule);
          border: 1px solid var(--rule);
          margin-bottom: 2rem;
        }

        .hero-feature-card {
          background: var(--paper);
          padding: 1.6rem 1.5rem 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
          text-decoration: none;
          color: inherit;
          position: relative;
          overflow: hidden;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                      background 0.3s ease;
        }

        /* accent sweep — grows from left along bottom edge */
        .hero-feature-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          height: 1px; width: 0;
          background: var(--accent);
          transition: width 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hero-feature-card:hover::after  { width: 100%; }
        .hero-feature-card:hover         { transform: translateY(-2px); background: var(--paper-2); }
        /* oracle variant — raspberry sweep */
        .hfc-oracle::after               { background: var(--accent-rare); }

        /* eyebrow */
        .hfc-eyebrow {
          font-family: var(--font-dm-mono);
          font-size: 0.62rem;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--accent);
        }
        .hfc-eyebrow--rare { color: var(--accent-rare); }

        /* title */
        .hfc-title {
          font-family: var(--font-cormorant);
          font-weight: 300;
          font-size: 1.55rem;
          line-height: 1.15;
          letter-spacing: -0.01em;
          color: var(--ink);
          transition: color 0.25s ease;
        }
        .hero-feature-card:hover .hfc-title { color: var(--accent); }
        .hfc-oracle:hover .hfc-title        { color: var(--accent-rare); }

        /* body */
        .hfc-body {
          font-family: var(--font-dm-sans);
          font-weight: 300;
          font-size: 0.88rem;
          line-height: 1.55;
          color: var(--warm);
          flex: 1;
          margin: 0;
        }

        /* standard text-link CTA */
        .hfc-cta {
          font-family: var(--font-dm-mono);
          font-size: 0.62rem;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--ink);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        .hfc-cta--rare { color: var(--accent-rare); }

        .hfc-arr { display: inline-block; transition: transform 0.2s ease; }
        .hfc-cta:hover .hfc-arr,
        .hfc-guide:hover .hfc-arr { transform: translateX(3px); }

        /* card actions row — used by all three cards */
        .hfc-card-actions {
          display: flex;
          align-items: center;
          gap: 1.1rem;
          flex-wrap: wrap;
          margin-top: auto;
          padding-top: 0.5rem;
        }
        .hfc-guide {
          margin-top: 0;
          padding-top: 0;
        }

        /* ── shiny confetti button ── */
        @keyframes hfc-shimmer {
          0%   { background-position: -240% center; }
          100% { background-position: 240% center; }
        }
        .hfc-confetti-btn {
          font-family: var(--font-dm-mono);
          font-size: 0.62rem;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          text-decoration: none;
          color: var(--paper);
          display: inline-block;
          padding: 0.55rem 1rem;
          background: linear-gradient(
            108deg,
            var(--accent)   0%,
            var(--accent)   28%,
            color-mix(in srgb, var(--accent) 45%, white) 50%,
            var(--accent)   72%,
            var(--accent)   100%
          );
          background-size: 240% auto;
          animation: hfc-shimmer 4.5s linear infinite;
          white-space: nowrap;
          cursor: pointer;
          transition: opacity 0.2s ease;
        }
        .hfc-confetti-btn:hover { opacity: 0.82; }

        /* raspberry (Oracle) variant */
        .hfc-confetti-btn--rare {
          background: linear-gradient(
            108deg,
            var(--accent-rare)   0%,
            var(--accent-rare)   28%,
            color-mix(in srgb, var(--accent-rare) 45%, white) 50%,
            var(--accent-rare)   72%,
            var(--accent-rare)   100%
          );
          background-size: 240% auto;
          animation: hfc-shimmer 4.5s linear infinite;
        }

        /* ─── status bar ─────────────────────────────────────────── */
        .hero-foot {
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

        /* ─── responsive ─────────────────────────────────────────── */
        @media (max-width: 900px) {
          .hero-features { grid-template-columns: 1fr; }
          .hfc-card-actions { gap: 1.4rem; }
        }
        @media (max-width: 768px) {
          .hero-inner  { padding: 0 1.25rem; }
          .hero-meta   { flex-direction: column; align-items: flex-start; gap: 0.4rem; margin-top: 1.4rem; }
          .hero-stack  { padding: 2rem 0 1.5rem; max-width: 100%; }
          .hero-head   { font-size: 1.9rem; max-width: 100%; }
          .hero-deck   { font-size: 0.95rem; }
          .hero-foot   { flex-direction: column; align-items: flex-start; gap: 1rem; padding-bottom: 2rem; }
        }

        /* honour reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .hfc-confetti-btn,
          .hfc-confetti-btn--rare       { animation: none !important; }
          .hero-feature-card,
          .hero-feature-card::after     { transition: none !important; }
        }
      `}</style>
    </section>
  )
}
