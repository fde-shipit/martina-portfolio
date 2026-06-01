# Martina Edwards Portfolio — Design Styleguide

Paste this document into Claude when generating new pages or components for this site. It is the single source of truth for visual design decisions.

---

## 1. Design Principles

- **Editorial restraint.** White space does more work than decoration. If something can be removed, remove it.
- **Hierarchy by typeface.** Cormorant for "what matters" (headlines, pull quotes, big numbers), DM Mono for "metadata" (labels, tags, nav), DM Sans for "readable body."
- **Hairlines as structure.** `1px solid var(--rule)` is the primary divider and card border. No shadows, no rounded corners, no gradients (except on inverted pages).
- **Accent used sparingly.** Teal (`--accent`) is dominant but still a highlight. Raspberry (`--accent-rare`) is reserved exclusively for the Oracle and "broke / refused" states.
- **Confidence without clutter.** The site argues through copy and metrics, not through visual noise.

---

## 2. Colour Tokens

All colour usage must reference these CSS variables. Never hardcode hex values on light-mode pages.

```css
/* Light mode (default) */
--paper:       #EFF0F2;                  /* page background */
--paper-2:     #F7F7F5;                  /* inset card / panel background */
--ink:         #1C2024;                  /* primary text, strongest headings */
--ink-soft:    #3A424B;                  /* secondary text — italic body, softer statements */
--warm:        #5A6470;                  /* labels, tertiary text, body support copy */
--pale:        #E2E4E8;                  /* hover surface */
--rule:        rgba(28, 32, 36, 0.12);   /* hairline divider — default */
--rule-strong: rgba(28, 32, 36, 0.24);   /* emphasized divider, tag borders on hover */

--accent:      #308695;                  /* teal — links, active states, metrics, "shipped" */
--accent-rare: #D45769;                  /* raspberry — Oracle only, "refused / broke" states */
```

### When to use each colour

| Token | Use |
|---|---|
| `--paper` | Page background. Never put it on text. |
| `--paper-2` | Inset panels, the Ball container, the Oracle's guardrails card. |
| `--ink` | All primary headings, active nav items, `<strong>` in body. |
| `--ink-soft` | Italic supporting copy, the hero deck's `<p>` italic variant. |
| `--warm` | Nav links, section labels, body support copy, meta text. |
| `--rule` | Every hairline. Grid background trick (see Cards). |
| `--accent` | Section label colour when section is "positive/shipped", links, metrics, tag text, the progress bar, the cursor dot, the teal pull-quote rule. |
| `--accent-rare` | Oracle branding, "Consult the Oracle" CTA, any "refused/broke" label. Never mix it with accent on the same component. |

### Inverted palette (dark pages only)

The After Hours case study page inverts the palette. Use these scoped overrides inside a `.ah-page` or equivalent wrapper:

```css
.dark-page {
  --ink:          #1C2024;           /* now the background */
  --cream:        #EFF0F2;           /* now the primary text */
  --cream-soft:   rgba(239,240,242,.62);
  --cream-mute:   rgba(239,240,242,.32);
  --cream-dim:    rgba(239,240,242,.14);
  --accent:       #52B0BD;           /* lightened teal for dark bg */
  --accent-rare:  #E6798A;           /* lightened raspberry for dark bg */
  --rule:         rgba(239,240,242,.10);
  --rule-strong:  rgba(239,240,242,.22);

  background: var(--ink);
  color: var(--cream);
}
```

---

## 3. Typography

### Font families

```
Cormorant Garamond → var(--font-cormorant)  — display only (≥ 2rem / 32px)
DM Sans            → var(--font-dm-sans)    — body default
DM Mono            → var(--font-dm-mono)    — labels, tags, nav, CTAs
```

**Rule:** Cormorant is only used at display size (≥ 2rem). Anything smaller stays in DM Sans so it reads crisp on screen.

### Type scale

