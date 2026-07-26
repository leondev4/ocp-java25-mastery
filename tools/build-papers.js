/* Build five fixed mock papers with correct exam weighting and ZERO
   questions shared between them. Run: node tools/build-papers.js       */
global.window = {};
["curriculum","questions-a","questions-b","questions-c","questions-d","questions-e","questions-f"]
  .forEach(f => require("../app/data/" + f + ".js"));

const C = window.CURRICULUM;
const BANK = ["A","B","C","D","E","F"].flatMap(k => window["BANK_" + k] || []);
const N = C.exam.questions, PAPERS = 5;

/* Target slots per module, scaled from exam weight. */
const weighted = C.modules.filter(m => m.weight > 0);
const totalW = weighted.reduce((a, m) => a + m.weight, 0);
const target = {};
let assigned = 0;
weighted.forEach(m => { target[m.id] = Math.round(m.weight / totalW * N); assigned += target[m.id]; });
/* trim or pad to exactly N, adjusting the heaviest modules first */
const order = weighted.slice().sort((a, b) => b.weight - a.weight);
let oi = 0;
while (assigned > N) { const m = order[oi++ % order.length]; if (target[m.id] > 1) { target[m.id]--; assigned--; } }
while (assigned < N) { const m = order[oi++ % order.length]; target[m.id]++; assigned++; }

/* Deal questions round-robin per module so every paper gets a comparable
   difficulty mix and a share of the multi-select items. */
function deal(pool) {
  const hard = pool.filter(q => q.d === 3);
  const rest = pool.filter(q => q.d !== 3);
  const multi = pool.filter(q => Array.isArray(q.a));
  const seq = [];
  const seen = new Set();
  /* interleave: multi first (rarest), then hard, then the rest */
  [multi, hard, rest].forEach(g => g.forEach(q => { if (!seen.has(q.id)) { seen.add(q.id); seq.push(q); } }));
  return seq;
}

const papers = Array.from({ length: PAPERS }, () => []);
const shortfall = [];

weighted.forEach(m => {
  const pool = deal(BANK.filter(q => q.m === m.id));
  const need = target[m.id] * PAPERS;
  if (pool.length < need) shortfall.push(`module ${m.id}: need ${need}, have ${pool.length}`);
  /* Deal like cards — one to each paper in turn — so the rare items
     (multi-select, hard) spread evenly instead of piling into paper 1. */
  /* Serpentine deal: alternate direction each round so the paper that
     took the hardest item last round takes the easiest one next. */
  let k = 0;
  for (let t = 0; t < target[m.id]; t++) {
    for (let n = 0; n < PAPERS; n++) {
      const p = (t % 2 === 0) ? n : PAPERS - 1 - n;
      if (k < pool.length) papers[p].push(pool[k++].id);
    }
  }
});

/* Report */
console.log("Bank size:", BANK.length);
console.log("Slots per paper:", JSON.stringify(target), "=", Object.values(target).reduce((a,b)=>a+b,0));
if (shortfall.length) { console.log("\nSHORTFALL:"); shortfall.forEach(s => console.log("  " + s)); }

const all = papers.flat();
const dupes = all.filter((id, i) => all.indexOf(id) !== i);
console.log("\nPapers built:", papers.length);
papers.forEach((p, i) => {
  const qs = p.map(id => BANK.find(q => q.id === id));
  const mult = qs.filter(q => Array.isArray(q.a)).length;
  const hard = qs.filter(q => q.d === 3).length;
  console.log(`  Paper ${i+1}: ${p.length} questions · ${hard} hard · ${mult} multi-select`);
});
console.log("questions reused across papers:", dupes.length ? dupes : "NONE");

const TITLES = [
  ["Gate I",   "Broad sweep. Every objective, nothing exotic — this is your baseline."],
  ["Gate II",  "Heavier on collections, generics and the stream pipeline."],
  ["Gate III", "Concurrency, virtual threads and I/O carry more weight here."],
  ["Gate IV",  "The traps paper. Densest in output-prediction and compile-or-not items."],
  ["Gate V",   "Final rehearsal. Java 22-25 delta features appear throughout."]
];

const out = papers.map((ids, i) => ({
  id: "p" + (i + 1), name: TITLES[i][0], blurb: TITLES[i][1], q: ids
}));

require("fs").writeFileSync(__dirname + "/../app/data/papers.js",
  "/* Five fixed mock papers — weighted to the exam blueprint, with no\n" +
  "   question appearing in more than one paper. Regenerate with\n" +
  "   node tools/build-papers.js after adding questions. */\n" +
  "window.PAPERS = " + JSON.stringify(out, null, 1) + ";\n");
console.log("\nWrote app/data/papers.js");
