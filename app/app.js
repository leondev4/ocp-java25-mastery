/* ══════════════════════════════════════════════════════════════
   OCP Java 25 Mastery — study engine
   No build step, no dependencies. Open index.html directly.
   ══════════════════════════════════════════════════════════════ */
(function () {
"use strict";

const C = window.CURRICULUM;
const BANK = [].concat(window.BANK_A || [], window.BANK_B || [], window.BANK_C || [], window.BANK_D || [], window.BANK_E || [], window.BANK_F || []);
const CARDS = window.FLASHCARDS || [];

/* ── Storage ──────────────────────────────────────────────────
   localStorage is unreliable on the file:// origin in some
   browsers, so every access degrades to an in-memory store
   rather than throwing and taking the app down with it.       */
const Store = (function () {
  const KEY = "ocp25.v2";
  let mem = null;
  let usable = true;
  try {
    localStorage.setItem(KEY + ".probe", "1");
    localStorage.removeItem(KEY + ".probe");
  } catch (e) { usable = false; }

  const blank = () => ({ seen: {}, mocks: [], papers: {}, streak: { last: null, days: 0 }, theme: null });

  function read() {
    if (mem) return mem;
    if (!usable) return (mem = blank());
    try {
      const raw = localStorage.getItem(KEY);
      mem = raw ? Object.assign(blank(), JSON.parse(raw)) : blank();
    } catch (e) { mem = blank(); }
    return mem;
  }
  function write() {
    if (!usable) return;
    try { localStorage.setItem(KEY, JSON.stringify(mem)); } catch (e) { /* quota or blocked */ }
  }
  return {
    get: read,
    save: write,
    reset() { mem = blank(); if (usable) { try { localStorage.removeItem(KEY); } catch (e) {} } },
    persistent: usable
  };
})();

/* ── Small helpers ────────────────────────────────────────────── */
const $ = (sel, root) => (root || document).querySelector(sel);
const el = (tag, props, kids) => {
  const n = document.createElement(tag);
  if (props) for (const k in props) {
    if (k === "class") n.className = props[k];
    else if (k === "text") n.textContent = props[k];
    else if (k.startsWith("on")) n.addEventListener(k.slice(2), props[k]);
    else if (props[k] !== null && props[k] !== undefined) n.setAttribute(k, props[k]);
  }
  (kids || []).forEach(c => c && n.appendChild(typeof c === "string" ? document.createTextNode(c) : c));
  return n;
};
const DAY = 86400000;
const today = () => new Date().toISOString().slice(0, 10);
const pct = (a, b) => (b ? Math.round((a / b) * 100) : 0);
const moduleOf = id => C.modules.find(m => m.id === id);

/* Deterministic shuffle so a question's option order is stable
   within one presentation but varies between presentations. */
function shuffled(arr, seed) {
  const a = arr.slice();
  let s = seed >>> 0;
  const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ── Scheduling (SM-2 lite) ───────────────────────────────────── */
function record(qid, correct) {
  const st = Store.get();
  const r = st.seen[qid] || { n: 0, due: 0, right: 0, wrong: 0, last: 0 };
  if (correct) { r.n = Math.min(r.n + 1, C.intervals.length - 1); r.right++; }
  else { r.n = 0; r.wrong++; }
  r.due = Date.now() + C.intervals[r.n] * DAY;
  r.last = Date.now();
  st.seen[qid] = r;

  const d = today();
  if (st.streak.last !== d) {
    const yday = new Date(Date.now() - DAY).toISOString().slice(0, 10);
    st.streak.days = st.streak.last === yday ? st.streak.days + 1 : 1;
    st.streak.last = d;
  }
  Store.save();
}

function dueNow() {
  const st = Store.get(), now = Date.now();
  return BANK.filter(q => { const r = st.seen[q.id]; return r && r.due <= now; });
}
function unseen() {
  const st = Store.get();
  return BANK.filter(q => !st.seen[q.id]);
}
function weakest() {
  const st = Store.get();
  return BANK.filter(q => { const r = st.seen[q.id]; return r && r.wrong > r.right; });
}

/* Readiness: accuracy, discounted until you've covered enough
   of the bank. Answering six questions correctly is not 100%. */
function readiness() {
  const st = Store.get();
  let right = 0, wrong = 0, seen = 0;
  for (const id in st.seen) { const r = st.seen[id]; right += r.right; wrong += r.wrong; seen++; }
  const attempts = right + wrong;
  if (!attempts) return { pct: 0, coverage: 0, accuracy: 0, attempts: 0, seen: 0 };
  const accuracy = right / attempts;
  const coverage = seen / BANK.length;
  return {
    pct: Math.round(accuracy * Math.min(1, coverage / 0.6) * 100),
    coverage: Math.round(coverage * 100),
    accuracy: Math.round(accuracy * 100),
    attempts, seen
  };
}

/* Total XP earned, and the level it buys. Difficulty-weighted so grinding
   easy questions doesn't inflate the number. */
function progress() {
  const st = Store.get();
  let xp = 0, correct = 0;
  for (const id in st.seen) {
    const r = st.seen[id];
    const q = BANK.find(x => x.id === id);
    if (!q) continue;
    const per = C.xp.perDifficulty[q.d] || 10;
    xp += r.right * per + (r.right ? C.xp.firstAnswerBonus : 0);
    correct += r.right;
  }
  /* level n requires curve * n * (n+1) / 2 total xp */
  let lvl = 1;
  while (xp >= C.xp.curve * lvl * (lvl + 1) / 2) lvl++;
  const floorXp = C.xp.curve * (lvl - 1) * lvl / 2;
  const nextXp  = C.xp.curve * lvl * (lvl + 1) / 2;
  return {
    xp, level: lvl, correct,
    into: xp - floorXp,
    need: nextXp - floorXp,
    pctToNext: Math.round(((xp - floorXp) / (nextXp - floorXp)) * 100)
  };
}

function rankFor(value) {
  return C.ranks.find(r => value < r.max) || C.ranks[C.ranks.length - 1];
}

function moduleStats(mid) {
  const st = Store.get();
  const qs = BANK.filter(q => q.m === mid);
  let right = 0, wrong = 0, seen = 0, due = 0;
  const now = Date.now();
  qs.forEach(q => {
    const r = st.seen[q.id];
    if (r) { seen++; right += r.right; wrong += r.wrong; if (r.due <= now) due++; }
  });
  return { total: qs.length, seen, right, wrong, due, acc: pct(right, right + wrong) };
}

function moduleState(mid) {
  const s = moduleStats(mid);
  if (!s.seen) return "";
  if (s.due) return "due";
  return s.acc >= 75 ? "good" : "weak";
}

/* ══════════════════════════════════════════════════════════════
   System notification — fires on level-up and rank-up only, so it
   stays an event rather than noise.
   ══════════════════════════════════════════════════════════════ */
let notifyQueue = [];

function pushNotify(n) { notifyQueue.push(n); }

function drainNotify() {
  if (!notifyQueue.length) return;
  const n = notifyQueue.shift();
  const scrim = el("div", { class: "sysscrim" });
  const box = el("div", { class: "sysnotify", "data-tier": n.tier || "system", role: "alertdialog", "aria-live": "assertive" }, [
    el("div", { class: "tagline", text: n.tag || "System" }),
    el("div", { class: "headline", text: n.headline }),
    n.detail ? el("div", { class: "detail", text: n.detail }) : null,
    el("button", { class: "btn primary dismiss", onclick: close }, ["Acknowledge"])
  ]);
  function close() {
    scrim.remove(); box.remove();
    document.removeEventListener("keydown", onKey);
    drainNotify();
  }
  function onKey(e) { if (e.key === "Escape" || e.key === "Enter") { e.preventDefault(); close(); } }
  document.addEventListener("keydown", onKey);
  scrim.addEventListener("click", close);
  document.body.appendChild(scrim);
  document.body.appendChild(box);
  const b = box.querySelector(".dismiss");
  if (b) b.focus();
}

/* Compare progression before and after an answer and queue any milestone. */
function checkMilestones(before) {
  const after = { p: progress(), r: readiness() };
  if (after.p.level > before.p.level) {
    pushNotify({
      tag: "Level up",
      headline: "LEVEL " + after.p.level,
      detail: "You have gained a level. " + after.p.xp + " total XP."
    });
  }
  const rBefore = rankFor(before.r.pct).rank;
  const rAfter = rankFor(after.r.pct).rank;
  if (rBefore !== rAfter && "EDCBAS".indexOf(rAfter) < "EDCBAS".indexOf(rBefore)) {
    const rk = rankFor(after.r.pct);
    pushNotify({
      tag: "Rank up",
      tier: (rk.rank === "A" || rk.rank === "S") ? "monarch" : "system",
      headline: rk.rank + "-RANK · " + rk.title.toUpperCase(),
      detail: rk.hint
    });
  }
}

/* ══════════════════════════════════════════════════════════════
   Views
   ══════════════════════════════════════════════════════════════ */
let session = null;   // active drill or mock
let tick = null;      // mock exam interval

function rankBadge(rk, size) {
  return el("div", { class: "rankbadge " + (size || "") , "data-rank": rk.rank }, [
    el("span", { class: "r", text: rk.rank }),
    el("span", { class: "t", text: rk.title })
  ]);
}

function gauge(value) {
  const passing = value >= C.exam.passPct;
  const rk = rankFor(value);
  return el("div", { class: "gauge" }, [
    el("div", { class: "track" }, [
      el("div", { class: "fill", style: "width:" + Math.min(value, 100) + "%", "data-pass": String(passing) }),
      el("div", { class: "line", style: "left:" + C.exam.passPct + "%" }),
      el("div", { class: "reading", text: value + "%" })
    ]),
    el("div", { class: "band" }, [
      rankBadge(rk),
      el("span", { class: "hint", text: rk.hint })
    ])
  ]);
}

/* Renders a question's explanatory diagram, or nothing. */
function figureFor(q) {
  if (!q.fig || !window.MD) return null;
  const svg = window.MD.renderDiagram(q.fig);
  if (!svg) return null;
  const holder = el("div", { class: "figure" });
  holder.innerHTML = svg;
  return holder;
}

function statBlock(items) {
  return el("div", { class: "stats" }, items.map(i =>
    el("div", { class: "stat" }, [
      el("div", { class: "k", text: i.k }),
      el("div", { class: "v " + (i.tone || ""), text: String(i.v) })
    ])
  ));
}

/* ── Dashboard ───────────────────────────────────────────────── */
function viewDashboard(main) {
  const r = readiness();
  const st = Store.get();
  const due = dueNow().length;
  const fresh = unseen().length;
  const lastMock = st.mocks[st.mocks.length - 1];

  const pg = progress();
  const rk = rankFor(r.pct);

  main.appendChild(el("div", { class: "topbar" }, [
    el("div", {}, [
      el("span", { class: "eyebrow", text: "Exam " + C.exam.code + " · " + C.exam.questions + " questions · " + C.exam.minutes + " min · " + C.exam.passPct + "% to clear" }),
      el("h1", { text: "Status" })
    ]),
    el("div", { class: "spacer" }),
    el("button", { class: "btn primary", onclick: () => location.hash = "#/drill/due" }, [due ? "Daily quest · " + due : "Start a drill"])
  ]));

  /* The status window. Rank left, level and readiness right. */
  const win = el("div", { class: "card statuswin" }, [
    el("div", { class: "hd" }, [el("span", { class: "eyebrow", text: "Hunter status" })]),
    el("div", { class: "bd statusgrid" }, [
      el("div", { class: "rankcell" }, [
        rankBadge(rk, "big"),
        el("div", { class: "lvl" }, [
          el("span", { class: "eyebrow", text: "Level" }),
          el("span", { class: "lvlnum num", text: String(pg.level) })
        ]),
        el("div", { class: "xpbar", title: pg.into + " / " + pg.need + " XP" }, [
          el("i", { style: "width:" + Math.max(2, pg.pctToNext) + "%" })
        ]),
        el("span", { class: "eyebrow", text: pg.into + " / " + pg.need + " XP to level " + (pg.level + 1) })
      ]),
      el("div", { class: "gaugecell" }, [gauge(r.pct)])
    ])
  ]);
  main.appendChild(win);

  main.appendChild(el("div", { class: "card" }, [
    statBlock([
      { k: "Accuracy", v: r.accuracy + "%", tone: r.accuracy >= 68 ? "good" : r.accuracy ? "bad" : "" },
      { k: "Bank covered", v: r.coverage + "%" },
      { k: "Total XP", v: pg.xp, tone: "hot" },
      { k: "Due now", v: due, tone: due ? "hot" : "" },
      { k: "Unseen", v: fresh },
      { k: "Day streak", v: st.streak.days, tone: st.streak.days ? "hot" : "" }
    ])
  ]));

  /* Next action — one clear instruction, not a wall of options. */
  let advice, target, label;
  if (due) { advice = due + " question" + (due === 1 ? " is" : "s are") + " scheduled for review today. Clear those before anything else — spaced repetition only works if you honour the schedule."; target = "#/drill/due"; label = "Review " + due; }
  else if (fresh > BANK.length * 0.4) { advice = "You've seen " + r.coverage + "% of the bank. Work through new material module by module before drilling mocks."; target = "#/course"; label = "Open the course"; }
  else if (!lastMock) { advice = "Coverage looks reasonable. Sit a full timed mock to find out where you actually stand under exam conditions."; target = "#/mock"; label = "Sit a mock"; }
  else if (r.pct < C.exam.passPct) { advice = "You're below the pass line. Drill your weakest modules rather than re-reading — retrieval is what moves this number."; target = "#/review"; label = "Work the error journal"; }
  else { advice = "You're above the line. Three mocks over 80% and you're done preparing."; target = "#/mock"; label = "Sit a mock"; }

  main.appendChild(el("div", { class: "card" }, [
    el("div", { class: "hd" }, [el("span", { class: "eyebrow", text: "Do this next" })]),
    el("div", { class: "bd" }, [
      el("p", { text: advice, style: "margin-bottom:14px" }),
      el("button", { class: "btn primary", onclick: () => location.hash = target }, [label])
    ])
  ]));

  if (st.mocks.length) {
    main.appendChild(el("div", { class: "card" }, [
      el("div", { class: "hd" }, [el("span", { class: "eyebrow", text: "Mock history" })]),
      el("div", { class: "bd" }, [
        el("table", { class: "prose", style: "width:100%" }, [
          el("thead", {}, [el("tr", {}, [el("th", { text: "Date" }), el("th", { text: "Score" }), el("th", { text: "Result" })])]),
          el("tbody", {}, st.mocks.slice(-8).reverse().map(m =>
            el("tr", {}, [
              el("td", { class: "num", text: new Date(m.ts).toLocaleDateString() }),
              el("td", { class: "num", text: m.score + "/" + m.total + "  (" + m.pct + "%)" }),
              el("td", { text: m.pct >= C.exam.passPct ? "Pass" : "Fail", style: "color:var(--" + (m.pct >= C.exam.passPct ? "pass" : "fail") + ")" })
            ])
          ))
        ])
      ])
    ]));
  }

  main.appendChild(colophon());
}

/* ── Module index ────────────────────────────────────────────── */
function colophon() {
  return el("div", { class: "colophon" }, [
    el("div", {}, [
      el("div", { class: "sig", text: "Yassin Ghariani" }),
      el("div", { class: "tagline", text: "\u201cIf you can draw the memory, you can answer the question.\u201d" }),
      el("div", { style: "margin-top:8px", text: "Built for exam " + C.exam.code + ". " + BANK.length + " questions, " + CARDS.length + " cards, 12 modules." })
    ])
  ]);
}

function viewModules(main) {
  main.appendChild(el("div", { class: "topbar" }, [
    el("div", {}, [el("span", { class: "eyebrow", text: "Curriculum" }), el("h1", { text: "12 modules" })])
  ]));

  const grid = el("div", { class: "grid2" });
  C.modules.forEach(m => {
    const s = moduleStats(m.id);
    grid.appendChild(el("div", { class: "card" }, [
      el("div", { class: "hd" }, [
        el("span", { class: "eyebrow", text: String(m.id).padStart(2, "0") }),
        el("h3", { text: m.title }),
        el("span", { class: "spacer", style: "margin-left:auto" }),
        m.weight ? el("span", { class: "chip", text: "~" + m.weight + "% of exam" }) : null
      ]),
      el("div", { class: "bd" }, [
        el("p", { text: m.blurb, style: "font-size:14px;color:var(--ink-2);margin-bottom:12px" }),
        el("div", { class: "eyebrow", text: s.seen + " / " + s.total + " seen · " + (s.seen ? s.acc + "% accuracy" : "not started"), style: "margin-bottom:12px" }),
        el("button", { class: "btn sm", onclick: () => location.hash = "#/module/" + m.id }, ["Open"]),
        el("button", { class: "btn sm primary", style: "margin-left:6px", onclick: () => location.hash = "#/drill/m" + m.id }, ["Drill " + s.total])
      ])
    ]));
  });
  main.appendChild(grid);
}

/* ── Single module ───────────────────────────────────────────── */
function viewModule(main, mid) {
  const m = moduleOf(mid);
  if (!m) return viewModules(main);
  const s = moduleStats(mid);

  main.appendChild(el("div", { class: "topbar" }, [
    el("div", {}, [
      el("span", { class: "eyebrow", text: "Module " + String(m.id).padStart(2, "0") + (m.weight ? " · ~" + m.weight + "% of exam" : "") }),
      el("h1", { text: m.title })
    ]),
    el("div", { class: "spacer" }),
    el("button", { class: "btn primary", onclick: () => location.hash = "#/drill/m" + m.id }, ["Drill this module"])
  ]));

  main.appendChild(el("div", { class: "card" }, [el("div", { class: "bd" }, [
    el("p", { text: m.blurb, style: "margin-bottom:16px" }),
    statBlock([
      { k: "Questions", v: s.total },
      { k: "Seen", v: s.seen },
      { k: "Accuracy", v: s.seen ? s.acc + "%" : "—", tone: s.seen ? (s.acc >= 75 ? "good" : "bad") : "" },
      { k: "Due", v: s.due, tone: s.due ? "hot" : "" }
    ])
  ])]));

  main.appendChild(el("div", { class: "card" }, [
    el("div", { class: "hd" }, [el("span", { class: "eyebrow", text: "Exam objectives covered" })]),
    el("div", { class: "bd" }, [el("ul", { class: "objs" }, m.objectives.map(o => el("li", { text: o })))])
  ]));

  main.appendChild(el("div", { class: "card" }, [
    el("div", { class: "hd" }, [el("span", { class: "eyebrow", text: "Study material" })]),
    el("div", { class: "bd" }, [
      el("p", { style: "margin-bottom:14px", text: "Read the notes in the app, or open the labs and exercises from disk." }),
      el("button", { class: "btn primary", onclick: () => location.hash = "#/read/" + m.slug }, ["Read the notes"]),
      el("p", { style: "margin-top:14px;font-size:14px" }, [
        el("a", { href: "../modules/" + m.slug + "/src/", text: "runnable labs" }), " · ",
        el("a", { href: "../exercises/" + m.slug + ".md", text: "coding exercises" }), " · ",
        el("a", { href: "../modules/" + m.slug + "/NOTES.md", text: "Markdown source" })
      ])
    ])
  ]));
}

/* ── Notes reader ────────────────────────────────────────────── */
function viewNotes(main, key) {
  const src = (window.NOTES || {})[key];
  const mod = C.modules.find(m => m.slug === key);
  const doc = (window.DOC_INDEX || []).find(d => d.key === key);

  if (!src) {
    main.appendChild(el("div", { class: "empty" }, [
      el("h2", { text: "Not in the reader" }),
      el("p", { text: "This text hasn't been compiled into the app. Run tools/build-notes.py after adding it, or open the Markdown file directly." })
    ]));
    return;
  }

  const out = window.MD.render(src);

  /* Header */
  const head = el("div", { class: "topbar" }, [
    el("div", {}, [
      el("span", { class: "eyebrow", text: mod ? "Module " + String(mod.id).padStart(2, "0") + (mod.weight ? " · ~" + mod.weight + "% of exam" : "") : "Reference" }),
      el("h1", { text: mod ? mod.title : (doc ? doc.title : key) })
    ]),
    el("div", { class: "spacer" })
  ]);
  if (mod) head.appendChild(el("button", { class: "btn primary", onclick: () => location.hash = "#/drill/m" + mod.id }, ["Drill this module"]));
  main.appendChild(head);

  /* Reading column + contents rail */
  const wrap = el("div", { class: "readwrap" });
  const article = el("article", { class: "prose reader" });
  article.innerHTML = out.html;
  const headingEls = Array.prototype.slice.call(article.querySelectorAll("h1,h2,h3,h4"));
  const headingById = id => { for (let i = 0; i < headingEls.length; i++) if (headingEls[i].id === id) return headingEls[i]; return null; };
  wrap.appendChild(article);

  const nav = el("nav", { class: "toc", "aria-label": "On this page" });
  nav.appendChild(el("div", { class: "eyebrow", text: "On this page" }));
  const links = [];
  out.toc.forEach(t => {
    const a = el("a", { href: "#", class: "toc-l" + t.level, text: t.text });
    a.addEventListener("click", ev => {
      ev.preventDefault();
      const tgt = headingById(t.id);
      if (tgt && tgt.scrollIntoView) tgt.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    a.dataset.target = t.id;
    links.push(a);
    nav.appendChild(a);
  });
  wrap.appendChild(nav);
  main.appendChild(wrap);

  /* Previous / next through the module sequence */
  if (mod) {
    const prev = C.modules.find(x => x.id === mod.id - 1);
    const next = C.modules.find(x => x.id === mod.id + 1);
    main.appendChild(el("div", { class: "pager" }, [
      prev ? el("button", { class: "btn", onclick: () => location.hash = "#/read/" + prev.slug }, ["← " + prev.title]) : el("span"),
      next ? el("button", { class: "btn", onclick: () => location.hash = "#/read/" + next.slug }, [next.title + " →"]) : el("span")
    ]));
  }

  /* Scroll-spy: mark the section currently in view. */
  const heads = out.toc.map(t => headingById(t.id)).filter(Boolean);
  if (heads.length && window.IntersectionObserver) {
    let active = null;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) active = e.target.id; });
      links.forEach(a => a.setAttribute("aria-current", String(a.dataset.target === active)));
    }, { rootMargin: "-72px 0px -70% 0px" });
    heads.forEach(h => io.observe(h));
    main._io = io;
  }
}

