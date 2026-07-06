# Module 01 — Basics & Data Types

## 1. Primitives (memorize the table cold)

| Type | Size | Default | Range/Notes |
|------|------|---------|-------|
| byte | 8-bit | 0 | −128 → 127 |
| short | 16-bit | 0 | −32,768 → 32,767 |
| int | 32-bit | 0 | ~±2.1 billion |
| long | 64-bit | 0L | literal needs `L` if > int range |
| float | 32-bit | 0.0f | literal NEEDS `f` (`float x = 1.5;` ❌ won't compile) |
| double | 64-bit | 0.0 | default for decimal literals |
| char | 16-bit | '\u0000' | unsigned, 0 → 65,535 |
| boolean | JVM | false | NOT convertible to int (unlike C) |

⚠️ **Trap:** local variables have **no default value** — using an uninitialized local = compile error. Fields DO get defaults.

**Literals:** underscores allowed inside digits (`1_000_000` ✅) but not at start/end/next to a dot: `_100`, `100_`, `1_.0` ❌. Binary `0b101`, hex `0x1F`, octal `017` (= 15 decimal!).

## 2. Casting & Promotion

Implicit widening chain: `byte → short → int → long → float → double`, plus `char → int`.
- `long → float` is WIDENING (even though float is 32-bit — it loses precision but compiles).
- Narrowing needs an explicit cast: `int i = (int) 3.9;` → `3` (truncates, no rounding).
- ⚠️ **Compound operators auto-cast:** `byte b = 1; b += 1;` ✅ compiles (implicit cast), but `b = b + 1;` ❌ (b+1 is int).
- Arithmetic on `byte/short/char` promotes to **int**: `byte a=1,b=2; byte c = a+b;` ❌.
- Mixed types promote to the largest: `int + long → long`, `long + float → float`.
- Integer overflow wraps silently: `Integer.MAX_VALUE + 1 == Integer.MIN_VALUE`.
- Integer division truncates: `5/2 == 2`; `5.0/2 == 2.5`. Division by zero: int → `ArithmeticException`; double → `Infinity` (and `0.0/0.0` → `NaN`).

## 3. Wrappers & Autoboxing

- `Integer.parseInt("12")` → int; `Integer.valueOf("12")` → Integer.
- ⚠️ Wrapper cache: `Integer a=127,b=127; a==b` → **true** (cached −128→127); with `128` → **false**. Always use `.equals()`.
- ⚠️ Unboxing `null` → `NullPointerException`: `Integer i = null; int j = i;` 💥
- ⚠️ No widening + boxing in one step: `Long l = 5;` ❌ (int→Long fails). `long l = 5;` ✅, `Long l = 5L;` ✅.
- `Integer.compare(a,b)`, `Math.max/min/abs/pow/sqrt/round/floor/ceil`.
- ⚠️ `Math.round(2.5)` → 3 (rounds half **up**), `Math.round(-2.5)` → −2. Returns `long` for double input, `int` for float.

## 4. Strings

- Immutable. Every "modifying" method returns a NEW string; ignoring the return = classic trap:
  `String s = "abc"; s.toUpperCase(); System.out.print(s);` → prints `abc`.
- Key methods: `length, charAt, indexOf, substring(begin, endExclusive), trim, strip` (strip is Unicode-aware), `stripLeading/Trailing, isEmpty` (length==0) vs `isBlank` (only whitespace), `replace, contains, startsWith, split, join, repeat, chars, formatted, intern`.
- `substring(2,2)` → `""` ✅; `substring(3,1)` → 💥 `StringIndexOutOfBoundsException`.
- Concatenation: left-to-right. `1 + 2 + "a"` → `"3a"`; `"a" + 1 + 2` → `"a12"`.
- String pool: `"a" == "a"` true (pooled); `new String("a") == "a"` false.

**Text blocks:**
```java
String tb = """
    Hello %s
    "quotes" fine""";
```
- Opening `"""` MUST be followed by a newline. Closing position controls trailing newline: on its own line → content ends with `\n`.
- Incidental indentation stripped based on the left-most line (including the closing delimiter). `\` at line end = line continuation (no newline). `\s` = keep a trailing space.

## 5. StringBuilder

- Mutable; methods return `this` → chaining mutates the SAME object.
  ⚠️ `sb.append("a").reverse().insert(0,"x");` all affect one object.
- `append, insert, delete(start,endExcl), deleteCharAt, replace(start,endExcl,str), reverse, setLength, capacity`.
- ⚠️ `StringBuilder` does NOT override `equals` → compares references. `sb1.equals(sb2)` false even with same content; use `compareTo` or `toString().equals(...)`.
- `sb.substring(...)` returns a String and does NOT mutate sb.

## 6. Dates & Times (java.time — all immutable!)

- `LocalDate` (no time), `LocalTime` (no date), `LocalDateTime`, `ZonedDateTime` (with zone), `Instant` (machine timestamp UTC).
- Creation: `LocalDate.of(2026, 7, 2)` — months are **1-based** (Month.JULY too). Invalid dates 💥 `DateTimeException`.
- ⚠️ Immutability trap: `date.plusDays(1);` without assignment does nothing.
- `Period` = date-based (years/months/days), `Duration` = time-based (hours/min/sec/nanos).
  ⚠️ `Period.ofYears(1).ofDays(2)` → only 2 days! (static methods chained — each call replaces).
  ⚠️ `Duration` with `LocalDate` 💥 UnsupportedTemporalTypeException.
- **New in Java 23:** `instant1.until(instant2)` → `Duration`.
- DST traps: spring-forward hour doesn't exist (2:30 becomes 3:30), fall-back hour happens twice.
- Formatting: `DateTimeFormatter.ofPattern("dd/MM/yyyy")`; `M` month vs `m` minute; `format` throws if field unsupported (formatting time pattern on LocalDate 💥).

## ⚠️ Top 5 exam traps of this module
1. Ignored return value of String/LocalDate methods (immutables).
2. `byte b = a + b` — int promotion needs cast; `b += x` doesn't.
3. Wrapper `==` in cache range vs outside.
4. `float f = 1.5;` doesn't compile (missing `f`).
5. Uninitialized local variable used → compile error.

---

## 🧠 Memory View — why these traps exist

*(New to Java? Do [Module 00](../00-start-here-zero-to-java/NOTES.md) first. Animated version: [`interactive/memory-visualizer.html`](../../interactive/memory-visualizer.html) → tabs 1 & 2.)*

**String immutability & the pool, drawn:**

```mermaid
flowchart LR
    subgraph STACK["🥞 Stack"]
        A["s ➜"]
    end
    subgraph HEAP["🏔️ Heap"]
        subgraph POOL["🏊 Pool"]
            P1["&quot;hello&quot; (frozen forever)"]
            P2["&quot;HELLO&quot; (new object made by toUpperCase)"]
        end
    end
    A --> P1
    A -.s.toUpperCase() result IGNORED unless assigned.-> P2
    style POOL fill:#241f0c,stroke:#ffd54d,color:#fff
    style STACK fill:#0d1b2a,stroke:#4da3ff,color:#fff
```

**StringBuilder is the opposite — ONE mutable heap object:**

```mermaid
flowchart LR
    SB["sb ➜"] --> O["StringBuilder<br/>&quot;a&quot; → &quot;ab&quot; → &quot;abc&quot;<br/>(same object mutating)"]
    O -->|"append returns this"| O
    style O fill:#14432e,stroke:#37c871,color:#fff
```

**Wrapper cache** (−128…127): `Integer a = 127, b = 127;` → both arrows hit the SAME cached object (`==` true). At 128 → two objects (`==` false). Same picture as the String pool — one shared object vs fresh allocations.
