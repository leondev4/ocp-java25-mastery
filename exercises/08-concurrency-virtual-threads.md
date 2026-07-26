# Coding exercises — Concurrency & Virtual Threads

Nine tenths of the value here is typing the code yourself and predicting the
output *before* you run it. Guessing and checking teaches you far less than
committing to an answer and being wrong.

Run any file with `java Name.java` on JDK 25.

---

## 1. Lost updates

**Task.** Increment a shared counter from many threads without synchronisation and show the final value is below expected. Fix it three ways.

**Done when.** One wrong result, three correct.

<details><summary>Hint</summary>

synchronized, AtomicInteger, LongAdder.

</details>

---

## 2. volatile is not atomic

**Task.** Show that a volatile int++ still loses updates.

**Done when.** Still wrong under contention.

<details><summary>Hint</summary>

Visibility is not mutual exclusion.

</details>

---

## 3. Virtual thread scale

**Task.** Launch 100,000 virtual threads that each sleep briefly, then attempt the same with platform threads.

**Done when.** One completes; the other struggles.

<details><summary>Hint</summary>

Time both.

</details>

---

## 4. Executor lifecycle

**Task.** Compare shutdown and shutdownNow with a long-running task, then use close() in try-with-resources.

**Done when.** Three distinct behaviours.

<details><summary>Hint</summary>

Only awaitTermination blocks.

</details>

---

## 5. Future failure

**Task.** Submit a task that throws, then call get() and unwrap the real cause.

**Done when.** ExecutionException wrapping your exception.

<details><summary>Hint</summary>

getCause() is the one you want.

</details>

---

## 6. Scoped value

**Task.** Bind a ScopedValue, read it in a nested call and in a child thread, then read it outside the scope.

**Done when.** Two successes, one NoSuchElementException.

<details><summary>Hint</summary>

There is no set().

</details>

---

## 7. Deadlock and escape

**Task.** Construct a two-lock deadlock, then break it by ordering the locks consistently.

**Done when.** One hang, one clean run.

<details><summary>Hint</summary>

Then try tryLock with a timeout.

</details>

---

## 8. Concurrent map atomicity

**Task.** Show that get-then-put on a ConcurrentHashMap is racy while merge is not.

**Done when.** Counts diverge, then match.

<details><summary>Hint</summary>

Compound operations need the atomic methods.

</details>

---

## 9. Parallel stream ordering

**Task.** Compare forEach and forEachOrdered on a parallel stream, and measure the cost of ordering.

**Done when.** Different orders, measurable cost.

<details><summary>Hint</summary>

Decide when ordering is worth it.

</details>

---

*Stuck for more than twenty minutes on one exercise? Read that section of `NOTES.md`, then come back and start the exercise from scratch rather than resuming a half-finished attempt.*
