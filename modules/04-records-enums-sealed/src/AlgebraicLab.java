// Run: java AlgebraicLab.java

sealed interface Shape permits Circle, Rect, Unknown {}
record Circle(double r) implements Shape {
    Circle {                                   // compact constructor
        if (r < 0) throw new IllegalArgumentException("negative radius");
    }
    Circle() { this(1.0); }                    // must delegate to canonical
}
record Rect(double w, double h) implements Shape {}
non-sealed class Unknown implements Shape {}

enum Planet { // final by default, can implemnts interface but cannot extends a class
    MERCURY(3.30e23), EARTH(5.97e24);            //compulsory ";" and first constants when write more code
    private final double mass;
    Planet(double m) { mass = m; }             // implicitly private
    double mass() { return mass; }
}

void main() {
    // record freebies
    var c1 = new Circle(2);
    var c2 = new Circle(2);
    IO.println(c1);                 // Circle[r=2.0]
    IO.println(c1.equals(c2));      // true — value-based equals
    IO.println(c1.r());             // accessor is r(), not getR()

    // exhaustive sealed switch + record deconstruction, no default
    Shape s = new Rect(3, 4);
    double area = switch (s) {
        case Circle(double r)     -> Math.PI * r * r;
        case Rect(double w, var h)-> w * h;    // watchout!!! it is valid mix var with type
        case Unknown _            -> 0;        // unnamed pattern variable
    };
    IO.println("area=" + area);

    // enum machinery
    for (Planet p : Planet.values())
        IO.println(p.name() + " ordinal=" + p.ordinal() + " mass=" + p.mass());
    IO.println(Planet.valueOf("EARTH"));
    // Planet.valueOf("earth");     // UNCOMMENT: IllegalArgumentException
}
