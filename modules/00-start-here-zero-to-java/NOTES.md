# 🐣 Module 00 — Zero to Java (Start Here If You've NEVER Coded Java)

> **by Yassin Ghariani — JavaBoy ☕** · Read time: ~45 min · No prior knowledge required.
>
> This module exists so that *anyone* — even someone who has never written a line of code — can use this repo. Everything later builds on the mental pictures you form HERE. Diagrams render automatically on GitHub (they're Mermaid). For the *animated* version, open [`interactive/memory-visualizer.html`](../../interactive/memory-visualizer.html) in your browser.

---

## 0.1 What is Java, really?

Java is a language you write in a `.java` text file. A tool called the **compiler** (`javac`) translates it into **bytecode** (a `.class` file) — a universal instruction format. Then the **JVM** (Java Virtual Machine) runs that bytecode on any operating system. That's the famous *"write once, run anywhere."*

```mermaid
flowchart LR
    A["📄 App.java<br/>(your source code)"] -->|javac compiles| B["📦 App.class<br/>(bytecode)"]
    B -->|runs on| C["☕ JVM on Windows"]
    B -->|runs on| D["☕ JVM on Linux"]
    B -->|runs on| E["☕ JVM on macOS"]
    style A fill:#1e3a5f,stroke:#4da3ff,color:#fff
    style B fill:#3d2e5f,stroke:#b48cff,color:#fff
    style C fill:#14432e,stroke:#37c871,color:#fff
    style D fill:#14432e,stroke:#37c871,color:#fff
    style E fill:#14432e,stroke:#37c871,color:#fff
```

### JDK vs JRE vs JVM (nested boxes — memorize this picture)

```mermaid
flowchart TB
    subgraph JDK["🧰 JDK — Java Development Kit (what YOU install)"]
        direction TB
        TOOLS["javac (compiler) · jar · javadoc · jshell · debugger"]
        subgraph JRE["📚 JRE — Runtime Environment"]
            LIBS["Core libraries (String, List, IO, …)"]
            subgraph JVM["⚙️ JVM — the engine"]
                EXEC["Loads bytecode → verifies → executes<br/>Manages MEMORY (stack + heap) & Garbage Collection"]
            end
        end
    end
    style JDK fill:#0d1b2a,stroke:#4da3ff,color:#fff
    style JRE fill:#1b263b,stroke:#b48cff,color:#fff
    style JVM fill:#2d1b3d,stroke:#ff8fa3,color:#fff
```

> 🧠 **Memory hook:** JDK ⊃ JRE ⊃ JVM — "**D**evelopers need everything, **R**unners need libraries, the **V**M is the engine."

---

## 0.2 Your first program (the Java 25 way — it's tiny now)

Create a file `Hello.java` containing **only** this:

```java
void main() {
    IO.println("Hello, I'm learning Java with JavaBoy!");
}
```

Run it (no separate compile step needed for single files):

```bash
java Hello.java
```

That's a **compact source file** (new in Java 25): no class declaration, no `public static void main(String[] args)`, and `IO.println` works without imports. You'll still learn the classic form in Module 03 — the exam tests both:

```java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, classic Java!");
    }
}
```

---

## 0.3 Variables — labeled boxes

A variable is a named box holding a value. Every box has a **type** that says what fits inside.

```java
int age = 25;          // whole number
double price = 9.99;   // decimal number
boolean fun = true;    // true/false
char grade = 'A';      // ONE character, single quotes
String name = "Yassin"; // text — note: String is NOT a primitive!
```

The 8 **primitive** types (simple boxes holding the value *itself*):

| Type | Holds | Size | Example |
|------|-------|------|---------|
| `byte` | tiny int (−128…127) | 8-bit | `byte b = 100;` |
| `short` | small int | 16-bit | `short s = 30_000;` |
| `int` | int (default) | 32-bit | `int i = 2_000_000;` |
| `long` | big int | 64-bit | `long l = 9_000_000_000L;` |
| `float` | decimal | 32-bit | `float f = 1.5f;` |
| `double` | decimal (default) | 64-bit | `double d = 1.5;` |
| `char` | one character | 16-bit | `char c = 'J';` |
| `boolean` | true/false | JVM-dependent | `boolean ok = true;` |

Everything else (`String`, `List`, your own classes…) is a **reference type** — and that difference is the single most important idea in Java memory. Next section. 👇

---

## 0.4 THE BIG PICTURE: Stack vs Heap 🧠

When your program runs, the JVM gives it two main memory areas:

- **The Stack** 🥞 — one per thread. Holds *method calls* (frames) and *local variables*. Fast, small, automatic: when a method returns, its frame vanishes.
- **The Heap** 🏔️ — one shared pool. Holds *objects* (everything created with `new`, plus strings, arrays…). Cleaned by the **Garbage Collector**.

**A primitive variable stores its value directly. A reference variable stores an ARROW (address) pointing to an object on the heap.**

```java
int a = 42;
String s = "hi";
int[] nums = {1, 2, 3};
```

```mermaid
flowchart LR
    subgraph STACK["🥞 STACK (main's frame)"]
        A["int a = 42<br/>(value stored right here)"]
        S["String s = ➜ (reference)"]
        N["int[] nums = ➜ (reference)"]
    end
    subgraph HEAP["🏔️ HEAP (shared)"]
        SO["🔤 String object: &quot;hi&quot;"]
        AR["📦 array object: [1, 2, 3]"]
    end
    S -->|points to| SO
    N -->|points to| AR
    style STACK fill:#0d1b2a,stroke:#4da3ff,color:#fff
    style HEAP fill:#1a2e1a,stroke:#37c871,color:#fff
    style A fill:#1e3a5f,color:#fff
    style S fill:#1e3a5f,color:#fff
    style N fill:#1e3a5f,color:#fff
    style SO fill:#14432e,color:#fff
    style AR fill:#14432e,color:#fff
```

### Why this matters IMMEDIATELY: two variables, one object

```java
int x = 5;
int y = x;      // y gets a COPY of 5. Changing y never touches x.

int[] p = {1, 2};
int[] q = p;    // q gets a COPY OF THE ARROW → same array!
q[0] = 99;
System.out.println(p[0]); // 99 😱 — p and q point to the SAME object
```

```mermaid
flowchart LR
    subgraph STACK["🥞 STACK"]
        X["x = 5"]
        Y["y = 5 (independent copy)"]
        P["p ➜"]
        Q["q ➜"]
    end
    subgraph HEAP["🏔️ HEAP"]
        ARR["📦 [99, 2] — ONE array, TWO arrows"]
    end
    P --> ARR
    Q --> ARR
    style STACK fill:#0d1b2a,stroke:#4da3ff,color:#fff
    style HEAP fill:#1a2e1a,stroke:#37c871,color:#fff
```

> ⚠️ **Exam + real-life rule #1:** Java is ALWAYS **pass-by-value**. For references, the *value* being copied is *the arrow itself* — never the object. Full proof with animation: `docs/JAVA-MEMORY-EXPLAINED.md` + the visualizer.

### Method calls = stack frames 🥞

Each method call pushes a **frame**; returning pops it:

```java
void main() {          // frame 1 pushed
    int r = square(6); // frame 2 pushed on top
    IO.println(r);
}
int square(int n) {    // n = 6 (a copy!)
    return n * n;      // frame 2 popped, 36 goes back
}
```

```mermaid
flowchart TB
    subgraph T3["③ after return"]
        M3["main: r = 36"]
    end
    subgraph T2["② inside square"]
        SQ["square: n = 6  ← top"]
        M2["main: r = ?"]
    end
    subgraph T1["① start"]
        M1["main: r = ?"]
    end
    T1 --> T2 --> T3
    style T1 fill:#0d1b2a,stroke:#4da3ff,color:#fff
    style T2 fill:#0d1b2a,stroke:#ffb84d,color:#fff
    style T3 fill:#0d1b2a,stroke:#37c871,color:#fff
```

### The Garbage Collector 🗑️

When no arrow points at an object anymore, it becomes **unreachable** — the GC eventually deletes it. You never `free` memory in Java.

```java
String s = new String("temp");
s = null;   // the "temp" object is now garbage → GC will reclaim it
```

---

## 0.5 Reading errors like a pro (beginners' superpower)

| Message | Meaning | Typical fix |
|---------|---------|-------------|
| `cannot find symbol` | typo / missing import / wrong name | check spelling & imports |
| `';' expected` | missing semicolon on the line ABOVE usually | add `;` |
| `incompatible types` | putting a big value in a small box | cast or change type |
| `NullPointerException` | you followed an arrow that points at nothing (`null`) | check for null before using |
| `ArrayIndexOutOfBoundsException` | asked for a box that doesn't exist | valid indexes: `0 … length-1` |

> 💡 Read the FIRST line of a stack trace + the FIRST line mentioning *your* file. Ignore the rest at first.

---

## 0.6 Setup checklist

1. Install **JDK 25**: easiest via [SDKMAN](https://sdkman.io) → `sdk install java 25-open` (or download from adoptium.net / oracle.com).
2. Verify: `java --version` → must say 25.
3. Editor: IntelliJ IDEA Community (recommended) or VS Code + Java extension.
4. Type (never copy-paste!) `src/FirstSteps.java` from this module and run it: `java src/FirstSteps.java`.
5. Open `interactive/memory-visualizer.html` in your browser and step through the animation until the stack/heap picture feels *obvious*.
6. Take `QUIZ.md`. Score ≥ 90%? → go to Module 01. Otherwise re-read and retry tomorrow.

## ✅ You now know
- [ ] What JDK / JRE / JVM are (nested boxes)
- [ ] How code becomes a running program (source → bytecode → JVM)
- [ ] The 8 primitives vs reference types
- [ ] Stack (frames, locals) vs Heap (objects) and what a reference/arrow is
- [ ] Why copying a reference ≠ copying an object
- [ ] What the Garbage Collector does

*Next stop: [Module 01 — Basics & Data Types](../01-basics-and-data-types/NOTES.md)* 🚀
