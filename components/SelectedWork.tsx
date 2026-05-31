import Link from 'next/link'
import { caseStudies } from '@/content/data'

export default function SelectedWork() {
  return (
    <section
      id="work"
      style={{ padding: '0 3rem', maxWidth: '1500px', margin: '0 auto', width: '100%' }}
    >
      <div className="section-grid">
        <div className="section-label gsap-section-label">
          <span className="font-mono-label" style={{ color: 'var(--warm)' }}>
            Selected Work
          </span>
        </div>

        <div className="section-content gsap-section-content">
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

          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link
              href="/builds"
              style={{
                fontFamily: 'var(--font-dm-mono)',
                fontSize: '0.65rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--accent)',
                textDecoration: 'none',
              }}
            >
              See all builds →
            </Link>
            <Link
              href="/cv"
              style={{
                fontFamily: 'var(--font-dm-mono)',
                fontSize: '0.65rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--accent)',
                textDecoration: 'none',
              }}
            >
              View full CV →
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .work-cases { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
