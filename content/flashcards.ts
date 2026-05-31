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
    postUrl: "https://martinaedwards.substack.com/p/model", // ← update with real URL
    definition:
      "The AI system itself — the LLM you're talking to. A word that already existed and quietly changed jobs. The landscape shifts week to week with no authoritative map and no announcement.",
    example: "artificialanalysis.ai/leaderboards/models — today's standings",
  },
  {
    term: "Memory",
    postNumber: "02",
    postTitle: "Memory",
    status: "posted",
    postUrl: "https://martinaedwards.substack.com/p/memory", // ← update
    definition:
      "What looks like memory in AI is actually retrieval. The context window holds the current session and vanishes when it ends. Injected notes supply facts. Live retrieval searches your files. All of it starts fresh — it was given a shopping list, not a recollection.",
    example: "Find your memory settings. Check what's stored. Check who controls what goes in.",
  },
  {
    term: "Prompt Injection",
    postNumber: "02b",
    postTitle: "Prompt Injection",
    status: "posted",
    postUrl: "https://martinaedwards.substack.com/p/prompt-injection", // ← update
    definition:
      "Malicious instructions hidden inside content your AI processes — a white-text footer, a document, a webpage. The model can't distinguish your instructions from instructions embedded in what it's reading. You are not the only one who can prompt your AI.",
    example: "OWASP Top 10 for LLMs — Prompt Injection is #1",
  },
  {
    term: "Training",
    postNumber: "03",
    postTitle: "Training",
    status: "posted",
    postUrl: "https://martinaedwards.substack.com/p/training", // ← update
    definition:
      "Past tense. Done. A snapshot frozen at a point in time. Search patches the facts on top — it doesn't update the judgment baked in during training. When the snapshot has a gap, the model doesn't stop. It keeps predicting with the same confidence it always had.",
    example: "youtube.com/watch?v=LPZh9BOjkQs — 20 minutes on the prediction mechanic",
  },
  {
    term: "Token",
    postNumber: "3c",
    postTitle: "Token",
    status: "posted",
    postUrl: "", // ← add Substack URL
    definition:
      "Not a substitute — a deliberate chunk of text. A word, part of a word, sometimes just punctuation. The atomic unit the model reads. Because tokens aren't tied to any single language, meaning travels between languages without the model being lost in translation.",
    example: "platform.openai.com/tokenizer — paste any text and watch it chunk",
  },
  {
    term: "Vector",
    postNumber: "3d",
    postTitle: "Vector",
    status: "posted",
    postUrl: "", // ← add Substack URL
    definition:
      "Every word has a position in space defined by its relationships with every other word it has ever appeared near. Not a definition — coordinates in thousands of dimensions. Nobody designed those positions. They emerged from billions of sentences, each one nudging meaning until it stabilised.",
    example: "Google TurboQuant — compression with near-zero accuracy loss",
  },
  {
    term: "Transformer",
    abbr: null,
    postNumber: "3e",
    postTitle: "Transformer, Attention, Hallucination",
    status: "written",
    // postUrl: "",  ← add when posted
    definition:
      "The architecture that changed how models read in 2017 — from one vector at a time to everything at once. It compares every vector against every other simultaneously. That comparison is called attention. Nobody programmed the relationships. The model mapped them through training.",
    example: "Attention Is All You Need — Google, 2017 — arxiv.org/abs/1706.03762",
  },
  {
    term: "Attention",
    postNumber: "3e",
    postTitle: "Transformer, Attention, Hallucination",
    status: "written",
    // postUrl: "",  ← add when posted
    definition:
      "The mechanism that decides which vectors matter. 'Force' next to 'Star Wars' attends differently than 'Force' next to 'physics.' The same word, a different neighbourhood, a different meaning activated. Extraordinarily good at finding patterns. Less good at knowing when there are none.",
    example: "Same post as Transformer — one paper, three concepts",
  },
  {
    term: "Hallucination",
    postNumber: "3e",
    postTitle: "Transformer, Attention, Hallucination",
    status: "written",
    // postUrl: "",  ← add when posted
    definition:
      "When the context runs thin or the training snapshot has a gap, the model doesn't stop. It keeps attending, finds the closest thing, and predicts — with no way of knowing whether the ground is solid. A human word for a human experience. It doesn't describe what's actually happening.",
    example: "The model isn't confused. It's doing exactly what it was built to do.",
  },
  {
    term: "Temperature",
    postNumber: "04",
    postTitle: "Temperature",
    status: "written",
    // postUrl: "",  ← add when posted
    definition:
      "Every model has one. Low temperature reaches only for the brightest stars — consistent, predictable, restricted. High temperature is like looking at the sky after a few drinks. Legal tools run cold. Creative tools run hot. Most people using enterprise AI have no idea where their tools are set, or who made that call.",
    example: "Top-k and top-p are the other two parameters most users never see",
  },
  {
    term: "Agent",
    postNumber: "06",
    postTitle: "Agents",
    status: "draft",
    // postUrl: "",  ← add when posted
    definition:
      "A model that doesn't just respond but acts. It receives a goal, works out the steps, executes them, checks the result, and keeps going. The question that actually matters isn't whether something is an agent — it's what it can reach, and what it can do without asking you first.",
    example: "openclaw.ai — free, open source, runs locally. Read the security notes first.",
  },
  // ─── ADD NEW POST HERE ───────────────────────────────────────────────────
  // Copy this template when a new post is ready:
  //
  // {
  //   term: "Harness",
  //   postNumber: "07",
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
      "A neural network trained on massive text corpora to predict and generate coherent language. LLMs learn statistical patterns across billions of parameters, enabling diverse tasks without task-specific training.",
    example: "GPT-4, Claude, Gemini",
  },
  {
    term: "Context Window",
    definition:
      "The maximum number of tokens a model can attend to in a single pass — its working memory. Information outside this window is invisible to the model.",
    example: "Claude 3.5 Sonnet: 200K tokens",
  },
  {
    term: "Embedding",
    definition:
      "A dense vector in high-dimensional space where semantic similarity corresponds to geometric proximity. The foundation of how models represent meaning.",
    example: "king − man + woman ≈ queen",
  },
  {
    term: "Inference",
    definition:
      "Running a trained model on new inputs to produce outputs. Distinct from training — inference uses fixed weights and makes predictions without updating parameters.",
    example: "Generating a response to your question",
  },
  {
    term: "RAG",
    abbr: "Retrieval Augmented Generation",
    definition:
      "A technique that fetches relevant documents from an external store and injects them into the context before generation. Patches current facts on top of a frozen model without retraining.",
    example: "Search before you generate",
  },
  {
    term: "Prompt Engineering",
    definition:
      "Designing input text to reliably elicit desired model outputs. Encompasses system prompts, few-shot examples, chain-of-thought instructions, and output format constraints.",
    example: "Zero-shot, few-shot, chain-of-thought",
  },
];

