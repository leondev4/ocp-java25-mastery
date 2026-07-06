# Quiz — Module 07

1. `Stream.of(1,2,3).filter(x -> x > 1);` — what prints? (nothing else in the code)
2. `var s = Stream.of(1,2); s.count(); s.findFirst();` — result?
3. `Stream.empty().allMatch(x -> false)` — true or false?
4. `Optional.ofNullable(null).orElse("A")` vs `Optional.of(null)` — results?
5. Difference between `orElse(f())` and `orElseGet(() -> f())` when the Optional has a value?
6. `Stream.of(1,2,3,4,5).gather(Gatherers.windowFixed(2)).toList()` — output?
7. `Gatherers.scan(() -> 0, Integer::sum)` on [1,2,3] — output? And `fold` with same args?
8. `f1.andThen(f2)` vs `f1.compose(f2)` — which runs f2 first?
9. What kind of method reference is `String::isEmpty`, and what lambda is it equal to?
10. `Collectors.toMap(String::length, s -> s)` on ["aa","bb"] — what happens?
11. `partitioningBy` map: how many keys, always?
12. `takeWhile(x -> x < 3)` on [1, 2, 5, 1] — output?

---
<details><summary>ANSWERS</summary>

1. NOTHING — no terminal operation, the pipeline never executes.
2. 💥 IllegalStateException — stream already consumed by count().
3. `true` — vacuously true on empty streams.
4. `"A"`; `Optional.of(null)` 💥 NullPointerException.
5. `orElse` evaluates f() even when the value is present; `orElseGet` calls the supplier only when empty.
6. `[[1, 2], [3, 4], [5]]` — last window may be partial.
7. scan → `[1, 3, 6]` (each running total). fold → `[6]` (single final element).
8. `compose` runs f2 first; `andThen` runs f1 first.
9. Unbound instance method reference; equals `s -> s.isEmpty()`.
10. 💥 IllegalStateException — duplicate key 2 (both length 2), no merge function.
11. Exactly 2 keys — true and false — always present, possibly with empty lists.
12. `[1, 2]` — stops permanently at 5; the trailing 1 is not taken.
</details>
