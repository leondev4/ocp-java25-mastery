# 🧱 THE WALL — Ultimate 1Z0-831 Cheatsheet

> **by Yassin Ghariani — JavaBoy ☕** · Print it. Tape it to your wall. Re-derive it from memory every Sunday (that's the trick — the *rewriting* is the studying).

## ⚡ Numbers to know cold
`50 questions · 120 min · 68% to pass (34 correct) · multiple choice, some multi-select (count is shown)`

## 1️⃣ Types & operators
- Integral default = `int`, decimal default = `double`. Suffixes: `L`, `f`/`F`, `d`/`D`.
- Literals: `010`=octal 8 · `0x1F`=hex · `0b101`=binary · `1_000_000` ok, but not adjacent to `.`/edges.
- byte −128…127 · short ±32k · int ±2.1B · long ±9.2×10¹⁸ · char 0…65535 (unsigned!).
- `byte b = 5 + 1;` ✅ (constant) · `b = b + 1;` ❌ (int) · `b += 1;` ✅ (implicit cast) · `b++` ✅.
- Promotion: smaller→int in arithmetic; mixed→largest; `char + char = int`.
- `i = i++ + ++i` → old value then incremented value. Trace on paper, always.
- `==` on doubles: `0.1+0.2 != 0.3`. NaN: `x != x` is true only for NaN.

## 2️⃣ Strings & memory 🧠
- Immutable. Every "modifying" call returns a NEW String — unassigned = discarded.
- Pool: literals & compile-time constants share one object (`"ja"+"va" == "java"` ✅ true).
- `new String(...)` = fresh object (`==` false) · `intern()` → pooled arrow.
- Wrapper cache −128…127: `==` unreliable; ALWAYS `equals()` for objects.
- StringBuilder: mutable, chaining mutates ONE object; `equals` NOT overridden (identity!).
- Text blocks `"""` — incidental whitespace stripped by closing-delimiter position.
- Pass-by-value forever: parameter = copied arrow → mutation visible, reassignment invisible.
- Stack: frames + locals (`StackOverflowError`) · Heap: all objects (`OutOfMemoryError`).
- GC = reachability, not ref-counting; `System.gc()` = request; islands of isolation collected.

## 3️⃣ Flow & switch
- Old `switch` falls through without `break`. Arrow `->` never falls through.
- Switch expressions must be EXHAUSTIVE; `yield` returns a value from a block case.
- Patterns: `case Integer i when i > 5 ->` · unguarded pattern dominates guarded BELOW it → order matters (compile error if dominated).
- `null` case: `case null` or `case null, default` — otherwise null → NPE.
- Unnamed `_`: locals/for/catch/lambda/patterns; can't be read; multiple `_` per scope ok.
- Labels work on loops; `break label` / `continue label`.

## 4️⃣ OOP
- Init order: statics (parent→child, once) → instance fields/blocks (parent) → parent ctor → instance (child) → child ctor.
- **Instance methods → runtime type wins. Fields & statics → reference type wins.**
- Flexible ctor bodies (JEP 513): statements before `super()`/`this()` — but NO use of `this` (no field reads, no instance methods; ASSIGNING own fields is allowed).
- Overriding: same/covariant return, same-or-wider access, same-or-narrower checked throws. `private`/`static`/`final` not overridable (private = new method; static = hiding).
- Interfaces: fields implicitly `public static final`; methods implicitly `public abstract`; `default`/`static`/`private` methods allowed; diamond default conflict → must override (`A.super.m()`).
- `var`: local only, needs initializer, no null init, not for fields/params.

## 5️⃣ Records / Enums / Sealed
- Record: final class, final components, auto ctor/accessors/equals/hashCode/toString. Compact ctor mutates PARAMETERS. Can implement interfaces; can't extend / be extended; static members ok; no extra instance fields.
- Records are SHALLOW — defensive-copy mutable components (`List.copyOf`).
- Enum: constants = first static fields (ctors before static block!) · ctor implicitly private · `values()/valueOf()/name()/ordinal()` · constant-specific bodies; abstract methods must be implemented by EVERY constant · `==` safe.
- Sealed: `permits` types must extend AND declare `final|sealed|non-sealed`; same module/package; sealed + records/enums pair for exhaustive switch (no default needed).

## 6️⃣ Exceptions
- Throwable → Error / Exception → RuntimeException(unchecked).
- Checked must be handled-or-declared. Catch order: subtypes FIRST (unreachable catch = compile error).
- `finally` always runs (except `System.exit`); return in finally swallows exceptions/returns (and is a trap).
- try-with-resources: resources close in REVERSE order, before catch/finally; variables implicitly final; must be `AutoCloseable`; exceptions during close become SUPPRESSED (`getSuppressed()`).
- Multi-catch `catch (A | B e)` — no subtype pairs, `e` is final.

## 7️⃣ Collections & generics
- `List.of/Map.of/Set.of` → immutable (add/remove/set → UnsupportedOperationException at RUNTIME); Set.of/Map.of reject duplicates (IllegalArgumentException).
- `Arrays.asList` → fixed-size but `set()` works, backed by array.
- `remove(int)` = index · `remove(Object)` = value. Integer autoboxing chooses the INDEX overload!
- `Arrays.binarySearch` unsorted = undefined; miss → `-(insertionPoint) - 1`.
- Deque: push/pop/peek = head (stack); offer/poll = queue (head remove, tail add).
- TreeMap/TreeSet need Comparable/Comparator; null keys → NPE.
- PECS: `? extends` = read-only producer (only null addable) · `? super` = consumer (add T, read Object).
- Type erasure: no `instanceof List<String>`, no `new T[]`, overloads differing only by type args clash.

## 8️⃣ Streams & lambdas
- Functional interfaces: Supplier`()→T` · Consumer`T→()` · Function`T→R` · Predicate`T→boolean` · UnaryOperator`T→T` · Bi- variants · IntFunction vs ToIntFunction direction!
- LAZY: no terminal op → nothing runs (peek prints nothing).
- One terminal op per stream → second = IllegalStateException.
- Elements flow one-by-one depth-first; `limit` short-circuits the source.
- `Optional`: `orElse` always evaluates its arg; `orElseGet` lazy; `get()` on empty → NoSuchElementException.
- Collectors: `groupingBy` (only present keys) vs `partitioningBy` (ALWAYS true & false keys) · `toMap` duplicate key → IllegalStateException (fix: merge fn) · `joining(delim, prefix, suffix)`.
- Reduce: identity must actually be identity; parallel + non-associative = wrong answers, not exceptions.
- **Gatherers (Java 24)**: `windowFixed(n)` (last partial kept) · `windowSliding(n)` (overlap) · `fold` (one result) · `scan` (running results, initial NOT emitted) · `mapConcurrent(n, fn)` (virtual threads, order kept).
- Primitive streams: `mapToInt/…`, `boxed()`, `sum()/average()` (average → OptionalDouble); `IntStream.range(a,b)` excl / `rangeClosed` incl.

## 9️⃣ Concurrency
- Runnable: no result/exception · Callable: `T call() throws Exception`.
- `Thread.ofVirtual().start(r)` / `Executors.newVirtualThreadPerTaskExecutor()` — virtual = daemon, cheap, heap-stored stacks, for BLOCKING I/O; JEP 491 (24): synchronized no longer pins.
- ExecutorService: `submit`→Future · `shutdown` (graceful) vs `shutdownNow` · always in try-with-resources (Executor is AutoCloseable since 19).
- `volatile` = visibility only · Atomic classes = CAS atomicity · `synchronized` = mutual exclusion.
- ScopedValue (final in 25): immutable per-scope binding `ScopedValue.where(V, x).run(...)`; inner binding wins; unbound `get()` → NoSuchElementException; inherited by StructuredTaskScope children.
- ConcurrentModificationException: structurally modifying a collection while iterating it (single thread suffices!).
- Deadlock needs circular lock order; livelock = active but no progress; starvation = never scheduled.

## 🔟 I/O, NIO.2 & modules
- `java.lang.IO` (25): `IO.println/print/readln` — no import needed anywhere.
- Path: `normalize()` removes `.`/`..` · `resolve(absolute)` → returns the absolute arg · `relativize` needs both-absolute or both-relative · `getName(0)` = first element AFTER root; root not counted.
- Files: `readAllLines` (List) vs `lines` (lazy Stream — close it!) · `copy` won't overwrite without REPLACE_EXISTING · `mkdirs`≈`createDirectories`.
- Reader (25): `readAllLines()`, `readAllAsString()`.
- Serialization: `serialVersionUID`, `transient`/static skipped, parent non-serializable → its no-arg ctor runs on deserialization; readObject bypasses constructors of serializable classes.
- Modules: `requires` / `requires transitive` / `exports [to]` / `opens` (reflection) / `provides…with` / `uses`. Named vs automatic (jar on module path, name from MANIFEST or filename) vs unnamed (classpath).
- Module imports (JEP 511): `import module java.sql;` = all EXPORTED packages + transitives; ambiguity fixed by single-type import.
- Compact source files: implicit class, any `main` form; launcher picks `main(String[])` over `main()`; instance main needs implicit no-arg ctor; implicit `import module java.base`.
- Localization: bundle search = requested locale (full→lang) → DEFAULT locale (full→lang) → base file → MissingResourceException. Properties in the FOUND bundle + its parents chain.
- `NumberFormat.getCompactNumberInstance(..., SHORT)` → "1M"; `Locale.of("fr","CA")` (constructor deprecated).

## 🏁 Question-attack checklist
1. Does it COMPILE? (check before computing anything — wrong types, missing casts, unreachable code, non-exhaustive switch)
2. Is a variable reassigned/shadowed? Fields vs methods dispatch?
3. Trace mutations on paper, char by char, index by index.
4. Streams: is there a terminal op? Is the stream reused?
5. Multi-select: the count is given — use it.

*"If you can draw the memory, you can answer the question."* — **JavaBoy**
