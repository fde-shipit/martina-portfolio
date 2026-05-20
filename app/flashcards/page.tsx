'use client'

import { useState, useEffect } from 'react'
import { DECKS, type Deck, type FlashCard, type PostStatus } from '@/content/flashcards'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

function genOptions(card: FlashCard, deck: FlashCard[]): string[] {
  const wrong = shuffle(deck.filter(c => c.term !== card.term)).slice(0, 3).map(c => c.term)
  return shuffle([...wrong, card.term])
}

function statusLabel(status: PostStatus | undefined): string | null {
  if (status === 'written') return 'Soon'
  if (status === 'draft') return 'In progress'
  return null
}

type Mode = 'learn' | 'quiz'
type Screen = 'home' | 'learn' | 'quiz' | 'results'

// ─── Shared components ────────────────────────────────────────────────────────

function ProgressBar({ value, accent }: { value: number; accent: string }) {
  return (
    <div style={{ height: '2px', background: 'var(--color-border-tertiary)', borderRadius: '2px', overflow: 'hidden', margin: '0 24px' }}>
      <div style={{ height: '100%', width: `${value}%`, background: accent, borderRadius: '2px', transition: 'width 0.35s ease' }} />
    </div>
  )
}

function PostLink({ card }: { card: FlashCard }) {
  if (!card.postUrl) return null
  return (
    <a
      href={card.postUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '4px',
        fontSize: '12px', color: 'var(--color-text-secondary)',
        textDecoration: 'none', borderBottom: '0.5px solid var(--color-border-secondary)',
        paddingBottom: '1px', lineHeight: 1,
      }}
    >
      Read Post {card.postNumber}: {card.postTitle} →
    </a>
  )
}

// ─── Home screen ──────────────────────────────────────────────────────────────

function HomeScreen({ decks, onStart }: { decks: Deck[]; onStart: (deck: Deck, mode: Mode) => void }) {
  const redefined = decks.find(d => d.id === 'redefined')
  const others = decks.filter(d => d.id !== 'redefined')
  const postedCount = redefined?.cards.filter(c => c.status === 'posted').length ?? 0
  const totalCount = redefined?.cards.length ?? 0

  return (
    <div style={{ padding: '32px 24px' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{
          fontFamily: 'var(--font-serif)', fontSize: '34px', fontWeight: '500',
          margin: '0 0 6px', color: 'var(--color-text-primary)', letterSpacing: '-0.02em', lineHeight: 1.1,
        }}>
          AI Terminology
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: 0 }}>
          Learn the vocabulary. Read the series.
        </p>
      </div>

      {redefined && (
        <div style={{ marginBottom: '16px' }}>
          <RedefinedDeckCard deck={redefined} postedCount={postedCount} totalCount={totalCount} onStart={onStart} />
        </div>
      )}

      <p style={{ fontSize: '11px', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-tertiary)', margin: '0 0 10px' }}>
        Go deeper
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
        {others.map(d => <DeckCard key={d.id} deck={d} onStart={onStart} />)}
      </div>
    </div>
  )
}

