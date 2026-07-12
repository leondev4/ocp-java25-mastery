# Mock Exam 02 — 25 Questions / 60 Minutes

> Harder mix, heavier on Java 22–25 deltas. Timer on. Closed book. Mark guesses with ⭐.

**Q1.** What prints?
```java
var s = "Java";
s += switch (s.length()) {
    case 4 -> "Boy";
    default -> "?";
};
System.out.print(s);
```
A. Java B. JavaBoy C. Boy D. Does not compile

**Q2.** What prints?
```java
int[][] m = new int[2][];
m[0] = new int[]{1};
System.out.print(m[1].length);
```
A. 0 B. 1 C. NullPointerException D. Does not compile

**Q3.** Which THREE are valid uses of `_` in Java 25?
A. `var _ = compute();`
B. `catch (Exception _) {}`
C. `int x = _ + 1;`
D. `case Point(int x, int _) ->`
E. `String _ = "a"; IO.println(_);`

**Q4.** What prints?
```java
sealed interface S permits A, B {}
record A() implements S {}
record B() implements S {}
S s = new B();
var r = switch (s) {
    case A a -> 1;
    case B b -> 2;
};
System.out.print(r);
```
A. 1 B. 2 C. Compile error: missing default D. Runtime error

**Q5.** What prints?
```java
class P { static String w() { return "P"; }
          String x() { return "p"; } }
class C extends P { static String w() { return "C"; }
                    String x() { return "c"; } }
P o = new C();
System.out.print(o.w() + o.x());
```
A. Pc B. Cc C. Pp D. Cp

**Q6.** Which is true of this constructor?
```java
class K {
    final int v;
    K(int x) {
        v = x;          // ①
        IO.println(v);  // ②
        super();
    }
}
```
A. Compiles fine B. ① illegal in prologue C. ② illegal in prologue D. Both illegal

**Q7.** What prints?
```java
var list = new ArrayList<>(List.of("a", "b", "c"));
var it = list.iterator();
while (it.hasNext()) {
    if (it.next().equals("b")) list.remove("b");
}
```
A. runs silently B. ConcurrentModificationException C. UnsupportedOperationException D. Does not compile

**Q8.** `Map.of("a",1,"a",2)` results in:
A. {a=2} B. {a=1} C. IllegalArgumentException D. compile error

**Q9.** What prints?
```java
var r = Stream.of(1, 2, 3, 4)
    .gather(Gatherers.fold(() -> 100, Integer::sum))
    .toList();
System.out.print(r);
```
A. [110] B. [101, 103, 106, 110] C. [10] D. [100, 110]

**Q10.** What prints?
```java
var m = Stream.of("apple", "avocado", "banana")
    .collect(Collectors.toMap(s -> s.charAt(0), s -> s));
```
A. {a=avocado, b=banana} B. {a=apple, b=banana} C. IllegalStateException D. compile error

**Q11.** What prints?
```java
Optional<Integer> o = Optional.of(5);
System.out.print(o.filter(n -> n > 10).orElse(o.get() * 2));
```
A. 5 B. 10 C. NoSuchElementException D. empty

**Q12.** With `var ex = Executors.newVirtualThreadPerTaskExecutor()`, tasks submitted run on threads that are: (Choose two)
A. platform threads B. daemon threads C. named vt-1, vt-2 by default D. virtual threads

**Q13.** What prints?
```java
static final ScopedValue<String> U = ScopedValue.newInstance();
void main() {
    System.out.print(U.orElse("none"));
    ScopedValue.where(U, "yg").run(() -> System.out.print(U.get()));
}
```
A. noneyg B. yg C. NoSuchElementException D. Does not compile

**Q14.** A task should return a value AND may throw a checked exception. Use:
A. Runnable B. Callable C. Supplier D. Consumer

**Q15.** What prints?
```java
Path p = Path.of("a/b/c.txt");
System.out.print(p.getName(1) + " " + p.subpath(1, 3));
```
A. a b/c.txt B. b b/c.txt C. b c.txt D. IndexOutOfBoundsException

**Q16.** `Files.lines(path)` differs from `Files.readAllLines(path)` because it: (Choose two)
A. returns a lazy Stream B. loads the whole file into a List C. should be closed (try-with-resources) D. returns lines in reverse

**Q17.** In `module-info.java`, which directive makes `java.sql` readable to CONSUMERS of your module too?
A. `exports java.sql;` B. `requires java.sql;` C. `requires transitive java.sql;` D. `opens java.sql;`

