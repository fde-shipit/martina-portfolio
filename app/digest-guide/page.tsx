"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const STORAGE_KEY = "the-digest-guide-progress";

const ALL_STEP_IDS = [
  "step-accounts-1", "step-accounts-2", "step-accounts-3",
  "step-node-1", "step-node-2",
  "step-term-1", "step-term-2",
  "step-repo-1", "step-repo-2", "step-repo-3",
  "step-sec-1", "step-sec-2", "step-sec-3",
  "step-local-1", "step-local-2", "step-local-3",
  "step-vercel-1", "step-vercel-2", "step-vercel-3",
  "step-limits-1",
  "step-changes-1", "step-changes-2",
  "step-ts-1", "step-ts-2", "step-ts-3", "step-ts-4", "step-ts-5",
];

const SECTIONS = [
  { id: "accounts",     steps: ["step-accounts-1", "step-accounts-2", "step-accounts-3"] },
  { id: "node",         steps: ["step-node-1", "step-node-2"] },
  { id: "terminal",     steps: ["step-term-1", "step-term-2"] },
  { id: "repo",         steps: ["step-repo-1", "step-repo-2", "step-repo-3"] },
  { id: "secrets",      steps: ["step-sec-1", "step-sec-2", "step-sec-3"] },
  { id: "local",        steps: ["step-local-1", "step-local-2", "step-local-3"] },
  { id: "vercel",       steps: ["step-vercel-1", "step-vercel-2", "step-vercel-3"] },
  { id: "limits",       steps: ["step-limits-1"] },
  { id: "changes",      steps: ["step-changes-1", "step-changes-2"] },
  { id: "troubleshoot", steps: ["step-ts-1", "step-ts-2", "step-ts-3", "step-ts-4", "step-ts-5"] },
];

// ── CSS ────────────────────────────────────────────────────────────────────

