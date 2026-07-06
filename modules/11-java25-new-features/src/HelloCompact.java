// The ENTIRE program. Run with: java HelloCompact.java
// No class. No public static void main. No imports. Welcome to Java 25.

String greeting = "Salut";   // fields allowed in the implicit class

void main() {
    IO.println(greeting + " from JavaBoy's compact source file!");
    var langs = List.of("Java 22: _", "Java 24: Gatherers", "Java 25: IO + module imports");
    langs.forEach(IO::println);          // List works: implicit import module java.base
    IO.println(helper());
}

String helper() { return "extra methods allowed too"; }
