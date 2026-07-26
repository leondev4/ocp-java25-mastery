# Coding exercises — Records, Enums & Sealed

Nine tenths of the value here is typing the code yourself and predicting the
output *before* you run it. Guessing and checking teaches you far less than
committing to an answer and being wrong.

Run any file with `java Name.java` on JDK 25.

---

## 1. Compact validation

**Task.** Write a record whose compact constructor normalises its input (trim a string, order a range) and prove the stored values differ from those passed.

**Done when.** Constructed values are normalised.

<details><summary>Hint</summary>

Assign to the PARAMETER, not the field.

</details>

---

## 2. Record equality trap

**Task.** Build a record with an array component and show that two 'identical' instances are not equal. Fix it.

**Done when.** false, then true after overriding equals.

<details><summary>Hint</summary>

Generated equals uses Object.equals per component.

</details>

---

## 3. Enum strategy

**Task.** Model four arithmetic operations as an enum with an abstract method, one body per constant.

**Done when.** A working calculator over the enum.

<details><summary>Hint</summary>

Every constant must supply a body.

</details>

---

## 4. Enum with state

**Task.** Give an enum a private field, a constructor and a lookup method that finds a constant by that field.

**Done when.** Lookup works; unknown input is handled.

<details><summary>Hint</summary>

valueOf throws — decide whether that is what you want.

</details>

---

## 5. Sealed permits

**Task.** Build a sealed interface with three implementations: one final, one sealed, one non-sealed. Extend the non-sealed one.

**Done when.** All four types compile.

<details><summary>Hint</summary>

Every permitted subtype must declare a policy.

</details>

---

## 6. Exhaustive without default

**Task.** Write a switch expression over your sealed hierarchy with no default, then add a fourth permitted type and capture the error.

**Done when.** The compile error text.

<details><summary>Hint</summary>

This is the payoff of sealing.

</details>

---

## 7. Nested patterns

**Task.** Model a shape hierarchy where one record contains another, and deconstruct two levels deep in a single pattern.

**Done when.** Inner values extracted without casts.

<details><summary>Hint</summary>

Use `_` for components you ignore.

</details>

---

## 8. Record versus class

**Task.** Implement the same immutable value type twice: once as a record, once as a hand-written class. Count the lines.

**Done when.** Two equivalent types; a line count.

<details><summary>Hint</summary>

Then list what you gave up by hand-writing it.

</details>

---

*Stuck for more than twenty minutes on one exercise? Read that section of `NOTES.md`, then come back and start the exercise from scratch rather than resuming a half-finished attempt.*