/* ── Course index ────────────────────────────────────────────── */
function viewCourse(main) {
  main.appendChild(el("div", { class: "topbar" }, [
    el("div", {}, [el("span", { class: "eyebrow", text: "Read, then drill" }), el("h1", { text: "The course" })])
  ]));

  main.appendChild(el("p", { class: "lede", text:
    "Twelve modules in order. Read the notes, type the labs, then drill the module before moving on — " +
    "the drill is what tells you whether the reading actually landed." }));

  const grid = el("div", { class: "grid2", style: "margin-top:18px" });
  C.modules.forEach(m => {
    const s = moduleStats(m.id);
    grid.appendChild(el("div", { class: "card modcard" }, [
      el("div", { class: "bd" }, [
        el("div", { class: "modtop" }, [
          el("span", { class: "modnum", text: String(m.id).padStart(2, "0") }),
          el("div", {}, [
            el("h3", { text: m.title }),
            m.weight ? el("span", { class: "eyebrow", text: "~" + m.weight + "% of exam" }) : el("span", { class: "eyebrow", text: "revision" })
          ]),
          el("span", { class: "dot", "data-state": moduleState(m.id), style: "margin-left:auto;align-self:center" })
        ]),
        el("p", { class: "modblurb", text: m.blurb }),
        el("div", { class: "modbar" }, [
          el("i", { style: "width:" + (s.total ? Math.round(s.seen / s.total * 100) : 0) + "%" })
        ]),
        el("div", { class: "eyebrow", text: s.seen + "/" + s.total + " questions seen" + (s.seen ? " · " + s.acc + "% accuracy" : "") }),
        el("div", { style: "margin-top:12px" }, [
          el("button", { class: "btn sm primary", onclick: () => location.hash = "#/read/" + m.slug }, ["Read"]),
          el("button", { class: "btn sm", style: "margin-left:6px", onclick: () => location.hash = "#/drill/m" + m.id }, ["Drill"]),
          el("button", { class: "btn sm ghost", style: "margin-left:2px", onclick: () => location.hash = "#/module/" + m.id }, ["Details"])
        ])
      ])
    ]));
  });
  main.appendChild(grid);

  main.appendChild(el("h2", { text: "Reference", style: "margin:30px 0 14px" }));
  const dgrid = el("div", { class: "grid2" });
  (window.DOC_INDEX || []).forEach(d => {
    dgrid.appendChild(el("div", { class: "card" }, [el("div", { class: "bd" }, [
      el("h3", { text: d.title, style: "margin-bottom:6px" }),
      el("p", { class: "modblurb", text: d.blurb }),
      el("button", { class: "btn sm", style: "margin-top:10px", onclick: () => location.hash = "#/read/" + d.key }, ["Read"])
    ])]));
  });
  main.appendChild(dgrid);
}

