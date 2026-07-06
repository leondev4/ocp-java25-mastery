# 🗓️ The 12-Week Battle Plan → 1Z0-831

> 🐣 **Never coded Java before?** Do [Module 00 — Zero to Java](../modules/00-start-here-zero-to-java/NOTES.md) + the [animated memory visualizer](../interactive/memory-visualizer.html) during Week 0, then run this plan at ×1.5 pace (18 weeks). The plan below assumes basic programming literacy.

> ~90–120 min/day, 6 days/week, 1 rest day (Anki only). Adjust speed if you're already experienced — but never skip the review days.

**Legend:** 📖 learn · 🔁 spaced review · 🧪 mock · 📓 error journal

---

## Phase 1 — Foundations (Weeks 1–3)

### Week 1 — Module 01: Basics & Data Types
- **D1–D2:** primitives, wrappers, casting, autoboxing traps, Math API
- **D3:** String, StringBuilder, text blocks, immutability traps
- **D4:** Dates & times (LocalDate, ZonedDateTime, Duration/Period, `Instant.until`)
- **D5:** 🔁 D1 review + full module quiz closed-book
- **D6:** One-Pager + Anki cards + type-break-fix all `src/`
- **D7:** rest (Anki only)

### Week 2 — Module 02: Flow Control
- **D1:** if/else, loops, labels, break/continue
- **D2–D3:** switch statements vs **switch expressions**, `yield`, exhaustiveness
- **D4:** pattern matching in switch, guarded patterns (`when`), `null` handling
- **D5:** 🔁 Module 01 (Day-7 review) + Module 02 quiz
- **D6:** One-Pager + Anki
- **D7:** rest

### Week 3 — Module 03: OOP Core
- **D1:** classes, constructors, initializer blocks, order of initialization
- **D2:** **flexible constructor bodies (Java 25!)** — statements before `super()`
- **D3:** inheritance, overriding rules, polymorphism, casting, `instanceof` patterns
- **D4:** interfaces (default/static/private methods), abstract classes, nested classes
- **D5:** 🔁 Module 02 review + Module 03 quiz
- **D6:** One-Pager + Anki
- **D7:** rest

## Phase 2 — The Heavy Middle (Weeks 4–7)

### Week 4 — Module 04: Records, Enums, Sealed
- **D1–D2:** records (canonical/compact constructors, restrictions)
- **D3:** enums (constructors, abstract methods, values/valueOf)
- **D4:** sealed classes + record deconstruction patterns + exhaustive switch
- **D5:** 🔁 Module 03 + quiz · **D6:** One-Pager + Anki · **D7:** rest

### Week 5 — Module 05: Exceptions + Module 06 start
- **D1:** try/catch/finally, flow with return in finally (trap!)
- **D2:** try-with-resources, suppressed exceptions, multi-catch
- **D3:** custom exceptions, overriding & exceptions rule
- **D4–D6:** Module 06: arrays, `Arrays.compare/mismatch/binarySearch`
- 🧪 First mini-mock (25 Q / 45 min) this weekend

### Week 6 — Module 06: Collections & Generics
- **D1:** List/Set/Map/Deque APIs, immutable factories (`List.of` traps)
- **D2:** sorting: Comparable vs Comparator, chained comparators
- **D3–D4:** generics, bounded wildcards (PECS: Producer Extends, Consumer Super)
- **D5:** 🔁 Module 05 + quiz · **D6:** One-Pager + Anki · **D7:** rest

### Week 7 — Module 07: Lambdas, Streams, Gatherers
- **D1:** functional interfaces, method references (4 kinds)
- **D2:** stream pipeline, lazy evaluation, intermediate vs terminal
- **D3:** collectors (`groupingBy`, `partitioningBy`, `teeing`), primitive streams
- **D4:** **Stream Gatherers (Java 24!)** — `Gatherers.windowFixed/windowSliding/fold/scan/mapConcurrent`
- **D5:** Optional + parallel streams · 🔁 Module 06
- **D6:** One-Pager + Anki · **D7:** rest

## Phase 3 — Modern Java (Weeks 8–9)

### Week 8 — Module 08: Concurrency
- **D1:** Thread lifecycle, Runnable/Callable, ExecutorService
- **D2:** **virtual threads** (creation, pinning fix in Java 24), platform vs virtual
- **D3:** synchronization, locks, atomic classes, concurrent collections
- **D4:** **Scoped Values (Java 25 final!)** vs ThreadLocal
- **D5:** 🔁 Module 07 + quiz · 🧪 **Mock Exam #1 (full 50Q/90min)** this weekend
- **D6:** mock review (every question justified) + 📓

### Week 9 — Modules 09 + 10
- **D1:** java.io streams, serialization
- **D2:** NIO.2: Path, Files, walking trees + **java.lang.IO** & `Reader.readAllLines` (new!)
- **D3:** JPMS: module-info, requires/exports/opens, **module import declarations (Java 25!)**
- **D4:** Localization: Locale, ResourceBundle resolution order, NumberFormat/DateTimeFormatter/CompactNumberFormat
- **D5:** 🔁 Module 08 + quizzes 09/10
- **D6:** One-Pagers + Anki · **D7:** rest

## Phase 4 — Convergence (Weeks 10–12)

### Week 10 — Module 11 (Java 25 features sweep) + Mock cycle
- **D1–D2:** Module 11 end-to-end: compact source files, instance main, module imports, flexible constructors, unnamed variables `_`, scoped values, gatherers — all in one place
- **D3:** 🧪 **Mock #2** · **D4:** full mock review + 📓
- **D5:** weakest 2 topics deep-dive (your Error Journal decides)
- **D6:** 🔁 all One-Pagers from memory test

### Week 11 — Mock grind
- **D1:** 🧪 **Mock #3** · **D2:** review + 📓
- **D3:** weakest topics again · **D4:** 🧪 **Mock #4** · **D5:** review
- **D6:** Error Journal full pass — every mistake ever, re-answered
- **Gate check:** 3 mocks ≥ 80%? → book the exam for end of Week 12. If not, repeat Week 11.

### Week 12 — Taper + Exam
- **D1:** 🧪 **Mock #5** (goal: ≥ 85%) · **D2:** review
- **D3:** One-Pagers + Error Journal only. NO new material.
- **D4:** light Anki, sleep early
- **D5/D6:** 🏆 **EXAM DAY** → see [`EXAM-DAY-PLAYBOOK.md`](EXAM-DAY-PLAYBOOK.md)

---

*Trust the plan. The plan trusts the science. — JavaBoy ☕*
