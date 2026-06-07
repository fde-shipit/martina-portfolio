'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { person } from '@/content/data'

/**
 * Hero — quiet editorial.
 *
 * Eyebrow · Headline · Deck · Feature cards (3 products) · Status bar
 *
 * Feature cards:
 *   Redefined by AI  |  The Oracle  |  News Agent
 * Each card has a text CTA and a fill-sweep button.
 */
export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const emailAreaRef = useRef<HTMLDivElement>(null);
  const defaultRef   = useRef<HTMLSpanElement>(null);
  const scrambleRef  = useRef<HTMLSpanElement>(null);
  const modeRef      = useRef<'idle' | 'auto' | 'hover'>('idle');
  const rafRef       = useRef<number | null>(null);
  const timerRef     = useRef<ReturnType<typeof setTimeout> | null>(null);

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

      if (meta)     gsap.fromTo(meta,     { opacity: 0, y: 10 }, { opacity: 1, y: 0, delay: 0.18, duration: 0.55, ease: 'power2.out' })
      if (headline) {
        gsap.set(headline, { clipPath: 'inset(0 0 100% 0)', y: 28 })
        gsap.to(headline,  { clipPath: 'inset(0 0 0% 0)',   y: 0, delay: 0.32, duration: 0.95, ease: 'power3.out' })
      }
      if (deck)          gsap.fromTo(deck,  { opacity: 0, y: 14 }, { opacity: 1, y: 0, delay: 0.80, duration: 0.60, ease: 'power2.out' })
      if (cards.length)  gsap.fromTo(cards, { opacity: 0, y: 18 }, { opacity: 1, y: 0, stagger: 0.13, delay: 1.05, duration: 0.70, ease: 'power2.out' })

      cleanup = () => { gsap.killTweensOf('*') }
    }

    init()
    return () => cleanup?.()
  }, [])

  const CHARS   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@._-+';
  const EMAIL   = 'martina.edwards.p@gmail.com';
  const TARGET  = 'get in touch.';

  const NOISE_DUR      = 300;
  const RESOLVE_DUR    = 520;
  const HOLD_DUR       = 2800;
  const RETURN_DUR     = 520;
  const CROSSFADE      = 200;
  const INITIAL_DELAY  = 1500;
  const BETWEEN_CYCLES = 6000;

  function rand() { return CHARS[Math.floor(Math.random() * CHARS.length)]; }

  function cancelAll() {
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
  }

  function showDefault() {
    cancelAll();
    if (scrambleRef.current) { scrambleRef.current.style.opacity = '0'; scrambleRef.current.textContent = ''; }
    if (defaultRef.current)  defaultRef.current.style.opacity = '1';
  }

  function noise(len: number, dur: number, color: string, token: string, cb: () => void) {
    if (!scrambleRef.current || !defaultRef.current) return;
    scrambleRef.current.style.color   = color;
    scrambleRef.current.style.opacity = '1';
    defaultRef.current.style.opacity  = '0';
    const t0 = performance.now();
    function f(t: number) {
      if (modeRef.current !== token) return;
      if (!scrambleRef.current) return;
      if (t - t0 < dur) {
        let s = ''; for (let i = 0; i < len; i++) s += rand();
        scrambleRef.current.textContent = s;
        rafRef.current = requestAnimationFrame(f);
      } else cb();
    }
    rafRef.current = requestAnimationFrame(f);
  }

  function resolveText(text: string, dur: number, token: string, cb: () => void) {
    const len = text.length, t0 = performance.now();
    function f(t: number) {
      if (modeRef.current !== token) return;
      if (!scrambleRef.current) return;
      const p = Math.min((t - t0) / dur, 1), n = Math.floor(p * len);
      let s = ''; for (let i = 0; i < len; i++) s += i < n ? text[i] : rand();
      scrambleRef.current.textContent = s;
      if (p < 1) rafRef.current = requestAnimationFrame(f);
      else { scrambleRef.current.textContent = text; cb(); }
    }
    rafRef.current = requestAnimationFrame(f);
  }

  function runCycle(token: string, onDone: () => void) {
    noise(EMAIL.length, NOISE_DUR, '#308695', token, () => {
      resolveText(TARGET, RESOLVE_DUR, token, () => {
        timerRef.current = setTimeout(() => {
          if (modeRef.current !== token) return;
          if (scrambleRef.current) scrambleRef.current.style.color = 'rgba(212,87,105,0.55)';
          resolveText(EMAIL, RETURN_DUR, token, () => {
            if (defaultRef.current) defaultRef.current.style.opacity = '1';
            timerRef.current = setTimeout(() => {
              if (modeRef.current !== token) return;
              if (scrambleRef.current) { scrambleRef.current.style.opacity = '0'; scrambleRef.current.textContent = ''; }
              onDone();
            }, CROSSFADE);
          });
        }, HOLD_DUR);
      });
    });
  }

  function startAuto() {
    modeRef.current = 'auto';
    runCycle('auto', () => {
      timerRef.current = setTimeout(() => {
        if (modeRef.current !== 'auto') return;
        runCycle('auto', () => {
          if (modeRef.current !== 'auto') return;
          modeRef.current = 'idle';
          showDefault();
        });
      }, BETWEEN_CYCLES);
    });
  }

  function handleMouseEnter() {
    cancelAll();
    modeRef.current = 'hover';
    if (defaultRef.current)  defaultRef.current.style.opacity  = '0';
    if (scrambleRef.current) { scrambleRef.current.style.opacity = '0'; scrambleRef.current.textContent = ''; }
    noise(EMAIL.length, NOISE_DUR, '#308695', 'hover', () => {
      resolveText(TARGET, RESOLVE_DUR, 'hover', () => {
        if (modeRef.current !== 'hover') return;
        if (scrambleRef.current) scrambleRef.current.style.color = '#308695';
      });
    });
  }

  function handleMouseLeave() {
    modeRef.current = 'idle';
    showDefault();
  }

  useEffect(() => {
    timerRef.current = setTimeout(startAuto, INITIAL_DELAY);
    return () => cancelAll();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={containerRef} id="hero" className="hero-quiet">
      <div className="hero-inner">

        {/* ── Eyebrow ── */}
        <div id="hero-meta" className="hero-meta" style={{ opacity: 0 }}>
          <span className="hero-role">
            {person.role} <span className="hero-role-soft">· {person.company}</span>
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.35rem' }}>
            <span className="hero-loc">{person.location} · 2026</span>
            <div ref={emailAreaRef} style={{ position: 'relative', height: '14px', cursor: 'pointer', minWidth: '240px', display: 'flex', justifyContent: 'flex-end' }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={() => window.location.href = 'mailto:martina.edwards.p@gmail.com'}
            >
              <span ref={defaultRef} style={{ position: 'absolute', right: 0, top: 0, fontFamily: 'var(--font-dm-mono)', fontSize: '9.5px', letterSpacing: '0.08em', color: 'rgba(212,87,105,0.6)', whiteSpace: 'nowrap' }}>
                martina.edwards.p@gmail.com
              </span>
              <span ref={scrambleRef} style={{ position: 'absolute', right: 0, top: 0, fontFamily: 'var(--font-dm-mono)', fontSize: '9.5px', letterSpacing: '0.08em', opacity: 0, whiteSpace: 'nowrap' }} />
            </div>
          </div>
        </div>

        {/* ── Headline + deck ── */}
        <div className="hero-stack">
          <div className="hero-head-wrap">
            <h1 id="hero-head" className="hero-head">
              &ldquo;The right question is worth more than a hundred confident answers.&rdquo;
            </h1>
          </div>
          <p id="hero-deck" className="hero-citation" style={{ opacity: 0 }}>
            — Claude Sonnet 4.6, in conversation with Martina Edwards. <em>Confidence Is Not Correctness</em> (June 2026)
          </p>
        </div>

        {/* ── Feature cards ── */}
        <div className="hero-features">

          {/* Redefined by AI */}
          <div className="hero-feature-card hfc-series" style={{ opacity: 0 }}>
            <div className="hfc-eyebrow">Series · 8 reads</div>
            <div className="hfc-title">Redefined by AI</div>
            <p className="hfc-body">
              The words AI borrowed and quietly redefined. Written from inside the work.
              It all feeds a game. Come play.
            </p>
            <div className="hfc-card-actions">
              <Link href="/redefined-by-ai" className="hfc-cta">
                Read the latest <span className="hfc-arr" aria-hidden="true">→</span>
              </Link>
              <a
                href="/flashcards"
                className="hfc-confetti-btn"
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
              &ldquo;Idk. I need a magic 8 ball&hellip; maybe I can build one!&rdquo; So I did.
            </p>
            <div className="hfc-card-actions">
              <Link href="/work/oracle-case-study" className="hfc-cta hfc-cta--rare">
                How it&apos;s built <span className="hfc-arr" aria-hidden="true">→</span>
              </Link>
              <a
                href="/oracle"
                className="hfc-confetti-btn hfc-confetti-btn--rare"
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
              Wanted a web search agent so I built one. Open source, deployable in an evening.
              Mine tracks AI. Point it at anything.
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
              >
                Open the agent
              </a>
            </div>
          </div>

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
        .hero-citation {
          margin-top: 1.1rem;
          font-family: var(--font-dm-mono);
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.13em;
          color: var(--accent);
          line-height: 1.6;
        }
        .hero-citation em { font-style: normal; }

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
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* accent line sweeps in from left along bottom edge */
        .hero-feature-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          height: 2px; width: 0;
          background: var(--accent);
          transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hero-feature-card:hover::after { width: 100%; }
        .hfc-oracle::after              { background: var(--accent-rare); }
        .hero-feature-card:hover        { transform: translateY(-3px); }

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

        /* ── fill-sweep button ── */
        .hfc-confetti-btn {
          font-family: var(--font-dm-mono);
          font-size: 0.62rem;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          text-decoration: none;
          color: var(--ink);
          display: inline-block;
          padding: 0.55rem 1rem;
          background: linear-gradient(to right, var(--accent) 50%, transparent 50%);
          background-size: 200% 100%;
          background-position: right center;
          border: 1px solid var(--rule-strong);
          white-space: nowrap;
          cursor: pointer;
          transition: background-position 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                      color 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hfc-confetti-btn:hover {
          background-position: left center;
          color: #fff;
        }

        /* Oracle (raspberry) variant */
        .hfc-confetti-btn--rare {
          background: linear-gradient(to right, var(--accent-rare) 50%, transparent 50%);
          background-size: 200% 100%;
          background-position: right center;
        }
        .hfc-confetti-btn--rare:hover {
          background-position: left center;
          color: #fff;
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
        }

        /* honour reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .hfc-confetti-btn,
          .hfc-confetti-btn--rare       { transition: none !important; }
          .hero-feature-card,
          .hero-feature-card::after     { transition: none !important; }
        }
      `}</style>
    </section>
  )
}
