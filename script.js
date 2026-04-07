const STORAGE_KEYS = {
  theme: "techAmitCodeTheme",
  newsletter: "techAmitCodeNewsletter",
  draft: "techAmitCodeDraft",
  posts: "techAmitCodePosts",
  profile: "techAmitCodeProfile",
  auth: "techAmitCodeAuth",
  planner: "techAmitCodePlanner",
  provider: "techAmitCodeProvider",
  bookmarks: "techAmitCodeBookmarks",
  comments: "techAmitCodeComments",
  progress: "techAmitCodeProgress",
  recent: "techAmitCodeRecent"
};

let notificationRoot = null;

function ensureNotificationRoot() {
  if (notificationRoot && document.body?.contains(notificationRoot)) {
    return notificationRoot;
  }

  if (!document.body) {
    return null;
  }

  notificationRoot = document.createElement("div");
  notificationRoot.className = "site-notifications";
  notificationRoot.setAttribute("aria-live", "polite");
  notificationRoot.setAttribute("aria-atomic", "true");
  document.body.append(notificationRoot);
  return notificationRoot;
}

function showNotification(message, kind = "info", duration = 3200) {
  if (!message) {
    return;
  }

  const root = ensureNotificationRoot();
  if (!root) {
    return;
  }

  const toast = document.createElement("div");
  toast.className = `site-toast is-${kind}`;
  toast.setAttribute("role", kind === "error" ? "alert" : "status");
  toast.innerHTML = `
    <span class="site-toast-indicator" aria-hidden="true"></span>
    <div class="site-toast-copy">${escapeHtml(message)}</div>
    <button class="site-toast-close" type="button" aria-label="Dismiss notification">&times;</button>
  `;

  const removeToast = () => {
    toast.classList.add("is-leaving");
    window.setTimeout(() => toast.remove(), 180);
  };

  toast.querySelector(".site-toast-close")?.addEventListener("click", removeToast);
  root.append(toast);

  window.requestAnimationFrame(() => {
    toast.classList.add("is-visible");
  });

  window.setTimeout(removeToast, duration);
}

function setInlineMessage(target, message, kind = "info") {
  if (target) {
    target.textContent = message;
    target.dataset.state = kind;
  }
  showNotification(message, kind);
}

const tutorials = [
  {
    type: "tutorial",
    slug: "css-architecture",
    title: "CSS architecture for small teams",
    excerpt: "Turn messy stylesheet growth into a predictable layer system with tokens, utilities, and component boundaries.",
    category: "CSS",
    readTime: "9 min read",
    tags: ["css", "architecture", "design systems"],
    detail: [
      "A good stylesheet is not the one with the fewest lines. It is the one that remains readable when the product grows.",
      "Start with tokens for color, spacing, radius, and type. Then define layout patterns and component classes separately.",
      "Document what belongs in tokens, what belongs in utilities, and when a component deserves its own block of styling."
    ],
    code: ":root {\n  --space-4: 1rem;\n}\n.card {\n  padding: var(--space-4);\n}",
    level: "Intermediate"
  },
  {
    type: "tutorial",
    slug: "dom-state-workflow",
    title: "DOM state without framework confusion",
    excerpt: "Learn how to model UI state clearly with filters, rendering functions, and explicit event wiring.",
    category: "JavaScript",
    readTime: "11 min read",
    tags: ["javascript", "dom", "state"],
    detail: [
      "A lot of beginner JavaScript becomes hard to maintain because state is hidden inside random click handlers.",
      "Define a small state object, write focused render functions, and re-render only the parts that depend on that state.",
      "This pattern scales well for content sites, dashboards, and admin tools."
    ],
    code: "const state = { filter: 'all', query: '' };\nfunction updateState(patch) {\n  Object.assign(state, patch);\n  renderListing();\n}",
    level: "Beginner"
  },
  {
    type: "tutorial",
    slug: "responsive-dashboard",
    title: "Responsive dashboard layout from scratch",
    excerpt: "Build a dashboard that survives mobile collapse, tablet rearrangement, and dense desktop layouts.",
    category: "Frontend",
    readTime: "13 min read",
    tags: ["layout", "dashboard", "responsive"],
    detail: [
      "Dashboards break when the layout assumes one viewport and one amount of content.",
      "Use CSS grid for page structure, flex for local alignment, and define collapse behavior before styling the happy path.",
      "Good responsive work is mostly about constraints, not decoration."
    ],
    code: ".dashboard {\n  display: grid;\n  grid-template-columns: 280px minmax(0, 1fr);\n  gap: 1.5rem;\n}",
    level: "Intermediate"
  }
];

const projects = [
  {
    type: "project",
    slug: "knowledge-base-ui",
    title: "Knowledge base UI system",
    excerpt: "A documentation website with search, categories, article templates, and reusable content cards.",
    category: "Frontend",
    readTime: "Build brief",
    tags: ["documentation", "ui", "content"],
    detail: [
      "This project trains layout consistency and information hierarchy.",
      "The output is a reusable pattern library for cards, filters, article templates, and inline navigation.",
      "Treat this as a content product, not a landing page."
    ],
    code: "const sections = ['Guides', 'API', 'FAQs'];",
    stack: "HTML, CSS, JavaScript"
  },
  {
    type: "project",
    slug: "creator-portfolio",
    title: "Creator portfolio with publishing flow",
    excerpt: "A personal platform that mixes case studies, articles, and a local editor workflow.",
    category: "Workflow",
    readTime: "Build brief",
    tags: ["portfolio", "content", "workflow"],
    detail: [
      "This is useful when you want one system for project proof, writing, and learning notes.",
      "The challenge is consistency: card layouts, metadata, and navigation should feel like one product.",
      "Publishing flow matters because content velocity usually dies if the editing path is too clumsy."
    ],
    code: "function publish(entry) {\n  const entries = getEntries();\n  entries.unshift(entry);\n}",
    stack: "HTML, CSS, JavaScript, localStorage"
  }
];

const blogPosts = [
  {
    type: "blog",
    slug: "stop-copying-ui",
    title: "Stop copying UI before you understand the workflow",
    excerpt: "Visual cloning is easy. Rebuilding the user journey, states, and structure is the real skill.",
    category: "Workflow",
    readTime: "6 min read",
    tags: ["workflow", "ux", "learning"],
    detail: [
      "Strong frontend work asks what the user is trying to complete, what blocks them, and how the screen adapts when data changes.",
      "When you study products, map the flow first. Then build the pixels."
    ],
    code: "",
    author: "TechAmitCode"
  },
  {
    type: "blog",
    slug: "write-after-building",
    title: "Why you should write after every project",
    excerpt: "Documentation forces clarity. If you cannot explain a decision, you probably do not understand it yet.",
    category: "Career",
    readTime: "5 min read",
    tags: ["writing", "career", "reflection"],
    detail: [
      "Publishing notes after a build creates a durable learning loop.",
      "The value is not the polish of the article. The value is forced precision."
    ],
    code: "",
    author: "TechAmitCode"
  }
];

const notes = [
  {
    type: "note",
    slug: "html-semantic-notes",
    title: "HTML semantic notes for interviews",
    excerpt: "Short revision notes on semantic tags, document landmarks, forms, and accessibility basics.",
    category: "HTML",
    readTime: "7 min read",
    tags: ["html", "semantic", "accessibility"],
    detail: [
      "Semantic tags describe intent, not styling.",
      "Common landmarks include header, nav, main, section, article, aside, and footer.",
      "Forms need labels, clear input names, helpful errors, and keyboard-safe interactions."
    ],
    code: "<main>\n  <article>\n    <h1>Semantic Structure</h1>\n  </article>\n</main>",
    level: "Beginner"
  },
  {
    type: "note",
    slug: "js-event-loop-notes",
    title: "JavaScript event loop notes",
    excerpt: "Compact notes on call stack, Web APIs, callback queue, and microtasks for interview prep.",
    category: "JavaScript",
    readTime: "10 min read",
    tags: ["javascript", "event loop", "async"],
    detail: [
      "JavaScript runs on a single call stack.",
      "Timers, fetch, and browser-driven tasks complete outside the stack and later queue callbacks.",
      "Promises use the microtask queue, which runs before the next macrotask."
    ],
    code: "console.log('start');\nsetTimeout(() => console.log('timeout'), 0);\nPromise.resolve().then(() => console.log('promise'));",
    level: "Intermediate"
  },
  {
    type: "note",
    slug: "react-component-notes",
    title: "React component design notes",
    excerpt: "Reusable component notes for props, state ownership, composition, and render behavior.",
    category: "React",
    readTime: "9 min read",
    tags: ["react", "components", "state"],
    detail: [
      "Keep state as close as possible to where it is used, but as high as necessary for shared updates.",
      "Composition usually scales better than giant prop-heavy components.",
      "A strong interview answer should include a tradeoff."
    ],
    code: "function Card({ title, actions, children }) {\n  return <section>{children}</section>;\n}",
    level: "Intermediate"
  }
];

const cheatSheets = [
  {
    type: "cheatsheet",
    slug: "flexbox-cheatsheet",
    title: "Flexbox cheat sheet",
    excerpt: "The core flex properties you actually use when building navbars, toolbars, cards, and form rows.",
    category: "CSS",
    readTime: "Quick reference",
    tags: ["css", "flexbox", "layout"],
    detail: [
      "Use display flex on the parent, then shape layout with justify-content, align-items, gap, and flex-wrap.",
      "Most practical tasks rely on a few repeatable patterns: centered content, split rows, wrapped chips, and pinned actions."
    ],
    code: ".row { display: flex; }\n.row-between { display: flex; justify-content: space-between; align-items: center; }\n.wrap { display: flex; flex-wrap: wrap; gap: 0.75rem; }",
    level: "Reference"
  },
  {
    type: "cheatsheet",
    slug: "grid-cheatsheet",
    title: "CSS grid cheat sheet",
    excerpt: "A fast reference for columns, rows, gap, minmax, auto-fit, and common dashboard patterns.",
    category: "CSS",
    readTime: "Quick reference",
    tags: ["css", "grid", "responsive"],
    detail: [
      "Grid shines when the whole page or section needs column logic.",
      "Minmax and auto-fit are especially useful for responsive card layouts.",
      "Production layouts often use grid for structure and flexbox inside each component."
    ],
    code: ".cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 1rem;\n}",
    level: "Reference"
  },
  {
    type: "cheatsheet",
    slug: "git-cheatsheet",
    title: "Git commands cheat sheet",
    excerpt: "A shortlist of Git commands for status, branching, commits, pulls, and reviewing changes.",
    category: "Tools",
    readTime: "Quick reference",
    tags: ["git", "cli", "workflow"],
    detail: [
      "Good Git habits reduce panic. Learn status, diff, branch, add, commit, pull, and log before advanced commands.",
      "Keep non-destructive commands close at hand so you can inspect state before changing anything."
    ],
    code: "git status\ngit checkout -b feature/notes-page\ngit add .\ngit commit -m \"Add notes workspace\"\ngit log --oneline --graph --decorate -10",
    level: "Reference"
  }
];

const interviewQuestions = [
  {
    type: "interview",
    slug: "difference-between-flex-and-grid",
    question: "What is the difference between flexbox and grid?",
    excerpt: "Explain the practical difference with a real project example.",
    category: "CSS",
    level: "Beginner",
    tags: ["css", "flexbox", "grid"],
    companies: ["TCS", "Infosys"],
    answer: [
      "Flexbox is one-dimensional, so it is best when you are controlling layout in a row or a column.",
      "Grid is two-dimensional, so it is better when rows and columns need to work together.",
      "A practical example: use grid for a dashboard shell, then flexbox inside cards."
    ],
    code: ".shell { display: grid; grid-template-columns: 260px 1fr; }\n.toolbar { display: flex; justify-content: space-between; }"
  },
  {
    type: "interview",
    slug: "what-is-event-delegation",
    question: "What is event delegation in JavaScript?",
    excerpt: "Show how bubbling helps when you have many dynamic child elements.",
    category: "JavaScript",
    level: "Beginner",
    tags: ["javascript", "events", "dom"],
    companies: ["Wipro", "Accenture"],
    answer: [
      "Event delegation means attaching one listener to a parent element instead of many listeners to each child.",
      "It works because events bubble up through the DOM tree.",
      "This improves performance and makes dynamic lists easier to manage."
    ],
    code: "list.addEventListener('click', (event) => {\n  const button = event.target.closest('[data-remove]');\n  if (!button) return;\n});"
  },
  {
    type: "interview",
    slug: "what-is-closure",
    question: "What is a closure in JavaScript?",
    excerpt: "Give a simple definition plus one useful example.",
    category: "JavaScript",
    level: "Intermediate",
    tags: ["javascript", "closure", "functions"],
    companies: ["Amazon", "Flipkart"],
    answer: [
      "A closure happens when a function remembers variables from the scope where it was created.",
      "This is useful for private state, configuration, and factory functions.",
      "Interviewers usually want both the definition and a real usage example."
    ],
    code: "function createCounter() {\n  let count = 0;\n  return () => ++count;\n}"
  },
  {
    type: "interview",
    slug: "semantic-html-importance",
    question: "Why is semantic HTML important?",
    excerpt: "Cover accessibility, SEO, and maintainability together.",
    category: "HTML",
    level: "Beginner",
    tags: ["html", "semantic", "accessibility"],
    companies: ["Capgemini", "Infosys"],
    answer: [
      "Semantic HTML improves accessibility by helping assistive technology understand page structure.",
      "It also improves maintainability because the markup communicates intent more clearly.",
      "Search engines benefit from better structure as well."
    ],
    code: "<header></header>\n<nav></nav>\n<main>\n  <article></article>\n</main>"
  },
  {
    type: "interview",
    slug: "react-state-vs-props",
    question: "What is the difference between props and state in React?",
    excerpt: "Explain ownership and when data should live in each place.",
    category: "React",
    level: "Intermediate",
    tags: ["react", "props", "state"],
    companies: ["Zoho", "Microsoft"],
    answer: [
      "Props are inputs passed from a parent component. State is data managed by a component itself or lifted higher.",
      "Props help components stay predictable, while state handles local interactivity and changing values.",
      "A good explanation includes ownership: state lives where updates are managed, props flow down to consumers."
    ],
    code: "function Badge({ label }) {\n  return <span>{label}</span>;\n}"
  }
];

function slugify(value) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

const storageCache = new Map();

function cloneJsonValue(value) {
  if (value === undefined) {
    return undefined;
  }

  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }

  return JSON.parse(JSON.stringify(value));
}

