# Quiz — Module 11 (the Java 22→25 delta)

1. In a compact source file, why does `List.of(...)` compile without any import?
2. Give the main-method selection priority order in Java 25.
3. `import module java.base;` — what exactly does it import?
4. Name the 3 things a constructor prologue may do and 3 it may not.
5. `ScopedValue` vs `ThreadLocal` — two key differences.
6. `Gatherers.scan` vs `Gatherers.fold` on [2,3,4] with (()->1, (a,b)->a*b)?
7. Which Java version stopped `synchronized` from pinning virtual threads?
8. `catch (IOException _) { log(_); }` — compiles?
9. What new Reader methods arrived in Java 25?
10. Is StructuredTaskScope final in Java 25?

---
<details><summary>ANSWERS</summary>

1. Compact source files implicitly do `import module java.base` (plus IO's methods available).
2. static main(String[]) → static main() → instance main(String[]) → instance main().
3. All packages EXPORTED by java.base (including those re-exported via requires transitive) — on-demand.
4. May: validate/throw, compute values, assign fields of its OWN class. May not: use `this` (read fields / call instance methods / pass this), `return`, invoke super()/this() more than once.
5. ScopedValue is immutable (no set) and bounded to a dynamic scope automatically; ThreadLocal is mutable, lives until removed (leak risk in pools). ScopedValue is also cheaply inherited in structured concurrency.
6. scan → [2, 6, 24] (running products); fold → [24] only.
7. Java 24 (JEP 491).
8. ❌ No — `_` can never be READ; `log(_)` is illegal.
9. readAllLines(), readAllAsString(), and the static factory Reader.of(CharSequence).
10. No — still preview; only recognize the concept.
</details>
