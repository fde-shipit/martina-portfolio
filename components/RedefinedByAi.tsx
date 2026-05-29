'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { redefinedByAi } from '@/content/data'

/**
 * Redefined by AI — section page.
 *
 *   /redefined-by-ai
 *
 * Index is split into two groups:
 *   - The Series: posted entries
 *   - What's next: written / draft / todo
 *
 * Deck visual auto-cycles through DECK_TERMS every 3.2 s.
 * Five card slots: -1 leaving, 0 front, 1 mid, 2 back, 3 incoming.
 */

const STATUS_LABEL: Record<'posted' | 'written' | 'draft' | 'todo', string> = {
  posted:  'Posted',
  written: 'Written · soon',
  draft:   'Draft',
  todo:    'Coming',
}

const pad = (n: number) => String(n).padStart(2, '0')

const DECK_TERMS = [
  { num: '02',  card: '02 / 35', term: 'Memory.',      def: <>Three things make AI <em>feel</em> like it remembers. None of them are memory.</> },
  { num: '03b', card: '08 / 35', term: 'Mythos.',      def: <>In seven weeks, it found <em>over 2,000</em> unknown vulnerabilities.</> },
  { num: '03',  card: '05 / 35', term: 'Training.',    def: <>The best trainer you've ever had stopped <em>learning</em> the day it launched.</> },
  { num: '04',  card: '12 / 35', term: 'Temperature.', def: <>Same model, <em>different mood.</em></> },
  { num: '01',  card: '01 / 35', term: 'Model.',       def: <>Same spelling. <em>New job.</em> Nobody sent a fax.</> },
  { num: '03c', card: '09 / 35', term: 'Token.',       def: <>Worth knowing <em>tomorrow's bill.</em></> },
  { num: '02b', card: '04 / 35', term: 'Injection.',   def: <>Invisible to you. <em>Not</em> to your model.</> },
]

export default function RedefinedByAi() {
  const { entries, deckHref, totalCards } = redefinedByAi

  const postedCount = entries.filter(e => e.status === 'posted').length
  const toComCount  = entries.filter(e => e.status !== 'posted').length
  const lastPosted  = [...entries].reverse().find(e => e.status === 'posted')
  const lastIdx     = lastPosted ? entries.indexOf(lastPosted) + 1 : 0

  return (
    <section id="redefined-by-ai" className="rba">
      <div className="rba-inner">

        {/* Page header eyebrow */}
        <div className="rba-ph">
          <span className="rba-mono">
            <span className="rba-accent">Redefined by AI</span>
            <span className="rba-soft"> &nbsp;·&nbsp; A series</span>
          </span>
          {lastPosted && (
            <span className="rba-mono rba-tiny rba-right">
              Latest · No. {pad(lastIdx)} {lastPosted.title.replace(/\.$/, '')}
            </span>
          )}
        </div>

        {/* Intro */}
        <div className="rba-intro">
          <h1 className="rba-h1">
            A vocabulary for AI,<br />
            in <em>working language.</em>
          </h1>
          <p className="rba-lede">
            A series about the words AI borrowed and quietly redefined.{' '}
            <b>Temperature. Token. Harness.</b> Written from inside the work.
            The posts are the source material for the flashcards and the game built on top of them.
          </p>
          <div className="rba-ctas">
            {lastPosted && (
              <a className="rba-cta" href={lastPosted.href ?? '#'}>
                Read the latest <span className="rba-arr" aria-hidden>→</span>
              </a>
            )}
            <Link className="rba-cta-btn" href={deckHref}>
              Play the deck <span className="rba-arr" aria-hidden>→</span>
            </Link>
          </div>
        </div>

        {/* Deck play module — sits between intro and series index */}
        <div className="rba-play">
          <div className="rba-copy">
            <h2 className="rba-h2">
              The same vocabulary, <em>as a game.</em>
            </h2>
            <p className="rba-p">
              Every term in the series, as a flashcard.{' '}
              <b>Learn mode</b> walks you through.{' '}
              <b>Quiz mode</b> tests your recall. The deck grows with the writing.
            </p>
            <div className="rba-meta">
              <span><b>{totalCards}</b> terms</span>
              <span><b>{entries.length}</b> entries</span>
              <span>grows with the series</span>
            </div>
            <Link className="rba-cta-btn rba-cta-btn-sm" href={deckHref}>
              Play the deck <span className="rba-arr" aria-hidden>→</span>
            </Link>
          </div>

          <DeckVis />
        </div>

        {/* Section heading — The Series */}
        <div className="rba-sh">
          <span className="rba-mono">The Series</span>
          <span className="rba-mono rba-tiny rba-right">
            {postedCount} posted &nbsp;·&nbsp; {toComCount} to come &nbsp;·&nbsp; ongoing
          </span>
        </div>

        {/* Posted index */}
        <div className="rba-index" role="list">
          {entries
            .map((e, i) => ({ e, i }))
            .filter(({ e }) => e.status === 'posted')
            .map(({ e, i }) => (
              <Row key={i} num={pad(i + 1)} title={e.title} hook={e.hook} status={e.status} href={e.href} />
            ))}
        </div>

        {/* Section heading — What's next */}
        <div className="rba-sh">
          <span className="rba-mono">What's next</span>
          <span className="rba-mono rba-tiny rba-right">In the pipeline</span>
        </div>

        {/* Upcoming index */}
        <div className="rba-index" role="list">
          {entries
            .map((e, i) => ({ e, i }))
            .filter(({ e }) => e.status !== 'posted')
            .map(({ e, i }) => (
              <Row key={i} num={pad(i + 1)} title={e.title} hook={e.hook} status={e.status} href={e.href} />
            ))}
        </div>

      </div>
      <style>{styles}</style>
    </section>
  )
}

/* ── Row ───────────────────────────────────────────────── */
function Row({
  num,
  title,
  hook,
  status,
  href,
}: {
  num: string
  title: string
  hook: string
  status: 'posted' | 'written' | 'draft' | 'todo'
  href?: string
}) {
  const isPosted = status === 'posted'
  const inner = (
    <>
      <span className="rba-row-num">№ {num}</span>
      <span className="rba-row-title">{title}</span>
      <span className="rba-row-hook">{hook}</span>
      <span className={`rba-row-status rba-status-${status}`}>{STATUS_LABEL[status]}</span>
      <span className="rba-row-arr" aria-hidden>{isPosted ? '→' : '·'}</span>
    </>
  )
  return isPosted && href ? (
    <Link href={href} className="rba-row rba-row-link" role="listitem">{inner}</Link>
  ) : (
    <div className={`rba-row${isPosted ? '' : ' rba-row-unposted'}`} role="listitem">{inner}</div>
  )
}

/* ── Animated Deck ─────────────────────────────────────── */
function DeckVis() {
  const [head, setHead] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setHead(h => h + 1), 3200)
    return () => clearInterval(id)
  }, [])
  const slots = [-1, 0, 1, 2, 3]
  const N = DECK_TERMS.length
  return (
    <div className="rba-deck-vis" aria-live="polite">
      {slots.map(offset => {
        const absIdx = head + offset
        const t = DECK_TERMS[((absIdx % N) + N) % N]
        return (
          <div className="rba-card" data-pos={String(offset)} key={absIdx}>
            <div className="rba-card-top">
              <span><b>Redefined by AI</b> · Card {t.card}</span>
              <span className="rba-card-n">№ {t.num}</span>
            </div>
            <div className="rba-card-term">{t.term}</div>
            <div className="rba-card-def">{t.def}</div>
          </div>
        )
      })}
    </div>
  )
}

