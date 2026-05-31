import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import About from '@/components/About'
import Career from '@/components/Career'
import Skills from '@/components/Skills'
import { caseStudies, alsoShipped, person } from '@/content/data'

export const metadata: Metadata = {
  title: 'CV — Martina Edwards',
  description: 'Manager, AI Acceleration. Ten years building enterprise systems across infrastructure, legal ops, automation, and cyber.',
}

type ShippedItem = typeof alsoShipped[number] & {
  links?: { label: string; href: string; external?: boolean }[]
}

export default function CvPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>

        {/* ── Page heading + download CTA ── */}
        <div
          style={{
            padding: '3rem 3rem 2.5rem',
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
            }}
          >
            CV.
          </h1>
        </div>

        {/* ── Section 1: Profile — reuse About component ── */}
        <div style={{ paddingTop: '2.5rem' }}>
          <About />
        </div>

        {/* ── Section 2: Career ── */}
        <div style={{ paddingTop: '2.5rem' }}>
          <Career />
        </div>

        {/* ── Section 3: Work delivered ── */}
        <section
          style={{
            padding: '2.5rem 3rem',
            maxWidth: '1500px',
            margin: '0 auto',
            width: '100%',
          }}
        >
          <div className="section-grid">
            <div className="section-label">
              <span className="font-mono-label" style={{ color: 'var(--warm)' }}>
                Work delivered
              </span>
            </div>

            <div className="section-content">
              {/* Metrics-led case studies */}
              <div
                className="cv-work-cases"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '1px',
                  background: 'var(--rule)',
                  border: '1px solid var(--rule)',
                  marginBottom: '3rem',
                }}
              >
                {caseStudies.map((cs, i) => (
                  <article
                    key={i}
                    style={{
                      background: 'var(--paper)',
                      padding: '2rem 1.75rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.9rem',
                      minHeight: '380px',
                    }}
                  >
                    {cs.image ? (
                      <img
                        src={cs.image}
                        alt={cs.artefact}
                        style={{ width: '100%', height: '64px', objectFit: 'contain', background: '#0c1014', display: 'block' }}
                      />
                    ) : (
                      <div
                        aria-label={`Placeholder for ${cs.artefact}`}
                        style={{
                          height: '64px',
                          border: '1px solid var(--rule)',
                          background:
                            'repeating-linear-gradient(135deg, var(--paper-2) 0 9px, rgba(28,32,36,0.04) 9px 10px)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: 'var(--font-dm-mono)',
                          fontSize: '0.55rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.14em',
                          color: 'var(--warm)',
                        }}
                      >
                        {cs.artefact}
                      </div>
                    )}

                    <div
                      style={{
                        fontFamily: 'var(--font-cormorant)',
                        fontWeight: 300,
                        fontSize: '3.4rem',
                        lineHeight: 1,
                        color: 'var(--accent)',
                        letterSpacing: '-0.02em',
                        marginTop: '0.2rem',
                      }}
                    >
                      {cs.metric}
                    </div>
                    <div className="font-mono-label" style={{ color: 'var(--warm)' }}>
                      {cs.from}
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-dm-sans)',
                        fontWeight: 500,
                        fontSize: '1.02rem',
                        lineHeight: 1.3,
                        color: 'var(--ink)',
                        marginTop: '0.2rem',
                      }}
                    >
                      {cs.title}
                    </h3>
                    <p style={{ fontSize: '0.86rem', color: 'var(--warm)', lineHeight: 1.55 }}>
                      {cs.summary}
                    </p>

                    <div
                      style={{
                        marginTop: 'auto',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.45rem',
                        paddingTop: '0.5rem',
                      }}
                    >
                      {cs.tags.map((t, j) => (
                        <span
                          key={j}
                          className="font-mono-label"
                          style={{
                            color: 'var(--accent)',
                            fontSize: '0.55rem',
                            border: '1px solid var(--rule)',
                            padding: '2px 6px',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>

              {/* Professional work cards */}
              <div
                className="cv-also-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '1px',
                  background: 'var(--rule)',
                  border: '1px solid var(--rule)',
                }}
              >
                  {alsoShipped.slice(3).map((a, i) => {
                    const item = a as ShippedItem
                    return (
                      <div
                        key={i}
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

        {/* ── Section: Builds ── */}
        <section
          style={{
            padding: '2.5rem 3rem',
            maxWidth: '1500px',
            margin: '0 auto',
            width: '100%',
          }}
        >
          <div className="section-grid">
            <div className="section-label">
              <span className="font-mono-label" style={{ color: 'var(--warm)' }}>
                Builds
              </span>
            </div>
            <div className="section-content">
              <div
                className="cv-also-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '1px',
                  background: 'var(--rule)',
                  border: '1px solid var(--rule)',
                }}
              >
                {alsoShipped.slice(0, 3).map((a, i) => {
                  const item = a as ShippedItem
                  return (
                    <div
                      key={i}
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

        {/* ── Section: Skills — reuse Skills component ── */}
        <div style={{ paddingTop: '2.5rem' }}>
          <Skills />
        </div>

        <footer
          style={{
            padding: '2rem 3rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: '1500px',
            margin: '2.5rem auto 0',
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
          .cv-work-cases { grid-template-columns: 1fr !important; }
          .cv-also-grid  { grid-template-columns: 1fr !important; }
          .cv-builds-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 901px) and (max-width: 1200px) {
          .cv-also-grid   { grid-template-columns: repeat(2, 1fr) !important; }
          .cv-builds-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </>
  )
}
