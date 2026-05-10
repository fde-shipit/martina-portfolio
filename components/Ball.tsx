'use client'

import { useState, useRef } from 'react'

type BallState = 'idle' | 'shaking' | 'revealing' | 'lit'

const suggestions = [
  "Should I hire her?",
  "Is she worth the salary?",
  "Can she really do all that?",
  "I'm not convinced.",
  "Will she fit our culture?",
]

export default function Ball() {
  const [ballState, setBallState] = useState<BallState>('idle')
  const [answer, setAnswer] = useState<string | null>(null)
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)
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

      setTimeout(() => {
        setBallState('revealing')
        setAnswer(data.answer)
        setTimeout(() => setBallState('lit'), 100)
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
    setQuestion(s)
    ask(s)
  }

  const handleReset = () => {
    setBallState('idle')
    setAnswer(null)
    setQuestion('')
    inputRef.current?.focus()
  }

  const ballClass = ballState === 'idle' ? 'ball-float' : ballState === 'shaking' ? 'ball-shaking' : ''

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem' }}>
      {/* The Ball */}
      <div
        className={ballClass}
        style={{
          width: '280px',
          height: '280px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at 35% 35%, #2a2a3e 0%, #0d0d1a 60%, #000008 100%)',
          boxShadow: ballState === 'lit'
            ? '0 0 60px rgba(184,74,40,0.4), 0 20px 60px rgba(0,0,0,0.5), inset 0 -20px 40px rgba(0,0,0,0.3)'
            : '0 20px 60px rgba(0,0,0,0.4), inset 0 -20px 40px rgba(0,0,0,0.3)',
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
            width: '140px',
            height: '140px',
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
                color: 'rgba(139, 115, 85, 0.4)',
                lineHeight: 1,
                transition: 'opacity 0.3s ease',
                opacity: ballState === 'shaking' ? 0.2 : 0.4,
              }}
            >
              8
            </span>
          )}

          {/* Answer text */}
          {(ballState === 'revealing' || ballState === 'lit') && answer && (
            <p
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: '0.85rem',
                color: '#a8c4e8',
                textAlign: 'center',
                lineHeight: 1.4,
                opacity: ballState === 'lit' ? 1 : 0,
                transform: ballState === 'lit' ? 'scale(1)' : 'scale(0.9)',
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

      {/* Input form */}
      <div style={{ width: '100%', maxWidth: '480px' }}>
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
            {loading ? '···' : 'Ask →'}
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
      </div>
    </div>
  )
}
