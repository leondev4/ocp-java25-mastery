<div align="center">

# ☕ OCP Java 25 Mastery
### The zero-to-certified Java SE 25 repository — learn it, SEE it, never forget it

**by Yassin Ghariani — “JavaBoy”**

`Exam 1Z0-831` · `Java SE 25 Developer Professional` · `50 questions` · `90 min` · `68% to pass`

*From "I've never written code" → visual memory models → animated internals → certified.*

</div>

---

## 🗺️ Choose your path

| | 🐣 **Path A — Total Beginner** | 🎯 **Path B — Exam Candidate** |
|---|---|---|
| Start | [Module 00 — Zero to Java](modules/00-start-here-zero-to-java/NOTES.md) | [Study Strategy](docs/STUDY_STRATEGY.md) + [12-Week Plan](docs/12-WEEK-PLAN.md) |
| Then | [Memory Explained](docs/JAVA-MEMORY-EXPLAINED.md) + 🎬 [Animated Visualizer](interactive/memory-visualizer.html) | Modules 01 → 11 in order |
| Then | Modules 01 → 11, slower pace (plan ×1.5) | Mocks ([mock-exams/](mock-exams/)) until 3× ≥ 80% |
| Finish | join Path B at the 12-Week Plan | [Exam-Day Playbook](docs/EXAM-DAY-PLAYBOOK.md) → 🏆 |

> **The rule that makes this repo work:** never just read. **Type the labs, predict outputs, take every quiz closed-book, feed the flashcards.** Details in [STUDY_STRATEGY.md](docs/STUDY_STRATEGY.md).

---

## 🎬 The Interactive Suite — SEE Java run (no install, works offline, double-click and go)

| File | What it animates |
|---|---|
| [`interactive/memory-visualizer.html`](interactive/memory-visualizer.html) | 🥞 **Stack & heap step-through** (frames push/pop, live reference arrows, garbage forming, pass-by-value proving itself) · 🔤 **String Pool** animation · 🗑️ **GC playground** (allocate → drop refs → run Minor GCs → watch aging & promotion) |
| [`interactive/java-internals-visualizer.html`](interactive/java-internals-visualizer.html) | 🎭 **Polymorphism dispatch** (methods vs fields vs statics — watch which wins and WHY) · 🌊 **Stream pipeline** (laziness, one-element-at-a-time flow, limit() short-circuiting the source) · 💥 **Exception propagation** (watch it climb the stack through finally into a matching catch) |
| [`interactive/trap-trainer.html`](interactive/trap-trainer.html) | 🎮 **The Trap Trainer** — a rapid-fire quiz GAME: 35+ real exam traps, instant explanations, score & streak, topic filter. Play a round every day. |

Static diagrams (embed anywhere): [`assets/diagrams/`](assets/diagrams/) — JVM architecture, stack-vs-heap, string pool, GC generations. Plus **Mermaid diagrams inside the notes** (render automatically on GitHub) and a full illustrated guide: **[docs/JAVA-MEMORY-EXPLAINED.md](docs/JAVA-MEMORY-EXPLAINED.md)**.

---

## 📦 Repository map

```
ocp-java25-mastery/
├── README.md                      ← you are here
├── docs/
│   ├── STUDY_STRATEGY.md          🧠 the never-forget system (spaced repetition, error journal)
│   ├── 12-WEEK-PLAN.md            📅 day-by-day schedule
│   ├── JAVA-MEMORY-EXPLAINED.md   🧠 stack/heap/pool/GC with diagrams
│   ├── THE-WALL-CHEATSHEET.md     🧱 the whole exam on one printable wall
│   └── EXAM-DAY-PLAYBOOK.md       🏁 timing & tactics for the real thing
├── interactive/
│   ├── memory-visualizer.html     🎬 ANIMATED stack, heap, string pool & GC
│   ├── java-internals-visualizer.html 🎬 polymorphism · streams · exceptions
│   └── trap-trainer.html          🎮 quiz game: 35+ traps, score & streaks
├── assets/diagrams/               🖼️ SVG diagrams (JVM, memory, pool, GC)
├── modules/
│   ├── 00-start-here-zero-to-java ← 🐣 never coded Java? start HERE
│   ├── 01-basics-and-data-types
│   ├── 02-flow-control
│   ├── 03-oop-core
│   ├── 04-records-enums-sealed
│   ├── 05-exceptions
│   ├── 06-arrays-collections-generics
│   ├── 07-lambdas-streams-gatherers
│   ├── 08-concurrency-virtual-threads
│   ├── 09-io-nio
│   ├── 10-modules-and-localization
│   └── 11-java25-new-features     ← everything new since Java 21 (exam delta!)
│         each module = NOTES.md (⚠️ traps + 🧠 memory/flow diagrams)
│                       + src/ runnable Java 25 labs + QUIZ.md
├── flashcards/ocp25-anki-deck.txt ⚡ ~120 Anki cards, ready to import
├── mock-exams/                    📝 mock-exam-01.md · mock-exam-02.md (explained)
└── progress/PROGRESS_TRACKER.md   ✅ checklists + spaced-repetition dates + error journal
```

---

## 🚀 Quick start

```bash
# 1. Install JDK 25 (labs use Java 25 features — older JDKs will NOT compile them)
sdk install java 25-open          # via https://sdkman.io  (or adoptium.net)
java --version                    # must print 25

# 2. Run your first lab
java modules/00-start-here-zero-to-java/src/FirstSteps.java

# 3. Open the animation
#    → double-click interactive/memory-visualizer.html

# 4. Import flashcards/ocp25-anki-deck.txt into Anki and study daily
```

---

## 🎯 Exam 1Z0-831 → module coverage

| Exam objective | Module(s) |
|---|---|
| Java fundamentals, data types, Strings, Math | 00, 01 |
| Control flow, switch expressions & pattern matching | 02 |
| OOP: classes, interfaces, inheritance, flexible constructors | 03 |
| Records, enums, sealed types | 04 |
| Exceptions & try-with-resources | 05 |
| Arrays, collections, generics | 06 |
| Lambdas, streams & **gatherers** | 07 |
| Concurrency, **virtual threads**, **scoped values** | 08 |
| I/O, **java.lang.IO**, NIO.2, serialization | 09 |
| JPMS, **module import declarations**, localization | 10 |
| Java 22→25 delta sweep (compact source files & friends) | 11 |

---

## 🧠 The memorization promise

This repo is built on three laws (full system in [STUDY_STRATEGY.md](docs/STUDY_STRATEGY.md)):
1. **Retrieve, don't re-read** — quizzes and flashcards force recall; recall is what builds memory.
2. **Space it** — reviews at Day 1 / 3 / 7 / 14 / 30, tracked in the [progress tracker](progress/PROGRESS_TRACKER.md).
3. **Type, break, fix** — every lab is meant to be typed, mutated, and re-run until behavior is *felt*.

Honest note: no material alone guarantees a 100% score — but this system gets you walking in **over-prepared for a 68% bar**. Follow it exactly.

<div align="center">

*Built with ☕ and obsession by* **Yassin Ghariani — JavaBoy**
*"If you can draw the memory, you can answer the question."*

</div>
