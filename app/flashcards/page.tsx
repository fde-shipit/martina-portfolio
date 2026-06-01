'use client'

import { useState, useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'
import { DECKS, type Deck, type FlashCard } from '@/content/flashcards'

// ─── Types ────────────────────────────────────────────────────────────────────

type Mode = 'learn' | 'quiz'
type Screen = 'home' | 'deck' | 'learn' | 'quiz' | 'results'
type DeckStats = { lastQuizScore: number; lastQuizTotal: number }
type SessionStats = Record<string, DeckStats>

// ─── Confetti ─────────────────────────────────────────────────────────────────

function fireConfetti(type: string, accentColor = '#534AB7') {
  const colors = [accentColor, '#ffffff', '#e8e8e8']
  if (type === 'correct') {
    confetti({ particleCount: 38, spread: 52, origin: { x: 0.5, y: 0.78 }, colors, disableForReducedMotion: true })
  } else if (type === 'strong') {
    confetti({ particleCount: 110, spread: 75, origin: { y: 0.62 }, colors, disableForReducedMotion: true })
  } else if (type === 'perfect') {
    confetti({ particleCount: 90, angle: 60, spread: 58, origin: { x: 0, y: 0.7 }, colors, disableForReducedMotion: true })
    setTimeout(() => confetti({ particleCount: 90, angle: 120, spread: 58, origin: { x: 1, y: 0.7 }, colors, disableForReducedMotion: true }), 160)
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] { return [...arr].sort(() => Math.random() - 0.5) }

function genOptions(card: FlashCard, deck: FlashCard[]): string[] {
  const wrong = shuffle(deck.filter(c => c.term !== card.term)).slice(0, 3).map(c => c.term)
  return shuffle([...wrong, card.term])
}

function getResultTier(pct: number): { label: string; sub: string; celebrate: string | null } {
  if (pct === 100) return { label: 'Perfect',       sub: 'Every single one.',               celebrate: 'perfect' }
  if (pct >= 90)   return { label: 'Excellent',     sub: "You've got this vocabulary.",     celebrate: 'strong'  }
  if (pct >= 80)   return { label: 'Strong work',   sub: 'A solid round.',                  celebrate: 'strong'  }
  if (pct >= 60)   return { label: 'Getting there', sub: 'Quiz again to lock it in.',       celebrate: null      }
  return             { label: 'Keep at it',  sub: 'Review the cards, then try again.', celebrate: null      }
}

// ─── Shared components ────────────────────────────────────────────────────────

function ProgressBar({ value, accent }: { value: number; accent: string }) {
  return (
    <div style={{ height: '2px', background: 'var(--color-border-tertiary)', borderRadius: '2px', overflow: 'hidden', margin: '0 24px' }}>
      <div style={{ height: '100%', width: `${value}%`, background: accent, transition: 'width 0.35s ease', borderRadius: '2px' }} />
    </div>
  )
}

function BackBtn({ onClick, label = 'Back' }: { onClick: () => void; label?: string }) {
  return (
    <button onClick={onClick} style={{
      background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px',
      color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center',
      gap: '4px', padding: '4px 0', fontFamily: 'var(--font-sans)',
    }}>
      ← {label}
    </button>
  )
}

function PostLink({ card }: { card: FlashCard }) {
  if (!card.postUrl) return null
  return (
    <a href={card.postUrl} target="_blank" rel="noopener noreferrer" style={{
      display: 'inline-flex', alignItems: 'center', gap: '4px',
      fontSize: '12px', color: 'var(--color-text-secondary)', textDecoration: 'none',
      borderBottom: '0.5px solid var(--color-border-secondary)', paddingBottom: '1px', lineHeight: 1,
    }}>
      Read Post {card.postNumber}: {card.postTitle} →
    </a>
  )
}

// ─── Home screen ──────────────────────────────────────────────────────────────

function HomeScreen({ decks, sessionStats, onDeck }: {
  decks: Deck[]; sessionStats: SessionStats; onDeck: (d: Deck) => void
}) {
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
          <RedefinedHeroCard
            deck={redefined}
            stats={sessionStats[redefined.id]}
            postedCount={postedCount}
            totalCount={totalCount}
            onClick={() => onDeck(redefined)}
          />
        </div>
      )}

      <p style={{ fontSize: '11px', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-tertiary)', margin: '0 0 10px' }}>
        Go deeper
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
        {others.map(d => (
          <SmallDeckCard key={d.id} deck={d} stats={sessionStats[d.id]} onClick={() => onDeck(d)} />
        ))}
      </div>
    </div>
  )
}

