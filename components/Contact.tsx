import { person } from '@/content/data'

/**
 * Contact — sharper close.
 *
 * Previously echoed the hero almost verbatim ("Building enterprise AI
 * that actually works"). Now the closing argument is more personal:
 * I'm useful when the room is split on what to automate.
 */
export default function Contact() {
  return (
    <section
      id="contact"
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
            Contact
          </span>
        </div>
        <div className="section-content gsap-section-content">
          <div style={{ maxWidth: '680px' }}>
            <p
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontWeight: 300,
                fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                lineHeight: 1.35,
                color: 'var(--ink)',
                marginBottom: '3rem',
                maxWidth: '28ch',
              }}
            >
              {person.contactCopy}{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>
                Let&apos;s talk.
              </em>
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1.5rem',
              }}
            >
              <a
                href={`mailto:${person.email}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem',
                  textDecoration: 'none',
                }}
              >
                <span className="font-mono-label" style={{ color: 'var(--warm)' }}>
                  Email
                </span>
                <span style={{ fontSize: '0.95rem', color: 'var(--accent)' }}>
                  {person.email}
                </span>
              </a>

              <a
                href={`tel:${person.phone.replace(/\s/g, '')}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem',
                  textDecoration: 'none',
                }}
              >
                <span className="font-mono-label" style={{ color: 'var(--warm)' }}>
                  Phone
                </span>
                <span style={{ fontSize: '0.95rem', color: 'var(--ink)' }}>
                  {person.phone}
                </span>
              </a>

              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem',
                  textDecoration: 'none',
                }}
              >
                <span className="font-mono-label" style={{ color: 'var(--warm)' }}>
                  LinkedIn
                </span>
                <span style={{ fontSize: '0.95rem', color: 'var(--ink)' }}>
                  /in/martina-edwards
                </span>
              </a>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem',
                }}
              >
                <span className="font-mono-label" style={{ color: 'var(--warm)' }}>
                  Location
                </span>
                <span style={{ fontSize: '0.95rem', color: 'var(--ink)' }}>
                  {person.location}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
