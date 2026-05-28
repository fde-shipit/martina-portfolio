# Martina Edwards Portfolio — Styleguide

A guide to the code patterns, conventions, and architectural decisions in this Next.js portfolio.

---

## Tech Stack

- **Framework**: Next.js 16.2.6 (App Router)
- **UI Library**: React 19.2.4 with TypeScript 5
- **Styling**: Tailwind CSS 4 + inline styles + component CSS-in-JS
- **Animation**: GSAP 3.15.0
- **Fonts**: Google Fonts via Next.js (Cormorant Garamond, DM Sans, DM Mono)
- **SDK**: Anthropic SDK (for the Oracle feature)

---

## File Organization

```
├── app/                      # Next.js App Router
│   ├── layout.tsx            # Root layout with global fonts
│   ├── page.tsx              # Home page (component orchestration)
│   ├── [slug]/page.tsx       # Dynamic routes
│   └── api/                  # API routes (Oracle, Flashcard Insight)
├── components/               # React components
│   ├── Hero.tsx              # Display components
│   ├── Nav.tsx               # Navigation
│   └── gsap/                 # GSAP animation components
├── lib/                      # Utilities & business logic
│   ├── oracle-guardrails.ts  # Oracle response logic
│   └── substack.ts           # External integrations
├── content/                  # Content data
│   └── data.ts               # Structured profile/portfolio data
├── public/                   # Static assets
└── docs/                     # Documentation
```

### Naming Conventions

- **Files**: PascalCase for components (e.g., `Hero.tsx`), camelCase for utilities (e.g., `oracle-guardrails.ts`)
- **Folders**: kebab-case for nested features (e.g., `gsap/ScrollAnimations.tsx`)
- **Components**: PascalCase, match filename
- **Functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE for immutable data (e.g., `INJECTION_PATTERNS`, `FALLBACKS`)

---

## Component Patterns

### 1. **Client vs Server Components**

```typescript
// Client component (interactive, hooks)
'use client'
import { useEffect, useRef } from 'react'

export default function Hero() { ... }

// Server component (default, data fetching)
export default function About() { ... }
```

**Rule**: Mark with `'use client'` only if using hooks, event listeners, or browser APIs.

### 2. **Inline Styles + CSS-in-JS Blocks**

The project **avoids external CSS files** (except `globals.css` for layout). Instead:

- **Layout/positioning**: Inline `style={}` props
- **Complex styles/responsive**: `<style>` tag within component JSX
- **Responsive media queries**: Defined in component's `<style>` block
- **Animations**: GSAP or keyframes in `<style>`

```typescript
export default function Hero() {
  return (
    <section style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Content */}
      <style>{`
        .hero-head {
          font-family: var(--font-cormorant);
          font-size: clamp(1.9rem, 3.2vw, 2.8rem);
        }
        @media (max-width: 768px) {
          .hero-head { font-size: 1.9rem; }
        }
      `}</style>
    </section>
  )
}
```

**Benefits**:
- Encapsulation: styles live with component
- Scoped: class names are module-scoped
- Responsive: media queries at component level

### 3. **Font System**

Three fonts are available as CSS variables:

```css
--font-cormorant   /* Cormorant Garamond: headers, display text */
--font-dm-sans     /* DM Sans: body text, paragraphs */
--font-dm-mono     /* DM Mono: labels, metadata, code-like UI */
```

**Usage**:

```typescript
<h1 style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}>
  Headline
</h1>
<p style={{ fontFamily: 'var(--font-dm-sans)', fontWeight: 300 }}>Body</p>
<label style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.66rem' }}>
  Label
</label>
```

**Weights**:
- Cormorant: 300 (light), 400 (normal), 600 (bold)
- DM Sans: 300 (light), 400 (normal), 500 (medium)
- DM Mono: 400 only

### 4. **Color System**

Colors are CSS variables (defined in `globals.css`):

```css
--ink              /* Primary text */
--ink-soft         /* Softer text, secondary content */
--warm             /* Tertiary, de-emphasized text */
--accent           /* Primary accent (accent brand color) */
--accent-rare      /* Rare accent (Oracle specific) */
--rule             /* Dividers, borders */
```

**Usage**:

```typescript
<p style={{ color: 'var(--warm)' }}>Secondary text</p>
<a style={{ color: 'var(--accent)', borderColor: 'var(--accent)' }}>Link</a>
```

### 5. **Spacing & Sizing**

No strict spacing system; uses **rem-based, context-aware spacing**:

```typescript
padding: '2rem 3rem'        // Standard section padding
gap: '1.5rem'               // Component gaps
marginTop: '1.2rem'         // Adjacent elements
maxWidth: '1180px'          // Content container
padding-bottom: '6rem'      // Section end spacing
```

**Responsive**:

```typescript
padding: '0 3rem'           // Desktop
@media (max-width: 768px) {
  padding: '0 1.25rem'      // Mobile
}
```

### 6. **Typography Utilities**

Repeated class names are defined in `globals.css`:

```css
.font-mono-label {
  font-family: var(--font-dm-mono);
  font-size: 0.66rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
}
```

Use sparingly; prefer inline styles for one-off components.

### 7. **Responsive Breakpoints**

Primary breakpoint: **768px** (mobile vs desktop)

```typescript
@media (max-width: 768px) {
  /* Mobile adjustments */
}

@media (prefers-reduced-motion: reduce) {
  /* Disable animations for accessibility */
}
```

---

## Component Documentation Style

Each component includes a **JSDoc-style block comment** explaining purpose, layout, and key decisions:

