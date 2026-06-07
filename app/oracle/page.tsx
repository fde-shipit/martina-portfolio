import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Ball from '@/components/Ball'
import { oraclePreview } from '@/content/data'

export const metadata: Metadata = {
  title: 'The Oracle — Martina Edwards',
  description:
    'A working AI artefact built in an afternoon. Ask questions about Martina\'s work, approach and availability. Bounded scope, explicit refusals, no hallucinated facts.',
}

/**
 * /oracle — project page for The Oracle.
 *
 * Structure mirrors /redefined-by-ai:
 *   Page eyebrow · Intro + CTAs · Ball (centred) ·
 *   Guardrails (refuses / answers) · Sample exchange · Provenance
 */
export default function OraclePage() {
  return (
    <>
      <Nav />
      <main>
        <section className="orc">
          <div className="orc-inner">

            {/* ── Page header eyebrow ── */}
            <div className="orc-ph">
              <span className="orc-mono">
                <span className="orc-rare">The Oracle</span>
                <span className="orc-soft"> &nbsp;·&nbsp; AI artefact · guardrailed</span>
              </span>
              <span className="orc-mono orc-tiny orc-right">
                Next.js · Claude API · Vercel
              </span>
            </div>

            {/* ── Intro ── */}
            <div className="orc-intro">
              <h1 className="orc-h1">
                This is going to be{' '}
                <em>fun.</em>
              </h1>
              <p className="orc-lede">
                Ask about the work. What was actually built, how it was scoped, where it
                ran into problems. Built the way I&apos;d build it for a client:{' '}
                bounded scope, explicit refusals, no hallucinated facts.{' '}
                <b>The same architecture I&apos;d ship for a regulated environment,
                pointed at one source of truth: the CV.</b>
              </p>
              <div className="orc-ctas">
                <a href="#oracle-ball" className="orc-cta">
                  Consult the Oracle <span className="orc-arr" aria-hidden="true">↓</span>
                </a>
                <Link href="/work/oracle-case-study" className="orc-cta">
                  Read the case study <span className="orc-arr" aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            {/* ── The Ball — centred ── */}
            <div id="oracle-ball" className="orc-ball-wrap">
              <Ball />
            </div>

            {/* ── Guardrails ── */}
            <div className="orc-mechanics">
              <div className="orc-mech-hdr">
                <h2 className="orc-h2">
                  Built like a small{' '}
                  <em>enterprise feature.</em>
                </h2>
                <p className="orc-mech-sub">
                  Visible because explainability is the whole point.
                </p>
              </div>

              <div className="orc-guard-grid">
                <div className="orc-guard-col">
                  <div className="orc-guard-label orc-guard-label--no">✕ Refuses</div>
                  <ul className="orc-guard-list">
                    <li>Claims about people other than Martina</li>
                    <li>Compensation, contract terms, anything negotiable</li>
                    <li>Predictions or opinions on third-party tools</li>
                    <li>Anything outside the source of truth (the CV)</li>
                  </ul>
                </div>
                <div className="orc-guard-col">
                  <div className="orc-guard-label orc-guard-label--yes">✓ Answers</div>
                  <ul className="orc-guard-list">
                    <li>What was built and what it actually did</li>
                    <li>How a problem was approached or scoped</li>
                    <li>Honest &ldquo;I don&apos;t know&rdquo; with a contact pointer when it&apos;s outside the source of truth</li>
                    <li>Availability and where she&apos;s based</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* ── Sample exchange ── */}
            <div className="orc-sample">
              <div className="orc-sh">
                <span className="orc-mono orc-soft">Sample exchange</span>
              </div>
              <div className="orc-exchanges">
                {oraclePreview.exchanges.map((ex, i) => (
                  <div key={i} className="orc-exchange">
                    <span className={`orc-who${ex.who === 'Oracle' ? ' orc-who--oracle' : ''}`}>
                      {ex.who}
                    </span>
                    <span className={`orc-what${ex.tone === 'answer' ? ' orc-what--answer' : ''}`}>
                      {ex.what}
                    </span>
                  </div>
                ))}
                {/* Refusal example */}
                <div className="orc-exchange">
                  <span className="orc-who">You</span>
                  <span className="orc-what">What&apos;s her current salary?</span>
                </div>
                <div className="orc-exchange">
                  <span className="orc-who orc-who--oracle">Oracle</span>
                  <div className="orc-refusal">
                    Out of scope. The Oracle answers questions about Martina&apos;s work,
                    approach, and availability. Compensation is between you and her.
                  </div>
                </div>
              </div>
            </div>

            {/* ── Provenance ── */}
            <div className="orc-prov">
              <div className="orc-prov-col">
                <div className="orc-prov-label">Built</div>
                <div className="orc-prov-val">~3 hours, end to end</div>
              </div>
              <div className="orc-prov-col">
                <div className="orc-prov-label">Stack</div>
                <div className="orc-prov-val">Next.js · Claude API · Vercel</div>
              </div>
              <div className="orc-prov-col">
                <div className="orc-prov-label">Guardrails</div>
                <div className="orc-prov-val">~60 lines · about 2x the prompt</div>
              </div>
              <div className="orc-prov-col">
                <div className="orc-prov-label">Why this exists</div>
                <Link href="/work/oracle-case-study" className="orc-prov-link">
                  Read the case study →
                </Link>
              </div>
            </div>

          </div>
        </section>

        <style>{styles}</style>
      </main>
    </>
  )
}