function loadJson(key, fallback) {
  if (storageCache.has(key)) {
    return cloneJsonValue(storageCache.get(key));
  }

  try {
    const value = localStorage.getItem(key);
    const parsed = value ? JSON.parse(value) : fallback;
    storageCache.set(key, cloneJsonValue(parsed));
    return cloneJsonValue(parsed);
  } catch (error) {
    return fallback;
  }
}

function saveJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    storageCache.set(key, cloneJsonValue(value));
    return true;
  } catch (error) {
    console.error(`Failed to save ${key}`, error);
    return false;
  }
}

function getProviderConfig() {
  return loadJson(STORAGE_KEYS.provider, {
    provider: "local",
    projectUrl: "",
    publicKey: ""
  });
}

function saveProviderConfig(config) {
  const nextConfig = {
    provider: config.provider || "local",
    projectUrl: (config.projectUrl || "").trim(),
    publicKey: (config.publicKey || "").trim()
  };
  saveJson(STORAGE_KEYS.provider, nextConfig);
  document.dispatchEvent(new CustomEvent("providerconfigchange", { detail: nextConfig }));
  return nextConfig;
}

function bindProviderConfigForm(options) {
  const {
    form,
    select,
    urlInput,
    keyInput,
    messageTarget,
    localMessage,
    remoteMessage
  } = options;

  if (!form || !select || !urlInput || !keyInput || !messageTarget) {
    return;
  }

  const renderConfig = (config = getProviderConfig()) => {
    select.value = config.provider || "local";
    urlInput.value = config.projectUrl || "";
    keyInput.value = config.publicKey || "";
  };

  renderConfig();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const nextConfig = saveProviderConfig({
      provider: select.value,
      projectUrl: urlInput.value,
      publicKey: keyInput.value
    });
    setInlineMessage(messageTarget, nextConfig.provider === "local" ? localMessage : remoteMessage, "success");
  });

  document.addEventListener("providerconfigchange", (event) => {
    renderConfig(event.detail);
  });
}

function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" };
    return map[char];
  });
}

function shuffleArray(items) {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const nextIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[nextIndex]] = [copy[nextIndex], copy[index]];
  }

  return copy;
}

function updateMetaContent(selector, value) {
  const target = document.querySelector(selector);
  if (target && value) {
    target.setAttribute("content", value);
  }
}

function getLocalEntries() {
  return loadJson(STORAGE_KEYS.posts, []);
}

const dataStore = {
  getProviderMeta() {
    const config = getProviderConfig();
    return {
      mode: config.provider === "local" ? "local" : "scaffold",
      provider: config.provider || "local"
    };
  },
  listEntries() {
    return getLocalEntries();
  },
  saveEntries(entries) {
    saveJson(STORAGE_KEYS.posts, entries);
  },
  createEntry(entry) {
    const existing = this.listEntries();
    const withoutDuplicate = existing.filter((item) => !(item.slug === entry.slug && item.type === entry.type));
    this.saveEntries([entry, ...withoutDuplicate]);
  },
  updateEntry(originalSlug, originalType, entry) {
    const existing = this.listEntries();
    const next = existing.filter((item) => !(item.slug === originalSlug && item.type === originalType));
    this.saveEntries([entry, ...next]);
  },
  deleteEntry(slug, type) {
    const existing = this.listEntries();
    this.saveEntries(existing.filter((item) => !(item.slug === slug && item.type === type)));
  }
};

function getBookmarks() {
  return loadJson(STORAGE_KEYS.bookmarks, []);
}

function getComments() {
  return loadJson(STORAGE_KEYS.comments, {});
}

function getProfile() {
  return loadJson(STORAGE_KEYS.profile, { name: "", goal: "" });
}

function getAuth() {
  return loadJson(STORAGE_KEYS.auth, { name: "", email: "", loggedIn: false, memberSince: "" });
}

function getPlanner() {
  return loadJson(STORAGE_KEYS.planner, {});
}

function getProgress() {
  return loadJson(STORAGE_KEYS.progress, { viewed: {}, revised: {}, copied: {} });
}

function saveProgress(progress) {
  saveJson(STORAGE_KEYS.progress, progress);
}

function markProgress(section, key) {
  const progress = getProgress();
  progress[section] = progress[section] || {};
  progress[section][key] = Date.now();
  saveProgress(progress);
}

function getRecentItems() {
  return loadJson(STORAGE_KEYS.recent, []);
}

function recordRecentView(item) {
  const entry = {
    type: item.type,
    slug: item.slug,
    title: item.title,
    category: item.category,
    readTime: item.readTime,
    timestamp: Date.now()
  };
  const recent = getRecentItems().filter((saved) => !(saved.type === entry.type && saved.slug === entry.slug));
  recent.unshift(entry);
  saveJson(STORAGE_KEYS.recent, recent.slice(0, 8));
}

function getContentCollections() {
  const localEntries = getLocalEntries().map((entry) => ({ ...entry, isLocal: true }));
  return {
    tutorial: tutorials,
    project: projects,
    blog: [...localEntries.filter((entry) => entry.type === "blog"), ...blogPosts],
    note: [...localEntries.filter((entry) => entry.type === "note"), ...notes],
    cheatsheet: [...localEntries.filter((entry) => entry.type === "cheatsheet"), ...cheatSheets]
  };
}

function getInterviewQuestions() {
  const localEntries = getLocalEntries()
    .filter((entry) => entry.type === "interview")
    .map((entry) => ({
      ...entry,
      question: entry.question || entry.title,
      title: entry.title || entry.question,
      answer: Array.isArray(entry.answer)
        ? entry.answer
        : Array.isArray(entry.detail)
          ? entry.detail
          : htmlToParagraphArray(entry.detailHtml || entry.detail || ""),
      options: Array.isArray(entry.options)
        ? entry.options
            .map((option) => ({
              key: String(option.key || "").toUpperCase(),
              text: String(option.text || "").trim()
            }))
            .filter((option) => option.key && option.text)
        : [],
      correctOption: entry.correctOption ? String(entry.correctOption).toUpperCase() : "",
      companies: Array.isArray(entry.companies) ? entry.companies : ["Custom"],
      level: entry.level || "Admin-added",
      isLocal: true
    }));

  const builtIn = interviewQuestions.map((item) => ({
    ...item,
    title: item.question
  }));

  return [...localEntries, ...builtIn];
}

function renderInterviewOptions(options, selectedKey = "") {
  if (!Array.isArray(options) || !options.length) {
    return "";
  }

  return `
    <div class="mcq-options">
      ${options.map((option) => `
        <div class="mcq-option ${selectedKey === option.key ? "is-correct" : ""}">
          <span class="mcq-option-key">${escapeHtml(option.key)}</span>
          <span>${escapeHtml(option.text)}</span>
        </div>
      `).join("")}
    </div>
  `;
}

function renderInteractiveInterviewOptions(item) {
  if (!Array.isArray(item.options) || !item.options.length) {
    return "";
  }

  return `
    <div class="mcq-options is-interactive" data-question-options="${escapeHtml(item.slug)}">
      ${item.options.map((option) => `
        <button class="mcq-option-button" type="button" data-question-option="${escapeHtml(item.slug)}" data-option-key="${escapeHtml(option.key)}">
          <span class="mcq-option-key">${escapeHtml(option.key)}</span>
          <span>${escapeHtml(option.text)}</span>
        </button>
      `).join("")}
    </div>
    <p class="mcq-feedback" id="mcq-feedback-${escapeHtml(item.slug)}" hidden></p>
  `;
}

function getAllContent() {
  const collections = getContentCollections();
  return [...collections.tutorial, ...collections.project, ...collections.blog, ...collections.note, ...collections.cheatsheet];
}

function findContent(type, slug) {
  const collections = getContentCollections();
  return collections[type]?.find((item) => item.slug === slug) || null;
}

function findByBookmarkKey(key) {
  const [type, ...rest] = key.split(":");
  const slug = rest.join(":");
  if (type === "interview") {
    return getInterviewQuestions().find((item) => item.slug === slug) || null;
  }
  return findContent(type, slug);
}

function applyInlineFormatting(text) {
  return escapeHtml(text)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
    .replace(/\[accent\]([\s\S]+?)\[\/accent\]/g, '<span class="rich-accent">$1</span>')
    .replace(/\[highlight\]([\s\S]+?)\[\/highlight\]/g, '<span class="rich-highlight">$1</span>')
    .replace(/\[serif\]([\s\S]+?)\[\/serif\]/g, '<span class="rich-serif">$1</span>')
    .replace(/\[mono\]([\s\S]+?)\[\/mono\]/g, '<span class="rich-mono">$1</span>');
}

function formatBody(detail) {
  if (typeof detail === "string") {
    return detail.trim() || "<p>Start writing to build the article body.</p>";
  }

  const blocks = Array.isArray(detail) ? detail : [];

  return blocks.map((block) => {
    const value = String(block || "").trim();
    if (!value) {
      return "";
    }

    const imageMatch = value.match(/^!\[(.*?)\]\((https?:\/\/[^\s)]+)\)$/);
    if (imageMatch) {
      return `
        <figure class="article-image">
          <img src="${imageMatch[2]}" alt="${escapeHtml(imageMatch[1] || "Article image")}">
          ${imageMatch[1] ? `<figcaption>${escapeHtml(imageMatch[1])}</figcaption>` : ""}
        </figure>
      `;
    }

    if (/^---+$/.test(value)) {
      return "<hr class=\"article-divider\">";
    }

    if (value.startsWith("## ")) {
      return `<h2>${applyInlineFormatting(value.slice(3))}</h2>`;
    }

    if (value.startsWith("### ")) {
      return `<h3>${applyInlineFormatting(value.slice(4))}</h3>`;
    }

    if (value.startsWith("> ")) {
      return `<blockquote>${applyInlineFormatting(value.slice(2))}</blockquote>`;
    }

    const unorderedLines = value.split("\n").map((line) => line.trim()).filter(Boolean);
    if (unorderedLines.length > 1 && unorderedLines.every((line) => /^[-*]\s+/.test(line))) {
      return `<ul>${unorderedLines.map((line) => `<li>${applyInlineFormatting(line.replace(/^[-*]\s+/, ""))}</li>`).join("")}</ul>`;
    }

    const orderedLines = value.split("\n").map((line) => line.trim()).filter(Boolean);
    if (orderedLines.length > 1 && orderedLines.every((line) => /^\d+\.\s+/.test(line))) {
      return `<ol>${orderedLines.map((line) => `<li>${applyInlineFormatting(line.replace(/^\d+\.\s+/, ""))}</li>`).join("")}</ol>`;
    }

    return `<p>${applyInlineFormatting(value).replace(/\n/g, "<br>")}</p>`;
  }).join("");
}

function createTempContentRoot(html = "") {
  const container = document.createElement("div");
  container.innerHTML = html;
  return container;
}

function extractPlainTextFromHtml(html = "") {
  return createTempContentRoot(html).textContent?.trim() || "";
}

function htmlToParagraphArray(html = "") {
  const root = createTempContentRoot(html);
  const blockSelectors = "h2, h3, p, li, blockquote, figcaption";
  const blocks = Array.from(root.querySelectorAll(blockSelectors))
    .map((node) => node.textContent?.trim() || "")
    .filter(Boolean);

  if (blocks.length) {
    return blocks;
  }

  const fallback = root.textContent?.trim();
  return fallback ? [fallback] : [];
}

function getItemMeta(item) {
  return item.level || item.stack || item.author || item.category;
}

