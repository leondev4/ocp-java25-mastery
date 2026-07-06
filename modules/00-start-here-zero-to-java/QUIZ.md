# 🧪 Module 00 Quiz — Zero to Java

Answer from memory, then reveal. Need ≥ 90% (9/10) to advance.

**Q1.** Which tool turns `.java` into `.class`?
**Q2.** JDK, JRE, JVM — which contains which?
**Q3.** True/false: bytecode compiled on Windows can run on the Linux JVM.
**Q4.** Name the 8 primitive types.
**Q5.** `int a = 7; int b = a; b = 10;` — what is `a`?
**Q6.** `int[] p = {1,2}; int[] q = p; q[1] = 9;` — what is `p[1]`?
**Q7.** Where do local variables live? Where do objects live?
**Q8.** What makes an object eligible for garbage collection?
**Q9.** What exception do you get when calling a method on a `null` reference?
**Q10.** Write a complete Java 25 compact source file that prints your name.

<details><summary>📝 Answers</summary>

1. `javac` (the compiler). With `java App.java`, compilation happens invisibly in memory.
2. JDK ⊃ JRE ⊃ JVM.
3. True — that's the whole point of bytecode.
4. byte, short, int, long, float, double, char, boolean.
5. **7** — primitives are copied by value.
6. **9** — q copied the ARROW, both point to the same array.
7. Locals → stack (inside the current method's frame). Objects → heap.
8. No live reference points to it anymore (unreachable).
9. `NullPointerException`.
10. ```java
    void main() {
        IO.println("Yassin Ghariani — JavaBoy");
    }
    ```
</details>
