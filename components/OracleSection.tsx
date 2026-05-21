import Link from 'next/link'
import { oraclePreview } from '@/content/data'

/**
 * OracleSection — homepage preview of /oracle.
 *
 * The Oracle was previously a small floating link inside the hero. It's
 * the most distinctive thing on the site, so it gets its own section
 * here — sandwiched between Hero and Work.
 *
 * Composition:
 *   - left rail: the magic 8 ball (static decorative version, the real
 *     one lives on /oracle so this stays light)
 *   - middle: sample exchange (you ask, oracle answers)
 *   - right: "what it refuses" guardrails block + CTA into /oracle
 *
 * Reserves --accent-rare exclusively for this section. It becomes the
 * Oracle's signature color across the site.
 */
export default function OracleSection() {
  return (
    <section
      id="oracle-preview"
      style={{
        padding: '6rem 3rem 5rem',
        maxWidth: '1500px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      {/* Header — matches the section-grid pattern of other sections,
          but stretches into a two-column hero. */}
      <div
        className="oracle-hdr"
        style={{
          display: 'grid',
          gridTemplateColumns: '200px 1fr',
          gap: '2rem',
          alignItems: 'baseline',
          marginBottom: '3rem',
          paddingBottom: '2rem',
          borderBottom: '1px solid var(--rule)',
        }}
      >
        <span
          className="font-mono-label"
          style={{ color: 'var(--accent-rare)' }}
        >
          The Oracle
        </span>
        <div>
          <h2
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
              fontSize: 'clamp(1.8rem, 4.2vw, 3.4rem)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              color: 'var(--ink)',
              maxWidth: '20ch',
            }}
          >
            A working artefact,&nbsp;
            <em style={{ fontStyle: 'italic', color: 'var(--accent-rare)' }}>
              not a gimmick.
            </em>
          </h2>
          <p
            style={{
              marginTop: '1.5rem',
              maxWidth: '54ch',
              fontSize: '1rem',
              color: 'var(--warm)',
              lineHeight: 1.6,
            }}
          >
            Most portfolio sites tell you they understand AI. This one lets you
            interrogate it. Built in an afternoon. Claude under the hood.
            Guardrails built the way I'd build them for a client — bounded scope,
            explicit refusals, no hallucinated facts about me.
          </p>
        </div>
      </div>

      {/* Body — three columns: ball, demo, mechanics */}
      <div
        className="oracle-body"
        style={{
          display: 'grid',
          gridTemplateColumns: '200px 1fr 1fr',
          gap: '2rem',
          alignItems: 'stretch',
        }}
      >
        {/* Decorative 8-ball */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '1.25rem',
          }}
        >
          <div
            className="ball-float"
            aria-hidden
            style={{
              width: '160px',
              height: '160px',
              borderRadius: '50%',
              background:
                'radial-gradient(ellipse at 35% 35%, #1a3a4a 0%, #0d2030 55%, #061420 100%)',
              boxShadow:
                '0 18px 40px rgba(0,0,0,0.28), 0 0 28px rgba(212,87,105,0.10), inset 0 -14px 28px rgba(0,0,0,0.22)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: '78px',
                height: '78px',
                borderRadius: '50%',
                background:
                  'radial-gradient(ellipse at 40% 40%, #1a1a2e 0%, #0a0a1a 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontWeight: 300,
                  fontSize: '2rem',
                  color: 'rgba(212,87,105,0.85)',
                  lineHeight: 1,
                }}
              >
                8
              </span>
            </div>
            <span
              aria-hidden
              style={{
                position: 'absolute',
                top: '15%',
                left: '20%',
                width: '30%',
                height: '20%',
                borderRadius: '50%',
                background:
                  'radial-gradient(ellipse, rgba(255,255,255,0.15) 0%, transparent 100%)',
                pointerEvents: 'none',
              }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem',
            }}
          >
            <span className="font-mono-label" style={{ color: 'var(--warm)' }}>
              Stack
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--ink)' }}>
              Next.js · Claude API · Vercel
            </span>
            <span
              className="font-mono-label"
              style={{ color: 'var(--warm)', marginTop: '0.6rem' }}
            >
              Built
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--ink)' }}>
              ~3 hours, end to end
            </span>
          </div>
        </div>

        {/* Sample exchange */}
        <div
          style={{
            background: 'var(--paper-2)',
            border: '1px solid var(--rule)',
            padding: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.2rem',
            position: 'relative',
            minHeight: '320px',
          }}
        >
          <span
            className="font-mono-label"
            style={{
              position: 'absolute',
              top: '0.8rem',
              right: '1rem',
              color: 'var(--warm)',
              fontSize: '0.55rem',
            }}
          >
            live · sample exchange
          </span>

          {oraclePreview.exchanges.map((ex, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '60px 1fr',
                gap: '0.75rem',
                alignItems: 'start',
              }}
            >
              <span
                className="font-mono-label"
                style={{
                  color:
                    ex.who === 'Oracle'
                      ? 'var(--accent-rare)'
                      : 'var(--ink)',
                  marginTop: '0.25rem',
                  fontSize: '0.58rem',
                }}
              >
                {ex.who}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontWeight: 300,
                  fontStyle: ex.tone === 'answer' ? 'italic' : 'normal',
                  fontSize: '1.1rem',
                  lineHeight: 1.45,
                  color:
                    ex.tone === 'answer'
                      ? 'var(--ink-soft)'
                      : 'var(--ink)',
                }}
              >
                {ex.what}
              </span>
            </div>
          ))}

          {/* Refusal example */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '60px 1fr',
              gap: '0.75rem',
              alignItems: 'start',
            }}
          >
            <span
              className="font-mono-label"
              style={{
                color: 'var(--ink)',
                marginTop: '0.25rem',
                fontSize: '0.58rem',
              }}
            >
              You
            </span>
            <span
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontWeight: 300,
                fontSize: '1.1rem',
                lineHeight: 1.45,
                color: 'var(--ink)',
              }}
            >
              What's her current salary?
            </span>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '60px 1fr',
              gap: '0.75rem',
              alignItems: 'start',
            }}
          >
            <span
              className="font-mono-label"
              style={{
                color: 'var(--accent-rare)',
                marginTop: '0.25rem',
                fontSize: '0.58rem',
              }}
            >
              Oracle
            </span>
            <div
              style={{
                background: 'rgba(212,87,105,0.06)',
                borderLeft: '2px solid var(--accent-rare)',
                padding: '0.6rem 0.9rem',
                fontSize: '0.85rem',
                color: 'var(--ink-soft)',
                lineHeight: 1.5,
              }}
            >
              Out of scope. The Oracle answers questions about Martina's work,
              approach, and availability. Compensation is between you and her.
            </div>
          </div>

          {/* Faux input footer — links to real /oracle */}
          <Link
            href="/oracle"
            style={{
              marginTop: 'auto',
              borderTop: '1px solid var(--rule)',
              paddingTop: '0.9rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              textDecoration: 'none',
            }}
          >
            <span
              className="font-mono-label"
              style={{ color: 'var(--warm)' }}
            >
              Ask the Oracle a question…
            </span>
            <span
              className="font-mono-label"
              style={{ color: 'var(--accent-rare)' }}
            >
              Send ↵
            </span>
          </Link>
        </div>

        {/* Mechanics — what it refuses + CTA */}
        <div
          style={{
            borderLeft: '1px solid var(--rule)',
            paddingLeft: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
          className="oracle-mech"
        >
          <h3
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
              fontSize: '1.6rem',
              lineHeight: 1.2,
              color: 'var(--ink)',
              maxWidth: '22ch',
            }}
          >
            Built like a small enterprise feature.
          </h3>

          <div>
            <span
              className="font-mono-label"
              style={{ color: 'var(--warm)', display: 'block', marginBottom: '0.6rem' }}
            >
              What it refuses
            </span>
            <div
              style={{
                background: 'var(--paper-2)',
                border: '1px solid var(--rule)',
                padding: '0.9rem 1.1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              {oraclePreview.refuses.map((r, i) => (
                <div
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '14px 1fr',
                    gap: '0.7rem',
                    alignItems: 'start',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-dm-mono)',
                      fontSize: '0.7rem',
                      color: 'var(--accent-rare)',
                      lineHeight: 1,
                      paddingTop: '0.2rem',
                    }}
                  >
                    ✕
                  </span>
                  <span
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--ink)',
                      lineHeight: 1.45,
                    }}
                  >
                    {r}
                  </span>
                </div>
              ))}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '14px 1fr',
                  gap: '0.7rem',
                  alignItems: 'start',
                  paddingTop: '0.3rem',
                  marginTop: '0.3rem',
                  borderTop: '1px solid var(--rule)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-dm-mono)',
                    fontSize: '0.7rem',
                    color: 'var(--accent)',
                    lineHeight: 1,
                    paddingTop: '0.2rem',
                  }}
                >
                  ✓
                </span>
                <span
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--ink)',
                    lineHeight: 1.45,
                  }}
                >
                  Scope, methodology, what she actually shipped
                </span>
              </div>
            </div>
          </div>

          <Link
            href="/oracle"
            style={{
              marginTop: 'auto',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              border: '1px solid var(--accent-rare)',
              color: 'var(--accent-rare)',
              padding: '0.95rem 1.25rem',
              textDecoration: 'none',
              fontFamily: 'var(--font-dm-mono)',
              fontSize: '0.65rem',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
            }}
          >
            <span>Try the Oracle →</span>
            <span style={{ color: 'var(--warm)' }}>/oracle</span>
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .oracle-body { grid-template-columns: 1fr 1fr !important; }
          .oracle-body > *:first-child {
            grid-column: 1 / -1;
            flex-direction: row !important;
            align-items: center !important;
            gap: 2rem !important;
          }
          .oracle-mech { border-left: none !important; padding-left: 0 !important; border-top: 1px solid var(--rule); padding-top: 2rem !important; grid-column: 1 / -1; }
        }
        @media (max-width: 720px) {
          .oracle-hdr { grid-template-columns: 1fr !important; }
          .oracle-body { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
