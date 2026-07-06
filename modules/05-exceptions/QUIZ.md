# Quiz — Module 05

1. Name 4 unchecked and 4 checked exceptions from memory.
2. What does this return?
```java
int f() { try { return 1; } finally { return 2; } }
```
3. `catch (IOException | Exception e)` — compiles?
4. Three resources declared A, B, C in a try-with-resources — closing order?
5. Try block throws E1; close() throws E2. Which is primary, and where is the other?
6. `try { int x = 1; } catch (IOException e) {}` — compiles? What about `catch (Exception e)`?
7. `throw null;` — compile error or runtime? Which exception?
8. Is the multi-catch variable reassignable?
9. Resource declared in try-with-resources header — visible in the catch block?
10. `finally` throws an exception while try also threw one — what does the caller see?

---
<details><summary>ANSWERS</summary>

1. Unchecked: NullPointerException, ClassCastException, ArithmeticException, IllegalArgumentException (any RuntimeException/Error). Checked: IOException, FileNotFoundException, SQLException, InterruptedException/ParseException.
2. `2` — return in finally overrides.
3. ❌ No — multi-catch types can't be parent/child.
4. C, B, A — reverse declaration order.
5. E1 is primary; E2 is attached as suppressed (`getSuppressed()`).
6. IOException ❌ (checked, can't occur in try). `Exception` ✅ — always allowed.
7. Compiles; at runtime throws NullPointerException.
8. ❌ No — implicitly final.
9. ❌ No — scope is the try block only.
10. Only the finally exception; the try's exception is lost (replaced, NOT suppressed).
</details>
