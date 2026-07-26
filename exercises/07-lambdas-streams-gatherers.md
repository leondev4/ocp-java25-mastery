# Coding exercises — Lambdas, Streams & Gatherers

Nine tenths of the value here is typing the code yourself and predicting the
output *before* you run it. Guessing and checking teaches you far less than
committing to an answer and being wrong.

Run any file with `java Name.java` on JDK 25.

---

## 1. Laziness proof

**Task.** Build a pipeline with peek at every stage and no terminal op, then add one. Show the interleaved element-by-element order.

**Done when.** Depth-first ordering, not stage-by-stage.

<details><summary>Hint</summary>

Element 1 reaches the end before element 2 is read.

</details>

---

## 2. One-shot

**Task.** Consume a stream twice and catch the exception. Then restructure so the source can be re-streamed.

**Done when.** One exception, one working fix.

<details><summary>Hint</summary>

Supplier<Stream<T>> is the usual answer.

</details>

---

## 3. Four method references

**Task.** Write all four kinds (static, bound, unbound, constructor) and the equivalent explicit lambda for each.

**Done when.** Eight equivalent forms.

<details><summary>Hint</summary>

Unbound is the one people get wrong.

</details>

---

## 4. orElse cost

**Task.** Prove that orElse evaluates its argument even when the Optional is present, and orElseGet does not.

**Done when.** A side-effect log showing the difference.

<details><summary>Hint</summary>

Matters when the fallback is expensive.

</details>

---

## 5. Collector tour

**Task.** Group, partition, join, count and tee over one dataset.

**Done when.** Five distinct result shapes.

<details><summary>Hint</summary>

Note which always has exactly two keys.

</details>

---

## 6. toMap collision

**Task.** Trigger the duplicate-key IllegalStateException, then resolve it three ways: keep-first, keep-last, and merge into a list.

**Done when.** One exception, three resolutions.

<details><summary>Hint</summary>

The merge function is the third argument.

</details>

---

## 7. Gatherer set

**Task.** Apply windowFixed, windowSliding, fold, scan and mapConcurrent to the same input and tabulate the outputs.

**Done when.** Five outputs; note which change element COUNT.

<details><summary>Hint</summary>

fold produces one element, scan produces n.

</details>

---

## 8. Custom gatherer

**Task.** Write a Gatherer that emits every element until a running total exceeds a limit, then stops.

**Done when.** Short-circuits correctly on a long input.

<details><summary>Hint</summary>

Integrator returns false to stop.

</details>

---

## 9. Infinite trap

**Task.** Make a pipeline hang with sorted() on an infinite stream, then fix it with limit placement.

**Done when.** One hang, one instant result.

<details><summary>Hint</summary>

Order of operations is the whole answer.

</details>

---

## 10. Parallel correctness

**Task.** Write a reduction that gives the wrong answer in parallel because the operator is not associative, then fix it.

**Done when.** Sequential and parallel disagree, then agree.

<details><summary>Hint</summary>

Subtraction is the easy counterexample.

</details>

---

*Stuck for more than twenty minutes on one exercise? Read that section of `NOTES.md`, then come back and start the exercise from scratch rather than resuming a half-finished attempt.*
