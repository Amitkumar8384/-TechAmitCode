const STORAGE_KEYS = {
  theme: "techAmitCodeTheme",
  newsletter: "techAmitCodeNewsletter",
  draft: "techAmitCodeDraft",
  posts: "techAmitCodePosts",
  subjects: "techAmitCodeSubjects",
  chapters: "techAmitCodeChapters",
  profile: "techAmitCodeProfile",
  auth: "techAmitCodeAuth",
  planner: "techAmitCodePlanner",
  provider: "techAmitCodeProvider",
  bookmarks: "techAmitCodeBookmarks",
  comments: "techAmitCodeComments",
  progress: "techAmitCodeProgress",
  recent: "techAmitCodeRecent",
  chapterBookmarks: "techAmitCodeChapterBookmarks",
  chapterPractice: "techAmitCodeChapterPractice",
  chapterCompletions: "techAmitCodeChapterCompletions"
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

const builtInSubjects = [
  {
    id: "html",
    name: "HTML",
    description: "Study semantic structure, accessibility foundations, and interview-first HTML patterns.",
    icon: "HTML"
  },
  {
    id: "frontend",
    name: "Frontend",
    description: "Learn page structure, design systems, and responsive product layouts with real UI workflows.",
    icon: "UI"
  },
  {
    id: "javascript",
    name: "JavaScript",
    description: "Move from DOM events to async thinking with chapter-wise notes, tutorials, and interview practice.",
    icon: "JS"
  },
  {
    id: "css",
    name: "CSS",
    description: "Build layout systems, architecture patterns, and quick-reference visual styling workflows.",
    icon: "CSS"
  },
  {
    id: "react",
    name: "React",
    description: "Study component design, state ownership, and reusable UI composition for interview-ready answers.",
    icon: "React"
  },
  {
    id: "tools",
    name: "Tools",
    description: "Use tooling, Git workflows, and practical utilities that support faster shipping.",
    icon: "Tools"
  },
  {
    id: "career",
    name: "Career",
    description: "Turn learning into better interview answers, writing habits, and long-term developer growth.",
    icon: "Career"
  },
  {
    id: "english",
    name: "English",
    description: "Improve technical communication, explanation style, and learning notes written in clear English.",
    icon: "English"
  },
  {
    id: "workflow",
    name: "Workflow",
    description: "Turn projects into shipping habits with Git, documentation, publishing flow, and product thinking.",
    icon: "Flow"
  }
];

const builtInChapters = [
  {
    id: "semantic-layout-basics",
    subjectId: "html",
    title: "Semantic Layout Basics",
    order: 1,
    description: "Use semantic HTML and foundational layout patterns to create maintainable page structure."
  },
  {
    id: "html-accessibility-foundations",
    subjectId: "html",
    title: "HTML Accessibility Foundations",
    order: 2,
    description: "Understand labels, landmarks, and meaningful structure for readable and accessible documents."
  },
  {
    id: "responsive-ui-systems",
    subjectId: "frontend",
    title: "Responsive UI Systems",
    order: 2,
    description: "Build reusable responsive shells with CSS architecture, grid, and flexbox patterns."
  },
  {
    id: "frontend-production-thinking",
    subjectId: "frontend",
    title: "Frontend Production Thinking",
    order: 1,
    description: "Think in workflows, states, and maintainable page systems rather than isolated screens."
  },
  {
    id: "dom-state-patterns",
    subjectId: "javascript",
    title: "DOM State Patterns",
    order: 1,
    description: "Model UI state clearly with DOM events, event delegation, and render workflows."
  },
  {
    id: "async-runtime-thinking",
    subjectId: "javascript",
    title: "Async Runtime Thinking",
    order: 2,
    description: "Understand closures, event loop behavior, and async reasoning for interviews and practical code."
  },
  {
    id: "css-layout-systems",
    subjectId: "css",
    title: "CSS Layout Systems",
    order: 1,
    description: "Practice flexbox, grid, spacing, and card layout systems that scale cleanly."
  },
  {
    id: "css-architecture-patterns",
    subjectId: "css",
    title: "CSS Architecture Patterns",
    order: 2,
    description: "Organize styling with tokens, utilities, and component boundaries."
  },
  {
    id: "react-component-thinking",
    subjectId: "react",
    title: "React Component Thinking",
    order: 1,
    description: "Practice props, state ownership, and composition patterns through reusable component notes."
  },
  {
    id: "react-state-patterns",
    subjectId: "react",
    title: "React State Patterns",
    order: 2,
    description: "Understand component state, prop flow, and rendering tradeoffs in practical UI code."
  },
  {
    id: "tooling-basics",
    subjectId: "tools",
    title: "Tooling Basics",
    order: 1,
    description: "Use Git and core developer tools confidently during project work."
  },
  {
    id: "career-learning-loop",
    subjectId: "career",
    title: "Career Learning Loop",
    order: 1,
    description: "Use writing, documentation, and reflection to improve project outcomes and interviews."
  },
  {
    id: "english-communication-practice",
    subjectId: "english",
    title: "English Communication Practice",
    order: 1,
    description: "Write and explain technical ideas in simple, interview-friendly English."
  },
  {
    id: "shipping-workflows",
    subjectId: "workflow",
    title: "Shipping Workflows",
    order: 1,
    description: "Document projects, write after building, and use Git plus publishing workflows to learn faster."
  }
];

const builtInChapterLessons = {
  "semantic-layout-basics": [
    "Semantic HTML ka main goal styling nahi, meaning dena hota hai. Jab aap `header`, `nav`, `main`, `section`, `article`, aur `footer` use karte ho, page structure clear ho jata hai.",
    "Readable layout banane ke liye pehle document landmarks decide karo. Har screen me socho user kahan land karega, primary content kya hai, aur supporting content kya hai.",
    "Achi semantic structure accessibility ko improve karti hai, SEO ko support karti hai, aur future maintenance ko simple banati hai.",
    "Is chapter ka practical rule: pehle HTML skeleton banao, baad me CSS se decorate karo."
  ],
  "html-accessibility-foundations": [
    "Accessible HTML ka start labels aur landmarks se hota hai. Har form input ka clear label hona chahiye aur har page ka logical heading order hona chahiye.",
    "Buttons ko buttons hi rehne do aur links ko links. Semantic misuse se keyboard navigation aur screen reader flow dono weak ho jate hain.",
    "Helpful accessibility ka matlab sirf alt text nahi hota. Error states, focus visibility, readable button text, aur predictable navigation bhi equally important hain.",
    "Interview answer me hamesha accessibility ko usability aur maintainability ke saath connect karke explain karo."
  ],
  "frontend-production-thinking": [
    "Frontend sirf components banana nahi hota; yeh user workflow ko screen states me translate karna hota hai.",
    "Har feature ke liye loading, empty, success, aur error state socho. Production thinking wahi se start hoti hai.",
    "Screen ko sections me break karo: hero, filters, list, sidebar, actions. Isse reusable patterns nikalte hain aur layout drift kam hota hai.",
    "Achi frontend system wahi hai jo growth ke baad bhi readable aur consistent rahe."
  ],
  "responsive-ui-systems": [
    "Responsive layout banate waqt pehle constraints socho, baad me polish. Mobile collapse kaisa hoga, tablet rearrangement kya hogi, aur desktop density kitni hogi, yeh pehle define karo.",
    "Grid page structure ke liye strong hota hai, jabki flex local alignment aur row-level distribution ke liye useful hota hai.",
    "Spacing system random pixel values se better hota hai, kyunki usse layout more consistent aur easier to maintain ho jata hai.",
    "Is chapter ka outcome: aisa UI jo sirf pretty nahi, balki multiple screen sizes par stable bhi ho."
  ],
  "dom-state-patterns": [
    "DOM state ko clearly manage karne ke liye random click handlers me logic mat chhupao. Ek small state object rakho aur focused render functions banao.",
    "Event delegation dynamic lists aur repeated UI elements ke liye powerful pattern hai. Parent par listener lagao aur target ko detect karo.",
    "Search, filter, toggle, selection jaise behaviors ko state updates ki tarah treat karo. Isse debugging easy hoti hai.",
    "Acha JavaScript workflow tab banta hai jab UI predictable re-render kare aur logic scattered na ho."
  ],
  "async-runtime-thinking": [
    "JavaScript single-threaded call stack par run karta hai, lekin timers, promises, aur browser APIs asynchronous behavior create karte hain.",
    "Event loop samajhne ka simple rule: synchronous code pehle, microtasks next, aur macrotasks uske baad.",
    "Closures interview ka favorite topic isliye hain kyunki woh lexical scope aur private state ko practical example ke saath explain karte hain.",
    "Async reasoning ka real benefit yeh hai ki aap confidently predict kar sako code kis order me run hoga."
  ],
  "css-layout-systems": [
    "CSS layout systems me flexbox aur grid dono important hain, lekin dono ka kaam alag hai. Flex ek dimension me strong hai, grid do dimensions me.",
    "Common patterns yaad rakho: split row, centered stack, wrapped chips, auto-fit card grid, aur sticky side panel.",
    "Layout scalable tab banta hai jab spacing, width constraints, aur content growth dono consider kiye gaye hon.",
    "Cheat sheets helpful hain, lekin real understanding tab aati hai jab aap pattern ko multiple screens par test karte ho."
  ],
  "css-architecture-patterns": [
    "CSS architecture ka goal line count kam karna nahi, balki growth ko manageable banana hota hai.",
    "Tokens se start karo: color, spacing, radius, typography. Phir utilities aur components ko alag layers me define karo.",
    "Agar har new component styling ko copy-paste karke start kar raha hai, to architecture weak hai.",
    "Production CSS tab achha feel hota hai jab naming, spacing, aur variation system-based ho."
  ],
  "react-component-thinking": [
    "React me best components woh hote hain jo ek clear responsibility handle karte hain aur composition ke through grow karte hain.",
    "Props input hain, state owned changeable data hai. Har component me yeh decide karna important hai ki state kahan live karegi.",
    "Composition giant prop-heavy components se zyada scalable hoti hai. Reusable wrappers aur slots future changes ko easier banate hain.",
    "Interview me React explain karte waqt ownership, predictability, aur tradeoffs ka mention strong answer banata hai."
  ],
  "react-state-patterns": [
    "State ko jitna niche rakh sakte ho utna niche rakho, lekin agar multiple children ko same updates chahiye to use lift karo.",
    "Render behavior ko samajhna important hai: kaunsa state change kis component tree ko affect karega.",
    "Controlled inputs, derived UI, aur prop flow ko clear rakhna React apps ko maintainable banata hai.",
    "React state ka real test tab hota hai jab app grow kare aur aapko bugs ke bina predictable updates chahiye hon."
  ],
  "tooling-basics": [
    "Developer tools ka basic confidence project speed ko directly affect karta hai. `git status`, `git diff`, aur branch workflow pe comfort zaroori hai.",
    "Tooling ka purpose busywork badhana nahi, risk kam karna hota hai. Inspect before change is a strong habit.",
    "Cheat sheet ya command list tab useful hoti hai jab aap usse real project flow me repeatedly use karte ho.",
    "Is chapter me aim hai panic ko reduce karna aur day-to-day coding confidence build karna."
  ],
  "career-learning-loop": [
    "Project complete karne ke baad agar aap uske decisions ko likhte ho, to learning much deeper ho jati hai.",
    "Writing aapko force karti hai ki aap vague understanding ko clear explanation me convert karo.",
    "Career growth ke liye sirf build karna kaafi nahi; aapko explain, reflect, aur present bhi karna aana chahiye.",
    "Strong learning loop: build, document, review, publish, and improve."
  ],
  "english-communication-practice": [
    "Technical English ka main goal fancy language nahi, clear explanation hota hai.",
    "Short sentences, simple verbs, and one idea per paragraph interview aur notes dono me helpful hote hain.",
    "Achi communication tab dikhti hai jab aap concept ko beginner ko bhi samjha sako aur experienced person ko bhi bore na karo.",
    "Practice method: ek topic lo, use simple English me explain karo, phir same answer ko tighter version me rewrite karo."
  ],
  "shipping-workflows": [
    "Shipping mindset ka matlab project ko output me convert karna hai, sirf local experiment me chhod dena nahi.",
    "Acha workflow me planning, implementation, notes, and publishing ka path hota hai. Isi loop se learning durable banti hai.",
    "Documentation aur writing optional extras nahi hain; yeh project ko reusable asset bana dete hain.",
    "Is chapter ka focus hai passive learning ko active delivery me badalna."
  ]
};

const builtInContentAssignments = {
  note: {
    "html-semantic-notes": { subjectId: "html", chapterId: "semantic-layout-basics" },
    "js-event-loop-notes": { subjectId: "javascript", chapterId: "async-runtime-thinking" },
    "react-component-notes": { subjectId: "react", chapterId: "react-component-thinking" }
  },
  tutorial: {
    "css-architecture": { subjectId: "css", chapterId: "css-architecture-patterns" },
    "dom-state-workflow": { subjectId: "javascript", chapterId: "dom-state-patterns" },
    "responsive-dashboard": { subjectId: "frontend", chapterId: "responsive-ui-systems" }
  },
  cheatsheet: {
    "flexbox-cheatsheet": { subjectId: "css", chapterId: "css-layout-systems" },
    "grid-cheatsheet": { subjectId: "css", chapterId: "css-layout-systems" },
    "git-cheatsheet": { subjectId: "tools", chapterId: "tooling-basics" }
  },
  interview: {
    "difference-between-flex-and-grid": { subjectId: "css", chapterId: "css-layout-systems" },
    "what-is-event-delegation": { subjectId: "javascript", chapterId: "dom-state-patterns" },
    "what-is-closure": { subjectId: "javascript", chapterId: "async-runtime-thinking" },
    "semantic-html-importance": { subjectId: "html", chapterId: "semantic-layout-basics" },
    "react-state-vs-props": { subjectId: "react", chapterId: "react-state-patterns" }
  },
  blog: {
    "stop-copying-ui": { subjectId: "workflow", chapterId: "shipping-workflows" },
    "write-after-building": { subjectId: "career", chapterId: "career-learning-loop" }
  },
  project: {
    "knowledge-base-ui": { subjectId: "frontend", chapterId: "responsive-ui-systems" },
    "creator-portfolio": { subjectId: "workflow", chapterId: "shipping-workflows" }
  }
};

const categorySubjectDefaults = {
  HTML: { subjectId: "html", chapterId: "semantic-layout-basics" },
  Frontend: { subjectId: "frontend", chapterId: "frontend-production-thinking" },
  JavaScript: { subjectId: "javascript", chapterId: "dom-state-patterns" },
  CSS: { subjectId: "css", chapterId: "css-layout-systems" },
  React: { subjectId: "react", chapterId: "react-component-thinking" },
  Tools: { subjectId: "tools", chapterId: "tooling-basics" },
  Career: { subjectId: "career", chapterId: "career-learning-loop" },
  English: { subjectId: "english", chapterId: "english-communication-practice" },
  Workflow: { subjectId: "workflow", chapterId: "shipping-workflows" }
};

function slugify(value, fallback = "item") {
  const normalized = String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (normalized) {
    return normalized;
  }

  const safeFallback = String(fallback || "item")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return safeFallback || "item";
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

function normalizeEntryDraft(entry, index = 0) {
  const type = String(entry?.type || "blog").trim() || "blog";
  const title = String(entry?.title || entry?.question || "").trim();
  const question = String(entry?.question || entry?.title || "").trim();
  const fallbackSeed = `${type}-${Date.now()}-${index}`;
  const slug = slugify(entry?.slug || title || question || fallbackSeed, fallbackSeed);
  const detail = Array.isArray(entry?.detail)
    ? entry.detail.map((item) => String(item || "").trim()).filter(Boolean)
    : Array.isArray(entry?.answer)
      ? entry.answer.map((item) => String(item || "").trim()).filter(Boolean)
      : htmlToParagraphArray(entry?.detailHtml || entry?.detail || "");

  const normalized = {
    ...entry,
    type,
    slug,
    title: title || question || slug,
    question: type === "interview" ? (question || title || slug) : entry?.question,
    excerpt: String(entry?.excerpt || "").trim(),
    category: String(entry?.category || "General").trim(),
    readTime: type === "interview" ? "" : String(entry?.readTime || "").trim(),
    tags: Array.isArray(entry?.tags) ? entry.tags.map((tag) => String(tag || "").trim()).filter(Boolean) : [],
    detail,
    detailHtml: typeof entry?.detailHtml === "string" ? entry.detailHtml : "",
    code: String(entry?.code || "").trim(),
    author: String(entry?.author || "You").trim() || "You",
    status: String(entry?.status || "published").trim() || "published",
    subjectId: String(entry?.subjectId || "").trim(),
    chapterId: String(entry?.chapterId || "").trim(),
    createdAt: entry?.createdAt || Date.now(),
    updatedAt: entry?.updatedAt || entry?.createdAt || Date.now()
  };

  if (type === "interview") {
    normalized.answer = detail;
    normalized.companies = Array.isArray(entry?.companies) && entry.companies.length ? entry.companies : ["Custom"];
    normalized.level = String(entry?.level || "Custom interview").trim();
    normalized.options = Array.isArray(entry?.options)
      ? entry.options
          .map((option) => ({
            key: String(option?.key || "").trim().toUpperCase(),
            text: String(option?.text || "").trim()
          }))
          .filter((option) => option.key && option.text)
      : [];
    normalized.correctOption = normalized.options.length ? String(entry?.correctOption || "").trim().toUpperCase() : "";
  }

  return normalized;
}

function getLocalEntries() {
  const saved = loadJson(STORAGE_KEYS.posts, []);
  const normalized = Array.isArray(saved) ? saved.map((entry, index) => normalizeEntryDraft(entry, index)) : [];
  const changed = JSON.stringify(saved) !== JSON.stringify(normalized);
  if (changed) {
    saveJson(STORAGE_KEYS.posts, normalized);
  }
  return normalized;
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

function mergeByKey(items, key = "id") {
  const map = new Map();
  items.forEach((item) => {
    if (item && item[key]) {
      map.set(item[key], item);
    }
  });
  return Array.from(map.values());
}

function getSubjects() {
  return mergeByKey([...builtInSubjects, ...loadJson(STORAGE_KEYS.subjects, [])], "id");
}

function getChapters() {
  return mergeByKey([...builtInChapters, ...loadJson(STORAGE_KEYS.chapters, [])], "id")
    .map((chapter) => ({
      ...chapter,
      lesson: Array.isArray(chapter.lesson) && chapter.lesson.length
        ? chapter.lesson
        : builtInChapterLessons[chapter.id] || []
    }))
    .sort((a, b) => {
      if (a.subjectId !== b.subjectId) {
        return String(a.subjectId).localeCompare(String(b.subjectId));
      }
      return Number(a.order || 0) - Number(b.order || 0);
    });
}

function getSubjectById(subjectId) {
  return getSubjects().find((item) => item.id === subjectId) || null;
}

function getChapterById(chapterId) {
  return getChapters().find((item) => item.id === chapterId) || null;
}

function getChaptersBySubject(subjectId) {
  return getChapters().filter((item) => item.subjectId === subjectId);
}

function getNextChapterOrder(subjectId) {
  const chapters = getChaptersBySubject(subjectId);
  return chapters.length ? Math.max(...chapters.map((item) => Number(item.order || 0))) + 1 : 1;
}

function saveCustomChapters(chapters) {
  saveJson(STORAGE_KEYS.chapters, chapters);
}

function ensureSubjectChapter(subjectId, chapterId = "", chapterTitle = "", defaults = {}) {
  const effectiveSubjectId = String(subjectId || "").trim();
  const requestedChapterId = String(chapterId || "").trim();
  const requestedTitle = String(chapterTitle || "").trim();

  if (!effectiveSubjectId) {
    return { chapterId: requestedChapterId, chapter: requestedChapterId ? getChapterById(requestedChapterId) : null, created: false };
  }

  if (requestedChapterId) {
    const existingChapter = getChapterById(requestedChapterId);
    const sameTitle = existingChapter && (!requestedTitle || String(existingChapter.title || "").trim().toLowerCase() === requestedTitle.toLowerCase());
    if (existingChapter && sameTitle) {
      return { chapterId: existingChapter.id, chapter: existingChapter, created: false };
    }
  }

  if (!requestedTitle) {
    return { chapterId: "", chapter: null, created: false };
  }

  const normalizedTitle = requestedTitle.toLowerCase();
  const existingByTitle = getChaptersBySubject(effectiveSubjectId)
    .find((item) => String(item.title || "").trim().toLowerCase() === normalizedTitle);

  if (existingByTitle) {
    return { chapterId: existingByTitle.id, chapter: existingByTitle, created: false };
  }

  const customChapters = loadJson(STORAGE_KEYS.chapters, []);
  const nextChapter = {
    id: slugify(defaults.idSeed || requestedTitle || `chapter-${Date.now()}`, `chapter-${Date.now()}`),
    subjectId: effectiveSubjectId,
    title: requestedTitle,
    order: Number(defaults.order || getNextChapterOrder(effectiveSubjectId)),
    description: String(defaults.description || "").trim() || `Chapter for ${requestedTitle}.`
  };
  const next = customChapters.filter((item) => item.id !== nextChapter.id);
  next.unshift(nextChapter);
  saveCustomChapters(next);
  return { chapterId: nextChapter.id, chapter: nextChapter, created: true };
}

function getTaxonomyAssignment(type, slug) {
  return builtInContentAssignments[type]?.[slug] || null;
}

function getCategoryTaxonomyAssignment(category) {
  if (!category) {
    return null;
  }
  return categorySubjectDefaults[String(category).trim()] || null;
}

function attachTaxonomy(item, typeOverride = "") {
  const type = typeOverride || item.type;
  const assignment = getTaxonomyAssignment(type, item.slug);
  const categoryAssignment = getCategoryTaxonomyAssignment(item.category);
  return {
    ...item,
    subjectId: item.subjectId || assignment?.subjectId || categoryAssignment?.subjectId || "",
    chapterId: item.chapterId || assignment?.chapterId || categoryAssignment?.chapterId || ""
  };
}

function getSubjectHref(subject) {
  return `subject.html?subject=${encodeURIComponent(subject.id)}`;
}

function getChapterHref(chapter) {
  return `chapter.html?chapter=${encodeURIComponent(chapter.id)}`;
}

function getChapterBookmarks() {
  return loadJson(STORAGE_KEYS.chapterBookmarks, []);
}

function getChapterPractice() {
  return loadJson(STORAGE_KEYS.chapterPractice, {});
}

function getChapterCompletions() {
  return loadJson(STORAGE_KEYS.chapterCompletions, {});
}

function saveChapterBookmarks(bookmarks) {
  saveJson(STORAGE_KEYS.chapterBookmarks, bookmarks);
}

function saveChapterPractice(practice) {
  saveJson(STORAGE_KEYS.chapterPractice, practice);
}

function saveChapterCompletions(completions) {
  saveJson(STORAGE_KEYS.chapterCompletions, completions);
}

function toggleChapterBookmark(chapterId) {
  const bookmarks = new Set(getChapterBookmarks());
  if (bookmarks.has(chapterId)) {
    bookmarks.delete(chapterId);
  } else {
    bookmarks.add(chapterId);
  }
  const next = Array.from(bookmarks);
  saveChapterBookmarks(next);
  return bookmarks.has(chapterId);
}

function markChapterCompleted(chapterId) {
  const completions = getChapterCompletions();
  completions[chapterId] = Date.now();
  saveChapterCompletions(completions);
  markProgress("revised", `chapter:${chapterId}`);
}

function saveChapterPracticeResult(chapterId, score, total) {
  const practice = getChapterPractice();
  const previous = practice[chapterId] || { attempts: 0, bestScore: 0, total: total || 0, lastScore: 0 };
  practice[chapterId] = {
    attempts: previous.attempts + 1,
    bestScore: Math.max(previous.bestScore || 0, score),
    total: total || previous.total || 0,
    lastScore: score,
    updatedAt: Date.now()
  };
  saveChapterPractice(practice);
  return practice[chapterId];
}

function getChapterResources(chapterId) {
  const collections = getContentCollections();
  return {
    notes: collections.note.filter((item) => item.chapterId === chapterId),
    tutorials: collections.tutorial.filter((item) => item.chapterId === chapterId),
    cheatsheets: collections.cheatsheet.filter((item) => item.chapterId === chapterId),
    projects: collections.project.filter((item) => item.chapterId === chapterId),
    blog: collections.blog.filter((item) => item.chapterId === chapterId),
    questions: getInterviewQuestions().filter((item) => item.chapterId === chapterId)
  };
}

function getChapterReadingBlocks(chapter, subject, resources) {
  if (Array.isArray(chapter.lesson) && chapter.lesson.length) {
    return chapter.lesson;
  }

  const blocks = [
    `${chapter.title} ${subject?.name ? `is part of the ${subject.name} path.` : "is part of your current learning path."}`,
    chapter.description
  ];

  if (resources.notes.length) {
    blocks.push(`Start with ${resources.notes.map((item) => item.title).join(", ")} to build your foundation for this chapter.`);
  } else {
    blocks.push("This chapter does not have a dedicated note yet, so use the guided overview below and continue with the related tutorials and questions.");
  }

  if (resources.tutorials.length) {
    blocks.push(`Related tutorials: ${resources.tutorials.map((item) => item.title).join(", ")}.`);
  }

  if (resources.cheatsheets.length) {
    blocks.push(`Quick references available: ${resources.cheatsheets.map((item) => item.title).join(", ")}.`);
  }

  if (resources.questions.length) {
    blocks.push(`Practice prompts in this chapter focus on: ${resources.questions.map((item) => item.question).slice(0, 3).join(" | ")}.`);
  }

  if (resources.projects.length) {
    blocks.push(`Apply the chapter through projects like ${resources.projects.map((item) => item.title).join(", ")}.`);
  }

  if (resources.blog.length) {
    blocks.push(`Reflection and workflow articles for this topic: ${resources.blog.map((item) => item.title).join(", ")}.`);
  }

  return blocks.filter(Boolean);
}

function getSubjectProgressSummary(subjectId) {
  const subject = getSubjectById(subjectId);
  const chapters = getChaptersBySubject(subjectId);
  const completions = getChapterCompletions();
  const practice = getChapterPractice();
  const completed = chapters.filter((chapter) => completions[chapter.id]).length;
  const attempts = chapters.reduce((count, chapter) => count + (practice[chapter.id]?.attempts || 0), 0);
  const earned = chapters.reduce((sum, chapter) => sum + (practice[chapter.id]?.bestScore || 0), 0);
  const available = chapters.reduce((sum, chapter) => sum + (practice[chapter.id]?.total || getChapterResources(chapter.id).questions.length || 0), 0);
  return {
    subject,
    chapters,
    completed,
    attempts,
    scorePercent: available ? Math.round((earned / available) * 100) : 0,
    completionPercent: chapters.length ? Math.round((completed / chapters.length) * 100) : 0
  };
}

function getRecommendedChapter() {
  const chapters = getChapters();
  const completions = getChapterCompletions();
  return chapters.find((chapter) => !completions[chapter.id]) || chapters[0] || null;
}

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
  const localEntries = getLocalEntries().map((entry) => attachTaxonomy({ ...entry, isLocal: true }, entry.type));
  return {
    tutorial: tutorials.map((item) => attachTaxonomy(item, "tutorial")),
    project: projects.map((item) => attachTaxonomy(item, "project")),
    blog: [...localEntries.filter((entry) => entry.type === "blog"), ...blogPosts.map((item) => attachTaxonomy(item, "blog"))],
    note: [...localEntries.filter((entry) => entry.type === "note"), ...notes.map((item) => attachTaxonomy(item, "note"))],
    cheatsheet: [...localEntries.filter((entry) => entry.type === "cheatsheet"), ...cheatSheets.map((item) => attachTaxonomy(item, "cheatsheet"))]
  };
}

function getInterviewQuestions() {
  const localEntries = getLocalEntries()
    .filter((entry) => entry.type === "interview")
    .map((entry) => attachTaxonomy({
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
    }, "interview"));

  const builtIn = interviewQuestions.map((item) => attachTaxonomy({
    ...item,
    title: item.question
  }, "interview"));

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
    return sanitizeEditorHtml(detail).trim() || "<p>Start writing to build the article body.</p>";
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

function sanitizeUrl(value, options = {}) {
  const { allowHash = false, allowImageData = false } = options;
  const url = String(value || "").trim();
  if (!url) {
    return "";
  }

  if (allowHash && url.startsWith("#")) {
    return url;
  }

  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  if (allowImageData && /^data:image\/(?:png|jpeg|jpg|gif|webp|svg\+xml);base64,[a-z0-9+/=]+$/i.test(url)) {
    return url;
  }

  return "";
}

function sanitizeInlineStyle(styleText = "") {
  const safeDeclarations = [];
  const allowedFonts = new Set(["Outfit", "Georgia", "Courier New"]);

  styleText.split(";").forEach((declaration) => {
    const [property, ...rest] = declaration.split(":");
    if (!property || !rest.length) {
      return;
    }

    const key = property.trim().toLowerCase();
    const value = rest.join(":").trim();
    if (!value) {
      return;
    }

    if (key === "color" && /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value)) {
      safeDeclarations.push(`color: ${value}`);
      return;
    }

    if (key === "font-family") {
      const normalized = value.replace(/["']/g, "").trim();
      if (allowedFonts.has(normalized)) {
        safeDeclarations.push(`font-family: '${normalized}'`);
      }
    }
  });

  return safeDeclarations.join("; ");
}

function sanitizeEditorHtml(html = "") {
  const root = createTempContentRoot(html);
  const allowedTags = new Set([
    "A",
    "BLOCKQUOTE",
    "BR",
    "CODE",
    "EM",
    "FIGCAPTION",
    "FIGURE",
    "FONT",
    "H2",
    "H3",
    "IMG",
    "LI",
    "OL",
    "P",
    "SPAN",
    "STRONG",
    "UL"
  ]);
  const allowedClasses = new Set(["article-image", "rich-accent", "rich-highlight", "rich-serif", "rich-mono"]);

  function sanitizeNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      return;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) {
      node.remove();
      return;
    }

    const element = node;
    const tagName = element.tagName.toUpperCase();

    if (!allowedTags.has(tagName)) {
      const parent = element.parentNode;
      if (!parent) {
        element.remove();
        return;
      }

      while (element.firstChild) {
        parent.insertBefore(element.firstChild, element);
      }
      element.remove();
      return;
    }

    Array.from(element.attributes).forEach((attribute) => {
      const name = attribute.name.toLowerCase();
      const value = attribute.value;

      if (name.startsWith("on")) {
        element.removeAttribute(attribute.name);
        return;
      }

      if (name === "class") {
        const nextClasses = value
          .split(/\s+/)
          .map((token) => token.trim())
          .filter((token) => allowedClasses.has(token));
        if (nextClasses.length) {
          element.className = nextClasses.join(" ");
        } else {
          element.removeAttribute("class");
        }
        return;
      }

      if (name === "style") {
        const safeStyle = sanitizeInlineStyle(value);
        if (safeStyle) {
          element.setAttribute("style", safeStyle);
        } else {
          element.removeAttribute("style");
        }
        return;
      }

      if (tagName === "A" && name === "href") {
        const safeHref = sanitizeUrl(value, { allowHash: true });
        if (safeHref) {
          element.setAttribute("href", safeHref);
          element.setAttribute("target", "_blank");
          element.setAttribute("rel", "noreferrer");
        } else {
          element.removeAttribute("href");
        }
        return;
      }

      if (tagName === "IMG" && name === "src") {
        const safeSrc = sanitizeUrl(value, { allowImageData: true });
        if (safeSrc) {
          element.setAttribute("src", safeSrc);
        } else {
          element.remove();
        }
        return;
      }

      if ((tagName === "IMG" || tagName === "A") && name === "alt") {
        return;
      }

      if (tagName === "FONT" && name === "face") {
        if (!["Outfit", "Georgia", "Courier New"].includes(value)) {
          element.removeAttribute("face");
        }
        return;
      }

      if (tagName === "FONT" && name === "color") {
        if (!/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value)) {
          element.removeAttribute("color");
        }
        return;
      }

      if (!["alt", "href", "rel", "src", "target", "style", "face", "color"].includes(name)) {
        element.removeAttribute(attribute.name);
      }
    });

    Array.from(element.childNodes).forEach(sanitizeNode);
  }

  Array.from(root.childNodes).forEach(sanitizeNode);
  return root.innerHTML.trim();
}

function extractPlainTextFromHtml(html = "") {
  return createTempContentRoot(sanitizeEditorHtml(html)).textContent?.trim() || "";
}

function htmlToParagraphArray(html = "") {
  const root = createTempContentRoot(sanitizeEditorHtml(html));
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

function getTaxonomyLabel(item) {
  const chapter = item.chapterId ? getChapterById(item.chapterId) : null;
  const subject = item.subjectId ? getSubjectById(item.subjectId) : null;
  if (subject && chapter) {
    return `${subject.name} / ${chapter.title}`;
  }
  if (subject && item.chapterTitle) {
    return `${subject.name} / ${item.chapterTitle}`;
  }
  return subject?.name || "";
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
  const taxonomyLabel = getTaxonomyLabel(item);
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
      ${taxonomyLabel ? `<p class="card-meta card-path">${escapeHtml(taxonomyLabel)}</p>` : ""}
      <div class="tag-row">${item.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
      <div class="card-footer">
        <span class="card-meta">${escapeHtml(getItemMeta(item))}</span>
        <a class="card-link" href="${getContentHref(item)}">Open</a>
      </div>
    </article>
  `;
}

function createResourceLink(item) {
  const taxonomyLabel = getTaxonomyLabel(item);
  return `
    <a class="resource-link" href="${getContentHref(item)}">
      <strong>${escapeHtml(item.title)}</strong>
      <span>${escapeHtml([item.category, item.readTime, taxonomyLabel].filter(Boolean).join(" - "))}</span>
    </a>
  `;
}

function createSubjectCard(subject) {
  const progress = getSubjectProgressSummary(subject.id);
  return `
    <article class="content-card subject-card" data-subject-card="${escapeHtml(subject.id)}" tabindex="0" role="button" aria-label="${escapeHtml(`Open ${subject.name} chapters`)}">
      <div class="card-top">
        <span class="card-type">subject</span>
        <span class="card-meta">${progress.completed}/${progress.chapters.length} chapters</span>
      </div>
      <div>
        <h3>${escapeHtml(subject.name)}</h3>
        <p class="card-excerpt">${escapeHtml(subject.description)}</p>
      </div>
      <div class="tag-row">
        <span>${escapeHtml(subject.icon || "Learning path")}</span>
        <span>${progress.completionPercent}% complete</span>
      </div>
      <div class="card-footer">
        <span class="card-meta">${progress.scorePercent}% practice score</span>
        <a class="card-link" href="${getSubjectHref(subject)}">View Chapters</a>
      </div>
    </article>
  `;
}

function createChapterCard(chapter) {
  const subject = getSubjectById(chapter.subjectId);
  const resources = getChapterResources(chapter.id);
  const chapterReadingBlocks = getChapterReadingBlocks(chapter, subject, resources);
  const completed = Boolean(getChapterCompletions()[chapter.id]);
  const relatedResourceCount = resources.notes.length + resources.tutorials.length + resources.cheatsheets.length + resources.blog.length;
  return `
    <article class="content-card chapter-card">
      <div class="card-top">
        <span class="card-type">chapter ${escapeHtml(String(chapter.order || 0))}</span>
        <span class="card-meta">${completed ? "Completed" : "In progress"}</span>
      </div>
      <div>
        <h3>${escapeHtml(chapter.title)}</h3>
        <p class="card-excerpt">${escapeHtml(chapter.description)}</p>
      </div>
      <div class="tag-row">
        <span>${escapeHtml(subject?.name || "Subject")}</span>
        <span>${resources.questions.length} practice</span>
        <span>${relatedResourceCount} resources</span>
      </div>
      <div class="card-footer">
        <span class="card-meta">Step ${escapeHtml(String(chapter.order || 0))}</span>
        <a class="card-link" href="${getChapterHref(chapter)}">Open Chapter</a>
      </div>
    </article>
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
      slug: "subjects-page",
      title: "Subjects",
      excerpt: "Browse structured subjects and move chapter by chapter through notes, tutorials, and practice.",
      category: "Learn",
      readTime: "Page",
      tags: ["subjects", "chapters", "learning path"],
      detail: ["Subjects organize notes, tutorials, and interview practice into guided progression."],
      href: "subjects.html"
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
  const subjectEntries = getSubjects().map((item) => ({
    searchType: "subject",
    slug: item.id,
    title: item.name,
    excerpt: item.description,
    category: "Structured path",
    readTime: `${getChaptersBySubject(item.id).length} chapters`,
    tags: ["subject", item.icon || "learning"],
    detail: [item.description],
    href: getSubjectHref(item)
  }));
  const chapterEntries = getChapters().map((item) => {
    const subject = getSubjectById(item.subjectId);
    return {
      searchType: "chapter",
      slug: item.id,
      title: item.title,
      excerpt: item.description,
      category: subject?.name || "Chapter",
      readTime: `Chapter ${item.order}`,
      tags: ["chapter", subject?.name || ""].filter(Boolean),
      detail: [item.description],
      href: getChapterHref(item)
    };
  });

  return [...pageEntries, ...subjectEntries, ...chapterEntries, ...contentEntries, ...interviewEntries];
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
    if (!main.hasAttribute("tabindex")) {
      main.setAttribute("tabindex", "-1");
    }

    if (!document.querySelector(".skip-link")) {
      const skipLink = document.createElement("a");
      skipLink.className = "skip-link";
      skipLink.href = `#${main.id}`;
      skipLink.textContent = "Skip to content";
      skipLink.addEventListener("click", () => {
        window.setTimeout(() => {
          main.focus({ preventScroll: true });
        }, 0);
      });
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

  const recommendedChapter = getRecommendedChapter();
  const collections = getContentCollections();
  const fallbackItems = [
    collections.note[0],
    collections.tutorial[0],
    collections.blog[0]
  ].filter(Boolean);
  const featured = [
    ...(recommendedChapter ? [{
      type: "chapter",
      title: recommendedChapter.title,
      excerpt: recommendedChapter.description,
      readTime: `Chapter ${recommendedChapter.order}`,
      tags: [getSubjectById(recommendedChapter.subjectId)?.name || "Subject", "guided path"],
      category: "Learning path",
      level: "Recommended",
      subjectId: recommendedChapter.subjectId,
      chapterId: recommendedChapter.id,
      slug: recommendedChapter.id,
      href: getChapterHref(recommendedChapter)
    }] : []),
    ...fallbackItems
  ].slice(0, 3);
  target.innerHTML = featured.map((item) => item.type === "chapter"
    ? `
        <article class="content-card">
          <div class="card-top">
            <span class="card-type">chapter</span>
            <span class="card-meta">${escapeHtml(item.readTime)}</span>
          </div>
          <div>
            <h3>${escapeHtml(item.title)}</h3>
            <p class="card-excerpt">${escapeHtml(item.excerpt)}</p>
          </div>
          <div class="tag-row">${item.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
          <div class="card-footer">
            <span class="card-meta">${escapeHtml(item.level)}</span>
            <a class="card-link" href="${escapeHtml(item.href)}">Open</a>
          </div>
        </article>
      `
    : createCard(item)).join("");
}

function renderHomeHeroStats() {
  const tracksStat = document.getElementById("heroTracksStat");
  const projectsStat = document.getElementById("heroProjectsStat");
  const articlesStat = document.getElementById("heroArticlesStat");

  if (!tracksStat || !projectsStat || !articlesStat) {
    return;
  }

  const collections = getContentCollections();
  const totalProjects = collections.project.length;
  const totalArticles = collections.blog.length + collections.note.length + collections.tutorial.length + collections.cheatsheet.length;
  tracksStat.textContent = `${getSubjects().length} focused paths`;
  projectsStat.textContent = `${totalProjects} build briefs`;
  articlesStat.textContent = `${totalArticles} published resources`;
}

function bindSubjectCardGrid(grid) {
  if (!grid) {
    return;
  }

  function getSubjectIdFromEventTarget(target) {
    const card = target.closest("[data-subject-card]");
    if (card?.dataset.subjectCard) {
      return card.dataset.subjectCard;
    }
    const link = target.closest("a[href*='subject.html?subject=']");
    return link ? new URL(link.href, window.location.href).searchParams.get("subject") : "";
  }

  grid.addEventListener("click", (event) => {
    const subjectId = getSubjectIdFromEventTarget(event.target);
    if (!subjectId) {
      return;
    }

    const link = event.target.closest("a[href*='subject.html?subject=']");
    if (link) {
      return;
    }

    const subject = getSubjectById(subjectId);
    if (!subject) {
      return;
    }

    window.location.href = getSubjectHref(subject);
  });

  grid.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    const card = event.target.closest("[data-subject-card]");
    const subjectId = card?.dataset.subjectCard || "";
    const subject = subjectId ? getSubjectById(subjectId) : null;
    if (!subject) {
      return;
    }

    event.preventDefault();
    window.location.href = getSubjectHref(subject);
  });
}

function setupHomeWorkspace() {
  const spotlight = document.getElementById("homeWorkspaceSpotlight");
  const recentTarget = document.getElementById("homeRecentList");
  const subjectGrid = document.getElementById("homeSubjectsGrid");
  const journeyTarget = document.getElementById("homeJourneyCard");
  if (!spotlight || !recentTarget || !subjectGrid || !journeyTarget) {
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
  const recommendedChapter = getRecommendedChapter();
  const recommendedSubject = recommendedChapter ? getSubjectById(recommendedChapter.subjectId) : null;

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

  const subjectCards = getSubjects().slice(0, 6);
  subjectGrid.innerHTML = subjectCards.map(createSubjectCard).join("");
  bindSubjectCardGrid(subjectGrid);

  journeyTarget.innerHTML = recommendedChapter
    ? `
        <p class="eyebrow">Suggested next step</p>
        <h3>${escapeHtml(recommendedChapter.title)}</h3>
        <p>${escapeHtml(recommendedChapter.description)}</p>
        <div class="tag-row">
          <span>${escapeHtml(recommendedSubject?.name || "Subject")}</span>
          <span>${escapeHtml(`Chapter ${recommendedChapter.order}`)}</span>
        </div>
        <div class="hero-actions">
          <a class="button" href="${getChapterHref(recommendedChapter)}">Continue Chapter</a>
          <a class="button button-ghost" href="${recommendedSubject ? getSubjectHref(recommendedSubject) : "subjects.html"}">View Subject</a>
        </div>
      `
    : `
        <p class="eyebrow">Suggested next step</p>
        <h3>Open your first subject</h3>
        <p>Pick a subject path, open chapter one, and use notes plus practice together instead of jumping between random pages.</p>
        <div class="hero-actions">
          <a class="button" href="subjects.html">Browse Subjects</a>
          <a class="button button-ghost" href="dashboard.html">Open Dashboard</a>
        </div>
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
  if (page === "chapter" || page === "subject") {
    return "subjects";
  }

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

function setupSubjectsPage() {
  const searchInput = document.getElementById("subjectSearch");
  const grid = document.getElementById("subjectsGrid");
  const empty = document.getElementById("subjectsEmpty");
  const createLink = document.getElementById("createSubjectShortcut");

  if (!searchInput || !grid || !empty || !createLink) {
    return;
  }

  const subjects = getSubjects();

  function renderGrid() {
    const query = searchInput.value.trim().toLowerCase();
    const filtered = subjects.filter((subject) => {
      const chapterTitles = getChaptersBySubject(subject.id).map((chapter) => chapter.title).join(" ");
      const haystack = `${subject.name} ${subject.description} ${subject.icon || ""} ${chapterTitles}`.toLowerCase();
      return !query || haystack.includes(query);
    });

    grid.innerHTML = filtered.map(createSubjectCard).join("");
    empty.hidden = filtered.length !== 0;
  }

  searchInput.addEventListener("input", renderGrid);
  renderGrid();
  bindSubjectCardGrid(grid);
  createLink.href = "admin.html#subjectStudio";
}

function setupSubjectDetailPage() {
  const params = new URLSearchParams(window.location.search);
  const subjectId = params.get("subject") || "";
  const subject = getSubjectById(subjectId);
  const breadcrumb = document.getElementById("subjectBreadcrumb");
  const title = document.getElementById("subjectDetailTitle");
  const description = document.getElementById("subjectDetailDescription");
  const meta = document.getElementById("subjectDetailMeta");
  const chaptersGrid = document.getElementById("subjectDetailChapters");
  const empty = document.getElementById("subjectDetailEmpty");

  if (!breadcrumb || !title || !description || !meta || !chaptersGrid || !empty) {
    return;
  }

  if (!subject) {
    title.textContent = "Subject not found";
    description.textContent = "Open the subjects page and choose a valid subject.";
    empty.hidden = false;
    chaptersGrid.innerHTML = "";
    breadcrumb.innerHTML = `
      <a href="index.html">Home</a>
      <span>/</span>
      <a href="subjects.html">Subjects</a>
    `;
    return;
  }

  const progress = getSubjectProgressSummary(subject.id);
  const chapters = getChaptersBySubject(subject.id);
  document.title = `TechAmitCode | ${subject.name}`;
  updateMetaContent("meta[name='description']", subject.description);
  updateMetaContent("meta[property='og:title']", `TechAmitCode | ${subject.name}`);
  updateMetaContent("meta[property='og:description']", subject.description);

  breadcrumb.innerHTML = `
    <a href="index.html">Home</a>
    <span>/</span>
    <a href="subjects.html">Subjects</a>
    <span>/</span>
    <span>${escapeHtml(subject.name)}</span>
  `;
  title.textContent = subject.name;
  description.textContent = subject.description;
  meta.innerHTML = `
    <span class="status-pill">${progress.completed}/${chapters.length} completed</span>
    <span class="status-pill">${progress.scorePercent}% best practice</span>
    <a class="button button-ghost button-small" href="admin.html#subjectStudio">Create New Subject</a>
  `;
  chaptersGrid.innerHTML = chapters.map(createChapterCard).join("");
  empty.hidden = chapters.length !== 0;
}

function setupChapterPage() {
  const params = new URLSearchParams(window.location.search);
  const chapterId = params.get("chapter") || "";
  const chapter = getChapterById(chapterId);
  const breadcrumb = document.getElementById("chapterBreadcrumb");
  const title = document.getElementById("chapterTitle");
  const description = document.getElementById("chapterDescription");
  const meta = document.getElementById("chapterMeta");
  const notesTarget = document.getElementById("chapterNotes");
  const tutorialsTarget = document.getElementById("chapterTutorials");
  const cheatsTarget = document.getElementById("chapterCheatsheets");
  const questionsTarget = document.getElementById("chapterQuestions");
  const bookmarkButton = document.getElementById("chapterBookmarkButton");
  const completeButton = document.getElementById("chapterCompleteButton");
  const prevLink = document.getElementById("chapterPrevLink");
  const nextLink = document.getElementById("chapterNextLink");
  const prevLinkBottom = document.getElementById("chapterPrevLinkBottom");
  const nextLinkBottom = document.getElementById("chapterNextLinkBottom");
  const flashcardCard = document.getElementById("chapterFlashcard");
  const flashcardFlip = document.getElementById("chapterFlipFlashcard");
  const flashcardNext = document.getElementById("chapterNextFlashcard");
  const mcqTarget = document.getElementById("chapterMcq");
  const quizCard = document.getElementById("chapterQuizCard");
  const quizReveal = document.getElementById("chapterQuizReveal");
  const quizCorrect = document.getElementById("chapterQuizCorrect");
  const quizWrong = document.getElementById("chapterQuizWrong");
  const flashcardActions = document.getElementById("chapterFlashcardActions");
  const quizActions = document.getElementById("chapterQuizActions");
  const quizProgress = document.getElementById("chapterQuizProgress");
  const quizFeedback = document.getElementById("chapterQuizFeedback");
  const practiceStats = document.getElementById("chapterPracticeStats");
  const practiceSection = document.getElementById("chapterPracticeSection");
  const questionsSection = document.getElementById("chapterQuestionsSection");
  const chapterOutline = document.getElementById("chapterOutline");

  if (!breadcrumb || !title || !description || !meta || !notesTarget || !tutorialsTarget || !cheatsTarget || !questionsTarget || !bookmarkButton || !completeButton || !prevLink || !nextLink || !prevLinkBottom || !nextLinkBottom || !flashcardCard || !flashcardFlip || !flashcardNext || !mcqTarget || !quizCard || !quizReveal || !quizCorrect || !quizWrong || !flashcardActions || !quizActions || !quizProgress || !quizFeedback || !practiceStats || !practiceSection || !questionsSection || !chapterOutline) {
    return;
  }

  if (!chapter) {
    title.textContent = "Chapter not found";
    description.textContent = "Open the subjects page and select a valid chapter.";
    return;
  }

  const subject = getSubjectById(chapter.subjectId);
  const resources = getChapterResources(chapter.id);
  const chapterReadingBlocks = getChapterReadingBlocks(chapter, subject, resources);
  const chapterOrder = getChaptersBySubject(chapter.subjectId);
  const currentIndex = chapterOrder.findIndex((item) => item.id === chapter.id);
  const previousChapter = currentIndex > 0 ? chapterOrder[currentIndex - 1] : null;
  const nextChapter = currentIndex >= 0 && currentIndex < chapterOrder.length - 1 ? chapterOrder[currentIndex + 1] : null;
  const practiceQuestions = resources.questions.slice(0, 5);
  const mcqQuestions = practiceQuestions.filter((item) => Array.isArray(item.options) && item.options.length);
  const primaryReading = resources.notes[0] || resources.blog[0] || null;
  const extraReading = resources.notes.length
    ? resources.notes.slice(1)
    : resources.blog.length > 1
      ? resources.blog.slice(1)
      : [];
  const practiceRecord = getChapterPractice()[chapter.id];
  const completionMap = getChapterCompletions();
  const isCompleted = Boolean(completionMap[chapter.id]);
  const bookmarked = getChapterBookmarks().includes(chapter.id);

  document.title = `TechAmitCode | ${chapter.title}`;
  updateMetaContent("meta[name='description']", chapter.description);
  updateMetaContent("meta[property='og:title']", `TechAmitCode | ${chapter.title}`);
  updateMetaContent("meta[property='og:description']", chapter.description);

  breadcrumb.innerHTML = `
    <a href="index.html">Home</a>
    <span>/</span>
    <a href="${getSubjectHref(subject)}">${escapeHtml(subject?.name || "Subject")}</a>
    <span>/</span>
    <span>${escapeHtml(chapter.title)}</span>
  `;
  title.textContent = chapter.title;
  description.textContent = chapter.description;
  meta.innerHTML = `
    <span class="status-pill">${escapeHtml(subject?.name || "Subject")}</span>
    <span class="status-pill">Chapter ${escapeHtml(String(chapter.order || 0))}</span>
    <span class="status-pill">${resources.questions.length} practice questions</span>
  `;

  const primaryReadingMarkup = primaryReading
    ? `
        <article class="surface chapter-resource-block chapter-resource-block-primary">
          <div class="card-top">
            <span class="card-type">${escapeHtml(primaryReading.type === "blog" ? "primary reading" : primaryReading.type)}</span>
            <span class="card-meta">${escapeHtml(primaryReading.readTime || subject?.name || "Reading")}</span>
          </div>
          <h3>${escapeHtml(primaryReading.title)}</h3>
          ${primaryReading.excerpt ? `<p class="card-excerpt">${escapeHtml(primaryReading.excerpt)}</p>` : ""}
          <div class="article-body">${primaryReading.detailHtml ? formatBody(primaryReading.detailHtml) : formatBody(primaryReading.detail)}</div>
          <div class="card-footer">
            <span class="card-meta">${escapeHtml(getTaxonomyLabel(primaryReading) || primaryReading.category || "Reading")}</span>
            <a class="card-link" href="${getContentHref(primaryReading)}">Open Full ${primaryReading.type === "blog" ? "Post" : "Note"}</a>
          </div>
        </article>
      `
    : "";

  notesTarget.innerHTML = `
      <article class="surface chapter-resource-block chapter-resource-block-lesson">
        <div class="card-top">
          <span class="card-type">chapter lesson</span>
          <span class="card-meta">${escapeHtml(subject?.name || "Learning path")}</span>
        </div>
        <h3>${escapeHtml(`${chapter.title} lesson`)}</h3>
        <div class="article-body">${formatBody(chapterReadingBlocks)}</div>
      </article>
      ${primaryReadingMarkup}
      ${extraReading.length
        ? extraReading.map((item) => `
        <article class="surface chapter-resource-block">
          <div class="card-top">
            <span class="card-type">${escapeHtml(item.type)}</span>
            <span class="card-meta">${escapeHtml(item.readTime)}</span>
          </div>
          <h3>${escapeHtml(item.title)}</h3>
          <div class="article-body">${item.detailHtml ? formatBody(item.detailHtml) : formatBody(item.detail)}</div>
          <div class="card-footer">
            <span class="card-meta">${escapeHtml(item.category)}</span>
            <a class="card-link" href="${getContentHref(item)}">Open Full Note</a>
          </div>
        </article>
      `).join("")
        : ""}
    `;

  const supportResources = [...resources.tutorials, ...resources.blog.filter((item) => item.slug !== primaryReading?.slug)];
  tutorialsTarget.innerHTML = supportResources.length
    ? supportResources.map(createResourceLink).join("")
    : "<p class=\"empty-state\">This chapter has no extra support links yet. Add tutorials or blog posts from the editor to expand it.</p>";

  cheatsTarget.innerHTML = resources.cheatsheets.length
    ? resources.cheatsheets.map((item) => `
        <article class="surface chapter-resource-block">
          <div class="card-top">
            <span class="card-type">cheatsheet</span>
            <span class="card-meta">${escapeHtml(item.readTime)}</span>
          </div>
          <h3>${escapeHtml(item.title)}</h3>
          <p class="card-excerpt">${escapeHtml(item.excerpt)}</p>
          ${item.code ? `<pre class="code-block">${escapeHtml(item.code)}</pre>` : ""}
          <div class="card-footer">
            <span class="card-meta">${escapeHtml(item.category)}</span>
            <a class="card-link" href="${getContentHref(item)}">Open Sheet</a>
          </div>
        </article>
      `).join("")
    : "<p class=\"empty-state\">No quick cheat sheet is linked to this chapter yet.</p>";

  questionsTarget.innerHTML = resources.questions.length
    ? resources.questions.map((item) => `
        <article class="question-card" data-question-card="${escapeHtml(item.slug)}">
          <div class="question-head">
            <div>
              <span class="card-type">${escapeHtml(item.category)}</span>
              <h3>${escapeHtml(item.question)}</h3>
              <p class="card-excerpt">${escapeHtml(item.excerpt)}</p>
            </div>
            <div class="question-actions">
              <button class="button button-ghost button-small" type="button" data-question-toggle="${escapeHtml(item.slug)}">Show Answer</button>
              <button class="button button-ghost button-small" type="button" data-question-revise="${escapeHtml(item.slug)}">Mark Revised</button>
            </div>
          </div>
          <div class="tag-row">${item.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
          <div class="question-answer" id="answer-${escapeHtml(item.slug)}" hidden>
            ${Array.isArray(item.options) && item.options.length ? renderInterviewOptions(item.options, item.correctOption) : ""}
            ${item.answer.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
            ${item.code ? `<pre class="code-block">${escapeHtml(item.code)}</pre>` : ""}
          </div>
        </article>
      `).join("")
    : "<p class=\"empty-state\">No practice questions are linked to this chapter yet.</p>";

  const outlineItems = [
    { title: "Lesson overview", meta: "Chapter summary and guided notes" },
    primaryReading ? { title: primaryReading.title, meta: `${primaryReading.type === "blog" ? "Primary post" : "Primary note"} to read next` } : null,
    supportResources.length ? { title: "Support resources", meta: `${supportResources.length} extra link${supportResources.length === 1 ? "" : "s"} for deeper study` } : null,
    resources.cheatsheets.length ? { title: "Cheat sheet", meta: `${resources.cheatsheets.length} quick reference attached` } : null,
    practiceQuestions.length || mcqQuestions.length ? { title: "Practice drills", meta: `${Math.max(practiceQuestions.length, mcqQuestions.length)} self-check prompt${Math.max(practiceQuestions.length, mcqQuestions.length) === 1 ? "" : "s"}` } : null,
    resources.questions.length ? { title: "Interview questions", meta: `${resources.questions.length} mapped question${resources.questions.length === 1 ? "" : "s"}` } : null
  ].filter(Boolean);
  chapterOutline.innerHTML = outlineItems.map((item, index) => `
    <article class="chapter-outline-item">
      <span class="chapter-outline-step">${String(index + 1).padStart(2, "0")}</span>
      <div>
        <strong>${escapeHtml(item.title)}</strong>
        <p>${escapeHtml(item.meta)}</p>
      </div>
    </article>
  `).join("");

  practiceSection.hidden = !practiceQuestions.length && !mcqQuestions.length;
  questionsSection.hidden = !resources.questions.length;

  questionsTarget.addEventListener("click", (event) => {
    const toggleButton = event.target.closest("[data-question-toggle]");
    const reviseButton = event.target.closest("[data-question-revise]");

    if (toggleButton) {
      const slug = toggleButton.dataset.questionToggle;
      const answer = document.getElementById(`answer-${slug}`);
      if (!answer) {
        return;
      }
      const hidden = answer.hasAttribute("hidden");
      answer.toggleAttribute("hidden");
      toggleButton.textContent = hidden ? "Hide Answer" : "Show Answer";
      return;
    }

    if (reviseButton) {
      const slug = reviseButton.dataset.questionRevise;
      markProgress("revised", `interview:${slug}`);
      reviseButton.textContent = "Revised";
      reviseButton.classList.add("is-success");
      showNotification("Question saved to revision progress.", "success");
    }
  });

  bookmarkButton.textContent = bookmarked ? "Bookmarked" : "Bookmark Chapter";
  completeButton.textContent = isCompleted ? "Completed" : "Mark as Completed";

  bookmarkButton.addEventListener("click", () => {
    const saved = toggleChapterBookmark(chapter.id);
    bookmarkButton.textContent = saved ? "Bookmarked" : "Bookmark Chapter";
    showNotification(saved ? "Chapter bookmarked." : "Chapter bookmark removed.", saved ? "success" : "info");
  });

  completeButton.addEventListener("click", () => {
    markChapterCompleted(chapter.id);
    completeButton.textContent = "Completed";
    showNotification("Chapter marked as completed.", "success");
  });

  prevLink.href = previousChapter ? getChapterHref(previousChapter) : getSubjectHref(subject);
  prevLink.textContent = previousChapter ? `Previous: ${previousChapter.title}` : "Back to Subject";
  nextLink.href = nextChapter ? getChapterHref(nextChapter) : getSubjectHref(subject);
  nextLink.textContent = nextChapter ? `Next: ${nextChapter.title}` : "View Subject Overview";
  prevLinkBottom.href = prevLink.href;
  prevLinkBottom.textContent = prevLink.textContent;
  nextLinkBottom.href = nextLink.href;
  nextLinkBottom.textContent = nextLink.textContent;

  let flashIndex = 0;
  let flashReveal = false;
  function renderFlashcard() {
    const item = practiceQuestions[flashIndex];
    if (!item) {
      flashcardCard.innerHTML = "<p class=\"empty-state\">Flashcards will appear here after you add chapter questions.</p>";
      return;
    }
    flashcardCard.innerHTML = flashReveal
      ? `<p class="eyebrow">Answer</p><h3>${escapeHtml(item.answer?.[0] || "No answer yet.")}</h3><p>${escapeHtml(item.question)}</p>`
      : `<p class="eyebrow">Question</p><h3>${escapeHtml(item.question)}</h3><p>Use flip to reveal the quick answer.</p>`;
  }

  flashcardFlip.addEventListener("click", () => {
    flashReveal = !flashReveal;
    renderFlashcard();
  });
  flashcardNext.addEventListener("click", () => {
    flashIndex = practiceQuestions.length ? (flashIndex + 1) % practiceQuestions.length : 0;
    flashReveal = false;
    renderFlashcard();
  });
  renderFlashcard();
  flashcardActions.hidden = !practiceQuestions.length;

  mcqTarget.innerHTML = mcqQuestions.length
    ? mcqQuestions.map((item) => `
        <article class="surface chapter-resource-block">
          <p class="eyebrow">MCQ</p>
          <h3>${escapeHtml(item.question)}</h3>
          ${renderInteractiveInterviewOptions(item)}
        </article>
      `).join("")
    : "<p class=\"empty-state\">MCQ practice will appear here after you publish MCQ-style interview questions for this chapter.</p>";

  mcqTarget.addEventListener("click", (event) => {
    const button = event.target.closest("[data-question-option]");
    if (!button) {
      return;
    }
    const slug = button.dataset.questionOption;
    const optionKey = button.dataset.optionKey;
    const question = mcqQuestions.find((item) => item.slug === slug);
    const feedback = document.getElementById(`mcq-feedback-${slug}`);
    const buttons = mcqTarget.querySelectorAll(`[data-question-option="${slug}"]`);
    buttons.forEach((item) => {
      item.classList.toggle("is-correct", item.dataset.optionKey === question?.correctOption);
      item.classList.toggle("is-selected", item === button);
      item.classList.toggle("is-wrong", item === button && optionKey !== question?.correctOption);
    });
    if (feedback && question) {
      feedback.hidden = false;
      feedback.textContent = optionKey === question.correctOption
        ? "Correct. Nice recall."
        : `Not quite. Correct answer: ${question.correctOption || "See explanation"}.`;
      feedback.dataset.state = optionKey === question.correctOption ? "success" : "error";
    }
  });

  let quizIndex = 0;
  let quizScore = 0;
  let revealed = false;
  function finishQuiz() {
    const result = saveChapterPracticeResult(chapter.id, quizScore, practiceQuestions.length);
    quizFeedback.textContent = `Quiz finished. You marked ${quizScore}/${practiceQuestions.length}. Best score: ${result.bestScore}/${result.total}.`;
    quizFeedback.dataset.state = "success";
  }
  function renderQuiz() {
    const item = practiceQuestions[quizIndex];
    if (!item) {
      quizCard.innerHTML = "<p class=\"empty-state\">Quick quiz will appear here after you add chapter questions.</p>";
      quizProgress.textContent = "0 / 0";
      return;
    }
    quizProgress.textContent = `Question ${quizIndex + 1} of ${practiceQuestions.length}`;
    quizCard.innerHTML = `
      <h3>${escapeHtml(item.question)}</h3>
      <p class="card-excerpt">${escapeHtml(item.excerpt || "Try to answer from memory before revealing the model answer.")}</p>
      ${revealed ? item.answer.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("") : "<p class=\"eyebrow\">Reveal the answer only after self-testing.</p>"}
    `;
  }
  quizReveal.addEventListener("click", () => {
    revealed = true;
    renderQuiz();
  });
  function advanceQuiz(correct) {
    if (!practiceQuestions.length) {
      return;
    }
    if (correct) {
      quizScore += 1;
    }
    if (quizIndex >= practiceQuestions.length - 1) {
      finishQuiz();
      revealed = true;
      renderQuiz();
      return;
    }
    quizIndex += 1;
    revealed = false;
    renderQuiz();
  }
  quizCorrect.addEventListener("click", () => advanceQuiz(true));
  quizWrong.addEventListener("click", () => advanceQuiz(false));
  renderQuiz();
  quizActions.hidden = !practiceQuestions.length;

  practiceStats.innerHTML = `
    <span class="status-pill">${practiceRecord ? `${practiceRecord.bestScore}/${practiceRecord.total} best score` : "No quiz attempts yet"}</span>
    <span class="status-pill">${practiceRecord ? `${practiceRecord.attempts} attempts` : "0 attempts"}</span>
  `;
}

function populateSubjectChapterControls(subjectSelect, chapterSelect, selectedSubjectId = "", selectedChapterId = "") {
  if (!subjectSelect || !chapterSelect) {
    return;
  }

  const subjects = getSubjects();
  subjectSelect.innerHTML = `
    <option value="">Unassigned</option>
    ${subjects.map((subject) => `<option value="${escapeHtml(subject.id)}">${escapeHtml(subject.name)}</option>`).join("")}
  `;
  subjectSelect.value = selectedSubjectId || "";

  const activeSubjectId = subjectSelect.value || selectedSubjectId || "";
  const chapters = activeSubjectId ? getChaptersBySubject(activeSubjectId) : [];
  chapterSelect.innerHTML = `
    <option value="">No chapter</option>
    ${chapters.map((chapter) => `<option value="${escapeHtml(chapter.id)}">${escapeHtml(`Chapter ${chapter.order}: ${chapter.title}`)}</option>`).join("")}
  `;
  chapterSelect.value = selectedChapterId || "";
}

function syncSubjectFromCategory(categoryValue, subjectSelect, chapterSelect) {
  if (!subjectSelect || !chapterSelect) {
    return;
  }

  const mapping = categorySubjectDefaults[categoryValue] || null;
  if (!mapping) {
    return;
  }

  populateSubjectChapterControls(subjectSelect, chapterSelect, mapping.subjectId, mapping.chapterId);
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
  const previewChecklist = document.getElementById("previewChecklist");
  const previewChecklistTitle = document.getElementById("previewChecklistTitle");
  const contentEditor = document.getElementById("postContentEditor");
  const modeBadge = document.getElementById("editorModeBadge");
  const previewWordCount = document.getElementById("previewWordCount");
  const previewParagraphCount = document.getElementById("previewParagraphCount");
  const helper = document.getElementById("editorHelper");
  const toolbarButtons = Array.from(document.querySelectorAll("[data-editor-tool]"));
  const fontSelect = document.getElementById("editorFontSelect");
  const colorInput = document.getElementById("editorColorInput");
  const imageUploadInput = document.getElementById("editorImageUpload");
  const editorInterviewFields = document.getElementById("editorInterviewFields");
  const titleLabel = document.getElementById("postTitleLabel");
  const readTimeLabel = document.getElementById("postReadTimeLabel");
  const tagsLabel = document.getElementById("postTagsLabel");
  const excerptLabel = document.getElementById("postExcerptLabel");
  const bodyEyebrow = document.getElementById("editorBodyEyebrow");
  const bodyHeading = document.getElementById("editorBodyHeading");
  const contentLabel = document.getElementById("postContentLabel");
  const articleOnlyFields = document.getElementById("articleOnlyFields");
  const codeField = document.getElementById("postCodeField");
  const codeLabel = document.getElementById("postCodeLabel");
  const templateTools = document.getElementById("editorTemplateTools");
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
    subjectId: document.getElementById("postSubjectInput"),
    chapterId: document.getElementById("postChapterInput"),
    chapterTitle: document.getElementById("postChapterTitleInput"),
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
  let savedSelection = null;

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
      editorInterviewFields.style.display = isInterview ? "" : "none";
    }
    if (articleOnlyFields) {
      articleOnlyFields.hidden = isInterview;
      articleOnlyFields.style.display = isInterview ? "none" : "";
    }
    Object.values(interviewFields).forEach((field) => {
      if (field) {
        field.disabled = !isInterview;
      }
    });
    if (fields.readTime) {
      fields.readTime.disabled = isInterview;
      fields.readTime.required = !isInterview;
    }
    if (fields.tags) {
      fields.tags.disabled = isInterview;
    }
    if (fields.excerpt) {
      fields.excerpt.disabled = isInterview;
      fields.excerpt.required = !isInterview;
    }
    if (titleLabel) {
      titleLabel.textContent = isInterview ? "Question" : "Title";
    }
    if (readTimeLabel) {
      readTimeLabel.textContent = isInterview ? "Read time" : "Read time";
    }
    if (tagsLabel) {
      tagsLabel.textContent = isInterview ? "Topics / tags" : "Tags";
    }
    if (excerptLabel) {
      excerptLabel.textContent = isInterview ? "Question summary" : "Excerpt";
    }
    if (bodyEyebrow) {
      bodyEyebrow.textContent = isInterview ? "Answer" : "Body";
    }
    if (bodyHeading) {
      bodyHeading.textContent = isInterview ? "Write the model answer" : "Write the main post";
    }
    if (contentLabel) {
      contentLabel.textContent = isInterview ? "Answer content" : "Main content";
    }
    if (templateTools) {
      templateTools.hidden = isInterview;
      templateTools.style.display = isInterview ? "none" : "";
    }
    if (codeLabel) {
      codeLabel.textContent = isInterview ? "Code example (optional)" : "Code example";
    }
    if (codeField) {
      codeField.hidden = isInterview;
      codeField.style.display = isInterview ? "none" : "";
    }
    if (fields.title) {
      fields.title.placeholder = isInterview
        ? "Example: What is event delegation in JavaScript?"
        : "Example: How I built a reusable card system";
    }
    if (fields.excerpt) {
      fields.excerpt.placeholder = isInterview
        ? "Write a short prompt or what the interviewer expects."
        : "Write a sharp summary for cards, previews, and readers.";
    }
    if (contentEditor) {
      contentEditor.dataset.placeholder = isInterview
        ? "Write the ideal answer clearly, then add one example or common interview follow-up."
        : "Open with a strong setup, build the idea clearly, then close with the practical takeaway.";
    }
    if (fields.code) {
      fields.code.placeholder = isInterview
        ? "Optional code example for the answer"
        : "Optional code snippet";
    }
    if (helper) {
      helper.textContent = isInterview
        ? "Question mode me title question hoga, main content answer hoga, aur niche MCQ options optional rahenge."
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
    return sanitizeEditorHtml((contentEditor?.innerHTML || "")
      .replace(/<div><br><\/div>/g, "<p><br></p>")
      .trim());
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

    contentEditor.innerHTML = sanitizeEditorHtml((html || "").trim());
    syncEditorField();
  }

  function getDraftValue() {
    const html = getEditorHtml();
    const options = getInterviewOptionsFromEditor();
    const plainText = extractPlainTextFromHtml(html);
    const resolvedSubjectId = fields.subjectId?.value || getCategoryTaxonomyAssignment(fields.category.value)?.subjectId || "";
    const fallbackInterviewExcerpt = plainText
      ? `${plainText.slice(0, 140)}${plainText.length > 140 ? "..." : ""}`
      : "";
    return {
      type: fields.type.value,
      subjectId: resolvedSubjectId,
      chapterId: fields.chapterId?.value || "",
      chapterTitle: fields.chapterTitle?.value.trim() || "",
      title: fields.title.value.trim(),
      category: fields.category.value,
      readTime: fields.type.value === "interview" ? "" : fields.readTime.value.trim(),
      tags: fields.tags.value.split(",").map((tag) => tag.trim()).filter(Boolean),
      excerpt: fields.type.value === "interview" ? fallbackInterviewExcerpt : fields.excerpt.value.trim(),
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
    populateSubjectChapterControls(fields.subjectId, fields.chapterId, draft.subjectId || "", draft.chapterId || "");
    if (fields.chapterTitle) {
      fields.chapterTitle.value = draft.chapterTitle || "";
    }
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
    previewMeta.textContent = draft.type === "interview"
      ? [draft.category, draft.level, getTaxonomyLabel(draft)].filter(Boolean).join(" - ") || "Interview question"
      : [draft.type, draft.category, draft.readTime, getTaxonomyLabel(draft)].filter(Boolean).join(" - ") || typeLabel;
    previewExcerpt.textContent = draft.excerpt || "Your excerpt will appear here.";
    previewTags.innerHTML = draft.tags.length ? draft.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("") : "";
    previewContent.innerHTML = draft.content
      ? `${draft.type === "interview" && draft.options.length ? renderInterviewOptions(draft.options, draft.correctOption) : ""}${formatBody(draft.content)}`
      : "<p>Start typing to preview your article body.</p>";
    if (previewCode) {
      const showCodePreview = draft.type !== "interview" && Boolean(draft.code);
      previewCode.hidden = !showCodePreview;
      previewCode.textContent = draft.code || "Optional code example preview";
    }
    if (previewChecklistTitle) {
      previewChecklistTitle.textContent = draft.type === "interview" ? "Question checklist" : "Publishing checklist";
    }
    if (previewChecklist) {
      previewChecklist.innerHTML = draft.type === "interview"
        ? `
          <li>Write a clear interview question title</li>
          <li>Add a direct answer in the answer section</li>
          <li>Fill MCQ options only if this should be a quiz question</li>
          <li>Select the correct option before publishing an MCQ</li>
        `
        : `
          <li>Add a title that reads like a finished post</li>
          <li>Write a short excerpt for cards and previews</li>
          <li>Use tags so the post is easier to find later</li>
          <li>Include code only when it clarifies the idea</li>
        `;
    }
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
          ? "Question mode turns the title into the question and the main content into the model answer."
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
        ${getTaxonomyLabel(entry) ? `<p class="card-meta card-path">${escapeHtml(getTaxonomyLabel(entry))}</p>` : ""}
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
      subjectId: entry.subjectId || "",
      chapterId: entry.chapterId || "",
      chapterTitle: getChapterById(entry.chapterId || "")?.title || "",
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

  function isRangeInsideEditor(range) {
    if (!contentEditor || !range) {
      return false;
    }

    const ancestor = range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE
      ? range.commonAncestorContainer
      : range.commonAncestorContainer.parentNode;
    return Boolean(ancestor && contentEditor.contains(ancestor));
  }

  function captureEditorSelection() {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      return;
    }

    const range = selection.getRangeAt(0);
    if (isRangeInsideEditor(range)) {
      savedSelection = range.cloneRange();
    }
  }

  function restoreEditorSelection() {
    if (!contentEditor) {
      return false;
    }

    contentEditor.focus();
    const selection = window.getSelection();
    if (!selection) {
      return false;
    }

    if (savedSelection && isRangeInsideEditor(savedSelection)) {
      selection.removeAllRanges();
      selection.addRange(savedSelection);
      return true;
    }

    const range = document.createRange();
    range.selectNodeContents(contentEditor);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
    savedSelection = range.cloneRange();
    return true;
  }

  function getSelectedText() {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      return "";
    }

    const range = selection.getRangeAt(0);
    if (!isRangeInsideEditor(range)) {
      return "";
    }

    return selection.toString().trim();
  }

  function getEditorRange() {
    restoreEditorSelection();
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      return null;
    }

    const range = selection.getRangeAt(0);
    return isRangeInsideEditor(range) ? range : null;
  }

  function placeCaretAfter(node) {
    const selection = window.getSelection();
    if (!selection) {
      return;
    }

    const range = document.createRange();
    range.setStartAfter(node);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
    savedSelection = range.cloneRange();
  }

  function insertNodeAtSelection(node) {
    const range = getEditorRange();
    if (!range) {
      return false;
    }

    range.deleteContents();
    range.insertNode(node);
    placeCaretAfter(node);
    syncEditorField();
    updatePreview();
    return true;
  }

  function insertImageFigure(src, altText = "") {
    const figure = document.createElement("figure");
    figure.className = "article-image";
    const image = document.createElement("img");
    image.src = src;
    image.alt = altText || "Article image";
    figure.append(image);
    if (altText) {
      const caption = document.createElement("figcaption");
      caption.textContent = altText;
      figure.append(caption);
    }
    insertNodeAtSelection(figure);
  }

  function openLocalImagePicker() {
    if (imageUploadInput) {
      imageUploadInput.value = "";
      imageUploadInput.click();
    }
  }

  function wrapSelectionWithInline(className, fallbackText) {
    const range = getEditorRange();
    if (!range) {
      return;
    }

    if (range.collapsed) {
      const text = fallbackText || "";
      if (!text) {
        return;
      }
      const span = document.createElement("span");
      span.className = className;
      span.textContent = text;
      insertNodeAtSelection(span);
      return;
    }

    const span = document.createElement("span");
    span.className = className;
    span.append(range.extractContents());
    range.insertNode(span);
    placeCaretAfter(span);
    syncEditorField();
    updatePreview();
  }

  function insertCodeAtSelection() {
    const range = getEditorRange();
    if (!range) {
      return;
    }

    if (range.collapsed) {
      const text = window.prompt("Enter the code text", "const answer = 42;");
      if (!text) {
        return;
      }
      const span = document.createElement("span");
      span.className = "rich-mono";
      span.textContent = text;
      insertNodeAtSelection(span);
      return;
    }

    const span = document.createElement("span");
    span.className = "rich-mono";
    span.append(range.extractContents());
    range.insertNode(span);
    placeCaretAfter(span);
    syncEditorField();
    updatePreview();
  }

  function insertHtmlAtCursor(html) {
    if (!contentEditor) {
      return;
    }

    restoreEditorSelection();
    document.execCommand("insertHTML", false, html);
    captureEditorSelection();
    syncEditorField();
    updatePreview();
  }

  function applyEditorTool(tool) {
    if (!contentEditor) {
      return;
    }

    restoreEditorSelection();

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
          const range = getEditorRange();
          if (!range) {
            break;
          }
          const url = window.prompt("Enter the link URL", "https://example.com");
          const safeUrl = sanitizeUrl(url, { allowHash: true });
          if (safeUrl) {
            if (!range.collapsed) {
              const anchor = document.createElement("a");
              anchor.href = safeUrl;
              anchor.target = "_blank";
              anchor.rel = "noreferrer";
              anchor.append(range.extractContents());
              range.insertNode(anchor);
              placeCaretAfter(anchor);
              syncEditorField();
              updatePreview();
            } else {
              const label = window.prompt("Enter the link text", "Read more");
              if (label) {
                const anchor = document.createElement("a");
                anchor.href = safeUrl;
                anchor.target = "_blank";
                anchor.rel = "noreferrer";
                anchor.textContent = label;
                insertNodeAtSelection(anchor);
              }
            }
          }
        }
        break;
      case "image":
        {
          const useLocal = window.confirm("Local image import karna hai? OK = local file, Cancel = image URL");
          if (useLocal) {
            openLocalImagePicker();
          } else {
            const url = window.prompt("Paste the image URL", "https://images.example.com/photo.jpg");
            const alt = window.prompt("Add a short caption", "Article image");
            const safeUrl = sanitizeUrl(url);
            if (safeUrl) {
              insertImageFigure(safeUrl, alt || "");
            }
          }
        }
        break;
      case "accent":
        wrapSelectionWithInline("rich-accent", "Accent text");
        break;
      case "highlight":
        wrapSelectionWithInline("rich-highlight", "Highlighted text");
        break;
      case "serif":
        wrapSelectionWithInline("rich-serif", "Editorial text");
        break;
      case "mono":
        insertCodeAtSelection();
        break;
      default:
        break;
    }

    captureEditorSelection();
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
    document.addEventListener("selectionchange", captureEditorSelection);
    ["keyup", "mouseup", "focus", "blur"].forEach((eventName) => {
      contentEditor.addEventListener(eventName, captureEditorSelection);
    });
    contentEditor.addEventListener("input", () => {
      syncEditorField();
      updatePreview();
      scheduleAutosave();
      captureEditorSelection();
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
    button.addEventListener("mousedown", (event) => {
      event.preventDefault();
      restoreEditorSelection();
    });
    button.addEventListener("click", () => {
      applyEditorTool(button.dataset.editorTool || "");
    });
  });

  if (fontSelect) {
    fontSelect.addEventListener("change", () => {
      if (fontSelect.value && contentEditor) {
        restoreEditorSelection();
        document.execCommand("fontName", false, fontSelect.value);
        captureEditorSelection();
        syncEditorField();
        updatePreview();
      }
    });
  }

  if (colorInput) {
    colorInput.addEventListener("input", () => {
      if (contentEditor) {
        restoreEditorSelection();
        document.execCommand("foreColor", false, colorInput.value);
        captureEditorSelection();
        syncEditorField();
        updatePreview();
      }
    });
  }

  if (imageUploadInput) {
    imageUploadInput.addEventListener("change", () => {
      const file = imageUploadInput.files?.[0];
      if (!file) {
        return;
      }

      if (!file.type.startsWith("image/")) {
        setInlineMessage(message, "Please choose a valid image file.", "error");
        return;
      }

      const reader = new FileReader();
      const altText = window.prompt("Add a short caption", file.name.replace(/\.[^.]+$/, "")) || "";
      reader.addEventListener("load", () => {
        const result = typeof reader.result === "string"
          ? sanitizeUrl(reader.result, { allowImageData: true })
          : "";
        if (!result) {
          setInlineMessage(message, "This image could not be imported.", "error");
          return;
        }

        insertImageFigure(result, altText);
        setInlineMessage(message, "Local image inserted into the editor.", "success");
      });
      reader.addEventListener("error", () => {
        setInlineMessage(message, "Image import failed on this device.", "error");
      });
      reader.readAsDataURL(file);
    });
  }

  clearDraftButton.addEventListener("click", () => {
    const wasEditing = Boolean(editingContext);
    form.reset();
    populateSubjectChapterControls(fields.subjectId, fields.chapterId);
    localStorage.removeItem(STORAGE_KEYS.draft);
    setEditorHtml("");
    resetEditingContext();
    updatePreview();
    setInlineMessage(message, wasEditing ? "Edit mode cancelled." : "Draft cleared.", "info");
  });

  fields.subjectId?.addEventListener("change", () => {
    populateSubjectChapterControls(fields.subjectId, fields.chapterId, fields.subjectId.value, "");
    scheduleAutosave();
    updatePreview();
  });

  fields.category?.addEventListener("change", () => {
    const mapping = getCategoryTaxonomyAssignment(fields.category.value);
    populateSubjectChapterControls(fields.subjectId, fields.chapterId, mapping?.subjectId || "", "");
    scheduleAutosave();
    updatePreview();
  });

  fields.chapterId?.addEventListener("change", () => {
    if (fields.chapterTitle) {
      fields.chapterTitle.value = getChapterById(fields.chapterId.value || "")?.title || fields.chapterTitle.value || "";
    }
    scheduleAutosave();
    updatePreview();
  });

  fields.chapterTitle?.addEventListener("input", () => {
    scheduleAutosave();
    updatePreview();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const draft = getDraftValue();
    const isEditing = Boolean(editingContext);
    if (!extractPlainTextFromHtml(draft.content)) {
      setInlineMessage(message, "Main content likho before publishing.", "error");
      return;
    }
    if (draft.type === "interview" && draft.options.length && !draft.correctOption) {
      setInlineMessage(message, "Select the correct option before publishing the MCQ question.", "error");
      return;
    }
    const chapterResult = draft.type === "interview"
      ? { chapterId: draft.chapterId, chapter: draft.chapterId ? getChapterById(draft.chapterId) : null, created: false }
      : ensureSubjectChapter(draft.subjectId, draft.chapterId, draft.chapterTitle || draft.title, {
          idSeed: draft.chapterTitle || draft.title,
          description: draft.excerpt || draft.title || "Auto-created chapter from editor."
        });
    const post = {
      type: draft.type,
      slug: slugify(draft.title || editingContext?.slug || `post-${Date.now()}`, `post-${Date.now()}`),
      subjectId: draft.subjectId,
      chapterId: chapterResult.chapterId,
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
    populateSubjectChapterControls(fields.subjectId, fields.chapterId, draft.subjectId, post.chapterId);
    if (fields.chapterTitle) {
      fields.chapterTitle.value = chapterResult.chapter?.title || draft.chapterTitle || "";
    }
    saveJson(STORAGE_KEYS.draft, {
      ...draft,
      chapterId: post.chapterId,
      chapterTitle: chapterResult.chapter?.title || draft.chapterTitle || "",
      slug: post.slug,
      status: "published",
      editing: editingContext
    });
    renderLocalPosts();
    setInlineMessage(message, isEditing
      ? "Local resource updated successfully."
      : draft.type === "note"
        ? "Note published into the local notes workflow."
      : draft.type === "interview"
          ? "Interview question published into the interview workflow."
          : chapterResult.created
            ? `Post published and ${chapterResult.chapter?.title || "new chapter"} created.`
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
  populateSubjectChapterControls(fields.subjectId, fields.chapterId);
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
  const relatedTitle = document.getElementById("relatedTitle");
  const detailContextNote = document.getElementById("detailContextNote");
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
    getTaxonomyLabel(item),
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

  const backLinkMap = {
    blog: "blog.html",
    note: "notes.html",
    tutorial: "tutorials.html",
    project: "projects.html",
    cheatsheet: "cheatsheets.html",
    interview: "interview.html"
  };
  const relatedChapter = item.chapterId ? getChapterById(item.chapterId) : null;
  const relatedSubject = item.subjectId ? getSubjectById(item.subjectId) : null;
  if (relatedChapter) {
    backLink.href = getChapterHref(relatedChapter);
    backLink.textContent = "Back to chapter";
  } else if (relatedSubject) {
    backLink.href = getSubjectHref(relatedSubject);
    backLink.textContent = "Back to subject";
  } else {
    backLink.href = backLinkMap[item.type] || "blog.html";
    backLink.textContent = "Back to listing";
  }

  const relatedPool = getAllContent().filter((entry) => entry.slug !== item.slug);
  const relatedEntries = relatedPool.filter((entry) => {
    if (item.chapterId) {
      return entry.chapterId === item.chapterId;
    }
    if (item.subjectId) {
      return entry.subjectId === item.subjectId;
    }
    return entry.type === item.type;
  }).slice(0, 3);
  if (relatedTitle) {
    relatedTitle.textContent = relatedChapter
      ? "More from this chapter"
      : relatedSubject
        ? `More from ${relatedSubject.name}`
        : "Related resources";
  }
  relatedList.innerHTML = relatedEntries.length
    ? relatedEntries.map(createResourceLink).join("")
    : "<p class=\"empty-state\">No related resources yet.</p>";
  if (detailContextNote) {
    const contextBits = [
      relatedSubject ? `<span class="status-pill">${escapeHtml(relatedSubject.name)}</span>` : "",
      relatedChapter ? `<span class="status-pill">${escapeHtml(relatedChapter.title)}</span>` : "",
      item.readTime ? `<span class="status-pill">${escapeHtml(item.readTime)}</span>` : "",
      item.level ? `<span class="status-pill">${escapeHtml(item.level)}</span>` : ""
    ].filter(Boolean).join("");
    detailContextNote.innerHTML = `
      <div class="detail-context-pills">${contextBits || `<span class="status-pill">${escapeHtml(item.type)}</span>`}</div>
      <p>${escapeHtml(
        relatedChapter
          ? "This resource is linked to a chapter, so comments and related links stay grouped around the same lesson."
          : relatedSubject
            ? "This resource belongs to a subject path, so the sidebar keeps you inside the same learning track."
            : "This standalone resource supports local bookmarks and comments to simulate a production reading workflow."
      )}</p>
    `;
  }

  setupBookmark(item, bookmarkButton);
  setupComments(item);

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

function setupComments(item) {
  const form = document.getElementById("commentForm");
  const list = document.getElementById("commentList");
  const message = document.getElementById("commentMessage");
  const nameInput = document.getElementById("commentName");
  const textInput = document.getElementById("commentText");
  const countLabel = document.getElementById("commentCountLabel");
  const commentKey = `${item.type}:${item.slug}`;

  if (!form || !list || !message || !nameInput || !textInput) {
    return;
  }

  function render() {
    const allComments = getComments();
    const comments = allComments[commentKey] || allComments[item.slug] || [];
    if (countLabel) {
      countLabel.textContent = `${comments.length} comment${comments.length === 1 ? "" : "s"}`;
    }
    list.innerHTML = comments.length
      ? comments.map((comment) => `
          <article class="comment-item">
            <div class="comment-item-head">
              <strong>${escapeHtml(comment.name)}</strong>
              <span>${escapeHtml(formatCommentTime(comment.createdAt))}</span>
            </div>
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
    const comments = allComments[commentKey] || allComments[item.slug] || [];
    comments.unshift({ name, text, createdAt: new Date().toISOString() });
    allComments[commentKey] = comments;
    if (item.slug in allComments && item.slug !== commentKey) {
      delete allComments[item.slug];
    }
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

function formatCommentTime(value) {
  if (!value) {
    return "Just now";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return "Just now";
  }

  return parsed.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
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
  const nextChapterTarget = document.getElementById("dashboardNextChapter");
  const subjectProgressTarget = document.getElementById("dashboardSubjectProgress");
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

  if (!stats || !bookmarksTarget || !recentTarget || !revisionTarget || !questionTarget || !progressBars || !streakTarget || !rewardsTarget || !leaderboardTarget || !nextChapterTarget || !subjectProgressTarget || !profileForm || !profileNameInput || !profileGoalInput || !profileMessage || !plannerGrid || !providerForm || !providerSelect || !providerUrl || !providerKey || !providerMessage) {
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
    { label: "Copied", value: String(Object.keys(progress.copied || {}).length) },
    { label: "Chapters", value: String(Object.keys(getChapterCompletions()).length) }
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
  const nextChapter = getRecommendedChapter();
  const nextSubject = nextChapter ? getSubjectById(nextChapter.subjectId) : null;
  questionTarget.innerHTML = `
    <p class="eyebrow">Daily practice</p>
    <h2>${escapeHtml(daily.question)}</h2>
    <p>${escapeHtml(daily.answer[0])}</p>
    <div class="tag-row">${daily.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
  `;

  const subjectProgress = getSubjects().map((subject) => getSubjectProgressSummary(subject.id));
  subjectProgressTarget.innerHTML = subjectProgress.map((entry) => `
    <article class="progress-item">
      <div class="progress-meta">
        <strong>${escapeHtml(entry.subject?.name || "Subject")}</strong>
        <span>${entry.completed}/${entry.chapters.length} chapters - ${entry.scorePercent}% practice</span>
      </div>
      <div class="progress-track">
        <span style="width: ${entry.completionPercent}%"></span>
      </div>
    </article>
  `).join("");

  nextChapterTarget.innerHTML = nextChapter
    ? `
        <p class="eyebrow">Next chapter</p>
        <h2>${escapeHtml(nextChapter.title)}</h2>
        <p>${escapeHtml(nextChapter.description)}</p>
        <div class="tag-row">
          <span>${escapeHtml(nextSubject?.name || "Subject")}</span>
          <span>${escapeHtml(`Chapter ${nextChapter.order}`)}</span>
        </div>
        <div class="hero-actions">
          <a class="button" href="${getChapterHref(nextChapter)}">Open Chapter</a>
          <a class="button button-ghost" href="${nextSubject ? getSubjectHref(nextSubject) : "subjects.html"}">View Subject</a>
        </div>
      `
    : `
        <p class="eyebrow">Next chapter</p>
        <h2>No chapters yet</h2>
        <p>Create or open a subject to start building your guided path.</p>
      `;
}

function setupAdminPage() {
  const subjectForm = document.getElementById("subjectForm");
  const subjectIdInput = document.getElementById("subjectIdInput");
  const subjectNameInput = document.getElementById("subjectNameInput");
  const subjectDescriptionInput = document.getElementById("subjectDescriptionInput");
  const subjectIconInput = document.getElementById("subjectIconInput");
  const subjectMessage = document.getElementById("subjectMessage");
  const subjectList = document.getElementById("adminSubjectList");
  const chapterForm = document.getElementById("chapterForm");
  const chapterIdInput = document.getElementById("chapterIdInput");
  const chapterSubjectInput = document.getElementById("chapterSubjectInput");
  const chapterTitleInput = document.getElementById("chapterTitleInput");
  const chapterOrderInput = document.getElementById("chapterOrderInput");
  const chapterDescriptionInput = document.getElementById("chapterDescriptionInput");
  const chapterMessage = document.getElementById("chapterMessage");
  const chapterList = document.getElementById("adminChapterList");
  const providerForm = document.getElementById("providerForm");
  const providerSelect = document.getElementById("providerSelect");
  const providerUrlInput = document.getElementById("providerUrlInput");
  const providerKeyInput = document.getElementById("providerKeyInput");
  const providerMessage = document.getElementById("providerMessage");
  const adminEntryForm = document.getElementById("adminEntryForm");
  const adminTypeInput = document.getElementById("adminTypeInput");
  const adminSubjectInput = document.getElementById("adminSubjectInput");
  const adminChapterInput = document.getElementById("adminChapterInput");
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

  if (!providerForm || !providerSelect || !providerUrlInput || !providerKeyInput || !providerMessage || !adminEntryForm || !adminTypeInput || !adminSubjectInput || !adminChapterInput || !adminTitleInput || !adminCategoryInput || !adminReadTimeInput || !adminExcerptInput || !adminContentInput || !adminInterviewFields || !adminCompaniesInput || !adminLevelInput || !adminOptionAInput || !adminOptionBInput || !adminOptionCInput || !adminOptionDInput || !adminCorrectOptionInput || !adminTagsInput || !adminCodeInput || !adminEditingSlug || !adminEditingType || !adminCancelEdit || !adminSubmitButton || !adminEntryMessage || !adminResourceList || !subjectForm || !subjectIdInput || !subjectNameInput || !subjectDescriptionInput || !subjectIconInput || !subjectMessage || !subjectList || !chapterForm || !chapterIdInput || !chapterSubjectInput || !chapterTitleInput || !chapterOrderInput || !chapterDescriptionInput || !chapterMessage || !chapterList) {
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
    populateSubjectChapterControls(adminSubjectInput, adminChapterInput);
    adminEditingSlug.value = "";
    adminEditingType.value = "";
    adminSubmitButton.textContent = "Create Resource";
    syncAdminTypeState();
  }

  function renderSubjectStudio() {
    const subjects = getSubjects();
    const chapters = getChapters();
    const selectedChapterSubject = chapterSubjectInput.value;
    populateSubjectChapterControls(adminSubjectInput, adminChapterInput, adminSubjectInput.value, adminChapterInput.value);
    chapterSubjectInput.innerHTML = `
      <option value="">Select subject</option>
      ${subjects.map((subject) => `<option value="${escapeHtml(subject.id)}">${escapeHtml(subject.name)}</option>`).join("")}
    `;
    if (selectedChapterSubject && subjects.some((subject) => subject.id === selectedChapterSubject)) {
      chapterSubjectInput.value = selectedChapterSubject;
    } else if (subjects[0]) {
      chapterSubjectInput.value = subjects[0].id;
    }

    subjectList.innerHTML = subjects.map((subject) => {
      const progress = getSubjectProgressSummary(subject.id);
      return `
        <article class="resource-link is-static">
          <strong>${escapeHtml(subject.name)}</strong>
          <span>${escapeHtml(`${progress.chapters.length} chapters - ${progress.completionPercent}% complete`)}</span>
        </article>
      `;
    }).join("");

    chapterList.innerHTML = chapters.map((chapter) => {
      const subject = getSubjectById(chapter.subjectId);
      return `
        <article class="resource-link is-static">
          <strong>${escapeHtml(`Chapter ${chapter.order}: ${chapter.title}`)}</strong>
          <span>${escapeHtml(subject?.name || "Subject")} - ${getChapterResources(chapter.id).questions.length} questions</span>
        </article>
      `;
    }).join("");
  }

  function renderAdminResources() {
    const entries = dataStore.listEntries();
    adminResourceList.innerHTML = entries.length
      ? entries.map((entry) => `
        <article class="resource-link is-static admin-item">
          <div>
            <strong>${escapeHtml(entry.type)}: ${escapeHtml(entry.title || entry.question)}</strong>
              <span>${escapeHtml([entry.category, entry.readTime || "Custom", getTaxonomyLabel(entry)].filter(Boolean).join(" - "))}</span>
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
      populateSubjectChapterControls(adminSubjectInput, adminChapterInput, entry.subjectId || "", entry.chapterId || "");
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
      slug: isEditing
        ? slugify(adminTitleInput.value || adminEditingSlug.value, adminEditingSlug.value || `${type}-${Date.now()}`)
        : slugify(adminTitleInput.value || `${type}-${Date.now()}`, `${type}-${Date.now()}`),
      subjectId: adminSubjectInput.value,
      chapterId: adminChapterInput.value,
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

  subjectForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const subject = {
      id: slugify(subjectIdInput.value || subjectNameInput.value || `subject-${Date.now()}`),
      name: subjectNameInput.value.trim(),
      description: subjectDescriptionInput.value.trim(),
      icon: subjectIconInput.value.trim()
    };
    const customSubjects = loadJson(STORAGE_KEYS.subjects, []);
    const next = customSubjects.filter((item) => item.id !== subject.id);
    next.unshift(subject);
    saveJson(STORAGE_KEYS.subjects, next);
    subjectForm.reset();
    setInlineMessage(subjectMessage, "Subject saved successfully.", "success");
    renderSubjectStudio();
  });

  chapterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const chapter = {
      id: slugify(chapterIdInput.value || chapterTitleInput.value || `chapter-${Date.now()}`),
      subjectId: chapterSubjectInput.value,
      title: chapterTitleInput.value.trim(),
      order: Number(chapterOrderInput.value || 1),
      description: chapterDescriptionInput.value.trim()
    };
    const customChapters = loadJson(STORAGE_KEYS.chapters, []);
    const next = customChapters.filter((item) => item.id !== chapter.id);
    next.unshift(chapter);
    saveJson(STORAGE_KEYS.chapters, next);
    chapterForm.reset();
    setInlineMessage(chapterMessage, "Chapter saved successfully.", "success");
    renderSubjectStudio();
  });

  adminSubjectInput.addEventListener("change", () => {
    populateSubjectChapterControls(adminSubjectInput, adminChapterInput, adminSubjectInput.value, "");
  });

  adminCategoryInput.addEventListener("change", () => {
    syncSubjectFromCategory(adminCategoryInput.value.trim(), adminSubjectInput, adminChapterInput);
  });

  adminTypeInput.addEventListener("change", syncAdminTypeState);
  syncAdminTypeState();

  renderSubjectStudio();
  renderAdminResources();
}

function setupAIAssistant() {
  const toggleBtn = document.getElementById("aiToggleBtn");
  const closeBtn = document.getElementById("aiCloseBtn");
  const panel = document.getElementById("aiPanel");
  const input = document.getElementById("aiInput");
  const sendBtn = document.getElementById("aiSendBtn");
  const messages = document.getElementById("aiMessages");
  const featureButtons = Array.from(document.querySelectorAll(".ai-feature-btn"));

  if (!toggleBtn || !closeBtn || !panel || !input || !sendBtn || !messages) {
    return;
  }

  const aiResponses = {
    "quick-tips": "Here are some quick tips:\n\n💡 Use semantic HTML for better accessibility and SEO\n💡 Keep CSS simple and maintainable with design tokens\n💡 Test your code on multiple browsers and devices\n💡 Write clean, readable code for your future self",
    "concept-explain": "Choose a concept from TechAmitCode to explore:\n\n📚 CSS Flexbox\n📚 JavaScript Closures\n📚 React State Management\n📚 HTML Semantics\n📚 Responsive Design\n\nType a concept name or browse the tutorials section for detailed explanations.",
    "code-review": "Good code review habits:\n\n🔍 Check for semantic HTML structure\n🔍 Verify CSS follows design tokens\n🔍 Ensure JavaScript is maintainable\n🔍 Look for accessibility issues\n🔍 Test edge cases\n\nShare your code snippet or visit the projects section for build briefs.",
    "interview-prep": "Interview prep resources:\n\n🎯 Practice questions in the Interview section\n🎯 Study notes for HTML, CSS, JavaScript\n🎯 Review cheat sheets for quick recall\n🎯 Practice mock tests to build confidence\n🎯 Mark revised questions after studying answers"
  };

  function togglePanel() {
    const isHidden = panel.hasAttribute("hidden");
    if (isHidden) {
      panel.removeAttribute("hidden");
      input.focus();
    } else {
      panel.setAttribute("hidden", "");
    }
  }

  function addMessage(text, sender = "assistant") {
    const msgDiv = document.createElement("div");
    msgDiv.className = `ai-message ${sender}`;
    msgDiv.textContent = text;
    messages.appendChild(msgDiv);
    messages.scrollTop = messages.scrollHeight;
  }

  function handleFeatureClick(feature) {
    const response = aiResponses[feature] || "Feature not available yet. Try another option.";
    addMessage(response, "assistant");
  }

  function handleUserMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    setTimeout(() => {
      const responses = [
        "That's a great question! Check the tutorials section for detailed explanations.",
        "Good thinking! Related resources are available in the learning paths.",
        "I can help with that. Try browsing the relevant chapter or notes.",
        "Smart question! Bookmark this resource and revisit it during practice.",
        "Excellent! Keep practicing with interview questions to build confidence."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      addMessage(randomResponse, "assistant");
    }, 600);
  }

  toggleBtn.addEventListener("click", togglePanel);
  closeBtn.addEventListener("click", togglePanel);

  featureButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const feature = btn.dataset.feature;
      addMessage(btn.textContent.trim(), "user");
      setTimeout(() => {
        handleFeatureClick(feature);
      }, 300);
    });
  });

  sendBtn.addEventListener("click", handleUserMessage);
  input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      handleUserMessage();
    }
  });

  addMessage("मुझसे कोई भी सवाल पूछें या कोई फीचर चुनें। I'm here to help your learning journey!", "assistant");
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
  setupAIAssistant();

  if (page === "home") {
    setupHomeParticles();
    setupHomeAuth();
    renderHomeHeroStats();
    renderFeaturedContent();
    setupHomeWorkspace();
  }

  if (["notes", "tutorials", "projects", "blog", "cheatsheets"].includes(page)) {
    renderListing(page);
  }

  if (page === "search") {
    setupSearchPage();
  }

  if (page === "subjects") {
    setupSubjectsPage();
  }

  if (page === "subject") {
    setupSubjectDetailPage();
  }

  if (page === "chapter") {
    setupChapterPage();
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
