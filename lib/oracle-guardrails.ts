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
  "1.5 days. Down from several weeks. The oracle rests its case.",
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