/* ── Drill ───────────────────────────────────────────────────── */
function startDrill(mode) {
  let pool;
  if (mode === "due") pool = dueNow();
  else if (mode === "weak") pool = weakest();
  else if (mode === "new") pool = unseen();
  else if (mode[0] === "m") pool = BANK.filter(q => q.m === parseInt(mode.slice(1), 10));
  else pool = BANK;

  if (!pool.length) return null;
  return {
    kind: "drill",
    queue: shuffled(pool, Date.now()).slice(0, 25),
    i: 0, right: 0, answers: [], mode
  };
}

function viewDrill(main, mode) {
  if (!session || session.kind !== "drill" || session.mode !== mode) {
    session = startDrill(mode);
  }
  if (!session) {
    main.appendChild(el("div", { class: "empty" }, [
      el("h2", { text: "Nothing queued" }),
      el("p", { text: mode === "due"
        ? "No questions are scheduled for review right now. That's the system working — come back tomorrow, or drill a module directly."
        : "This selection is empty. Try another module or the full bank." }),
      el("button", { class: "btn primary", onclick: () => location.hash = "#/modules" }, ["Browse modules"])
    ]));
    return;
  }
  renderQuestion(main, session);
}

function renderQuestion(main, s) {
  const done = s.i >= s.queue.length;
  if (done) {
    /* Running out of questions ends a mock the same way the timer or
       the Finish button does — score it, log it, then show the result. */
    if (s.kind === "mock") return finishMock(s);
    return renderDrillResult(main, s);
  }
  const q = s.queue[s.i];

  const m = moduleOf(q.m);
  const isMock = s.kind === "mock";

  /* Header: progress strip for drills, timer for mocks */
  const head = el("div", { class: "topbar" }, [
    el("div", {}, [
      el("span", { class: "eyebrow", text: isMock ? (s.title || "Mock exam") + " · question " + (s.i + 1) + " of " + s.queue.length : "Drill · " + m.title }),
      el("h1", { text: isMock ? "Question " + (s.i + 1) : "Question " + (s.i + 1) + " of " + s.queue.length })
    ]),
    el("div", { class: "spacer" })
  ]);
  if (isMock) {
    head.appendChild(el("div", { class: "timer", id: "clock", "data-warn": String(s.left < 300), text: fmtTime(s.left) }));
    head.appendChild(el("button", { class: "btn", onclick: () => finishMock(s) }, ["Finish"]));
  } else {
    head.appendChild(el("button", { class: "btn ghost", onclick: () => { session = null; location.hash = "#/"; } }, ["End"]));
  }
  main.appendChild(head);

  if (!isMock) {
    const strip = el("div", { class: "strip" });
    s.queue.forEach((_, i) => {
      const a = s.answers[i];
      strip.appendChild(el("i", { "data-r": i === s.i ? "now" : (a === undefined ? "" : (a ? "1" : "0")) }));
    });
    main.appendChild(strip);
  }

  const order = shuffled(q.opts.map((t, i) => ({ t, i })), hash(q.id) + s.i * 7919);
  const body = el("div", { class: "bd" });

  body.appendChild(el("div", { class: "qmeta" }, [
    el("span", { class: "chip", text: String(q.m).padStart(2, "0") + " " + m.title }),
    el("span", { class: "chip", text: q.t }),
    el("span", { class: "chip d" + q.d, text: q.d === 3 ? "Hard" : q.d === 2 ? "Medium" : "Easy" })
  ]));
  body.appendChild(el("div", { class: "qtext", text: q.q }));
  if (q.code) body.appendChild(el("pre", { class: "code" }, [el("code", { text: q.code })]));

  const multi = Array.isArray(q.a);
  const want = multi ? q.a.length : 1;
  if (multi) {
    body.appendChild(el("div", { class: "multihint", text: "Choose " + want + ". All must be correct — partial credit does not exist on this exam." }));
  }

  const optsBox = el("div", { class: "opts" });
  const buttons = [];
  const picked = new Set();
  order.forEach((o, pos) => {
    const b = el("button", { class: "opt", type: "button", "data-multi": String(multi) }, [
      el("span", { class: "key", text: "ABCDEFGHIJ"[pos] }),
      el("span", { text: o.t })
    ]);
    b.addEventListener("click", () => {
      if (multi) {
        if (picked.has(o.i)) { picked.delete(o.i); b.removeAttribute("data-picked"); }
        else { picked.add(o.i); b.setAttribute("data-picked", "true"); }
        submit.disabled = picked.size === 0;
      } else {
        answer([o.i]);
      }
    });
    buttons.push(b);
    optsBox.appendChild(b);
  });
  body.appendChild(optsBox);

  const submit = el("button", { class: "btn primary", style: "margin-top:14px", disabled: "true",
    onclick: () => answer(Array.from(picked)) }, ["Confirm answer"]);
  if (multi) body.appendChild(submit);

  const card = el("div", { class: "card" }, [body]);
  main.appendChild(card);

  function answer(chosen) {
    if (s.answers[s.i] !== undefined) return;
    const truth = multi ? q.a.slice().sort() : [q.a];
    const got = chosen.slice().sort();
    /* Oracle marks multi-select all-or-nothing. So do we. */
    const ok = got.length === truth.length && got.every((v, k) => v === truth[k]);
    s.answers[s.i] = ok;
    if (ok) s.right++;
    const beforeState = { p: progress(), r: readiness() };
    record(q.id, ok);
    /* Never interrupt a timed paper — milestones surface afterwards. */
    if (!isMock) checkMilestones(beforeState);
    if (multi) submit.style.display = "none";

    buttons.forEach((b, pos) => {
      b.disabled = true;
      b.removeAttribute("data-picked");
      const orig = order[pos].i;
      const isTruth = truth.indexOf(orig) >= 0;
      const wasPicked = chosen.indexOf(orig) >= 0;
      if (isTruth) b.setAttribute("data-state", "correct");
      else if (wasPicked) b.setAttribute("data-state", "wrong");
      else b.setAttribute("data-state", "muted");
    });

    if (isMock) { advance(); return; }

    const verdict = el("div", { class: "verdict", "data-ok": String(ok) }, [
      el("div", { class: "tag", text: ok ? "Correct" : "Not quite" }),
      el("p", { text: q.exp })
    ]);
    /* Some explanations carry a diagram — the concept is spatial and a
       picture settles it faster than another paragraph. */
    if (q.fig && window.MD) {
      const svg = window.MD.renderDiagram(q.fig);
      if (svg) {
        const holder = el("div", { class: "figure" });
        holder.innerHTML = svg;
        verdict.appendChild(holder);
      }
    }
    body.appendChild(verdict);

    const next = el("button", { class: "btn primary", style: "margin-top:16px", onclick: advance },
      [s.i + 1 >= s.queue.length ? "See results" : "Next question"]);
    body.appendChild(next);
    next.focus();
  }

  function advance() { s.i++; render(); }

  /* Keyboard: 1-4 to answer, Enter to continue. */
  main._keys = e => {
    if (e.key >= "1" && e.key <= String(Math.min(9, buttons.length))) {
      const b = buttons[+e.key - 1];
      if (b && !b.disabled) b.click();
    } else if (e.key === "Enter") {
      if (s.answers[s.i] !== undefined) advance();
      else if (multi && !submit.disabled) submit.click();
    }
  };
  document.addEventListener("keydown", main._keys);
}