| Role | Family | Weight | Size | Line-height | Letter-spacing |
|---|---|---|---|---|---|
| Page H1 (hero) | Cormorant | 300 | `clamp(1.9rem, 3.2vw, 2.8rem)` | 1.15 | -0.015em |
| Page H1 (feature, e.g. After Hours) | Cormorant | 300 | `clamp(3rem, 8.5vw, 7.6rem)` | 0.94 | -0.025em |
| Section H2 | Cormorant | 300 | `clamp(2rem, 4vw, 3.2rem)` | 1.0 | — |
| Pull quote / blockquote | Cormorant | 300 italic | `clamp(1.8rem, 4.5vw, 3.2rem)` | 1.15 | -0.01em |
| Big metric number (work cards) | Cormorant | 300 | `3.4rem` | 1.0 | -0.02em |
| Card title (serif variant) | Cormorant | 300 | `1.4–1.6rem` | 1.2 | — |
| Subheading / card title (sans) | DM Sans | 500 | `0.95–1.05rem` | 1.3 | — |
| Body text | DM Sans | 300 | `1rem` | 1.6 | — |
| Body support / deck | DM Sans | 300 | `0.95–1rem` | 1.6 | — |
| Body small | DM Sans | 300 | `0.85–0.9rem` | 1.5–1.55 | — |
| Mono label / eyebrow | DM Mono | 400 | `0.62–0.7rem` | — | 0.12–0.16em |
| Tag / inline badge | DM Mono | 400 | `0.55rem` | — | 0.14em |

### CSS utility classes

```css
/* Display headings — apply to any element ≥ 2rem */
.font-display {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-weight: 300;
}

/* Mono labels — nav links, eyebrows, tags, CTAs */
.font-mono-label {
  font-family: 'DM Mono', monospace;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.7rem;
}
```

### Typographic conventions

- `<em>` inside a Cormorant heading = italic weight 400, coloured with `--accent-rare` (emotional emphasis) or `--accent` (positive emphasis). Never plain.
- `<b>` in DM Sans body = weight 400 (not 700), colour `--ink`. Used to surface key facts in warm-coloured support copy.
- `text-wrap: balance` on short headings (≤ ~36ch) to prevent widow lines.
- Never use `font-weight: 700` anywhere. The heaviest weight in use is 500 (DM Sans subheadings).

---

## 4. Spacing

### Page structure

```
Max content width:  1180px (hero)
                    1400px (oracle, pull quote, single-column pages)
                    1500px (work section)
                    1500px (oracle-case-study / full-bleed case studies)

Horizontal padding: 3rem  desktop
                    1.25–1.5rem  mobile (≤ 768px)

Fixed nav height:   60px (add padding-top: 60px to first section)
Mobile bottom bar:  56px (add padding-bottom: 56px to body)
```

### Section vertical rhythm

| Pattern | Value |
|---|---|
| Major section padding (hero, pull quote, CTA) | `7rem 0` |
| Standard section padding | `5–6rem 0` |
| Section label padding | `3rem 2rem 3rem 0` |
| Section content padding | `3rem 0 3rem 3rem` |
| Gap between section label and content (grid) | label column = `200px`, content = `1fr` |
| Card internal padding (large) | `2rem 1.75rem` |
| Card internal padding (small) | `1.25rem 1.3rem` |
| Card internal padding (panel / guardrail) | `1.75rem` |
| Eyebrow-to-heading gap | `1.25–1.5rem` |
| Heading-to-body gap | `1.2rem` |
| Body-to-CTA gap | `1.6rem` |

---

## 5. Component Patterns

### 5.1 Section layout (`.section-grid`)

Used for: Career, Skills, Writing, Contact, Work. The label column is sticky on desktop.

```html
<section class="section-grid" id="...">
  <!-- Left: sticky mono label -->
  <div class="section-label">
    <span class="font-mono-label" style="color: var(--warm)">Section Name</span>
  </div>

  <!-- Right: content -->
  <div class="section-content">
    ...
  </div>
</section>
```

```css
.section-grid {
  display: grid;
  grid-template-columns: 200px 1fr;
  border-top: 1px solid var(--rule);
}
.section-label {
  padding: 3rem 2rem 3rem 0;
  border-right: 1px solid var(--rule);
  position: sticky;
  top: 60px;
  height: fit-content;
}
.section-content {
  padding: 3rem 0 3rem 3rem;
}

/* Mobile: stack vertically */
@media (max-width: 768px) {
  .section-grid { grid-template-columns: 1fr; }
  .section-label {
    position: static;
    padding: 2rem 0 1rem;
    border-right: none;
    border-bottom: 1px solid var(--rule);
  }
  .section-content { padding: 2rem 0; }
}
```

### 5.2 Card grid (`.card-grid`)

The 1px gap trick: set `gap: 1px` and `background: var(--rule)` on the grid — the gap colour becomes the hairline divider. Each cell resets to `background: var(--paper)`.

```html
<div class="card-grid" style="grid-template-columns: repeat(3, 1fr);">
  <article style="background: var(--paper); padding: 2rem 1.75rem;">
    ...
  </article>
</div>
```

