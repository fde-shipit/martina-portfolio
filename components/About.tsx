import { person, details } from '@/content/data'

/**
 * About / Profile — body switches from Cormorant to DM Sans.
 *
 * Cormorant Garamond is gorgeous at display sizes but thins out at
 * text sizes. The profile paragraph reads better as sturdier sans.
 */
export default function About() {
  return (
    <section
      id="about"
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
            Profile
          </span>
        </div>
        <div className="section-content gsap-section-content">
          <p
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontWeight: 300,
              fontSize: 'clamp(1rem, 1.4vw, 1.1rem)',
              lineHeight: 1.65,
              color: 'var(--ink-soft)',
              marginBottom: '3rem',
              maxWidth: '64ch',
              whiteSpace: 'pre-line',
            }}
          >
            {person.profile}
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1px',
              background: 'var(--rule)',
              border: '1px solid var(--rule)',
            }}
          >
            {details.map((d, i) => (
              <div
                key={i}
                className="gsap-stagger-child"
                style={{
                  background: 'var(--paper)',
                  padding: '1.25rem 1.5rem',
                  flex: '1 1 220px',
                }}
              >
                <div
                  className="font-mono-label"
                  style={{ color: 'var(--warm)', marginBottom: '0.4rem' }}
                >
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
