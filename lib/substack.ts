export interface SubstackPost {
  title: string
  link: string
  hook: string
  week: string
}

// Static source of truth — hooks are curated, not pulled from RSS meta descriptions.
// To add a new post: append an entry and increment the week number.
const POSTS: SubstackPost[] = [
  {
    week: '01',
    title: 'Redefined by AI 01: Model',
    link: 'https://martinaedwards.substack.com/p/model',
    hook: 'Same spelling. New job. Nobody sent a fax.',
  },
  {
    week: '02',
    title: 'Redefined by AI 02: Memory',
    link: 'https://martinaedwards.substack.com/p/memory',
    hook: 'Three things make AI feel like it remembers. None of them are memory.',
  },
  {
    week: '03',
    title: 'Redefined by AI 03: Prompt Injection',
    link: 'https://martinaedwards.substack.com/p/prompt-injection',
    hook: 'Invisible to you. Not to your model.',
  },
  {
    week: '04',
    title: 'Redefined by AI 04: Training',
    link: 'https://martinaedwards.substack.com/p/training',
    hook: "The best trainer you've ever had stopped learning the day it launched.",
  },
  {
    week: '05',
    title: 'Redefined by AI 05: Forest',
    link: 'https://martinaedwards.substack.com/p/redefined-by-ai-05-forest',
    hook: 'A forest is not a forest. Not in IT.',
  },
  {
    week: '06',
    title: 'Redefined by AI 06: Mythos',
    link: 'https://martinaedwards.substack.com/p/redefined-by-ai-06-mythos',
    hook: 'In seven weeks, it found over 2,000 unknown vulnerabilities.',
  },
  {
    week: '07',
    title: 'Redefined by AI 07: Token',
    link: 'https://martinaedwards.substack.com/p/redefined-by-ai-06-token',
    hook: "Worth knowing tomorrow's bill.",
  },
  {
    week: '08',
    title: 'Redefined by AI 08: Vector',
    link: 'https://martinaedwards.substack.com/p/redefined-by-ai-08-vector',
    hook: 'How meaning becomes math.',
  },
]

export async function getSubstackPosts(): Promise<SubstackPost[]> {
  return POSTS
}
