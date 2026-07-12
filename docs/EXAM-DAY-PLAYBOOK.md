# 🏆 Exam-Day Playbook — 1Z0-831

## The Last 48 Hours
- **No new material.** Anything you learn now is fragile and will push out stable memory.
- Review only: your 11 One-Pagers + Error Journal + Anki due cards.
- Do NOT take a full mock the day before — confidence management matters.
- Sleep 8 hours both nights. Memory consolidates during sleep; this is not optional.
- Prepare: ID, quiet room (online proctored) or route to test center, water before (no bathroom breaks mid-exam online).

## The 90 Minutes — Time Strategy

50 questions / 120 min = **2:24 per question on average — but real questions are LONG**. Use the 3-pass method:

**Pass 1 (≈ 55 min):** Answer everything you're sure about in < 90 s. Anything longer → pick your best guess, **mark for review**, move on. Never leave blank (no negative marking).

**Pass 2 (≈ 25 min):** Return to marked questions with a calm brain. Half will look easy now.

**Pass 3 (≈ 10 min):** Final sweep. Change an answer ONLY if you can name the exact rule that proves your first answer wrong — gut-feeling changes are usually downgrades.

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

---

## 🔎 Field intel — what recent OCP takers report about this exam generation

- **Questions are long.** Most span multiple scrolling pages; some options contain 20–30 lines of code each, with 6–10 options per question. Budget reading time, not just thinking time.
- **The reversed format is common:** instead of "what does this print?", you get "**which of these snippets produces this output?**" — 5+ code fragments to eliminate. Attack these by scanning each option for a fast kill (compile error, wrong modifier, missing default in a switch expression, non-sealed violation) before deep-reading any of them.
- **Single questions mix multiple topics** (e.g., a record inside a sealed hierarchy switched over inside a virtual-thread task). Your cross-module drilling (Trap Trainer + mocks) is specifically built for this.
- **Time is the real enemy** — experienced takers report finishing with minutes to spare. The 3-pass method above is not optional. Train stamina with full-length 120-minute sittings before booking.
