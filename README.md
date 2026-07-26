<div align="center">

# ☕ JavaBoy — OCP Java 25 Mastery

**Exam 1Z0-831 · Java SE 25 Developer Professional · 50 questions · 120 minutes · 68% to pass**

*Learn it, see it, then get tested on it until you can't get it wrong.*

by **Yassin Ghariani — "JavaBoy"**

</div>

---

## Start here

```bash
# 1. Install JDK 25 — the labs use Java 25 language features and will not
#    compile on anything older.
sdk install java 25-open        # https://sdkman.io  (or adoptium.net)
java --version                  # must print 25

# 2. Open the study console
open app/index.html             # macOS
start app\index.html            # Windows
xdg-open app/index.html         # Linux

# 3. Confirm every lab still compiles
./tools/verify-labs.sh
```

The console runs entirely in your browser. No server, no install, no account,
no network. Progress is stored locally and never leaves your machine.

> **On `file://` and progress.** Some browsers refuse local storage on pages
> opened directly from disk, which means progress vanishes when you close the
> tab. If Settings warns you about this, serve the folder instead:
> `python3 -m http.server` then visit `localhost:8000/app/`.

---

## What's in here

### The study console — `app/index.html`

The main way to use this repository.

| | |
|---|---|
| **Read** | All twelve modules and five reference docs render inside the app: real typography, Java syntax highlighting, a contents rail that tracks your scroll position, and every trap pulled out of the bullet list so you can't skim past it. The Mermaid diagrams render as SVG in the app's own palette — no Mermaid, no network. |
| **Status window** | Hunter rank **E → S**, level, and XP. The rank is not decoration — it's rolling accuracy discounted by how much of the bank you've actually seen, so it can't be farmed by answering six easy questions. **B-rank begins at exactly 68%**, the real pass mark. Reach B and you'd clear the gate today. |
| **Drill** | 25-question sets by module, by weakness, or from everything. Instant explanation on every answer. Keyboard-driven: `1`–`4` to answer, `Enter` to continue. |
| **The Gates** | **Five full papers**, 50 questions in 120 minutes each. Every paper is weighted to the exam blueprint, and **no question appears in more than one** — you cannot pass Gate V by remembering Gate I. Best score tracked per paper. |
| **Error journal** | Every question you've ever missed, ranked worst-first, and a one-click drill of exactly those. |
| **Spaced repetition** | Miss a question and it returns tomorrow. Keep getting it right and it backs off to 3, 7, 14, 30, 60, 120 days. |
| **Flashcards** | 148 cards for the facts that are pure recall. |

**336 questions**, of which 26 are **multi-select** — Oracle marks those
all-or-nothing, and so does this. Option counts run from 4 to 8, because the
real paper does too. 250 are reserved for the five Gates; 86 stay in the
drill pool.

**20 explanations carry a diagram.** Where a concept is spatial — the Integer
cache boundary, try-with-resources close order, field-versus-method dispatch,
PECS, the resource-bundle fallback chain — the explanation renders an SVG
figure beneath the prose, in the drill verdict, the mock review and the error
journal alike.

**54 answers are machine-verified.** Every output-prediction question that
runs on a stock JDK was executed against a real JVM and its printed output
compared to the stated answer. The rest were checked by hand against the
language spec.

### The written material

```
modules/00…11/
  NOTES.md      concepts, traps, and Mermaid diagrams that render on GitHub
  QUIZ.md       closed-book self-test
  src/          runnable Java 25 labs
exercises/      104 coding exercises — one file per module
docs/
  STUDY_STRATEGY.md       the spaced-repetition system
  12-WEEK-PLAN.md         day-by-day schedule
  JAVA-MEMORY-EXPLAINED.md
  THE-WALL-CHEATSHEET.md  printable one-page summary
  EXAM-DAY-PLAYBOOK.md    timing and tactics
interactive/    three animated visualisers
mock-exams/     two written mocks with explanations
tools/
  verify-labs.sh    compile every lab against your JDK
  build-notes.py    recompile the Markdown into the reader
```

**Editing the notes.** `NOTES.md` remains the source of truth — edit it, and it
still renders on GitHub as before. The reader loads a compiled copy, so run
`python3 tools/build-notes.py` afterwards to pick the change up.