```css
.card-grid {
  display: grid;
  gap: 1px;
  background: var(--rule);         /* ← this is what creates the hairline borders */
  border: 1px solid var(--rule);   /* outer border matches */
}
.card-grid > * {
  background: var(--paper);        /* cells reset background over the gap colour */
}
```

Standard column counts:
- 3 columns: work case studies, anatomy grids, also-shipped cards
- 2 columns: guardrails (✕ / ✓), two-up origin/pivot, ship-grid
- 4 columns: stats strip, provenance footer, 4-up metric grid
- 5 columns: pipeline / anatomy nodes (After Hours)

### 5.3 Mono label / eyebrow

Always appears above a heading. Uses `.font-mono-label`. Colour conveys section character:

- `color: var(--warm)` — neutral section label (Career, Skills, Writing)
- `color: var(--accent)` — positive / teal section (anatomy answers, tool chain)
- `color: var(--accent-rare)` — Oracle / refused / broke state
- `color: var(--ink)` — hero eyebrow role text

```html
<div class="font-mono-label" style="color: var(--accent-rare); margin-bottom: 1.5rem;">
  Case study · live →
</div>
<h2 style="font-family: var(--font-cormorant); font-weight: 300; font-size: clamp(2rem, 4vw, 3.2rem);">
  Section heading with <em style="font-style: italic; color: var(--accent-rare);">italic accent.</em>
</h2>
```

### 5.4 Tag / inline badge

```html
<span class="font-mono-label" style="
  font-size: 0.55rem;
  color: var(--accent);
  border: 1px solid var(--rule);
  padding: 2px 6px;
">
  Tag text
</span>
```

On dark (inverted) pages:
```html
<span class="tag shipped">shipped</span>   <!-- accent border + teal text -->
<span class="tag broke">broke</span>       <!-- accent-rare border + raspberry text -->
```

### 5.5 CTA links (text-link style — no buttons)

```html
<!-- Standard: ink coloured, mono, underline border -->
<a class="hero-cta" href="#work">
  View work <span aria-hidden>→</span>
</a>

<!-- Oracle CTA: raspberry -->
<a class="hero-cta" style="color: var(--accent-rare); border-bottom-color: var(--accent-rare);" href="/oracle">
  Consult the Oracle
</a>

<!-- Series CTA: teal -->
<a class="hero-cta" style="color: var(--accent); border-bottom-color: var(--accent);" href="/redefined-by-ai">
  Redefined by AI <span aria-hidden>→</span>
</a>
```

```css
.hero-cta {
  font-family: var(--font-dm-mono);
  font-size: 0.66rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  text-decoration: none;
  color: var(--ink);
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding-bottom: 0.35rem;
  border-bottom: 1px solid var(--ink);
}
.hero-cta:hover span { transform: translateX(3px); }
span { display: inline-block; transition: transform 0.2s ease; }
```

On dark pages, buttons are allowed in the CTA section only:
```css
.btn.primary { background: var(--accent-rare); color: var(--ink); padding: .95rem 1.5rem; }
.btn.ghost   { border: 1px solid var(--rule-strong); color: var(--cream); padding: .95rem 1.5rem; }
/* Both use: font-family: DM Mono, uppercase, letter-spacing: 0.14em, font-size: 0.65rem */
```

### 5.6 Pull quote / blockquote

Appears between sections as an editorial moment. Teal accent rule draws in from left on scroll.

```html
<section style="padding: 7rem 3rem; max-width: 1400px; margin: 0 auto;">
  <div style="max-width: 880px;">
    <!-- 80px teal rule, revealed by GSAP scaleX -->
    <div style="height: 1px; width: 80px; background: var(--accent); margin-bottom: 2.5rem;"></div>

    <blockquote style="
      font-family: var(--font-cormorant);
      font-weight: 300;
      font-style: italic;
      font-size: clamp(1.8rem, 4.5vw, 3.2rem);
      line-height: 1.15;
      letter-spacing: -0.01em;
      color: var(--ink);
      margin: 0;
    ">
      The intelligence is only as reliable as what it runs on.
    </blockquote>

    <div class="font-mono-label" style="margin-top: 2rem; color: var(--warm); font-size: 0.7rem;">
      Attribution · Source
    </div>
  </div>
</section>
```

### 5.7 Stats / metrics strip

Used to surface numbers at a glance. 1px card-grid trick. On dark pages: key is mono label, value is Cormorant with `<em>` in accent.

