import { career } from '@/content/data'

export default function Career() {
  return (
    <section id="career" style={{ padding: '0 3rem', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
      <div className="section-grid">
        <div className="section-label gsap-section-label">
          <span className="font-mono-label" style={{ color: 'var(--warm)' }}>Career</span>
        </div>
        <div className="section-content gsap-section-content">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--rule)' }}>
            {career.map((item, i) => (
              <div
                key={i}
                className="gsap-stagger-child"
                style={{
                  background: 'var(--cream)',
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: '2rem',
                  padding: '1.5rem 2rem',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-cormorant)',
                        fontWeight: 300,
                        fontSize: '1.15rem',
                        color: 'var(--ink)',
                      }}
                    >
                      {item.role}
                    </h3>
                    {item.current && (
                      <span
                        className="font-mono-label"
                        style={{
                          color: 'var(--rust)',
                          fontSize: '0.58rem',
                          border: '1px solid var(--rust)',
                          padding: '1px 6px',
                        }}
                      >
                        Current
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--warm)' }}>{item.company}</div>
                </div>
                <div
                  className="font-mono-label"
                  style={{ color: 'var(--warm)', fontSize: '0.62rem', textAlign: 'right', whiteSpace: 'nowrap' }}
                >
                  {item.period}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