const styles = `
  /* ── shell ──────────────────────────────────────────────── */
  .orc {
    position: relative;
    padding: 6rem 3rem 6rem;
    max-width: 1500px;
    margin: 0 auto;
    color: var(--ink);
  }
  .orc-inner { max-width: 1180px; margin: 0 auto; }

  /* ── type helpers ─────────────────────────────────────── */
  .orc-mono {
    font-family: var(--font-dm-mono);
    font-size: 0.66rem;
    text-transform: uppercase;
    letter-spacing: 0.16em;
  }
  .orc-tiny   { font-size: 0.6rem; letter-spacing: 0.18em; }
  .orc-rare   { color: var(--accent-rare); }
  .orc-soft   { color: var(--warm); }
  .orc-right  { color: var(--warm); margin-left: auto; text-align: right; }

  /* ── page header ─────────────────────────────────────── */
  .orc-ph {
    padding: 0 0 2rem;
    display: flex; justify-content: space-between; align-items: baseline;
    gap: 1rem;
    border-bottom: 1px solid var(--rule);
  }

  /* ── intro ───────────────────────────────────────────── */
  .orc-intro {
    padding: 3rem 0 3rem;
    max-width: 880px;
    display: flex; flex-direction: column; gap: 1.2rem;
  }
  .orc-h1 {
    font-family: var(--font-cormorant);
    font-weight: 300;
    font-size: clamp(2.2rem, 4.4vw, 3.4rem);
    line-height: 1.05;
    letter-spacing: -0.02em;
    color: var(--ink);
    max-width: 22ch;
    text-wrap: balance;
  }
  .orc-h1 em { font-style: italic; font-weight: 400; color: var(--accent-rare); }
  .orc-lede {
    max-width: 58ch;
    font-family: var(--font-dm-sans);
    font-weight: 300;
    font-size: 1.02rem;
    line-height: 1.65;
    color: var(--warm);
  }
  .orc-lede b { color: var(--ink); font-weight: 400; }

  .orc-ctas {
    margin-top: 0.6rem;
    display: flex; gap: 2.2rem; align-items: center; flex-wrap: wrap;
  }
  .orc-cta {
    font-family: var(--font-dm-mono);
    font-size: 0.66rem;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    text-decoration: none;
    color: var(--accent-rare);
    display: inline-flex; align-items: center; gap: 0.6rem;
    padding-bottom: 0.35rem;
    border-bottom: 1px solid var(--accent-rare);
    transition: opacity 0.15s ease;
  }
  .orc-cta:hover { opacity: 0.7; }
  .orc-arr { display: inline-block; transition: transform 0.2s ease; }
  .orc-cta:hover .orc-arr { transform: translateX(3px); }

  /* ── ball — centred ──────────────────────────────────── */
  .orc-ball-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5rem 1rem 6rem;
    border-top: 1px solid var(--rule);
    border-bottom: 1px solid var(--rule);
    margin-bottom: 5rem;
  }

  /* ── section heading ─────────────────────────────────── */
  .orc-sh {
    padding-bottom: 1.5rem;
    margin-bottom: 0;
  }

  /* ── guardrails ──────────────────────────────────────── */
  .orc-mechanics {
    padding: 3rem 0 3.5rem;
    border-bottom: 1px solid var(--rule);
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }
  .orc-mech-hdr {
    display: flex; flex-direction: column; gap: 0.6rem;
  }
  .orc-h2 {
    font-family: var(--font-cormorant);
    font-weight: 300;
    font-size: clamp(1.7rem, 2.6vw, 2.2rem);
    line-height: 1.1;
    letter-spacing: -0.015em;
    color: var(--ink);
    max-width: 22ch;
  }
  .orc-h2 em { font-style: italic; }
  .orc-mech-sub {
    font-family: var(--font-dm-mono);
    font-size: 0.66rem;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    color: var(--warm);
  }

  .orc-guard-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    background: var(--rule);
    border: 1px solid var(--rule);
  }
  .orc-guard-col {
    background: var(--paper);
    padding: 1.75rem;
    display: flex; flex-direction: column; gap: 0.9rem;
  }
  .orc-guard-label {
    font-family: var(--font-dm-mono);
    font-size: 0.62rem;
    text-transform: uppercase;
    letter-spacing: 0.14em;
  }
  .orc-guard-label--no  { color: var(--accent-rare); }
  .orc-guard-label--yes { color: var(--accent); }
  .orc-guard-list {
    list-style: none;
    display: flex; flex-direction: column; gap: 0.6rem;
    font-family: var(--font-dm-sans);
    font-weight: 300;
    font-size: 0.88rem;
    color: var(--ink);
    line-height: 1.5;
  }

  /* ── sample exchange ─────────────────────────────────── */
  .orc-sample {
    padding: 3rem 0 3.5rem;
    border-bottom: 1px solid var(--rule);
  }
  .orc-exchanges {
    display: flex; flex-direction: column; gap: 1.25rem;
    max-width: 640px;
  }
  .orc-exchange {
    display: grid;
    grid-template-columns: 72px 1fr;
    gap: 0.75rem;
    align-items: start;
  }
  .orc-who {
    font-family: var(--font-dm-mono);
    font-size: 0.6rem;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    color: var(--ink);
    padding-top: 0.25rem;
  }
  .orc-who--oracle { color: var(--accent-rare); }
  .orc-what {
    font-family: var(--font-cormorant);
    font-weight: 300;
    font-size: 1.1rem;
    line-height: 1.45;
    color: var(--ink);
  }
  .orc-what--answer {
    font-style: italic;
    color: var(--ink-soft);
  }
  .orc-refusal {
    background: rgba(212,87,105,0.06);
    border-left: 2px solid var(--accent-rare);
    padding: 0.6rem 0.9rem;
    font-family: var(--font-dm-sans);
    font-weight: 300;
    font-size: 0.85rem;
    color: var(--ink-soft);
    line-height: 1.5;
  }

  /* ── provenance ──────────────────────────────────────── */
  .orc-prov {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    padding: 3rem 0 0;
  }
  .orc-prov-label {
    font-family: var(--font-dm-mono);
    font-size: 0.66rem;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    color: var(--warm);
    margin-bottom: 0.5rem;
  }
  .orc-prov-val {
    font-family: var(--font-dm-sans);
    font-weight: 300;
    font-size: 0.95rem;
    color: var(--ink);
  }
  .orc-prov-link {
    font-family: var(--font-dm-sans);
    font-weight: 300;
    font-size: 0.95rem;
    color: var(--accent-rare);
    text-decoration: none;
    border-bottom: 1px solid var(--accent-rare);
    transition: opacity 0.15s ease;
  }
  .orc-prov-link:hover { opacity: 0.7; }

  /* ── responsive ──────────────────────────────────────── */
  @media (max-width: 1024px) {
    .orc { padding: 5rem 2rem 5rem; }
    .orc-prov { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 768px) {
    .orc { padding: 4.5rem 1.25rem 4rem; }
    .orc-ph { flex-direction: column; align-items: flex-start; gap: 0.5rem; }
    .orc-ctas { flex-direction: column; align-items: flex-start; gap: 1rem; }
    .orc-guard-grid { grid-template-columns: 1fr; }
    .orc-prov { grid-template-columns: 1fr; }
    .orc-ball-wrap { padding: 3.5rem 0 4rem; }
  }
`
