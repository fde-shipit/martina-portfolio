import { achievements } from '@/content/data'

export default function Work() {
  return (
    <section id="work" style={{ padding: '0 3rem', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
      <div className="section-grid">
        <div className="section-label gsap-section-label">
          <span className="font-mono-label" style={{ color: 'var(--warm)' }}>Selected Work</span>
        </div>
        <div className="section-content gsap-section-content">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--rule)' }}>
            {achievements.map((item, i) => (
              <div
                key={i}
                className="work-item gsap-stagger-child"
                style={{
                  background: 'var(--cream)',
                  display: 'grid',
                  gridTemplateColumns: 'minmax(100px, 140px) 1fr',
                  gap: '2rem',
                  padding: '2rem',
                  alignItems: 'start',
                }}
              >
                <div style={{ overflow: 'hidden', wordBreak: 'break-word' }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-cormorant)',
                      fontWeight: 300,
                      fontSize: '2.2rem',
                      color: 'var(--rust)',
                      lineHeight: 1,
                    }}
                  >
                    {item.number}
                  </div>
                  <div
                    className="font-mono-label"
                    style={{ color: 'var(--warm)', marginTop: '0.3rem' }}
                  >
                    {item.sublabel}
                  </div>
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-cormorant)',
                      fontWeight: 300,
                      fontSize: '1.3rem',
                      color: 'var(--ink)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: 'var(--warm)',
                      lineHeight: 1.6,
                      marginBottom: '1rem',
                    }}
                  >
                    {item.description}
                  </p>
                  <span
                    className="font-mono-label"
                    style={{
                      color: 'var(--rust)',
                      fontSize: '0.62rem',
                    }}
                  >
                    {item.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