function RedefinedDeckCard({ deck, postedCount, totalCount, onStart }: {
  deck: Deck; postedCount: number; totalCount: number; onStart: (deck: Deck, mode: Mode) => void
}) {
  return (
    <div style={{
      background: deck.colorBg,
      border: `0.5px solid ${deck.colorAccent}33`,
      borderRadius: 'var(--border-radius-lg)',
      padding: '20px',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div>
          <p style={{ fontSize: '11px', fontWeight: '500', letterSpacing: '0.06em', textTransform: 'uppercase', color: deck.colorText, opacity: 0.6, margin: '0 0 4px' }}>
            Substack Series
          </p>
          <h2 style={{
            fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: '500',
            color: deck.colorText, letterSpacing: '-0.01em', margin: 0, lineHeight: 1.2,
          }}>
            {deck.title}
          </h2>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '12px' }}>
          <div style={{ fontSize: '22px', fontWeight: '500', color: deck.colorText, letterSpacing: '-0.02em', lineHeight: 1 }}>
            {postedCount}/{totalCount}
          </div>
          <div style={{ fontSize: '11px', color: deck.colorText, opacity: 0.55, marginTop: '2px' }}>posts live</div>
        </div>
      </div>

      <p style={{ fontSize: '13px', color: deck.colorText, opacity: 0.75, lineHeight: '1.5', margin: '0 0 16px' }}>
        {deck.description}
      </p>

      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
        {deck.cards
          .filter(c => c.status === 'posted')
          .slice(-3)
          .map(c => (
            <span key={c.term} style={{
              fontSize: '12px', color: deck.colorText,
              background: `${deck.colorAccent}14`,
              border: `0.5px solid ${deck.colorAccent}22`,
              padding: '3px 8px', borderRadius: '4px',
            }}>
              {c.term}
            </span>
          ))}
        {deck.cards.filter(c => c.status === 'written').length > 0 && (
          <span style={{
            fontSize: '12px', color: deck.colorText, opacity: 0.5,
            padding: '3px 8px', borderRadius: '4px',
            border: `0.5px dashed ${deck.colorAccent}33`,
          }}>
            +{deck.cards.filter(c => c.status !== 'posted').length} coming
          </span>
        )}
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={() => onStart(deck, 'learn')} style={{
          flex: 1, padding: '9px', background: deck.colorAccent, color: '#fff',
          border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: '500', cursor: 'pointer',
          fontFamily: 'var(--font-sans)',
        }}>
          Learn
        </button>
        <button onClick={() => onStart(deck, 'quiz')} style={{
          flex: 1, padding: '9px', background: 'none', color: deck.colorText,
          border: `0.5px solid ${deck.colorAccent}55`, borderRadius: '6px', fontSize: '13px',
          cursor: 'pointer', fontFamily: 'var(--font-sans)',
        }}>
          Quiz
        </button>
      </div>
    </div>
  )
}

function DeckCard({ deck, onStart }: { deck: Deck; onStart: (deck: Deck, mode: Mode) => void }) {
  return (
    <div style={{
      background: 'var(--color-background-primary)',
      border: '0.5px solid var(--color-border-tertiary)',
      borderRadius: 'var(--border-radius-lg)',
      padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px',
    }}>
      <span style={{
        display: 'inline-block', fontSize: '11px', fontWeight: '500', letterSpacing: '0.04em',
        textTransform: 'uppercase', color: deck.colorText, background: deck.colorBg,
        padding: '3px 9px', borderRadius: '6px', width: 'fit-content',
      }}>
        {deck.title}
      </span>
      <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.5', flexGrow: 1, margin: 0 }}>
        {deck.description}
      </p>
      <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>{deck.cards.length} cards</span>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={() => onStart(deck, 'learn')} style={{
          flex: 1, padding: '7px', background: deck.colorAccent, color: '#fff',
          border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '500',
          cursor: 'pointer', fontFamily: 'var(--font-sans)',
        }}>
          Learn
        </button>
        <button onClick={() => onStart(deck, 'quiz')} style={{
          flex: 1, padding: '7px', background: 'none', color: 'var(--color-text-primary)',
          border: '0.5px solid var(--color-border-secondary)', borderRadius: '6px',
          fontSize: '12px', cursor: 'pointer', fontFamily: 'var(--font-sans)',
        }}>
          Quiz
        </button>
      </div>
    </div>
  )
}

// ─── Learn screen ─────────────────────────────────────────────────────────────