function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

function renderDrillResult(main, s) {
  const p = pct(s.right, s.queue.length);
  main.appendChild(el("div", { class: "topbar" }, [
    el("div", {}, [el("span", { class: "eyebrow", text: "Drill complete" }), el("h1", { text: s.right + " of " + s.queue.length })])
  ]));
  main.appendChild(el("div", { class: "card" }, [el("div", { class: "bd" }, [gauge(p)])]));

  const missed = s.queue.filter((q, i) => s.answers[i] === false);
  if (missed.length) {
    main.appendChild(el("div", { class: "card" }, [
      el("div", { class: "hd" }, [el("span", { class: "eyebrow", text: "Missed — these come back tomorrow" })]),
      el("div", { class: "bd" }, missed.map(q => el("div", { style: "padding:10px 0;border-bottom:1px solid var(--rule-2)" }, [
        el("div", { class: "qtext", text: q.q, style: "font-size:14px;margin-bottom:6px" }),
        el("div", { style: "font-size:13px;color:var(--ink-2)", text: q.exp })
      ])))
    ]));
  }
  main.appendChild(el("div", { style: "margin-top:16px" }, [
    el("button", { class: "btn primary", onclick: () => { session = null; render(); } }, ["Go again"]),
    el("button", { class: "btn", style: "margin-left:8px", onclick: () => { session = null; location.hash = "#/"; } }, ["Dashboard"])
  ]));
}

