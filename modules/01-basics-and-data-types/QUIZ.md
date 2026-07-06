# Quiz — Module 01 (closed book, answer out loud, then check bottom)

1. `byte b = 10; b = b * 2;` — compiles?
2. What prints? `Integer a = 200, b = 200; System.out.print(a == b);`
3. `String s = "Java"; s.concat("Boy"); System.out.print(s);` — output?
4. `System.out.print(5 + 5 + "5" + 5 + 5);` — output?
5. `long l = 3.0;` — compiles?
6. What prints? `System.out.print("hello".substring(2, 2).isEmpty());`
7. `var d = LocalDate.of(2026, 2, 30);` — result at runtime?
8. `Period p = Period.ofYears(2).ofMonths(3);` — what does `p` hold?
9. `StringBuilder x = new StringBuilder("ab"); StringBuilder y = new StringBuilder("ab"); System.out.print(x.equals(y));`
10. `int i = 010; System.out.print(i);` — output?
11. `double d = 1 / 0;` vs `double d = 1.0 / 0;` — what happens in each?
12. Text block: does `String t = """hi""";` compile?

---
<details><summary>ANSWERS</summary>

1. ❌ No — `b * 2` is int; assigning to byte needs a cast. (`b *= 2` would compile.)
2. `false` — 200 is outside the Integer cache (−128..127).
3. `Java` — String is immutable; return value ignored.
4. `10555` — left-to-right: 5+5=10, then string concatenation.
5. ❌ No — 3.0 is a double; double→long is narrowing, needs `(long)`.
6. `true` — substring(2,2) is a legal empty string.
7. 💥 `DateTimeException` at runtime (Feb 30 doesn't exist). Compiles fine.
8. Only 3 months! `ofYears`/`ofMonths` are static; the chain replaces, not accumulates.
9. `false` — StringBuilder doesn't override equals (reference comparison).
10. `8` — leading 0 = octal literal.
11. `1/0` → ArithmeticException (int division). `1.0/0` → `Infinity`.
12. ❌ No — opening `"""` must be followed by a line break.
</details>