function LearnScreen({ deck, cards, cardIndex, onNext, onHome }: {
  deck: Deck; cards: FlashCard[]; cardIndex: number; onNext: () => void; onHome: () => void
}) {
  const [flipped, setFlipped] = useState(false)
  const card = cards[cardIndex]
  const progress = ((cardIndex + 1) / cards.length) * 100
  const isRedefined = deck.id === 'redefined'
  const label = statusLabel(card.status)

  useEffect(() => { setFlipped(false) }, [cardIndex])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === ' ' && e.target === document.body) { e.preventDefault(); setFlipped(f => !f) }
      if (e.key === 'ArrowRight' && flipped) onNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [flipped, onNext])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '580px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px 12px' }}>
        <button onClick={onHome} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 0', fontFamily: 'var(--font-sans)' }}>
          ← Back
        </button>
        <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{cardIndex + 1} / {cards.length}</span>
        <span style={{
          fontSize: '11px', fontWeight: '500', letterSpacing: '0.04em', textTransform: 'uppercase',
          color: deck.colorText, background: deck.colorBg, padding: '3px 9px', borderRadius: '6px',
        }}>
          Learn
        </span>
      </div>
      <ProgressBar value={progress} accent={deck.colorAccent} />

      <div style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div onClick={() => setFlipped(f => !f)} style={{ perspective: '1200px', height: '268px', cursor: 'pointer', flexShrink: 0 }}>
          <div style={{
            width: '100%', height: '100%', position: 'relative',
            transformStyle: 'preserve-3d',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transition: 'transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
          }}>
            {/* Front */}
            <div style={{
              position: 'absolute', inset: 0,
              backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
              background: 'var(--color-background-primary)',
              border: '0.5px solid var(--color-border-tertiary)',
              borderRadius: 'var(--border-radius-lg)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              padding: '32px', gap: '10px',
            }}>
              {isRedefined && card.postNumber && (
                <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', letterSpacing: '0.04em' }}>
                  Post {card.postNumber}
                </span>
              )}
              <h2 style={{
                fontFamily: 'var(--font-serif)', fontSize: '34px', fontWeight: '500',
                textAlign: 'center', color: 'var(--color-text-primary)', letterSpacing: '-0.02em', lineHeight: 1.2, margin: 0,
              }}>
                {card.term}
              </h2>
              {card.abbr && (
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-text-secondary)',
                  background: 'var(--color-background-secondary)', padding: '3px 10px', borderRadius: '6px',
                }}>
                  {card.abbr}
                </span>
              )}
              {label && (
                <span style={{
                  marginTop: '6px', fontSize: '11px', color: deck.colorText, background: deck.colorBg,
                  padding: '3px 9px', borderRadius: '4px', opacity: 0.8,
                }}>
                  {label}
                </span>
              )}
              <span style={{ marginTop: '12px', fontSize: '12px', color: 'var(--color-text-tertiary)' }}>
                Tap to reveal · Space to flip
              </span>
            </div>

            {/* Back */}
            <div style={{
              position: 'absolute', inset: 0,
              backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              background: deck.colorBg,
              border: `0.5px solid ${deck.colorAccent}44`,
              borderRadius: 'var(--border-radius-lg)',
              display: 'flex', flexDirection: 'column',
              padding: '22px 24px', gap: '10px', overflowY: 'auto',
            }}>
              <span style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: deck.colorText, opacity: 0.6 }}>
                Definition
              </span>
              <p style={{ fontSize: '14px', lineHeight: '1.7', color: deck.colorText, flexGrow: 1, margin: 0 }}>
                {card.definition}
              </p>
              <div style={{ borderTop: `0.5px solid ${deck.colorAccent}22`, paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {card.example && (
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: deck.colorText, opacity: 0.75, lineHeight: '1.5' }}>
                    {card.example}
                  </span>
                )}
                <PostLink card={card} />
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 'auto' }}>
          {!flipped ? (
            <button onClick={() => setFlipped(true)} style={{
              width: '100%', padding: '11px', background: 'var(--color-text-primary)',
              color: 'var(--color-background-primary)', border: 'none',
              borderRadius: 'var(--border-radius-md)', fontSize: '14px', fontWeight: '500',
              cursor: 'pointer', fontFamily: 'var(--font-sans)',
            }}>
              Reveal definition
            </button>
          ) : (
            <button onClick={onNext} style={{
              width: '100%', padding: '11px', background: 'var(--color-text-primary)',
              color: 'var(--color-background-primary)', border: 'none',
              borderRadius: 'var(--border-radius-md)', fontSize: '14px', fontWeight: '500',
              cursor: 'pointer', fontFamily: 'var(--font-sans)',
            }}>
              {cardIndex + 1 < cards.length ? 'Next card →' : 'See results'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Quiz screen ──────────────────────────────────────────────────────────────

function QuizScreen({ deck, cards, cardIndex, score, onAnswer, onNext, onHome }: {
  deck: Deck; cards: FlashCard[]; cardIndex: number; score: number
  onAnswer: (correct: boolean) => void; onNext: () => void; onHome: () => void
}) {
  const card = cards[cardIndex]
  const [options, setOptions] = useState<string[]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const progress = ((cardIndex + 1) / cards.length) * 100

  useEffect(() => { setOptions(genOptions(card, cards)); setSelected(null) }, [cardIndex])

  function handleSelect(opt: string) {
    if (selected) return
    setSelected(opt)
    onAnswer(opt === card.term)
  }

  function optStyle(opt: string): React.CSSProperties {
    const base: React.CSSProperties = {
      width: '100%', padding: '13px 16px', textAlign: 'left',
      border: '0.5px solid var(--color-border-secondary)',
      borderRadius: 'var(--border-radius-md)', fontSize: '14px',
      cursor: selected ? 'default' : 'pointer',
      background: 'var(--color-background-primary)',
      color: 'var(--color-text-primary)',
      transition: 'all 0.15s', lineHeight: '1.4', fontFamily: 'var(--font-sans)',
    }
    if (!selected) return base
    if (opt === card.term) return { ...base, background: '#E1F5EE', border: '0.5px solid #0F6E56', color: '#085041' }
    if (opt === selected) return { ...base, background: '#FAECE7', border: '0.5px solid #993C1D', color: '#712B13' }
    return { ...base, opacity: 0.35 }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '580px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px 12px' }}>
        <button onClick={onHome} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 0', fontFamily: 'var(--font-sans)' }}>
          ← Back
        </button>
        <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{cardIndex + 1} / {cards.length}</span>
        <span style={{
          fontSize: '12px', fontWeight: '500', color: deck.colorText, background: deck.colorBg,
          padding: '3px 9px', borderRadius: '6px',
        }}>
          {score} correct
        </span>
      </div>
      <ProgressBar value={progress} accent={deck.colorAccent} />

      <div style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{
          background: 'var(--color-background-secondary)', borderRadius: 'var(--border-radius-lg)',
          padding: '20px', border: '0.5px solid var(--color-border-tertiary)',
        }}>
          {deck.id === 'redefined' && card.postNumber && (
            <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', marginBottom: '8px', letterSpacing: '0.04em' }}>
              Post {card.postNumber} — {card.postTitle}
            </div>
          )}
          <div style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-tertiary)', marginBottom: '10px' }}>
            Which term matches this definition?
          </div>
          <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--color-text-primary)', margin: 0 }}>
            {card.definition}
          </p>
          {card.example && (
            <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '0.5px solid var(--color-border-tertiary)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                {card.example}
              </span>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {options.map(opt => (
            <button key={opt} onClick={() => handleSelect(opt)} style={optStyle(opt)}>{opt}</button>
          ))}
        </div>

        {selected && card.postUrl && (
          <div style={{ padding: '12px 14px', background: 'var(--color-background-secondary)', borderRadius: 'var(--border-radius-md)', border: '0.5px solid var(--color-border-tertiary)' }}>
            <PostLink card={card} />
          </div>
        )}

        {selected && (
          <button onClick={onNext} style={{
            padding: '11px', background: 'var(--color-text-primary)',
            color: 'var(--color-background-primary)', border: 'none',
            borderRadius: 'var(--border-radius-md)', fontSize: '14px', fontWeight: '500',
            cursor: 'pointer', marginTop: 'auto', fontFamily: 'var(--font-sans)',
          }}>
            {cardIndex + 1 < cards.length ? 'Next →' : 'See results'}
          </button>
        )}
      </div>
    </div>
  )
}

