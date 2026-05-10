import { person } from '@/content/data'

export default function Contact() {
  return (
    <section id="contact" style={{ padding: '0 3rem', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
      <div className="section-grid">
        <div className="section-label gsap-section-label">
          <span className="font-mono-label" style={{ color: 'var(--warm)' }}>Contact</span>
        </div>
        <div className="section-content gsap-section-content">
          <div style={{ maxWidth: '560px' }}>
            <p
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontWeight: 300,
                fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
                lineHeight: 1.4,
                color: 'var(--ink)',
                marginBottom: '3rem',
              }}
            >
              Building enterprise AI that actually works in production.{' '}
              <em style={{ color: 'var(--rust)' }}>Let&apos;s talk.</em>
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <a
                href={`mailto:${person.email}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                  textDecoration: 'none',
                }}
              >
                <span className="font-mono-label" style={{ color: 'var(--warm)' }}>Email</span>
                <span style={{ fontSize: '1rem', color: 'var(--rust)' }}>{person.email}</span>
              </a>

              <a
                href={`tel:${person.phone.replace(/\s/g, '')}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                  textDecoration: 'none',
                }}
              >
                <span className="font-mono-label" style={{ color: 'var(--warm)' }}>Phone</span>
                <span style={{ fontSize: '1rem', color: 'var(--ink)' }}>{person.phone}</span>
              </a>

              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                  textDecoration: 'none',
                }}
              >
                <span className="font-mono-label" style={{ color: 'var(--warm)' }}>LinkedIn</span>
                <span style={{ fontSize: '1rem', color: 'var(--ink)' }}>linkedin.com/in/martina-edwards</span>
              </a>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span className="font-mono-label" style={{ color: 'var(--warm)' }}>Location</span>
                <span style={{ fontSize: '1rem', color: 'var(--ink)' }}>{person.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
