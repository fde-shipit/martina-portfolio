# Add a new Redefined by AI post

Paste the Substack URL below and run this prompt in Claude Code.

```
[PASTE SUBSTACK URL HERE]
```

---

## Instructions for Claude Code

A new Redefined by AI post has been published at the URL above. Update the entire site.

### Step 1 — Fetch and parse the post

Fetch the URL. Extract:

- **number** — the post number in the series (e.g. `09`). Infer from the URL slug or page heading. Zero-pad to two digits.
- **term** — the word being redefined (e.g. `Temperature`). One word, no trailing punctuation.
- **hook** — one sentence. The sharpest line in the post. Not the Substack subtitle. Read the post and find the sentence that earns a reader. No em dashes, no en dashes. Use commas or full stops instead.
- **url** — the canonical Substack URL exactly as provided.
- **card back** — 3 to 4 sentences written in Martina's voice (see voice rules below).

**Voice rules for card back:**
- Active voice throughout. No passive constructions.
- No em dashes, no en dashes. Use commas or full stops.
- No hedging. No "it can", "it might", "it could".
- Do not start a sentence with "I".
- Lead with the punchline. Put the most concrete or surprising fact first.
- High information density. Every sentence earns its place.
- 3 to 4 sentences maximum.

**Example (Token):**
> The basic unit a model reads. Not a word. A deliberate chunk of text. A word, part of a word, sometimes just punctuation. The model never sees the sentence. It sees the chunks, maps them into vectors.

---

### Step 2 — Update `lib/substack.ts`

File: `lib/substack.ts`

Add one entry to the end of the `POSTS` array, before the closing `]`:

```ts
{
  week: '[NUMBER]',
  title: 'Redefined by AI [NUMBER]: [Term]',
  link: '[URL]',
  hook: '[hook]',
},
```

No HTML entities. Use literal apostrophes. No em dashes or en dashes.

---

### Step 3 — Update `content/data.ts`

File: `content/data.ts`

**3a. Add an entry to `redefinedByAi.entries`**

Find the `entries` array inside `redefinedByAi`. It is typed as `RbaEntry[]`:

```ts
export type RbaEntry = {
  title: string
  status: RbaStatus           // 'posted' | 'written' | 'draft' | 'todo'
  hook: string
  href?: string
  card?: { front: string; back: string }
}
```

Add the new entry at the correct position in the posted sequence (after the last `status: 'posted'` entry, before `status: 'written'` entries):

```ts
{
  title: '[Term].',
  status: 'posted',
  hook: '[hook]',
  href: '[URL]',
  card: {
    front: '[Term].',
    back: '[card back — 3 to 4 sentences, voice rules above]',
  },
},
```

**3b. Update `totalCards`**

`totalCards` must equal the count of entries with `status: 'posted'`. Increment it by 1.

Current value is visible in the `redefinedByAi` object:

```ts
export const redefinedByAi: { entries: RbaEntry[]; deckHref: string; totalCards: number } = {
  ...
  totalCards: [CURRENT VALUE],   // increment this
}
```

---

### Step 4 — Update `content/flashcards.ts`

File: `content/flashcards.ts`

Find `REDEFINED_POSTS: FlashCard[]`. The `FlashCard` shape is:

```ts
{
  term: string           // the word, no period
  postNumber: string     // zero-padded, e.g. "09"
  postTitle: string      // e.g. "Temperature"
  status: PostStatus     // set to "posted"
  postUrl: string        // the Substack URL
  definition: string     // 2-3 sentences in Martina's voice (same voice rules)
  example?: string       // one concrete anchor: a tool, a resource, or a "Worth knowing" line
}
```

If the term already exists with `status: 'written'` or `status: 'draft'`, update that entry:
- Set `status` to `"posted"`
- Add `postUrl`
- Confirm `postNumber` matches the series number
- Confirm `definition` is accurate to the post — rewrite if needed

If the term does not yet exist, add a new entry at the correct position (after the last posted entry, before written/draft entries):

```ts
{
  term: '[Term]',
  postNumber: '[NUMBER]',
  postTitle: '[Term]',
  status: 'posted',
  postUrl: '[URL]',
  definition: '[2-3 sentences, voice rules above]',
  example: '[one concrete anchor]',
},
```

---

### Step 5 — Update `components/RedefinedByAi.tsx`

File: `components/RedefinedByAi.tsx`

Find the `DECK_TERMS` array. It drives the animated card stack on the `/redefined-by-ai` page.

The shape of each entry:

```ts
{ num: string; card: string; term: string; def: JSX.Element }
```

- `num` — zero-padded post number, e.g. `'09'`
- `card` — `'[N] / [totalCards]'`, e.g. `'09 / 09'` — update the denominator on all existing entries if `totalCards` changed
- `term` — the word with trailing period, e.g. `'Temperature.'`
- `def` — JSX. One sentence. Wrap the most striking phrase in `<em>`. No em dashes, no en dashes.

Add the new entry. Update the `card` denominator on all existing entries to match the new `totalCards`.

Example:
```ts
{ num: '09', card: '09 / 09', term: 'Temperature.', def: <>Same model, <em>different mood.</em></> },
```

---

### Step 6 — Final checks

Before committing, verify:

1. No raw HTML entities anywhere in updated content (`&#8217;`, `&amp;`, `&nbsp;`, etc.). Use literal characters.
2. No em dashes (`—`) or en dashes (`–`) in any hook, card back, definition, or `def` JSX.
3. `totalCards` in `data.ts` equals the number of `status: 'posted'` entries.
4. The `card` denominator in all `DECK_TERMS` entries matches `totalCards`.
5. `postNumber` in `flashcards.ts` is sequential and zero-padded.
6. `week` in `lib/substack.ts` is sequential and zero-padded.
7. The new entry appears at the correct position in all four arrays.

Run `npm run build`. Fix any TypeScript errors before committing.

---

### Step 7 — Commit and deploy

```bash
git checkout dev
git add content/data.ts content/flashcards.ts components/RedefinedByAi.tsx lib/substack.ts
git commit -m "Add Redefined by AI [NUMBER]: [Term]"
git checkout master
git merge dev
git push origin master
```

Vercel deploys automatically on push to master.

---

### Files changed summary

| File | What changes |
|---|---|
| `lib/substack.ts` | New entry appended to `POSTS` array |
| `content/data.ts` | New entry in `redefinedByAi.entries`; `totalCards` incremented |
| `content/flashcards.ts` | New entry in `REDEFINED_POSTS` (or existing entry updated to `posted`) |
| `components/RedefinedByAi.tsx` | New entry in `DECK_TERMS`; card denominators updated |

`app/builds/page.tsx`, `app/redefined-by-ai/page.tsx`, `app/flashcards/page.tsx`, and `components/Writing.tsx` do not need edits — they read from the files above automatically.
