import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Built in Two Days — Martina Edwards',
  description: 'Started with a magic 8 ball. Ended up with a portfolio. No developer, no agency.',
}

export default function BuiltInTwoDays() {
  return (
    <main style={{
      background: 'var(--ink)',
      minHeight: '100vh',
      color: 'var(--cream)',
      padding: '0',
      overflowX: 'hidden',
    }}>

      {/* Nav back */}
      <div style={{ padding: '2rem 3rem', borderBottom: '1px solid rgba(239,240,242,0.08)' }}>
        <Link href="/" style={{
          fontFamily: 'var(--font-dm-mono)',
          fontSize: '0.65rem',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: 'rgba(239,240,242,0.4)',
          textDecoration: 'none',
        }}>
          {'<- Martina Edwards'}
        </Link>
      </div>

      {/* Hero block */}
      <div style={{
        padding: '8rem 3rem 6rem',
        maxWidth: '1400px',
        margin: '0 auto',
        borderBottom: '1px solid rgba(239,240,242,0.08)',
      }}>
        <span style={{
          fontFamily: 'var(--font-dm-mono)',
          fontSize: '0.65rem',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: 'var(--rust)',
          display: 'block',
          marginBottom: '2rem',
        }}>
          May 2026 · Personal project
        </span>

        <h1 style={{
          fontFamily: 'var(--font-cormorant)',
          fontWeight: 300,
          fontSize: 'clamp(3.5rem, 9vw, 8rem)',
          lineHeight: 0.92,
          letterSpacing: '-0.02em',
          color: 'var(--cream)',
          marginBottom: '3rem',
          maxWidth: '900px',
        }}>
          Stop thinking.<br />
          <em style={{ color: 'var(--rust)' }}>Start shipping.</em>
        </h1>

        <p style={{
          fontFamily: 'var(--font-cormorant)',
          fontWeight: 300,
          fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
          color: 'rgba(239,240,242,0.55)',
          lineHeight: 1.6,
          maxWidth: '560px',
          fontStyle: 'italic',
        }}>
          Two days. No developer. No agency. A live Next.js portfolio with a Claude-powered Oracle, rate limiting, GSAP animations, and Vercel deployment.
        </p>
      </div>

      {/* The honest account */}
      <div style={{
        padding: '6rem 3rem',
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '6rem',
        borderBottom: '1px solid rgba(239,240,242,0.08)',
      }}
        className="case-study-grid"
      >
        <div>
          <span style={{
            fontFamily: 'var(--font-dm-mono)',
            fontSize: '0.62rem',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'rgba(239,240,242,0.3)',
            display: 'block',
            marginBottom: '1.5rem',
          }}>
            The origin
          </span>
          <p style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 300,
            fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)',
            color: 'var(--cream)',
            lineHeight: 1.7,
          }}>
            The Oracle came first. A magic 8 ball that answers one question: should you hire Martina? The portfolio was built around it. Not the other way around.
          </p>
        </div>

        <div>
          <span style={{
            fontFamily: 'var(--font-dm-mono)',
            fontSize: '0.62rem',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'rgba(239,240,242,0.3)',
            display: 'block',
            marginBottom: '1.5rem',
          }}>
            The method
          </span>
          <p style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 300,
            fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)',
            color: 'var(--cream)',
            lineHeight: 1.7,
          }}>
            Claude for architecture decisions, copy, and debugging. VS Code and Claude Code for the build. GitHub for version control. Vercel for deployment. The PRD was not overhead — it was the build.
          </p>
        </div>
      </div>

      {/* Tool chain */}
      <div style={{
        padding: '6rem 3rem',
        maxWidth: '1400px',
        margin: '0 auto',
        borderBottom: '1px solid rgba(239,240,242,0.08)',
      }}>
        <span style={{
          fontFamily: 'var(--font-dm-mono)',
          fontSize: '0.62rem',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: 'rgba(239,240,242,0.3)',
          display: 'block',
          marginBottom: '3rem',
        }}>
          Tool chain
        </span>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0',
          flexWrap: 'wrap',
        }}
          className="tool-chain"
        >
          {[
            { tool: 'Claude', note: 'Architecture & copy' },
            { tool: 'VS Code', note: 'Build environment' },
            { tool: 'Claude Code', note: 'Code generation' },
            { tool: 'GitHub', note: 'Version control' },
            { tool: 'Vercel', note: 'Deployment' },
          ].map((item, i, arr) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                padding: '1.5rem 2rem',
                border: '1px solid rgba(239,240,242,0.12)',
                background: i === 0 ? 'rgba(48,134,149,0.12)' : 'transparent',
              }}>
                <div style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontWeight: 300,
                  fontSize: '1.3rem',
                  color: i === 0 ? 'var(--rust)' : 'var(--cream)',
                  marginBottom: '0.25rem',
                }}>
                  {item.tool}
                </div>
                <div style={{
                  fontFamily: 'var(--font-dm-mono)',
                  fontSize: '0.58rem',
                  color: 'rgba(239,240,242,0.35)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}>
                  {item.note}
                </div>
              </div>
              {i < arr.length - 1 && (
                <div style={{
                  padding: '0 1rem',
                  color: 'rgba(239,240,242,0.2)',
                  fontFamily: 'var(--font-dm-mono)',
                  fontSize: '0.8rem',
                }}>
                  -&gt;
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* What was built */}
      <div style={{
        padding: '6rem 3rem',
        maxWidth: '1400px',
        margin: '0 auto',
        borderBottom: '1px solid rgba(239,240,242,0.08)',
      }}>
        <span style={{
          fontFamily: 'var(--font-dm-mono)',
          fontSize: '0.62rem',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: 'rgba(239,240,242,0.3)',
          display: 'block',
          marginBottom: '3rem',
        }}>
          What shipped
        </span>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1px',
          background: 'rgba(239,240,242,0.06)',
        }}>
          {[
            { label: 'The Oracle', detail: "Claude API with custom system prompt, injection detection, rate limiting (5 attempts/IP), twisted magic 8 ball fallback, and a \"you're hired\" easter egg." },
            { label: 'Full portfolio', detail: 'Next.js (TypeScript), Tailwind, GSAP scroll animations, clip-path reveals, floating hero stats, and a ticker.' },
            { label: 'Anonymised work cards', detail: 'Eight project cards, all employer details removed. The work speaks for itself.' },
            { label: 'Live in production', detail: 'GitHub for version control, Vercel for deployment. Environment variables handling the API key. Auto-deploys on push to master.' },
          ].map((item, i) => (
            <div key={i} style={{
              background: 'var(--ink)',
              padding: '2.5rem',
            }}>
              <div style={{
                fontFamily: 'var(--font-cormorant)',
                fontWeight: 300,
                fontSize: '1.5rem',
                color: 'var(--cream)',
                marginBottom: '1rem',
              }}>
                {item.label}
              </div>
              <p style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '0.82rem',
                color: 'rgba(239,240,242,0.45)',
                lineHeight: 1.6,
              }}>
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{
        padding: '8rem 3rem',
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '2.5rem',
      }}>
        <p style={{
          fontFamily: 'var(--font-cormorant)',
          fontWeight: 300,
          fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
          fontStyle: 'italic',
          color: 'rgba(239,240,242,0.5)',
          maxWidth: '500px',
          lineHeight: 1.4,
        }}>
          The Oracle is still taking questions.
        </p>
        <Link href="/oracle" style={{
          fontFamily: 'var(--font-dm-mono)',
          fontSize: '0.68rem',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: 'var(--ink)',
          background: 'var(--rust)',
          padding: '0.9rem 2rem',
          textDecoration: 'none',
          display: 'inline-block',
        }}>
          Consult the Oracle -&gt;
        </Link>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .case-study-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .tool-chain {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </main>
  )
}