```typescript
/**
 * Hero — quiet editorial.
 *
 * Single column. Generous whitespace. No ornament.
 *
 *   ─────────────────────────────────────────────────────────  (hairline)
 *   Manager, AI Acceleration · HSF Kramer        Melbourne, Australia · 2026
 *   ─────────────────────────────────────────────────────────  (hairline)
 *
 *      AI didn't replace my experience. It handed me the tools
 *      to finally use *all of it.*
 *
 *      ...
 *
 * No spine, no clamp-to-massive headline, no four-cell ledger.
 * The proposition does the heavy lifting; everything else is in service.
 */
```

---

## Animation Patterns

### GSAP Animations

Components using GSAP load it dynamically and check for reduced-motion:

```typescript
'use client'
import { useEffect, useRef } from 'react'

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let cleanup: (() => void) | undefined

    const init = async () => {
      const { gsap } = await import('gsap')  // Dynamic import
      // Animation setup...
      cleanup = () => { gsap.killTweensOf('*') }
    }

    init()
    return () => cleanup?.()
  }, [])
}
```

**Pattern**:
1. Lazy-load GSAP in `useEffect`
2. Check `prefers-reduced-motion`
3. Clean up tweens on unmount
4. Reference elements by ID (e.g., `#hero-head`)

### CSS Keyframes

For simpler animations (fades, slides):

```typescript
<style>{`
  @keyframes fadeDown {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .nav-link {
    animation: fadeDown 0.4s ease forwards ${delay}s;
  }
`}</style>
```

---

## Data & Content

Content is centralized in `content/data.ts`:

```typescript
export const person = {
  name: 'Martina Edwards',
  role: 'Manager, AI Acceleration',
  company: 'HSF Kramer',
  location: 'Melbourne, Australia',
  profile: '...',
  hashtag: '#ShipIt',
}

export const details = {
  skills: [ ... ],
  projects: [ ... ],
}
```

**Pattern**: Import and use throughout components. This decouples content from presentation.

---

## API Routes

Located in `app/api/[name]/route.ts`:

```typescript
// app/api/oracle/route.ts
export async function POST(request: Request) {
  const { message } = await request.json()
  
  // Business logic (imported from lib/)
  const response = generateOracleResponse(message)
  
  return Response.json({ response })
}
```

**Conventions**:
- Named exports: `POST`, `GET`, etc.
- Business logic in `lib/` (e.g., `oracle-guardrails.ts`)
- API logic stays thin; focus on request/response handling

---

## TypeScript Patterns

### Type Annotations

```typescript
// Function parameters and returns
function generateResponse(text: string): string { ... }

// Object types (inline for single use, interfaces for reuse)
const links: Array<{ href: string; label: string; accent?: boolean }> = [...]

// React refs
const containerRef = useRef<HTMLElement>(null)
const navRef = useRef<HTMLDivElement>(null)
```

### Strict Mode

The project uses **TypeScript strict mode** (`"strict": true`). All code must:
- Have explicit type annotations where needed
- Avoid `any`
- Handle nullable values

---

## Naming Conventions for UI Classes

Classes created inline should be **descriptive and namespaced**:

```typescript
className="hero-quiet"           // Component scope
className="hero-inner"           // Component part
className="hero-meta"            // Logical grouping
className="hero-role-soft"       // Variant/modifier
className="nav-scrolled"         // State-based
className="font-mono-label"      // Reusable utility
className="gsap-section-label"   // Animation hook
```

No BEM, no utility-first (Tailwind used minimally). Classes are **component-scoped**.

---

## Common Patterns to Follow

### Layout Container

```typescript
<section style={{ padding: '0 3rem', maxWidth: '1500px', margin: '0 auto', width: '100%' }}>
  {/* Content */}
</section>
```

### Link Styling

```typescript
<a
  style={{
    textDecoration: 'none',
    color: 'var(--ink)',
    borderBottom: '1px solid var(--ink)',
    paddingBottom: '0.35rem',
  }}
>
  Click me
</a>
```

### Responsive Text

```typescript
fontSize: 'clamp(1.9rem, 3.2vw, 2.8rem)'  // min, preferred, max
```

### Grid Layout

```typescript
<div
  style={{
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '2rem',
  }}
>
  {/* Two-column layout */}
</div>
```

---

## Accessibility

- **Semantic HTML**: Use `<section>`, `<header>`, `<nav>`, `<footer>`
- **Aria labels**: `aria-label` for icons, hidden elements
- **Reduced motion**: Always respect `prefers-reduced-motion: reduce`
- **Link text**: Avoid "click here"; use descriptive text
- **Focus states**: Ensure keyboard navigation works (handled by Next.js Link)

Example:

```typescript
<span className="hero-dot" aria-hidden />  // Hide decorative elements
<a href="#work" aria-label="View work section">Work →</a>
```

---

## Performance Considerations

- **Dynamic imports**: GSAP and other heavy libraries loaded on-demand
- **Image optimization**: Use Next.js `Image` component (not `<img>`)
- **Code splitting**: Pages and components split automatically
- **CSS**: Scoped to component; no global bloat

---

## Common Gotchas

1. **Inline styles + responsive**: Use `<style>` blocks inside components for media queries
2. **GSAP cleanup**: Always return cleanup function to prevent memory leaks
3. **Client-only code**: Wrap browser APIs in `typeof window !== 'undefined'` checks
4. **Font loading**: Fonts are loaded in layout; use CSS variables throughout
5. **Tailwind vs inline**: Prefer inline styles and CSS-in-JS to match project pattern

---

## Future Additions

When adding new code, maintain:

- Component-scoped documentation (JSDoc comment)
- Inline styles + CSS-in-JS pattern
- TypeScript strict mode compliance
- Accessibility best practices
- Responsive design at 768px breakpoint
- CSS variable usage for colors and fonts

---

*Last updated: May 2026*