const GUIDE_CSS = `
  nav, .mobile-nav { display: none !important; }
  #progress-bar { display: none !important; }

  :root {
    --dg-bg: #ffffff;
    --dg-text: #0a0a0a;
    --dg-text-mid: #444;
    --dg-text-dim: #888;
    --dg-border: #e8e8e8;
    --dg-sidebar-bg: #f7f7f7;
    --dg-code-bg: #0c0c10;
    --dg-code-text: #d4d4d8;
    --dg-check: #16a34a;
    --dg-warn-bg: #fffbeb;
    --dg-warn-text: #92400e;
    --dg-danger-bg: #fef2f2;
    --dg-tip-bg: #f0fdf4;
    --dg-info-bg: #f8fafc;
    --dg-info-border: #cbd5e1;
    --dg-sidebar-w: 272px;
  }

  html { scroll-behavior: smooth; }

  .dg-wrap {
    display: grid;
    grid-template-columns: var(--dg-sidebar-w) 1fr;
    min-height: 100vh;
    background: var(--dg-bg);
    color: var(--dg-text);
    font-family: var(--font-dm-sans), system-ui, sans-serif;
    font-size: 15px;
    line-height: 1.65;
    box-sizing: border-box;
  }
  .dg-wrap *, .dg-wrap *::before, .dg-wrap *::after { box-sizing: border-box; }

  /* Sidebar */
  .dg-sidebar {
    position: sticky;
    top: 0;
    height: 100vh;
    overflow-y: auto;
    background: var(--dg-sidebar-bg);
    border-right: 1px solid var(--dg-border);
    padding: 32px 20px 40px;
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  .dg-sidebar::-webkit-scrollbar { width: 3px; }
  .dg-sidebar::-webkit-scrollbar-thumb { background: #ddd; border-radius: 2px; }

  .dg-back-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: var(--dg-text-dim);
    text-decoration: none;
    letter-spacing: 0.01em;
    margin-bottom: 28px;
    transition: color 0.15s;
  }
  .dg-back-link:hover { color: var(--dg-text); }
  .dg-back-link::before { content: '←'; font-size: 11px; }

  .dg-sidebar-label {
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--dg-text-dim);
    margin-bottom: 12px;
  }

  /* Progress */
  .dg-progress-wrap {
    margin-bottom: 24px;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--dg-border);
  }
  .dg-progress-bar-track {
    height: 2px;
    background: var(--dg-border);
    border-radius: 2px;
    margin-bottom: 8px;
    overflow: hidden;
  }
  .dg-progress-bar-fill {
    height: 100%;
    background: var(--dg-check);
    border-radius: 2px;
    transition: width 0.4s ease;
  }
  .dg-progress-text {
    font-size: 11px;
    color: var(--dg-text-dim);
    font-family: var(--font-dm-mono), monospace;
  }
  .dg-progress-text span { color: var(--dg-check); font-weight: 500; }

  /* TOC */
  .dg-toc { list-style: none; display: flex; flex-direction: column; gap: 2px; padding: 0; margin: 0; }
  .dg-toc-section { margin-bottom: 8px; }
  .dg-toc-section-label {
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--dg-text-dim);
    padding: 6px 8px 4px;
    display: block;
  }
  .dg-toc a {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 5px 8px;
    border-radius: 4px;
    font-size: 12.5px;
    color: var(--dg-text-mid);
    text-decoration: none;
    transition: all 0.12s;
    line-height: 1.3;
  }
  .dg-toc a:hover { background: var(--dg-border); color: var(--dg-text); }
  .dg-toc a.done { color: var(--dg-check); }
  .dg-toc-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: var(--dg-border);
    flex-shrink: 0;
    transition: background 0.2s;
  }
  .dg-toc a.done .dg-toc-dot { background: var(--dg-check); }
  .dg-toc a.active { background: var(--dg-text); color: #fff; }
  .dg-toc a.active .dg-toc-dot { background: #fff; }

  /* Main */
  .dg-main {
    padding: 56px 64px 100px 64px;
    max-width: 780px;
  }

  /* Page header */
  .dg-page-header {
    margin-bottom: 56px;
    padding-bottom: 40px;
    border-bottom: 1px solid var(--dg-border);
  }
  .dg-page-super {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--dg-text-dim);
    margin-bottom: 16px;
  }
  .dg-page-title {
    font-size: clamp(28px, 4vw, 40px);
    font-weight: 300;
    line-height: 1.15;
    letter-spacing: -0.02em;
    margin-bottom: 16px;
    font-family: var(--font-dm-sans), sans-serif;
  }
  .dg-page-title em { font-style: italic; font-weight: 300; }
  .dg-page-desc {
    font-size: 15px;
    color: var(--dg-text-mid);
    line-height: 1.7;
    max-width: 560px;
    margin-bottom: 20px;
  }
  .dg-page-meta { display: flex; gap: 20px; flex-wrap: wrap; }
  .dg-page-meta-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    color: var(--dg-text-dim);
    font-family: var(--font-dm-mono), monospace;
    letter-spacing: 0.02em;
  }
  .dg-page-meta-item::before { content: '·'; color: var(--dg-border); }
  .dg-page-meta-item:first-child::before { display: none; }

  /* Sections */
  .dg-section {
    margin-bottom: 64px;
    scroll-margin-top: 32px;
  }
  .dg-section-super {
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--dg-text-dim);
    margin-bottom: 8px;
  }
  .dg-section-title {
    font-size: 22px;
    font-weight: 400;
    letter-spacing: -0.02em;
    line-height: 1.2;
    margin-bottom: 12px;
    font-family: var(--font-dm-sans), sans-serif;
  }
  .dg-section-title em { font-style: italic; font-weight: 300; }
  .dg-section-intro {
    font-size: 14px;
    color: var(--dg-text-mid);
    line-height: 1.7;
    margin-bottom: 24px;
    max-width: 540px;
  }

  /* Steps */
  .dg-steps { display: flex; flex-direction: column; gap: 12px; }
  .dg-step {
    border: 1px solid var(--dg-border);
    border-radius: 6px;
    overflow: hidden;
    transition: border-color 0.15s;
  }
  .dg-step.completed { border-color: #dcfce7; background: #f0fdf4; }
  .dg-step-header {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    padding: 16px 18px;
    cursor: pointer;
    user-select: none;
  }
  .dg-step-check {
    width: 20px; height: 20px;
    border: 1.5px solid var(--dg-border);
    border-radius: 4px;
    flex-shrink: 0;
    margin-top: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s;
    cursor: pointer;
  }
  .dg-step.completed .dg-step-check {
    background: var(--dg-check);
    border-color: var(--dg-check);
  }
  .dg-step-check svg { display: none; }
  .dg-step.completed .dg-step-check svg { display: block; }
  .dg-step-content { flex: 1; min-width: 0; }
  .dg-step-num {
    font-size: 9px;
    font-family: var(--font-dm-mono), monospace;
    color: var(--dg-text-dim);
    letter-spacing: 0.08em;
    margin-bottom: 3px;
  }
  .dg-step-title {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.3;
  }
  .dg-step.completed .dg-step-title {
    color: var(--dg-text-dim);
    text-decoration: line-through;
    text-decoration-color: #bbb;
  }
  .dg-step-body { padding: 0 18px 18px 52px; display: none; }
  .dg-step.open .dg-step-body { display: block; }
  .dg-step-desc {
    font-size: 13.5px;
    color: var(--dg-text-mid);
    line-height: 1.7;
    margin-bottom: 14px;
  }
  .dg-step-desc:last-child { margin-bottom: 0; }
  .dg-step-desc a { color: var(--dg-text); }

  /* Code */
  .dg-code-block {
    position: relative;
    margin: 12px 0;
    border-radius: 5px;
    overflow: hidden;
    background: var(--dg-code-bg);
  }
  .dg-code-label {
    font-family: var(--font-dm-mono), monospace;
    font-size: 9px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #555;
    padding: 8px 14px 6px;
    border-bottom: 1px solid #1a1a20;
  }
  .dg-code-block pre {
    padding: 14px;
    overflow-x: auto;
    font-family: var(--font-dm-mono), monospace;
    font-size: 12.5px;
    line-height: 1.65;
    color: var(--dg-code-text);
    margin: 0;
  }
  .dg-code-block pre .c { color: #555; font-style: italic; }
  .dg-code-block pre .k { color: #93c5fd; }
  .dg-code-block pre .v { color: #86efac; }
  .dg-copy-btn {
    position: absolute;
    top: 6px;
    right: 8px;
    background: #1e1e28;
    border: 1px solid #2a2a38;
    color: #666;
    padding: 3px 9px;
    border-radius: 3px;
    font-family: var(--font-dm-mono), monospace;
    font-size: 9px;
    letter-spacing: 0.06em;
    cursor: pointer;
    transition: all 0.15s;
  }
  .dg-copy-btn:hover { background: #2a2a38; color: #aaa; }
  .dg-copy-btn.copied { color: var(--dg-check); border-color: var(--dg-check); }

  /* Callouts */
  .dg-callout {
    border-radius: 5px;
    padding: 13px 16px;
    margin: 14px 0;
    font-size: 13px;
    line-height: 1.65;
    display: flex;
    gap: 10px;
    align-items: flex-start;
  }
  .dg-callout-icon { flex-shrink: 0; font-size: 13px; margin-top: 1px; }
  .dg-callout.warn { background: var(--dg-warn-bg); border: 1px solid #fcd34d; }
  .dg-callout.warn .dg-callout-icon::before { content: '⚠'; }
  .dg-callout.warn .dg-callout-text { color: var(--dg-warn-text); }
  .dg-callout.danger { background: var(--dg-danger-bg); border: 1px solid #fca5a5; }
  .dg-callout.danger .dg-callout-icon::before { content: '✕'; color: #dc2626; }
  .dg-callout.danger .dg-callout-text { color: #7f1d1d; }
  .dg-callout.tip { background: var(--dg-tip-bg); border: 1px solid #86efac; }
  .dg-callout.tip .dg-callout-icon::before { content: '→'; color: var(--dg-check); }
  .dg-callout.tip .dg-callout-text { color: #14532d; }
  .dg-callout.info { background: var(--dg-info-bg); border: 1px solid var(--dg-info-border); }
  .dg-callout.info .dg-callout-icon::before { content: '·'; color: #94a3b8; font-size: 18px; line-height: 1; }
  .dg-callout.info .dg-callout-text { color: var(--dg-text-mid); }
  .dg-callout a { color: inherit; font-weight: 500; }

  /* Inline code */
  .dg-wrap code {
    font-family: var(--font-dm-mono), monospace;
    font-size: 11.5px;
    background: #f0f0f0;
    padding: 1px 5px;
    border-radius: 3px;
    color: var(--dg-text);
  }
  .dg-step.completed code { background: #e0f2e9; }

  /* Account cards */
  .dg-account-grid { display: flex; flex-direction: column; gap: 10px; margin: 16px 0; }
  .dg-account-card {
    border: 1px solid var(--dg-border);
    border-radius: 6px;
    padding: 14px 16px;
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 12px;
    align-items: center;
  }
  .dg-account-icon { font-size: 18px; }
  .dg-account-name { font-size: 13px; font-weight: 500; margin-bottom: 2px; }
  .dg-account-desc { font-size: 12px; color: var(--dg-text-dim); }
  .dg-account-cost {
    font-family: var(--font-dm-mono), monospace;
    font-size: 10px;
    color: var(--dg-check);
    background: #f0fdf4;
    border: 1px solid #86efac;
    padding: 2px 7px;
    border-radius: 10px;
    white-space: nowrap;
  }
  .dg-account-cost.paid { color: #92400e; background: var(--dg-warn-bg); border-color: #fcd34d; }

  /* Divider */
  .dg-divider { border: none; border-top: 1px solid var(--dg-border); margin: 0 0 40px; }

  /* Command list */
  .dg-cmd-list { display: flex; flex-direction: column; gap: 6px; margin: 12px 0; }
  .dg-cmd-item {
    display: grid;
    grid-template-columns: auto 1fr;
    border: 1px solid var(--dg-border);
    border-radius: 4px;
    overflow: hidden;
    font-family: var(--font-dm-mono), monospace;
    font-size: 12px;
  }
  .dg-cmd { background: var(--dg-code-bg); color: var(--dg-code-text); padding: 7px 12px; }
  .dg-cmd-desc { background: #f8f8f8; color: var(--dg-text-mid); padding: 7px 12px; font-size: 11.5px; font-family: var(--font-dm-sans), sans-serif; }

  /* Responsive */
  @media (max-width: 780px) {
    .dg-wrap { grid-template-columns: 1fr; }
    .dg-sidebar { position: relative; height: auto; border-right: none; border-bottom: 1px solid var(--dg-border); padding: 20px; }
    .dg-main { padding: 32px 24px 60px; }
    .dg-step-body { padding: 0 14px 14px 14px; }
  }
`;