const ARCHITECTURE_CARDS: FlashCard[] = [
  {
    term: "Multi-Head Attention",
    abbr: "MHA",
    definition:
      "Running attention in parallel across multiple subspaces simultaneously, letting the model capture different relationship types — syntax, semantics, coreference — at once.",
    example: "8–32 heads operating in parallel",
  },
  {
    term: "Residual Connection",
    definition:
      "A skip connection adding a layer's input directly to its output (x + F(x)), enabling very deep networks by providing gradient highways that bypass problematic layers.",
    example: "Used in every transformer block",
  },
  {
    term: "Mixture of Experts",
    abbr: "MoE",
    definition:
      "An architecture where only a subset of parameters (experts) are activated per token via a router. Scales total capacity without proportionally increasing compute costs.",
    example: "Mixtral activates 2 of 8 experts per token",
  },
  {
    term: "Positional Encoding",
    definition:
      "Since transformers process tokens in parallel with no inherent order, positional encodings inject sequence position information into token representations.",
    example: "RoPE, ALiBi, sinusoidal encodings",
  },
  {
    term: "Layer Normalization",
    abbr: "LayerNorm",
    definition:
      "Normalizes activations within each layer across the feature dimension, stabilizing training. Applied before (pre-norm) or after (post-norm) each sub-layer in modern LLMs.",
    example: "Pre-norm is standard in modern LLMs",
  },
  {
    term: "KV Cache",
    abbr: "Key-Value Cache",
    definition:
      "Stores the attention keys and values computed in earlier steps so they don't need to be recomputed during generation. Critical for making inference fast at long context lengths.",
    example: "TurboQuant compresses it 6× with near-zero loss",
  },
];

const TRAINING_CARDS: FlashCard[] = [
  {
    term: "Pretraining",
    definition:
      "The initial large-scale phase where a model learns general language patterns from massive unlabeled text via next-token prediction — building a foundation of world knowledge.",
    example: "Training on trillions of tokens from the web",
  },
  {
    term: "Fine-tuning",
    definition:
      "Continuing training on a smaller, task-specific dataset to adapt a pretrained model's behavior. Far less compute than pretraining but significantly shapes how the model responds.",
    example: "Supervised fine-tuning on instruction pairs",
  },
  {
    term: "RLHF",
    abbr: "Reinforcement Learning from Human Feedback",
    definition:
      "Human raters rank model outputs; a reward model learns those preferences; the LLM is updated via RL to maximize predicted human approval.",
    example: "Used to align ChatGPT and Claude",
  },
  {
    term: "Constitutional AI",
    abbr: "CAI",
    definition:
      "Anthropic's technique where models critique and revise their own outputs using a written set of principles — reducing reliance on human labels for safety-relevant behavior.",
    example: "Developed by Anthropic for Claude",
  },
  {
    term: "Overfitting",
    definition:
      "When a model memorizes training data — including its noise — so precisely it fails to generalize to unseen examples. High train accuracy, low test accuracy.",
    example: "100% train accuracy, 60% test accuracy",
  },
  {
    term: "Gradient Descent",
    definition:
      "The optimization algorithm that updates model weights by computing the loss gradient and stepping in the direction that minimizes it — the backbone of all deep learning training.",
    example: "w = w − lr × ∇L(w)",
  },
];

const SAFETY_CARDS: FlashCard[] = [
  {
    term: "Alignment",
    definition:
      "Ensuring AI systems reliably pursue goals reflecting human values and intentions. Covers capability alignment (doing what's asked) and value alignment (doing what's right).",
    example: "An aligned model won't assist with harm",
  },
  {
    term: "Jailbreak",
    definition:
      "A prompt technique designed to bypass a model's safety guidelines, often by framing harmful requests as fictional, hypothetical, or through adversarial instruction sequences.",
    example: "DAN ('Do Anything Now') prompts",
  },
  {
    term: "Interpretability",
    definition:
      "The field studying what neural networks represent internally — which features activate, how information flows, and why models produce specific outputs. Essential for trust and safety.",
    example: "Mechanistic interpretability, probing classifiers",
  },
  {
    term: "Red-teaming",
    definition:
      "Adversarial testing where humans or automated systems try to elicit harmful, incorrect, or unintended outputs — revealing vulnerabilities before deployment.",
    example: "Testing if a model helps synthesize weapons",
  },
  {
    term: "Emergent Behavior",
    definition:
      "Capabilities appearing unpredictably in large models absent in smaller ones — not explicitly trained for, but arising from scale, making frontier models harder to predict.",
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
