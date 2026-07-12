# Mock Exam 01 — 25 Questions / 60 Minutes

> Simulates the real 1Z0-831 style. Timer on. No notes. Mark guesses with ⭐. Answers with full explanations at the bottom — review them ALL, even the ones you got right.

**Q1.** What is the result?
```java
var sb = new StringBuilder("java");
sb.append("boy").insert(0, "!").reverse();
System.out.print(sb);
```
A. `!javaboy` B. `yobavaj!` C. `!yobavaj` D. Does not compile

**Q2.** Which lines compile? (Choose two)
```java
byte b = 5;
A. b = b + 1;
B. b += 1;
C. b = 5 + 1;
D. long l = 5_000_000_000;
```

**Q3.** What prints?
```java
Object o = 15;
var r = switch (o) {
    case Integer i when i > 20 -> "A";
    case Integer i -> "B";
    case String s -> "C";
    default -> "D";
};
System.out.print(r);
```
A. A B. B C. C D. D E. Does not compile

**Q4.** What is the result?
```java
record Pt(int x, int y) {
    Pt { x = Math.abs(x); }
}
System.out.print(new Pt(-3, 4).x());
```
A. −3 B. 3 C. Does not compile D. Runtime exception

**Q5.** What prints?
```java
try {
    System.out.print("T");
    throw new RuntimeException();
} catch (RuntimeException e) {
    System.out.print("C");
    return;
} finally {
    System.out.print("F");
}
```
A. TC B. TCF C. TF D. Does not compile

**Q6.** Given resources opened as `try (var a = new R("a"); var b = new R("b"))` where R prints its name on close — closing output?
A. `ab` B. `ba` C. undefined order D. nothing

**Q7.** What is the result?
```java
List<Integer> list = new ArrayList<>(List.of(10, 20, 30));
list.remove(1);
System.out.print(list);
```
A. [20, 30] B. [10, 30] C. [10, 20, 30] D. UnsupportedOperationException

**Q8.** `System.out.print(Arrays.binarySearch(new int[]{1,3,5,7}, 6));`
A. −3 B. −4 C. 3 D. −5

**Q9.** Which statement about `List<? super Integer> l` is true?
A. `l.add(5)` fails to compile B. `Integer i = l.get(0)` compiles C. `l.add(5)` compiles D. Only null can be added

**Q10.** What prints?
```java
var s = Stream.of("a", "bb", "ccc");
System.out.print(s.count());
System.out.print(s.anyMatch(String::isEmpty));
```
A. 3false B. 3true C. 3 then IllegalStateException D. Does not compile

**Q11.** `Stream.of(1,2,3,4,5).gather(Gatherers.windowFixed(3)).toList()` returns:
A. [[1,2,3],[4,5]] B. [[1,2,3]] C. [[1,2,3],[2,3,4],[3,4,5]] D. [[1,2,3],[4,5,null]]

**Q12.** `Stream.of(1,2,3).gather(Gatherers.scan(() -> 10, Integer::sum)).toList()`?
A. [16] B. [11,13,16] C. [10,11,13,16] D. [1,3,6]

**Q13.** What prints?
```java
Optional<String> o = Optional.empty();
System.out.print(o.orElseGet(() -> "X") + o.map(String::length).isPresent());
```
A. Xtrue B. Xfalse C. NoSuchElementException D. Does not compile

**Q14.** Which is true about virtual threads in Java 25? (Choose two)
A. They are daemon threads and this cannot be changed
B. synchronized blocks pin them to their carrier thread
C. They are best for CPU-bound work
D. Blocking inside synchronized no longer pins them (since Java 24)

**Q15.** What prints?
```java
static final ScopedValue<Integer> V = ScopedValue.newInstance();
// in main:
ScopedValue.where(V, 1).run(() ->
    ScopedValue.where(V, 2).run(() -> System.out.print(V.get())));
System.out.print(V.isBound());
```
A. 1true B. 2false C. 2true D. NoSuchElementException

**Q16.** `Executors.newFixedThreadPool(2).submit(() -> 5)` — the returned Future's `get()` yields:
A. null B. 5 C. compile error D. ExecutionException

**Q17.** What prints?
```java
Path p = Path.of("/zoo/animals/../cats/./tiger.txt");
System.out.print(p.normalize().getNameCount());
```
A. 2 B. 3 C. 4 D. 5

**Q18.** `Path.of("/a/b").resolve(Path.of("/x/y"))` returns:
A. /a/b/x/y B. /x/y C. /a/b D. IllegalArgumentException

