// Run: java TrapLab01.java  — Java 25 compact source file with instance main!
// PREDICT each output BEFORE running. Then uncomment the broken lines one by one
// and READ the compiler errors — that's how you learn the traps.

void main() {
    // --- promotion & compound assignment ---
    byte b = 10;
    b += 5;                    // ✅ implicit cast built into +=
    // b = b + 5;              // ❌ UNCOMMENT ME: int cannot be converted to byte
    IO.println("b = " + b);

    // --- wrapper cache ---
    Integer small1 = 127, small2 = 127, big1 = 128, big2 = 128;
    IO.println("127==127 ? " + (small1 == small2));  // true (cache)
    IO.println("128==128 ? " + (big1 == big2));      // false!
    IO.println("equals    ? " + big1.equals(big2));  // true

    // --- immutability ---
    String s = "java";
    s.toUpperCase();           // return value thrown away!
    IO.println(s);             // still "java"

    // --- StringBuilder chaining mutates ONE object ---
    var sb = new StringBuilder("abc");
    sb.append("d").reverse();
    IO.println(sb);            // dcba

    // --- integer math ---
    IO.println(5 / 2);         // 2
    IO.println(5 % -3);        // 2 (sign follows dividend)
    IO.println(Math.round(-2.5)); // -2 (half rounds UP toward +∞)

    // --- octal trap ---
    int oct = 017;
    IO.println("017 = " + oct); // 15

    // --- dates are immutable too ---
    var d = java.time.LocalDate.of(2026, 7, 2);
    d.plusDays(30);            // ignored!
    IO.println(d);             // 2026-07-02
}
