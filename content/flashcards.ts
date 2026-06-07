// ─────────────────────────────────────────────────────────────────────────────
// content/flashcards.ts
//
// Single source of truth for all flashcard content.
//
// TO ADD A NEW REDEFINED POST:
//   1. Find the matching entry in REDEFINED_POSTS below (or add a new one).
//   2. Set status to "posted".
//   3. Add the postUrl (your Substack post URL).
//   4. That's it — the card appears in the Redefined deck automatically.
//
// TO ADD A NEW TERM (no post yet):
//   Add a new object to REDEFINED_POSTS with status: "draft".
//   It will appear in the deck with a "coming soon" indicator.
// ─────────────────────────────────────────────────────────────────────────────

export type PostStatus = "posted" | "written" | "draft";

export interface FlashCard {
  /** The AI term displayed on the card front */
  term: string;
  /** Abbreviation shown below the term, if one exists */
  abbr?: string | null;
  /** One or two sentences in Martina's voice — drawn from the post */
  definition: string;
  /** Concrete example, analogy, or "Worth knowing" anchor */
  example?: string;
  /** Redefined by AI post number, e.g. "01", "3c" */
  postNumber?: string;
  /** Post title as it appears in the series */
  postTitle?: string;
  /**
   * Full Substack post URL.
   * Set this when the post goes live — the card will show a "Read the post" link.
   * Leave undefined while status is "draft" or "written".
   */
  postUrl?: string;
  /**
   * posted  — live on Substack, postUrl required
   * written — written, not yet published (no postUrl needed)
   * draft   — in progress
   */
  status?: PostStatus;
}

export interface Deck {
  id: string;
  title: string;
  description: string;
  /** Tailwind-free — raw hex values used inline */
  colorBg: string;
  colorAccent: string;
  colorText: string;
  cards: FlashCard[];
}

// ─────────────────────────────────────────────────────────────────────────────
// REDEFINED BY AI
//
// One entry per post. Order matches the series.
// Update `status` and `postUrl` as each post goes live.
// ─────────────────────────────────────────────────────────────────────────────

