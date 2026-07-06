# Quiz — Module 02

1. Valid switch selector types? Name all. Is `long` one of them?
2. What prints?
```java
int x = 2;
switch (x) { case 1: System.out.print("A");
             case 2: System.out.print("B");
             case 3: System.out.print("C");
             default: System.out.print("D"); }
```
3. Does this compile? `int y = switch (day) { case MON -> 1; case TUE -> 2; };` (enum has 7 constants)
4. Inside a switch-expression block, do you use `return` or `yield`?
5. `case String s -> ...` placed after `case Object o -> ...` — compiles?
6. What happens when the selector is `null` and there's no `case null`? (pattern switch)
7. `if (o instanceof String s || s.isEmpty())` — compiles?
8. What does `break outer;` do inside nested loops?
9. Can you write `catch (Exception _)` twice in the same method?
10. `while (false) System.out.print("x");` — compiles?

---
<details><summary>ANSWERS</summary>

1. byte, short, char, int, their wrappers, String, enum, and (pattern switch) any reference type. `long` ❌ never.
2. `BCD` — matches case 2, falls through everything below.
3. ❌ No — switch expression must be exhaustive; 7-constant enum with only 2 cases and no default.
4. `yield`. `return` in a switch expression block is a compile error.
5. ❌ No — `Object` dominates `String`; unreachable pattern = compile error.
6. `NullPointerException` at runtime.
7. ❌ No — with `||`, the compiler can't guarantee `s` is bound, so `s` is out of scope.
8. Exits BOTH loops (the labeled one) immediately.
9. Yes — `_` (unnamed) can be reused freely; it just can't be read.
10. ❌ No — unreachable statement compile error (unlike `if (false)`).
</details>