// ─── Results screen ───────────────────────────────────────────────────────────

function ResultsScreen({ deck, total, score, mode, onHome, onRetry, onSwitchMode }: {
  deck: Deck; total: number; score: number; mode: Mode
  onHome: () => void; onRetry: () => void; onSwitchMode: () => void
}) {
  const pct = Math.round((score / total) * 100)
  const isLearn = mode === 'learn'
  const isRedefined = deck.id === 'redefined'

  return (
    <div style={{ padding: '40px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', minHeight: '500px' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontFamily: 'var(--font-serif)', fontSize: '80px', fontWeight: '500',
          color: 'var(--color-text-primary)', lineHeight: 1, letterSpacing: '-0.03em',
        }}>
          {isLearn ? '✓' : `${pct}%`}
        </div>
        <div style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginTop: '8px' }}>
          {isLearn ? `All ${total} cards reviewed` : pct >= 80 ? 'Excellent' : 'Keep practising'}
        </div>
      </div>

      <div style={{
        width: '100%', background: 'var(--color-background-secondary)',
        borderRadius: 'var(--border-radius-lg)', padding: '20px', border: '0.5px solid var(--color-border-tertiary)',
      }}>
        <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          {deck.title} · {isLearn ? 'Learn' : 'Quiz'} mode
        </div>
        {isLearn ? (
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: 0 }}>
            {isRedefined
              ? 'Now test your recall — or head to the series to read the posts.'
              : 'Switch to Quiz mode to test your recall of these terms.'}
          </p>
        ) : (
          <div style={{ display: 'flex', gap: '32px' }}>
            <div>
              <div style={{ fontSize: '32px', fontWeight: '500', color: '#0F6E56', letterSpacing: '-0.02em' }}>{score}</div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginTop: '2px' }}>correct</div>
            </div>
            <div>
              <div style={{ fontSize: '32px', fontWeight: '500', color: '#993C1D', letterSpacing: '-0.02em' }}>{total - score}</div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginTop: '2px' }}>incorrect</div>
            </div>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
        <button onClick={onRetry} style={{
          flex: 1, padding: '11px', background: 'var(--color-text-primary)',
          color: 'var(--color-background-primary)', border: 'none',
          borderRadius: 'var(--border-radius-md)', fontSize: '14px', fontWeight: '500',
          cursor: 'pointer', fontFamily: 'var(--font-sans)',
        }}>
          Try again
        </button>
        <button onClick={onHome} style={{
          flex: 1, padding: '11px', background: 'none',
          border: '0.5px solid var(--color-border-secondary)',
          borderRadius: 'var(--border-radius-md)', fontSize: '14px', cursor: 'pointer',
          color: 'var(--color-text-primary)', fontFamily: 'var(--font-sans)',
        }}>
          All decks
        </button>
      </div>

      {isLearn && (
        <button onClick={onSwitchMode} style={{
          background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px',
          color: 'var(--color-text-secondary)', textDecoration: 'underline',
          fontFamily: 'var(--font-sans)',
        }}>
          Switch to Quiz mode
        </button>
      )}
    </div>
  )
}