/* ── Mock exam ───────────────────────────────────────────────── */
function buildMock() {
  /* Sample by exam weight so the paper resembles the real thing. */
  const picks = [];
  const weighted = C.modules.filter(m => m.weight > 0);
  const totalW = weighted.reduce((a, m) => a + m.weight, 0);
  weighted.forEach(m => {
    const want = Math.round((m.weight / totalW) * C.exam.questions);
    const pool = shuffled(BANK.filter(q => q.m === m.id), Date.now() + m.id);
    picks.push(...pool.slice(0, want));
  });
  /* Top up or trim to exactly the paper length. */
  const rest = shuffled(BANK.filter(q => !picks.includes(q)), Date.now());
  while (picks.length < C.exam.questions && rest.length) picks.push(rest.pop());
  return shuffled(picks, Date.now()).slice(0, C.exam.questions);
}

function viewMock(main) {
  if (session && session.kind === "mock" && !session.over) return renderQuestion(main, session);
  if (session && session.kind === "mock" && session.over) return renderMockResult(main, session);

  const st = Store.get();
  const papers = window.PAPERS || [];

  main.appendChild(el("div", { class: "topbar" }, [
    el("div", {}, [
      el("span", { class: "eyebrow", text: "Timed exam simulation · " + C.exam.questions + " questions · " + C.exam.minutes + " minutes · " + C.exam.passPct + "% to clear" }),
      el("h1", { text: "The Gates" })
    ])
  ]));

  main.appendChild(el("p", { class: "lede", style: "margin-bottom:20px", text:
    "Five full papers, each weighted to the exam blueprint. No question appears in more than one, " +
    "so all five stay honest — you cannot pass Gate V by remembering Gate I." }));

  const best = st.papers || {};
  const grid = el("div", { class: "grid2" });

  papers.forEach((pp, idx) => {
    const rec = best[pp.id];
    const cleared = rec && rec.best >= C.exam.passPct;
    grid.appendChild(el("div", { class: "card gatecard" }, [
      el("div", { class: "bd" }, [
        el("div", { class: "modtop" }, [
          el("span", { class: "modnum", text: String(idx + 1) }),
          el("div", {}, [
            el("h3", { text: pp.name }),
            el("span", { class: "eyebrow", text: rec ? (rec.attempts + " attempt" + (rec.attempts === 1 ? "" : "s")) : "not attempted" })
          ]),
          rec ? el("span", { class: "gatescore " + (cleared ? "clear" : "fail"), text: rec.best + "%" }) : null
        ]),
        el("p", { class: "modblurb", text: pp.blurb }),
        el("div", { class: "modbar" }, [el("i", { style: "width:" + (rec ? Math.min(100, rec.best) : 0) + "%" })]),
        el("button", { class: "btn sm " + (rec ? "" : "primary"), style: "margin-top:10px",
          onclick: () => startPaper(pp) }, [rec ? "Re-sit" : "Enter gate"])
      ])
    ]));
  });
  main.appendChild(grid);

  main.appendChild(el("div", { class: "card", style: "margin-top:18px" }, [
    el("div", { class: "hd" }, [el("span", { class: "eyebrow", text: "How to use these" })]),
    el("div", { class: "bd" }, [
      el("ul", { class: "objs" }, [
        el("li", { text: "Sit each one properly: no notes, no pausing, one sitting. A mock you cheat on tells you nothing." }),
        el("li", { text: "Space them out. One per week beats five in a weekend — the gap is where the learning happens." }),
        el("li", { text: "Review every miss the same day. The error journal collects them automatically." }),
        el("li", { text: "Book the real exam once three different papers clear 80%. One lucky 80% is noise." })
      ]),
      el("p", { style: "margin-top:14px;font-size:14px;color:var(--dim)", text:
        "Or draw a random paper from the whole bank if you have exhausted these five." }),
      el("button", { class: "btn sm", style: "margin-top:8px", onclick: () => {
        session = { kind: "mock", paper: null, title: "Random draw", queue: buildMock(), i: 0, right: 0, answers: [], left: C.exam.minutes * 60, over: false };
        startClock(); render();
      } }, ["Random paper"])
    ])
  ]));
}

