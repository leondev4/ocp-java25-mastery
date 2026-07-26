/* ══════════════════════════════════════════════════════════════
   md.js — course text rendering
     · Markdown subset used by the notes
     · Java syntax highlighting
     · A flowchart renderer for the Mermaid subset in these files,
       drawn in the app's own palette rather than Mermaid's defaults.
   ══════════════════════════════════════════════════════════════ */
(function () {
"use strict";

const esc = s => String(s)
  .replace(/&(?!(?:amp|lt|gt|quot|#\d+|nbsp);)/g, "&amp;")
  .replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* ── Java syntax highlighting ─────────────────────────────────── */
const KEYWORDS = new Set(("abstract assert boolean break byte case catch char class const continue default do " +
  "double else enum extends final finally float for goto if implements import instanceof int interface long " +
  "native new package private protected public return short static strictfp super switch synchronized this " +
  "throw throws transient try void volatile while var yield record sealed permits non-sealed when module " +
  "requires exports opens uses provides to with transitive true false null").split(" "));

const TYPES = new Set(("String Integer Long Double Float Boolean Character Byte Short Object List Map Set " +
  "ArrayList HashMap HashSet LinkedList TreeMap TreeSet Optional Stream IntStream Collectors Gatherers " +
  "Gatherer LocalDate LocalTime LocalDateTime Instant Duration Period Path Files Thread Runnable Callable " +
  "Executors ExecutorService Future ScopedValue StringBuilder Math System IO Exception RuntimeException " +
  "IOException Comparator Comparable Arrays Collections Deque ArrayDeque Queue Iterator Locale " +
  "ResourceBundle NumberFormat DateTimeFormatter AtomicInteger ConcurrentHashMap CopyOnWriteArrayList").split(" "));

function highlightJava(src) {
  let out = "", i = 0;
  const n = src.length;
  while (i < n) {
    const c = src[i];

    /* line comment */
    if (c === "/" && src[i + 1] === "/") {
      let j = src.indexOf("\n", i); if (j < 0) j = n;
      out += '<span class="t-cm">' + esc(src.slice(i, j)) + "</span>"; i = j; continue;
    }
    /* block comment */
    if (c === "/" && src[i + 1] === "*") {
      let j = src.indexOf("*/", i + 2); j = j < 0 ? n : j + 2;
      out += '<span class="t-cm">' + esc(src.slice(i, j)) + "</span>"; i = j; continue;
    }
    /* text block */
    if (c === '"' && src.slice(i, i + 3) === '"""') {
      let j = src.indexOf('"""', i + 3); j = j < 0 ? n : j + 3;
      out += '<span class="t-st">' + esc(src.slice(i, j)) + "</span>"; i = j; continue;
    }
    /* string / char */
    if (c === '"' || c === "'") {
      let j = i + 1;
      while (j < n && src[j] !== c) { if (src[j] === "\\") j++; j++; }
      j = Math.min(j + 1, n);
      out += '<span class="t-st">' + esc(src.slice(i, j)) + "</span>"; i = j; continue;
    }
    /* annotation */
    if (c === "@" && /[A-Za-z]/.test(src[i + 1] || "")) {
      let j = i + 1; while (j < n && /[\w.]/.test(src[j])) j++;
      out += '<span class="t-an">' + esc(src.slice(i, j)) + "</span>"; i = j; continue;
    }
    /* number */
    if (/[0-9]/.test(c) && !/[\w.]/.test(src[i - 1] || " ")) {
      let j = i; while (j < n && /[\w.]/.test(src[j])) j++;
      out += '<span class="t-nu">' + esc(src.slice(i, j)) + "</span>"; i = j; continue;
    }
    /* word */
    if (/[A-Za-z_$]/.test(c)) {
      let j = i; while (j < n && /[\w$]/.test(src[j])) j++;
      const w = src.slice(i, j);
      let cls = "";
      if (KEYWORDS.has(w)) cls = "t-kw";
      else if (TYPES.has(w) || /^[A-Z][A-Za-z0-9]*$/.test(w)) cls = "t-ty";
      else if (src[j] === "(") cls = "t-fn";
      out += cls ? '<span class="' + cls + '">' + esc(w) + "</span>" : esc(w);
      i = j; continue;
    }
    out += esc(c); i++;
  }
  return out;
}

/* ── Flowchart renderer (Mermaid subset) ──────────────────────
   Handles: flowchart LR|TB, node[label], subgraph blocks,
   solid/dotted/labelled edges, chained edges, self-loops.
   Mermaid's hard-coded dark hex fills are mapped onto the app's
   semantic palette by hue so meaning survives theme changes.  */

function hueClass(hex) {
  if (!hex) return "";
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return "";
  const v = parseInt(m[1], 16);
  const r = (v >> 16) & 255, g = (v >> 8) & 255, b = v & 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  if (max - min < 12) return "";
  let h;
  if (max === r) h = 60 * (((g - b) / (max - min)) % 6);
  else if (max === g) h = 60 * ((b - r) / (max - min) + 2);
  else h = 60 * ((r - g) / (max - min) + 4);
  if (h < 0) h += 360;
  if (h < 20 || h >= 330) return "n-fail";
  if (h < 45)  return "n-brass";
  if (h < 70)  return "n-brass";
  if (h < 165) return "n-pass";
  if (h < 255) return "n-cyan";
  return "n-violet";
}

function decodeLabel(s) {
  return String(s)
    .replace(/&quot;/g, '"').replace(/&amp;/g, "&")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/^["']|["']$/g, "");
}

function parseFlow(src) {
  const lines = src.split("\n").map(l => l.trim()).filter(Boolean);
  let dir = "LR";
  const nodes = new Map();   // id -> {id,label,cls}
  const edges = [];
  const groups = [];
  const stack = [];

  const nodeRe = /([A-Za-z_][\w]*)\s*(?:\[\s*"?([^\]"]*)"?\s*\]|\(\s*"?([^)"]*)"?\s*\)|\{\s*"?([^}"]*)"?\s*\})/g;

  function touch(id, label) {
    if (!nodes.has(id)) nodes.set(id, { id, label: label !== undefined ? decodeLabel(label) : id, cls: "" });
    else if (label !== undefined && nodes.get(id).label === id) nodes.get(id).label = decodeLabel(label);
    if (stack.length) {
      const g = stack[stack.length - 1];
      if (g.members.indexOf(id) < 0) g.members.push(id);
    }
    return id;
  }

  for (const raw of lines) {
    if (/^flowchart|^graph/i.test(raw)) {
      const d = raw.split(/\s+/)[1];
      if (d && /^(LR|RL|TB|TD|BT)$/i.test(d)) dir = /TB|TD|BT/i.test(d) ? "TB" : "LR";
      continue;
    }
    if (/^subgraph\b/i.test(raw)) {
      const m = /^subgraph\s+([A-Za-z_][\w]*)\s*(?:\[\s*"?([^\]"]*)"?\s*\])?/.exec(raw);
      const g = { id: m ? m[1] : "g" + groups.length, label: m && m[2] ? decodeLabel(m[2]) : "", members: [] };
      groups.push(g); stack.push(g); continue;
    }
    if (/^end$/i.test(raw)) { stack.pop(); continue; }
    if (/^style\s+/i.test(raw)) {
      const m = /^style\s+([A-Za-z_][\w]*)\s+(.*)$/i.exec(raw);
      if (m) {
        const fill = /fill:\s*(#[0-9a-f]{3,8})/i.exec(m[2]);
        touch(m[1]);
        nodes.get(m[1]).cls = hueClass(fill && fill[1]);
      }
      continue;
    }
    if (/^(classDef|class|linkStyle|click|direction)\b/i.test(raw)) continue;

    /* Register any node declarations on this line. */
    nodeRe.lastIndex = 0;
    let nm;
    while ((nm = nodeRe.exec(raw)) !== null) {
      touch(nm[1], nm[2] !== undefined ? nm[2] : nm[3] !== undefined ? nm[3] : nm[4]);
    }

    /* Split the line into an alternating chain of segments and arrows. */
    const arrowRe = /\s*(-\.[^.>]*\.->|-\.->|==>|-->|---)\s*(?:\|\s*"?([^|"]*)"?\s*\|)?\s*/g;
    const parts = [], arrows = [];
    let last = 0, am;
    while ((am = arrowRe.exec(raw)) !== null) {
      parts.push(raw.slice(last, am.index));
      let text = am[2] || "";
      const dotted = am[1].indexOf("-.") === 0;
      if (!text && dotted) {
        const inner = /-\.(.*)\.->/.exec(am[1]);
        if (inner && inner[1]) text = inner[1];
      }
      arrows.push({ dotted, text: decodeLabel(text) });
      last = arrowRe.lastIndex;
    }
    if (!arrows.length) continue;
    parts.push(raw.slice(last));

    const ids = parts.map(p => {
      const m = /([A-Za-z_][\w]*)/.exec(p);
      return m ? m[1] : null;
    });
    for (let i = 0; i < arrows.length; i++) {
      const a = ids[i], b = ids[i + 1];
      if (!a || !b) continue;
      touch(a); touch(b);
      edges.push({ from: a, to: b, dotted: arrows[i].dotted, text: arrows[i].text });
    }
  }
  return { dir, nodes: [...nodes.values()], edges, groups };
}

const CH = 6.6, LH = 16, PADX = 14, PADY = 11, MINW = 74;

function measure(label) {
  const lines = String(label).split("\n");
  const w = Math.max(MINW, Math.max(...lines.map(l => l.length)) * CH + PADX * 2);
  const h = lines.length * LH + PADY * 2;
  return { w: Math.min(w, 250), h, lines };
}

function layout(g) {
  const byId = {};
  g.nodes.forEach(n => { byId[n.id] = n; Object.assign(n, measure(n.label)); });

  /* Rank by longest path, ignoring edges that would close a cycle. */
  const indeg = {}, adj = {};
  g.nodes.forEach(n => { indeg[n.id] = 0; adj[n.id] = []; });
  const forward = [];
  const seenPair = new Set();
  g.edges.forEach(e => {
    if (e.from === e.to) { e.self = true; return; }
    const k = e.from + ">" + e.to;
    if (seenPair.has(k)) { e.parallel = true; }
    seenPair.add(k);
    forward.push(e);
    adj[e.from].push(e.to); indeg[e.to]++;
  });

  const rank = {};
  g.nodes.forEach(n => rank[n.id] = 0);
  const q = g.nodes.filter(n => indeg[n.id] === 0).map(n => n.id);
  const deg = Object.assign({}, indeg);
  const order = [];
  while (q.length) {
    const id = q.shift(); order.push(id);
    adj[id].forEach(t => {
      rank[t] = Math.max(rank[t], rank[id] + 1);
      if (--deg[t] === 0) q.push(t);
    });
  }
  /* Anything left is in a cycle — place it after its earliest predecessor. */
  g.nodes.forEach(n => { if (order.indexOf(n.id) < 0) rank[n.id] = rank[n.id] || 0; });

  const ranks = {};
  g.nodes.forEach(n => { (ranks[rank[n.id]] = ranks[rank[n.id]] || []).push(n); });
  const keys = Object.keys(ranks).map(Number).sort((a, b) => a - b);

  const GAP_MAIN = 62, GAP_CROSS = 22;
  let cursor = 0;
  const isLR = g.dir === "LR";

  keys.forEach(k => {
    const group = ranks[k];
    const span = isLR ? Math.max(...group.map(n => n.w)) : Math.max(...group.map(n => n.h));
    let cross = 0;
    group.forEach(n => {
      if (isLR) { n.x = cursor + (span - n.w) / 2; n.y = cross; cross += n.h + GAP_CROSS; }
      else      { n.y = cursor + (span - n.h) / 2; n.x = cross; cross += n.w + GAP_CROSS; }
    });
    /* centre each rank on the cross axis */
    const total = cross - GAP_CROSS;
    group.forEach(n => { if (isLR) n._cross = total; else n._cross = total; });
    group._total = total;
    cursor += span + GAP_MAIN;
  });

  const maxCross = Math.max(...keys.map(k => ranks[k]._total));
  keys.forEach(k => {
    const shift = (maxCross - ranks[k]._total) / 2;
    ranks[k].forEach(n => { if (isLR) n.y += shift; else n.x += shift; });
  });

  g.rank = rank;
  return g;
}


/* Rough polyline length of a cubic path — good enough to seed the
   stroke-dashoffset animation without measuring in the DOM. */
function pathLen(x1, y1, x2, y2) {
  return Math.round(Math.hypot(x2 - x1, y2 - y1) * 1.35) + 30;
}

function renderFlow(src) {
  /* Only claim diagrams this layout engine actually understands.
     Forcing a timeline or sequence through it produces a meaningless
     scatter of disconnected boxes, which is worse than the source. */
  if (!/^\s*(flowchart|graph)\b/i.test(src)) return null;
  let g;
  try { g = layout(parseFlow(src)); } catch (e) { return null; }
  if (!g.nodes.length) return null;

  const isLR = g.dir === "LR";
  const PAD = 26;
  let maxX = 0, maxY = 0, minX = 1e9, minY = 1e9;
  g.nodes.forEach(n => {
    maxX = Math.max(maxX, n.x + n.w); maxY = Math.max(maxY, n.y + n.h);
    minX = Math.min(minX, n.x); minY = Math.min(minY, n.y);
  });

  const parts = [];
  parts.push('<defs>' +
    '<marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">' +
    '<path d="M0,0 L10,5 L0,10 z" class="ar-h"/></marker></defs>');

  /* Subgroup containers behind everything else. */
  g.groups.forEach(gr => {
    const ms = gr.members.map(id => g.nodes.find(n => n.id === id)).filter(Boolean);
    if (!ms.length) return;
    const x1 = Math.min(...ms.map(n => n.x)) - 13, y1 = Math.min(...ms.map(n => n.y)) - 26;
    const x2 = Math.max(...ms.map(n => n.x + n.w)) + 13, y2 = Math.max(...ms.map(n => n.y + n.h)) + 13;
    minX = Math.min(minX, x1); minY = Math.min(minY, y1);
    maxX = Math.max(maxX, x2); maxY = Math.max(maxY, y2);
    parts.push('<rect class="fc-group" style="--i:0" x="' + x1 + '" y="' + y1 + '" width="' + (x2 - x1) + '" height="' + (y2 - y1) + '" rx="5"/>');
    if (gr.label) parts.push('<text class="fc-glabel" x="' + (x1 + 10) + '" y="' + (y1 + 16) + '">' + esc(gr.label) + "</text>");
  });

  /* Edges. */
  g.edges.forEach((e, ei) => {
    const a = g.nodes.find(n => n.id === e.from), b = g.nodes.find(n => n.id === e.to);
    if (!a || !b) return;
    const cls = "fc-edge" + (e.dotted ? " dotted" : "");

    if (e.self) {
      const cx = a.x + a.w / 2, top = a.y;
      parts.push('<path class="' + cls + '" style="--i:' + (ei + 2) + ';--len:120" marker-end="url(#ah)" d="M' + (cx - 16) + "," + top +
        " C" + (cx - 26) + "," + (top - 34) + " " + (cx + 26) + "," + (top - 34) + " " + (cx + 12) + "," + (top - 2) + '"/>');
      if (e.text) parts.push('<text class="fc-elabel" x="' + cx + '" y="' + (top - 38) + '" text-anchor="middle">' + esc(e.text) + "</text>");
      return;
    }

    const back = g.rank[e.to] < g.rank[e.from];
    let x1, y1, x2, y2, d;
    if (isLR) {
      if (back) {
        x1 = a.x; y1 = a.y + a.h / 2; x2 = b.x + b.w; y2 = b.y + b.h / 2;
        const dip = Math.max(a.y + a.h, b.y + b.h) + 26;
        d = "M" + x1 + "," + y1 + " C" + (x1 - 30) + "," + dip + " " + (x2 + 30) + "," + dip + " " + x2 + "," + y2;
      } else {
        x1 = a.x + a.w; y1 = a.y + a.h / 2; x2 = b.x; y2 = b.y + b.h / 2;
        const mx = (x1 + x2) / 2;
        d = "M" + x1 + "," + y1 + " C" + mx + "," + y1 + " " + mx + "," + y2 + " " + x2 + "," + y2;
      }
    } else {
      if (back) {
        x1 = a.x + a.w / 2; y1 = a.y; x2 = b.x + b.w / 2; y2 = b.y + b.h;
        const side = Math.max(a.x + a.w, b.x + b.w) + 26;
        d = "M" + x1 + "," + y1 + " C" + side + "," + (y1 - 30) + " " + side + "," + (y2 + 30) + " " + x2 + "," + y2;
      } else {
        x1 = a.x + a.w / 2; y1 = a.y + a.h; x2 = b.x + b.w / 2; y2 = b.y;
        const my = (y1 + y2) / 2;
        d = "M" + x1 + "," + y1 + " C" + x1 + "," + my + " " + x2 + "," + my + " " + x2 + "," + y2;
      }
    }
    parts.push('<path class="' + cls + '" style="--i:' + (ei + 2) + ';--len:' + pathLen(x1, y1, x2, y2) + '" marker-end="url(#ah)" d="' + d + '"/>');
    if (e.text) {
      const lx = (x1 + x2) / 2, ly = (y1 + y2) / 2 - 6;
      const wpx = e.text.length * 5.6 + 10;
      parts.push('<rect class="fc-elabel-bg" style="--i:' + (ei + 3) + '" x="' + (lx - wpx / 2) + '" y="' + (ly - 11) + '" width="' + wpx + '" height="15" rx="2"/>');
      parts.push('<text class="fc-elabel" style="--i:' + (ei + 3) + '" x="' + lx + '" y="' + ly + '" text-anchor="middle">' + esc(e.text) + "</text>");
    }
  });

  /* Nodes on top. */
  g.nodes.forEach(n => {
    parts.push('<g class="fc-node ' + (n.cls || "") + '" style="--i:' + (g.rank[n.id] || 0) + '">');
    parts.push('<rect x="' + n.x + '" y="' + n.y + '" width="' + n.w + '" height="' + n.h + '" rx="4"/>');
    n.lines.forEach((ln, i) => {
      parts.push('<text x="' + (n.x + n.w / 2) + '" y="' + (n.y + PADY + 12 + i * LH) + '" text-anchor="middle">' + esc(ln) + "</text>");
    });
    parts.push("</g>");
  });

  const vw = maxX - minX + PAD * 2, vh = maxY - minY + PAD * 2;
  return '<div class="fc-wrap"><svg class="fc" viewBox="' + (minX - PAD) + " " + (minY - PAD) + " " + vw + " " + vh + '" ' +
    'width="' + Math.min(vw, 860) + '" role="img" aria-label="Diagram">' + parts.join("") + "</svg></div>";
}

/* ── Timeline renderer ────────────────────────────────────────
   `timeline` / `title X` / `Era : event : event`               */
function renderTimeline(src) {
  if (!/^\s*timeline\b/i.test(src)) return null;
  const lines = src.split("\n").map(l => l.trim()).filter(Boolean);
  let title = "";
  const eras = [];
  lines.forEach(l => {
    if (/^timeline$/i.test(l)) return;
    if (/^title\s+/i.test(l)) { title = l.replace(/^title\s+/i, ""); return; }
    const bits = l.split(":").map(s => s.trim()).filter(Boolean);
    if (bits.length < 2) return;
    eras.push({ label: bits[0], events: bits.slice(1) });
  });
  if (!eras.length) return null;

  const rows = eras.map(e =>
    '<li class="tl-era">' +
      '<div class="tl-mark"><span class="tl-dot"></span></div>' +
      '<div class="tl-body">' +
        '<div class="tl-label">' + esc(e.label) + "</div>" +
        '<ul class="tl-events">' + e.events.map(v => "<li>" + inline(v) + "</li>").join("") + "</ul>" +
      "</div>" +
    "</li>").join("");

  return '<figure class="tl-wrap">' +
    (title ? '<figcaption class="tl-title">' + esc(title) + "</figcaption>" : "") +
    '<ol class="tl">' + rows + "</ol></figure>";
}

/* ── Sequence renderer ────────────────────────────────────────
   participant X as Label / A->>B: msg / A-->>B: msg / Note over X: t */
function renderSequence(src) {
  if (!/^\s*sequenceDiagram\b/i.test(src)) return null;
  const lines = src.split("\n").map(l => l.trim()).filter(Boolean);
  const actors = [];
  const byId = {};
  const steps = [];

  lines.forEach(l => {
    if (/^sequenceDiagram$/i.test(l)) return;
    let m = /^participant\s+(\S+)(?:\s+as\s+(.*))?$/i.exec(l);
    if (m) { const a = { id: m[1], label: decodeLabel(m[2] || m[1]) }; actors.push(a); byId[m[1]] = a; return; }
    m = /^Note\s+(?:over|left of|right of)\s+([^:]+):\s*(.*)$/i.exec(l);
    if (m) { steps.push({ type: "note", who: m[1].split(",")[0].trim(), text: decodeLabel(m[2]) }); return; }
    m = /^(\S+?)\s*(--?>>?|-->>|->>|-->)\s*(\S+?)\s*:\s*(.*)$/.exec(l);
    if (m) {
      [m[1], m[3]].forEach(id => { if (!byId[id]) { const a = { id, label: id }; actors.push(a); byId[id] = a; } });
      steps.push({ type: "msg", from: m[1], to: m[3], text: decodeLabel(m[4]), dashed: m[2].indexOf("--") === 0 });
    }
  });
  if (!actors.length || !steps.length) return null;

  const COLW = 250, TOP = 54, ROW = 46, PADX = 24;
  const x = {};
  actors.forEach((a, i) => x[a.id] = PADX + COLW / 2 + i * COLW);
  const width = PADX * 2 + COLW * actors.length;
  const height = TOP + steps.length * ROW + 30;

  const p = [];
  p.push('<defs><marker id="sh" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">' +
    '<path d="M0,0 L10,5 L0,10 z" class="ar-h"/></marker></defs>');

  actors.forEach(a => {
    const w = Math.min(COLW - 22, Math.max(90, a.label.length * 6.6 + 22));
    p.push('<g class="fc-node n-cyan"><rect x="' + (x[a.id] - w / 2) + '" y="14" width="' + w + '" height="30" rx="4"/>' +
      '<text x="' + x[a.id] + '" y="33" text-anchor="middle">' + esc(a.label) + "</text></g>");
    p.push('<line class="sq-life" x1="' + x[a.id] + '" y1="46" x2="' + x[a.id] + '" y2="' + (height - 16) + '"/>');
  });

  steps.forEach((s, i) => {
    const y = TOP + i * ROW + 22;
    if (s.type === "note") {
      const cx = x[s.who] !== undefined ? x[s.who] : width / 2;
      const w = Math.min(COLW + 40, s.text.length * 6.2 + 22);
      p.push('<rect class="sq-note" x="' + (cx - w / 2) + '" y="' + (y - 15) + '" width="' + w + '" height="26" rx="3"/>');
      p.push('<text class="sq-notetext" x="' + cx + '" y="' + (y + 2) + '" text-anchor="middle">' + esc(s.text) + "</text>");
      return;
    }
    const a = x[s.from], b = x[s.to];
    if (a === undefined || b === undefined) return;
    p.push('<line class="sq-msg' + (s.dashed ? " dashed" : "") + '" marker-end="url(#sh)" x1="' + a + '" y1="' + y + '" x2="' + b + '" y2="' + y + '"/>');
    p.push('<text class="fc-elabel" x="' + ((a + b) / 2) + '" y="' + (y - 7) + '" text-anchor="middle">' + esc(s.text) + "</text>");
  });

  return '<div class="fc-wrap"><svg class="fc" viewBox="0 0 ' + width + " " + height + '" width="' + Math.min(width, 860) + '" role="img" aria-label="Sequence diagram">' +
    p.join("") + "</svg></div>";
}

function renderDiagram(src) {
  return renderFlow(src) || renderTimeline(src) || renderSequence(src);
}

/* ── Inline markdown ──────────────────────────────────────────── */
function inline(s) {
  let t = esc(s);
  t = t.replace(/`([^`]+)`/g, (m, c) => '<code>' + c + "</code>");
  t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  t = t.replace(/(^|[\s(])\*([^*\n]+)\*(?=[\s).,;:!?]|$)/g, "$1<em>$2</em>");
  t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (m, txt, href) =>
    '<a href="' + href.replace(/"/g, "&quot;") + '"' + (/^https?:/.test(href) ? ' target="_blank" rel="noopener"' : "") + ">" + txt + "</a>");
  return t;
}

const slugify = s => s.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-").slice(0, 60);

/* ── Block markdown ───────────────────────────────────────────── */
function render(md) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const out = [];
  const toc = [];
  let i = 0;

  const listStack = [];
  function closeLists(toDepth) {
    while (listStack.length > toDepth) out.push(listStack.pop() === "ul" ? "</ul>" : "</ol>");
  }

  while (i < lines.length) {
    const line = lines[i];

    /* fenced code */
    if (/^\s*```/.test(line)) {
      closeLists(0);
      const lang = line.replace(/^\s*```/, "").trim().toLowerCase();
      const buf = [];
      i++;
      while (i < lines.length && !/^\s*```/.test(lines[i])) { buf.push(lines[i]); i++; }
      i++;
      const body = buf.join("\n");
      if (lang === "mermaid") {
        const svg = renderDiagram(body);
        out.push(svg || ('<pre class="code"><code>' + esc(body) + "</code></pre>"));
      } else if (lang === "java" || lang === "" || lang === "jshell") {
        out.push('<pre class="code"><code>' + highlightJava(body) + "</code></pre>");
      } else {
        out.push('<pre class="code"><code>' + esc(body) + "</code></pre>");
      }
      continue;
    }

    /* table */
    if (/^\s*\|/.test(line) && /^\s*\|[\s:|-]+\|?\s*$/.test(lines[i + 1] || "")) {
      closeLists(0);
      const head = line.split("|").slice(1, -1).map(c => c.trim());
      i += 2;
      const rows = [];
      while (i < lines.length && /^\s*\|/.test(lines[i])) {
        rows.push(lines[i].split("|").slice(1, -1).map(c => c.trim()));
        i++;
      }
      out.push('<div class="tablewrap"><table><thead><tr>' +
        head.map(h => "<th>" + inline(h) + "</th>").join("") + "</tr></thead><tbody>" +
        rows.map(r => "<tr>" + r.map(c => "<td>" + inline(c) + "</td>").join("") + "</tr>").join("") +
        "</tbody></table></div>");
      continue;
    }

    /* heading */
    const h = /^(#{1,6})\s+(.*)$/.exec(line);
    if (h) {
      closeLists(0);
      const lvl = h[1].length, txt = h[2].trim();
      const id = slugify(txt);
      if (lvl <= 3) toc.push({ level: lvl, text: txt.replace(/[#*`]/g, "").trim(), id });
      out.push("<h" + lvl + ' id="' + id + '">' + inline(txt) + "</h" + lvl + ">");
      i++; continue;
    }

    /* hr */
    if (/^\s*(---|\*\*\*|___)\s*$/.test(line)) { closeLists(0); out.push("<hr>"); i++; continue; }

    /* blockquote */
    if (/^\s*>/.test(line)) {
      closeLists(0);
      const buf = [];
      while (i < lines.length && /^\s*>/.test(lines[i])) { buf.push(lines[i].replace(/^\s*>\s?/, "")); i++; }
      out.push('<blockquote>' + render(buf.join("\n")).html + "</blockquote>");
      continue;
    }

    /* raw HTML block (details/summary/div used in the notes) */
    if (/^\s*<(details|summary|div|\/details|\/div|br)/i.test(line)) {
      closeLists(0);
      out.push(line); i++; continue;
    }

    /* list item */
    const li = /^(\s*)([-*+]|\d+\.)\s+(.*)$/.exec(line);
    if (li) {
      const depth = Math.floor(li[1].length / 2) + 1;
      const ordered = /\d/.test(li[2]);
      while (listStack.length < depth) { out.push(ordered ? "<ol>" : "<ul>"); listStack.push(ordered ? "ol" : "ul"); }
      closeLists(depth);
      /* continuation lines belong to this item */
      let text = li[3];
      i++;
      while (i < lines.length && /^\s{2,}\S/.test(lines[i]) && !/^(\s*)([-*+]|\d+\.)\s/.test(lines[i])) {
        text += " " + lines[i].trim(); i++;
      }
      /* Traps are the highest-value content in these notes and most of
         them live inside list items. Mark them so they survive skimming. */
      const isTrap = /^(⚠️|🚨|❗)/.test(text.trim()) || /^\*\*(⚠️\s*)?(Trap|Warning|Gotcha)\b/i.test(text.trim());
      const clean = isTrap ? text.replace(/^\s*(⚠️|🚨|❗)\s*/, "") : text;
      out.push('<li' + (isTrap ? ' class="trap"' : '') + ">" + inline(clean) + "</li>");
      continue;
    }

    /* blank */
    if (!line.trim()) { closeLists(0); i++; continue; }

    /* paragraph — with callout detection for the notes' trap markers */
    const buf = [line];
    i++;
    while (i < lines.length && lines[i].trim() && !/^\s*(#{1,6}\s|```|\||>|<|(\s*)([-*+]|\d+\.)\s|---)/.test(lines[i])) {
      buf.push(lines[i]); i++;
    }
    const para = buf.join(" ").trim();
    closeLists(0);
    const warn = /^(⚠️|🚨|❗)/.test(para) || /^\*\*(⚠️|Trap|Warning)/i.test(para);
    const tip  = /^(🧠|💡|🎬|📌)/.test(para);
    if (warn) out.push('<div class="callout warn">' + inline(para.replace(/^(⚠️|🚨|❗)\s*/, "")) + "</div>");
    else if (tip) out.push('<div class="callout tip">' + inline(para.replace(/^(🧠|💡|🎬|📌)\s*/, "")) + "</div>");
    else out.push("<p>" + inline(para) + "</p>");
  }
  closeLists(0);
  return { html: out.join("\n"), toc };
}

window.MD = { render, highlightJava, renderFlow, renderTimeline, renderSequence, renderDiagram };

})();
