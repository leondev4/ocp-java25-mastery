# Coding exercises — Exceptions

Nine tenths of the value here is typing the code yourself and predicting the
output *before* you run it. Guessing and checking teaches you far less than
committing to an answer and being wrong.

Run any file with `java Name.java` on JDK 25.

---

## 1. Catch ordering

**Task.** Write a try with three catches ordered wrongly, capture the compile error, then fix the order.

**Done when.** One error, then a clean compile.

<details><summary>Hint</summary>

Leaves before roots.

</details>

---

## 2. finally wins

**Task.** Demonstrate finally overriding a return value, and finally swallowing an exception.

**Done when.** Two surprising outcomes.

<details><summary>Hint</summary>

Then write the rule you would put in a code review.

</details>

---

## 3. Value snapshot

**Task.** Show that mutating a variable in finally does not change an already-computed return value.

**Done when.** Returns the original.

<details><summary>Hint</summary>

The value is captured before finally runs.

</details>

---

## 4. Close order

**Task.** Build a resource class that logs open and close, use three in one try-with-resources, and confirm reverse-order closing.

**Done when.** Close log is the reverse of the open log.

<details><summary>Hint</summary>

And it happens before catch.

</details>

---

## 5. Suppressed exceptions

**Task.** Throw from both the try block and close(), then print getSuppressed().

**Done when.** Primary plus one suppressed.

<details><summary>Hint</summary>

Reverse it: throw only from close() and see which is primary.

</details>

---

## 6. Multi-catch limits

**Task.** Write a legal multi-catch, then break it by using two related types.

**Done when.** One compiles, one does not.

<details><summary>Hint</summary>

Alternatives must be disjoint.

</details>

---

## 7. Custom hierarchy

**Task.** Design a small checked exception with a cause-chaining constructor, throw it wrapping a lower-level cause, and print the full chain.

**Done when.** Both messages appear in the trace.

<details><summary>Hint</summary>

Always offer the (String, Throwable) constructor.

</details>

---

## 8. Unreachable catch

**Task.** Write a catch for a checked exception the try cannot throw, capture the error, then show why `catch (Exception e)` is always allowed.

**Done when.** One error, one success.

<details><summary>Hint</summary>

Unchecked exceptions could always occur.

</details>

---

*Stuck for more than twenty minutes on one exercise? Read that section of `NOTES.md`, then come back and start the exercise from scratch rather than resuming a half-finished attempt.*
