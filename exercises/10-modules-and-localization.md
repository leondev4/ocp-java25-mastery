# Coding exercises — Modules & Localization

Nine tenths of the value here is typing the code yourself and predicting the
output *before* you run it. Guessing and checking teaches you far less than
committing to an answer and being wrong.

Run any file with `java Name.java` on JDK 25.

---

## 1. First module

**Task.** Build a two-module application: one exports a package, the other requires it. Compile and run with --module-path.

**Done when.** It runs modular.

<details><summary>Hint</summary>

Then remove exports and read the error.

</details>

---

## 2. Transitive dependency

**Task.** Show that requires transitive spares the consumer from re-declaring, and that plain requires does not.

**Done when.** One compiles, one fails.

<details><summary>Hint</summary>

This is API hygiene.

</details>

---

## 3. exports versus opens

**Task.** Attempt reflective setAccessible against an exported package and an opened one.

**Done when.** One throws, one succeeds.

<details><summary>Hint</summary>

Frameworks need opens.

</details>

---

## 4. Service loader

**Task.** Wire an interface and two implementations through uses and provides, then iterate ServiceLoader.

**Done when.** Both implementations discovered.

<details><summary>Hint</summary>

No direct dependency on the implementations.

</details>

---

## 5. Module import

**Task.** Replace a block of imports with `import module java.base`, then create an ambiguity and resolve it.

**Done when.** One clean file, one ambiguity resolved.

<details><summary>Hint</summary>

Single-type imports win.

</details>

---

## 6. Bundle fallback

**Task.** Create Msg, Msg_fr and Msg_fr_FR with overlapping and missing keys, then request several locales.

**Done when.** A table showing which file answered each key.

<details><summary>Hint</summary>

Parents are consulted for missing keys.

</details>

---

## 7. Missing key

**Task.** Request a key present in no bundle in the chain and handle the failure gracefully.

**Done when.** MissingResourceException, then a graceful path.

<details><summary>Hint</summary>

containsKey lets you check first.

</details>

---

## 8. Currency and percent

**Task.** Format the same number as currency and percentage in four locales.

**Done when.** Eight correctly formatted strings.

<details><summary>Hint</summary>

Symbol placement varies more than you expect.

</details>

---

## 9. Pattern mismatch

**Task.** Format a LocalDate with a time pattern and a LocalTime with a date pattern.

**Done when.** Two runtime exceptions.

<details><summary>Hint</summary>

Unsupported fields fail late.

</details>

---

*Stuck for more than twenty minutes on one exercise? Read that section of `NOTES.md`, then come back and start the exercise from scratch rather than resuming a half-finished attempt.*
