import { skills } from '@/content/data'
import type { ReactNode } from 'react'

type Props = {
  appendCell?: ReactNode
}

export default function Skills({ appendCell }: Props) {
  return (
    <section id="skills" style={{ padding: '0 3rem', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
      <div className="section-grid">
        <div className="section-label gsap-section-label">
          <span className="font-mono-label" style={{ color: 'var(--warm)' }}>Skills</span>
        </div>
        <div className="section-content gsap-section-content">
          <div
            className="skills-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1px',
              background: 'var(--rule)',
            }}
          >
            {skills.map((group, i) => (
              <div
                key={i}
                className="gsap-stagger-child"
                style={{
                  background: 'var(--cream)',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
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
            {appendCell}
          </div>

          <style>{`
            @media (max-width: 900px) {
              .skills-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
            @media (max-width: 500px) {
              .skills-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </div>
      </div>
    </section>
  )
}
