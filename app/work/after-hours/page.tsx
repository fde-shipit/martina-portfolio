import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'After Hours — Martina Edwards',
  description: "Started with a magic 8 ball. Ended up with a portfolio. Eight nights, two hours each. Solo.",
}

/**
 * /work/after-hours — case study redesign.
 *
 * Narrative-structured: hero → numbers → origin/pivot → 8-night timeline →
 * anatomy of the Oracle → tool chain → what shipped → CTA.
 *
 * Inline-styled (single page; not worth promoting to a CSS module yet).
 * Fonts come from `next/font` via the root layout — refers to
 * `var(--font-cormorant)` etc. but the source CSS uses the family names
 * as fallback so it still works if the variables aren't set.
 */
export default function AfterHours() {
  return (
    <>
      <style>{`
  .ah-page{
    --ink:#1C2024;
    --ink-2:#23272D;
    --ink-3:#2C3138;
    --cream:#EFF0F2;
    --cream-soft:rgba(239,240,242,.62);
    --cream-mute:rgba(239,240,242,.32);
    --cream-dim:rgba(239,240,242,.14);
    --accent:#52B0BD;             /* teal, lifts on dark */
    --accent-rare:#E6798A;        /* raspberry, lifts on dark */
    --rule:rgba(239,240,242,.10);
    --rule-strong:rgba(239,240,242,.22);
  }
  *{box-sizing:border-box;margin:0;padding:0}
  .ah-page{
    min-height:100vh;
    background:var(--ink);color:var(--cream);
    font-family:'DM Sans',sans-serif;font-weight:300;line-height:1.6;
    -webkit-font-smoothing:antialiased;
  }
  .mono{
    font-family:'DM Mono',monospace;font-weight:400;text-transform:uppercase;
    letter-spacing:.14em;font-size:.62rem;color:var(--cream-mute);
  }
  .wrap{max-width:1320px;margin:0 auto;padding:0 3rem}

  /* ── top nav ── */
  nav.top{
    margin-top:60px;padding:1.75rem 0;border-bottom:1px solid var(--rule);
  }
  nav.top .row{display:flex;justify-content:space-between;align-items:baseline}
  nav.top a{color:var(--cream-mute);text-decoration:none}
  nav.top .sec{color:var(--accent-rare)}

  /* ── hero ── */
  .hero{padding:7rem 0 5rem;border-bottom:1px solid var(--rule)}
  .hero .eyebrow{margin-bottom:2.5rem;display:flex;flex-wrap:wrap;gap:.8rem;align-items:center}
  .hero .eyebrow .dot{width:4px;height:4px;border-radius:50%;background:var(--accent)}
  .hero .eyebrow .live{
    color:var(--accent);display:inline-flex;align-items:center;gap:.5rem;
  }
  .hero .eyebrow .live::before{
    content:'';width:7px;height:7px;border-radius:50%;background:var(--accent);
    box-shadow:0 0 0 3px rgba(82,176,189,.18);
  }
  .hero h1{
    font-family:'Cormorant Garamond',serif;font-weight:300;
    font-size:clamp(1.8rem,4vw,3.6rem);line-height:.94;letter-spacing:-.025em;
    color:var(--cream);
  }
  .hero h1 em{font-style:italic;color:var(--accent-rare)}
  .hero .sub{
    margin-top:2.5rem;max-width:60ch;font-size:1.1rem;
    color:var(--cream-soft);line-height:1.65;
  }

  /* ── numbers strip ── */
  .stats{
    display:grid;grid-template-columns:repeat(5,1fr);gap:1px;
    background:var(--rule);border-bottom:1px solid var(--rule);
  }
  .stats > div{background:var(--ink);padding:1.5rem 1.5rem 1.75rem}
  .stats .k{color:var(--cream-mute);margin-bottom:.4rem}
  .stats .v{
    font-family:'Cormorant Garamond',serif;font-weight:300;
    font-size:1.9rem;line-height:1;color:var(--cream);
  }
  .stats .v em{font-style:italic;color:var(--accent)}

  /* ── two-up: origin / pivot ── */
  .twoup{
    padding:5rem 0;display:grid;grid-template-columns:1fr 1fr;gap:4rem;
    border-bottom:1px solid var(--rule);
  }
  .twoup .col .l{margin-bottom:1.5rem;color:var(--accent-rare)}
  .twoup .col p{
    font-family:'Cormorant Garamond',serif;font-weight:300;
    font-size:clamp(1.15rem,1.8vw,1.45rem);line-height:1.55;color:var(--cream);
  }
  .twoup .col p em{font-style:italic;color:var(--accent-rare)}

  /* ── timeline ── */
  .tl{padding:6rem 0 5rem;border-bottom:1px solid var(--rule)}
  .tl .hdr{display:grid;grid-template-columns:240px 1fr;gap:3rem;align-items:baseline;margin-bottom:3rem}
  .tl .hdr h2{
    font-family:'Cormorant Garamond',serif;font-weight:300;
    font-size:clamp(2rem,4vw,3.2rem);line-height:1;
    color:var(--cream);max-width:14ch;
  }
  .tl .hdr h2 em{font-style:italic;color:var(--accent-rare)}
  .tl .hdr .label{color:var(--accent-rare)}
  .tl-body{
    display:grid;grid-template-columns:240px 1fr;gap:3rem;
  }
  .tl-body .day-block{display:flex;flex-direction:column;gap:.5rem;border-top:1px solid var(--rule);padding-top:1.25rem}
  .tl-body .day-block .d{
    font-family:'Cormorant Garamond',serif;font-weight:300;
    font-size:2.2rem;line-height:1;color:var(--cream);
  }
  .tl-body .day-block .when{color:var(--cream-mute)}
  .tl-body .day-block .summary{
    margin-top:.6rem;font-size:.85rem;color:var(--cream-soft);line-height:1.5;
  }
  .tl-events{
    display:flex;flex-direction:column;
    border-top:1px solid var(--rule);
  }
  .tl-event{
    display:grid;grid-template-columns:80px 1fr;
    padding:1.1rem 0;gap:1.5rem;
    border-bottom:1px solid var(--rule);
    align-items:start;
  }
  .tl-event .hh{
    color:var(--cream-mute);font-family:'DM Mono',monospace;
    font-size:.72rem;letter-spacing:.1em;padding-top:.1rem;
  }
  .tl-event .what{
    font-size:.95rem;color:var(--cream);line-height:1.55;
  }
  .tl-event .what .tag{
    display:inline-block;margin-left:.5rem;
    font-family:'DM Mono',monospace;font-size:.55rem;
    text-transform:uppercase;letter-spacing:.14em;
    padding:1px 6px;border:1px solid var(--rule-strong);
    color:var(--cream-mute);vertical-align:middle;
  }
  .tl-event .what .tag.shipped{color:var(--accent);border-color:rgba(82,176,189,.45)}
  .tl-event .what .tag.broke{color:var(--accent-rare);border-color:rgba(230,121,138,.4)}
  .tl-event .what .quiet{color:var(--cream-soft);font-size:.85rem;display:block;margin-top:.25rem;font-family:'DM Sans',sans-serif;font-weight:300}

  .day-divider{
    grid-column:1 / -1;
    margin:1.5rem 0;
    display:flex;align-items:center;gap:1rem;
    color:var(--accent-rare);
  }
  .day-divider .line{flex:1;height:1px;background:var(--rule)}

  /* ── anatomy ── */
  .anatomy{padding:6rem 0 5rem;border-bottom:1px solid var(--rule)}
  .anatomy .hdr{display:grid;grid-template-columns:240px 1fr;gap:3rem;align-items:baseline;margin-bottom:3rem}
  .anatomy .hdr h2{
    font-family:'Cormorant Garamond',serif;font-weight:300;
    font-size:clamp(2rem,4vw,3.2rem);line-height:1;color:var(--cream);max-width:18ch;
  }
  .anatomy .hdr h2 em{font-style:italic;color:var(--accent)}
  .anatomy .hdr .label{color:var(--accent)}

  .pipe{
    display:grid;grid-template-columns:repeat(5,1fr);gap:.5rem;
    margin-bottom:3rem;
  }
  .pipe .node{
    background:var(--ink-2);border:1px solid var(--rule-strong);
    padding:1rem 1rem 1.1rem;position:relative;
  }
  .pipe .node .num{color:var(--cream-mute);font-family:'DM Mono',monospace;font-size:.6rem;letter-spacing:.14em}
  .pipe .node .t{
    margin-top:.4rem;
    font-family:'DM Sans',sans-serif;font-weight:500;font-size:.95rem;
    color:var(--cream);line-height:1.3;
  }
  .pipe .node .d{
    margin-top:.4rem;font-size:.75rem;color:var(--cream-soft);line-height:1.45;
  }
  .pipe .node.accent{border-color:rgba(82,176,189,.6)}
  .pipe .node.accent .t{color:var(--accent)}
  .pipe .node.rare{border-color:rgba(230,121,138,.5)}
  .pipe .node.rare .t{color:var(--accent-rare)}
  .pipe .arrow{
    align-self:center;color:var(--cream-mute);font-family:'DM Mono',monospace;
    text-align:center;font-size:.8rem;
  }

  .anatomy-grid{
    display:grid;grid-template-columns:1fr 1fr;gap:1px;
    background:var(--rule);border:1px solid var(--rule);
  }
  .anatomy-grid > div{background:var(--ink);padding:1.75rem 1.75rem 2rem}
  .anatomy-grid .h{margin-bottom:1.25rem}
  .anatomy-grid .h.rare{color:var(--accent-rare)}
  .anatomy-grid .h.accent{color:var(--accent)}
  .anatomy-grid ul{list-style:none;display:flex;flex-direction:column;gap:.6rem}
  .anatomy-grid li{
    font-size:.88rem;color:var(--cream);line-height:1.5;
    padding-left:1rem;position:relative;
  }
  .anatomy-grid li::before{
    content:'';position:absolute;left:0;top:.7em;
    width:.5rem;height:1px;background:var(--cream-mute);
  }
  .anatomy-grid code{
    font-family:'DM Mono',monospace;font-size:.78rem;
    background:var(--ink-2);padding:1px 5px;color:var(--cream);
  }

  /* ── toolchain ── */
  .tools{padding:6rem 0 5rem;border-bottom:1px solid var(--rule)}
  .tools .hdr{margin-bottom:3rem;display:grid;grid-template-columns:240px 1fr;gap:3rem;align-items:baseline}
  .tools .hdr h2{
    font-family:'Cormorant Garamond',serif;font-weight:300;
    font-size:clamp(2rem,4vw,3.2rem);line-height:1;color:var(--cream);max-width:18ch;
  }
  .tools .hdr h2 em{font-style:italic;color:var(--accent)}

  .tool-rows{display:flex;flex-direction:column;gap:1px;background:var(--rule);border:1px solid var(--rule)}
  .tool-row{
    background:var(--ink);padding:1.5rem 1.75rem;
    display:grid;grid-template-columns:80px 200px 1fr 1fr;gap:2rem;
    align-items:start;
  }
  .tool-row .n{
    font-family:'Cormorant Garamond',serif;font-weight:300;
    font-size:1.8rem;line-height:1;color:var(--accent);
  }
  .tool-row .t{
    font-family:'DM Sans',sans-serif;font-weight:500;font-size:1rem;
    color:var(--cream);
  }
  .tool-row .t .role{
    display:block;margin-top:.25rem;
    color:var(--cream-mute);font-weight:300;font-size:.78rem;
    font-family:'DM Mono',monospace;text-transform:uppercase;letter-spacing:.14em;
  }
  .tool-row .used{font-size:.88rem;color:var(--cream-soft);line-height:1.55}
  .tool-row .broke{font-size:.88rem;color:var(--cream-soft);line-height:1.55}
  .tool-row .broke::before{
    content:'where it broke';display:block;
    font-family:'DM Mono',monospace;font-size:.55rem;
    text-transform:uppercase;letter-spacing:.14em;
    color:var(--accent-rare);margin-bottom:.4rem;
  }

  /* ── shipped grid ── */
  .shipped{padding:6rem 0 5rem;border-bottom:1px solid var(--rule)}
  .shipped .hdr{margin-bottom:3rem;display:grid;grid-template-columns:240px 1fr;gap:3rem;align-items:baseline}
  .shipped .hdr h2{
    font-family:'Cormorant Garamond',serif;font-weight:300;
    font-size:clamp(2rem,4vw,3.2rem);line-height:1;color:var(--cream);max-width:18ch;
  }
  .ship-grid{
    display:grid;grid-template-columns:repeat(2,1fr);gap:1px;
    background:var(--rule);border:1px solid var(--rule);
  }
  .ship-grid > .item{background:var(--ink);padding:2rem 1.75rem;display:flex;flex-direction:column;gap:1rem}
  .ship-grid .viz{
    height:130px;border:1px solid var(--rule);
    background:rgba(239,240,242,.02);
    display:flex;align-items:center;justify-content:center;
    font-family:'DM Mono',monospace;font-size:.55rem;
    text-transform:uppercase;letter-spacing:.14em;color:var(--cream-mute);
    overflow:hidden;position:relative;
  }
  /* viz-oracle: mini answer card */
  .viz-oracle{
    background:radial-gradient(ellipse at 30% 30%,#0d2030 0%,#061420 100%);
    color:var(--cream);text-transform:none;letter-spacing:0;
    padding:0 1.25rem;gap:.9rem;
  }
  .viz-oracle .glyph{
    font-family:'Cormorant Garamond',serif;font-weight:300;font-size:2.6rem;
    color:rgba(230,121,138,.78);line-height:1;flex-shrink:0;
  }
  .viz-oracle .quote{
    font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:300;
    font-size:.85rem;color:#f3c8d0;line-height:1.35;
  }
  .viz-oracle .who{
    font-family:'DM Mono',monospace;font-size:.5rem;
    text-transform:uppercase;letter-spacing:.14em;
    color:rgba(230,121,138,.55);margin-top:.4rem;
  }
  /* viz-hero: typographic micro-poster */
  .viz-hero{
    flex-direction:column;align-items:flex-start;justify-content:center;
    padding:.7rem 1.25rem;gap:.4rem;
  }
  .viz-hero .name{
    font-family:'Cormorant Garamond',serif;font-weight:300;font-size:1.65rem;
    line-height:.95;letter-spacing:-.02em;color:var(--cream);text-transform:none;
  }
  .viz-hero .name em{font-style:italic;color:var(--accent-rare)}
  .viz-hero .tape{
    font-family:'DM Mono',monospace;font-size:.5rem;
    text-transform:uppercase;letter-spacing:.18em;color:var(--cream-mute);
    white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width:100%;
    border-top:1px solid var(--rule);padding-top:.5rem;margin-top:.3rem;
  }
  .viz-hero .tape b{color:var(--accent);font-weight:400}
  /* viz-cards: 4-up metric grid */
  .viz-cards{
    display:grid;grid-template-columns:repeat(4,1fr);gap:1px;
    background:var(--rule);padding:0;
    text-transform:none;letter-spacing:0;
  }
  .viz-cards .c{
    background:var(--ink);padding:.5rem .6rem;
    display:flex;flex-direction:column;justify-content:space-between;
  }
  .viz-cards .c .m{
    font-family:'Cormorant Garamond',serif;font-weight:300;
    font-size:1.2rem;line-height:1;color:var(--accent);
  }
  .viz-cards .c .l{
    font-family:'DM Mono',monospace;font-size:.48rem;
    text-transform:uppercase;letter-spacing:.14em;color:var(--cream-mute);
    margin-top:auto;
  }
  /* viz-log: deploy log readout */
  .viz-log{
    flex-direction:column;align-items:stretch;justify-content:center;
    padding:.8rem 1rem;gap:.35rem;
    text-transform:none;letter-spacing:0;
    font-family:'DM Mono',monospace;font-size:.62rem;
    color:var(--cream-soft);background:#161A1F;
  }
  .viz-log .ln{display:flex;gap:.5rem;align-items:baseline}
  .viz-log .ln .ts{color:var(--cream-mute);font-size:.55rem;flex-shrink:0;min-width:42px}
  .viz-log .ln.cmd{color:var(--cream)}
  .viz-log .ln.ok .mark{color:var(--accent)}
  .viz-log .ln .mark{flex-shrink:0;width:10px}
  .viz-log .ln.url{color:var(--accent-rare)}
  .ship-grid .t{
    font-family:'Cormorant Garamond',serif;font-weight:300;font-size:1.6rem;
    color:var(--cream);line-height:1.2;
  }
  .ship-grid .d{font-size:.86rem;color:var(--cream-soft);line-height:1.55}
  .ship-grid .meta{
    display:flex;flex-wrap:wrap;gap:.4rem;margin-top:.4rem;
  }
  .ship-grid .meta span{
    font-family:'DM Mono',monospace;font-size:.55rem;
    text-transform:uppercase;letter-spacing:.14em;
    color:var(--cream-mute);border:1px solid var(--rule-strong);
    padding:2px 6px;
  }




  /* ── CTA ── */
  .cta{padding:7rem 0 6rem;text-align:center;display:flex;flex-direction:column;align-items:center;gap:2.5rem}
  .cta p{
    font-family:'Cormorant Garamond',serif;font-weight:300;font-style:italic;
    font-size:clamp(1.4rem,2.8vw,2rem);
    color:var(--cream-soft);max-width:30ch;line-height:1.35;
  }
  .cta p em{color:var(--accent-rare);font-style:italic}
  .cta .btns{display:flex;gap:1rem;flex-wrap:wrap;justify-content:center}
  .cta .btn{
    font-family:'DM Mono',monospace;font-size:.65rem;text-transform:uppercase;
    letter-spacing:.14em;padding:.95rem 1.5rem;text-decoration:none;
  }
  .cta .btn.primary{color:var(--ink);background:var(--accent-rare)}
  .cta .btn.ghost{color:var(--cream);border:1px solid var(--rule-strong)}

  /* ── footer ── */
  footer{padding:2.5rem 0;border-top:1px solid var(--rule);display:flex;justify-content:space-between;font-size:.62rem;color:var(--cream-mute);font-family:'DM Mono',monospace;text-transform:uppercase;letter-spacing:.14em}

  @media (max-width:1024px){
    .stats{grid-template-columns:repeat(2,1fr)}
    .twoup{grid-template-columns:1fr;gap:2.5rem}
    .pipe{grid-template-columns:1fr;gap:.75rem}
    .pipe .arrow{transform:rotate(90deg);padding:.4rem 0}
    .tool-row{grid-template-columns:60px 1fr;gap:1rem}
    .tool-row .used,.tool-row .broke{grid-column:span 2}
    .anatomy-grid{grid-template-columns:1fr}
    .ship-grid{grid-template-columns:1fr}
  }
  @media (max-width:768px){
    .wrap{padding:0 1.5rem}
    .tl .hdr,.tl-body,.anatomy .hdr,.tools .hdr,.shipped .hdr{
      grid-template-columns:1fr !important;gap:1rem !important;
    }
  }
`}</style>
      <div className="ah-page">
{/* ── nav ── */}
<nav className="top">
  <div className="wrap">
    <div className="row">
      <Link href="/" className="mono">← Martina Edwards</Link>
      <span className="mono sec">§ After Hours · case study</span>
    </div>
  </div>
</nav>

{/* ── hero ── */}
<section className="hero">
  <div className="wrap">
    <div className="eyebrow">
      <span className="mono" style={{color: 'var(--cream)'}}>May 2026</span>
      <span className="dot"></span>
      <span className="mono">Personal project</span>
      <span className="dot"></span>
      <span className="mono">8 evenings · ~16 hours</span>
      <span className="dot"></span>
      <span className="mono live">Live in production</span>
    </div>
    <h1>
      Started with a magic 8 ball.<br/>
      Ended up with a <em>portfolio.</em>
    </h1>
    <p className="sub">
      The day job ended at 6. The build began at 9. Eight nights, two hours each.
      A Claude-powered Oracle with guardrails, wrapped in a Next.js portfolio with
      GSAP and a Vercel deploy. Solo. No planning phase. The chat was the build.
    </p>
  </div>
</section>

{/* ── numbers ── */}
<section className="stats wrap" style={{marginTop: '0', borderLeft: '1px solid var(--rule)', borderRight: '1px solid var(--rule)'}}>
  <div><div className="mono k">Hours</div><div className="v">~<em>16</em></div></div>
  <div><div className="mono k">Nights</div><div className="v"><em>8</em></div></div>
  <div><div className="mono k">Commits</div><div className="v"><em>22</em></div></div>
  <div><div className="mono k">Claude Pro</div><div className="v">$<em>38</em></div></div>
  <div><div className="mono k">Developers</div><div className="v"><em>1</em></div></div>
</section>

{/* ── origin / pivot ── */}
<section className="wrap">
  <div className="twoup">
    <div className="col">
      <div className="mono l">The origin</div>
      <p>
        The Oracle came first. A magic 8 ball that answers one question: should you
        hire Martina? <em>The portfolio was built around it.</em> Not the other way around.
      </p>
    </div>
    <div className="col">
      <div className="mono l">The pivot</div>
      <p>
        Night four: the Oracle couldn't answer a simple <em>"what's for dinner?"</em> question.
        Stopped building features. Spent the rest of the evening tightening the refusal logic.
        That's what made the rest of the project worth shipping.
      </p>
    </div>
  </div>
</section>

{/* ── timeline ── */}
<section className="tl">
  <div className="wrap">
    <div className="hdr">
      <span className="mono label">Timeline</span>
      <h2>Eight nights, <em>two hours each.</em></h2>
    </div>

    <div className="tl-body">
      {/* left rail */}
      <div style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
        <div className="day-block">
          <span className="mono when">Phase 01 · Nights 1–4</span>
          <div className="d">The Oracle.</div>
          <p className="summary">From magic-8-ball UI to a guardrailed Claude endpoint. The pivot from feature-building to refusal-design happened here.</p>
        </div>
        <div className="day-block">
          <span className="mono when">Phase 02 · Nights 5–8</span>
          <div className="d">The portfolio.</div>
          <p className="summary">A place for the Oracle to live. Hero, content, motion, deploy. Two hours a night until the URL went green.</p>
        </div>
      </div>

      {/* right rail */}
      <div className="tl-events">
        <div className="day-divider"><span className="mono" style={{color: 'var(--accent-rare)'}}>Phase 01 · The Oracle</span><span className="line"></span></div>

        <div className="tl-event">
          <span className="hh">Night 01</span>
          <div className="what">First Claude conversation. Sketched the whole thing as a chat. Magic 8 ball UI scaffolded. Pure CSS, no backend. <span className="tag">scoping</span><span className="quiet">"Build me a magic 8 ball that answers one question."</span></div>
        </div>
        <div className="tl-event">
          <span className="hh">Night 02</span>
          <div className="what">Claude API wired through a Next.js route handler. First real answer. The shake-and-lit state already felt right. <span className="tag shipped">shipped</span></div>
        </div>
        <div className="tl-event">
          <span className="hh">Night 03</span>
          <div className="what">Token usage from iterating the night before was higher than expected. Realised there was no rate limit. <span className="tag broke">broke</span><span className="quiet">Built 5/IP rate limiting and the "Dang!" modal the same evening.</span></div>
        </div>
        <div className="tl-event">
          <span className="hh">Night 04</span>
          <div className="what">Oracle couldn't answer "what's for dinner?" Refusals were too loose. Spent the whole evening on the guardrail layer. ~220 lines of detector logic across ten classifiers, ~80 hand-written canned responses, 11 prompt-injection regexes. <span className="tag broke">broke</span><span className="quiet">This is when the project became serious.</span></div>
        </div>

        <div className="day-divider"><span className="mono" style={{color: 'var(--accent-rare)'}}>Phase 02 · The portfolio</span><span className="line"></span></div>

        <div className="tl-event">
          <span className="hh">Night 05</span>
          <div className="what">Next.js scaffold. Cormorant + DM Sans + DM Mono via <code>next/font</code>. Hero, ticker, nav. GSAP scroll triggers wired. <span className="tag shipped">shipped</span></div>
        </div>
        <div className="tl-event">
          <span className="hh">Night 06</span>
          <div className="what">Work cards, Career, Skills, Writing. Content lifted from the CV with two passes of edit. <span className="tag shipped">shipped</span></div>
        </div>
        <div className="tl-event">
          <span className="hh">Night 07</span>
          <div className="what">Hooked the Oracle into the homepage as a floating "Consult the Oracle" link. Pull-quote section. Cursor follower. <span className="tag shipped">shipped</span><span className="quiet">In retrospect: too buried. Promoted to a full section in v2.</span></div>
        </div>
        <div className="tl-event">
          <span className="hh">Night 08</span>
          <div className="what">OG image, favicon, metadata, sitemap. Deploy. <code>martina-edwards.vercel.app</code> went green. <span className="tag shipped">shipped</span></div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* ── anatomy ── */}
<section className="anatomy">
  <div className="wrap">
    <div className="hdr">
      <span className="mono label">Anatomy</span>
      <h2>What happens between a question and an <em>answer.</em></h2>
    </div>

    <div className="pipe">
      <div className="node"><div className="num">01</div><div className="t">User question</div><div className="d">Free text from the input, or one of four canned suggestions.</div></div>
      <div className="arrow">→</div>
      <div className="node"><div className="num">02</div><div className="t">Rate-limit</div><div className="d">5 questions per IP per session, enforced server-side.</div></div>
      <div className="arrow">→</div>
      <div className="node rare"><div className="num">03</div><div className="t">Guardrail router</div><div className="d">Ten detectors: injection, salary, contact, availability, meta, compliment, hired, specific topic, off-topic. Most questions never reach Claude.</div></div>
    </div>
    <div className="pipe" style={{gridTemplateColumns: 'repeat(3,1fr)', maxWidth: '780px', marginLeft: 'auto'}}>
      <div className="node accent"><div className="num">04</div><div className="t">Claude (if it gets that far)</div><div className="d"><code>claude-sonnet-4-6</code> with <code>max_tokens: 60</code>. The cap is the constraint that keeps answers short enough to fit the 8-ball window.</div></div>
      <div className="arrow">→</div>
      <div className="node rare"><div className="num">05</div><div className="t">Negative-signal sweep</div><div className="d">~20 trigger phrases. If the model drifts negative, swap with a fallback from the “Hire her” pool.</div></div>
    </div>

    <div className="anatomy-grid" style={{marginTop: '3rem'}}>
      <div>
        <div className="mono h rare">✕ Refuses (and how)</div>
        <ul>
          <li><strong>11 prompt-injection regexes</strong> — “ignore previous instructions”, “pretend to be”, “system prompt”, jailbreak vocabulary</li>
          <li><strong>~20 negative-signal phrases</strong> — if the model drifts to “not qualified”, “red flag”, etc., swap for a fallback</li>
          <li>Salary, compensation, contract — routed to canned responses, never to the model</li>
          <li>Off-topic questions — routed to the magic-8-ball pool. The oracle stays in character.</li>
        </ul>
      </div>
      <div>
        <div className="mono h accent">✓ Answers (with sources)</div>
        <ul>
          <li><strong>13 response pools</strong>, ~80 hand-written replies total</li>
          <li>Contact, availability, meta-questions — each have a dedicated pool of 4 responses</li>
          <li>Specific topics (dinner, lottery, mistakes, looking bad to your team) — hard-coded one-liners</li>
          <li>Hiring intent (<code>“we hired her”</code>) — triggers a celebration easter egg</li>
          <li>Everything else — the model, with the CV as the source of truth</li>
        </ul>
      </div>
    </div>
  </div>
</section>

{/* ── toolchain ── */}
<section className="tools">
  <div className="wrap">
    <div className="hdr">
      <span className="mono" style={{color: 'var(--accent)'}}>Tool chain</span>
      <h2>Five tools. <em>Each one broke at least once.</em></h2>
    </div>

    <div className="tool-rows">
      <div className="tool-row">
        <div className="n">01</div>
        <div className="t">Claude<span className="role">Architecture & copy</span></div>
        <div className="used">Wrote the system prompt, drafted three versions of the hero copy, walked through the route handler shape. Used like a senior co-worker who's good at scoping and rough drafts.</div>
        <div className="broke">Confidently invented an API method that doesn't exist. Cost me 20 minutes. Worth it for the rest.</div>
      </div>
      <div className="tool-row">
        <div className="n">02</div>
        <div className="t">Claude Code<span className="role">Code generation</span></div>
        <div className="used">Drafted the rate limiter and the guardrail layer. Roughly three review rounds each. Strong at small, well-scoped functions.</div>
        <div className="broke">Burned tokens fast when I iterated the whole site through it. Moved the exploratory work (design choices, copy drafts, refactor questions) to Claude on claude.ai (flat-rate), and only ran Claude Code when I had a concrete change to ship.</div>
      </div>
      <div className="tool-row">
        <div className="n">03</div>
        <div className="t">VS Code<span className="role">Editor</span></div>
        <div className="used">Open the whole time: file tree, git diff, terminal. Most code edits, though, went through the Claude Code app and got pulled into VS Code at commit time.</div>
        <div className="broke">The inline-edit UX inside VS Code didn't fit the way I was working; the standalone Claude Code app was a tighter loop for full-file changes.</div>
      </div>
      <div className="tool-row">
        <div className="n">04</div>
        <div className="t">GitHub<span className="role">Version control</span></div>
        <div className="used">Branch per session. The "guardrails" branch is the most-amended one. Squash-merged on Sunday night.</div>
        <div className="broke">Nothing. GitHub did GitHub.</div>
      </div>
      <div className="tool-row">
        <div className="n">05</div>
        <div className="t">Vercel<span className="role">Deployment</span></div>
        <div className="used">Auto-deploys on push. Env vars handle the API key. Built-in OG generation. Excellent UX end to end.</div>
        <div className="broke">Didn't.</div>
      </div>
    </div>
  </div>
</section>

{/* ── shipped ── */}
<section className="shipped">
  <div className="wrap">
    <div className="hdr">
      <span className="mono" style={{color: 'var(--cream-mute)'}}>What shipped</span>
      <h2>Four artefacts, all in production.</h2>
    </div>

    <div className="ship-grid">
      <div className="item">
        <div className="viz viz-oracle">
          <div className="glyph">8</div>
          <div>
            <div className="quote">“Signs point to yes. Particularly the ones on her CV.”</div>
            <div className="who">— 8 ball</div>
          </div>
        </div>
        <div className="t">The Oracle</div>
        <p className="d">Claude API with a ~220-line guardrail layer: ten classifiers, 11 injection regexes, ~80 canned responses, rate limiting (5/IP), a twisted magic-8-ball fallback, and an easter egg for the one question it's allowed to be confident about.</p>
        <div className="meta"><span>claude-sonnet-4-6</span><span>max_tokens: 60</span><span>~220 lines guardrail</span></div>
      </div>
      <div className="item">
        <div className="viz viz-hero">
          <div className="name">Martina <em>Edwards</em></div>
          <div className="tape">AI Acceleration · <b>2 days</b> · HITL · Legora · <b>13,000 hrs</b> · Regulated environments · …</div>
        </div>
        <div className="t">Full portfolio</div>
        <p className="d">Next.js 16 + TypeScript. GSAP scroll triggers, clip-path reveals, the ticker, the work cards, the cursor follower. Cormorant Garamond + DM Sans + DM Mono via <code style={{fontFamily: '\'DM Mono\',monospace', color: 'var(--cream)'}}>next/font</code>.</p>
        <div className="meta"><span>Next.js</span><span>GSAP</span><span>next/font</span></div>
      </div>
      <div className="item">
        <div className="viz viz-cards">
          <div className="c"><div className="m">2 days</div><div className="l">Legora</div></div>
          <div className="c"><div className="m">13k+</div><div className="l">Webex</div></div>
          <div className="c"><div className="m">5 yrs</div><div className="l">SharePoint</div></div>
          <div className="c"><div className="m">AASB</div><div className="l">Vercel</div></div>
        </div>
        <div className="t">Eight work cards · zero employer names</div>
        <p className="d">Each card carries the metric, the method, and the tag stack. The employer is removed deliberately. The work was the point, not the logo above it.</p>
        <div className="meta"><span>Content design</span><span>Editorial</span></div>
      </div>
      <div className="item">
        <div className="viz viz-log">
          <div className="ln cmd"><span className="ts">$</span><span>vercel deploy --prod</span></div>
          <div className="ln ok"><span className="ts">12.4s</span><span className="mark">✓</span><span>Compiled</span></div>
          <div className="ln ok"><span className="ts">  </span><span className="mark">✓</span><span>Linted, type-checked</span></div>
          <div className="ln ok"><span className="ts">  </span><span className="mark">✓</span><span>Deployed</span></div>
          <div className="ln url"><span className="ts">→</span><span>martina-edwards.vercel.app</span></div>
        </div>
        <div className="t">Live in production</div>
        <p className="d">GitHub → Vercel pipeline. Auto-deploys on push to <code style={{fontFamily: '\'DM Mono\',monospace', color: 'var(--cream)'}}>master</code>. Env vars for the Anthropic key. OG image, metadata, sitemap all generated at build time.</p>
        <div className="meta"><span>Vercel</span><span>GitHub</span><span>next/font</span></div>
      </div>
    </div>
  </div>
</section>

{/* ── CTA ── */}
<section className="cta">
  <div className="wrap" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem'}}>
    <p>The Oracle is <em>still taking questions.</em></p>
    <div className="btns">
      <Link href="/oracle" className="btn primary">Consult the Oracle →</Link>
      <Link href="/#work" className="btn ghost">All work →</Link>
    </div>
  </div>
</section>

<footer>
  <div className="wrap" style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
    <span>Martina Edwards © 2026</span>
    <span>#RedefinedByAI</span>
  </div>
</footer>
      </div>
    </>
  )
}
