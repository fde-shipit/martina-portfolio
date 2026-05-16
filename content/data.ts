export const person = {
  name: "Martina Edwards",
  role: "Manager, AI Acceleration",
  company: "HSF Kramer",
  location: "Melbourne, Australia",
  email: "martina.edwards.p@gmail.com",
  phone: "0490 160 783",
  linkedin: "https://www.linkedin.com/in/martina-edwards-a674067b",

  /* Hero headline — proposition first, name in the eyebrow. */
  headline: "AI didn't replace my experience. It handed me the tools to finally use all of it.",
  headlineEmphasis: "",

  /* Sub-deck under the headline. */
  tagline: "Ten years inside the infrastructure and operations layer before anyone was calling it AI. That foundation is what makes the difference now. I know what breaks, I know what holds, and I can build the thing myself. That combination is still rare. That's why you're here.",

  /* Profile — Profile section body. */
  profile: "Ten years building enterprise systems across infrastructure, legal ops, automation, and cyber before moving into AI product leadership. That operational foundation is what makes the difference: I don't just design AI workflows, I understand what they run on and what breaks them.\n\nMy focus is agentic workflow design, HITL architecture, and making AI outputs defensible in regulated environments. I own products end to end and drive AI acceleration across specific workstreams in complex, high-stakes environments.",

  /* Contact close — sharper than the hero, more personal. */
  contactCopy: "If you're trying to ship AI and the room is split on what's safe to automate, I'm useful in that room. Let's talk.",

  hashtag: "#RedefinedByAI",
}

/* ─────────────────────────────────────────────────────────────
   Hero stats — three real metrics, displayed as a row across
   the bottom of the hero. No more right-side stack.
*/
export const heroStats = [
  { number: "2 days",   from: "down from several weeks",   label: "Security assessment redesign using Legora." },
  { number: "5 years",  from: "in production before outgrown", label: "Legal spend platform built from scratch. My idea, my design, my build." },
  { number: "13,000+",  from: "staff hours saved annually", label: "Legal triage chatbot — owned start to finish." },
]

export const details = [
  { key: "Current",       value: "Manager, AI Acceleration · HSF Kramer" },
  { key: "Specialty",     value: "Agentic workflow design · HITL architecture · Regulated environments" },
  { key: "Approach",      value: "Knowing where AI can go unsupervised and where it cannot, and building systems that reflect that distinction" },
  { key: "Qualification", value: "MBA (Diplom BWL)" },
  { key: "Location",      value: "Melbourne, Australia · English & German" },
]

/* ─────────────────────────────────────────────────────────────
   Case studies — three projects with real metrics. These get
   the big-treatment in Work and (eventually) their own detail pages.
*/
export const caseStudies = [
  {
    metric:   "2 days",
    from:     "down from several weeks",
    title:    "Security assessment redesign · Legora",
    summary:  "Replaced weeks of uncoordinated multi-party review with a structured HITL process that legal, product, and security teams trust. Multi-stakeholder workflow rebuilt around Legora.",
    tags:     ["Legora", "HITL architecture", "Multi-stakeholder"],
    link:     "/work/legora-security-assessment",
    artefact: "Workflow diagram · before / after",
  },
  {
    metric:   "13,000+",
    from:     "staff hours saved annually",
    title:    "Legal triage product · Webex",
    summary:  "Rules-based intake with conditional logic — high-risk routes to legal with documentation; low-risk users get a ready-to-attach artifact and bypass legal entirely. ~500 queries a month. Concept to rollout, owned.",
    tags:     ["Webex", "Rules-based logic", "Legal ops"],
    link:     "/work/legal-triage",
    artefact: "Decision tree · sample artifact output",
  },
  {
    metric:   "5 years",
    from:     "in production before outgrown",
    title:    "Legal spend visibility platform",
    summary:  "Identified an invisible annual blind spot in legal spend. Built a SharePoint and Power Automate solution that automated invoice intake, approvals, and reporting end-to-end. Ran for five years before the business outgrew it.",
    tags:     ["SharePoint", "Power Automate", "Legal ops"],
    link:     "/work/legal-spend",
    artefact: "Architecture sketch · invoice flow",
  },
]

