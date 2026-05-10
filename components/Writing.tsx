import { posts, person } from '@/content/data'

export default function Writing() {
  return (
    <section id="writing" style={{ padding: '0 3rem', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
      <div className="section-grid">
        <div className="section-label gsap-section-label">
          <span className="font-mono-label" style={{ color: 'var(--warm)' }}>Writing</span>
        </div>
        <div className="section-content gsap-section-content">
          <p style={{ fontSize: '0.82rem', color: 'var(--warm)', marginBottom: '2rem', lineHeight: 1.6 }}>
            LinkedIn series demystifying AI for non-technical audiences.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '1px',
              background: 'var(--rule)',
            }}
          >
            {posts.map((post, i) => (
              <a
                key={i}
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="post-card gsap-stagger-child"
                style={{
                  background: 'var(--cream)',
                  padding: '1.75rem',
                  textDecoration: 'none',
                  display: 'block',
                }}
              >
                <div
                  className="font-mono-label"
                  style={{ color: 'var(--rust)', marginBottom: '0.5rem', fontSize: '0.6rem' }}
                >
                  {post.week}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontWeight: 300,
                    fontSize: '1.4rem',
                    color: 'var(--ink)',
                    marginBottom: '0.75rem',
                  }}
                >
                  {post.title}
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--warm)', lineHeight: 1.5 }}>
                  {post.hook}
                </p>
                <div
                  style={{
                    marginTop: '1.25rem',
                    fontFamily: 'var(--font-dm-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--rust)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  Read on LinkedIn <span className="post-arrow">→</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