const REDEFINED_POSTS: FlashCard[] = [
  {
    term: "Model",
    postNumber: "01",
    postTitle: "Model",
    status: "posted",
    postUrl: "https://martinaedwards.substack.com/p/model",
    definition:
      "The AI system itself — the LLM you're talking to. A word that already existed and quietly changed jobs.",
    example: "artificialanalysis.ai/leaderboards/models — today's standings",
  },
  {
    term: "Memory",
    postNumber: "02",
    postTitle: "Memory",
    status: "posted",
    postUrl: "https://martinaedwards.substack.com/p/memory",
    definition:
      "What looks like memory is retrieval. The context window holds the current session. When it ends, everything disappears. It was given a shopping list, not a recollection.",
    example: "Find your memory settings. Check what's stored. Check who controls what goes in.",
  },
  {
    term: "Prompt Injection",
    postNumber: "03",
    postTitle: "Prompt Injection",
    status: "posted",
    postUrl: "https://martinaedwards.substack.com/p/prompt-injection",
    definition:
      "Malicious instructions hidden in content your AI reads — a document, a webpage, an invisible footer. The model can't tell yours from theirs. You are not the only one who can prompt your AI.",
    example: "OWASP Top 10 for LLMs — Prompt Injection is #1",
  },
  {
    term: "Training",
    postNumber: "04",
    postTitle: "Training",
    status: "posted",
    postUrl: "https://martinaedwards.substack.com/p/training",
    definition:
      "Past tense. Done. A snapshot frozen at a point in time. Search patches facts on top — it doesn't update the judgment baked in during training. When it doesn't know, it keeps predicting anyway.",
    example: "youtube.com/watch?v=LPZh9BOjkQs — 20 minutes on the prediction mechanic",
  },
  {
    term: "Forest",
    postNumber: "05",
    postTitle: "Forest",
    status: "posted",
    postUrl: "https://martinaedwards.substack.com/p/redefined-by-ai-05-forest",
    definition:
      "In IT, a forest holds an organisation's entire network together — servers, users, permissions, trust. In machine learning, it's an ensemble of decision trees. Same word, completely different map. I spent months inside one before I understood what I was learning.",
    example: "One word. Two fields. Different map, different terrain.",
  },
  {
    term: "Mythos",
    postNumber: "06",
    postTitle: "Mythos",
    status: "posted",
    postUrl: "https://martinaedwards.substack.com/p/redefined-by-ai-06-mythos",
    definition:
      "In seven weeks, an AI found over 2,000 unknown vulnerabilities — more than human researchers had found in decades. Not a proof of concept. A production result. The capability arrived before anyone had language for it.",
    example: "The question is not whether AI can do this. It already did.",
  },
  {
    term: "Token",
    postNumber: "07",
    postTitle: "Token",
    status: "posted",
    postUrl: "https://martinaedwards.substack.com/p/redefined-by-ai-06-token",
    definition:
      "A chunk of text — a word, part of a word, sometimes just punctuation. The basic unit the model reads. Not tied to any language, so meaning travels across languages without getting lost.",
    example: "platform.openai.com/tokenizer — paste any text and watch it chunk",
  },
  {
    term: "Vector",
    postNumber: "08",
    postTitle: "Vector",
    status: "posted",
    postUrl: "", // ← add Substack URL
    definition:
      "Every word has a position in space — coordinates in thousands of dimensions — defined by every other word it has ever appeared near. Nobody designed those positions. They emerged from billions of sentences.",
    example: "Google TurboQuant — compression with near-zero accuracy loss",
  },
  {
    term: "Transformer",
    abbr: null,
    postNumber: "09",
    postTitle: "Transformer, Attention, Hallucination",
    status: "written",
    // postUrl: "",  ← add when posted
    definition:
      "The architecture that changed everything in 2017. Instead of reading one word at a time, it reads everything at once — comparing every word to every other simultaneously. That comparison is called attention.",
    example: "Attention Is All You Need — Google, 2017 — arxiv.org/abs/1706.03762",
  },
  {
    term: "Attention",
    postNumber: "09",
    postTitle: "Transformer, Attention, Hallucination",
    status: "written",
    // postUrl: "",  ← add when posted
    definition:
      "'Force' next to 'Star Wars' reads differently than 'Force' next to 'physics.' The mechanism that decides which words matter. Very good at finding patterns. Less good at knowing when there are none.",
    example: "Same post as Transformer — one paper, three concepts",
  },
  {
    term: "Hallucination",
    postNumber: "09",
    postTitle: "Transformer, Attention, Hallucination",
    status: "written",
    // postUrl: "",  ← add when posted
    definition:
      "When the model doesn't know, it doesn't stop. It finds the closest thing and predicts — with no signal that the ground isn't solid. A human word for a human experience. It doesn't describe what's actually happening.",
    example: "The model isn't confused. It's doing exactly what it was built to do.",
  },
  {
    term: "Temperature",
    postNumber: "10",
    postTitle: "Temperature",
    status: "written",
    // postUrl: "",  ← add when posted
    definition:
      "Every model has one. Low: consistent, predictable, restricted. High: looser, more creative, less reliable. Legal tools run cold. Creative tools run hot. Most people have no idea where theirs is set — or who decided.",
    example: "Top-k and top-p are the other two parameters most users never see",
  },
  {
    term: "Agent",
    postNumber: "11",
    postTitle: "Agents",
    status: "draft",
    // postUrl: "",  ← add when posted
    definition:
      "A model that doesn't just respond but acts. It gets a goal, works out the steps, and executes. The question that matters isn't whether something is an agent — it's what it can reach, and what it can do without asking first.",
    example: "openclaw.ai — free, open source, runs locally. Read the security notes first.",
  },
  // ─── ADD NEW POST HERE ───────────────────────────────────────────────────
  // Copy this template when a new post is ready:
  //
  // {
  //   term: "Harness",
  //   postNumber: "12",
  //   postTitle: "Harness",
  //   status: "draft",
  //   // postUrl: "",  ← uncomment and add URL when posted
  //   definition: "",
  //   example: "",
  // },
  // ─────────────────────────────────────────────────────────────────────────
];