function RedefinedHeroCard({ deck, stats, postedCount, totalCount, onClick }: {
  deck: Deck; stats: DeckStats | undefined; postedCount: number; totalCount: number; onClick: () => void
}) {
  return (
    <div onClick={onClick} style={{
      background: deck.colorBg, border: `0.5px solid ${deck.colorAccent}33`,
      borderRadius: 'var(--border-radius-lg)', padding: '20px', cursor: 'pointer',
      transition: 'opacity 0.15s',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div>
          <p style={{ fontSize: '11px', fontWeight: '500', letterSpacing: '0.06em', textTransform: 'uppercase', color: deck.colorText, opacity: 0.6, margin: '0 0 4px' }}>
            LinkedIn Series
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

      <p style={{ fontSize: '13px', color: deck.colorText, opacity: 0.75, lineHeight: '1.5', margin: '0 0 14px' }}>
        {deck.description}
      </p>

      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
        {deck.cards.filter(c => c.status === 'posted').slice(-3).map(c => (
          <span key={c.term} style={{
            fontSize: '12px', color: deck.colorText,
            background: `${deck.colorAccent}14`, border: `0.5px solid ${deck.colorAccent}22`,
            padding: '3px 8px', borderRadius: '4px',
          }}>
            {c.term}
          </span>
        ))}
        {deck.cards.filter(c => c.status !== 'posted').length > 0 && (
          <span style={{
            fontSize: '12px', color: deck.colorText, opacity: 0.45,
            padding: '3px 8px', borderRadius: '4px', border: `0.5px dashed ${deck.colorAccent}33`,
          }}>
            +{deck.cards.filter(c => c.status !== 'posted').length} coming
          </span>
        )}
      </div>

      {stats?.lastQuizScore != null && (
        <div style={{ marginBottom: '12px', fontSize: '12px', color: deck.colorText, opacity: 0.65 }}>
          Last quiz: {stats.lastQuizScore}/{stats.lastQuizTotal} · {Math.round((stats.lastQuizScore / stats.lastQuizTotal) * 100)}%
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px', fontWeight: '500', color: deck.colorText }}>
        <span>Open deck</span>
        <span style={{ opacity: 0.6 }}>→</span>
      </div>
    </div>
  )
}

function SmallDeckCard({ deck, stats, onClick }: {
  deck: Deck; stats: DeckStats | undefined; onClick: () => void
}) {
  return (
    <div onClick={onClick} style={{
      background: 'var(--color-background-primary)', border: '0.5px solid var(--color-border-tertiary)',
      borderRadius: 'var(--border-radius-lg)', padding: '16px',
      display: 'flex', flexDirection: 'column', gap: '8px', cursor: 'pointer',
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>{deck.cards.length} cards</span>
        {stats?.lastQuizScore != null && (
          <span style={{ fontSize: '11px', color: deck.colorText, background: deck.colorBg, padding: '2px 7px', borderRadius: '4px' }}>
            {Math.round((stats.lastQuizScore / stats.lastQuizTotal) * 100)}%
          </span>
        )}
      </div>
    </div>
  )
}

// ─── Deck detail screen ───────────────────────────────────────────────────────

function DeckScreen({ deck, stats, onStart, onHome }: {
  deck: Deck; stats: DeckStats | undefined; onStart: (d: Deck, m: Mode) => void; onHome: () => void
}) {
  const isRedefined = deck.id === 'redefined'
  const visibleCards = deck.cards.filter(c => !c.status || c.status === 'posted' || c.status === 'written')
  const comingCards = deck.cards.filter(c => c.status === 'draft')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '580px' }}>
      <div style={{ background: deck.colorBg, borderBottom: `0.5px solid ${deck.colorAccent}22`, padding: '16px 24px 24px' }}>
        <div style={{ marginBottom: '16px' }}>
          <BackBtn onClick={onHome} label="All decks" />
        </div>

        {isRedefined && (
          <p style={{ fontSize: '11px', fontWeight: '500', letterSpacing: '0.06em', textTransform: 'uppercase', color: deck.colorText, opacity: 0.6, margin: '0 0 4px' }}>
            LinkedIn Series
          </p>
        )}
        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: '28px', fontWeight: '500',
          color: deck.colorText, letterSpacing: '-0.02em', margin: '0 0 6px', lineHeight: 1.1,
        }}>
          {deck.title}
        </h2>
        <p style={{ fontSize: '13px', color: deck.colorText, opacity: 0.7, margin: '0 0 20px', lineHeight: '1.5' }}>
          {deck.description}
        </p>

        {stats?.lastQuizScore != null && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            background: `${deck.colorAccent}14`, border: `0.5px solid ${deck.colorAccent}22`,
            borderRadius: '6px', padding: '8px 12px', marginBottom: '16px',
          }}>
            <div>
              <div style={{ fontSize: '18px', fontWeight: '500', color: deck.colorText, letterSpacing: '-0.02em', lineHeight: 1 }}>
                {Math.round((stats.lastQuizScore / stats.lastQuizTotal) * 100)}%
              </div>
              <div style={{ fontSize: '11px', color: deck.colorText, opacity: 0.55, marginTop: '2px' }}>
                last quiz · {stats.lastQuizScore}/{stats.lastQuizTotal}
              </div>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => onStart(deck, 'learn')} style={{
            flex: 1, padding: '11px', background: deck.colorAccent, color: '#fff',
            border: 'none', borderRadius: 'var(--border-radius-md)', fontSize: '14px',
            fontWeight: '500', cursor: 'pointer', fontFamily: 'var(--font-sans)',
          }}>
            Learn
          </button>
          <button onClick={() => onStart(deck, 'quiz')} style={{
            flex: 1, padding: '11px', background: 'none', color: deck.colorText,
            border: `0.5px solid ${deck.colorAccent}55`, borderRadius: 'var(--border-radius-md)',
            fontSize: '14px', cursor: 'pointer', fontFamily: 'var(--font-sans)',
          }}>
            Quiz
          </button>
        </div>
      </div>

      <div style={{ flex: 1, padding: '20px 24px', overflowY: 'auto' }}>
        <p style={{ fontSize: '11px', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-tertiary)', margin: '0 0 12px' }}>
          {visibleCards.length} cards
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          {visibleCards.map((card, i) => (
            <div key={card.term} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 0',
              borderBottom: i < visibleCards.length - 1 ? '0.5px solid var(--color-border-tertiary)' : 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {isRedefined && card.postNumber && (
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-text-tertiary)', minWidth: '28px' }}>
                    {card.postNumber}
                  </span>
                )}
                <span style={{ fontSize: '14px', color: 'var(--color-text-primary)' }}>{card.term}</span>
                {card.abbr && (
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                    {card.abbr}
                  </span>
                )}
              </div>
              {card.status === 'written' && (
                <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', fontStyle: 'italic' }}>Soon</span>
              )}
              {card.status === 'posted' && card.postUrl && (
                <span style={{ fontSize: '11px', color: deck.colorText, opacity: 0.6 }}>↗</span>
              )}
            </div>
          ))}
        </div>
        {comingCards.length > 0 && (
          <p style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginTop: '16px', fontStyle: 'italic' }}>
            +{comingCards.length} more in draft
          </p>
        )}
      </div>
    </div>
  )
}

