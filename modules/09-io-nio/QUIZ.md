# Quiz — Module 09

1. `Path.of("/home/yassin/doc.txt").getName(0)` — result? And `getNameCount()`?
2. `p1.resolve(p2)` where p2 is absolute — result?
3. `Path.of("/a/b").relativize(Path.of("c/d"))` — result?
4. `Path.of("a/./b/../c").normalize()` — result?
5. Difference `Files.readAllLines` vs `Files.lines`? Which needs closing?
6. `Files.copy(dir1, dir2)` where dir1 has files inside — what is copied?
7. During deserialization, whose constructor runs?
8. A `transient int count = 5;` — value after deserialization?
9. What's new about `Reader.readAllLines()` and in which Java version?
10. In a compact source file, why can you call `IO.println` without imports?
11. `Files.createDirectory("/a/b/c")` when /a/b doesn't exist — result?
12. `BufferedReader.readLine()` at end of file returns…?

---
<details><summary>ANSWERS</summary>

1. `home` (root `/` not counted). getNameCount() = 3.
2. p2 itself — an absolute argument replaces the receiver.
3. 💥 IllegalArgumentException — one absolute, one relative.
4. `a/c`.
5. readAllLines loads everything into a List eagerly; lines() is a lazy Stream keeping the file open → must be closed (try-with-resources).
6. Only an empty directory dir2 — copy is shallow for directories.
7. The no-arg constructor of the first NON-serializable superclass; the serializable class's constructors are skipped.
8. `0` — transient fields get default values.
9. Java 25: Reader gained readAllLines() → List<String> and readAllAsString().
10. Compact source files implicitly import java.lang.IO's static methods (and java.base's commonly used classes).
11. 💥 IOException (NoSuchFileException) — parent missing; use createDirectories.
12. `null` (read() returns −1).
</details>