function startPaper(pp) {
  const byId = {};
  BANK.forEach(q => byId[q.id] = q);
  const queue = pp.q.map(id => byId[id]).filter(Boolean);
  session = { kind: "mock", paper: pp.id, title: pp.name, queue: queue,
              i: 0, right: 0, answers: [], left: C.exam.minutes * 60, over: false,
              snapshot: { p: progress(), r: readiness() } };
  startClock();
  render();
}

function fmtTime(sec) {
  const m = Math.floor(sec / 60), s = sec % 60;
  return m + ":" + String(s).padStart(2, "0");
}
function startClock() {
  clearInterval(tick);
  tick = setInterval(() => {
    if (!session || session.kind !== "mock" || session.over) return clearInterval(tick);
    session.left--;
    const c = $("#clock");
    if (c) { c.textContent = fmtTime(session.left); c.setAttribute("data-warn", String(session.left < 300)); }
    if (session.left <= 0) finishMock(session);
  }, 1000);
}
function finishMock(s) {
  clearInterval(tick);
  const beforeState = s.snapshot || { p: progress(), r: readiness() };
  s.over = true;
  const p = pct(s.right, s.queue.length);
  const st = Store.get();
  st.mocks.push({ ts: Date.now(), score: s.right, total: s.queue.length, pct: p, paper: s.paper || null, title: s.title || "Random" });
  if (s.paper) {
    st.papers = st.papers || {};
    const rec = st.papers[s.paper] || { attempts: 0, best: 0, last: 0 };
    rec.attempts++;
    rec.last = p;
    rec.best = Math.max(rec.best, p);
    st.papers[s.paper] = rec;
  }
  Store.save();
  render();
  checkMilestones(beforeState);
  drainNotify();
}