function formatEntryTimestamp(value) {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

function getContentHref(item) {
  return `content.html?type=${encodeURIComponent(item.type)}&slug=${encodeURIComponent(item.slug)}`;
}

function createCard(item) {
  return `
    <article class="content-card">
      <div class="card-top">
        <span class="card-type">${escapeHtml(item.type)}</span>
        <span class="card-meta">${escapeHtml(item.readTime)}</span>
      </div>
      <div>
        <h3>${escapeHtml(item.title)}</h3>
        <p class="card-excerpt">${escapeHtml(item.excerpt)}</p>
      </div>
      <div class="tag-row">${item.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
      <div class="card-footer">
        <span class="card-meta">${escapeHtml(getItemMeta(item))}</span>
        <a class="card-link" href="${getContentHref(item)}">Open</a>
      </div>
    </article>
  `;
}

function createResourceLink(item) {
  return `
    <a class="resource-link" href="${getContentHref(item)}">
      <strong>${escapeHtml(item.title)}</strong>
      <span>${escapeHtml(item.category)} - ${escapeHtml(item.readTime)}</span>
    </a>
  `;
}

function getSearchIndex() {
  const pageEntries = [
    {
      searchType: "page",
      slug: "home-page",
      title: "Home",
      excerpt: "Overview of learning paths, featured content, and the main study workflow.",
      category: "Navigation",
      readTime: "Page",
      tags: ["home", "learning hub", "featured"],
      detail: ["Start here to jump into tutorials, projects, and published notes."],
      href: "index.html"
    },
    {
      searchType: "page",
      slug: "dashboard-page",
      title: "Dashboard",
      excerpt: "Track bookmarks, revision streaks, planner activity, and learning progress.",
      category: "Workspace",
      readTime: "Page",
      tags: ["dashboard", "planner", "progress", "bookmarks"],
      detail: ["Use the dashboard to review saved resources and learning momentum."],
      href: "dashboard.html"
    },
    {
      searchType: "page",
      slug: "notes-page",
      title: "Notes",
      excerpt: "Searchable revision notes for HTML, CSS, JavaScript, and frontend concepts.",
      category: "Learn",
      readTime: "Page",
      tags: ["notes", "revision", "frontend"],
      detail: ["Browse compact study notes and locally published custom notes."],
      href: "notes.html"
    },
    {
      searchType: "page",
      slug: "tutorials-page",
      title: "Tutorials",
      excerpt: "Practical tutorials focused on workflows, responsive UI, and implementation thinking.",
      category: "Learn",
      readTime: "Page",
      tags: ["tutorials", "frontend", "learning"],
      detail: ["Tutorials help you move from concept clarity to applied implementation."],
      href: "tutorials.html"
    },
    {
      searchType: "page",
      slug: "projects-page",
      title: "Projects",
      excerpt: "Build-brief library for realistic frontend and workflow project ideas.",
      category: "Practice",
      readTime: "Page",
      tags: ["projects", "workflow", "frontend"],
      detail: ["Project briefs focus on scope, stack, and delivery notes."],
      href: "projects.html"
    },
    {
      searchType: "page",
      slug: "interview-page",
      title: "Interview Questions",
      excerpt: "Practice interview questions, mock tests, flashcards, and company filters.",
      category: "Practice",
      readTime: "Page",
      tags: ["interview", "mock test", "flashcards"],
      detail: ["Interview prep combines questions, answer reveals, and revision tracking."],
      href: "interview.html"
    },
    {
      searchType: "page",
      slug: "cheatsheets-page",
      title: "Cheat Sheets",
      excerpt: "Quick references for layout, Git commands, and common frontend topics.",
      category: "Learn",
      readTime: "Page",
      tags: ["cheatsheets", "reference", "snippets"],
      detail: ["Use cheat sheets for quick lookup and repeatable patterns."],
      href: "cheatsheets.html"
    },
    {
      searchType: "page",
      slug: "blog-page",
      title: "Blog",
      excerpt: "Practical thinking on workflow, UX, and frontend learning habits.",
      category: "Explore",
      readTime: "Page",
      tags: ["blog", "workflow", "ux"],
      detail: ["Blog posts connect implementation details with product thinking."],
      href: "blog.html"
    },
    {
      searchType: "page",
      slug: "editor-page",
      title: "Editor",
      excerpt: "Create local notes, blog posts, and interview questions inside the site workflow.",
      category: "Create",
      readTime: "Page",
      tags: ["editor", "publish", "notes", "blog"],
      detail: ["The editor lets you create local content that appears in the learning system."],
      href: "writing.html"
    },
    {
      searchType: "page",
      slug: "admin-page",
      title: "Admin Panel",
      excerpt: "Manage local resources, provider config, and stored content entries.",
      category: "Workspace",
      readTime: "Page",
      tags: ["admin", "config", "resources"],
      detail: ["The admin page helps manage local content and provider settings."],
      href: "admin.html"
    }
  ];

  const contentEntries = getAllContent().map((item) => ({
    ...item,
    searchType: item.type,
    href: getContentHref(item)
  }));

  const interviewEntries = getInterviewQuestions().map((item) => ({
    ...item,
    title: item.question,
    detail: item.answer,
    readTime: `${item.level} interview`,
    searchType: "interview",
    href: `interview.html?focus=${encodeURIComponent(item.slug)}`
  }));

  return [...pageEntries, ...contentEntries, ...interviewEntries];
}

function getSearchItemMeta(item) {
  if (item.searchType === "page") {
    return item.category;
  }

  if (item.searchType === "interview") {
    const companyMeta = (item.companies || []).slice(0, 2).join(", ");
    return [item.category, item.level, companyMeta].filter(Boolean).join(" - ");
  }

  return getItemMeta(item);
}

function createSearchResultCard(item) {
  const tags = (item.tags || []).slice(0, 4);
  return `
    <article class="content-card search-result-card">
      <div class="card-top">
        <span class="card-type">${escapeHtml(item.searchType)}</span>
        <span class="card-meta">${escapeHtml(item.readTime || "Resource")}</span>
      </div>
      <div>
        <h3>${escapeHtml(item.title)}</h3>
        <p class="card-excerpt">${escapeHtml(item.excerpt || "")}</p>
      </div>
      <div class="tag-row">${tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
      <div class="card-footer">
        <span class="card-meta">${escapeHtml(getSearchItemMeta(item) || "Website")}</span>
        <a class="card-link" href="${escapeHtml(item.href)}">Open</a>
      </div>
    </article>
  `;
}

function syncGlobalSearchForms(page) {
  const query = page === "search" ? new URLSearchParams(window.location.search).get("q") || "" : "";
  document.querySelectorAll(".global-search input[name='q']").forEach((input) => {
    input.value = query;
  });
}

function getPrimarySearchInput() {
  const candidates = [
    document.getElementById("searchPageInput"),
    document.getElementById("listingSearch"),
    ...document.querySelectorAll(".global-search-input")
  ].filter(Boolean);

  return candidates.find((input) => {
    const element = input;
    return element.offsetParent !== null || element === document.activeElement;
  }) || null;
}

function ensureFontAwesome() {
  if (document.getElementById("fontAwesomeCdn")) {
    return;
  }

  const link = document.createElement("link");
  link.id = "fontAwesomeCdn";
  link.rel = "stylesheet";
  link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css";
  document.head.appendChild(link);
}

function addLeadingIcon(element, iconClass) {
  if (!element || element.querySelector(".fa-solid, .fa-regular, .fa-brands")) {
    return;
  }

  const label = element.textContent.trim();
  element.classList.add("with-icon");
  element.innerHTML = `<i class="${iconClass}" aria-hidden="true"></i><span>${escapeHtml(label)}</span>`;
}

function getHrefIcon(href) {
  if (!href) {
    return "";
  }

  if (href.includes("index.html")) return "fa-solid fa-house";
  if (href.includes("notes.html")) return "fa-solid fa-note-sticky";
  if (href.includes("tutorials.html")) return "fa-solid fa-graduation-cap";
  if (href.includes("cheatsheets.html")) return "fa-solid fa-table-list";
  if (href.includes("interview.html")) return "fa-solid fa-user-check";
  if (href.includes("projects.html")) return "fa-solid fa-diagram-project";
  if (href.includes("writing.html")) return "fa-solid fa-pen-to-square";
  if (href.includes("blog.html")) return "fa-solid fa-newspaper";
  if (href.includes("dashboard.html")) return "fa-solid fa-chart-line";
  if (href.includes("admin.html")) return "fa-solid fa-gear";
  if (href.includes("search.html")) return "fa-solid fa-magnifying-glass";
  if (href.includes("content.html")) return "fa-solid fa-arrow-up-right-from-square";
  return "fa-solid fa-link";
}

function decorateSiteIcons() {
  ensureFontAwesome();

  document.querySelectorAll(".header-actions a").forEach((element) => {
    addLeadingIcon(element, getHrefIcon(element.getAttribute("href")));
  });

  document.querySelectorAll(".global-search-submit").forEach((button) => {
    button.textContent = "Go";
    addLeadingIcon(button, "fa-solid fa-magnifying-glass");
  });
}

function setupFooterSocial() {
  ensureFontAwesome();

  document.querySelectorAll(".footer-brand").forEach((brand) => {
    if (brand.querySelector(".footer-social")) {
      return;
    }

    const social = document.createElement("div");
    social.className = "footer-social";
    social.innerHTML = `
      <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub">
        <i class="fa-brands fa-github" aria-hidden="true"></i>
      </a>
      <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
        <i class="fa-brands fa-linkedin-in" aria-hidden="true"></i>
      </a>
      <a href="https://x.com/" target="_blank" rel="noreferrer" aria-label="X">
        <i class="fa-brands fa-x-twitter" aria-hidden="true"></i>
      </a>
      <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" aria-label="YouTube">
        <i class="fa-brands fa-youtube" aria-hidden="true"></i>
      </a>
    `;

    brand.appendChild(social);
  });
}

function setupAccessibility() {
  const main = document.querySelector("main");
  if (main) {
    if (!main.id) {
      main.id = "mainContent";
    }

    if (!document.querySelector(".skip-link")) {
      const skipLink = document.createElement("a");
      skipLink.className = "skip-link";
      skipLink.href = `#${main.id}`;
      skipLink.textContent = "Skip to content";
      document.body.insertAdjacentElement("afterbegin", skipLink);
    }
  }

  document.querySelectorAll("input[type='search']").forEach((input) => {
    input.setAttribute("title", "Press / to focus search");
  });

  document.addEventListener("keydown", (event) => {
    const target = event.target;
    const isTypingField = target instanceof HTMLElement
      && (target.matches("input, textarea, select") || target.isContentEditable);
    const searchInput = getPrimarySearchInput();

    if (!searchInput) {
      return;
    }

    const wantsSearchShortcut = (
      event.key === "/"
      && !event.ctrlKey
      && !event.metaKey
      && !event.altKey
    ) || (
      event.key.toLowerCase() === "k"
      && (event.ctrlKey || event.metaKey)
      && !event.altKey
    );

    if (wantsSearchShortcut && !isTypingField) {
      event.preventDefault();
      searchInput.focus();
      searchInput.select();
    }

    if (event.key === "Escape" && document.activeElement instanceof HTMLElement && document.activeElement.matches("input[type='search']")) {
      document.activeElement.blur();
    }
  });
}

function setupSearchPage() {
  const form = document.getElementById("searchPageForm");
  const input = document.getElementById("searchPageInput");
  const chips = document.getElementById("searchTypeChips");
  const count = document.getElementById("searchCount");
  const results = document.getElementById("searchResults");
  const empty = document.getElementById("searchEmpty");

  if (!form || !input || !chips || !count || !results || !empty) {
    return;
  }

  const searchIndex = getSearchIndex();
  const params = new URLSearchParams(window.location.search);
  let activeType = params.get("type") || "all";
  input.value = params.get("q") || "";

  const types = ["all", ...new Set(searchIndex.map((item) => item.searchType))];
  chips.innerHTML = types
    .map((type) => `<button class="chip ${type === activeType ? "is-active" : ""}" type="button" data-search-type="${escapeHtml(type)}">${escapeHtml(type === "all" ? "All" : type)}</button>`)
    .join("");

  function render() {
    const query = input.value.trim().toLowerCase();
    const filtered = searchIndex.filter((item) => {
      const matchesType = activeType === "all" || item.searchType === activeType;
      const haystack = [
        item.title,
        item.excerpt,
        item.category,
        item.readTime,
        getSearchItemMeta(item),
        (item.tags || []).join(" "),
        (item.detail || []).join(" "),
        (item.companies || []).join(" ")
      ].join(" ").toLowerCase();
      return matchesType && (!query || haystack.includes(query));
    });

    count.textContent = `${filtered.length} result${filtered.length === 1 ? "" : "s"} found`;
    results.innerHTML = filtered.map(createSearchResultCard).join("");
    empty.hidden = filtered.length !== 0;

    const nextParams = new URLSearchParams();
    if (query) {
      nextParams.set("q", input.value.trim());
    }
    if (activeType !== "all") {
      nextParams.set("type", activeType);
    }
    const nextUrl = `search.html${nextParams.toString() ? `?${nextParams.toString()}` : ""}`;
    window.history.replaceState({}, "", nextUrl);
    syncGlobalSearchForms("search");
  }

  chips.addEventListener("click", (event) => {
    const chip = event.target.closest("[data-search-type]");
    if (!chip) {
      return;
    }

    activeType = chip.dataset.searchType;
    Array.from(chips.querySelectorAll(".chip")).forEach((button) => {
      button.classList.toggle("is-active", button === chip);
    });
    render();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    render();
  });

  input.addEventListener("input", render);
  render();
}

function renderFeaturedContent() {
  const target = document.getElementById("featuredContent");
  if (!target) {
    return;
  }

  const featured = [notes[0], tutorials[2], cheatSheets[0]];
  target.innerHTML = featured.map(createCard).join("");
}

function setupHomeWorkspace() {
  const spotlight = document.getElementById("homeWorkspaceSpotlight");
  const recentTarget = document.getElementById("homeRecentList");
  if (!spotlight || !recentTarget) {
    return;
  }

  const auth = getAuth();
  const profile = getProfile();
  const progress = getProgress();
  const planner = getPlanner();
  const recent = getRecentItems().slice(0, 4);
  const bookmarks = getBookmarks().map(findByBookmarkKey).filter(Boolean).slice(0, 2);
  const learnerName = auth.loggedIn ? auth.name : profile.name;
  const viewedCount = Object.keys(progress.viewed || {}).length;
  const revisedCount = Object.keys(progress.revised || {}).length;
  const plannedCount = Object.keys(planner).length;
  const latest = recent[0];

  const title = learnerName
    ? `${learnerName}, your learning workspace is ready`
    : "Your learning workspace is still empty";
  const description = latest
    ? `Jump back into ${latest.title} or head to the dashboard to keep your study streak moving.`
    : "Browse a resource, bookmark something useful, or create a local study profile to turn this homepage into a return point.";

  spotlight.innerHTML = `
    <p class="eyebrow">Workspace spotlight</p>
    <h3>${escapeHtml(title)}</h3>
    <p>${escapeHtml(description)}</p>
    <div class="progress-badge-row">
      <span class="progress-badge">${viewedCount} viewed</span>
      <span class="progress-badge">${revisedCount} revised</span>
      <span class="progress-badge">${plannedCount} planned</span>
    </div>
    <div class="resource-link-row">
      <a class="button" href="${latest ? getContentHref(latest) : "dashboard.html"}">${latest ? "Resume latest resource" : "Open dashboard"}</a>
      <a class="button button-ghost" href="${bookmarks[0] ? getContentHref(bookmarks[0]) : "search.html"}">${bookmarks[0] ? "Open saved bookmark" : "Search resources"}</a>
    </div>
    ${bookmarks.length ? `<div class="resource-list">${bookmarks.map(createResourceLink).join("")}</div>` : ""}
  `;

  recentTarget.innerHTML = recent.length
    ? recent.map((item) => `
        <a class="resource-link" href="${getContentHref(item)}">
          <strong>${escapeHtml(item.title)}</strong>
          <span>${escapeHtml(item.category)} - ${escapeHtml(item.readTime)}</span>
        </a>
      `).join("")
    : "<p class=\"empty-state\">Open a note, tutorial, or project and it will appear here for quick return visits.</p>";
}

function setupHomeParticles() {
  if (document.body.dataset.page !== "home") {
    return;
  }

  const canvas = document.getElementById("homeParticles");
  if (!canvas) {
    return;
  }

  const context = canvas.getContext("2d");
  if (!context) {
    return;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let stars = [];
  let animationFrame = 0;
  let width = 0;
  let height = 0;
  let devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  let frame = 0;

  function setCanvasSize() {
    width = window.innerWidth;
    height = window.innerHeight;
    devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(width * devicePixelRatio);
    canvas.height = Math.floor(height * devicePixelRatio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  }

  function getPalette() {
    const isDark = document.body.dataset.theme === "dark";
    return isDark
      ? ["255, 143, 82", "68, 187, 201", "255, 180, 135"]
      : ["167, 81, 42", "32, 138, 150", "140, 84, 58"];
  }

  function createStar(index) {
    const palette = getPalette();
    const centerX = width * 0.52;
    const centerY = height * 0.38;
    const orbitBase = Math.min(width, height) * 0.12;
    const orbitSpan = Math.min(width, height) * 0.52;
    const orbit = orbitBase + Math.random() * orbitSpan;
    const angle = Math.random() * Math.PI * 2;
    const spiral = orbit * (0.35 + Math.random() * 0.7);
    return {
      x: centerX + Math.cos(angle) * spiral,
      y: centerY + Math.sin(angle) * spiral * 0.62,
      orbit,
      angle,
      speed: 0.0009 + Math.random() * 0.0024,
      radius: 0.7 + Math.random() * 2.6,
      alpha: 0.28 + Math.random() * 0.5,
      flicker: 0.35 + Math.random() * 0.7,
      color: palette[index % palette.length],
      depth: 0.5 + Math.random() * 1.3,
      trail: Math.random() > 0.68
    };
  }

  function seedStars() {
    const starCount = Math.max(40, Math.min(110, Math.round(width / 16)));
    stars = Array.from({ length: starCount }, (_, index) => createStar(index));
  }

  function drawGalaxyCore() {
    const centerX = width * 0.52;
    const centerY = height * 0.38;
    const coreRadius = Math.min(width, height) * 0.24;
    const glow = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreRadius);
    const isDark = document.body.dataset.theme === "dark";
    glow.addColorStop(0, isDark ? "rgba(255, 197, 163, 0.18)" : "rgba(225, 145, 98, 0.18)");
    glow.addColorStop(0.45, isDark ? "rgba(255, 143, 82, 0.08)" : "rgba(167, 81, 42, 0.1)");
    glow.addColorStop(1, "rgba(0, 0, 0, 0)");
    context.fillStyle = glow;
    context.fillRect(0, 0, width, height);
  }

  function drawStars(isStatic = false) {
    context.clearRect(0, 0, width, height);
    drawGalaxyCore();

    const centerX = width * 0.52;
    const centerY = height * 0.38;

    stars.forEach((star, index) => {
      const angle = star.angle + frame * star.speed * star.depth;
      const orbitX = Math.cos(angle) * star.orbit;
      const orbitY = Math.sin(angle) * star.orbit * 0.56;
      const armOffset = Math.sin(angle * 2.2 + index * 0.14) * (18 * star.depth);
      const x = centerX + orbitX + armOffset;
      const y = centerY + orbitY + Math.cos(angle * 1.7 + index) * (8 * star.depth);
      const twinkle = 0.72 + Math.sin(frame * 0.018 * star.flicker + index) * 0.28;
      const alpha = star.alpha * twinkle;

      if (star.trail && !isStatic) {
        context.strokeStyle = `rgba(${star.color}, ${alpha * 0.12})`;
        context.lineWidth = star.radius * 0.9;
        context.beginPath();
        context.moveTo(centerX + Math.cos(angle - 0.08) * star.orbit, centerY + Math.sin(angle - 0.08) * star.orbit * 0.56);
        context.lineTo(x, y);
        context.stroke();
      }

      context.shadowBlur = star.radius * 10;
      context.shadowColor = `rgba(${star.color}, ${alpha * 0.45})`;
      context.fillStyle = `rgba(${star.color}, ${alpha})`;
      context.beginPath();
      context.arc(x, y, star.radius, 0, Math.PI * 2);
      context.fill();
      context.shadowBlur = 0;
    });

    if (isStatic) {
      return;
    }

    frame += 1;
    animationFrame = window.requestAnimationFrame(() => drawStars(false));
  }

  setCanvasSize();
  seedStars();

  if (prefersReducedMotion) {
    drawStars(true);
    document.addEventListener("themechange", () => {
      seedStars();
      drawStars(true);
    });
    return;
  }

  drawStars(false);

  document.addEventListener("themechange", () => {
    window.cancelAnimationFrame(animationFrame);
    seedStars();
    drawStars(false);
  });

  window.addEventListener("resize", () => {
    window.cancelAnimationFrame(animationFrame);
    setCanvasSize();
    seedStars();
    drawStars(false);
  });
}

function setupHomeAuth() {
  const form = document.getElementById("authForm");
  const nameInput = document.getElementById("authNameInput");
  const emailInput = document.getElementById("authEmailInput");
  const message = document.getElementById("authMessage");
  const summary = document.getElementById("authSummaryCard");

  if (!form || !nameInput || !emailInput || !message || !summary) {
    return;
  }

  const auth = getAuth();
  nameInput.value = auth.name || "";
  emailInput.value = auth.email || "";

  function renderSummary() {
    const current = getAuth();
    if (!current.loggedIn) {
      summary.innerHTML = `
        <p class="eyebrow">Workspace status</p>
        <h2>Local account preview</h2>
        <p>Once you create a session, your dashboard and planner will feel more personalized.</p>
      `;
      return;
    }

    summary.innerHTML = `
      <p class="eyebrow">Workspace status</p>
      <h2>${escapeHtml(current.name || "Learner session active")}</h2>
      <p>${escapeHtml(current.email)}</p>
      <div class="mini-grid">
        <span>Session active</span>
        <span>Member since ${escapeHtml(current.memberSince || "today")}</span>
      </div>
    `;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    saveJson(STORAGE_KEYS.auth, {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      loggedIn: true,
      memberSince: new Date().toLocaleDateString("en-GB")
    });
    setInlineMessage(message, "Local session created successfully.", "success");
    renderSummary();
  });

  renderSummary();
}

const NAV_GROUPS = {
  learn: ["notes", "tutorials", "cheatsheets"],
  practice: ["interview", "projects"],
  create: ["editor"]
};

function getCurrentNavKey(page) {
  if (page !== "content") {
    return page;
  }

  const type = new URLSearchParams(window.location.search).get("type");
  const detailNavMap = {
    note: "notes",
    tutorial: "tutorials",
    cheatsheet: "cheatsheets",
    project: "projects",
    blog: "blog"
  };
  return detailNavMap[type] || "";
}

function setupNavigation(page) {
  const navToggle = document.getElementById("navToggle");
  const siteNav = document.getElementById("siteNav");
  const siteHeader = document.querySelector(".site-header");
  const navDrawer = siteHeader ? siteHeader.querySelector(".nav-drawer") : null;

  if (navToggle && siteNav && navDrawer) {
    const mobileBreakpoint = 1080;
    const activeNavKey = getCurrentNavKey(page);

    siteNav.querySelectorAll("[data-nav]").forEach((link) => {
      const isActive = link.dataset.nav === activeNavKey;
      link.classList.toggle("is-active", isActive);
    });

    const setGroupExpanded = (group, expanded) => {
      group.classList.toggle("is-open", expanded);
      const button = group.querySelector("[data-nav-parent]");
      if (button) {
        button.setAttribute("aria-expanded", String(expanded));
      }
    };

    const resetGroups = () => {
      siteNav.querySelectorAll(".nav-group").forEach((group) => {
        setGroupExpanded(group, false);
      });
    };

    siteNav.querySelectorAll(".nav-group").forEach((group) => {
      const groupKey = group.dataset.navGroup || "";
      const items = NAV_GROUPS[groupKey] || [];
      const hasActiveChild = items.includes(activeNavKey);
      group.classList.toggle("is-active", hasActiveChild);
      setGroupExpanded(group, false);
    });

    const closeNav = () => {
      navDrawer.classList.remove("is-open");
      navToggle.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("is-nav-open");
      resetGroups();
    };

    const openNav = () => {
      if (window.innerWidth > mobileBreakpoint) {
        return;
      }
      navDrawer.classList.add("is-open");
      navToggle.classList.add("is-open");
      navToggle.setAttribute("aria-expanded", "true");
      document.body.classList.add("is-nav-open");
    };

    navToggle.addEventListener("click", () => {
      if (window.innerWidth > mobileBreakpoint) {
        return;
      }
      if (navDrawer.classList.contains("is-open")) {
        closeNav();
      } else {
        openNav();
      }
    });

    siteNav.querySelectorAll("[data-nav-parent]").forEach((button) => {
      button.addEventListener("click", (event) => {
        const group = button.closest(".nav-group");
        const next = !group.classList.contains("is-open");
        if (window.innerWidth > mobileBreakpoint) {
          siteNav.querySelectorAll(".nav-group").forEach((otherGroup) => {
            if (otherGroup !== group) {
              setGroupExpanded(otherGroup, false);
            }
          });
        } else {
          resetGroups();
        }
        setGroupExpanded(group, next);
      });
    });

    siteNav.addEventListener("click", (event) => {
      if (event.target.closest("a") && window.innerWidth <= mobileBreakpoint) {
        closeNav();
      }
    });

    document.addEventListener("click", (event) => {
      if (window.innerWidth > mobileBreakpoint) {
        const clickedGroup = event.target.closest(".nav-group");
        if (!clickedGroup) {
          resetGroups();
        }
        return;
      }

      const clickedInsideNav = navDrawer.contains(event.target);
      const clickedToggle = navToggle.contains(event.target);
      if (!clickedInsideNav && !clickedToggle) {
        closeNav();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeNav();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > mobileBreakpoint) {
        closeNav();
        resetGroups();
      }
    });
  }
}

function setupTheme() {
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem(STORAGE_KEYS.theme) || "light";
  document.body.dataset.theme = savedTheme;

  if (!themeToggle) {
    return;
  }

  const applyThemeToggleState = (theme) => {
    const isDark = theme === "dark";
    themeToggle.classList.add("with-icon");
    themeToggle.innerHTML = isDark
      ? "<i class=\"fa-solid fa-sun\" aria-hidden=\"true\"></i><span>Light</span>"
      : "<i class=\"fa-solid fa-moon\" aria-hidden=\"true\"></i><span>Dark</span>";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  };

  applyThemeToggleState(savedTheme);
  themeToggle.addEventListener("click", () => {
    const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
    document.body.dataset.theme = nextTheme;
    localStorage.setItem(STORAGE_KEYS.theme, nextTheme);
    applyThemeToggleState(nextTheme);
    showNotification(`Switched to ${nextTheme} mode.`, "info");
    document.dispatchEvent(new CustomEvent("themechange", { detail: nextTheme }));
  });
}

function setupNewsletter() {
  const form = document.getElementById("newsletterForm");
  const message = document.getElementById("newsletterMessage");
  const input = document.getElementById("newsletterEmail");

  if (!form || !message || !input) {
    return;
  }

  const existingEmail = localStorage.getItem(STORAGE_KEYS.newsletter);
  if (existingEmail) {
    input.value = existingEmail;
    message.textContent = `Saved locally as ${existingEmail}.`;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    localStorage.setItem(STORAGE_KEYS.newsletter, input.value.trim());
    setInlineMessage(message, "Email saved locally for prototype workflow.", "success");
  });
}

