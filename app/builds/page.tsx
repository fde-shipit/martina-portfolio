import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Writing from '@/components/Writing'
import GsapScrollAnimations from '@/components/gsap/ScrollAnimations'
import ScrollAnimations from '@/components/ScrollAnimations'
import { alsoShipped, person } from '@/content/data'

export const metadata: Metadata = {
  title: 'Builds — Martina Edwards',
  description: 'AI tools, open source agents, and a vocabulary for what\'s actually happening inside the models.',
}

// The Oracle [1], News Agent [2], Flashcards & Quiz [0]
const builtWithAi = [alsoShipped[1], alsoShipped[2], alsoShipped[0]]

type ShippedItem = typeof alsoShipped[number] & {
  links?: { label: string; href: string; external?: boolean }[]
}

export default function BuildsPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
        <GsapScrollAnimations />
        <ScrollAnimations />

        {/* ── Page heading ── */}
        <div
          style={{
            padding: '3rem 3rem 4rem',
            maxWidth: '1500px',
            margin: '0 auto',
            borderBottom: '1px solid var(--rule)',
          }}
        >
          <h1
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
              fontSize: 'clamp(2.6rem, 5vw, 4rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: 'var(--ink)',
              marginBottom: '1rem',
            }}
          >
            Things I build.
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontWeight: 300,
              fontSize: '1rem',
              lineHeight: 1.6,
              color: 'var(--warm)',
              maxWidth: '58ch',
            }}
          >
            AI tools, open source agents, and a vocabulary for what&apos;s actually happening inside the models.
          </p>
        </div>

        {/* ── Section 1: Built with AI ── */}
        <section
          style={{
            padding: '4rem 3rem',
            maxWidth: '1500px',
            margin: '0 auto',
            width: '100%',
          }}
        >
          <div className="section-grid">
            <div className="section-label gsap-section-label">
              <span
                className="font-mono-label"
                style={{ color: 'var(--warm)' }}
              >
                Built with AI
              </span>
            </div>
            <div className="section-content gsap-section-content">
              <div
                className="builds-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '1px',
                  background: 'var(--rule)',
                  border: '1px solid var(--rule)',
                }}
              >
                {builtWithAi.map((a, i) => {
                  const item = a as ShippedItem
                  return (
                    <div
                      key={i}
                      className="gsap-stagger-child"
                      style={{
                        background: 'var(--paper)',
                        padding: '1.25rem 1.3rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.4rem',
                      }}
                    >
                      <div
                        style={{
                          fontFamily: 'var(--font-dm-sans)',
                          fontWeight: 500,
                          fontSize: '0.95rem',
                          color: 'var(--ink)',
                          lineHeight: 1.3,
                        }}
                      >
                        {a.title}
                      </div>
                      <p
                        style={{ fontSize: '0.8rem', color: 'var(--warm)', lineHeight: 1.5 }}
                        dangerouslySetInnerHTML={{ __html: a.summary }}
                      />
                      <div
                        style={{
                          marginTop: '0.4rem',
                          fontFamily: 'var(--font-dm-mono)',
                          fontSize: '0.55rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.14em',
                          color: 'var(--accent)',
                        }}
                      >
                        {a.tags.join(' · ')}
                      </div>
                      {item.links && item.links.length > 0 && (
                        <div
                          style={{
                            display: 'flex',
                            gap: '1.25rem',
                            flexWrap: 'wrap',
                            marginTop: '0.5rem',
                            paddingTop: '0.6rem',
                            borderTop: '1px solid var(--rule)',
                          }}
                        >
                          {item.links.map((l, k) => (
                            <a
                              key={k}
                              href={l.href}
                              {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                              style={{
                                fontFamily: 'var(--font-dm-mono)',
                                fontSize: '0.58rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.14em',
                                color: 'var(--accent)',
                                textDecoration: 'none',
                              }}
                            >
                              {l.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 2: #RedefinedByAI — reuse Writing component ── */}
        <section
          style={{
            borderTop: '1px solid var(--rule)',
            paddingTop: '4rem',
          }}
        >
          <div
            style={{
              padding: '0 3rem',
              maxWidth: '1500px',
              margin: '0 auto',
              width: '100%',
            }}
          >
            <div className="section-grid">
              <div className="section-label gsap-section-label">
                <span className="font-mono-label" style={{ color: 'var(--warm)' }}>
                  #RedefinedByAI
                </span>
              </div>
              <div className="section-content gsap-section-content">
                {/* Writing is rendered below — section label is above */}
              </div>
            </div>
          </div>
          <Writing />
        </section>

        {/* ── Section 3: This website ── */}
        <section
          style={{
            borderTop: '1px solid var(--rule)',
            padding: '4rem 3rem',
            maxWidth: '1500px',
            margin: '0 auto',
            width: '100%',
          }}
        >
          <div className="section-grid">
            <div className="section-label gsap-section-label">
              <span className="font-mono-label" style={{ color: 'var(--warm)' }}>
                This website
              </span>
            </div>
            <div className="section-content gsap-section-content">
              <div
                className="gsap-stagger-child"
                style={{
                  border: '1px solid var(--rule)',
                  background: 'var(--paper)',
                  padding: '2rem',
                  maxWidth: '560px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    color: 'var(--ink)',
                    marginBottom: '0.75rem',
                  }}
                >
                  After hours · this website
                </div>
                <p
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--warm)',
                    lineHeight: 1.55,
                    marginBottom: '1rem',
                  }}
                >
                  Started with a magic 8 ball. Ended up with a portfolio. Eight nights, two hours each. Solo. The chat was the build.
                </p>
                <div
                  style={{
                    fontFamily: 'var(--font-dm-mono)',
                    fontSize: '0.55rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                    color: 'var(--accent)',
                    marginBottom: '1rem',
                  }}
                >
                  Next.js · Claude API · TypeScript · Vercel
                </div>
                <div
                  style={{
                    paddingTop: '0.75rem',
                    borderTop: '1px solid var(--rule)',
                  }}
                >
                  <a
                    href="/work/after-hours"
                    style={{
                      fontFamily: 'var(--font-dm-mono)',
                      fontSize: '0.58rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.14em',
                      color: 'var(--accent)',
                      textDecoration: 'none',
                    }}
                  >
                    Read the case study →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer
          style={{
            borderTop: '1px solid var(--rule)',
            padding: '2rem 3rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: '1500px',
            margin: '4rem auto 0',
          }}
        >
          <span className="font-mono-label" style={{ color: 'var(--warm)', fontSize: '0.62rem' }}>
            {person.name} © {new Date().getFullYear()}
          </span>
          <span className="font-mono-label" style={{ color: 'var(--warm)', fontSize: '0.62rem' }}>
            {person.hashtag}
          </span>
        </footer>
      </main>

      <style>{`
        @media (max-width: 900px) {
          .builds-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
