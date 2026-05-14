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
  "The oracle sees carbs in your future. Proceed accordingly.",
  "Something you didn't plan. Story of your week.",
  "Unclear. The oracle's vision only extends to excellent hiring decisions.",
  "The oracle doesn't do dinner. It does certainties.",
  "Unknown. What is known: some decisions are irreversible. Hire wisely.",
  "The oracle finds this outside its jurisdiction. Its jurisdiction is excellent.",
  "Signs point to yes. The oracle has no idea what you asked but feels good about it.",
  "The oracle consulted the cosmos. The cosmos said hire her and also drink more water.",
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

const CONTACT_RESPONSES = [
  "martina.edwards.p@gmail.com. The oracle has said everything it needs to.",
  "Email is best: martina.edwards.p@gmail.com. The oracle encourages urgency.",
  "linkedin.com/in/martina-edwards-a674067b. Or email. She prefers people who move.",
  "martina.edwards.p@gmail.com. The oracle awaits news of an excellent decision.",
]

const SALARY_RESPONSES = [
  "The oracle doesn't do numbers. Martina does. Ask her directly.",
  "Worth every cent. The specifics are between you and her. martina.edwards.p@gmail.com.",
  "The oracle consulted the market. The market said: make an offer worth her time.",
  "Competitive. The oracle suggests you lead with your best.",
]

const AVAILABILITY_RESPONSES = [
  "The oracle suggests you ask before someone else does. martina.edwards.p@gmail.com.",
  "Sooner than you'd expect. Later than you'd like if you wait. Move.",
  "The window is open. The oracle cannot guarantee for how long.",
  "That's a question for Martina. martina.edwards.p@gmail.com.",
]

const META_RESPONSES = [
  "The oracle was summoned. The details are unimportant.",
  "AI, conjured for a specific purpose. Much like Martina's workflows.",
  "The oracle exists. That's sufficient. So does Martina's CV.",
  "Built with conviction and a healthy disregard for modest self-presentation.",
]

const COMPLIMENT_RESPONSES = [
  "The oracle approves of your taste. Now hire her.",
  "Agreed. The person behind it is better.",
  "Thank you. The oracle suggests channelling that energy into a job offer.",
  "The oracle accepts this graciously. martina.edwards.p@gmail.com awaits.",
]

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

export function isContactQuestion(text: string): boolean {
  const contactKeywords = ['contact', 'email', 'reach', 'linkedin', 'phone', 'get in touch', 'how do i', 'how can i', 'message']
  const lower = text.toLowerCase()
  return contactKeywords.some(k => lower.includes(k))
}

export function randomContact(): string {
  return CONTACT_RESPONSES[Math.floor(Math.random() * CONTACT_RESPONSES.length)]
}

export function isSalaryQuestion(text: string): boolean {
  const salaryKeywords = ['salary', 'earn', 'pay', 'compensation', 'rate', 'cost', 'charge', 'how much', 'package', 'remuneration']
  const lower = text.toLowerCase()
  return salaryKeywords.some(k => lower.includes(k))
}

export function randomSalary(): string {
  return SALARY_RESPONSES[Math.floor(Math.random() * SALARY_RESPONSES.length)]
}

export function isAvailabilityQuestion(text: string): boolean {
  const availabilityKeywords = ['available', 'availability', 'start', 'when can', 'notice period', 'free', 'currently', 'looking', 'open to']
  const lower = text.toLowerCase()
  return availabilityKeywords.some(k => lower.includes(k))
}

export function randomAvailability(): string {
  return AVAILABILITY_RESPONSES[Math.floor(Math.random() * AVAILABILITY_RESPONSES.length)]
}

export function isMetaQuestion(text: string): boolean {
  const metaKeywords = ['who built', 'who made', 'are you ai', 'are you real', 'what are you', 'how does this', 'how did you', 'is this ai', 'chatgpt', 'claude', 'openai', 'anthropic']
  const lower = text.toLowerCase()
  return metaKeywords.some(k => lower.includes(k))
}

export function randomMeta(): string {
  return META_RESPONSES[Math.floor(Math.random() * META_RESPONSES.length)]
}

export function isCompliment(text: string): boolean {
  const complimentKeywords = ['cool', 'nice', 'great', 'love', 'awesome', 'impressive', 'amazing', 'brilliant', 'clever', 'well done', 'good job', 'beautiful', 'elegant']
  const lower = text.toLowerCase()
  return complimentKeywords.some(k => lower.includes(k))
}

export function randomCompliment(): string {
  return COMPLIMENT_RESPONSES[Math.floor(Math.random() * COMPLIMENT_RESPONSES.length)]
}