### The visualisers — `interactive/`

Double-click any of them; they work offline.

- **`memory-visualizer.html`** — step through stack frames pushing and popping, watch reference arrows move, see the string pool and GC generations.
- **`java-internals-visualizer.html`** — polymorphic dispatch resolving field-versus-method, stream laziness pulling one element at a time, an exception climbing the stack.
- **`trap-trainer.html`** — rapid-fire trap quiz with streaks.

---

## The two paths

**Never written Java.** Module 00 → `docs/JAVA-MEMORY-EXPLAINED.md` → the memory
visualiser → modules 01-11 at roughly 1.5× the plan's pace. Join the exam path
at the 12-week plan.

**Preparing for the exam.** `docs/STUDY_STRATEGY.md` → `docs/12-WEEK-PLAN.md` →
modules 01-11 in order → mocks until you clear 80% three times →
`docs/EXAM-DAY-PLAYBOOK.md`.

Either way the loop per module is the same: **read it in the app, type the
labs, do the exercises, then drill the module.** The drill is the part that
tells you whether the reading landed.

---

## How the modules are built

Reading produces recognition. The exam tests recall. So the heavier modules
carry four layers beyond the reference material, in this order:

1. **The mental model** — one organising idea that makes the details
   *derivable* instead of memorised. Exceptions is "a second return channel."
   Streams is "a plan, not a collection." Concurrency is "three different
   problems people call thread safety."
2. **Worked traces** — step-by-step executions of the things that surprise
   people, with a table showing what the JVM holds at each step. Predict the
   output first, then check.
3. **Why the wrong answer looks right** — the distractors, with the reason
   each one is tempting. Exam questions are built from plausible wrong
   answers, so knowing why they're plausible is worth as much as knowing the
   right one.
4. **A recall ladder** — questions with no answers attached. If you can't
   answer one out loud, it's a flashcard, not a re-read.

**All twelve modules carry all four layers.** Total course text has more than
doubled: 8,772 → 19,535 words.

---

## How to actually use this

The material is not the hard part. The method is.

1. **Retrieve, don't re-read.** Re-reading notes feels productive and builds
   almost no durable memory. Answering a question you might get wrong builds a
   lot. The console is built around this and so should your study time be.
2. **Predict before you run.** Every lab, every exercise: commit to an output
   out loud, then run it. Being wrong is the part that teaches you.
3. **Honour the schedule.** When the dashboard says 40 questions are due, do
   the 40. Spaced repetition is worthless if you only review what feels fun.
4. **Type the labs.** Reading code you didn't write produces recognition. The
   exam tests recall.

A note on the promise: **no repository guarantees a pass, and anything that
claims to is lying.** What this one is built to do is make you comfortably
over-prepared for a 68% bar, and give you an honest number so you know when
you're there instead of guessing.

Note also what this deliberately is *not*: a braindump. Every question here is
original, written against the published objectives. Memorising leaked exam
items is how people fail when Oracle rotates the pool — and it violates the
exam agreement you sign. Understanding transfers; recall of specific items
does not.

---

## Exam objectives → modules

| Objective area | Module | Approx. share |
|---|---|---|
| Fundamentals, data types, Strings, Math, dates | 01 | 7% |
| Control flow, switch expressions, pattern matching | 02 | 6% |
| Classes, interfaces, inheritance, flexible constructors | 03 | 12% |
| Records, enums, sealed types | 04 | 8% |
| Exceptions, try-with-resources | 05 | 9% |
| Arrays, collections, generics | 06 | 13% |
| Lambdas, streams, gatherers | 07 | 18% |
| Concurrency, virtual threads, scoped values | 08 | 11% |
| I/O, `java.lang.IO`, NIO.2, serialization | 09 | 8% |
| JPMS, module imports, localization | 10 | 8% |
| Java 22→25 delta sweep | 11 | revision |

