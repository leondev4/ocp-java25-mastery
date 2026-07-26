# 🧠 The Memorization System — Never Forget, Ever

> By Yassin Ghariani (JavaBoy). This is the engine of the whole repo. Read it once, apply it daily.

Passing 1Z0-831 with a huge margin is not about intelligence. It is about **retrieval practice + spaced repetition + deliberate coding**. This document turns those three into a daily routine.

---

## 1. The Three Laws

### Law 1 — Never re-read. Always retrieve.
Re-reading notes *feels* productive and teaches you almost nothing. Instead:
- Close the notes and **write from memory** what you just learned.
- Answer the module `QUIZ.md` **out loud**, closed book.
- Explain the concept to an imaginary junior dev (the **Feynman technique**). If you stumble, that exact stumble is what you re-open the notes for — nothing else.

### Law 2 — Space it or lose it.
Memory decays on a curve. You defeat the curve by reviewing at expanding intervals, *just before* you would forget:

```
Learn ──► +1 day ──► +3 days ──► +7 days ──► +14 days ──► +30 days ──► permanent
```

Each review takes 10–15 minutes (quiz + flashcards), not a full re-study. Five short reviews beat one 5-hour cram forever.

### Law 3 — Type it or it isn't real.
The exam shows you code and asks "what happens?". You can only answer instantly if your fingers have *felt* the compiler errors. For every module:
1. **Type** every example in `src/` yourself (no copy-paste).
2. **Run** it. Predict the output BEFORE running.
3. **Break** it: remove a `final`, change a type, make it not compile. Read the compiler error. This is where exam traps are born.
4. **Fix** it back.

---

## 2. The Daily Routine (90–120 min/day)

| Slot | Time | What |
|------|------|------|
| 🔁 Warm-up | 15 min | Anki flashcards (due cards only) — this handles ALL your spaced repetition automatically |
| 📖 New material | 45–60 min | Current module: read one section of `NOTES.md`, type its code, break it |
| 🗣️ Recall | 15 min | Close everything. Say out loud / write down everything from today's section |
| ❓ Quiz | 15 min | Module quiz questions covering today's section |
| 📓 Error Journal | 5 min | Log every mistake in `progress/PROGRESS_TRACKER.md` with the WHY |

**Weekend extra:** one timed mini-mock (25 questions, 45 minutes) from week 5 onward.

---

## 3. The Anki Setup (Automated Spaced Repetition)

1. Download Anki (free): https://apps.ankiweb.net
2. Import `flashcards/ocp25-anki-deck.txt` (File → Import, fields separated by Tab).
3. Settings: 20 new cards/day, reviews unlimited.
4. **Rules of honest Anki:**
   - Answer OUT LOUD before flipping.
   - Press "Again" without mercy if you hesitated. Hesitation on the exam = wrong answer.
   - Add **your own cards** for every mistake in the Error Journal. Your personal mistake cards are worth 10× the pre-made ones.

**Card-writing formula for your own cards:**
- Front: minimal code snippet or one precise question ("What does `List.of(1,2).add(3)` throw?")
- Back: one-line answer + the WHY ("UnsupportedOperationException — List.of returns immutable list")
- Never put two facts on one card.

---

## 4. The Error Journal — Your Personal Goldmine

Every wrong quiz/mock answer gets a row in the tracker:

| Date | Topic | The trap | Why I fell | Rule to remember |
|------|-------|----------|------------|------------------|
| — | Streams | `Stream` reused after terminal op | forgot streams are one-shot | "A stream flows once → IllegalStateException" |

**Review the journal every Sunday.** A mistake reviewed 3 times on 3 different Sundays is dead forever. On exam week, the journal IS your revision — not the books.

---

## 5. Mock Exam Protocol (Weeks 8–12)

- Always **full length**: 50 questions, 120 minutes, one sitting, no pause, no music.
- Mark questions you *guessed* even if correct — a lucky guess is a hidden weakness.
- After each mock, spend **as long reviewing as taking it**. Every question (right or wrong) gets a one-line justification: "B, because switch expressions must be exhaustive."
- **Readiness gate:** 3 consecutive mocks ≥ 80% → book the exam. Below that, another week of Error-Journal grinding.
- Recommended external mocks: Enthuware 1Z0-831 (the community gold standard, ~$10).

---

## 6. Memory Techniques for the Ugly Stuff

Some things are pure memorization. Use these weapons:

**Mnemonics (make your own — they stick better):**
- Primitive sizes: **"B-yte S-hort I-nt L-ong = 1-2-4-8"**, float 4, double 8, char 2, boolean JVM-defined.
- Implicit widening chain: `byte → short → int → long → float → double` (and `char → int`). Say it like a rap. 🎵
- Checked vs unchecked: **"RE and Error run free"** (RuntimeException + Error = unchecked).
- Functional interfaces: **"SuPy CoFu"** → **Su**pplier gives, **P**redicate tests, **Co**nsumer eats, **Fu**nction transforms.
- try-with-resources closing order: **"LIFO — Last In, First Out, like undressing."**

**Comparison tables → hand-draw them.** Drawing a table from memory (e.g., `ArrayList` vs `LinkedList`, or all switch pattern rules) once a week beats reading it ten times.

**The "One-Pager" ritual:** at the end of every module, produce ONE handwritten A4 page with everything essential. On exam week, your 11 pages replace all books.

---

## 7. What "Done" Means for a Module

A module is ✅ only when ALL are true:
- [ ] Every `src/` file typed, run, broken, fixed
- [ ] Quiz score ≥ 90% closed-book
- [ ] One-Pager drawn from memory
- [ ] Anki cards for the module + your mistakes added
- [ ] Reviews at Day 1, 3, 7 completed (14 and 30 come automatically via Anki)

---

## 8. Anti-Burnout Rules

- Max 2.5 hours/day. Consistency > heroics. 90 min daily for 12 weeks ≈ 110 hours — more than enough.
- One full rest day per week (Anki reviews only, 15 min).
- Sleep 7–8 h. Memory consolidation happens *during sleep* — an all-nighter literally deletes your studying.
- If a topic frustrates you: 10-minute walk, then explain the problem out loud to a rubber duck. 🦆

---

**Summary in one sentence:** *Type the code, quiz yourself closed-book, let Anki schedule your reviews, log every mistake, and prove readiness with 3 mocks ≥ 80%.*

— JavaBoy ☕

---

## 🎮 The daily 10-minute add-ons (new)
- **Trap Trainer** ([interactive/trap-trainer.html](../interactive/trap-trainer.html)): one full round per day. Miss a question → the RULE goes in the Error Journal, not the question.
- **The Wall** ([docs/THE-WALL-CHEATSHEET.md](THE-WALL-CHEATSHEET.md)): every Sunday, close it and REWRITE as much of it as you can from memory on paper, then diff. What you couldn't rewrite is next week's Anki priority. By week 10 you should reproduce ~90% of it — that's what "never forget" feels like.
- **Visualizers**: whenever a NOTES.md trap confuses you, find its animation (memory / internals visualizer) and step through it until you can narrate every step out loud (Feynman check).