// ─────────────────────────────────────────────────────────────────────────────
// SUPPLEMENTARY DECKS
// Technical depth beyond the series — for practitioners who want to go further.
// ─────────────────────────────────────────────────────────────────────────────

const FUNDAMENTALS_CARDS: FlashCard[] = [
  {
    term: "Large Language Model",
    abbr: "LLM",
    definition:
      "The model itself. Trained on enormous amounts of text to predict what comes next. The pattern-matching that emerged from that process is what makes it useful.",
    example: "GPT-4, Claude, Gemini",
  },
  {
    term: "Context Window",
    definition:
      "The model's working memory. Everything inside it is visible. Everything outside doesn't exist.",
    example: "Claude 3.5 Sonnet: 200K tokens",
  },
  {
    term: "Embedding",
    definition:
      "A word's position in meaning-space. Similar words end up near each other. The foundation of how models understand language.",
    example: "king − man + woman ≈ queen",
  },
  {
    term: "Inference",
    definition:
      "The model doing its job — taking an input and producing an output. Separate from training, which already happened.",
    example: "Generating a response to your question",
  },
  {
    term: "RAG",
    abbr: "Retrieval Augmented Generation",
    definition:
      "Fetch relevant documents, inject them into the context, then generate. Patches current facts on top of a frozen model without retraining.",
    example: "Search before you generate",
  },
  {
    term: "Prompt Engineering",
    definition:
      "Designing the input to reliably get the output you want. System prompts, examples, instructions — all of it counts.",
    example: "Zero-shot, few-shot, chain-of-thought",
  },
];

const ARCHITECTURE_CARDS: FlashCard[] = [
  {
    term: "Multi-Head Attention",
    abbr: "MHA",
    definition:
      "Attention running in parallel across multiple dimensions at once — syntax, semantics, meaning — simultaneously. More heads means more relationships captured per pass.",
    example: "8–32 heads operating in parallel",
  },
  {
    term: "Residual Connection",
    definition:
      "A shortcut that adds a layer's input directly to its output. Lets information bypass layers that aren't helping. Makes very deep networks trainable.",
    example: "Used in every transformer block",
  },
  {
    term: "Mixture of Experts",
    abbr: "MoE",
    definition:
      "Only a fraction of the model activates for each input. A router decides which parts. More capacity, less compute.",
    example: "Mixtral activates 2 of 8 experts per token",
  },
  {
    term: "Positional Encoding",
    definition:
      "Transformers process all tokens at once with no inherent order. Positional encoding tells the model where each token sits in the sequence.",
    example: "RoPE, ALiBi, sinusoidal encodings",
  },
  {
    term: "Layer Normalization",
    abbr: "LayerNorm",
    definition:
      "Keeps activations within each layer from blowing up or vanishing — stabilises training. Standard in modern LLMs.",
    example: "Pre-norm is standard in modern LLMs",
  },
  {
    term: "KV Cache",
    abbr: "Key-Value Cache",
    definition:
      "Stores past attention computations so they don't need to be redone at each step. Makes generation fast at long context lengths.",
    example: "TurboQuant compresses it 6× with near-zero loss",
  },
];

