import Link from 'next/link'
import { caseStudies, alsoShipped } from '@/content/data'

/**
 * Work — two tiers.
 *
 * Tier 1 · caseStudies: three projects with real metrics.
 * Tier 2 · alsoShipped: compact cards with tags and links.
 */
export default function Work() {
  return (
    <section
      id="work"
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
            Selected Work
          </span>
        </div>

        <div className="section-content gsap-section-content">

          {/* ─── Tier 1 · caseStudies ─── */}
          <div
            className="work-cases"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1px',
              background: 'var(--rule)',
              border: '1px solid var(--rule)',
            }}
          >
            {caseStudies.map((cs, i) => (
              <article
                key={i}
                className="work-item gsap-stagger-child"
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
                <p
                  style={{
                    fontSize: '0.86rem',
                    color: 'var(--warm)',
                    lineHeight: 1.55,
                  }}
                >
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

          {/* ─── Tier 2 · alsoShipped ─── */}
          <div
            style={{
              marginTop: '3rem',
              display: 'grid',
              gridTemplateColumns: '200px 1fr',
              gap: '2rem',
              alignItems: 'baseline',
            }}
            className="work-also-wrap"
          >
            <span className="font-mono-label" style={{ color: 'var(--warm)' }}>
              Also shipped
            </span>
            <div
              className="work-also-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1px',
                background: 'var(--rule)',
                border: '1px solid var(--rule)',
              }}
            >
              {alsoShipped.map((a, i) => {
                const item = a as typeof a & {
                  links?: { label: string; href: string; external?: boolean }[]
                }
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
                  {/* dangerouslySetInnerHTML supports <em> italic in summary */}
                  <p
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--warm)',
                      lineHeight: 1.5,
                    }}
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
      </div>

      <style>{`
        @media (max-width: 900px) {
          .work-cases { grid-template-columns: 1fr !important; }
          .work-also-wrap { grid-template-columns: 1fr !important; }
          .work-also-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 901px) and (max-width: 1200px) {
          .work-also-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}