```html
<div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 1px; background: var(--rule);">
  <div style="background: var(--paper); padding: 1.5rem 1.5rem 1.75rem;">
    <div class="font-mono-label" style="color: var(--warm); margin-bottom: 0.4rem;">Hours</div>
    <div style="font-family: var(--font-cormorant); font-weight: 300; font-size: 1.9rem; line-height: 1; color: var(--ink);">
      ~<em style="font-style: italic; color: var(--accent);">16</em>
    </div>
  </div>
  <!-- repeat for each stat -->
</div>
```

### 5.8 Navigation

**Desktop nav** (fixed, 60px, transparent → frosted glass on scroll):
- Logo: Cormorant Garamond italic 400, 1.05rem, `color: var(--ink)`
- Links: DM Mono, 0.65rem, uppercase, letter-spacing 0.12em, `color: var(--warm)` (Oracle gets `var(--accent-rare)`)
- On scroll: `backdrop-filter: blur(12px)` + `background: rgba(239,240,242,0.85)` + bottom hairline
- Links animate in: `opacity: 0; transform: translateY(-8px)` → `opacity: 1; transform: translateY(0)` staggered at 0.08s intervals, start delay 0.4s

**Mobile bottom bar** (56px, fixed bottom, same frosted glass):
- DM Mono, 0.6rem, uppercase, letter-spacing 0.14em, `color: var(--warm)`
- Oracle link: `color: var(--accent-rare)`
- `border-top: 1px solid var(--rule)`

### 5.9 Two-column section header (240px label + 1fr heading)

Used inside larger sections (timeline, anatomy, tools). Not the same as the main `.section-grid`.

```html
<div style="display: grid; grid-template-columns: 240px 1fr; gap: 3rem; align-items: baseline; margin-bottom: 3rem;">
  <span class="font-mono-label" style="color: var(--accent-rare);">Timeline</span>
  <h2 style="font-family: var(--font-cormorant); font-weight: 300; font-size: clamp(2rem, 4vw, 3.2rem); line-height: 1; max-width: 14ch;">
    Eight nights, <em style="font-style: italic; color: var(--accent-rare);">two hours each.</em>
  </h2>
</div>
```

Collapses to single column at ≤ 768px.

### 5.10 Provenance / metadata footer strip

4-column grid at the bottom of feature pages. Each cell: mono label above, normal-weight text below.

```html
<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; border-top: 1px solid var(--rule); padding-top: 3rem;">
  <div>
    <div class="font-mono-label" style="color: var(--warm); margin-bottom: 0.5rem;">Built</div>
    <div style="font-size: 0.95rem; color: var(--ink);">~3 hours, end to end</div>
  </div>
  <!-- repeat -->
</div>
```

---

## 6. Animation

All animation is GSAP-based. CSS transitions handle micro-interactions only.

### 6.1 Entry reveals (GSAP)

```js
// Standard fade-up entry
gsap.fromTo(el, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.8 })

// Stagger for lists / card grids
gsap.fromTo(cards, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.08, ease: 'power2.out' })

// Headline clip-path reveal (hero H1)
gsap.set(el, { clipPath: 'inset(0 0 100% 0)', y: 28 })
gsap.to(el, { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 0.95, ease: 'power3.out', delay: 0.32 })
```

### 6.2 Scroll triggers (GSAP ScrollTrigger)

```js
ScrollTrigger.create({
  trigger: section,
  start: 'top 70%',
  toggleActions: 'play none none none',
})
// Attach timeline to the scroll trigger
```

Typical pull-quote timeline:
1. Rule scaleX 0→1 over 1.2s, power3.out, at t=0
2. Quote opacity+y over 1.4s, power3.out, at t=0.2
3. Attribution opacity+y over 0.9s, power2.out, at t=0.8

### 6.3 CSS micro-interactions

```css
/* Easing used for hover transitions */
transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);   /* fast ease-out, spring-ish */

/* Work item underline sweep */
.work-item::after {
  content: ''; position: absolute; bottom: 0; left: 0;
  width: 0; height: 1px; background: var(--accent);
  transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.work-item:hover::after { width: 100%; }

/* Post card lift */
.post-card { transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.post-card:hover { transform: translateY(-3px); }

/* Arrow nudge (→) */
.arrow { display: inline-block; transition: transform 0.2s ease; }
:hover .arrow { transform: translateX(3–4px); }

/* Nav scroll state */
.nav-scrolled {
  backdrop-filter: blur(12px);
  background: rgba(239, 240, 242, 0.85);
  border-bottom: 1px solid var(--rule);
}
```

