# Coding exercises — Flow Control

Nine tenths of the value here is typing the code yourself and predicting the
output *before* you run it. Guessing and checking teaches you far less than
committing to an answer and being wrong.

Run any file with `java Name.java` on JDK 25.

---

## 1. Fall-through museum

**Task.** Write a colon-form switch with no breaks and predict the output for three different inputs. Then convert it to arrow form.

**Done when.** Predictions match; the arrow version behaves differently.

<details><summary>Hint</summary>

Arrow form never falls through.

</details>

---

## 2. Exhaustive switch

**Task.** Write a switch EXPRESSION over an enum with no default, then add a constant to the enum and observe the compile error.

**Done when.** The error message, captured.

<details><summary>Hint</summary>

This is the safety property that makes sealed types valuable.

</details>

---

## 3. Null-safe switch

**Task.** Write a pattern switch that handles null explicitly, and a second without `case null`. Feed both a null.

**Done when.** One prints; one throws NullPointerException.

<details><summary>Hint</summary>

Classic switch always throws on null.

</details>

---

## 4. Guard ordering

**Task.** Write two guarded patterns for the same type where reversing their order causes a compile error.

**Done when.** The unreachable-code error.

<details><summary>Hint</summary>

Specific guards must precede the general case.

</details>

---

## 5. Labelled escape

**Task.** Search a 2D array for a target using labelled break, then rewrite it without labels.

**Done when.** Both find the same cell.

<details><summary>Hint</summary>

Compare readability honestly.

</details>

---

## 6. Loop equivalence

**Task.** Express the same iteration four ways: for, while, do-while, and enhanced-for. Identify which cannot express an empty iteration.

**Done when.** Four versions; one identified.

<details><summary>Hint</summary>

do-while always runs once.

</details>

---

## 7. Safe removal

**Task.** Trigger a ConcurrentModificationException, then fix it three ways: Iterator.remove, removeIf, and collecting into a new list.

**Done when.** One exception, three working fixes.

<details><summary>Hint</summary>

Know which the exam prefers.

</details>

---

## 8. Record deconstruction

**Task.** Write a switch over a sealed interface of three records, using nested record patterns to reach an inner component.

**Done when.** Each branch extracts a value without casting.

<details><summary>Hint</summary>

Patterns nest arbitrarily.

</details>

---

*Stuck for more than twenty minutes on one exercise? Read that section of `NOTES.md`, then come back and start the exercise from scratch rather than resuming a half-finished attempt.*