**Q19.** Which constructor prologue statement is ILLEGAL in Java 25?
```java
class C extends P {
    int v;
    C(int x) {
        A. if (x < 0) throw new IllegalArgumentException();
        B. v = x * 2;
        C. System.out.print(this.v);
        D. int y = x + 1;
        super(x);
    }
}
```

**Q20.** A compact source file contains only `void main() { IO.println(List.of(1,2)); }` — result of `java App.java`?
A. Compile error: List not imported B. Compile error: no class declared C. Prints [1, 2] D. Runtime error: IO not found

**Q21.** `import module java.sql;` and `import module java.base;` both present, code uses `Date d;`:
A. java.util.Date wins B. java.sql.Date wins C. Compile error: ambiguous D. Runtime error

**Q22.** Bundles: `Zoo.properties`, `Zoo_en.properties`, `Zoo_fr.properties`. Default locale en_US; requested locale de_DE. `ResourceBundle.getBundle("Zoo", Locale.of("de","DE"))` loads:
A. Zoo_fr B. Zoo_en C. Zoo.properties D. MissingResourceException

**Q23.** `NumberFormat.getCompactNumberInstance(Locale.US, NumberFormat.Style.SHORT).format(1_234_567)` prints:
A. 1.2M B. 1M C. 1,234,567 D. 1.23M

**Q24.** Which sealed hierarchy compiles?
A. `sealed class A permits B {} class B extends A {}`
B. `sealed class A permits B {} final class B extends A {}`
C. `sealed class A permits B {} final class B {}`
D. `sealed interface A permits B {} final interface B extends A {}`

**Q25.** What prints?
```java
enum Level { LOW, HIGH;
    static { System.out.print("S"); }
    Level() { System.out.print("C"); } }
// main:
Level l = Level.LOW;
System.out.print(l.ordinal());
```
A. SCC0 B. CCS0 C. CC0 D. SC0

---
<details><summary>📝 ANSWERS + EXPLANATIONS</summary>

1. **B** — chaining mutates ONE object: "java" → append → "javaboy" → insert → "!javaboy" → reverse → "yobavaj!". Always reverse character-by-character on your scratch board, exactly like the real exam.
2. **B, C** — B: compound assignment has implicit cast. C: `5+1` is a compile-time constant fitting in byte. A: int result needs cast. D: needs `L` suffix.
3. **B** — 15 fails the guard (>20), falls to unguarded `Integer i`.
4. **B** — compact constructor reassigns the parameter; the implicit field assignment then stores 3.
5. **B** — finally always runs, even with return in catch → TCF.
6. **B** — reverse order: b closes first.
7. **B** — remove(int index) removes index 1 (value 20).
8. **B** — insertion point 3 → −3−1 = **−4**.
9. **C** — consumer super: adding Integer OK; get() returns Object (B wrong).
10. **C** — count() consumes the stream; second terminal op throws IllegalStateException.
11. **A** — last window may be partial, never padded.
12. **B** — running sums starting from initial 10: 11, 13, 16 (initial itself not emitted).
13. **B** — orElseGet gives "X"; map on empty stays empty → isPresent false.
14. **A, D** — daemon always; JEP 491 (Java 24) removed synchronized pinning. C wrong: they shine on blocking I/O.
15. **B** — inner binding (2) wins inside; outside all scopes isBound() is false.
16. **B** — lambda `() -> 5` is a Callable<Integer> → get() returns 5.
17. **B** — normalize → /zoo/cats/tiger.txt → 3 names (root not counted).
18. **B** — absolute argument replaces the receiver.
19. **C** — `this` (reading a field) is forbidden in the prologue. Assigning `v = ...` (B) is legal.
20. **C** — compact files implicitly import module java.base and get IO. Prints [1, 2].
21. **C** — two exported `Date` types → ambiguous → compile error unless a single-type import resolves it.
22. **B** — de_DE missing, de missing → falls back to DEFAULT locale (en_US → en) BEFORE the base file.
23. **B** — compact SHORT style with default settings truncates to at most one integer digit group: "1M".
24. **B** — permitted class must extend AND be final/sealed/non-sealed. A: missing modifier. C: doesn't extend A. D: interfaces can't be final.
25. **B** — enum constants are implicitly the FIRST static fields, so both constructors run (CC) before the static block (S), then ordinal 0 → **CCS0**.

**Scoring:** ≥ 20/25 (80%) → on track. Log EVERY miss in the Error Journal, including Q1 and Q25 style "careless" ones — those are the ones that kill exam scores.
</details>
