'use client'

import { useState, useRef } from 'react'

type BallState = 'idle' | 'shaking' | 'revealing' | 'lit' | 'hired'

const suggestions = [
  "Why should I hire Martina?",
  "What if I don't hire her?",
  "She seems like an overachiever. I don't like overachievers.",
  "What if someone else hires her first?",
]

const staticAnswers: Record<string, string> = {
  "Why should I hire Martina?": "If you need AI that actually works in production, do it. Otherwise ask me what's for dinner.",
  "What if I don't hire her?": "Then you'll spend the next year trying to find someone like her. Wishing you luck in your impossible endeavours.",
  "She seems like an overachiever. I don't like overachievers.": "The oracle understands. Watching someone actually deliver must be exhausting. You'll get used to it.",
  "What if someone else hires her first?": "Someone else will. You'll read about it later.",
}

export default function Ball() {
  const [ballState, setBallState] = useState<BallState>('idle')
  const [answer, setAnswer] = useState<string | null>(null)
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)
  const [remaining, setRemaining] = useState<number>(5)
  const [rateLimited, setRateLimited] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const ask = async (q: string) => {
    if (!q.trim() || loading) return
    setLoading(true)
    setAnswer(null)
    setBallState('shaking')

    try {
      const res = await fetch('/api/oracle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q }),
      })
      const data = await res.json()

      if (data.rateLimited) {
        setRateLimited(true)
        setBallState('idle')
        setLoading(false)
        return
      }

      if (typeof data.remaining === 'number') {
        setRemaining(data.remaining)
      }

      setTimeout(() => {
        setBallState('revealing')
        setAnswer(data.answer)
        setTimeout(() => setBallState(data.hired ? 'hired' : 'lit'), 100)
      }, 650)
    } catch {
      setTimeout(() => {
        setBallState('revealing')
        setAnswer("The oracle is momentarily elsewhere. But the answer is still yes.")
        setTimeout(() => setBallState('lit'), 100)
      }, 650)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    ask(question)
  }

  const handleSuggestion = (s: string) => {
    if (rateLimited) return
    setQuestion(s)
    if (staticAnswers[s]) {
      const newRemaining = remaining - 1
      setRemaining(newRemaining)
      if (newRemaining < 0) {
        setRateLimited(true)
        return
      }
      setBallState('shaking')
      setTimeout(() => {
        setBallState('revealing')
        setAnswer(staticAnswers[s])
        setTimeout(() => setBallState('lit'), 100)
      }, 650)
    } else {
      ask(s)
    }
  }

  const handleReset = () => {
    if (rateLimited) return
    setBallState('idle')
    setAnswer(null)
    setQuestion('')
    inputRef.current?.focus()
  }

  const ballClass = ballState === 'idle' ? 'ball-float' : ballState === 'shaking' ? 'ball-shaking' : ballState === 'hired' ? 'ball-hired' : ''

  return (
    <div className="oracle-layout">
      <style>{`
        @keyframes ball-spin {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.05); }
          100% { transform: rotate(360deg) scale(1); }
        }
        .ball-hired { animation: ball-spin 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .oracle-layout {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3rem;
        }
        .oracle-right {
          width: 100%;
          max-width: 480px;
        }
        @media (min-width: 768px) {
          .oracle-layout {
            flex-direction: row;
            align-items: center;
            gap: 4rem;
          }
          .oracle-right {
            max-width: none;
            flex: 1;
          }
        }
      `}</style>
      {/* The Ball */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      <div
        className={ballClass}
        style={{
          width: '340px',
          height: '340px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at 35% 35%, #1a3a4a 0%, #0d2030 55%, #061420 100%)',
          boxShadow: (ballState === 'lit' || ballState === 'hired')
            ? '0 0 80px rgba(82,160,170,0.35), 0 0 30px rgba(82,160,170,0.2), 0 20px 60px rgba(0,0,0,0.4), inset 0 -20px 40px rgba(0,0,0,0.2)'
            : '0 20px 60px rgba(0,0,0,0.25), 0 0 40px rgba(82,160,170,0.08), inset 0 -20px 40px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          cursor: 'pointer',
          transition: 'box-shadow 0.6s ease',
        }}
        onClick={handleReset}
      >
        {/* Inner window */}
        <div
          style={{
            width: '165px',
            height: '165px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at 40% 40%, #1a1a2e 0%, #0a0a1a 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            position: 'relative',
          }}
        >
          {/* 8 glyph (idle state) */}
          {(ballState === 'idle' || ballState === 'shaking') && (
            <span
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontWeight: 300,
                fontSize: '4rem',
                color: 'rgba(139, 115, 85, 0.75)',
                lineHeight: 1,
                transition: 'opacity 0.3s ease',
                opacity: ballState === 'shaking' ? 0.2 : 0.75,
              }}
            >
              8
            </span>
          )}

          {/* Answer text */}
          {(ballState === 'revealing' || ballState === 'lit' || ballState === 'hired') && answer && (
            <p
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: '0.85rem',
                color: '#a8c4e8',
                textAlign: 'center',
                lineHeight: 1.4,
                opacity: (ballState === 'lit' || ballState === 'hired') ? 1 : 0,
                transform: (ballState === 'lit' || ballState === 'hired') ? 'scale(1)' : 'scale(0.9)',
                transition: 'opacity 0.5s ease, transform 0.5s ease',
              }}
            >
              {answer}
            </p>
          )}
        </div>

        {/* Shine */}
        <div
          style={{
            position: 'absolute',
            top: '15%',
            left: '20%',
            width: '30%',
            height: '20%',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(255,255,255,0.15) 0%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />
      </div>
      </div>

      {/* Input form */}
      <div className="oracle-right">
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0', borderBottom: '1px solid var(--ink)' }}>
          <input
            ref={inputRef}
            type="text"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            placeholder="Ask the oracle..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontFamily: 'var(--font-cormorant)',
              fontSize: '1.1rem',
              fontStyle: 'italic',
              color: 'var(--ink)',
              padding: '0.75rem 0',
            }}
          />
          <button
            type="submit"
            disabled={loading || !question.trim()}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: loading ? 'default' : 'pointer',
              fontFamily: 'var(--font-dm-mono)',
              fontSize: '0.65rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: loading ? 'var(--warm)' : 'var(--rust)',
              padding: '0.75rem 0 0.75rem 1rem',
            }}
          >
            {loading ? '...' : 'Ask ->'}
          </button>
        </form>

        {/* Suggestions */}
        <div style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => handleSuggestion(s)}
              style={{
                background: 'transparent',
                border: '1px solid var(--rule)',
                cursor: 'pointer',
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '0.78rem',
                color: 'var(--warm)',
                padding: '0.4rem 0.85rem',
                transition: 'border-color 0.2s ease, color 0.2s ease',
              }}
              onMouseEnter={e => {
                ;(e.target as HTMLButtonElement).style.borderColor = 'var(--rust)'
                ;(e.target as HTMLButtonElement).style.color = 'var(--rust)'
              }}
              onMouseLeave={e => {
                ;(e.target as HTMLButtonElement).style.borderColor = 'var(--rule)'
                ;(e.target as HTMLButtonElement).style.color = 'var(--warm)'
              }}
            >
              {s}
            </button>
          ))}
        </div>

        {rateLimited ? (
          <div style={{
            marginTop: '1.5rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            padding: '1.5rem',
            border: '1px solid var(--rust)',
            background: 'rgba(184,74,40,0.04)',
          }}>
            <p style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: '1.3rem',
              fontStyle: 'italic',
              color: 'var(--rust)',
              lineHeight: 1.3,
            }}>
              Dang!
            </p>
            <p style={{
              fontFamily: 'var(--font-dm-mono)',
              fontSize: '0.72rem',
              color: 'var(--ink)',
              lineHeight: 1.5,
            }}>
              Looks like you&apos;re out of tokens.<br />Request more here:
            </p>
            <a
              href="mailto:martina.edwards.p@gmail.com?subject=I%20need%20an%20oracle%20like%20you&body=I%20had%20fun%20with%20your%20oracle.%20Connect%3F%20And...%20more%20tokens%2C%20please."
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-dm-mono)',
                fontSize: '0.65rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--cream)',
                background: 'var(--rust)',
                border: '1px solid var(--rust)',
                padding: '0.6rem 1.5rem',
                textDecoration: 'none',
              }}
            >
              Request tokens
            </a>
          </div>
        ) : (
          <>
            {answer && (
              <p
                style={{
                  marginTop: '1.5rem',
                  fontSize: '0.78rem',
                  color: 'var(--warm)',
                  fontFamily: 'var(--font-dm-mono)',
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
                onClick={handleReset}
              >
                Click the ball or this to ask again
              </p>
            )}
            {remaining <= 2 && remaining > 0 && !rateLimited && (
              <p style={{
                marginTop: '0.75rem',
                fontSize: '0.75rem',
                color: 'var(--rust)',
                fontFamily: 'var(--font-dm-mono)',
                textAlign: 'center',
                fontWeight: 500,
                letterSpacing: '0.05em',
              }}>
                {remaining} attempt{remaining === 1 ? '' : 's'} remaining
              </p>
            )}
          </>
        )}

        <p style={{
          marginTop: '2rem',
          fontSize: '0.65rem',
          color: 'var(--warm)',
          fontFamily: 'var(--font-dm-mono)',
          textAlign: 'center',
          opacity: 0.6,
          letterSpacing: '0.05em',
        }}>
          AI-generated responses. For entertainment only.
        </p>
      </div>
    </div>
  )
}