const TRAINING_CARDS: FlashCard[] = [
  {
    term: "Pretraining",
    definition:
      "The first phase. The model reads enormous amounts of text and learns to predict the next word. Everything else builds on this.",
    example: "Training on trillions of tokens from the web",
  },
  {
    term: "Fine-tuning",
    definition:
      "Training a pretrained model on a smaller, specific dataset to adjust its behaviour. Much less compute than pretraining, but it shapes how the model responds.",
    example: "Supervised fine-tuning on instruction pairs",
  },
  {
    term: "RLHF",
    abbr: "Reinforcement Learning from Human Feedback",
    definition:
      "Humans rank the model's outputs. A reward model learns those preferences. The LLM is updated to score better. Used to align ChatGPT and Claude.",
    example: "Used to align ChatGPT and Claude",
  },
  {
    term: "Constitutional AI",
    abbr: "CAI",
    definition:
      "The model critiques its own outputs using a written set of principles. Less reliance on human labels for safety. Anthropic's approach.",
    example: "Developed by Anthropic for Claude",
  },
  {
    term: "Overfitting",
    definition:
      "When a model memorises training data — noise and all — and stops generalising. Works perfectly on what it's seen. Fails on anything new.",
    example: "100% train accuracy, 60% test accuracy",
  },
  {
    term: "Gradient Descent",
    definition:
      "The algorithm that updates weights during training — step by step, in the direction that reduces error. The backbone of all deep learning.",
    example: "w = w − lr × ∇L(w)",
  },
];

const SAFETY_CARDS: FlashCard[] = [
  {
    term: "Alignment",
    definition:
      "Making sure AI does what you want and what's right. Two different problems that are often confused.",
    example: "An aligned model won't assist with harm",
  },
  {
    term: "Jailbreak",
    definition:
      "A prompt designed to bypass the model's guardrails — usually by reframing the request as fictional or hypothetical.",
    example: "DAN ('Do Anything Now') prompts",
  },
  {
    term: "Interpretability",
    definition:
      "The field asking what's actually happening inside the model — which features activate and why. Essential for safety. Largely unsolved.",
    example: "Mechanistic interpretability, probing classifiers",
  },
  {
    term: "Red-teaming",
    definition:
      "Trying to break the model before it ships. Find the harmful outputs, the edge cases, the gaps — before users do.",
    example: "Testing if a model helps synthesize weapons",
  },
  {
    term: "Emergent Behavior",
    definition:
      "Capabilities that appear at scale without being trained for. Nobody planned for them. That's what makes frontier models harder to predict.",
    example: "In-context learning emerged with GPT-3 scale",
  },
  {
    term: "Harness",
    definition:
      "The layer that wraps a model and gives it capabilities: access to tools, memory between steps, permissions, and decision logic. The model reasons. The harness acts. Most risk lives here.",
    example: "OpenClaw is a harness. The model inside it is just a model.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// DECK DEFINITIONS
// The Redefined deck is first — it's the anchor of the app.
// ─────────────────────────────────────────────────────────────────────────────

export const DECKS: Deck[] = [
  {
    id: "redefined",
    title: "Redefined by AI",
    description: "Every term Martina has written about in the series — in her words",
    colorBg: "#F1EFE8",
    colorAccent: "#2C2C2A",
    colorText: "#444441",
    cards: REDEFINED_POSTS,
  },
  {
    id: "fundamentals",
    title: "Fundamentals",
    description: "Core concepts every practitioner should know",
    colorBg: "#EEEDFE",
    colorAccent: "#534AB7",
    colorText: "#3C3489",
    cards: FUNDAMENTALS_CARDS,
  },
  {
    id: "architecture",
    title: "Architecture",
    description: "How models are structured internally",
    colorBg: "#E1F5EE",
    colorAccent: "#0F6E56",
    colorText: "#085041",
    cards: ARCHITECTURE_CARDS,
  },
  {
    id: "training",
    title: "Training",
    description: "How models learn from data",
    colorBg: "#FAECE7",
    colorAccent: "#993C1D",
    colorText: "#712B13",
    cards: TRAINING_CARDS,
  },
  {
    id: "safety",
    title: "Safety & Alignment",
    description: "Making AI systems reliable and safe",
    colorBg: "#FAEEDA",
    colorAccent: "#854F0B",
    colorText: "#633806",
    cards: SAFETY_CARDS,
  },
];
