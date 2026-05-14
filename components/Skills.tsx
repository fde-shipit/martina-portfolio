import { skills } from '@/content/data'

export default function Skills() {
  return (
    <section id="skills" style={{ padding: '0 3rem', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
      <div className="section-grid">
        <div className="section-label gsap-section-label">
          <span className="font-mono-label" style={{ color: 'var(--warm)' }}>Skills</span>
        </div>
        <div className="section-content gsap-section-content">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1px',
              background: 'var(--rule)',
            }}
          >
            {skills.map((group, i) => (
              <div
                key={i}
                className="gsap-stagger-child"
                style={{ background: 'var(--cream)', padding: '1.75rem', flex: '1 1 220px' }}
              >
                <div
                  className="font-mono-label"
                  style={{ color: 'var(--rust)', marginBottom: '1rem' }}
                >
                  {group.category}
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {group.items.map((item, j) => (
                    <li
                      key={j}
                      style={{ fontSize: '0.85rem', color: 'var(--ink)', lineHeight: 1.4 }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