function getListingItems(page) {
  const collections = getContentCollections();
  if (page === "tutorials") {
    return collections.tutorial;
  }
  if (page === "projects") {
    return collections.project;
  }
  if (page === "blog") {
    return collections.blog;
  }
  if (page === "notes") {
    return collections.note;
  }
  if (page === "cheatsheets") {
    return collections.cheatsheet;
  }
  return [];
}

function renderListing(page) {
  const grid = document.getElementById("listingGrid");
  const searchInput = document.getElementById("listingSearch");
  const chips = document.getElementById("listingChips");
  const empty = document.getElementById("listingEmpty");

  if (!grid || !searchInput || !chips || !empty) {
    return;
  }

  const allItems = getListingItems(page);
  const categories = ["All", ...new Set(allItems.map((item) => item.category))];
  let activeCategory = "All";

  chips.innerHTML = categories
    .map((category, index) => `<button class="chip ${index === 0 ? "is-active" : ""}" type="button" data-category="${escapeHtml(category)}">${escapeHtml(category)}</button>`)
    .join("");

  function applyFilters() {
    const query = searchInput.value.trim().toLowerCase();
    const filtered = allItems.filter((item) => {
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      const haystack = `${item.title} ${item.excerpt} ${item.tags.join(" ")} ${item.category}`.toLowerCase();
      return matchesCategory && haystack.includes(query);
    });

    grid.innerHTML = filtered.map(createCard).join("");
    empty.hidden = filtered.length !== 0;
  }

  chips.addEventListener("click", (event) => {
    const chip = event.target.closest(".chip");
    if (!chip) {
      return;
    }

    activeCategory = chip.dataset.category;
    Array.from(chips.querySelectorAll(".chip")).forEach((button) => {
      button.classList.toggle("is-active", button === chip);
    });
    applyFilters();
  });

  searchInput.addEventListener("input", applyFilters);
  applyFilters();
}