Shares are estimates used to weight mock exams, not official Oracle figures.
Oracle can revise objectives at any time — check the
[official exam page](https://education.oracle.com/ouexam-pexam_1z0-831/pexam_1Z0-831)
before you book.

**Note on exam duration.** Oracle raised the OCP exam from 90 to 120 minutes
starting with Java 21 (1Z0-830), and 1Z0-831 keeps the longer clock. The
questions got longer to match: expect some that span more than a screen, and
some with 6–10 options where each option is a block of code. Candidates who
pass routinely report finishing with only minutes to spare.

---

## Extending the question bank

Questions live in `app/data/questions-{a,b,c}.js` as plain objects:

```js
{ id:"7.23", m:7, t:"Collectors", d:3,
  code:"// optional snippet",
  q:"What does this print?",
  opts:["...","...","...","..."],
  a:2,                        // index of the correct option
  exp:"Why, and what the trap is." }
```

Add to any file and reload — there is no build step. The console shuffles
option order on every presentation, so you don't need to vary where you put
the correct answer.

---

## The five Gates

| Paper | Character |
|---|---|
| **Gate I** | Broad sweep. Every objective, nothing exotic — your baseline |
| **Gate II** | Heavier on collections, generics and the stream pipeline |
| **Gate III** | Concurrency, virtual threads and I/O carry more weight |
| **Gate IV** | The traps paper. Densest in output-prediction and compile-or-not items |
| **Gate V** | Final rehearsal. Java 22–25 delta features throughout |

Every paper carries the same objective split — 8 stream questions, 6 each for
OOP, collections and concurrency, 5 exceptions, 4 each for data types,
records, I/O and localization, 3 flow control. That is the real blueprint,
and it is enforced by a test rather than by hope.

**How to use them.** One per week, not five in a weekend — the gap between
sittings is where the learning happens. Sit each properly: no notes, no
pausing, one attempt. Review every miss the same day; the error journal
collects them for you. **Book the real exam when three different papers have
cleared 80%.** One lucky 80% is noise.

Regenerate after adding questions with `node tools/build-papers.js`.

---

## About the rank system

| Rank | Readiness | What it means |
|---|---|---|
| **E** — Unawakened | 0–39% | Read and type. Drilling now would just be memorising noise |
| **D** — Awakened | 40–54% | Concepts landing. Drill weak modules only |
| **C** — Below the Gate | 55–67% | You'd fail today. Work the error journal |
| **B** — Gate Clear | 68–79% | You'd pass, but not comfortably |
| **A** — Elite | 80–91% | Three mocks above 80% and you're done |
| **S** — Monarch | 92–100% | Book it |

Readiness is `accuracy × min(1, coverage ÷ 0.6)`. That discount is the honest
part: answering ten questions perfectly gives you 10%, not 100%. You have to
actually cover the bank to rank up.

XP is difficulty-weighted (10/15/25 per correct answer), so grinding easy
questions won't inflate your level.

---

## Design notes

The console is styled as a **hunter's status window**: void ground, system-cyan
light, violet for the monarch tier, hard-edged holographic panels that
materialise with a glow sweep and draw their bracket corners in. Rank insignia
climb E → S, and from B upward they carry a slowly rotating aura ring.

**Motion is used where it means something.** Panels materialise on entry.
Diagrams build themselves — nodes pop in following the layout rank, edges draw
their own stroke. Level-ups and rank-ups fire a full **system notification**
over a dimmed screen, and they never interrupt a timed paper; a milestone
earned during a Gate surfaces after you finish it. Everything respects
`prefers-reduced-motion`.

The mark is a cup whose body is built from stack frames — coffee and the memory
model in one glyph, which is what this repo is about.

The chrome runs hot on purpose. The **reading surface deliberately does
not** — no glow, calmer contrast, 70-character measure — because you have to
live in that text for twelve weeks and study material should not fight you.

**Light theme is a real theme, not an inversion.** Every surface — the rail,
code blocks, the gauge track, the notification panel — is derived from theme
tokens rather than hardcoded, and every accent tint is mixed from the current
accent with `color-mix` so it follows. Glow effects switch off in light, where
they would render as outlines. Both themes are checked against WCAG AA
contrast by a test: 22 text/background pairs, all passing.

---

<div align="center">

**Yassin Ghariani — JavaBoy** ☕

*"If you can draw the memory, you can answer the question."*

</div>
