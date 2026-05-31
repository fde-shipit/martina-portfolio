'use client';

import { useEffect, useRef } from 'react';

const topCells = [
  {
    number: '01',
    label: 'AI & Architecture',
    items: [
      'Agentic workflow design',
      'HITL architecture',
      'LLM evaluation',
      'RAG architecture',
      'Context window management',
      'AI security (OWASP LLM)',
      'Prompt & harness engineering',
    ],
  },
  {
    number: '02',
    label: 'AI Tools',
    prose:
      'Claude and Copilot Studio, agentic workflow design and deployment, not just configuration. Knows which tool fits the workflow. Knows when none of them do yet.',
    also: 'Also: Legora · Harvey · Power Automate · Power BI',
  },
  {
    number: '03',
    label: 'Product',
    items: [
      'End-to-end delivery',
      'Roadmap & prioritisation',
      'Release governance',
      'Vendor evaluation',
      'Client onboarding',
      'Stakeholder management',
      'Incident management',
    ],
  },
  {
    number: '04',
    label: 'Enterprise Platforms',
    items: [
      'ServiceNow',
      'Icertis',
      'IBM Maximo',
      'Nautobot',
      'SharePoint',
      'Vercel',
      'PostgreSQL',
      'Workday',
    ],
  },
];

const bottomCells = [
  {
    number: '05',
    label: 'Technical',
    items: [
      'Scripting & automation',
      'Power BI',
      'AWS',
      'Atlassian Suite',
      'BPMN 2.0',
      'Entra ID / Active Directory',
    ],
  },
  {
    number: '06',
    label: 'Certifications',
    items: [
      'MBA (Diplom BWL)',
      'Foreign Language Correspondent, AMA Business School Germany',
      'Certified Scrum Master (PSM I)',
    ],
  },
  {
    number: '07',
    label: 'Context',
    items: [
      'Legal',
      'Regulated environments',
      'Enterprise & global',
      'English & German',
    ],
  },
];

const EMAIL = 'martina.edwards.p@gmail.com';
const SCRAMBLE_TO = 'go on, say hi.';
const TARGET      = 'click to say Hallo!';
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@._-+';

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