function setupEditor() {
  const form = document.getElementById("editorForm");
  const message = document.getElementById("editorMessage");
  const saveDraftButton = document.getElementById("saveDraftButton");
  const clearDraftButton = document.getElementById("clearDraftButton");
  const publishPostButton = document.getElementById("publishPostButton");
  const localPostsGrid = document.getElementById("localPostsGrid");
  const previewTitle = document.getElementById("previewTitle");
  const previewMeta = document.getElementById("previewMeta");
  const previewExcerpt = document.getElementById("previewExcerpt");
  const previewTags = document.getElementById("previewTags");
  const previewContent = document.getElementById("previewContent");
  const previewCode = document.getElementById("previewCode");
  const contentEditor = document.getElementById("postContentEditor");
  const modeBadge = document.getElementById("editorModeBadge");
  const previewWordCount = document.getElementById("previewWordCount");
  const previewParagraphCount = document.getElementById("previewParagraphCount");
  const helper = document.getElementById("editorHelper");
  const toolbarButtons = Array.from(document.querySelectorAll("[data-editor-tool]"));
  const fontSelect = document.getElementById("editorFontSelect");
  const colorInput = document.getElementById("editorColorInput");
  const editorInterviewFields = document.getElementById("editorInterviewFields");
  const companiesInput = document.getElementById("postCompaniesInput");
  const levelInput = document.getElementById("postLevelInput");
  const optionAInput = document.getElementById("postOptionAInput");
  const optionBInput = document.getElementById("postOptionBInput");
  const optionCInput = document.getElementById("postOptionCInput");
  const optionDInput = document.getElementById("postOptionDInput");
  const correctOptionInput = document.getElementById("postCorrectOptionInput");
  const summaryTemplateButton = document.getElementById("insertSummaryTemplate");
  const interviewTemplateButton = document.getElementById("insertInterviewTemplate");
  const snippetTemplateButton = document.getElementById("insertSnippetTemplate");

  if (!form || !message || !saveDraftButton || !clearDraftButton || !publishPostButton || !localPostsGrid) {
    return;
  }

  const fields = {
    type: document.getElementById("postTypeInput"),
    title: document.getElementById("postTitleInput"),
    category: document.getElementById("postCategoryInput"),
    readTime: document.getElementById("postReadTimeInput"),
    tags: document.getElementById("postTagsInput"),
    excerpt: document.getElementById("postExcerptInput"),
    content: document.getElementById("postContentInput"),
    code: document.getElementById("postCodeInput")
  };

  const interviewFields = {
    companies: companiesInput,
    level: levelInput,
    optionA: optionAInput,
    optionB: optionBInput,
    optionC: optionCInput,
    optionD: optionDInput,
    correctOption: correctOptionInput
  };
  let editingContext = null;
  let autosaveTimer = 0;

  function getInterviewOptionsFromEditor() {
    return [
      { key: "A", text: interviewFields.optionA?.value.trim() || "" },
      { key: "B", text: interviewFields.optionB?.value.trim() || "" },
      { key: "C", text: interviewFields.optionC?.value.trim() || "" },
      { key: "D", text: interviewFields.optionD?.value.trim() || "" }
    ].filter((option) => option.text);
  }

  function syncEditorTypeState() {
    const isInterview = fields.type.value === "interview";
    if (editorInterviewFields) {
      editorInterviewFields.hidden = !isInterview;
    }
    Object.values(interviewFields).forEach((field) => {
      if (field) {
        field.disabled = !isInterview;
      }
    });
    if (helper) {
      helper.textContent = isInterview
        ? "Interview mode supports normal answers and real MCQ questions with options plus the correct answer."
        : "Use note mode for revision-style content and blog mode for longer explanation articles.";
    }
  }

  function updateEditorActionState() {
    const typeLabelMap = {
      note: "Note",
      blog: "Blog Post",
      interview: "Interview Question"
    };
    const typeLabel = typeLabelMap[fields.type.value] || "Post";
    publishPostButton.textContent = editingContext ? `Update ${typeLabel}` : `Publish ${typeLabel}`;
    clearDraftButton.textContent = editingContext ? "Cancel Edit" : "Reset Form";
  }

  function resetEditingContext() {
    editingContext = null;
    syncEditorTypeState();
    updateEditorActionState();
  }

  function getEditorHtml() {
    return (contentEditor?.innerHTML || "")
      .replace(/<div><br><\/div>/g, "<p><br></p>")
      .trim();
  }

  function syncEditorField() {
    if (fields.content) {
      fields.content.value = getEditorHtml();
    }
  }

  function setEditorHtml(html) {
    if (!contentEditor) {
      return;
    }

    contentEditor.innerHTML = (html || "").trim();
    syncEditorField();
  }

  function getDraftValue() {
    const html = getEditorHtml();
    const options = getInterviewOptionsFromEditor();
    return {
      type: fields.type.value,
      title: fields.title.value.trim(),
      category: fields.category.value,
      readTime: fields.readTime.value.trim(),
      tags: fields.tags.value.split(",").map((tag) => tag.trim()).filter(Boolean),
      excerpt: fields.excerpt.value.trim(),
      content: html,
      code: fields.code.value.trim(),
      companies: interviewFields.companies?.value.split(",").map((company) => company.trim()).filter(Boolean) || [],
      level: interviewFields.level?.value.trim() || "",
      options,
      correctOption: options.length ? (interviewFields.correctOption?.value || "") : "",
      status: "draft",
      author: "You",
      slug: editingContext?.slug || "",
      editing: editingContext ? { ...editingContext } : null
    };
  }

  function populateForm(draft) {
    fields.type.value = draft.type || "note";
    fields.title.value = draft.title || "";
    fields.category.value = draft.category || "";
    fields.readTime.value = draft.readTime || "";
    fields.tags.value = Array.isArray(draft.tags) ? draft.tags.join(", ") : "";
    fields.excerpt.value = draft.excerpt || "";
    setEditorHtml(draft.content || "");
    fields.code.value = draft.code || "";
    if (interviewFields.companies) {
      interviewFields.companies.value = Array.isArray(draft.companies) ? draft.companies.join(", ") : "";
    }
    if (interviewFields.level) {
      interviewFields.level.value = draft.level || "";
    }
    if (interviewFields.optionA) {
      interviewFields.optionA.value = draft.options?.find((option) => option.key === "A")?.text || "";
    }
    if (interviewFields.optionB) {
      interviewFields.optionB.value = draft.options?.find((option) => option.key === "B")?.text || "";
    }
    if (interviewFields.optionC) {
      interviewFields.optionC.value = draft.options?.find((option) => option.key === "C")?.text || "";
    }
    if (interviewFields.optionD) {
      interviewFields.optionD.value = draft.options?.find((option) => option.key === "D")?.text || "";
    }
    if (interviewFields.correctOption) {
      interviewFields.correctOption.value = draft.correctOption || "";
    }
    if (draft.status) {
      message.dataset.entryStatus = draft.status;
    }
    editingContext = draft.editing || null;
    syncEditorTypeState();
    updateEditorActionState();
    updatePreview();
  }

  function updatePreview() {
    const draft = getDraftValue();
    const typeLabelMap = {
      note: "Note draft",
      blog: "Blog draft",
      interview: "Interview draft"
    };
    const modeBadgeMap = {
      note: "Note mode",
      blog: "Blog mode",
      interview: "Interview mode"
    };
    const typeLabel = typeLabelMap[draft.type] || "Draft";
    const paragraphs = htmlToParagraphArray(draft.content);
    const plainText = extractPlainTextFromHtml(draft.content);
    const wordCount = plainText
      ? plainText.split(/\s+/).map((word) => word.trim()).filter(Boolean).length
      : 0;
    previewTitle.textContent = draft.title || "Untitled post";
    previewMeta.textContent = draft.category && draft.readTime ? `${draft.type} - ${draft.category} - ${draft.readTime}` : typeLabel;
    previewExcerpt.textContent = draft.excerpt || "Your excerpt will appear here.";
    previewTags.innerHTML = draft.tags.length ? draft.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("") : "";
    previewContent.innerHTML = draft.content
      ? `${draft.type === "interview" && draft.options.length ? renderInterviewOptions(draft.options, draft.correctOption) : ""}${formatBody(draft.content)}`
      : "<p>Start typing to preview your article body.</p>";
    previewCode.textContent = draft.code || "Optional code example preview";
    if (modeBadge) {
      modeBadge.textContent = modeBadgeMap[draft.type] || "Draft mode";
    }
    if (previewWordCount) {
      previewWordCount.textContent = String(wordCount);
    }
    if (previewParagraphCount) {
      previewParagraphCount.textContent = String(paragraphs.length);
    }
    if (helper) {
      helper.textContent = draft.type === "note"
        ? "Note mode is ideal for revision bullets, key definitions, and quick recall summaries."
        : draft.type === "interview"
          ? "Interview mode turns the title into the question and the main content into the model answer."
          : "Blog mode works best for longer explanations, walkthroughs, and reflection-based writing.";
    }
  }

  function scheduleAutosave() {
    window.clearTimeout(autosaveTimer);
    autosaveTimer = window.setTimeout(() => {
      saveJson(STORAGE_KEYS.draft, getDraftValue());
      if (message.dataset.state !== "error") {
        message.textContent = "Autosaved locally.";
        message.dataset.state = "info";
      }
    }, 700);
  }

  function createEditorLibraryCard(entry) {
    const title = entry.title || entry.question || "Untitled resource";
    const statusLabel = entry.status || "published";
    const updatedLabel = formatEntryTimestamp(entry.updatedAt || entry.createdAt);
    return `
      <article class="content-card editor-library-card">
        <div class="card-top">
          <span class="card-type">${escapeHtml(entry.type)}</span>
          <span class="card-meta">${escapeHtml(entry.readTime || "Custom")}</span>
        </div>
        <div>
          <h3>${escapeHtml(title)}</h3>
          <p class="card-excerpt">${escapeHtml(entry.excerpt || "No excerpt added yet.")}</p>
        </div>
        <div class="editor-library-meta">
          <span class="status-pill">${escapeHtml(statusLabel)}</span>
          <span class="card-meta">${escapeHtml(updatedLabel ? `Updated ${updatedLabel}` : "Local entry")}</span>
        </div>
        <div class="tag-row">${(entry.tags || []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
        <div class="editor-library-actions">
          <button class="button button-ghost button-small" type="button" data-editor-open="${escapeHtml(entry.slug)}" data-editor-type="${escapeHtml(entry.type)}">Open</button>
          <button class="button button-ghost button-small" type="button" data-editor-edit="${escapeHtml(entry.slug)}" data-editor-type="${escapeHtml(entry.type)}">Edit</button>
          <button class="button button-ghost button-small" type="button" data-editor-delete="${escapeHtml(entry.slug)}" data-editor-type="${escapeHtml(entry.type)}">Delete</button>
        </div>
      </article>
    `;
  }

  function beginEditingEntry(entry) {
    const content = entry.detailHtml || (Array.isArray(entry.detail || entry.answer)
      ? (entry.detail || entry.answer).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")
      : "");
    populateForm({
      type: entry.type,
      title: entry.title || entry.question || "",
      category: entry.category || "",
      readTime: entry.readTime || "",
      tags: Array.isArray(entry.tags) ? entry.tags : [],
      excerpt: entry.excerpt || "",
      content,
      code: entry.code || "",
      companies: Array.isArray(entry.companies) ? entry.companies : [],
      level: entry.level || "",
      options: Array.isArray(entry.options) ? entry.options : [],
      correctOption: entry.correctOption || "",
      status: entry.status || "published",
      author: entry.author || "You",
      slug: entry.slug || "",
      editing: { slug: entry.slug, type: entry.type }
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
    setInlineMessage(message, "Loaded the post into editor mode.", "info");
  }

  function appendTemplate(text) {
    if (!contentEditor) {
      return;
    }

    const html = `<p>${escapeHtml(text).replace(/\n/g, "<br>")}</p>`;
    if (!getEditorHtml()) {
      setEditorHtml(html);
    } else {
      contentEditor.insertAdjacentHTML("beforeend", html);
      syncEditorField();
    }
    updatePreview();
    contentEditor.focus();
  }

  function insertHtmlAtCursor(html) {
    if (!contentEditor) {
      return;
    }

    contentEditor.focus();
    document.execCommand("insertHTML", false, html);
    syncEditorField();
    updatePreview();
  }

  function applyEditorTool(tool) {
    if (!contentEditor) {
      return;
    }

    contentEditor.focus();

    switch (tool) {
      case "bold":
        document.execCommand("bold");
        break;
      case "italic":
        document.execCommand("italic");
        break;
      case "h2":
        document.execCommand("formatBlock", false, "h2");
        break;
      case "quote":
        document.execCommand("formatBlock", false, "blockquote");
        break;
      case "ul":
        document.execCommand("insertUnorderedList");
        break;
      case "ol":
        document.execCommand("insertOrderedList");
        break;
      case "link":
        {
          const url = window.prompt("Enter the link URL", "https://example.com");
          if (url) {
            document.execCommand("createLink", false, url);
          }
        }
        break;
      case "image":
        {
          const url = window.prompt("Paste the image URL", "https://images.example.com/photo.jpg");
          const alt = window.prompt("Add a short caption", "Article image");
          if (url) {
            insertHtmlAtCursor(`<figure class="article-image"><img src="${url}" alt="${escapeHtml(alt || "Article image")}">${alt ? `<figcaption>${escapeHtml(alt)}</figcaption>` : ""}</figure>`);
          }
        }
        break;
      case "accent":
        insertHtmlAtCursor("<span class=\"rich-accent\">Accent text</span>");
        break;
      case "highlight":
        insertHtmlAtCursor("<span class=\"rich-highlight\">Highlighted text</span>");
        break;
      case "serif":
        insertHtmlAtCursor("<span class=\"rich-serif\">Editorial text</span>");
        break;
      case "mono":
        insertHtmlAtCursor("<span class=\"rich-mono\">Command or code</span>");
        break;
      default:
        break;
    }

    syncEditorField();
    updatePreview();
  }

  function renderLocalPosts() {
    const localEntries = dataStore.listEntries()
      .slice()
      .sort((a, b) => (b.updatedAt || b.createdAt || 0) - (a.updatedAt || a.createdAt || 0));
    const providerMeta = dataStore.getProviderMeta();
    localPostsGrid.innerHTML = localEntries.length
      ? localEntries.map(createEditorLibraryCard).join("")
      : `<p class="empty-state">No local notes or posts published yet. Use the editor above to publish your first resource. Current provider mode: ${escapeHtml(providerMeta.provider)}.</p>`;
  }

  const savedDraft = loadJson(STORAGE_KEYS.draft, null);
  if (savedDraft) {
    populateForm(savedDraft);
    setInlineMessage(message, "Recovered your last saved draft.", "info");
  } else {
    updatePreview();
  }

  form.addEventListener("input", () => {
    updatePreview();
    scheduleAutosave();
  });
  fields.type.addEventListener("change", () => {
    syncEditorTypeState();
    updateEditorActionState();
    updatePreview();
  });

  if (contentEditor) {
    contentEditor.addEventListener("input", () => {
      syncEditorField();
      updatePreview();
      scheduleAutosave();
    });
  }

  saveDraftButton.addEventListener("click", () => {
    saveJson(STORAGE_KEYS.draft, getDraftValue());
    setInlineMessage(message, "Draft saved locally.", "success");
  });

  if (summaryTemplateButton) {
    summaryTemplateButton.addEventListener("click", () => {
      appendTemplate("Definition:\nWrite the concept in 2-3 lines.\n\nKey points:\n- Point one\n- Point two\n- Point three");
    });
  }

  if (interviewTemplateButton) {
    interviewTemplateButton.addEventListener("click", () => {
      appendTemplate("Interview answer:\nExplain the concept simply.\n\nWhen to use it:\nAdd one practical scenario.\n\nCommon mistake:\nMention one thing to avoid.");
    });
  }

  if (snippetTemplateButton) {
    snippetTemplateButton.addEventListener("click", () => {
      appendTemplate("Problem:\nWhat does this code solve?\n\nApproach:\nWhy this implementation?\n\nEdge cases:\nWhat should be tested?");
    });
  }

  toolbarButtons.forEach((button) => {
    button.addEventListener("click", () => {
      applyEditorTool(button.dataset.editorTool || "");
    });
  });

  if (fontSelect) {
    fontSelect.addEventListener("change", () => {
      if (fontSelect.value && contentEditor) {
        contentEditor.focus();
        document.execCommand("fontName", false, fontSelect.value);
        syncEditorField();
        updatePreview();
      }
    });
  }

  if (colorInput) {
    colorInput.addEventListener("input", () => {
      if (contentEditor) {
        contentEditor.focus();
        document.execCommand("foreColor", false, colorInput.value);
        syncEditorField();
        updatePreview();
      }
    });
  }

  clearDraftButton.addEventListener("click", () => {
    const wasEditing = Boolean(editingContext);
    form.reset();
    localStorage.removeItem(STORAGE_KEYS.draft);
    setEditorHtml("");
    resetEditingContext();
    updatePreview();
    setInlineMessage(message, wasEditing ? "Edit mode cancelled." : "Draft cleared.", "info");
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const draft = getDraftValue();
    if (draft.type === "interview" && draft.options.length && !draft.correctOption) {
      setInlineMessage(message, "Select the correct option before publishing the MCQ question.", "error");
      return;
    }
    const post = {
      type: draft.type,
      slug: slugify(draft.title || editingContext?.slug || `post-${Date.now()}`),
      title: draft.title,
      excerpt: draft.excerpt,
      category: draft.category,
      readTime: draft.readTime,
      tags: draft.tags,
      detail: htmlToParagraphArray(draft.content),
      detailHtml: draft.content,
      code: draft.code,
      author: draft.author || "You",
      status: "published",
      createdAt: editingContext ? dataStore.listEntries().find((entry) => entry.slug === editingContext.slug && entry.type === editingContext.type)?.createdAt || Date.now() : Date.now(),
      updatedAt: Date.now(),
      level: draft.type === "note" ? "Custom note" : undefined
    };

    if (draft.type === "interview") {
      post.question = draft.title;
      post.answer = post.detail;
      post.level = draft.level || "Custom interview";
      post.companies = draft.companies.length ? draft.companies : ["Custom"];
      post.options = draft.options;
      post.correctOption = draft.options.length ? draft.correctOption : "";
    }

    if (editingContext) {
      dataStore.updateEntry(editingContext.slug, editingContext.type, post);
    } else {
      dataStore.createEntry(post);
    }
    editingContext = { slug: post.slug, type: post.type };
    saveJson(STORAGE_KEYS.draft, { ...draft, slug: post.slug, status: "published", editing: editingContext });
    renderLocalPosts();
    setInlineMessage(message, editingContext
      ? "Local resource updated successfully."
      : draft.type === "note"
        ? "Note published into the local notes workflow."
        : draft.type === "interview"
          ? "Interview question published into the interview workflow."
          : "Post published into the local blog workflow.", "success");
  });

  localPostsGrid.addEventListener("click", (event) => {
    const openButton = event.target.closest("[data-editor-open]");
    const editButton = event.target.closest("[data-editor-edit]");
    const deleteButton = event.target.closest("[data-editor-delete]");

    if (openButton) {
      const item = dataStore.listEntries().find((entry) => entry.slug === openButton.dataset.editorOpen && entry.type === openButton.dataset.editorType);
      if (item) {
        window.location.href = getContentHref(item);
      }
      return;
    }

    if (editButton) {
      const item = dataStore.listEntries().find((entry) => entry.slug === editButton.dataset.editorEdit && entry.type === editButton.dataset.editorType);
      if (item) {
        beginEditingEntry(item);
      }
      return;
    }

    if (deleteButton) {
      const slug = deleteButton.dataset.editorDelete;
      const type = deleteButton.dataset.editorType;
      dataStore.deleteEntry(slug, type);
      if (editingContext && editingContext.slug === slug && editingContext.type === type) {
        form.reset();
        localStorage.removeItem(STORAGE_KEYS.draft);
        setEditorHtml("");
        resetEditingContext();
        updatePreview();
      }
      renderLocalPosts();
      setInlineMessage(message, "Local resource deleted.", "success");
    }
  });

  syncEditorTypeState();
  updateEditorActionState();
  renderLocalPosts();
}

function setupDetailPage() {
  const params = new URLSearchParams(window.location.search);
  const type = params.get("type");
  const slug = params.get("slug");
  const item = type && slug ? findContent(type, slug) : null;

  const title = document.getElementById("detailTitle");
  const excerpt = document.getElementById("detailExcerpt");
  const typeLabel = document.getElementById("detailType");
  const metaRow = document.getElementById("detailMetaRow");
  const tags = document.getElementById("detailTags");
  const body = document.getElementById("detailBody");
  const code = document.getElementById("detailCode");
  const backLink = document.getElementById("detailBackLink");
  const relatedList = document.getElementById("relatedList");
  const bookmarkButton = document.getElementById("bookmarkButton");
  const detailActionButton = document.getElementById("detailActionButton");
  const detailSecondaryButton = document.getElementById("detailSecondaryButton");
  const detailMessage = document.getElementById("detailMessage");

  if (!title || !excerpt || !typeLabel || !metaRow || !tags || !body || !code || !backLink || !relatedList || !bookmarkButton) {
    return;
  }

  if (!item) {
    title.textContent = "Content not found";
    excerpt.textContent = "The requested item does not exist in the current dataset.";
    body.innerHTML = "<p>Try opening the tutorials, projects, blog, notes, or cheat sheets listing and select a valid entry.</p>";
    bookmarkButton.hidden = true;
    if (detailActionButton) {
      detailActionButton.hidden = true;
    }
    if (detailSecondaryButton) {
      detailSecondaryButton.hidden = true;
    }
    return;
  }

  document.title = `TechAmitCode | ${item.title}`;
  updateMetaContent("meta[name='description']", item.excerpt);
  updateMetaContent("meta[property='og:title']", `TechAmitCode | ${item.title}`);
  updateMetaContent("meta[property='og:description']", item.excerpt);
  typeLabel.textContent = item.type;
  title.textContent = item.title;
  excerpt.textContent = item.excerpt;
  metaRow.innerHTML = [
    item.category,
    item.readTime,
    getItemMeta(item),
    item.status ? `Status: ${item.status}` : "",
    item.updatedAt ? `Updated: ${formatEntryTimestamp(item.updatedAt)}` : ""
  ].filter(Boolean).map((value) => `<span>${escapeHtml(value)}</span>`).join("");
  tags.innerHTML = item.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
  body.innerHTML = item.detailHtml ? formatBody(item.detailHtml) : formatBody(item.detail);
  recordRecentView(item);
  markProgress("viewed", `${item.type}:${item.slug}`);

  if (item.code) {
    code.hidden = false;
    code.textContent = item.code;
  }

  backLink.href = item.type === "blog" ? "blog.html" : `${item.type}s.html`;

  const relatedPool = getContentCollections()[item.type] || [];
  relatedList.innerHTML = relatedPool
    .filter((entry) => entry.slug !== item.slug)
    .slice(0, 3)
    .map(createResourceLink)
    .join("");

  setupBookmark(item, bookmarkButton);
  setupComments(item.slug);

  if (detailSecondaryButton) {
    detailSecondaryButton.hidden = !(item.type === "note" || item.type === "cheatsheet");
    if (!detailSecondaryButton.hidden) {
      detailSecondaryButton.addEventListener("click", () => {
        window.print();
      });
    }
  }

  if (!detailActionButton) {
    return;
  }

  detailActionButton.hidden = false;
  detailActionButton.textContent = "Mark Studied";

  if (item.type === "note" || item.type === "tutorial") {
    detailActionButton.textContent = "Mark Revised";
    detailActionButton.addEventListener("click", () => {
      markProgress("revised", `${item.type}:${item.slug}`);
      if (detailMessage) {
        setInlineMessage(detailMessage, "Saved to your revision progress.", "success");
      }
    });
    return;
  }

  if (item.type === "cheatsheet" && item.code) {
    detailActionButton.textContent = "Copy Snippet";
    detailActionButton.addEventListener("click", async () => {
      try {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(item.code);
        }
        markProgress("copied", `${item.type}:${item.slug}`);
        if (detailMessage) {
          setInlineMessage(detailMessage, "Snippet copied to clipboard.", "success");
        }
      } catch (error) {
        if (detailMessage) {
          setInlineMessage(detailMessage, "Copy failed in this browser.", "error");
        }
      }
    });
    return;
  }

  detailActionButton.addEventListener("click", () => {
    markProgress("revised", `${item.type}:${item.slug}`);
    if (detailMessage) {
      setInlineMessage(detailMessage, "Saved to your study progress.", "success");
    }
  });
}

function setupBookmark(item, button) {
  const bookmarks = new Set(getBookmarks());
  const key = `${item.type}:${item.slug}`;

  function render() {
    const saved = bookmarks.has(key);
    button.textContent = saved ? "Saved" : "Save";
    button.classList.toggle("is-saved", saved);
  }

  button.addEventListener("click", () => {
    if (bookmarks.has(key)) {
      bookmarks.delete(key);
    } else {
      bookmarks.add(key);
    }
    saveJson(STORAGE_KEYS.bookmarks, Array.from(bookmarks));
    render();
    showNotification(bookmarks.has(key) ? "Saved to bookmarks." : "Removed from bookmarks.", bookmarks.has(key) ? "success" : "info");
  });

  render();
}

function setupComments(slug) {
  const form = document.getElementById("commentForm");
  const list = document.getElementById("commentList");
  const message = document.getElementById("commentMessage");
  const nameInput = document.getElementById("commentName");
  const textInput = document.getElementById("commentText");

  if (!form || !list || !message || !nameInput || !textInput) {
    return;
  }

  function render() {
    const comments = getComments()[slug] || [];
    list.innerHTML = comments.length
      ? comments.map((comment) => `
          <article class="comment-item">
            <strong>${escapeHtml(comment.name)}</strong>
            <p>${escapeHtml(comment.text)}</p>
          </article>
        `).join("")
      : "<p class=\"empty-state\">No comments yet. Start the discussion.</p>";
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = nameInput.value.trim();
    const text = textInput.value.trim();

    if (!name || !text) {
      setInlineMessage(message, "Name and comment are required.", "error");
      return;
    }

    if (name.length > 60 || text.length > 500) {
      setInlineMessage(message, "Keep names under 60 characters and comments under 500 characters.", "error");
      return;
    }

    const allComments = getComments();
    const comments = allComments[slug] || [];
    comments.unshift({ name, text });
    allComments[slug] = comments;
    const saved = saveJson(STORAGE_KEYS.comments, allComments);
    if (!saved) {
      setInlineMessage(message, "Unable to save the comment on this device right now.", "error");
      return;
    }
    form.reset();
    setInlineMessage(message, "Comment stored locally.", "success");
    render();
  });

  render();
}

