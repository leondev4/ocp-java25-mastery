# Quiz — Module 04

1. For `record Point(int x, int y)`, what is the accessor method name for x?
2. Can a record extend a class? Implement an interface? Declare an extra instance field? A static field?
3. In a compact constructor, is `this.x = x;` legal?
4. What must a non-canonical record constructor do in its first statement?
5. `Season.valueOf("Winter")` when the constant is `WINTER` — result?
6. What are the THREE modifiers a permitted subclass of a sealed class must choose from?
7. When can you omit the `permits` clause?
8. `case Point(int x, int y, int z) ->` for a 2-component record — compiles?
9. Can an enum constructor be `protected`?
10. Why does a switch over a sealed interface not need `default`?

---
<details><summary>ANSWERS</summary>

1. `x()` — records don't use getX naming.
2. Extend ❌ (already extends Record). Implement ✅. Extra instance field ❌. Static field ✅.
3. ❌ No — compact ctor may only reassign parameters; fields are assigned implicitly at the end.
4. Delegate with `this(...)` to (eventually) the canonical constructor.
5. 💥 IllegalArgumentException — valueOf is case-sensitive and matches the exact constant name.
6. `final`, `sealed`, or `non-sealed`.
7. When all permitted subtypes are declared in the same source file as the sealed type.
8. ❌ No — record pattern arity must match the component list exactly.
9. ❌ No — enum constructors are implicitly private; only `private` or package-default allowed.
10. The compiler knows ALL possible subtypes, so covering each permitted type is provably exhaustive.
</details>
