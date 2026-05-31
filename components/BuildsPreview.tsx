import Link from 'next/link'
import { alsoShipped } from '@/content/data'

// The three build products: Flashcards & Quiz [0], The Oracle [1], News Agent [2]
const buildCards = [alsoShipped[0], alsoShipped[1], alsoShipped[2]]

type ShippedItem = typeof alsoShipped[number] & {
  links?: { label: string; href: string; external?: boolean }[]
}

export default function BuildsPreview() {
  return (
    <section
      id="builds"
      style={{ padding: '0 3rem', maxWidth: '1500px', margin: '0 auto', width: '100%' }}
    >
      <div className="section-grid">
        <div className="section-label gsap-section-label">
          <span
            className="font-mono-label"
            style={{ color: 'var(--warm)', fontFamily: 'var(--font-dm-mono)' }}
          >
            Builds
          </span>
        </div>

        <div className="section-content gsap-section-content">
          <div
            className="builds-preview-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1px',
              background: 'var(--rule)',
              border: '1px solid var(--rule)',
            }}
          >
            {buildCards.map((a, i) => {
              const item = a as ShippedItem
              const accent = a.title === 'The Oracle' ? 'var(--accent-rare)' : 'var(--accent)'
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
                      color: accent,
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
                            color: accent,
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

          <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
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
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .builds-preview-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
