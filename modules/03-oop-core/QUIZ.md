# Quiz — Module 03

1. Recite the full initialization order for `new Child()` where Child extends Parent.
2. Parent has `Object get()`. Can Child override with `String get()`? With `int get()` if Parent returns `long`?
3. `Parent p = new Child(); p.staticMethod();` — whose method runs?
4. In Java 25, what THREE things are forbidden in a constructor prologue (before `super()`)?
5. In the prologue, can you assign a field of the CURRENT class? Read a field?
6. Class implements two interfaces, both with `default String name()`. What must the class do, and how does it call interface A's version?
7. Overriding method: Parent declares `throws IOException`. Can Child declare `throws Exception`? `throws FileNotFoundException`? `throws RuntimeException`?
8. `var x = null;` — compiles?
9. Which nested class type requires an outer instance to construct: `outer.new Inner()`?
10. Overload resolution: `f(int)` vs `f(Integer)` vs `f(long)` vs `f(int...)` — order for call `f(5)`?

---
<details><summary>ANSWERS</summary>

1. Parent statics → Child statics → Parent instance fields/blocks → Parent ctor → Child instance fields/blocks → Child ctor.
2. `String get()` ✅ (covariant reference type). `int` vs `long` ❌ — primitives must match exactly.
3. Parent's — static methods are hidden and resolved by reference type.
4. Using `this` (explicitly or implicitly — instance method calls / field reads), `return`, and a second `super()`/`this()`.
5. Assign ✅ (own fields). Read ❌ (reading uses `this`).
6. Must override `name()`; can delegate with `A.super.name()`.
7. `Exception` ❌ (broader checked). `FileNotFoundException` ✅ (narrower). `RuntimeException` ✅ (unchecked always allowed).
8. ❌ No — `null` alone gives no type to infer.
9. Inner (member, non-static) class.
10. exact `f(int)` → widening `f(long)` → boxing `f(Integer)` → varargs `f(int...)`.
</details>
