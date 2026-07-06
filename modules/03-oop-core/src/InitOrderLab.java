// Run: java InitOrderLab.java — write your prediction of the FULL output first!

class Parent {
    static { IO.println("1. Parent static"); }
    { IO.println("3. Parent instance block"); }
    Parent(int x) { IO.println("4. Parent ctor(" + x + ")"); }
}

class Child extends Parent {
    static { IO.println("2. Child static"); }
    { IO.println("5. Child instance block"); }
    final int grade;

    Child(int g) {
        // ---- Java 25 flexible constructor body: PROLOGUE ----
        if (g < 0) throw new IllegalArgumentException("negative!"); // validate BEFORE super
        int normalized = Math.min(g, 10);
        grade = normalized;              // ✅ assigning OWN field allowed in prologue
        // IO.println(this.grade);       // ❌ UNCOMMENT: 'this' forbidden in prologue
        super(normalized);               // prologue ends here
        IO.println("6. Child ctor, grade=" + grade);
    }
}

void main() {
    new Child(42);
    IO.println("---- second object: statics do NOT run again ----");
    new Child(3);

    // hiding vs overriding
    Parent p = new Child(1);
    // fields & statics -> reference type; instance methods -> runtime type
}