### 6.4 Ticker

```css
@keyframes ticker {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.ticker-track {
  display: flex;
  animation: ticker 60s linear infinite;
  width: max-content;
}
```
Content is duplicated so the loop is seamless.

### 6.5 Ball animations (Oracle only)

```css
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
@keyframes shake { /* multi-step X/rotate wobble, 0.65s */ }
.ball-float   { animation: float 4s ease-in-out infinite; }
.ball-shaking { animation: shake 0.65s ease; }
```

### 6.6 Motion preferences

All non-essential GSAP animations respect `prefers-reduced-motion`. The ticker and the ball's idle float are kept — they are considered part of the artefact:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
  .ticker-track { animation: ticker 60s linear infinite !important; }
  .ball-float   { animation: float 4s ease-in-out infinite !important; }
}
```

---

## 7. Global Chrome

### Cursor follower

10px teal dot, `mix-blend-mode: multiply`, expands to 48px/25% opacity on interactive elements. Hidden on mobile.

```css
#cursor {
  position: fixed; width: 10px; height: 10px;
  background: var(--accent); border-radius: 50%;
  pointer-events: none; z-index: 9998;
  mix-blend-mode: multiply;
  transform: translate(-50%, -50%);
  transition: width 0.3s ease, height 0.3s ease, opacity 0.3s ease;
}
#cursor.expanded { width: 48px; height: 48px; opacity: 0.25; }
@media (max-width: 768px) { #cursor { display: none; } }
```

### Progress bar

2px teal strip fixed to top of viewport. `z-index: 9999`.

```css
#progress-bar {
  position: fixed; top: 0; left: 0;
  height: 2px; background: var(--accent);
  z-index: 9999; width: 0%;
}
```

### Status dot (hero)

```css
.hero-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 22%, transparent);
}
```

---

## 8. Responsive Breakpoints

| Breakpoint | Behaviour |
|---|---|
| `≤ 768px` | Stack `.section-grid` vertically, hide desktop nav, show mobile bottom bar, reduce horizontal padding to 1.25–1.5rem, stack hero CTAs vertically, reduce hero H1 to 1.9rem fixed. |
| `≤ 900px` | Work case studies and "also shipped" grid collapse to single column. |
| `≤ 1024px` | Stats strip goes to 2 columns, two-up sections stack, pipeline/anatomy nodes stack, oracle page collapses to single column. |

---

## 9. Writing Tone (for new copy)

- **First person, declarative.** "I know what breaks." Not "Martina has experience with..."
- **Specificity over generality.** "13,000 hours in Webex" beats "experienced with enterprise tools."
- **The metric is the argument.** Put the number first in Cormorant, context below in warm DM Sans.
- **`<em>` in headlines for the moment that matters.** One per heading, colour signals valence.
- **Mono labels read as metadata, not UI copy.** Short, factual, no spin: "Case study · live →", "Built in 3 hours · Claude · guardrailed."
- **Short body copy.** 2–3 sentences per card max. Pull quotes are one sentence.

---

## 10. Quick Reference — New Page Checklist

When generating a new page:

1. Import fonts via CSS variables (`var(--font-cormorant)`, `var(--font-dm-sans)`, `var(--font-dm-mono)`).
2. Set `padding-top: 120px` on `<main>` to clear the fixed nav (60px nav + 60px breathing room) — or 60px if the section immediately borders the nav.
3. All colours from CSS variables, never hardcoded hex.
4. Cormorant only at ≥ 2rem. DM Sans for everything smaller.
5. Section labels are `.font-mono-label` in `var(--warm)` or an accent colour — never `var(--ink)`.
6. Card grids: `gap: 1px; background: var(--rule)` on the grid, `background: var(--paper)` on cells.
7. CTAs are text links with a border-bottom, not `<button>` elements (except on dark pages: `.btn.primary` / `.btn.ghost`).
8. Hairlines everywhere: `border-top`, `border-bottom`, `border-right` — all `1px solid var(--rule)`.
9. No box-shadows, no border-radius (unless it's the circular Oracle ball), no gradients on light pages.
10. Add `@media (prefers-reduced-motion: reduce)` to kill GSAP animation classes.
11. Add responsive breakpoints at ≤ 768px and ≤ 1024px.
12. Add `margin-top: 60px` on any internal nav on sub-pages (so it clears the global fixed nav).