/* ─────────────────────────────────────────────────────────────
   Also shipped — projects without a single-metric headline.
   Compact card treatment, no big-number column, no metric pretence.
*/
export const alsoShipped = [
  {
    title:   "B2B SaaS platform delivery — AASB S2",
    summary: "Sole accountability for roadmap, releases, client onboarding and incident management on a live B2B SaaS solving AASB S2 climate disclosure. Five clients onboarded in eight months. Three full releases delivered in parallel. No dedicated eng lead, no dedicated CS function.",
    tags:    ["Vercel", "PostgreSQL", "Release governance"],
  },
  {
    title:   "AI vendor evaluation program",
    summary: "Led structured POCs across AI vendors for targeted legal workflows. Redirected early experimentation toward measurable output quality and defined boundaries. Findings shaped firm-wide AI strategy.",
    tags:    ["LLM evaluation", "POC design", "AI strategy"],
  },
  {
    title:   "Nautobot · network source of truth",
    summary: "Helped deploy Nautobot across multi-vendor infrastructure (Cisco, Palo Alto, Fortinet) spanning hundreds of sites and thousands of devices. The work that changed how I think about technology — and the foundation any reliable AI ultimately runs on.",
    tags:    ["Nautobot", "Infrastructure at scale"],
  },
  {
    title:   "Asset management system → AWS",
    summary: "Delivered a high-risk live system upgrade during peak operations with no service interruption. Led migration readiness — mapped functionality and customisations, gathered requirements, documented risks and dependencies.",
    tags:    ["AWS", "Containers", "Requirements"],
  },
  {
    title:   "Icertis enterprise rollout",
    summary: "Contributed to an enterprise-wide Icertis rollout using Agile. Facilitated process mapping workshops across document control, version control, and confidentiality, and produced a revised Information Classification and Handling Standard.",
    tags:    ["Icertis", "Agile", "Information governance"],
  },
  {
    title:   "Cyber & ITSM Agile delivery",
    summary: "Facilitated Agile rituals across company-wide ITSM projects on ServiceNow. Worked with cyber on vulnerability remediation (Qualys, Mandiant), translating findings into prioritised backlogs and change-managed fixes.",
    tags:    ["ServiceNow", "Qualys", "Change management"],
  },
]

/* The case study with its own page. Now lives at /work/after-hours. */
export const afterHours = {
  metric:   "↗",
  from:     "case study",
  title:    "After hours · this website",
  summary:  "Started with a magic 8 ball. Ended up with a portfolio. Eight nights, two hours each. Solo. The chat was the build.",
  tags:     ["Next.js", "Claude API", "TypeScript", "Vercel"],
  link:     "/work/after-hours",
}

export const career = [
  { role: "Manager, AI Acceleration",            company: "HSF Kramer",                            period: "Mar 2026 → Present",  current: true  },
  { role: "Manager, Digital Products",           company: "HSF Kramer",                            period: "Aug 2025 → Mar 2026", current: false },
  { role: "Senior Business Analyst & Scrum Master", company: "Transurban",                         period: "Sep 2024 → Jun 2025", current: false },
  { role: "Automation and Business Analyst",     company: "Transurban",                            period: "Dec 2022 → Jul 2024", current: false },
  { role: "Business, Operations and Legal Analyst", company: "Transurban",                         period: "Feb 2016 → Nov 2022", current: false },
  { role: "Operations Manager",                  company: "Turner Broadcasting System Germany, Munich", period: "Sep 2011 → Dec 2015", current: false },
]

