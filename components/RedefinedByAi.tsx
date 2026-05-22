'use client'

import Link from 'next/link'
import { redefinedByAi } from '@/content/data'

/**
 * Redefined by AI — section page.
 *
 *   /redefined-by-ai
 *
 * One destination. Reads the posts. Studies the deck.
 *
 * The entries list is generated off content/data.ts. Drafts are
 * excluded by design — they show up here only when their status
 * flips to "written" (i.e. ready to read in the deck) or "posted"
 * (i.e. there's a real post page to link to).
 *
 * Numbering is positional: № NN is computed from array index, so
 * the entire sequence reflows when an entry is added/promoted.
 *
 * Visual:
 *   - Section eyebrow with current "Latest" auto-derived
 *   - Editorial intro (Cormorant 300, italic emphasis)
 *   - Index table — posted (teal, →) vs written (warm, ·)
 *   - "As a deck" play module — three rotated cards with a
 *     subtle ambient sway + hover fan; respects reduced-motion
 */

const STATUS_LABEL: Record<'posted' | 'written', string> = {
  posted:  'Posted',
  written: 'Written · soon',
}

const pad = (n: number) => String(n).padStart(2, '0')

export default function RedefinedByAi() {
  const { entries, deckHref, totalCards } = redefinedByAi

  const postedCount  = entries.filter(e => e.status === 'posted').length
  const writtenCount = entries.filter(e => e.status === 'written').length
  const lastPosted   = [...entries].reverse().find(e => e.status === 'posted')
  const lastIdx      = lastPosted ? entries.indexOf(lastPosted) + 1 : 0

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
            <Link className="rba-cta rba-cta-accent" href={deckHref}>
              Open the deck <span className="rba-arr" aria-hidden>→</span>
            </Link>
          </div>
        </div>

        {/* Section heading */}
        <div className="rba-sh">
          <span className="rba-mono">The Series</span>
          <span className="rba-mono rba-tiny rba-right">
            {postedCount} posted &nbsp;·&nbsp; {writtenCount} written &nbsp;·&nbsp; ongoing
          </span>
        </div>

        {/* Index */}
        <div className="rba-index" role="list">
          {entries.map((e, i) => (
            <Row
              key={i}
              num={pad(i + 1)}
              title={e.title}
              hook={e.hook}
              status={e.status}
              href={e.href}
            />
          ))}
        </div>

        {/* Deck play module */}
        <div className="rba-play">
          <div className="rba-copy">
            <h2 className="rba-h2">
              The same vocabulary, <em>as a deck.</em>
            </h2>
            <p className="rba-p">
              Every term in the series, as a flashcard.{' '}
              <b>Learn mode</b> walks you through.{' '}
              <b>Quiz mode</b> tests your recall. The deck grows with the writing.
            </p>
            <div className="rba-meta">
              <span><b>{totalCards}</b> terms</span>
              <span><b>{postedCount + writtenCount}</b> entries</span>
              <span>grows with the series</span>
            </div>
            <Link className="rba-cta-deck" href={deckHref}>
              Open the deck <span className="rba-arr" aria-hidden>→</span>
            </Link>
          </div>

          <DeckVis entries={entries} />
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
  status: 'posted' | 'written'
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

/* ── Deck visual ───────────────────────────────────────── */
function DeckVis({ entries }: { entries: { title: string; status: 'posted' | 'written' }[] }) {
  // Pick three posted entries to surface on the cards: latest, mid, early.
  const posted = entries.map((e, i) => ({ ...e, idx: i + 1 })).filter(e => e.status === 'posted')
  const top    = posted[posted.length - 1] ?? { title: '—', idx: 0 }
  const mid    = posted[Math.floor(posted.length / 2)] ?? top
  const front  = posted[1] ?? posted[0] ?? top

  return (
    <div className="rba-deck-vis" aria-hidden="true">
      <div className="rba-card rba-card-3">
        <div className="rba-card-top">
          <span><b>Redefined by AI</b></span>
          <span className="rba-card-n">No. {String(top.idx).padStart(2, '0')}</span>
        </div>
        <div className="rba-card-term">{top.title}</div>
      </div>
      <div className="rba-card rba-card-2">
        <div className="rba-card-top">
          <span><b>Redefined by AI</b></span>
          <span className="rba-card-n">No. {String(mid.idx).padStart(2, '0')}</span>
        </div>
        <div className="rba-card-term">{mid.title}</div>
      </div>
      <div className="rba-card rba-card-1">
        <div className="rba-card-top">
          <span><b>Redefined by AI</b> · Card {String(front.idx).padStart(2, '0')}</span>
          <span className="rba-card-n">№ {String(front.idx).padStart(2, '0')}</span>
        </div>
        <div className="rba-card-term">{front.title}</div>
        <div className="rba-card-def">
          Three things make AI <em>feel</em> like it remembers. None of them are memory.
        </div>
      </div>
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
  .rba-tiny { font-size: 0.6rem; letter-spacing: 0.18em; }
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
  .rba-lede-tight { max-width: 52ch; }

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
  .rba-status-written { color: var(--warm); }
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
    margin-top: 3.5rem;
    padding: 3rem 0 1rem;
    border-top: 1px solid var(--rule-strong);
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
  .rba-cta-deck {
    margin-top: 1.6rem;
    display: inline-flex; align-items: center; gap: 0.55rem;
    font-family: var(--font-dm-mono);
    font-size: 0.66rem;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    color: var(--accent);
    text-decoration: none;
    padding-bottom: 0.35rem;
    border-bottom: 1px solid var(--accent);
    width: fit-content;
  }
  .rba-cta-deck:hover .rba-arr { transform: translateX(3px); }

  /* ── Card deck visual ──────────────────────────────── */
  .rba-deck-vis { position: relative; height: 360px; }
  .rba-card {
    position: absolute;
    background: var(--paper-2);
    border: 1px solid var(--rule);
    padding: 1.4rem 1.6rem;
    display: flex; flex-direction: column;
    gap: 0.8rem;
    width: 320px;
    height: 200px;
    transform-origin: 60% 90%;
    transition:
      transform 0.7s cubic-bezier(.22,.61,.36,1),
      opacity 0.7s ease,
      box-shadow 0.7s ease;
    will-change: transform;
  }
  .rba-card-3 {
    top: 0; right: 100px;
    opacity: 0;
    transform: rotate(-4deg) translateY(8px);
    animation: rba-in-3 0.9s 0.05s cubic-bezier(.22,.61,.36,1) forwards,
               rba-sway-3 11s 1.2s ease-in-out infinite;
  }
  .rba-card-2 {
    top: 30px; right: 60px;
    opacity: 0;
    transform: rotate(2deg) translateY(8px);
    animation: rba-in-2 0.9s 0.18s cubic-bezier(.22,.61,.36,1) forwards,
               rba-sway-2 9s 1.4s ease-in-out infinite;
  }
  .rba-card-1 {
    top: 70px; right: 20px;
    opacity: 0;
    transform: rotate(-1deg) translateY(10px);
    border-color: var(--rule-strong);
    box-shadow: 0 18px 36px -22px rgba(0,0,0,0.18);
    animation: rba-in-1 0.9s 0.32s cubic-bezier(.22,.61,.36,1) forwards,
               rba-sway-1 7.5s 1.6s ease-in-out infinite;
  }

  @keyframes rba-in-3 { to { opacity: 0.5;  transform: rotate(-4deg) translateY(0); } }
  @keyframes rba-in-2 { to { opacity: 0.75; transform: rotate(2deg)  translateY(0); } }
  @keyframes rba-in-1 { to { opacity: 1;    transform: rotate(-1deg) translateY(0); } }

  @keyframes rba-sway-3 {
    0%, 100% { transform: rotate(-4deg)   translate(0, 0); }
    50%      { transform: rotate(-5.2deg) translate(-2px, -3px); }
  }
  @keyframes rba-sway-2 {
    0%, 100% { transform: rotate(2deg)    translate(0, 0); }
    50%      { transform: rotate(2.9deg)  translate(2px, -2px); }
  }
  @keyframes rba-sway-1 {
    0%, 100% { transform: rotate(-1deg)   translate(0, 0); }
    50%      { transform: rotate(-1.6deg) translate(1px, -2px); }
  }

  /* Hover fan */
  .rba-deck-vis:hover .rba-card { animation-play-state: paused; }
  .rba-deck-vis:hover .rba-card-3 { transform: rotate(-9deg) translate(-14px, -6px); opacity: 0.65; }
  .rba-deck-vis:hover .rba-card-2 { transform: rotate(5deg)  translate(8px, -4px);   opacity: 0.9; }
  .rba-deck-vis:hover .rba-card-1 { transform: rotate(-2deg) translate(0, -8px); box-shadow: 0 26px 48px -22px rgba(0,0,0,0.24); }

  @media (prefers-reduced-motion: reduce) {
    .rba-card, .rba-deck-vis:hover .rba-card { animation: none; transition: none; }
    .rba-card-3 { opacity: 0.5;  transform: rotate(-4deg); }
    .rba-card-2 { opacity: 0.75; transform: rotate(2deg); }
    .rba-card-1 { opacity: 1;    transform: rotate(-1deg); }
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
  }
  .rba-card-def em { color: var(--accent); font-style: italic; }

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
    .rba-card-term { font-size: 1.7rem; }
  }
`