**Q18.** File `Tool.java` contains:
```java
String greet() { return "hi"; }
void main() { IO.println(greet()); }
```
Running `java Tool.java` prints:
A. hi B. compile error: methods need a class C. runtime error: no static main D. compile error: missing imports

**Q19.** Which statement about `import module java.base;` in a REGULAR (non-compact) source file is true?
A. Not allowed outside compact files B. Imports all packages exported by java.base C. Imports every JDK class D. Only legal in module-info.java

**Q20.** What prints?
```java
try {
    throw new IllegalArgumentException("A");
} finally {
    throw new IllegalStateException("B");
}
```
A. IllegalArgumentException: A B. IllegalStateException: B (A lost) C. B with A suppressed D. Does not compile

**Q21.** try-with-resources: where do close()-time exceptions go when the body ALSO threw?
A. they replace the body's exception B. suppressed on the body's exception C. ignored D. wrapped in RuntimeException

**Q22.** What prints?
```java
var d = new ArrayDeque<Integer>();
d.push(1); d.push(2); d.offer(3);
System.out.print(d.pop() + "" + d.poll());
```
A. 21 B. 12 C. 23 D. 13

**Q23.** `Locale.setDefault(Locale.GERMANY)` then `NumberFormat.getInstance().format(1234.5)` most likely prints:
A. 1,234.5 B. 1.234,5 C. 1234,50 D. compile error

**Q24.** Which TWO are true about records?
A. can declare extra private instance fields
B. can declare static fields
C. implicitly final
D. accessors are named getX()

**Q25.** What prints?
```java
Runnable r = () -> System.out.print("run");
r.run();
System.out.print(Thread.currentThread().isVirtual());
```
(executed as `java App.java` on JDK 25, main thread)
A. runtrue B. runfalse C. true D. compile error: isVirtual

---
<details><summary>📝 ANSWERS + EXPLANATIONS</summary>

1. **B** — length 4 → "Boy"; `+=` concatenates → JavaBoy.
2. **C** — `m[1]` was never assigned → null → NPE on `.length`.
3. **A, B, D** — `_` can be declared anywhere a local/param/pattern var can, but can NEVER be read (C, E illegal).
4. **B** — sealed + all cases covered = exhaustive, no default needed. This is the sealed/switch synergy.
5. **A** — static `w()` → reference type P; instance `x()` → object type C → "Pc".
6. **C** — the prologue may ASSIGN the class's own fields (① is legal, JEP 513), but ② READS `v` — that's an implicit use of `this`, which is forbidden before super().
7. **B** — structural modification during iteration (not via the iterator) → ConcurrentModificationException, even single-threaded.
8. **C** — `Map.of` rejects duplicate KEYS at creation with IllegalArgumentException.
9. **A** — `fold` emits ONE value at the end: 100+1+2+3+4 = 110 → [110]. (`scan` would emit the running values.)
10. **C** — duplicate key 'a' → toMap throws IllegalStateException (fix with a merge function).
11. **B** — filter fails → empty → orElse evaluates 5*2 = 10.
12. **B, D** — virtual threads, always daemon; they're unnamed by default.
13. **A** — `orElse` outside any binding → "none"; inside → "yg".
14. **B** — Callable: `V call() throws Exception`.
15. **B** — name elements: a(0), b(1), c.txt(2). getName(1) = "b"; subpath(1,3) = "b/c.txt" → prints "b b/c.txt".
16. **A, C** — lazy stream over the file; hold it in try-with-resources.
17. **C** — `transitive` re-shares readability downstream.
18. **A** — compact source file: any top-level methods join the implicit class; instance main is fine.
19. **B** — JEP 511 module imports work in ANY source file and bring exported packages only.
20. **B** — an exception thrown in finally REPLACES the in-flight one; A is lost (no suppression here — that's try-with-resources).
21. **B** — with resources, close-exceptions attach via getSuppressed().
22. **A** — push adds to HEAD: [2,1]; offer adds to TAIL: [2,1,3]. pop→2, poll→1 → "21".
23. **B** — German grouping: 1.234,5.
24. **B, C** — statics fine; records final; extra instance fields forbidden; accessors are `x()`, not `getX()`.
25. **B** — plain `java App.java` runs main on a PLATFORM thread → isVirtual() false (the method exists since 19/21).

**Scoring:** ≥ 20/25 → on track. Every miss → Error Journal, tonight.
</details>
