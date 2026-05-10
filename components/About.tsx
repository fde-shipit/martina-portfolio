import { person, details } from '@/content/data'

export default function About() {
  return (
    <section id="about" style={{ padding: '0 3rem', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
      <div className="section-grid">
        <div className="section-label gsap-section-label">
          <span className="font-mono-label" style={{ color: 'var(--warm)' }}>Profile</span>
        </div>
        <div className="section-content gsap-section-content">
          <p
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
              fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
              lineHeight: 1.55,
              color: 'var(--ink)',
              marginBottom: '3rem',
              maxWidth: '720px',
            }}
          >
            {person.profile}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1px',
              background: 'var(--rule)',
            }}
          >
            {details.map((d, i) => (
              <div
                key={i}
                className="gsap-stagger-child"
                style={{
                  background: 'var(--cream)',
                  padding: '1.25rem 1.5rem',
                }}
              >
                <div className="font-mono-label" style={{ color: 'var(--warm)', marginBottom: '0.4rem' }}>
                  {d.key}
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--ink)' }}>
                  {d.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