/* ── Styles ────────────────────────────────────────────── */
const styles = `
  .rba {
    position: relative;
    padding: 6rem 3rem 6rem;
    max-width: 1500px;
    margin: 0 auto;
    color: var(--ink);
  }
  .rba-inner { max-width: 1180px; margin: 0 auto; }

  .rba-mono {
    font-family: var(--font-dm-mono);
    font-size: 0.66rem;
    text-transform: uppercase;
    letter-spacing: 0.16em;
  }
  .rba-tiny   { font-size: 0.6rem; letter-spacing: 0.18em; }
  .rba-accent { color: var(--accent); }
  .rba-soft   { color: var(--warm); }
  .rba-right  { color: var(--warm); margin-left: auto; text-align: right; }

  /* Page header */
  .rba-ph {
    padding: 0 0 2rem;
    display: flex; justify-content: space-between; align-items: baseline;
    gap: 1rem;
    border-bottom: 1px solid var(--rule);
  }

  /* Intro */
  .rba-intro {
    padding: 3rem 0 3rem;
    max-width: 880px;
    display: flex; flex-direction: column; gap: 1.2rem;
  }
  .rba-h1 {
    font-family: var(--font-cormorant);
    font-weight: 300;
    font-size: clamp(2.2rem, 4.4vw, 3.4rem);
    line-height: 1.05;
    letter-spacing: -0.02em;
    color: var(--ink);
    max-width: 22ch;
    text-wrap: balance;
  }
  .rba-h1 em { font-style: italic; font-weight: 400; }
  .rba-lede {
    max-width: 58ch;
    font-family: var(--font-dm-sans);
    font-weight: 300;
    font-size: 1.02rem;
    line-height: 1.65;
    color: var(--warm);
  }
  .rba-lede b { color: var(--ink); font-weight: 400; }

  .rba-ctas {
    margin-top: 0.6rem;
    display: flex; gap: 2.2rem; align-items: center; flex-wrap: wrap;
  }
  .rba-cta {
    font-family: var(--font-dm-mono);
    font-size: 0.66rem;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    text-decoration: none;
    color: var(--ink);
    display: inline-flex; align-items: center; gap: 0.6rem;
    padding-bottom: 0.35rem;
    border-bottom: 1px solid var(--ink);
  }
  .rba-cta-accent {
    color: var(--accent);
    border-bottom-color: var(--accent);
  }
  /* Fill-sweep button — used for the primary game CTA */
  .rba-cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    font-family: var(--font-dm-mono);
    font-size: 0.66rem;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    color: var(--ink);
    background: linear-gradient(to right, var(--accent) 50%, transparent 50%);
    background-size: 200% 100%;
    background-position: right center;
    border: 1px solid var(--rule-strong);
    text-decoration: none;
    padding: 0.65rem 1.1rem;
    width: fit-content;
    transition: background-position 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                color 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .rba-cta-btn:hover {
    background-position: left center;
    color: #fff;
  }
  .rba-cta-btn:hover .rba-arr { transform: translateX(3px); }
  /* Slightly smaller variant used inside the deck module */
  .rba-cta-btn-sm {
    margin-top: 1.6rem;
  }
  .rba-arr { transition: transform 0.2s ease; }
  .rba-cta:hover .rba-arr { transform: translateX(3px); }

  /* Section heading */
  .rba-sh {
    padding: 2.2rem 0 0.8rem;
    display: flex; justify-content: space-between; align-items: baseline;
    border-top: 1px solid var(--rule-strong);
  }

  /* Index */
  .rba-index { display: flex; flex-direction: column; }
  .rba-row {
    display: grid;
    grid-template-columns: 80px minmax(0, 1fr) minmax(0, 1.4fr) 120px 24px;
    align-items: baseline;
    gap: 2rem;
    padding: 1.2rem 0;
    border-top: 1px solid var(--rule);
    color: inherit;
    text-decoration: none;
  }
  .rba-row-link { cursor: pointer; }
  .rba-row-link:hover { background: color-mix(in srgb, var(--pale) 50%, transparent); }
  .rba-row-link:hover .rba-row-arr { transform: translateX(3px); }

  .rba-row-num {
    font-family: var(--font-dm-mono);
    font-size: 0.7rem; letter-spacing: 0.14em;
    color: var(--warm);
  }
  .rba-row-title {
    font-family: var(--font-cormorant);
    font-weight: 300;
    font-style: italic;
    font-size: 1.55rem;
    line-height: 1.1;
    color: var(--ink);
    letter-spacing: -0.005em;
  }
  .rba-row-hook {
    font-family: var(--font-dm-sans);
    font-weight: 300;
    font-size: 0.92rem;
    line-height: 1.45;
    color: var(--warm);
  }
  .rba-row-status {
    font-family: var(--font-dm-mono);
    font-size: 0.6rem; letter-spacing: 0.18em;
    text-transform: uppercase;
    text-align: right;
  }
  .rba-status-posted  { color: var(--accent); }
  .rba-status-written { color: var(--ink-soft); }
  .rba-status-draft   { color: var(--warm); }
  .rba-status-todo    { color: var(--warm); }
  .rba-row-arr {
    font-family: var(--font-dm-mono);
    font-size: 0.9rem;
    color: var(--ink);
    text-align: right;
    transition: transform 0.2s ease;
  }
  .rba-row-unposted .rba-row-arr { color: var(--rule-strong); }

  /* Deck play module */
  .rba-play {
    margin-top: 0;
    padding: 3rem 0 3.5rem;
    border-top: none;
    border-bottom: 1px solid var(--rule-strong);
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    column-gap: 4rem;
    align-items: center;
  }
  .rba-h2 {
    font-family: var(--font-cormorant);
    font-weight: 300;
    font-size: clamp(1.7rem, 2.6vw, 2.2rem);
    line-height: 1.1;
    letter-spacing: -0.015em;
    color: var(--ink);
    max-width: 18ch;
  }
  .rba-h2 em { font-style: italic; }
  .rba-p {
    margin-top: 1rem;
    font-family: var(--font-dm-sans);
    font-weight: 300;
    font-size: 0.98rem;
    line-height: 1.6;
    color: var(--warm);
    max-width: 44ch;
  }
  .rba-p b { color: var(--ink); font-weight: 400; }
  .rba-meta {
    margin-top: 1.2rem;
    display: flex; gap: 1rem; flex-wrap: wrap;
    font-family: var(--font-dm-mono);
    font-size: 0.62rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--warm);
  }
  .rba-meta b { color: var(--ink); font-weight: 500; }
  /* rba-cta-deck removed — replaced by rba-cta-btn-sm */

  /* ── Animated card deck ──────────────────────────────── */
  .rba-deck-vis {
    position: relative;
    height: 360px;
    perspective: 1400px;
  }
  .rba-card {
    position: absolute;
    background: var(--paper-2);
    border: 1px solid var(--rule);
    padding: 1.4rem 1.6rem;
    display: flex; flex-direction: column;
    gap: 0.8rem;
    width: 320px;
    height: 200px;
    transform-origin: 50% 60%;
    will-change: transform, opacity;
    transition:
      transform 0.95s cubic-bezier(.22,.61,.36,1),
      opacity   0.85s ease,
      box-shadow 0.6s ease,
      border-color 0.6s ease;
  }
  /* incoming */
  .rba-card[data-pos="3"] {
    top: -30px; right: 150px;
    transform: rotate(-9deg) scale(0.94);
    opacity: 0;
    z-index: 1;
  }
  /* back */
  .rba-card[data-pos="2"] {
    top: 0; right: 100px;
    transform: rotate(-4deg);
    opacity: 0.5;
    z-index: 2;
  }
  /* mid */
  .rba-card[data-pos="1"] {
    top: 30px; right: 60px;
    transform: rotate(2deg);
    opacity: 0.75;
    z-index: 3;
  }
  /* front */
  .rba-card[data-pos="0"] {
    top: 70px; right: 20px;
    transform: rotate(-1deg);
    opacity: 1;
    border-color: var(--rule-strong);
    box-shadow: 0 18px 36px -22px rgba(0,0,0,0.18);
    z-index: 4;
  }
  /* leaving */
  .rba-card[data-pos="-1"] {
    top: 70px; right: 20px;
    transform: translate(28px, -110px) rotate(6deg);
    opacity: 0;
    z-index: 5;
  }

  .rba-card-top {
    display: flex; justify-content: space-between;
    font-family: var(--font-dm-mono);
    font-size: 0.58rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--warm);
  }
  .rba-card-top b { color: var(--ink); font-weight: 500; }
  .rba-card-n { color: var(--accent); }
  .rba-card-term {
    font-family: var(--font-cormorant);
    font-weight: 300;
    font-style: italic;
    font-size: 2.2rem;
    line-height: 1;
    color: var(--ink);
    letter-spacing: -0.01em;
  }
  .rba-card-def {
    font-family: var(--font-dm-sans);
    font-weight: 300;
    font-size: 0.82rem;
    line-height: 1.45;
    color: var(--ink-soft);
    opacity: 0;
    transition: opacity 0.55s ease 0.15s;
  }
  .rba-card[data-pos="0"] .rba-card-def { opacity: 1; }
  .rba-card-def em { color: var(--accent); font-style: italic; }

  @media (prefers-reduced-motion: reduce) {
    .rba-card { transition: none; }
    .rba-card-def { transition: none; }
    .rba-card[data-pos="3"] { opacity: 0; }
    .rba-card[data-pos="2"] { opacity: 0.5; }
    .rba-card[data-pos="1"] { opacity: 0.75; }
    .rba-card[data-pos="0"] { opacity: 1; }
    .rba-card[data-pos="-1"] { opacity: 0; }
  }

  /* ── Responsive ───────────────────────────────────── */
  @media (max-width: 1024px) {
    .rba { padding: 5rem 2rem 5rem; }
    .rba-play { grid-template-columns: 1fr; row-gap: 2.5rem; }
    .rba-deck-vis { height: 280px; }
  }
  @media (max-width: 640px) {
    .rba { padding: 4.5rem 1.25rem 4rem; }
    .rba-ph { flex-direction: column; align-items: flex-start; gap: 0.5rem; }
    .rba-ctas { flex-direction: column; align-items: flex-start; gap: 1rem; }
    .rba-row {
      grid-template-columns: 56px 1fr 80px;
      gap: 1rem;
    }
    .rba-row-hook { display: none; }
    .rba-row-arr  { display: none; }
    .rba-row-title { font-size: 1.2rem; }
    .rba-card { width: 240px; height: 160px; }
    .rba-card-term { font-size: 1.9rem; }
  }
`
