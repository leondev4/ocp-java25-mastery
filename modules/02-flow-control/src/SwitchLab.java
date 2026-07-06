// Run: java SwitchLab.java — predict before running!

sealed interface Shape permits Circle, Square {}
record Circle(double r) implements Shape {}
record Square(double side) implements Shape {}

void main() {
    // fall-through demo
    int x = 2;
    switch (x) {
        case 1: IO.print("A");
        case 2: IO.print("B");
        case 3: IO.print("C");
        default: IO.print("D");
    }
    IO.println("");   // → BCD

    // switch expression + pattern matching + guards + null
    Object[] samples = { 42, 5, "hi", null, 3.14 };
    for (Object o : samples) {
        String r = switch (o) {
            case null                    -> "null-safe!";
            case Integer i when i > 10   -> "big int " + i;
            case Integer i               -> "small int " + i;
            case String s                -> "string len " + s.length();
            default                      -> "other: " + o;
        };
        IO.println(r);
    }

    // exhaustive sealed switch — NO default needed!
    Shape sh = new Circle(2);
    double area = switch (sh) {
        case Circle(double r)      -> Math.PI * r * r;   // record deconstruction
        case Square(double side)   -> side * side;
    };
    IO.println("area = " + area);

    // unnamed variable in a loop
    int count = 0;
    for (var _ : java.util.List.of("a", "b", "c")) count++;
    IO.println("count = " + count);

    // labels
    outer:
    for (int i = 0; i < 3; i++)
        for (int j = 0; j < 3; j++) {
            if (j == 1) continue outer;
            if (i == 2) break outer;
            IO.println(i + "," + j);
        }
}