// ─── App root ─────────────────────────────────────────────────────────────────

function FlashcardApp({ decks }: { decks: Deck[] }) {
  const [screen, setScreen] = useState<Screen>('home')
  const [deck, setDeck] = useState<Deck | null>(null)
  const [mode, setMode] = useState<Mode>('learn')
  const [cardIndex, setCardIndex] = useState(0)
  const [score, setScore] = useState(0)

  const cards = deck
    ? deck.cards.filter(c => !c.status || c.status === 'posted' || c.status === 'written')
    : []

  function start(d: Deck, m: Mode) { setDeck(d); setMode(m); setCardIndex(0); setScore(0); setScreen(m) }
  function next() {
    if (cardIndex + 1 >= cards.length) setScreen('results')
    else setCardIndex(i => i + 1)
  }

  if (screen === 'home') return <HomeScreen decks={decks} onStart={start} />
  if (screen === 'learn') return <LearnScreen deck={deck!} cards={cards} cardIndex={cardIndex} onNext={next} onHome={() => setScreen('home')} />
  if (screen === 'quiz') return <QuizScreen deck={deck!} cards={cards} cardIndex={cardIndex} score={score} onAnswer={c => { if (c) setScore(s => s + 1) }} onNext={next} onHome={() => setScreen('home')} />
  if (screen === 'results') return (
    <ResultsScreen
      deck={deck!} total={cards.length} score={score} mode={mode}
      onHome={() => setScreen('home')}
      onRetry={() => start(deck!, mode)}
      onSwitchMode={() => start(deck!, mode === 'learn' ? 'quiz' : 'learn')}
    />
  )
  return null
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <>
      <style>{`
        .flashcard-root {
          --color-background-primary: var(--paper);
          --color-background-secondary: var(--paper-2);
          --color-text-primary: var(--ink);
          --color-text-secondary: var(--warm);
          --color-text-tertiary: var(--warm);
          --color-border-secondary: var(--rule);
          --color-border-tertiary: var(--rule);
          --border-radius-lg: 12px;
          --border-radius-md: 8px;
          --font-serif: var(--font-cormorant);
          --font-sans: var(--font-dm-sans);
          --font-mono: var(--font-dm-mono);
        }
      `}</style>
      <div
        className="flashcard-root"
        style={{
          minHeight: '100vh',
          paddingTop: '80px',
          paddingBottom: '4rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          background: 'var(--paper)',
        }}
      >
        <div style={{ width: '100%', maxWidth: '480px', margin: '0 auto' }}>
          <FlashcardApp decks={DECKS} />
        </div>
      </div>
    </>
  )
}
