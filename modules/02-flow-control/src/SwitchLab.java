// Run: java SwitchLab.java — predict before running!
/*
Modifiers applied to classes, interfaces and records:
 Type       sealed      non-sealed      final
 class       Yes         Yes            Yes
 interface   Yes         Yes            No
 record      No          No             Yes (optional)
* non-sealed only applies to a class/interface that directly extends or implements a sealed type.
Key rules:
1. If a type is sealed, it must declare permits ... (or keep permitted subtypes in the same file).
2. Every direct subtype of a sealed type must be exactly one of: final, sealed, or non-sealed.
3. final closes that branch (no further inheritance/implementation).
4. non-sealed reopens that branch (inheritance is unrestricted from there).
5. Interfaces cannot be final.
6. Permitted subtypes must be in the same module (or same package when modules are not used)
 */
sealed interface Shape permits Circle, Square {
}
// A record can implements interfaces, but cannot extends classes
// (it already extends java.lang.Record).
// Records are implicitly final, so they cannot be declared
// sealed or non-sealed.
final record Circle(double r) implements Shape {
}
record Square(double side) implements Shape {
}

void main() {
    // fall-through demo
    int x = 2;
    switch (x) {
        case 1:
            IO.print("A");
        case 2:
            IO.print("B");
        case 3:
            IO.print("C");
        default:
            IO.print("D");
    }
    IO.println("");   // → BCD

    // switch expression + pattern matching + guards + null
    Object[] samples = {42, 5, "hi", null, 3.14};
    for (Object o : samples) {
        String r = switch (o) {
            case null -> "null-safe!";
            case Integer i when i > 10 -> "big int " + i;
            case Integer i -> "small int " + i;
            case String s -> "string len " + s.length();
            default -> "other: " + o;
        };
        IO.println(r);
    }

    // exhaustive sealed switch — NO default needed!
    Shape sh = new Circle(2);
    double area = switch (sh) {
        case Circle(double r) -> Math.PI * r * r;   // record deconstruction
        case Square(double side) -> side * side;
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
