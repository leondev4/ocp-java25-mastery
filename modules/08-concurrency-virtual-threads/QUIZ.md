# Quiz — Module 08

1. `new Thread(r).run();` — what actually happens?
2. Calling `start()` twice on the same Thread — result?
3. Are virtual threads daemon by default? Can you change that?
4. What did Java 24 (JEP 491) fix regarding virtual threads?
5. `submit(Callable)` vs `submit(Runnable)` — what does `get()` return for each?
6. An exception thrown inside a submitted task — how does it reach you?
7. Difference: `scheduleAtFixedRate` vs `scheduleWithFixedDelay`?
8. `AtomicInteger a = new AtomicInteger(5); System.out.print(a.getAndIncrement());`
9. `ConcurrentHashMap.put("k", null)` — result?
10. `ScopedValue.get()` called outside any `where(...).run(...)` — result?
11. Can you `set()` a ScopedValue? How does rebinding work?
12. Which collection gives iterators a snapshot so writes during iteration never throw CME?

---
<details><summary>ANSWERS</summary>

1. The task runs synchronously on the CURRENT thread — no new thread is created.
2. 💥 IllegalThreadStateException.
3. Yes, always daemon; `setDaemon(false)` on a virtual thread throws an exception.
4. Virtual threads no longer get PINNED to their carrier when blocking inside `synchronized` blocks/methods.
5. Callable → the computed value; Runnable → `null`.
6. Wrapped in an `ExecutionException` thrown by `future.get()`.
7. FixedRate: fires on a fixed clock schedule (period measured start-to-start). FixedDelay: waits the delay AFTER each completion.
8. Prints `5` (returns old value, then increments — like x++).
9. 💥 NullPointerException — no null keys or values allowed.
10. 💥 NoSuchElementException (unless you use `orElse`).
11. No set — immutable. Rebinding = nesting another `where` inside the scope; inner value applies, outer restored on exit.
12. CopyOnWriteArrayList.
</details>