function renderMockResult(main, s) {
  const p = pct(s.right, s.queue.length);
  const passed = p >= C.exam.passPct;

  main.appendChild(el("div", { class: "topbar" }, [
    el("div", {}, [
      el("span", { class: "eyebrow", text: (s.title || "Mock exam") + " · result" }),
      el("h1", { text: passed ? "Pass — " + s.right + "/" + s.queue.length : "Below the line — " + s.right + "/" + s.queue.length })
    ])
  ]));
  main.appendChild(el("div", { class: "card" }, [el("div", { class: "bd" }, [gauge(p)])]));

  /* Per-module breakdown — where the marks actually went. */
  const byMod = {};
  s.queue.forEach((q, i) => {
    const b = byMod[q.m] || (byMod[q.m] = { r: 0, n: 0 });
    b.n++; if (s.answers[i]) b.r++;
  });
  main.appendChild(el("div", { class: "card" }, [
    el("div", { class: "hd" }, [el("span", { class: "eyebrow", text: "Where the marks went" })]),
    el("div", { class: "bd" }, [
      el("table", { class: "prose", style: "width:100%" }, [
        el("thead", {}, [el("tr", {}, [el("th", { text: "Module" }), el("th", { text: "Score" }), el("th", { text: "Rate" })])]),
        el("tbody", {}, Object.keys(byMod).sort((a, b) => pct(byMod[a].r, byMod[a].n) - pct(byMod[b].r, byMod[b].n)).map(k => {
          const b = byMod[k], rate = pct(b.r, b.n);
          return el("tr", {}, [
            el("td", { text: String(k).padStart(2, "0") + " " + moduleOf(+k).title }),
            el("td", { class: "num", text: b.r + "/" + b.n }),
            el("td", { class: "num", text: rate + "%", style: "color:var(--" + (rate >= C.exam.passPct ? "pass" : "fail") + ")" })
          ]);
        }))
      ])
    ])
  ]));

  const missed = s.queue.filter((q, i) => !s.answers[i]);
  if (missed.length) {
    main.appendChild(el("div", { class: "card" }, [
      el("div", { class: "hd" }, [el("span", { class: "eyebrow", text: "Review — " + missed.length + " missed" })]),
      el("div", { class: "bd" }, missed.map(q => el("div", { style: "padding:12px 0;border-bottom:1px solid var(--rule-2)" }, [
        el("div", { class: "qtext", text: q.q, style: "font-size:14px;margin-bottom:6px" }),
        q.code ? el("pre", { class: "code", style: "font-size:12px" }, [el("code", { text: q.code })]) : null,
        el("div", { style: "font-size:13px;color:var(--ink-2)" }, [
          el("b", { text: "Answer: " }),
          Array.isArray(q.a) ? q.a.map(i => q.opts[i]).join("  ·  ") : q.opts[q.a],
          el("br"), q.exp
        ]),
        figureFor(q)
      ])))
    ]));
  }

  main.appendChild(el("div", { style: "margin-top:16px" }, [
    el("button", { class: "btn", onclick: () => { session = null; render(); } }, ["New mock"]),
    el("button", { class: "btn primary", style: "margin-left:8px", onclick: () => { session = null; location.hash = "#/"; } }, ["Dashboard"])
  ]));
}

/* ── Error journal ───────────────────────────────────────────── */
function viewReview(main) {
  const st = Store.get();
  const rows = BANK.map(q => ({ q, r: st.seen[q.id] }))
    .filter(x => x.r && x.r.wrong > 0)
    .sort((a, b) => (b.r.wrong - b.r.right) - (a.r.wrong - a.r.right));

  main.appendChild(el("div", { class: "topbar" }, [
    el("div", {}, [el("span", { class: "eyebrow", text: "Every question you have ever missed" }), el("h1", { text: "Error journal" })]),
    el("div", { class: "spacer" }),
    rows.length ? el("button", { class: "btn primary", onclick: () => location.hash = "#/drill/weak" }, ["Drill these"]) : null
  ]));

  if (!rows.length) {
    main.appendChild(el("div", { class: "empty" }, [
      el("h2", { text: "Nothing here yet" }),
      el("p", { text: "Questions you get wrong land here and stay until you've beaten them more often than they've beaten you. An empty journal means you haven't drilled yet." })
    ]));
    return;
  }

  rows.forEach(({ q, r }) => {
    main.appendChild(el("div", { class: "card" }, [el("div", { class: "bd" }, [
      el("div", { class: "qmeta" }, [
        el("span", { class: "chip", text: String(q.m).padStart(2, "0") + " " + moduleOf(q.m).title }),
        el("span", { class: "chip", text: q.t }),
        el("span", { class: "chip", text: r.wrong + " wrong / " + r.right + " right" })
      ]),
      el("div", { class: "qtext", text: q.q, style: "font-size:15px" }),
      q.code ? el("pre", { class: "code" }, [el("code", { text: q.code })]) : null,
      el("div", { class: "verdict", "data-ok": "true" }, [
        el("div", { class: "tag", text: "Answer" }),
        el("p", {}, [
          el("b", { text: Array.isArray(q.a) ? q.a.map(i => q.opts[i]).join("  ·  ") : q.opts[q.a] }),
          el("br"), q.exp
        ]),
        figureFor(q)
      ])
    ])]));
  });
}

/* ── Flashcards ──────────────────────────────────────────────── */
function viewCards(main) {
  if (!CARDS.length) {
    main.appendChild(el("div", { class: "empty" }, [el("h2", { text: "No cards loaded" })]));
    return;
  }
  let i = Math.floor(Math.random() * CARDS.length), shown = false;

  main.appendChild(el("div", { class: "topbar" }, [
    el("div", {}, [el("span", { class: "eyebrow", text: CARDS.length + " cards" }), el("h1", { text: "Flashcards" })])
  ]));

  const card = el("div", { class: "card" });
  const face = el("div", { class: "flash" });
  card.appendChild(face);
  main.appendChild(card);
  main.appendChild(el("p", { class: "eyebrow", style: "margin-top:12px", text: "Click the card to reveal · press N for the next one" }));

  function draw() {
    face.textContent = "";
    face.appendChild(el("div", { class: "front", text: CARDS[i][0] }));
    if (shown) face.appendChild(el("div", { class: "back", text: CARDS[i][1] }));
    else face.appendChild(el("div", { class: "eyebrow", text: "click to reveal" }));
  }
  face.addEventListener("click", () => { if (shown) { i = (i + 1) % CARDS.length; shown = false; } else shown = true; draw(); });
  main._keys = e => { if (e.key.toLowerCase() === "n") { i = (i + 1) % CARDS.length; shown = false; draw(); } };
  document.addEventListener("keydown", main._keys);
  draw();
}

/* ── Settings ────────────────────────────────────────────────── */
function viewSettings(main) {
  const st = Store.get();
  main.appendChild(el("div", { class: "topbar" }, [
    el("div", {}, [el("span", { class: "eyebrow", text: "Local to this browser" }), el("h1", { text: "Settings" })])
  ]));

  main.appendChild(el("div", { class: "card" }, [el("div", { class: "bd" }, [
    el("h3", { text: "Storage", style: "margin-bottom:8px" }),
    el("p", { style: "font-size:14px;color:var(--ink-2);margin-bottom:14px", text: Store.persistent
      ? "Progress is saved in this browser's local storage. It is not synced anywhere and clearing site data will erase it."
      : "This browser is blocking local storage on file:// pages, so progress will be lost when you close the tab. Serving the folder over http (python3 -m http.server) fixes it." }),
    el("button", { class: "btn", onclick: () => {
      const blob = new Blob([JSON.stringify(st, null, 2)], { type: "application/json" });
      const a = el("a", { href: URL.createObjectURL(blob), download: "ocp25-progress.json" });
      document.body.appendChild(a); a.click(); a.remove();
    } }, ["Export progress"]),
    el("button", { class: "btn", style: "margin-left:8px", onclick: () => {
      if (confirm("Erase all progress, streaks and mock history? This cannot be undone.")) { Store.reset(); render(); }
    } }, ["Erase progress"])
  ])]));

  main.appendChild(el("div", { class: "card" }, [el("div", { class: "bd" }, [
    el("h3", { text: "Question bank", style: "margin-bottom:8px" }),
    statBlock([
      { k: "Questions", v: BANK.length },
      { k: "Flashcards", v: CARDS.length },
      { k: "Modules", v: C.modules.length }
    ])
  ])]));
}

