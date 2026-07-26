# Coding exercises — Zero to Java

Nine tenths of the value here is typing the code yourself and predicting the
output *before* you run it. Guessing and checking teaches you far less than
committing to an answer and being wrong.

Run any file with `java Name.java` on JDK 25.

---

## 1. Hello, argument

**Task.** Write a compact source file that greets a name passed on the command line, falling back to `world` when none is given.

**Done when.** `java Greet.java Ana` prints `Hello, Ana`; `java Greet.java` prints `Hello, world`.

<details><summary>Hint</summary>

Remember `args` is an empty array, never null.

</details>

---

## 2. Read the error

**Task.** Deliberately break a program four ways: missing semicolon, misspelled `String`, wrong file name for a public class, and calling an undefined method. Record the exact compiler message for each.

**Done when.** A four-line note mapping each mistake to its message.

<details><summary>Hint</summary>

The caret often points one token PAST the real mistake.

</details>

---

## 3. Trace the throw

**Task.** Write three methods that call each other, with the deepest one dividing by zero. Run it and annotate the stack trace, marking which line is the throw site.

**Done when.** You can name the throw site without running the program again.

<details><summary>Hint</summary>

Traces read top-down, deepest first.

</details>

---

## 4. Defaults versus locals

**Task.** Write a class with an uninitialised int FIELD and an uninitialised int LOCAL. Print the field; try to print the local.

**Done when.** Field prints 0; the local produces a compile error.

<details><summary>Hint</summary>

This asymmetry is examined constantly.

</details>

---

## 5. Type inference limits

**Task.** Declare five variables with `var` and find three initialisers the compiler rejects.

**Done when.** Three rejected cases with reasons.

<details><summary>Hint</summary>

Try `var x = null;` and a lambda.

</details>

---

## 6. Print versus println

**Task.** Produce the exact output `a-b-c` on one line then `done` on the next, using only print and println.

**Done when.** Two lines, exactly as specified.

<details><summary>Hint</summary>

Count your line terminators.

</details>

---

## 7. Round trip

**Task.** Compile with `javac` into a `out/` directory, then run from there with `java -cp`.

**Done when.** The program runs from compiled classes, not source.

<details><summary>Hint</summary>

`javac -d out Hello.java` then `java -cp out Hello`.

</details>

---

## 8. Instance main

**Task.** Write a compact file whose `main` is an INSTANCE method and that also declares a field initialised at construction. Print the field from main.

**Done when.** It runs; you can explain which constructor the launcher used.

<details><summary>Hint</summary>

An instance main needs a non-private no-arg constructor.

</details>

---

*Stuck for more than twenty minutes on one exercise? Read that section of `NOTES.md`, then come back and start the exercise from scratch rather than resuming a half-finished attempt.*