function createQuestionCard(item, isRevised) {
  return `
    <article class="question-card" data-question-card="${escapeHtml(item.slug)}">
      <div class="question-head">
        <div>
          <span class="card-type">${escapeHtml(item.category)}</span>
          <h3>${escapeHtml(item.question)}</h3>
          <p class="card-excerpt">${escapeHtml(item.excerpt)}</p>
        </div>
        <div class="question-actions">
          <button class="button button-ghost button-small" type="button" data-question-toggle="${escapeHtml(item.slug)}">Show Answer</button>
          <button class="button button-ghost button-small ${isRevised ? "is-success" : ""}" type="button" data-question-revise="${escapeHtml(item.slug)}">${isRevised ? "Revised" : "Mark Revised"}</button>
        </div>
      </div>
      <div class="tag-row">${item.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
      ${renderInteractiveInterviewOptions(item)}
      <div class="question-answer" id="answer-${escapeHtml(item.slug)}" hidden>
        ${item.options?.length ? `
          <p class="eyebrow">Options</p>
          ${renderInterviewOptions(item.options, item.correctOption)}
          ${item.correctOption ? `<p><strong>Correct answer:</strong> Option ${escapeHtml(item.correctOption)}</p>` : ""}
        ` : ""}
        ${item.answer.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
        ${item.code ? `<pre class="code-block">${escapeHtml(item.code)}</pre>` : ""}
      </div>
    </article>
  `;
}

function getDailyInterviewQuestion() {
  const dayOfMonth = new Date().getDate();
  const questions = getInterviewQuestions();
  return questions[dayOfMonth % questions.length];
}

