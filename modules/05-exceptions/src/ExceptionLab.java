// Run: java ExceptionLab.java — predict every line of output first!

class Res implements AutoCloseable {
    private final String name;
    Res(String n) { name = n; IO.println("open " + n); }
    @Override public void close() { IO.println("close " + name); }
}

class BadClose implements AutoCloseable {
    @Override public void close() { throw new IllegalStateException("close boom"); }
}

int finallyWins() {
    try { return 1; }
    finally { return 2; }        // ⚠️ evil but legal: overrides try's return
}

int valueLocked() {
    int x = 1;
    try { return x; }
    finally { x = 99; }          // too late — return value already computed
}

void main() {
    // reverse close order
    try (var a = new Res("A"); var b = new Res("B"); var c = new Res("C")) {
        IO.println("body");
    }                            // → close C, close B, close A

    IO.println("finallyWins() = " + finallyWins());   // 2
    IO.println("valueLocked() = " + valueLocked());   // 1

    // suppressed exceptions
    try (var bad = new BadClose()) {
        throw new RuntimeException("primary boom");
    } catch (RuntimeException e) {
        IO.println("primary   : " + e.getMessage());
        for (Throwable s : e.getSuppressed())
            IO.println("suppressed: " + s.getMessage());
    }

    // multi-catch (unrelated types only)
    try {
        if (Math.random() < 2) throw new java.io.IOException("io");
    } catch (java.io.IOException | IllegalArgumentException e) {
        IO.println("multi-catch got: " + e.getMessage());
        // e = new RuntimeException(); // ❌ UNCOMMENT: e is effectively final
    }
}