/* ══════════════════════════════════════════════════════════════
   Router + chrome
   ══════════════════════════════════════════════════════════════ */
const ROUTES = [
  { path: "#/",          label: "Readiness",     group: "Study" },
  { path: "#/course",    label: "The course",    group: "Study" },
  { path: "#/modules",   label: "Module index",  group: "Study" },
  { path: "#/drill/all", label: "Free drill",    group: "Practice" },
  { path: "#/mock",      label: "Mock exam",     group: "Practice" },
  { path: "#/cards",     label: "Flashcards",    group: "Practice" },
  { path: "#/review",    label: "Error journal", group: "Practice" },
  { path: "#/settings",  label: "Settings",      group: "System" }
];

function buildRail() {
  const rail = $("#rail");
  rail.textContent = "";
  /* Mark: a cup whose body is built from stack frames — the two
     things this repo is about, in one glyph. */
  const MARK =
    '<svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">' +
      '<path d="M8.5 4.5c0 1.6-1.6 1.9-1.6 3.4M12 3c0 1.9-1.8 2.2-1.8 4M15.4 4.5c0 1.6-1.5 1.9-1.5 3.4" ' +
        'fill="none" stroke="var(--dim)" stroke-width="1.3" stroke-linecap="round"/>' +
      '<path d="M5.4 11h13.2l-1.5 13.2a2 2 0 0 1-2 1.8h-6.2a2 2 0 0 1-2-1.8Z" ' +
        'fill="none" stroke="var(--crema)" stroke-width="1.7" stroke-linejoin="round"/>' +
      '<path d="M19.2 13.4h2.4a3.1 3.1 0 0 1 0 6.2h-1.8" ' +
        'fill="none" stroke="var(--crema)" stroke-width="1.6" stroke-linecap="round"/>' +
      '<rect x="7.9" y="13.6" width="8.2" height="2.5" rx="0.6" fill="var(--crema)" opacity=".85"/>' +
      '<rect x="8.4" y="17.2" width="7.2" height="2.5" rx="0.6" fill="var(--crema)" opacity=".55"/>' +
      '<rect x="8.9" y="20.8" width="6.2" height="2.5" rx="0.6" fill="var(--crema)" opacity=".3"/>' +
    '</svg>';

  const brand = el("div", { class: "brand" });
  const lock = el("div", { class: "lock" });
  lock.innerHTML = MARK;
  lock.appendChild(el("div", {}, [
    el("span", { class: "mark" }, ["Java", el("b", { text: "Boy" })]),
    el("span", { class: "sub", text: "OCP 25 · " + C.exam.code })
  ]));
  brand.appendChild(lock);
  brand.appendChild(el("div", { class: "by" }, [
    "Built by ", el("b", { text: "Yassin Ghariani" })
  ]));
  rail.appendChild(brand);

  ["Study", "Practice", "System"].forEach(g => {
    const grp = el("div", { class: "railgroup" }, [el("span", { class: "eyebrow", text: g })]);
    ROUTES.filter(r => r.group === g).forEach(r => {
      grp.appendChild(el("button", {
        class: "navitem",
        "aria-current": String(location.hash === r.path || (r.path === "#/" && !location.hash)),
        onclick: () => { location.hash = r.path; closeRail(); }
      }, [el("span", { class: "idx", text: "" }), el("span", { text: r.label })]));
    });
    rail.appendChild(grp);
  });

  const grp = el("div", { class: "railgroup" }, [el("span", { class: "eyebrow", text: "Modules" })]);
  C.modules.forEach(m => {
    grp.appendChild(el("button", {
      class: "navitem",
      "aria-current": String(location.hash === "#/read/" + m.slug || location.hash === "#/module/" + m.id),
      onclick: () => { location.hash = "#/read/" + m.slug; closeRail(); }
    }, [
      el("span", { class: "idx", text: String(m.id).padStart(2, "0") }),
      el("span", { text: m.title }),
      el("span", { class: "dot", "data-state": moduleState(m.id) })
    ]));
  });
  rail.appendChild(grp);
}

function closeRail() { $("#rail").setAttribute("data-open", "false"); }

function render() {
  const main = $("#main");
  if (main._keys) { document.removeEventListener("keydown", main._keys); main._keys = null; }
  if (main._io) { main._io.disconnect(); main._io = null; }
  main.textContent = "";
  buildRail();

  const h = location.hash || "#/";
  const parts = h.split("/");

  if (h === "#/") viewDashboard(main);
  else if (h === "#/course") viewCourse(main);
  else if (parts[1] === "read") viewNotes(main, decodeURIComponent(parts.slice(2).join("/")));
  else if (h === "#/modules") viewModules(main);
  else if (parts[1] === "module") viewModule(main, parseInt(parts[2], 10));
  else if (parts[1] === "drill") viewDrill(main, parts[2] || "all");
  else if (h === "#/mock") viewMock(main);
  else if (h === "#/review") viewReview(main);
  else if (h === "#/cards") viewCards(main);
  else if (h === "#/settings") viewSettings(main);
  else viewDashboard(main);

  try { window.scrollTo(0, 0); } catch (e) {}
  drainNotify();
}

/* Theme: follow the OS unless the reader has chosen. */
function initTheme() {
  const set = t => { document.documentElement.setAttribute("data-theme", t); };
  let pref = "dark";
  try {
    const st = Store.get();
    if (st.theme) pref = st.theme;
    else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) pref = "light";
  } catch (e) { /* theme is cosmetic — never let it block boot */ }
  set(pref);
  const btn = $("#themebtn");
  if (btn) btn.addEventListener("click", () => {
    const now = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    set(now); Store.get().theme = now; Store.save();
  });
}

window.addEventListener("hashchange", () => {
  /* Navigating away ends a drill, and clears a FINISHED mock so the gate
     picker is reachable again. A mock still in progress survives, so an
     accidental click doesn't destroy a timed attempt. */
  if (session && session.kind === "drill") session = null;
  else if (session && session.kind === "mock" && session.over) session = null;
  render();
});
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  $("#railbtn").addEventListener("click", () => {
    const r = $("#rail");
    r.setAttribute("data-open", r.getAttribute("data-open") === "true" ? "false" : "true");
  });
  render();
});

})();