function setupInterviewPage() {
  const list = document.getElementById("interviewList");
  const chips = document.getElementById("interviewChips");
  const companyChips = document.getElementById("companyChips");
  const search = document.getElementById("interviewSearch");
  const empty = document.getElementById("interviewEmpty");
  const dailyTarget = document.getElementById("dailyQuestionCard");
  const startMockTest = document.getElementById("startMockTest");
  const mockPanel = document.getElementById("mockTestPanel");
  const mockQuestionCard = document.getElementById("mockQuestionCard");
  const mockProgressLabel = document.getElementById("mockProgressLabel");
  const mockScoreLabel = document.getElementById("mockScoreLabel");
  const mockRevealAnswer = document.getElementById("mockRevealAnswer");
  const mockWrongButton = document.getElementById("mockWrongButton");
  const mockCorrectButton = document.getElementById("mockCorrectButton");
  const mockFeedback = document.getElementById("mockFeedback");
  const flashcardCard = document.getElementById("flashcardCard");
  const flipFlashcard = document.getElementById("flipFlashcard");
  const nextFlashcard = document.getElementById("nextFlashcard");
  const shuffleFlashcards = document.getElementById("shuffleFlashcards");

  if (!list || !chips || !search || !empty || !companyChips || !flashcardCard || !flipFlashcard || !nextFlashcard || !shuffleFlashcards) {
    return;
  }

  const revisedMap = getProgress().revised || {};
  const questionPool = getInterviewQuestions();
  const focusSlug = new URLSearchParams(window.location.search).get("focus") || "";
  const categories = ["All", ...new Set(questionPool.map((item) => item.category))];
  const companies = ["All", ...new Set(questionPool.flatMap((item) => item.companies || []))];
  let activeCategory = "All";
  let activeCompany = "All";
  let flashcards = [...questionPool];
  let flashIndex = 0;
  let flashAnswerVisible = false;

  chips.innerHTML = categories
    .map((category, index) => `<button class="chip ${index === 0 ? "is-active" : ""}" type="button" data-category="${escapeHtml(category)}">${escapeHtml(category)}</button>`)
    .join("");
  companyChips.innerHTML = companies
    .map((company, index) => `<button class="chip ${index === 0 ? "is-active" : ""}" type="button" data-company="${escapeHtml(company)}">${escapeHtml(company)}</button>`)
    .join("");

  if (dailyTarget) {
    const daily = getDailyInterviewQuestion();
    dailyTarget.innerHTML = `
      <p class="eyebrow">Daily question</p>
      <h2>${escapeHtml(daily.question)}</h2>
      <p>${escapeHtml(daily.excerpt)}</p>
      ${daily.options?.length ? renderInterviewOptions(daily.options) : ""}
      <div class="tag-row">${daily.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
    `;
  }

  function applyFilters() {
    const query = search.value.trim().toLowerCase();
    const filtered = questionPool.filter((item) => {
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      const matchesCompany = activeCompany === "All" || (item.companies || []).includes(activeCompany);
      const haystack = `${item.question} ${item.excerpt} ${item.tags.join(" ")} ${item.category} ${item.level} ${(item.companies || []).join(" ")}`.toLowerCase();
      return matchesCategory && matchesCompany && haystack.includes(query);
    });

    list.innerHTML = filtered.map((item) => createQuestionCard(item, Boolean(revisedMap[`interview:${item.slug}`]))).join("");
    empty.hidden = filtered.length !== 0;
  }

  chips.addEventListener("click", (event) => {
    const chip = event.target.closest(".chip");
    if (!chip) {
      return;
    }

    activeCategory = chip.dataset.category;
    Array.from(chips.querySelectorAll(".chip")).forEach((button) => {
      button.classList.toggle("is-active", button === chip);
    });
    applyFilters();
  });

  companyChips.addEventListener("click", (event) => {
    const chip = event.target.closest("[data-company]");
    if (!chip) {
      return;
    }

    activeCompany = chip.dataset.company;
    Array.from(companyChips.querySelectorAll(".chip")).forEach((button) => {
      button.classList.toggle("is-active", button === chip);
    });
    applyFilters();
  });

  list.addEventListener("click", (event) => {
    const toggleButton = event.target.closest("[data-question-toggle]");
    const reviseButton = event.target.closest("[data-question-revise]");
    const optionButton = event.target.closest("[data-question-option]");

    if (toggleButton) {
      const slug = toggleButton.dataset.questionToggle;
      const answer = document.getElementById(`answer-${slug}`);
      const willOpen = answer.hidden;
      answer.hidden = !willOpen;
      toggleButton.textContent = willOpen ? "Hide Answer" : "Show Answer";
      return;
    }

    if (optionButton) {
      const slug = optionButton.dataset.questionOption;
      const selectedKey = optionButton.dataset.optionKey;
      const item = questionPool.find((question) => question.slug === slug);
      const answer = document.getElementById(`answer-${slug}`);
      const feedback = document.getElementById(`mcq-feedback-${slug}`);
      const optionGroup = list.querySelector(`[data-question-options="${slug}"]`);

      if (!item || !optionGroup) {
        return;
      }

      optionGroup.querySelectorAll(".mcq-option-button").forEach((button) => {
        button.classList.remove("is-selected", "is-correct", "is-wrong");
      });

      const selectedButton = optionGroup.querySelector(`[data-option-key="${selectedKey}"]`);
      const correctButton = optionGroup.querySelector(`[data-option-key="${item.correctOption}"]`);
      const isCorrect = selectedKey === item.correctOption;

      if (selectedButton) {
        selectedButton.classList.add("is-selected", isCorrect ? "is-correct" : "is-wrong");
      }
      if (!isCorrect && correctButton) {
        correctButton.classList.add("is-correct");
      }

      if (feedback) {
        feedback.hidden = false;
        feedback.textContent = isCorrect ? `Correct. Option ${item.correctOption} is right.` : `Not quite. Correct answer is option ${item.correctOption}.`;
        feedback.dataset.state = isCorrect ? "success" : "error";
      }

      if (answer) {
        answer.hidden = false;
      }
      return;
    }

    if (reviseButton) {
      const slug = reviseButton.dataset.questionRevise;
      revisedMap[`interview:${slug}`] = Date.now();
      saveProgress({ ...getProgress(), revised: revisedMap });
      reviseButton.textContent = "Revised";
      reviseButton.classList.add("is-success");
    }
  });

  search.addEventListener("input", applyFilters);
  applyFilters();

  if (focusSlug) {
    const focusedItem = questionPool.find((item) => item.slug === focusSlug);
    if (focusedItem) {
      search.value = focusedItem.question;
      activeCategory = "All";
      activeCompany = "All";
      Array.from(chips.querySelectorAll(".chip")).forEach((button) => {
        button.classList.toggle("is-active", button.dataset.category === "All");
      });
      Array.from(companyChips.querySelectorAll(".chip")).forEach((button) => {
        button.classList.toggle("is-active", button.dataset.company === "All");
      });
      applyFilters();
      window.requestAnimationFrame(() => {
        const targetCard = list.querySelector(`[data-question-card="${focusSlug}"]`);
        if (!targetCard) {
          return;
        }
        targetCard.classList.add("is-focused");
        targetCard.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }
  }

  function renderFlashcard() {
    const current = flashcards[flashIndex];
    if (!current) {
      flashcardCard.innerHTML = "<h3>No flashcards available</h3><p>Add or load interview questions to build the deck.</p>";
      return;
    }

    flashcardCard.innerHTML = flashAnswerVisible
      ? `
        <p class="eyebrow">Answer</p>
        <h3>${escapeHtml(current.question)}</h3>
        ${current.answer.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
      `
      : `
        <p class="eyebrow">Question</p>
        <h3>${escapeHtml(current.question)}</h3>
        <p>${escapeHtml(current.excerpt)}</p>
        <div class="tag-row">${(current.companies || []).map((company) => `<span>${escapeHtml(company)}</span>`).join("")}</div>
      `;
  }

  flipFlashcard.addEventListener("click", () => {
    flashAnswerVisible = !flashAnswerVisible;
    renderFlashcard();
  });

  nextFlashcard.addEventListener("click", () => {
    flashIndex = (flashIndex + 1) % flashcards.length;
    flashAnswerVisible = false;
    renderFlashcard();
  });

  shuffleFlashcards.addEventListener("click", () => {
    flashcards = shuffleArray(questionPool);
    flashIndex = 0;
    flashAnswerVisible = false;
    renderFlashcard();
  });

  renderFlashcard();

  if (!startMockTest || !mockPanel || !mockQuestionCard || !mockProgressLabel || !mockScoreLabel || !mockRevealAnswer || !mockWrongButton || !mockCorrectButton || !mockFeedback) {
    return;
  }

  let mockQueue = [];
  let mockIndex = 0;
  let mockScore = 0;
  let mockAnswerVisible = false;

  function renderMockQuestion() {
    const current = mockQueue[mockIndex];
    if (!current) {
      mockQuestionCard.innerHTML = `
        <h3>Mock test complete</h3>
        <p>You finished all questions. Review the ones you missed and mark them revised after reading the answer again.</p>
      `;
      mockProgressLabel.textContent = "Completed";
      mockScoreLabel.textContent = `Score ${mockScore}/${mockQueue.length}`;
      mockRevealAnswer.disabled = true;
      mockWrongButton.disabled = true;
      mockCorrectButton.disabled = true;
      mockFeedback.textContent = "Start the mock test again whenever you want a fresh quick round.";
      return;
    }

    mockQuestionCard.innerHTML = `
      <span class="card-type">${escapeHtml(current.category)}</span>
      <h3>${escapeHtml(current.question)}</h3>
      <p>${escapeHtml(current.excerpt)}</p>
      ${current.options?.length ? `
        <div class="mcq-options is-interactive" data-mock-options="${escapeHtml(current.slug)}">
          ${current.options.map((option) => `
            <button class="mcq-option-button" type="button" data-mock-option="${escapeHtml(option.key)}">
              <span class="mcq-option-key">${escapeHtml(option.key)}</span>
              <span>${escapeHtml(option.text)}</span>
            </button>
          `).join("")}
        </div>
      ` : ""}
      <div class="mock-answer" ${mockAnswerVisible ? "" : "hidden"}>
        ${current.correctOption ? `<p><strong>Correct answer:</strong> Option ${escapeHtml(current.correctOption)}</p>` : ""}
        ${current.answer.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
      </div>
    `;
    mockProgressLabel.textContent = `Question ${mockIndex + 1} of ${mockQueue.length}`;
    mockScoreLabel.textContent = `Score ${mockScore}/${mockIndex}`;
    mockFeedback.textContent = mockAnswerVisible ? "Answer revealed. Score yourself honestly." : "Try answering first, then reveal the explanation.";
    mockRevealAnswer.disabled = false;
    mockWrongButton.disabled = false;
    mockCorrectButton.disabled = false;
  }

  function advanceMock(correct) {
    const current = mockQueue[mockIndex];
    if (current && correct) {
      mockScore += 1;
      markProgress("revised", `interview:${current.slug}`);
    }
    mockIndex += 1;
    mockAnswerVisible = false;
    renderMockQuestion();
  }

  startMockTest.addEventListener("click", () => {
    mockQueue = shuffleArray(questionPool)
      .slice(0, Math.min(5, questionPool.length));
    mockIndex = 0;
    mockScore = 0;
    mockAnswerVisible = false;
    mockPanel.hidden = false;
    renderMockQuestion();
  });

  mockRevealAnswer.addEventListener("click", () => {
    mockAnswerVisible = true;
    renderMockQuestion();
  });

  mockQuestionCard.addEventListener("click", (event) => {
    const optionButton = event.target.closest("[data-mock-option]");
    if (!optionButton) {
      return;
    }

    const current = mockQueue[mockIndex];
    if (!current) {
      return;
    }

    const selectedKey = optionButton.dataset.mockOption;
    const isCorrect = selectedKey === current.correctOption;
    mockAnswerVisible = true;
    renderMockQuestion();
    const renderedOption = mockQuestionCard.querySelector(`[data-mock-option="${selectedKey}"]`);
    const correctOption = mockQuestionCard.querySelector(`[data-mock-option="${current.correctOption}"]`);
    if (renderedOption) {
      renderedOption.classList.add("is-selected", isCorrect ? "is-correct" : "is-wrong");
    }
    if (!isCorrect && correctOption) {
      correctOption.classList.add("is-correct");
    }
    mockFeedback.textContent = isCorrect
      ? "Correct choice. Now mark it as solved and move ahead."
      : `Wrong choice. Review the explanation for option ${current.correctOption}.`;
    mockFeedback.dataset.state = isCorrect ? "success" : "error";
  });

  mockWrongButton.addEventListener("click", () => {
    advanceMock(false);
  });

  mockCorrectButton.addEventListener("click", () => {
    advanceMock(true);
  });
}

function setupDashboard() {
  const stats = document.getElementById("dashboardStats");
  const bookmarksTarget = document.getElementById("dashboardBookmarks");
  const recentTarget = document.getElementById("dashboardRecent");
  const revisionTarget = document.getElementById("dashboardRevisions");
  const questionTarget = document.getElementById("dashboardQuestion");
  const progressBars = document.getElementById("dashboardProgressBars");
  const streakTarget = document.getElementById("dashboardStreaks");
  const rewardsTarget = document.getElementById("dashboardRewards");
  const leaderboardTarget = document.getElementById("dashboardLeaderboard");
  const profileForm = document.getElementById("profileForm");
  const profileNameInput = document.getElementById("profileNameInput");
  const profileGoalInput = document.getElementById("profileGoalInput");
  const profileMessage = document.getElementById("profileMessage");
  const plannerGrid = document.getElementById("plannerGrid");
  const providerForm = document.getElementById("dashboardProviderForm");
  const providerSelect = document.getElementById("dashboardProviderSelect");
  const providerUrl = document.getElementById("dashboardProviderUrl");
  const providerKey = document.getElementById("dashboardProviderKey");
  const providerMessage = document.getElementById("dashboardProviderMessage");

  if (!stats || !bookmarksTarget || !recentTarget || !revisionTarget || !questionTarget || !progressBars || !streakTarget || !rewardsTarget || !leaderboardTarget || !profileForm || !profileNameInput || !profileGoalInput || !profileMessage || !plannerGrid || !providerForm || !providerSelect || !providerUrl || !providerKey || !providerMessage) {
    return;
  }

  const progress = getProgress();
  const profile = getProfile();
  const auth = getAuth();
  const planner = getPlanner();
  const contentCollections = getContentCollections();
  const bookmarks = getBookmarks().map(findByBookmarkKey).filter(Boolean);
  const recent = getRecentItems();
  const allInterviewQuestions = getInterviewQuestions();
  const revisedEntries = Object.entries(progress.revised || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([key]) => findByBookmarkKey(key) || allInterviewQuestions.find((item) => `interview:${item.slug}` === key))
    .filter(Boolean);

  const statItems = [
    { label: "Resources", value: String(getAllContent().length + allInterviewQuestions.length) },
    { label: "Bookmarks", value: String(bookmarks.length) },
    { label: "Revised", value: String(Object.keys(progress.revised || {}).length) },
    { label: "Copied", value: String(Object.keys(progress.copied || {}).length) }
  ];

  stats.innerHTML = statItems.map((item) => `
    <article class="metric-card">
      <strong>${escapeHtml(item.value)}</strong>
      <span>${escapeHtml(item.label)}</span>
    </article>
  `).join("");

  const resourceGroups = [
    { label: "Notes revised", total: contentCollections.note.length, done: Object.keys(progress.revised || {}).filter((key) => key.startsWith("note:")).length },
    { label: "Interview revised", total: allInterviewQuestions.length, done: Object.keys(progress.revised || {}).filter((key) => key.startsWith("interview:")).length },
    { label: "Cheat sheets copied", total: contentCollections.cheatsheet.length, done: Object.keys(progress.copied || {}).filter((key) => key.startsWith("cheatsheet:")).length },
    { label: "Viewed resources", total: getAllContent().length, done: Object.keys(progress.viewed || {}).length }
  ];

  progressBars.innerHTML = resourceGroups.map((item) => {
    const total = Math.max(item.total, 1);
    const percent = Math.min(100, Math.round((item.done / total) * 100));
    return `
      <article class="progress-item">
        <div class="progress-meta">
          <strong>${escapeHtml(item.label)}</strong>
          <span>${item.done}/${item.total}</span>
        </div>
        <div class="progress-track">
          <span style="width: ${percent}%"></span>
        </div>
      </article>
    `;
  }).join("");

  profileNameInput.value = profile.name || auth.name || "";
  profileGoalInput.value = profile.goal || "";

  profileForm.addEventListener("submit", (event) => {
    event.preventDefault();
    saveJson(STORAGE_KEYS.profile, {
      name: profileNameInput.value.trim(),
      goal: profileGoalInput.value.trim()
    });
    setInlineMessage(profileMessage, "Profile saved locally.", "success");
  });

  bindProviderConfigForm({
    form: providerForm,
    select: providerSelect,
    urlInput: providerUrl,
    keyInput: providerKey,
    messageTarget: providerMessage,
    localMessage: "Local demo provider active.",
    remoteMessage: "Scaffold saved. Add real backend credentials and SDK wiring when ready."
  });

  const progressTimestamps = [
    ...Object.values(progress.viewed || {}),
    ...Object.values(progress.revised || {}),
    ...Object.values(progress.copied || {})
  ].sort((a, b) => b - a);
  const uniqueDays = Array.from(new Set(progressTimestamps.map((value) => new Date(value).toDateString())));
  const latest = progressTimestamps[0] ? new Date(progressTimestamps[0]) : null;
  const today = new Date();
  const oneDayMs = 24 * 60 * 60 * 1000;
  const streakActive = latest && Math.floor((today - latest) / oneDayMs) <= 1;
  const streakDays = streakActive ? Math.max(1, Math.min(uniqueDays.length, 7)) : 0;

  streakTarget.innerHTML = `
    <p class="eyebrow">Momentum</p>
    <h2>${escapeHtml(profile.name || auth.name || "Your learning streak")}</h2>
    <div class="streak-grid">
      <article class="metric-card">
        <strong>${streakDays}</strong>
        <span>Active days streak</span>
      </article>
      <article class="metric-card">
        <strong>${uniqueDays.length}</strong>
        <span>Total active days</span>
      </article>
    </div>
    <p class="card-excerpt">${escapeHtml(profile.goal || auth.email || "Add your focus role to make this dashboard feel personal.")}</p>
  `;

  const rewardPoints = Object.keys(progress.revised || {}).length * 10
    + Object.keys(progress.copied || {}).length * 5
    + Object.keys(progress.viewed || {}).length * 2;
  const badges = [
    rewardPoints >= 30 ? "Consistent learner" : null,
    Object.keys(progress.revised || {}).length >= 5 ? "Revision streak" : null,
    Object.keys(progress.copied || {}).length >= 2 ? "Snippet collector" : null
  ].filter(Boolean);

  rewardsTarget.innerHTML = `
    <p class="eyebrow">Rewards</p>
    <h2>Points and badges</h2>
    <div class="streak-grid">
      <article class="metric-card">
        <strong>${rewardPoints}</strong>
        <span>Total points</span>
      </article>
      <article class="metric-card">
        <strong>${badges.length}</strong>
        <span>Unlocked badges</span>
      </article>
    </div>
    <div class="tag-row">${(badges.length ? badges : ["Keep studying to unlock badges"]).map((badge) => `<span>${escapeHtml(badge)}</span>`).join("")}</div>
  `;

  const currentName = profile.name || auth.name || "You";
  const leaderboard = [
    { name: "Asha", points: Math.max(80, rewardPoints + 20) },
    { name: currentName, points: rewardPoints },
    { name: "Ravi", points: Math.max(45, rewardPoints - 10) },
    { name: "Neha", points: Math.max(30, rewardPoints - 20) }
  ].sort((a, b) => b.points - a.points);

  leaderboardTarget.innerHTML = `
    <p class="eyebrow">Leaderboard</p>
    <h2>Weekly momentum table</h2>
    <div class="resource-list">
      ${leaderboard.map((entry, index) => `
        <article class="resource-link is-static">
          <strong>#${index + 1} ${escapeHtml(entry.name)}</strong>
          <span>${entry.points} pts</span>
        </article>
      `).join("")}
    </div>
  `;

  const plannerDays = Array.from({ length: 14 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index);
    return date;
  });

  plannerGrid.innerHTML = plannerDays.map((date) => {
    const key = getLocalDateKey(date);
    const active = Boolean(planner[key]);
    return `
      <button class="planner-day ${active ? "is-active" : ""}" type="button" data-planner-day="${key}">
        <strong>${date.toLocaleDateString("en-US", { weekday: "short" })}</strong>
        <span>${date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
      </button>
    `;
  }).join("");

  plannerGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-planner-day]");
    if (!button) {
      return;
    }

    const key = button.dataset.plannerDay;
    const nextPlanner = getPlanner();
    if (nextPlanner[key]) {
      delete nextPlanner[key];
      button.classList.remove("is-active");
    } else {
      nextPlanner[key] = "revision";
      button.classList.add("is-active");
    }
    saveJson(STORAGE_KEYS.planner, nextPlanner);
    showNotification(nextPlanner[key] ? "Day added to planner." : "Day removed from planner.", "info");
  });

  bookmarksTarget.innerHTML = bookmarks.length
    ? bookmarks.map(createResourceLink).join("")
    : "<p class=\"empty-state\">No bookmarks yet. Save useful notes, tutorials, or cheat sheets.</p>";

  recentTarget.innerHTML = recent.length
    ? recent.map((item) => `
        <a class="resource-link" href="${getContentHref(item)}">
          <strong>${escapeHtml(item.title)}</strong>
          <span>${escapeHtml(item.category)} - ${escapeHtml(item.readTime)}</span>
        </a>
      `).join("")
    : "<p class=\"empty-state\">Recent views will appear here after you open a resource.</p>";

  revisionTarget.innerHTML = revisedEntries.length
    ? revisedEntries.map((item) => item.type === "interview"
        ? `<article class="resource-link is-static"><strong>${escapeHtml(item.question)}</strong><span>${escapeHtml(item.category)} interview question</span></article>`
        : createResourceLink(item)
      ).join("")
    : "<p class=\"empty-state\">Mark notes, tutorials, or interview questions as revised to build your tracker.</p>";

  const daily = getDailyInterviewQuestion();
  questionTarget.innerHTML = `
    <p class="eyebrow">Daily practice</p>
    <h2>${escapeHtml(daily.question)}</h2>
    <p>${escapeHtml(daily.answer[0])}</p>
    <div class="tag-row">${daily.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
  `;
}

