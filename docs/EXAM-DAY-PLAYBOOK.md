# 🏆 Exam-Day Playbook — 1Z0-831

## The Last 48 Hours
- **No new material.** Anything you learn now is fragile and will push out stable memory.
- Review only: your 11 One-Pagers + Error Journal + Anki due cards.
- Do NOT take a full mock the day before — confidence management matters.
- Sleep 8 hours both nights. Memory consolidates during sleep; this is not optional.
- Prepare: ID, quiet room (online proctored) or route to test center, water before (no bathroom breaks mid-exam online).

## The 120 Minutes — Time Strategy

50 questions / 120 min = **2:24 per question**.

Oracle raised this exam from 90 to 120 minutes starting with Java 21, and not
out of generosity — the questions got longer. Expect several that run past a
single screen, and some with **6–10 options** where each option is a 20-line
code block. Candidates who pass routinely report finishing with only minutes
to spare. Budget accordingly and never let one question eat five minutes.

Use the 3-pass method:

**Pass 1 (≈ 75 min):** Answer everything you're sure about in < 2 min. Anything longer → pick your best guess, **mark for review**, move on. Never leave blank (no negative marking).

**Pass 2 (≈ 32 min):** Return to marked questions with a calm brain. Half will look easy now.

**Pass 3 (≈ 13 min):** Final sweep. Change an answer ONLY if you can name the exact rule that proves your first answer wrong — gut-feeling changes are usually downgrades.

## How to Read an Exam Question (the JavaBoy checklist)

Before evaluating logic, hunt for **compile errors first** — Oracle's favorite trap:
1. 🔍 **Semicolons, braces, case syntax** — is `->` mixed with `:` in the same switch? Missing `yield`?
2. 🔍 **Types** — narrowing without cast? `long` → `int`? `var` with no initializer?
3. 🔍 **Access & final** — private in subclass? Reassigning a `final`? Effectively-final broken in a lambda?
4. 🔍 **Checked exceptions** — thrown but neither caught nor declared?
5. 🔍 **Imports & names** — the question says "assume imports" or not? Class name matches file when relevant?
6. Only THEN trace the logic line by line, writing variable values on your scratch board.

**Multiple-answer questions** tell you exactly how many to pick ("Choose two"). Count your selections.

**"Does not compile" is an answer option?** → Treat the code as guilty until proven innocent.

## Mental Rules
- One hard question ≠ failing. You can miss 16 questions and still pass.
- Breathe out slowly for 4 seconds when panic starts — it physiologically resets focus.
- You prepared with a 80%+ mock average for a 68% bar. The math is on your side.

**Go get it. — Yassin Ghariani, JavaBoy ☕🔥**
