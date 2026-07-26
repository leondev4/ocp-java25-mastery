# Coding exercises — OOP Core

Nine tenths of the value here is typing the code yourself and predicting the
output *before* you run it. Guessing and checking teaches you far less than
committing to an answer and being wrong.

Run any file with `java Name.java` on JDK 25.

---

## 1. Initialisation order

**Task.** Build a two-level hierarchy with static blocks, instance blocks, field initialisers and constructors at both levels. Predict the full output for two instantiations.

**Done when.** Your prediction matches exactly.

<details><summary>Hint</summary>

Statics once at class load; then parent instance-init, parent constructor, child instance-init, child constructor.

</details>

---

## 2. Fields do not override

**Task.** Demonstrate that a field access resolves by reference type while a method call resolves by object type.

**Done when.** One object, two different answers.

<details><summary>Hint</summary>

This is the highest-value OOP trap on the exam.

</details>

---

## 3. Constructor leak

**Task.** Call an overridable method from a superclass constructor and observe a subclass field that is still null.

**Done when.** A NullPointerException or a null print.

<details><summary>Hint</summary>

Then fix it and explain the fix.

</details>

---

## 4. Diamond default

**Task.** Create two interfaces with the same default method and a class implementing both. Resolve the conflict with `A.super`.

**Done when.** It compiles after the override.

<details><summary>Hint</summary>

The compiler forces you to choose.

</details>

---

## 5. Overload resolution

**Task.** Write five overloads (int, long, Integer, Object, varargs) and call with an int. Then delete them one at a time to watch the choice move.

**Done when.** A ranked list of resolution order.

<details><summary>Hint</summary>

Exact, widening, boxing, varargs.

</details>

---

## 6. Covariant return

**Task.** Override a method returning a supertype with one returning a subtype. Then try to narrow a parameter and observe it becomes an overload.

**Done when.** One override, one accidental overload.

<details><summary>Hint</summary>

Parameters are part of the signature; return types are not.

</details>

---

## 7. Exception narrowing

**Task.** Write an override that throws fewer checked exceptions than its parent, then try to broaden it.

**Done when.** One compiles, one does not.

<details><summary>Hint</summary>

Unchecked exceptions are unconstrained.

</details>

---

## 8. Flexible constructor

**Task.** Write a class whose constructor validates its argument BEFORE calling super(), and prove the superclass constructor never runs on invalid input.

**Done when.** The exception is thrown before any superclass output.

<details><summary>Hint</summary>

Java 25, JEP 513.

</details>

---

## 9. Access matrix

**Task.** Build four classes across two packages and empirically fill in the private/package/protected/public visibility table.

**Done when.** A completed 4x4 table.

<details><summary>Hint</summary>

protected includes subclasses in other packages.

</details>

---

*Stuck for more than twenty minutes on one exercise? Read that section of `NOTES.md`, then come back and start the exercise from scratch rather than resuming a half-finished attempt.*