export default function Skills() {
  const defaultElRef  = useRef<HTMLSpanElement>(null);
  const scrambleElRef = useRef<HTMLSpanElement>(null);
  const resolvedElRef = useRef<HTMLDivElement>(null);
  const animatingRef  = useRef(false);
  const hoveredRef    = useRef(false);
  const rafRef        = useRef<number | null>(null);

  function cancelAnim() {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }

  function reset() {
    cancelAnim();
    animatingRef.current = false;
    if (scrambleElRef.current) {
      scrambleElRef.current.style.opacity = '0';
      scrambleElRef.current.textContent = '';
    }
    if (resolvedElRef.current) resolvedElRef.current.style.opacity = '0';
    if (defaultElRef.current)  defaultElRef.current.style.opacity  = '1';
  }

  function runNoise(
    len: number,
    duration: number,
    color: string,
    onDone: () => void
  ) {
    const el = scrambleElRef.current;
    if (!el) return;
    el.style.color   = color;
    el.style.opacity = '1';
    const start = performance.now();
    function frame(now: number) {
      if (!scrambleElRef.current) return;
      const elapsed = now - start;
      if (elapsed < duration) {
        let s = '';
        for (let i = 0; i < len; i++) s += randomChar();
        scrambleElRef.current.textContent = s;
        rafRef.current = requestAnimationFrame(frame);
      } else {
        onDone();
      }
    }
    rafRef.current = requestAnimationFrame(frame);
  }

  function scrambleTo(
    finalText: string,
    duration: number,
    onDone: () => void
  ) {
    if (!scrambleElRef.current) return;
    const len   = finalText.length;
    const start = performance.now();
    function frame(now: number) {
      if (!scrambleElRef.current) return;
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const resolved = Math.floor(progress * len);
      let display = '';
      for (let i = 0; i < len; i++) {
        display += i < resolved ? finalText[i] : randomChar();
      }
      scrambleElRef.current.textContent = display;
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(frame);
      } else {
        scrambleElRef.current.textContent = finalText;
        onDone();
      }
    }
    rafRef.current = requestAnimationFrame(frame);
  }

  function runFullSequence() {
    if (animatingRef.current) return;
    animatingRef.current = true;
    if (defaultElRef.current)  defaultElRef.current.style.opacity  = '0';
    if (resolvedElRef.current) resolvedElRef.current.style.opacity = '0';

    /* raspberry = var(--teal) in this project's token system */
    runNoise(EMAIL.length, 550, 'var(--teal)', () => {
      if (!hoveredRef.current) { reset(); return; }
      scrambleTo(SCRAMBLE_TO, 1400, () => {
        if (!hoveredRef.current) { reset(); return; }
        setTimeout(() => {
          if (resolvedElRef.current) resolvedElRef.current.style.opacity = '1';
          setTimeout(() => {
            if (scrambleElRef.current) scrambleElRef.current.style.opacity = '0';
          }, 400);
        }, 180);
        animatingRef.current = false;
      });
    });
  }

  function runTeaser() {
    animatingRef.current = true;
    if (defaultElRef.current) defaultElRef.current.style.opacity = '0';

    runNoise(EMAIL.length, 500, 'var(--teal)', () => {
      if (scrambleElRef.current) {
        scrambleElRef.current.style.color = 'rgba(212,87,105,0.6)';
      }
      scrambleTo(EMAIL, 850, () => {
        setTimeout(() => {
          if (defaultElRef.current) defaultElRef.current.style.opacity = '1';
          setTimeout(() => {
            if (scrambleElRef.current) scrambleElRef.current.style.opacity = '0';
            animatingRef.current = false;
          }, 200);
        }, 600);
      });
    });
  }

  useEffect(() => {
    const timer = setTimeout(runTeaser, 2800);
    return () => clearTimeout(timer);
  }, []);

  function handleMouseEnter() {
    hoveredRef.current = true;
    if (!animatingRef.current) runFullSequence();
  }

  function handleMouseLeave() {
    hoveredRef.current = false;
    reset();
  }

  function handleClick() {
    window.location.href = `mailto:${EMAIL}`;
  }

  return (
    <section id="skills" style={{ background: 'var(--cream)', width: '100%' }}>

      {/* Top row — light */}
      <div className="skills-top-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        borderTop: '0.5px solid rgba(0,0,0,0.1)',
      }}>
        {topCells.map((cell, i) => (
          <div
            key={cell.number}
            style={{
              padding: '1.8rem 1.6rem 2.2rem',
              borderRight: i < topCells.length - 1 ? '0.5px solid rgba(0,0,0,0.1)' : 'none',
              borderBottom: '0.5px solid rgba(0,0,0,0.1)',
              position: 'relative',
              background: 'var(--cream)',
            }}
          >
            <span style={{
              fontFamily: 'var(--font-dm-mono)',
              fontSize: '11px',
              fontWeight: 300,
              color: 'rgba(48,134,149,0.35)',
              position: 'absolute',
              top: '1.8rem',
              right: '1.4rem',
              letterSpacing: '0.05em',
            }}>
              {cell.number}
            </span>

            <span style={{
              fontFamily: 'var(--font-dm-mono)',
              fontSize: '9.5px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: '1.4rem',
              display: 'block',
            }}>
              {cell.label}
            </span>

            {'items' in cell && cell.items ? (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {cell.items.map((item) => (
                  <li key={item} style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: '18px',
                    fontWeight: 300,
                    color: 'var(--ink)',
                    lineHeight: 1.5,
                    padding: '0.18rem 0',
                  }}>
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <div>
                <p style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '13px',
                  fontWeight: 300,
                  color: '#3a3a3a',
                  lineHeight: 1.65,
                  margin: 0,
                }}>
                  {cell.prose}
                </p>
                {cell.also && (
                  <p style={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontSize: '12px',
                    color: '#777',
                    marginTop: '0.9rem',
                    marginBottom: 0,
                  }}>
                    {cell.also}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom row — muted + CTA */}
      <div className="skills-bottom-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
      }}>
        {bottomCells.map((cell) => (
          <div
            key={cell.number}
            style={{
              padding: '1.8rem 1.6rem 2.2rem',
              borderRight: '0.5px solid rgba(0,0,0,0.08)',
              borderBottom: '0.5px solid rgba(0,0,0,0.08)',
              background: 'var(--cream)',
              position: 'relative',
            }}
          >
            <span style={{
              fontFamily: 'var(--font-dm-mono)',
              fontSize: '11px',
              fontWeight: 300,
              color: 'rgba(48,134,149,0.3)',
              position: 'absolute',
              top: '1.8rem',
              right: '1.4rem',
              letterSpacing: '0.05em',
            }}>
              {cell.number}
            </span>

            <span style={{
              fontFamily: 'var(--font-dm-mono)',
              fontSize: '9.5px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: '1.4rem',
              display: 'block',
            }}>
              {cell.label}
            </span>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {cell.items.map((item) => (
                <li key={item} style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: '18px',
                  fontWeight: 300,
                  color: '#2a2a2a',
                  lineHeight: 1.5,
                  padding: '0.18rem 0',
                }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* CTA cell — always dark */}
        <div style={{
          background: '#0c1014',
          padding: '1.8rem 1.6rem 2.2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '220px',
          borderLeft: '0.5px solid rgba(212,87,105,0.15)',
          borderBottom: '0.5px solid rgba(0,0,0,0.08)',
        }}>

          {/* Dot — teal, slow glow breathe */}
          <div style={{ width: 7, height: 7, marginBottom: '1.8rem', flexShrink: 0 }}>
            <div className="skills-cta-dot" />
          </div>

          <p style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: '22px',
            fontWeight: 300,
            fontStyle: 'italic',
            color: '#EFF0F2',
            lineHeight: 1.3,
            flexGrow: 1,
            marginBottom: '1.6rem',
          }}>
            Always interested in the right conversation.
          </p>

          {/* Matrix email */}
          <div
            className="skills-email-area"
            style={{ position: 'relative', height: 48, overflow: 'hidden' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
          >
            {/* Default: email address */}
            <span
              ref={defaultElRef}
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: 'var(--font-dm-mono)',
                fontSize: '12.5px',
                letterSpacing: '0.08em',
                color: 'rgba(212,87,105,0.6)',
                transition: 'opacity 0.2s ease',
                whiteSpace: 'nowrap',
              }}
            >
              {EMAIL}
              <span className="skills-arrow" style={{
                display: 'inline-block',
                transition: 'transform 0.3s ease',
                color: 'var(--teal)',
              }}>→</span>
            </span>

            {/* Scramble layer */}
            <span
              ref={scrambleElRef}
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                fontFamily: 'var(--font-dm-mono)',
                fontSize: '12.5px',
                letterSpacing: '0.08em',
                opacity: 0,
                whiteSpace: 'nowrap',
              }}
            />

            {/* Resolved state */}
            <div
              ref={resolvedElRef}
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: 'var(--font-cormorant)',
                fontSize: '26px',
                fontWeight: 300,
                fontStyle: 'italic',
                color: '#EFF0F2',
                opacity: 0,
                transition: 'opacity 0.9s ease',
                whiteSpace: 'nowrap',
              }}
            >
              {TARGET}
              <span className="skills-arrow" style={{
                display: 'inline-block',
                fontStyle: 'normal',
                fontFamily: 'var(--font-dm-mono)',
                fontSize: '12.5px',
                transition: 'transform 0.3s ease',
                color: 'var(--teal)',
              }}>→</span>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .skills-cta-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #308695;
          animation: skills-dot-breathe 3.6s ease-in-out infinite;
        }
        @keyframes skills-dot-breathe {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(48,134,149,0.55),
                        0 0 0 0 rgba(48,134,149,0.2);
            opacity: 1;
          }
          45% {
            transform: scale(1.25);
            box-shadow: 0 0 5px 3px rgba(48,134,149,0.25),
                        0 0 10px 6px rgba(48,134,149,0.08);
            opacity: 0.85;
          }
          50% {
            transform: scale(1.18);
            box-shadow: 0 0 4px 2px rgba(48,134,149,0.2),
                        0 0 8px 5px rgba(48,134,149,0.06);
            opacity: 0.9;
          }
        }
        .skills-email-area { cursor: pointer; }
        .skills-email-area:hover .skills-arrow { transform: translateX(4px); }

        @media (max-width: 900px) {
          .skills-top-grid    { grid-template-columns: repeat(2, 1fr) !important; }
          .skills-bottom-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 500px) {
          .skills-top-grid    { grid-template-columns: 1fr !important; }
          .skills-bottom-grid { grid-template-columns: 1fr !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .skills-cta-pulse { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