// ── Mini-components ────────────────────────────────────────────────────────

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }
  return (
    <button className={`dg-copy-btn${copied ? " copied" : ""}`} onClick={copy}>
      {copied ? "copied" : "copy"}
    </button>
  );
}

function CB({ label, text, children }: { label: string; text: string; children: React.ReactNode }) {
  return (
    <div className="dg-code-block">
      <div className="dg-code-label">{label}</div>
      <CopyBtn text={text} />
      <pre>{children}</pre>
    </div>
  );
}

function Callout({ type, children }: { type: "warn" | "danger" | "tip" | "info"; children: React.ReactNode }) {
  return (
    <div className={`dg-callout ${type}`}>
      <span className="dg-callout-icon" />
      <span className="dg-callout-text">{children}</span>
    </div>
  );
}

function Desc({ children }: { children: React.ReactNode }) {
  return <p className="dg-step-desc">{children}</p>;
}

interface StepProps {
  id: string;
  num: string;
  title: string;
  children: React.ReactNode;
  completed: boolean;
  open: boolean;
  onToggle: () => void;
  onComplete: () => void;
}

function Step({ id, num, title, children, completed, open, onToggle, onComplete }: StepProps) {
  const cls = ["dg-step", completed ? "completed" : "", open ? "open" : ""].filter(Boolean).join(" ");
  return (
    <div className={cls} id={id}>
      <div className="dg-step-header" onClick={() => { if (!completed) onToggle(); }}>
        <div className="dg-step-check" onClick={e => { e.stopPropagation(); onComplete(); }}>
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="dg-step-content">
          <div className="dg-step-num">{num}</div>
          <div className="dg-step-title">{title}</div>
        </div>
      </div>
      <div className="dg-step-body">{children}</div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────

export default function DigestGuidePage() {
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [openSteps, setOpenSteps] = useState<Set<string>>(new Set());
  const [activeSection, setActiveSection] = useState("");

  // Restore from localStorage + auto-open first incomplete step per section
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      const completedSet = new Set<string>(Object.keys(saved).filter(k => saved[k]));
      setCompleted(completedSet);
      const toOpen = new Set<string>();
      SECTIONS.forEach(({ steps }) => {
        const first = steps.find(id => !completedSet.has(id));
        if (first) toOpen.add(first);
      });
      setOpenSteps(toOpen);
    } catch { /* ignore */ }
  }, []);

  // Scroll spy
  useEffect(() => {
    const sectionEls = SECTIONS
      .map(s => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { rootMargin: "-20% 0px -70% 0px" });
    sectionEls.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function toggleStep(id: string) {
    setOpenSteps(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  function markComplete(id: string) {
    setCompleted(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      const data: Record<string, boolean> = {};
      next.forEach(k => { data[k] = true; });
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch { /* ignore */ }
      return next;
    });
    setOpenSteps(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }

  const totalSteps = ALL_STEP_IDS.length;
  const doneCount = completed.size;
  const pct = totalSteps ? (doneCount / totalSteps) * 100 : 0;

  function isSectionDone(steps: string[]) {
    return steps.length > 0 && steps.every(id => completed.has(id));
  }

  function s(id: string, num: string, title: string, body: React.ReactNode) {
    return (
      <Step
        key={id} id={id} num={num} title={title}
        completed={completed.has(id)} open={openSteps.has(id)}
        onToggle={() => toggleStep(id)} onComplete={() => markComplete(id)}
      >{body}</Step>
    );
  }

  return (
    <>
      <style>{GUIDE_CSS}</style>
      <div className="dg-wrap">

        {/* ── Sidebar ───────────────────────────────────────────── */}
        <aside className="dg-sidebar">
          <Link href="/" className="dg-back-link">Martina Edwards</Link>

          <div className="dg-progress-wrap">
            <div className="dg-sidebar-label">Your progress</div>
            <div className="dg-progress-bar-track">
              <div className="dg-progress-bar-fill" style={{ width: `${pct}%` }} />
            </div>
            <div className="dg-progress-text">
              <span>{doneCount}</span> of <span>{totalSteps}</span> steps complete
            </div>
          </div>

          <div className="dg-sidebar-label">Contents</div>
          <ul className="dg-toc">
            <li className="dg-toc-section">
              <span className="dg-toc-section-label">Before you start</span>
              {[
                { href: "accounts", label: "Accounts to create" },
                { href: "node", label: "Install Node.js" },
                { href: "terminal", label: "Set up your terminal" },
              ].map(({ href, label }) => {
                const sec = SECTIONS.find(s => s.id === href)!;
                const done = isSectionDone(sec.steps);
                return (
                  <a key={href} href={`#${href}`} className={[done ? "done" : "", activeSection === href ? "active" : ""].filter(Boolean).join(" ")}>
                    <span className="dg-toc-dot" />{label}
                  </a>
                );
              })}
            </li>
            <li className="dg-toc-section">
              <span className="dg-toc-section-label">Get the project</span>
              {[
                { href: "repo", label: "Fork & clone the repo" },
                { href: "secrets", label: "Configure your API key" },
                { href: "local", label: "Run locally" },
              ].map(({ href, label }) => {
                const sec = SECTIONS.find(s => s.id === href)!;
                const done = isSectionDone(sec.steps);
                return (
                  <a key={href} href={`#${href}`} className={[done ? "done" : "", activeSection === href ? "active" : ""].filter(Boolean).join(" ")}>
                    <span className="dg-toc-dot" />{label}
                  </a>
                );
              })}
            </li>
            <li className="dg-toc-section">
              <span className="dg-toc-section-label">Ship it</span>
              {[
                { href: "vercel", label: "Deploy to Vercel" },
                { href: "limits", label: "Set spend limits" },
              ].map(({ href, label }) => {
                const sec = SECTIONS.find(s => s.id === href)!;
                const done = isSectionDone(sec.steps);
                return (
                  <a key={href} href={`#${href}`} className={[done ? "done" : "", activeSection === href ? "active" : ""].filter(Boolean).join(" ")}>
                    <span className="dg-toc-dot" />{label}
                  </a>
                );
              })}
            </li>
            <li className="dg-toc-section">
              <span className="dg-toc-section-label">Ongoing</span>
              {[
                { href: "changes", label: "Making changes" },
                { href: "troubleshoot", label: "Troubleshooting" },
              ].map(({ href, label }) => {
                const sec = SECTIONS.find(s => s.id === href)!;
                const done = isSectionDone(sec.steps);
                return (
                  <a key={href} href={`#${href}`} className={[done ? "done" : "", activeSection === href ? "active" : ""].filter(Boolean).join(" ")}>
                    <span className="dg-toc-dot" />{label}
                  </a>
                );
              })}
            </li>
          </ul>
        </aside>

        {/* ── Main ──────────────────────────────────────────────── */}
        <main className="dg-main">

          <header className="dg-page-header">
            <p className="dg-page-super">§ Dev Setup Guide</p>
            <h1 className="dg-page-title">Ship The News Agent on <em>Windows.</em></h1>
            <p className="dg-page-desc">A step-by-step walkthrough for setting up your development pipeline from scratch — accounts, tools, local environment, and your first production deploy. No prior deployment experience needed.</p>
            <div className="dg-page-meta">
              <span className="dg-page-meta-item">Windows 10 or 11</span>
              <span className="dg-page-meta-item">~45–60 minutes</span>
              <span className="dg-page-meta-item">VS Code + Git already installed</span>
              <span className="dg-page-meta-item">Git Bash terminal</span>
            </div>
          </header>

          {/* ── ACCOUNTS ──────────────────────────────────────── */}
          <section className="dg-section" id="accounts">
            <p className="dg-section-super">Step 1</p>
            <h2 className="dg-section-title">Create your <em>accounts.</em></h2>
            <p className="dg-section-intro">Four services. Three are completely free. One charges per use — and you'll set a hard spending cap before using it. Open each link in a new tab and come back here.</p>

            <div className="dg-account-grid">
              {[
                { icon: "🐙", name: "GitHub",    desc: "Stores your code and connects to Vercel for automatic deploys", cost: "Free", paid: false },
                { icon: "▲",  name: "Vercel",    desc: "Hosts your live website. Deploys automatically when you push to GitHub", cost: "Free", paid: false },
                { icon: "◎",  name: "Anthropic", desc: "The AI that runs the agent. You pay per use — about $0.05–0.10 per digest run", cost: "Pay-per-use", paid: true },
                { icon: "⚡", name: "Upstash",   desc: "Redis database for rate limiting (multi-user mode only — skip if self-hosting)", cost: "Free tier", paid: false },
              ].map(({ icon, name, desc, cost, paid }) => (
                <div key={name} className="dg-account-card">
                  <div className="dg-account-icon">{icon}</div>
                  <div>
                    <div className="dg-account-name">{name}</div>
                    <div className="dg-account-desc">{desc}</div>
                  </div>
                  <span className={`dg-account-cost${paid ? " paid" : ""}`}>{cost}</span>
                </div>
              ))}
            </div>

            <div className="dg-steps" style={{ marginTop: 20 }}>
              {s("step-accounts-1", "Step 1.1", "Create a GitHub account at github.com", <>
                <Desc>Go to <a href="https://github.com" target="_blank" rel="noreferrer">github.com</a> → Sign up. Use your real email — GitHub will send you a verification link. Choose the free plan when asked.</Desc>
                <Callout type="tip">Pick a professional username — it'll appear in your repo URLs and on your Vercel deployment links.</Callout>
              </>)}
              {s("step-accounts-2", "Step 1.2", "Create a Vercel account at vercel.com", <>
                <Desc>Go to <a href="https://vercel.com" target="_blank" rel="noreferrer">vercel.com</a> → Sign Up → <strong>Continue with GitHub</strong>. This connects the two accounts immediately — which you need anyway. Authorize Vercel when GitHub asks.</Desc>
                <Callout type="info">You're creating a Vercel account by logging in with GitHub. No separate password needed.</Callout>
              </>)}
              {s("step-accounts-3", "Step 1.3", "Create an Anthropic account at console.anthropic.com", <>
                <Desc>Go to <a href="https://console.anthropic.com" target="_blank" rel="noreferrer">console.anthropic.com</a> → Sign up. You'll need to add a payment method to get an API key, but you won't be charged until you actually use it. You'll set a hard spending cap in a later step before running anything.</Desc>
                <Callout type="warn">The Anthropic account for API access is <strong>separate</strong> from a Claude.ai subscription. You need both if you use Claude.ai — but only the API account is needed to run The News Agent.</Callout>
              </>)}
            </div>
          </section>

          <hr className="dg-divider" />

          {/* ── NODE ─────────────────────────────────────────── */}
          <section className="dg-section" id="node">
            <p className="dg-section-super">Step 2</p>
            <h2 className="dg-section-title">Install <em>Node.js.</em></h2>
            <p className="dg-section-intro">Node.js is the runtime that lets you run JavaScript on your computer (not just in a browser). It also installs <code>npm</code> — the package manager you'll use to install project dependencies.</p>
            <div className="dg-steps">
              {s("step-node-1", "Step 2.1", "Download and install Node.js LTS", <>
                <Desc>Go to <a href="https://nodejs.org" target="_blank" rel="noreferrer">nodejs.org</a>. You'll see two buttons — download the one labelled <strong>LTS</strong> (Long Term Support). This is the stable version. Run the installer and accept all defaults — you don't need to change anything.</Desc>
                <Callout type="tip">LTS means it's battle-tested and won't break things unexpectedly. Avoid the "Current" version for production projects.</Callout>
              </>)}
              {s("step-node-2", "Step 2.2", "Verify it installed correctly", <>
                <Desc>Open VS Code. Open the terminal with <code>Ctrl + `</code> (backtick — the key above Tab). Make sure it's using Git Bash (see next section if not). Run these two commands:</Desc>
                <CB label="Git Bash" text={"node --version\nnpm --version"}>
                  {"node --version\nnpm --version"}
                </CB>
                <Desc>You should see version numbers — something like <code>v20.11.0</code> and <code>10.2.4</code>. If you see "command not found", close and reopen VS Code, then try again — the installer sometimes needs a restart to take effect.</Desc>
              </>)}
            </div>
          </section>

          <hr className="dg-divider" />

          {/* ── TERMINAL ─────────────────────────────────────── */}
          <section className="dg-section" id="terminal">
            <p className="dg-section-super">Step 3</p>
            <h2 className="dg-section-title">Set up your <em>terminal.</em></h2>
            <p className="dg-section-intro">You already have Git Bash installed (it came with Git). This gives you Linux-style commands that every tutorial assumes — inside VS Code, so you never need to leave your editor.</p>
            <div className="dg-steps">
              {s("step-term-1", "Step 3.1", "Make Git Bash the default terminal in VS Code", <>
                <Desc>In VS Code: open the Command Palette with <code>Ctrl + Shift + P</code>. Type <strong>Terminal: Select Default Profile</strong> and press Enter. Select <strong>Git Bash</strong> from the list.</Desc>
                <Desc>Now open a new terminal (<code>Ctrl + `</code>). You should see a prompt ending in <code>$</code> — that's Git Bash. If it still shows PowerShell (the prompt ends in <code>{">"}</code>), close the terminal and open a new one.</Desc>
                <Callout type="tip">You can always check which shell you're in by looking at the dropdown in the top-right corner of the terminal panel.</Callout>
              </>)}
              {s("step-term-2", "Step 3.2", "The five commands you'll actually use", <>
                <Desc>You don't need to memorise the terminal. You need these five commands — everything else you can look up.</Desc>
                <div className="dg-cmd-list">
                  {[
                    ["pwd", "Show which folder you're currently in"],
                    ["ls", "List files and folders here"],
                    ["cd folder-name", "Move into a folder"],
                    ["cd ..", "Go up one folder"],
                    ["Ctrl + C", "Stop a running process (like a dev server)"],
                  ].map(([cmd, desc]) => (
                    <div key={cmd} className="dg-cmd-item">
                      <div className="dg-cmd">{cmd}</div>
                      <div className="dg-cmd-desc">{desc}</div>
                    </div>
                  ))}
                </div>
                <Callout type="tip">Tab autocompletes folder and file names. Type the first few letters and press Tab — it fills in the rest.</Callout>
              </>)}
            </div>
          </section>

          <hr className="dg-divider" />

          {/* ── REPO ─────────────────────────────────────────── */}
          <section className="dg-section" id="repo">
            <p className="dg-section-super">Step 4</p>
            <h2 className="dg-section-title">Fork &amp; clone <em>the repo.</em></h2>
            <p className="dg-section-intro">Forking creates your own copy of the project on GitHub. Cloning downloads it to your computer. You'll work on your local copy, then push changes back to GitHub — which triggers an automatic deploy.</p>
            <div className="dg-steps">
              {s("step-repo-1", "Step 4.1", "Fork the repository on GitHub", <>
                <Desc>Go to the repo on GitHub. In the top-right corner, click <strong>Fork</strong> → <strong>Create fork</strong>. GitHub creates a copy of the repo under your own account.</Desc>
                <Callout type="info">Forking means you own your copy. You can change anything without affecting the original. You can also pull in future updates from the original whenever you want.</Callout>
              </>)}
              {s("step-repo-2", "Step 4.2", "Clone it to your computer", <>
                <Desc>On your forked repo page, click the green <strong>Code</strong> button → make sure <strong>HTTPS</strong> is selected → click the copy icon next to the URL.</Desc>
                <Desc>In VS Code's terminal, navigate to where you want to keep your projects (e.g. <code>cd Documents</code>) and run:</Desc>
                <CB label="Git Bash" text={"git clone https://github.com/YOUR-USERNAME/the-digest.git\ncd the-digest"}>
                  {"git clone https://github.com/YOUR-USERNAME/the-digest.git\ncd the-digest"}
                </CB>
                <Desc>Git downloads the project and you move into it. You should now see all the project files in VS Code's sidebar.</Desc>
              </>)}
              {s("step-repo-3", "Step 4.3", "Configure Git with your identity", <>
                <Desc>If you've never used Git on this machine, run these once — it tells Git who's making changes:</Desc>
                <CB label="Git Bash" text={'git config --global user.name "Your Name"\ngit config --global user.email "your@email.com"'}>
                  {'git config --global user.name "Your Name"\ngit config --global user.email "your@email.com"'}
                </CB>
                <Desc>Use the same email as your GitHub account.</Desc>
              </>)}
            </div>
          </section>

          <hr className="dg-divider" />

          {/* ── SECRETS ──────────────────────────────────────── */}
          <section className="dg-section" id="secrets">
            <p className="dg-section-super">Step 5 — Read this carefully</p>
            <h2 className="dg-section-title">Configure your <em>API key.</em></h2>
            <p className="dg-section-intro">This is the most important section in the guide. API keys are passwords. How you store them determines whether your project stays secure or becomes expensive very quickly.</p>
            <Callout type="danger"><strong>The golden rule:</strong> your API key must never be committed to Git. If it ends up on GitHub — even for a minute, even in a private repo — rotate it immediately at console.anthropic.com and generate a new one. Bots scan GitHub continuously for exposed keys.</Callout>
            <div className="dg-steps" style={{ marginTop: 20 }}>
              {s("step-sec-1", "Step 5.1", "Get your Anthropic API key", <>
                <Desc>Go to <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noreferrer">console.anthropic.com/settings/keys</a> → <strong>Create Key</strong>. Give it a name (e.g. "the-digest-local"). Copy the key — it starts with <code>sk-ant-</code>. You can only see it once, so copy it now.</Desc>
                <Callout type="warn">If you close the page before copying, just delete that key and create a new one. You can have multiple keys and delete them anytime.</Callout>
              </>)}
              {s("step-sec-2", "Step 5.2", "Create your .env.local file", <>
                <Desc>In the project root (the <code>the-digest</code> folder), create a new file called <code>.env.local</code>. In VS Code you can right-click the file explorer sidebar → New File. Name it exactly <code>.env.local</code> — the dot at the start matters.</Desc>
                <Desc>Add this content, replacing the placeholder with your real key:</Desc>
                <CB label=".env.local" text={"ANTHROPIC_API_KEY=sk-ant-your-key-here\nNEXT_PUBLIC_MULTI_USER=false"}>
                  <span className="c"># Anthropic API key — never commit this file</span>{"\n"}
                  <span className="k">ANTHROPIC_API_KEY</span>=<span className="v">sk-ant-your-key-here</span>{"\n\n"}
                  <span className="c"># Self-hosted mode (no login required)</span>{"\n"}
                  <span className="k">NEXT_PUBLIC_MULTI_USER</span>=<span className="v">false</span>
                </CB>
              </>)}
              {s("step-sec-3", "Step 5.3", "Verify .gitignore is protecting it", <>
                <Desc>Open the <code>.gitignore</code> file in the project root. Look for a line that says <code>.env.local</code> — it should already be there. This tells Git to never track this file, even if you run <code>git add .</code></Desc>
                <Desc>To double-check it's working, run:</Desc>
                <CB label="Git Bash" text="git status">{"git status"}</CB>
                <Desc>Your <code>.env.local</code> file should <strong>not</strong> appear in the output. If it does, <code>.env.local</code> is not in your <code>.gitignore</code> — add it before proceeding.</Desc>
                <Callout type="danger"><strong>.env.local vs .env</strong> — Next.js treats these differently. <code>.env.local</code> is always gitignored by default. Plain <code>.env</code> is not. Always use <code>.env.local</code> for secrets on your machine.</Callout>
              </>)}
            </div>
          </section>

          <hr className="dg-divider" />

          {/* ── LOCAL ────────────────────────────────────────── */}
          <section className="dg-section" id="local">
            <p className="dg-section-super">Step 6</p>
            <h2 className="dg-section-title">Run it <em>locally.</em></h2>
            <p className="dg-section-intro">Before deploying to the world, run it on your own machine first. This is where you test changes, catch errors, and see what users will see — without affecting anyone.</p>
            <div className="dg-steps">
              {s("step-local-1", "Step 6.1", "Install project dependencies", <>
                <Desc>In the terminal, make sure you're in the project folder (run <code>pwd</code> — you should see <code>/c/Users/you/Documents/the-digest</code> or similar). Then run:</Desc>
                <CB label="Git Bash" text="npm install">{"npm install"}</CB>
                <Desc>This reads the <code>package.json</code> file and downloads all the libraries the project needs into a <code>node_modules</code> folder. It takes 1–2 minutes. You'll see a lot of text scrolling — that's normal.</Desc>
                <Callout type="info"><code>node_modules</code> can be hundreds of megabytes, but it's also in <code>.gitignore</code> — it never gets committed. Anyone who clones your repo just runs <code>npm install</code> themselves.</Callout>
              </>)}
              {s("step-local-2", "Step 6.2", "Start the development server", <>
                <CB label="Git Bash" text="npm run dev">{"npm run dev"}</CB>
                <Desc>Wait for the message <code>▲ Next.js ready on http://localhost:3000</code>. Then open your browser and go to <a href="http://localhost:3000" target="_blank" rel="noreferrer">localhost:3000</a>. You should see The News Agent running.</Desc>
                <Desc>To stop the server: click the terminal and press <code>Ctrl + C</code>.</Desc>
                <Callout type="tip">The dev server reloads automatically when you save a file. You'll see changes in the browser instantly — you don't need to restart it.</Callout>
              </>)}
              {s("step-local-3", "Step 6.3", "Test that it actually works end to end", <>
                <Desc>Pick a topic, select a signal type, and click Generate. Watch the agent log. You should see web searches completing and a digest appearing. If you get an API error, check that your key in <code>.env.local</code> is correct and has no extra spaces.</Desc>
                <Callout type="warn">Every successful generate call costs roughly $0.05–0.10. Run a few tests here, then set your spend limit in Step 8 before sharing it with anyone.</Callout>
              </>)}
            </div>
          </section>

          <hr className="dg-divider" />

          {/* ── VERCEL ───────────────────────────────────────── */}
          <section className="dg-section" id="vercel">
            <p className="dg-section-super">Step 7</p>
            <h2 className="dg-section-title">Deploy to <em>Vercel.</em></h2>
            <p className="dg-section-intro">Vercel watches your GitHub repo. Every time you push a change, it automatically rebuilds and redeploys your site. Your first deployment takes about 2 minutes.</p>
            <div className="dg-steps">
              {s("step-vercel-1", "Step 7.1", "Import the project in Vercel", <>
                <Desc>Go to <a href="https://vercel.com/new" target="_blank" rel="noreferrer">vercel.com/new</a>. You'll see a list of your GitHub repos. Find <strong>the-digest</strong> and click <strong>Import</strong>.</Desc>
                <Desc>On the configuration screen: leave all settings as defaults. Next.js is detected automatically. Do not click Deploy yet — you need to add your environment variables first.</Desc>
              </>)}
              {s("step-vercel-2", "Step 7.2", "Add your environment variables", <>
                <Desc>On the same configuration screen, expand <strong>Environment Variables</strong>. Add each variable from your <code>.env.local</code> file — key on the left, value on the right:</Desc>
                <CB label="Add these one at a time in Vercel's UI" text={"ANTHROPIC_API_KEY         sk-ant-your-key-here\nNEXT_PUBLIC_MULTI_USER    false"}>
                  {"ANTHROPIC_API_KEY         sk-ant-your-key-here\nNEXT_PUBLIC_MULTI_USER    false"}
                </CB>
                <Callout type="danger">This is the safe way to store secrets in production. Vercel encrypts these values — they're never visible to anyone, including you, after you save them. This is very different from putting them in your code.</Callout>
              </>)}
              {s("step-vercel-3", "Step 7.3", "Deploy", <>
                <Desc>Click <strong>Deploy</strong>. Vercel builds your project — you can watch the logs in real time. When it finishes, you'll see a confetti animation and a live URL like <code>the-digest-abc123.vercel.app</code>.</Desc>
                <Desc>Click the URL and test it. Generate a digest. Make sure it works exactly as it did locally.</Desc>
                <Callout type="tip">You can add a custom domain later: in Vercel, go to your project → Settings → Domains. You can connect any domain you own.</Callout>
              </>)}
            </div>
          </section>

          <hr className="dg-divider" />

          {/* ── LIMITS ───────────────────────────────────────── */}
          <section className="dg-section" id="limits">
            <p className="dg-section-super">Step 8 — Do this before sharing it</p>
            <h2 className="dg-section-title">Set your <em>spend limits.</em></h2>
            <p className="dg-section-intro">Before you share the URL with anyone, cap your Anthropic spending. This is your backstop — if something goes wrong or traffic spikes unexpectedly, this is what stops a surprise bill.</p>
            <div className="dg-steps">
              {s("step-limits-1", "Step 8.1", "Set a monthly hard cap in Anthropic console", <>
                <Desc>Go to <a href="https://console.anthropic.com/settings/billing" target="_blank" rel="noreferrer">console.anthropic.com/settings/billing</a> → <strong>Usage limits</strong>. Set a monthly budget cap — $10–20 is sensible for a personal project. When this limit is hit, the API stops responding until the next billing period. Your site shows an error rather than charging you more.</Desc>
                <Callout type="info">At ~$0.07 per digest run, $20/month = roughly 280 runs. That's about 9 a day — plenty for personal use or a small audience.</Callout>
              </>)}
            </div>
          </section>

          <hr className="dg-divider" />

          {/* ── CHANGES ──────────────────────────────────────── */}
          <section className="dg-section" id="changes">
            <p className="dg-section-super">Step 9 — The ongoing cycle</p>
            <h2 className="dg-section-title">Making <em>changes.</em></h2>
            <p className="dg-section-intro">Once you're deployed, the cycle for every future change is the same four commands. Learn these and you own the whole pipeline.</p>
            <div className="dg-steps">
              {s("step-changes-1", "Step 9.1", "The edit → push → deploy cycle", <>
                <Desc>Edit a file locally. Test it at <code>localhost:3000</code>. When you're happy, run:</Desc>
                <CB label="Git Bash — run these in order" text={'git add .\ngit commit -m "describe what you changed"\ngit push'}>
                  {"git add .\ngit commit -m \"describe what you changed\"\ngit push"}
                </CB>
                <Desc>That's it. Vercel detects the push and automatically deploys. Your live site updates in about 90 seconds. You can watch the progress at vercel.com/dashboard.</Desc>
                <Callout type="tip"><code>git add .</code> stages all changed files. <code>git commit -m "..."</code> saves a snapshot with a message. <code>git push</code> sends it to GitHub. Vercel does the rest.</Callout>
              </>)}
              {s("step-changes-2", "Step 9.2", "Adding or changing environment variables", <>
                <Desc>Local changes: edit your <code>.env.local</code> file, then restart the dev server (<code>Ctrl + C</code>, then <code>npm run dev</code>).</Desc>
                <Desc>Production changes: go to your project in the Vercel dashboard → <strong>Settings → Environment Variables</strong>. Edit the value, save, then go to <strong>Deployments</strong> and click <strong>Redeploy</strong> on the latest deployment to pick up the new value.</Desc>
                <Callout type="warn">Vercel doesn't automatically pick up env var changes — you need to trigger a redeploy after changing them.</Callout>
              </>)}
            </div>
          </section>

          <hr className="dg-divider" />

          {/* ── TROUBLESHOOT ─────────────────────────────────── */}
          <section className="dg-section" id="troubleshoot">
            <p className="dg-section-super">Reference</p>
            <h2 className="dg-section-title">Common <em>errors.</em></h2>
            <p className="dg-section-intro">If something breaks, it's almost always one of these.</p>
            <div className="dg-steps">
              {s("step-ts-1", "Error", '"command not found: npm" or "command not found: node"', <>
                <Desc>Node wasn't added to your PATH, or VS Code didn't pick up the new PATH yet. Close VS Code completely and reopen it. If that doesn't fix it, restart your computer, then try again.</Desc>
              </>)}
              {s("step-ts-2", "Error", "401 Unauthorized from the API", <>
                <Desc>Your API key is wrong or missing. Check <code>.env.local</code> — make sure the key starts with <code>sk-ant-</code> and has no extra spaces or line breaks. After editing <code>.env.local</code>, restart the dev server.</Desc>
              </>)}
              {s("step-ts-3", "Error", "Works locally but fails on Vercel", <>
                <Desc>Almost always missing environment variables in Vercel. Go to your project → Settings → Environment Variables. Check that <code>ANTHROPIC_API_KEY</code> is there and spelled exactly right (case-sensitive). Then redeploy.</Desc>
              </>)}
              {s("step-ts-4", "Error", "Vercel build fails with a red error", <>
                <Desc>Click on the failed deployment in Vercel → expand the build logs → look for the first red line. Copy that error into Claude and ask what it means. Build errors are almost always specific and fixable quickly.</Desc>
                <Callout type="tip">The Vercel build log is one of the most useful debugging tools you have. Don't skip past the red lines — the first one is usually the actual problem.</Callout>
              </>)}
              {s("step-ts-5", "Error", '"Permission denied" when running Git commands', <>
                <Desc>GitHub requires authentication. Run <code>git push</code> — it'll open a browser window asking you to sign in to GitHub. Authorise it. After that first sign-in, pushes work silently. If you're on a machine that's already signed in to GitHub via VS Code, this usually sorts itself automatically.</Desc>
              </>)}
            </div>
          </section>

        </main>
      </div>
    </>
  );
}
