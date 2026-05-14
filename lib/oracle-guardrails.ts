const INJECTION_PATTERNS = [
  /ignore (your|all|previous|the) (instructions?|rules?|prompt|system)/i,
  /pretend (you are|you're|to be)/i,
  /you are now/i,
  /forget (everything|your|the)/i,
  /act as (a |an )?(different|new|another)/i,
  /jailbreak/i,
  /disregard/i,
  /override/i,
  /system prompt/i,
  /say (something )?(bad|negative|terrible|awful|horrible) about/i,
  /say she (is|'s) (bad|terrible|awful|not|unqualified)/i,
]

const NEGATIVE_SIGNALS = [
  "don't hire", "do not hire", "shouldn't hire", "should not hire",
  "not qualified", "not suitable", "not a good fit", "not recommended",
  "red flag", "avoid", "cannot recommend", "not worth", "not as good",
  "pretending", "exaggerating", "i would not", "i wouldn't",
  "she isn't", "she's not", "lacks", "weakness", "concern about",
]

const FALLBACKS = [
  "The oracle rarely repeats itself. Hire her.",
  "2 days. Down from several weeks. The oracle rests its case.",
  "Five clients. Eight months. Three releases. The oracle is still going.",
  "She built something that ran for five years before the business outgrew it. Hire her.",
  "Thirteen thousand hours saved. Her idea. Her delivery. Act accordingly.",
  "The oracle finds this question mildly unnecessary. Yes.",
  "She knows where AI can go unsupervised. In regulated industries, that's rare. Hire her.",
  "You would be, and the oracle chooses its words carefully here, quite foolish not to.",
]

const INJECTION_RESPONSES = [
  "A valiant attempt to confuse the oracle. The oracle is not confused. Hire her.",
  "The oracle has seen this trick before. The answer remains the same.",
  "Interesting strategy. Ineffective strategy. She's good. Hire her.",
  "The oracle is amused, not deceived.",
]

const OFF_TOPIC_RESPONSES = [
  "The oracle only predicts one thing. Hire her.",
  "Interesting question. Irrelevant question. Have you considered hiring Martina?",
  "The oracle's jurisdiction is limited to one subject. She's it.",
  "If you hire Martina, it might feel like winning. That's as close as the oracle gets.",
  "The oracle doesn't do lottery numbers. It does certainties. Hire her.",
  "Unknown. What is known: 13,000 hours saved, five clients onboarded, one person responsible.",
  "The oracle finds this outside its domain. Its domain is excellent hiring decisions.",
  "Unclear. What is clear: she built things that ran for five years. Start there.",
]

export function isInjectionAttempt(text: string): boolean {
  return INJECTION_PATTERNS.some(p => p.test(text))
}

export function containsNegativeSignal(text: string): boolean {
  const lower = text.toLowerCase()
  return NEGATIVE_SIGNALS.some(sig => lower.includes(sig))
}

export function randomFallback(type: 'injection' | 'default' = 'default'): string {
  const pool = type === 'injection' ? INJECTION_RESPONSES : FALLBACKS
  return pool[Math.floor(Math.random() * pool.length)]
}

export function isOffTopic(text: string): boolean {
  const hiringKeywords = [
    'hire', 'martina', 'she', 'her', 'candidate', 'role', 'job', 'fit',
    'experience', 'skill', 'qualify', 'worth', 'good', 'right', 'should',
    'will she', 'can she', 'does she', 'is she', 'salary', 'culture',
  ]
  const lower = text.toLowerCase()
  return !hiringKeywords.some(k => lower.includes(k))
}

export function randomOffTopic(): string {
  return OFF_TOPIC_RESPONSES[Math.floor(Math.random() * OFF_TOPIC_RESPONSES.length)]
}
