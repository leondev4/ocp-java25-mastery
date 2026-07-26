# Coding exercises — Basics & Data Types

Nine tenths of the value here is typing the code yourself and predicting the
output *before* you run it. Guessing and checking teaches you far less than
committing to an answer and being wrong.

Run any file with `java Name.java` on JDK 25.

---

## 1. Promotion ladder

**Task.** Write assignments demonstrating every legal implicit widening step, then the narrowing casts back. Comment which lose information.

**Done when.** A commented file that compiles.

<details><summary>Hint</summary>

`long -> float` is widening even though it loses precision.

</details>

---

## 2. Compound cast

**Task.** Show a case where `x = x + 1` fails but `x += 1` compiles, for byte, short, and char.

**Done when.** Three pairs, three compile errors, three successes.

<details><summary>Hint</summary>

Compound operators carry an implicit cast.

</details>

---

## 3. Cache boundary

**Task.** Find the exact value at which `==` on two identical Integer literals flips from true to false. Prove it in a loop.

**Done when.** The loop prints the boundary value.

<details><summary>Hint</summary>

Test both ends of the range.

</details>

---

## 4. Immutability audit

**Task.** Take five String and five LocalDate 'modifying' calls and write each one twice: once ignoring the result (the bug) and once assigning it.

**Done when.** Output showing the bug and the fix side by side.

<details><summary>Hint</summary>

This is the single most common real-world Java mistake.

</details>

---

## 5. Builder chain

**Task.** Chain append, insert, delete, reverse and replace on one StringBuilder. Predict the result BEFORE running.

**Done when.** Your prediction matches the output.

<details><summary>Hint</summary>

Every method returns the same object.

</details>

---

## 6. Text block rules

**Task.** Build a text block containing a quotation mark, a trailing space, and a line that continues without a newline.

**Done when.** Output exactly as designed.

<details><summary>Hint</summary>

`\s` preserves a trailing space; `\` at line end joins lines.

</details>

---

## 7. Period versus Duration

**Task.** Write four operations: Period on LocalDate, Duration on LocalTime, Duration on LocalDate, Period on LocalTime. Predict which two throw.

**Done when.** Two run, two throw UnsupportedTemporalTypeException.

<details><summary>Hint</summary>

Date units versus time units.

</details>

---

## 8. Overflow demo

**Task.** Prove that `Integer.MAX_VALUE + 1` wraps, and find the equivalent for byte and short.

**Done when.** Three wrap demonstrations.

<details><summary>Hint</summary>

Wrapping is silent — no exception.

</details>

---

## 9. Formatting a date

**Task.** Format the same LocalDateTime three ways and produce one runtime failure by using an unsupported pattern letter.

**Done when.** Three successes, one DateTimeException.

<details><summary>Hint</summary>

M is month, m is minute.

</details>

---

*Stuck for more than twenty minutes on one exercise? Read that section of `NOTES.md`, then come back and start the exercise from scratch rather than resuming a half-finished attempt.*
