# Coding exercises — Java 22 to 25 Delta

Nine tenths of the value here is typing the code yourself and predicting the
output *before* you run it. Guessing and checking teaches you far less than
committing to an answer and being wrong.

Run any file with `java Name.java` on JDK 25.

---

## 1. Compact file limits

**Task.** Write a compact source file with a field, a helper method and an instance main. Then try to reference it from another file.

**Done when.** It runs; the reference fails.

<details><summary>Hint</summary>

The implicit class has no usable name.

</details>

---

## 2. Main selection

**Task.** Put several candidate main methods in one file and determine which the launcher picks by printing from each.

**Done when.** A ranked preference order.

<details><summary>Hint</summary>

String[] beats no-arg; static beats instance.

</details>

---

## 3. Implicit imports

**Task.** Use List, Map and Files in a compact file with zero import lines, then move the same code into a normal class.

**Done when.** One needs imports, the other does not.

<details><summary>Hint</summary>

import module java.base is implicit.

</details>

---

## 4. Unnamed variables

**Task.** Use `_` in all six legal positions, then find three positions where it is rejected.

**Done when.** Six successes, three errors.

<details><summary>Hint</summary>

Fields and ordinary parameters are not allowed.

</details>

---

## 5. Prologue validation

**Task.** Write a constructor that rejects bad input before super() runs, and prove the superclass constructor never executed.

**Done when.** No superclass output on invalid input.

<details><summary>Hint</summary>

Then try reading `this` in the prologue.

</details>

---

## 6. Scoped value inheritance

**Task.** Bind a ScopedValue and read it from a virtual thread started inside the scope.

**Done when.** The child sees the binding.

<details><summary>Hint</summary>

Compare the ThreadLocal equivalent.

</details>

---

## 7. Gatherer versus reduce

**Task.** Achieve the same running-total result with scan and with reduce, and explain why only one stays a stream.

**Done when.** Two implementations, one explanation.

<details><summary>Hint</summary>

Intermediate versus terminal.

</details>

---

## 8. Delta inventory

**Task.** Without notes, list every feature that became final between Java 21 and Java 25, then check yourself against Module 11.

**Done when.** A list you can reproduce cold.

<details><summary>Hint</summary>

This is your last-week revision drill.

</details>

---

*Stuck for more than twenty minutes on one exercise? Read that section of `NOTES.md`, then come back and start the exercise from scratch rather than resuming a half-finished attempt.*