function setupAdminPage() {
  const providerForm = document.getElementById("providerForm");
  const providerSelect = document.getElementById("providerSelect");
  const providerUrlInput = document.getElementById("providerUrlInput");
  const providerKeyInput = document.getElementById("providerKeyInput");
  const providerMessage = document.getElementById("providerMessage");
  const adminEntryForm = document.getElementById("adminEntryForm");
  const adminTypeInput = document.getElementById("adminTypeInput");
  const adminTitleInput = document.getElementById("adminTitleInput");
  const adminCategoryInput = document.getElementById("adminCategoryInput");
  const adminReadTimeInput = document.getElementById("adminReadTimeInput");
  const adminExcerptInput = document.getElementById("adminExcerptInput");
  const adminContentInput = document.getElementById("adminContentInput");
  const adminInterviewFields = document.getElementById("adminInterviewFields");
  const adminCompaniesInput = document.getElementById("adminCompaniesInput");
  const adminLevelInput = document.getElementById("adminLevelInput");
  const adminOptionAInput = document.getElementById("adminOptionAInput");
  const adminOptionBInput = document.getElementById("adminOptionBInput");
  const adminOptionCInput = document.getElementById("adminOptionCInput");
  const adminOptionDInput = document.getElementById("adminOptionDInput");
  const adminCorrectOptionInput = document.getElementById("adminCorrectOptionInput");
  const adminTagsInput = document.getElementById("adminTagsInput");
  const adminCodeInput = document.getElementById("adminCodeInput");
  const adminEditingSlug = document.getElementById("adminEditingSlug");
  const adminEditingType = document.getElementById("adminEditingType");
  const adminCancelEdit = document.getElementById("adminCancelEdit");
  const adminSubmitButton = document.getElementById("adminSubmitButton");
  const adminEntryMessage = document.getElementById("adminEntryMessage");
  const adminResourceList = document.getElementById("adminResourceList");

  if (!providerForm || !providerSelect || !providerUrlInput || !providerKeyInput || !providerMessage || !adminEntryForm || !adminTypeInput || !adminTitleInput || !adminCategoryInput || !adminReadTimeInput || !adminExcerptInput || !adminContentInput || !adminInterviewFields || !adminCompaniesInput || !adminLevelInput || !adminOptionAInput || !adminOptionBInput || !adminOptionCInput || !adminOptionDInput || !adminCorrectOptionInput || !adminTagsInput || !adminCodeInput || !adminEditingSlug || !adminEditingType || !adminCancelEdit || !adminSubmitButton || !adminEntryMessage || !adminResourceList) {
    return;
  }

  function syncAdminTypeState() {
    const isInterview = adminTypeInput.value === "interview";
    adminInterviewFields.hidden = !isInterview;
    adminCompaniesInput.disabled = !isInterview;
    adminLevelInput.disabled = !isInterview;
    adminOptionAInput.disabled = !isInterview;
    adminOptionBInput.disabled = !isInterview;
    adminOptionCInput.disabled = !isInterview;
    adminOptionDInput.disabled = !isInterview;
    adminCorrectOptionInput.disabled = !isInterview;
  }

  function resetAdminForm() {
    adminEntryForm.reset();
    adminEditingSlug.value = "";
    adminEditingType.value = "";
    adminSubmitButton.textContent = "Create Resource";
    syncAdminTypeState();
  }

  function renderAdminResources() {
    const entries = dataStore.listEntries();
    adminResourceList.innerHTML = entries.length
      ? entries.map((entry) => `
          <article class="resource-link is-static admin-item">
            <div>
              <strong>${escapeHtml(entry.type)}: ${escapeHtml(entry.title || entry.question)}</strong>
              <span>${escapeHtml(entry.category)} - ${escapeHtml(entry.readTime || "Custom")}</span>
            </div>
            <div class="admin-item-actions">
              <button class="button button-ghost button-small" type="button" data-admin-edit="${escapeHtml(entry.slug)}" data-admin-type="${escapeHtml(entry.type)}">Edit</button>
              <button class="button button-ghost button-small" type="button" data-admin-delete="${escapeHtml(entry.slug)}" data-admin-delete-type="${escapeHtml(entry.type)}">Delete</button>
            </div>
          </article>
        `).join("")
      : "<p class=\"empty-state\">No custom resources yet. Use the form above to create one.</p>";
  }

  bindProviderConfigForm({
    form: providerForm,
    select: providerSelect,
    urlInput: providerUrlInput,
    keyInput: providerKeyInput,
    messageTarget: providerMessage,
    localMessage: "Local provider active.",
    remoteMessage: "Backend scaffold saved. Connect SDK credentials later."
  });

  adminCancelEdit.addEventListener("click", () => {
    resetAdminForm();
    setInlineMessage(adminEntryMessage, "Form reset.", "info");
  });

  adminResourceList.addEventListener("click", (event) => {
    const editButton = event.target.closest("[data-admin-edit]");
    const deleteButton = event.target.closest("[data-admin-delete]");

    if (editButton) {
      const slug = editButton.dataset.adminEdit;
      const type = editButton.dataset.adminType;
      const entry = dataStore.listEntries().find((item) => item.slug === slug && item.type === type);
      if (!entry) {
        return;
      }

      adminEditingSlug.value = entry.slug;
      adminEditingType.value = entry.type;
      adminTypeInput.value = entry.type;
      adminTitleInput.value = entry.title || entry.question || "";
      adminCategoryInput.value = entry.category || "";
      adminReadTimeInput.value = entry.readTime || "";
      adminExcerptInput.value = entry.excerpt || "";
      adminContentInput.value = (entry.detail || entry.answer || []).join("\n\n");
      adminCompaniesInput.value = Array.isArray(entry.companies) ? entry.companies.join(", ") : "";
      adminLevelInput.value = entry.level || "";
      adminOptionAInput.value = entry.options?.find((option) => option.key === "A")?.text || "";
      adminOptionBInput.value = entry.options?.find((option) => option.key === "B")?.text || "";
      adminOptionCInput.value = entry.options?.find((option) => option.key === "C")?.text || "";
      adminOptionDInput.value = entry.options?.find((option) => option.key === "D")?.text || "";
      adminCorrectOptionInput.value = entry.correctOption || "";
      adminTagsInput.value = Array.isArray(entry.tags) ? entry.tags.join(", ") : "";
      adminCodeInput.value = entry.code || "";
      adminSubmitButton.textContent = "Update Resource";
      syncAdminTypeState();
      setInlineMessage(adminEntryMessage, "Editing selected resource.", "info");
      adminTitleInput.focus();
      return;
    }

    if (deleteButton) {
      const slug = deleteButton.dataset.adminDelete;
      const type = deleteButton.dataset.adminDeleteType;
      dataStore.deleteEntry(slug, type);
      setInlineMessage(adminEntryMessage, "Resource deleted.", "success");
      if (adminEditingSlug.value === slug && adminEditingType.value === type) {
        resetAdminForm();
      }
      renderAdminResources();
    }
  });

  adminEntryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const type = adminTypeInput.value;
    const detail = adminContentInput.value.split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean);
    const interviewOptions = [
      { key: "A", text: adminOptionAInput.value.trim() },
      { key: "B", text: adminOptionBInput.value.trim() },
      { key: "C", text: adminOptionCInput.value.trim() },
      { key: "D", text: adminOptionDInput.value.trim() }
    ].filter((option) => option.text);
    const isEditing = Boolean(adminEditingSlug.value && adminEditingType.value);
    const entry = {
      type,
      slug: isEditing ? slugify(adminTitleInput.value || adminEditingSlug.value) : slugify(adminTitleInput.value || `${type}-${Date.now()}`),
      title: adminTitleInput.value.trim(),
      excerpt: adminExcerptInput.value.trim(),
      category: adminCategoryInput.value.trim(),
      readTime: adminReadTimeInput.value.trim(),
      tags: adminTagsInput.value.split(",").map((tag) => tag.trim()).filter(Boolean),
      detail,
      code: adminCodeInput.value.trim(),
      author: "Admin"
    };

    if (type === "interview") {
      if (interviewOptions.length && !adminCorrectOptionInput.value) {
        setInlineMessage(adminEntryMessage, "Select the correct option for MCQ questions.", "error");
        return;
      }

      entry.question = entry.title;
      entry.answer = detail;
      entry.companies = adminCompaniesInput.value.split(",").map((company) => company.trim()).filter(Boolean);
      if (!entry.companies.length) {
        entry.companies = ["Custom"];
      }
      entry.level = adminLevelInput.value.trim() || "Admin-added";
      entry.options = interviewOptions;
      entry.correctOption = interviewOptions.length ? adminCorrectOptionInput.value : "";
    }

    if (type === "note") {
      entry.level = "Admin note";
    }

    if (type === "cheatsheet") {
      entry.level = "Reference";
    }

    if (isEditing) {
      dataStore.updateEntry(adminEditingSlug.value, adminEditingType.value, entry);
      setInlineMessage(adminEntryMessage, "Resource updated successfully.", "success");
    } else {
      dataStore.createEntry(entry);
      setInlineMessage(adminEntryMessage, "Resource created successfully.", "success");
    }
    resetAdminForm();
    renderAdminResources();
  });

  adminTypeInput.addEventListener("change", syncAdminTypeState);
  syncAdminTypeState();

  renderAdminResources();
}

function init() {
  const page = document.body.dataset.page;
  decorateSiteIcons();
  setupFooterSocial();
  setupAccessibility();
  setupNavigation(page);
  setupTheme();
  syncGlobalSearchForms(page);
  setupNewsletter();

  if (page === "home") {
    setupHomeParticles();
    setupHomeAuth();
    renderFeaturedContent();
    setupHomeWorkspace();
  }

  if (["notes", "tutorials", "projects", "blog", "cheatsheets"].includes(page)) {
    renderListing(page);
  }

  if (page === "search") {
    setupSearchPage();
  }

  if (page === "editor") {
    setupEditor();
  }

  if (page === "content") {
    setupDetailPage();
  }

  if (page === "interview") {
    setupInterviewPage();
  }

  if (page === "dashboard") {
    setupDashboard();
  }

  if (page === "admin") {
    setupAdminPage();
  }
}

document.addEventListener("DOMContentLoaded", init);
