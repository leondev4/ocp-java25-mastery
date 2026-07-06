// ☕ Module 00 Lab — FirstSteps.java — by Yassin Ghariani (JavaBoy)
// Run with JDK 25:  java FirstSteps.java
// TYPE this file yourself. Predict every line BEFORE running. That's how memory forms.

void main() {
    IO.println("=== 1. Primitives: values live IN the variable (stack) ===");
    int x = 5;
    int y = x;        // y receives a COPY of 5
    y = 99;
    IO.println("x = " + x + "  (still 5 — copies are independent)");

    IO.println("\n=== 2. References: variables hold an ARROW to the heap ===");
    int[] p = {1, 2, 3};
    int[] q = p;      // q copies the ARROW, not the array
    q[0] = 42;
    IO.println("p[0] = " + p[0] + "  (42! p and q point to the SAME array)");

    IO.println("\n=== 3. Method calls copy values into a NEW stack frame ===");
    int n = 6;
    IO.println("square(6) = " + square(n) + ", and n is still " + n);

    int[] arr = {10};
    mutate(arr);      // the copied arrow still points to the SAME array
    IO.println("after mutate: arr[0] = " + arr[0] + "  (methods CAN change the object)");

    IO.println("\n=== 4. null = an arrow pointing at nothing ===");
    String s = null;
    IO.println("s == null ? " + (s == null));
    // Uncomment the next line, run, READ the exception, then re-comment:
    // IO.println(s.length());   // NullPointerException

    IO.println("\n=== 5. Garbage collection (conceptually) ===");
    String temp = new String("I will become garbage");
    temp = null;      // the object above is now unreachable → GC food
    IO.println("Reassigned to null → old object is now unreachable.");

    IO.println("\n✅ Module 00 lab done. Open interactive/memory-visualizer.html to SEE this animate!");
}

int square(int v) {   // v is a fresh copy living in square's own frame
    return v * v;
}

void mutate(int[] a) { // 'a' is a copy of the arrow — same heap array
    a[0] = 777;
}