// ─── Learn screen ─────────────────────────────────────────────────────────────

function LearnScreen({ deck, cards, cardIndex, onNext, onDeck }: {
  deck: Deck; cards: FlashCard[]; cardIndex: number; onNext: () => void; onDeck: () => void
}) {
  const [flipped, setFlipped] = useState(false)
  const card = cards[cardIndex]
  const progress = ((cardIndex + 1) / cards.length) * 100
  const isRedefined = deck.id === 'redefined'

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
        <BackBtn onClick={onDeck} label={deck.title} />
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
            width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transition: 'transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
          }}>
            {/* Front */}
            <div style={{
              position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
              background: 'var(--color-background-primary)', border: '0.5px solid var(--color-border-tertiary)',
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
                textAlign: 'center', color: 'var(--color-text-primary)', letterSpacing: '-0.02em',
                lineHeight: 1.2, margin: 0,
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
              <span style={{ marginTop: '12px', fontSize: '12px', color: 'var(--color-text-tertiary)' }}>
                Tap to reveal · Space to flip
              </span>
            </div>
            {/* Back */}
            <div style={{
              position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              background: deck.colorBg, border: `0.5px solid ${deck.colorAccent}44`,
              borderRadius: 'var(--border-radius-lg)',
              display: 'flex', flexDirection: 'column', padding: '22px 24px', gap: '10px', overflowY: 'auto',
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

function QuizScreen({ deck, cards, cardIndex, score, onAnswer, onNext, onDeck }: {
  deck: Deck; cards: FlashCard[]; cardIndex: number; score: number
  onAnswer: (correct: boolean) => void; onNext: () => void; onDeck: () => void
}) {
  const card = cards[cardIndex]
  const [options, setOptions] = useState<string[]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const [scoreAnim, setScoreAnim] = useState(false)
  const progress = ((cardIndex + 1) / cards.length) * 100

  useEffect(() => { setOptions(genOptions(card, cards)); setSelected(null) }, [cardIndex])

  function handleSelect(opt: string) {
    if (selected) return
    setSelected(opt)
    const correct = opt === card.term
    onAnswer(correct)
    if (correct) {
      fireConfetti('correct', deck.colorAccent)
      setScoreAnim(true)
      setTimeout(() => setScoreAnim(false), 500)
    }
  }

  function optStyle(opt: string): React.CSSProperties {
    const base: React.CSSProperties = {
      width: '100%', padding: '13px 16px', textAlign: 'left',
      border: '0.5px solid var(--color-border-secondary)',
      borderRadius: 'var(--border-radius-md)', fontSize: '14px',
      cursor: selected ? 'default' : 'pointer',
      background: 'var(--color-background-primary)', color: 'var(--color-text-primary)',
      transition: 'all 0.15s', lineHeight: '1.4', fontFamily: 'var(--font-sans)',
    }
    if (!selected) return base
    if (opt === card.term) return { ...base, background: '#E1F5EE', border: '0.5px solid #0F6E56', color: '#085041' }
    if (opt === selected) return { ...base, background: '#FAECE7', border: '0.5px solid #993C1D', color: '#712B13' }
    return { ...base, opacity: 0.32 }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '580px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px 12px' }}>
        <BackBtn onClick={onDeck} label={deck.title} />
        <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{cardIndex + 1} / {cards.length}</span>
        <span style={{
          fontSize: '12px', fontWeight: '500', color: deck.colorText, background: deck.colorBg,
          padding: '3px 9px', borderRadius: '6px',
          transition: 'transform 0.2s, background 0.2s',
          transform: scoreAnim ? 'scale(1.2)' : 'scale(1)',
          display: 'inline-block',
        }}>
          {score} correct
        </span>
      </div>
      <ProgressBar value={progress} accent={deck.colorAccent} />

      <div style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ background: 'var(--color-background-secondary)', borderRadius: 'var(--border-radius-lg)', padding: '20px', border: '0.5px solid var(--color-border-tertiary)' }}>
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
          <div style={{ padding: '11px 14px', background: 'var(--color-background-secondary)', borderRadius: 'var(--border-radius-md)', border: '0.5px solid var(--color-border-tertiary)' }}>
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

function ResultsScreen({ deck, total, score, mode, onDeck, onRetry, onSwitchMode }: {
  deck: Deck; total: number; score: number; mode: Mode
  onDeck: () => void; onRetry: () => void; onSwitchMode: () => void
}) {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0
  const isLearn = mode === 'learn'
  const tier = isLearn ? null : getResultTier(pct)
  const firedRef = useRef<boolean>(false)

  useEffect(() => {
    if (!isLearn && tier?.celebrate && !firedRef.current) {
      firedRef.current = true
      setTimeout(() => fireConfetti(tier.celebrate!, deck.colorAccent), 300)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{ padding: '40px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', minHeight: '500px' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontFamily: 'var(--font-serif)', fontSize: '80px', fontWeight: '500',
          color: 'var(--color-text-primary)', lineHeight: 1, letterSpacing: '-0.03em',
          transition: 'transform 0.4s',
        }}>
          {isLearn ? '✓' : `${pct}%`}
        </div>
        <div style={{ fontSize: '16px', fontWeight: '500', color: 'var(--color-text-primary)', marginTop: '8px' }}>
          {isLearn ? 'Deck complete' : tier?.label}
        </div>
        <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
          {isLearn ? `All ${total} cards reviewed.` : tier?.sub}
        </div>
      </div>

      <div style={{ width: '100%', background: 'var(--color-background-secondary)', borderRadius: 'var(--border-radius-lg)', padding: '20px', border: '0.5px solid var(--color-border-tertiary)' }}>
        <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          {deck.title} · {isLearn ? 'Learn' : 'Quiz'} mode
        </div>
        {isLearn ? (
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: 0 }}>
            {deck.id === 'redefined'
              ? 'Now test yourself — or head to the series to read the posts.'
              : 'Switch to Quiz mode to test your recall.'}
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
        <button onClick={onDeck} style={{
          flex: 1, padding: '11px', background: 'none',
          border: '0.5px solid var(--color-border-secondary)',
          borderRadius: 'var(--border-radius-md)', fontSize: '14px',
          cursor: 'pointer', color: 'var(--color-text-primary)', fontFamily: 'var(--font-sans)',
        }}>
          Back to deck
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
  const [sessionStats, setSessionStats] = useState<SessionStats>({})

  const cards = deck
    ? deck.cards.filter(c => !c.status || c.status === 'posted' || c.status === 'written')
    : []

  function goHome() { setScreen('home') }
  function goDeck(d: Deck) { setDeck(d); setScreen('deck') }

  function start(d: Deck, m: Mode) {
    setDeck(d); setMode(m); setCardIndex(0); setScore(0); setScreen(m)
  }

  function next() {
    if (cardIndex + 1 >= cards.length) setScreen('results')
    else setCardIndex(i => i + 1)
  }

  function recordScore(finalScore: number) {
    if (mode === 'quiz' && deck) {
      setSessionStats(prev => ({
        ...prev,
        [deck.id]: { lastQuizScore: finalScore, lastQuizTotal: cards.length },
      }))
    }
  }

  function handleNext() {
    const isLast = cardIndex + 1 >= cards.length
    if (isLast && mode === 'quiz') recordScore(score)
    next()
  }

  function handleAnswer(correct: boolean) {
    if (correct) setScore(s => s + 1)
  }

  if (screen === 'home') return <HomeScreen decks={decks} sessionStats={sessionStats} onDeck={goDeck} />
  if (screen === 'deck' && deck) return <DeckScreen deck={deck} stats={sessionStats[deck.id]} onStart={start} onHome={goHome} />
  if (screen === 'learn' && deck) return <LearnScreen deck={deck} cards={cards} cardIndex={cardIndex} onNext={handleNext} onDeck={() => goDeck(deck)} />
  if (screen === 'quiz' && deck) return <QuizScreen deck={deck} cards={cards} cardIndex={cardIndex} score={score} onAnswer={handleAnswer} onNext={handleNext} onDeck={() => goDeck(deck)} />
  if (screen === 'results' && deck) return (
    <ResultsScreen
      deck={deck}
      total={cards.length}
      score={score}
      mode={mode}
      onDeck={() => goDeck(deck)}
      onRetry={() => start(deck, mode)}
      onSwitchMode={() => start(deck, mode === 'learn' ? 'quiz' : 'learn')}
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
