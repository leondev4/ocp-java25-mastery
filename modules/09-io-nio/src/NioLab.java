// Run: java NioLab.java
import module java.base;
import java.nio.file.*;

void main() throws Exception {
    // Path methods — NO disk access
    Path p = Path.of("/home/yassin/projects/../docs/./notes.txt");
    IO.println("normalize    : " + p.normalize());
    IO.println("getFileName  : " + p.getFileName());
    IO.println("nameCount    : " + p.getNameCount());      // root not counted!
    IO.println("getName(0)   : " + p.getName(0));          // home
    IO.println("subpath(1,3) : " + p.subpath(1, 3));

    // resolve trap: absolute argument wins
    Path base = Path.of("/base");
    IO.println("resolve rel  : " + base.resolve("sub/file"));
    IO.println("resolve abs  : " + base.resolve("/etc/passwd")); // /etc/passwd !

    // relativize
    Path a = Path.of("/a/b"), b = Path.of("/a/c/d");
    IO.println("relativize   : " + a.relativize(b));        // ../c/d

    // Files — real disk work in a temp dir
    Path dir = Files.createTempDirectory("ocp");
    Path file = dir.resolve("data.txt");
    Files.writeString(file, "line1\nline2\nline3");
    IO.println("readString   : " + Files.readString(file).lines().count() + " lines");
    IO.println("readAllLines : " + Files.readAllLines(file));

    try (var stream = Files.lines(file)) {                  // lazy → must close
        IO.println("lines>1chr   : " + stream.filter(l -> l.endsWith("2")).toList());
    }

    try (var walk = Files.walk(dir)) {
        walk.forEach(x -> IO.println("walk         : " + x));
    }

    // Java 25: Reader.readAllLines
    try (var reader = java.io.Reader.of("alpha\nbeta")) {
        IO.println("Reader25     : " + reader.readAllLines());
    }

    Files.deleteIfExists(file);
    Files.deleteIfExists(dir);
}
