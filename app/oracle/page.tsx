import type { Metadata } from 'next'
import Link from 'next/link'
import Ball from '@/components/Ball'
import { person } from '@/content/data'

export const metadata: Metadata = {
  title: 'The Oracle — Martina Edwards',
  description:
    'A working AI artefact, not a gimmick. Ask the Oracle questions about Martina\'s work, approach and availability. Bounded scope, explicit refusals, built in an afternoon.',
}

/**
 * /oracle — redesigned to frame what this thing actually IS.
 *
 *   - Two-column on desktop: framing copy + the Ball
 *   - Guardrails block below explains scope + refusals (mirrors the
 *     homepage preview, so the page makes sense as a direct landing)
 *   - Provenance footer: stack, build time, link to the case study
 *
 * The Ball component itself is unchanged structurally — just re-themed
 * to raspberry via the updated component.
 */
export default function OraclePage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        paddingTop: '120px',
        paddingBottom: '4rem',
        background: 'var(--paper)',
      }}
    >
      {/* ── Top crumb ── */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 3rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
        }}
      >
        <Link
          href="/"
          className="font-mono-label"
          style={{
            color: 'var(--warm)',
            textDecoration: 'none',
            fontSize: '0.62rem',
          }}
        >
          ← {person.name}
        </Link>
        <span
          className="font-mono-label"
          style={{ color: 'var(--accent-rare)', fontSize: '0.62rem' }}
        >
          § The Oracle
        </span>
      </div>

      {/* ── Hero row: framing copy + ball ── */}
      <section
        className="oracle-hero"
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 3rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center',
          borderTop: '1px solid var(--rule)',
          paddingTop: '4rem',
        }}
      >
        {/* Left: framing copy */}
        <div>
          <div
            className="font-mono-label"
            style={{
              color: 'var(--accent-rare)',
              marginBottom: '1.5rem',
            }}
          >
            Built in 3 hours · Claude · guardrailed
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
              fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              color: 'var(--ink)',
              marginBottom: '1.75rem',
            }}
          >
            Ask before you{' '}
            <em
              style={{
                fontStyle: 'italic',
                color: 'var(--accent-rare)',
              }}
            >
              hire her.
            </em>
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '1rem',
              color: 'var(--warm)',
              lineHeight: 1.65,
              maxWidth: '52ch',
              marginBottom: '1.5rem',
            }}
          >
            This is the Oracle. It answers questions about Martina&apos;s work,
            approach, and availability — and politely declines everything else.
            Bounded scope, explicit refusals, no hallucinated facts. The same
            architecture I&apos;d ship for a regulated client, scaled down to
            one source of truth: my CV.
          </p>

          <p
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '0.95rem',
              color: 'var(--ink-soft)',
              lineHeight: 1.6,
              maxWidth: '52ch',
              fontStyle: 'italic',
            }}
          >
            Tap a question below, or write your own. Five attempts per session.
          </p>
        </div>

        {/* Right: the ball + interaction */}
        <div
          style={{
            background: 'var(--paper-2)',
            border: '1px solid var(--rule)',
            padding: '3rem 2.5rem',
            position: 'relative',
          }}
        >
          <Ball />
        </div>
      </section>

      {/* ── Guardrails strip ── */}
      <section
        style={{
          maxWidth: '1400px',
          margin: '5rem auto 0',
          padding: '0 3rem',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '200px 1fr',
            gap: '2rem',
            alignItems: 'baseline',
            paddingTop: '3rem',
            borderTop: '1px solid var(--rule)',
          }}
          className="oracle-guard-wrap"
        >
          <div>
            <span
              className="font-mono-label"
              style={{ color: 'var(--accent-rare)' }}
            >
              Guardrails
            </span>
            <p
              style={{
                marginTop: '1rem',
                fontSize: '0.82rem',
                color: 'var(--warm)',
                lineHeight: 1.5,
                maxWidth: '24ch',
              }}
            >
              Visible because explainability is the whole point.
            </p>
          </div>

          <div
            className="oracle-guard-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1px',
              background: 'var(--rule)',
              border: '1px solid var(--rule)',
            }}
          >
            {/* What it refuses */}
            <div
              style={{
                background: 'var(--paper)',
                padding: '1.75rem',
              }}
            >
              <div
                className="font-mono-label"
                style={{ color: 'var(--accent-rare)', marginBottom: '1rem' }}
              >
                ✕ Refuses
              </div>
              <ul
                style={{
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
                  fontSize: '0.88rem',
                  color: 'var(--ink)',
                  lineHeight: 1.5,
                }}
              >
                <li>Claims about people other than Martina</li>
                <li>Compensation, contract terms, anything negotiable</li>
                <li>Predictions or opinions on third-party tools</li>
                <li>Anything outside the source-of-truth (the CV)</li>
              </ul>
            </div>

            {/* What it answers */}
            <div
              style={{
                background: 'var(--paper)',
                padding: '1.75rem',
              }}
            >
              <div
                className="font-mono-label"
                style={{ color: 'var(--accent)', marginBottom: '1rem' }}
              >
                ✓ Answers
              </div>
              <ul
                style={{
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
                  fontSize: '0.88rem',
                  color: 'var(--ink)',
                  lineHeight: 1.5,
                }}
              >
                <li>Scope, methodology, and what she actually shipped</li>
                <li>Why she&apos;d approach a problem a particular way</li>
                <li>Honest &ldquo;I don&apos;t know&rdquo; with a contact pointer</li>
                <li>Availability and where she&apos;s based</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Provenance footer ── */}
      <section
        style={{
          maxWidth: '1400px',
          margin: '5rem auto 0',
          padding: '3rem 3rem 0',
          borderTop: '1px solid var(--rule)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2rem',
            alignItems: 'start',
          }}
          className="oracle-prov-grid"
        >
          <div>
            <div
              className="font-mono-label"
              style={{ color: 'var(--warm)', marginBottom: '0.5rem' }}
            >
              Built
            </div>
            <div style={{ fontSize: '0.95rem', color: 'var(--ink)' }}>
              ~3 hours, end to end
            </div>
          </div>
          <div>
            <div
              className="font-mono-label"
              style={{ color: 'var(--warm)', marginBottom: '0.5rem' }}
            >
              Stack
            </div>
            <div style={{ fontSize: '0.95rem', color: 'var(--ink)' }}>
              Next.js · Claude API · Vercel
            </div>
          </div>
          <div>
            <div
              className="font-mono-label"
              style={{ color: 'var(--warm)', marginBottom: '0.5rem' }}
            >
              Guardrails
            </div>
            <div style={{ fontSize: '0.95rem', color: 'var(--ink)' }}>
              ≈ 60 lines · about 2× the prompt
            </div>
          </div>
          <div>
            <div
              className="font-mono-label"
              style={{ color: 'var(--warm)', marginBottom: '0.5rem' }}
            >
              Why this exists
            </div>
            <Link
              href="/work/after-hours"
              style={{
                fontSize: '0.95rem',
                color: 'var(--accent-rare)',
                textDecoration: 'none',
                borderBottom: '1px solid var(--accent-rare)',
              }}
            >
              Read the case study →
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 1024px) {
          .oracle-hero { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .oracle-prov-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .oracle-guard-wrap { grid-template-columns: 1fr !important; }
          .oracle-guard-grid { grid-template-columns: 1fr !important; }
          .oracle-prov-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