export const posts = [
  {
    week: "Read 01",
    title: "Model",
    subheading: "The words changed jobs. Nobody sent a fax.",
    hook: "AI changed our work and our words. Temperature. Token. Harness. Same spelling. New job. Nobody sent a fax.",
  },
  {
    week: "Read 02",
    title: "Memory",
    subheading: "AI has a memory problem. So do I.",
    hook: "AI has a memory problem. So do I. Three things make AI feel like it remembers. None of them are memory.",
  },
  {
    week: "Read 03",
    title: "Prompt Injection",
    subheading: "Invisible to you. Not to your model.",
    hook: "Invisible to you. Not to your model. You are not the only one who can prompt your AI.",
  },
  {
    week: "Read 04",
    title: "Training",
    subheading: "The best trainer you've ever had stopped learning the day it launched.",
    hook: "Every model was trained. Past tense. A snapshot of the world up to a point in time. It's frozen there.",
  },
  {
    week: "Read 05",
    title: "Forest",
    subheading: "A forest is not a forest. Not in IT.",
    hook: "I spent months inside an enterprise IT forest doing security remediation. I didn't know I was learning everything I'd later need to understand AI.",
  },
]

export const skills = [
  {
    category: "AI & Architecture",
    items: ["Agentic workflow design", "HITL architecture", "LLM evaluation", "RAG architecture", "Context window management", "AI security (OWASP LLM)", "Prompt & harness engineering"],
  },
  {
    category: "AI Tools",
    items: [
      "Claude and Copilot Studio — agentic workflow design and deployment, not just configuration. Knows which tool fits the workflow. Knows when none of them do yet.",
      "Also: Legora · Harvey · Power Automate · Power BI",
    ],
  },
  {
    category: "Product",
    items: ["End-to-end delivery", "Roadmap & prioritisation", "Release governance", "Vendor evaluation", "Client onboarding", "Stakeholder management", "Incident management"],
  },
  {
    category: "Enterprise Platforms",
    items: ["ServiceNow", "Icertis", "IBM Maximo", "Nautobot", "SharePoint", "Vercel", "PostgreSQL", "Workday"],
  },
  {
    category: "Technical",
    items: ["Scripting & automation", "Power BI", "AWS", "Atlassian Suite", "BPMN 2.0", "Entra ID / Active Directory"],
  },
  {
    category: "Certifications",
    items: ["MBA (Diplom BWL)", "Foreign Language Correspondent, AMA Business School Germany"],
  },
  {
    category: "Context",
    items: ["Legal", "Regulated environments", "Enterprise & global", "English & German"],
  },
]

export const ticker = [
  { text: "AI that runs in production" },
  { text: "#RedefinedByAI", accent: true },
  { text: "HITL architecture" },
  { text: "2 days. Down from several weeks.", accent: true },
  { text: "Agentic workflows" },
  { text: "Legora" },
  { text: "13,000 hours saved", accent: true },
  { text: "Regulated environments" },
  { text: "Copilot Studio" },
  { text: "5 years in production", accent: true },
  { text: "Harvey" },
  { text: "Melbourne" },
  { text: "Vendor evaluation" },
  { text: "Enterprise AI" },
  { text: "Knows where AI can go unsupervised", accent: true },
  { text: "Claude" },
  { text: "Knows when none of them do yet.", accent: true },
  { text: "AI Acceleration" },
  { text: "#RedefinedByAI", accent: true },
]

/* Sample exchange shown on the homepage Oracle preview.
   Real interactions still happen on /oracle via the Ball component. */
export const oraclePreview = {
  exchanges: [
    {
      who: "You",
      what: "Why should we hire Martina to lead AI delivery?",
    },
    {
      who: "Oracle",
      what: "Because she'll show you the brittle bits before you ship.",
      tone: "answer",
    },
  ],
  refuses: [
    "Claims about people other than Martina",
    "Compensation or contract terms",
    "Predictions or opinions on third-party tools",
  ],
}
