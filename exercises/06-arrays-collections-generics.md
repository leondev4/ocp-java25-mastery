# Coding exercises — Arrays, Collections & Generics

Nine tenths of the value here is typing the code yourself and predicting the
output *before* you run it. Guessing and checking teaches you far less than
committing to an answer and being wrong.

Run any file with `java Name.java` on JDK 25.

---

## 1. Three kinds of immutable

**Task.** Compare List.of, Arrays.asList and Collections.unmodifiableList by attempting set and add on each.

**Done when.** A 3x2 outcome table.

<details><summary>Hint</summary>

Only one allows set but not add.

</details>

---

## 2. Null tolerance

**Task.** Test null keys and null values against HashMap, TreeMap, ConcurrentHashMap and Hashtable.

**Done when.** A 4x2 table of works/throws.

<details><summary>Hint</summary>

Explain why the concurrent one differs.

</details>

---

## 3. Throwing versus returning

**Task.** Exercise add/remove/element against offer/poll/peek on an empty queue.

**Done when.** Three exceptions, three nulls.

<details><summary>Hint</summary>

Same split appears in the Files API.

</details>

---

## 4. Broken hashCode

**Task.** Put a mutable key in a HashMap, mutate the field used by hashCode, then try to retrieve it.

**Done when.** The entry becomes unreachable.

<details><summary>Hint</summary>

This is why keys should be immutable.

</details>

---

## 5. Comparator chain

**Task.** Sort a list of records by one field, then break ties with a second, then reverse the whole thing.

**Done when.** Correct multi-key ordering.

<details><summary>Hint</summary>

Watch where you place reversed().

</details>

---

## 6. PECS in practice

**Task.** Write a copy method with the signature `copy(List<? super T> dst, List<? extends T> src)` and explain why swapping the wildcards breaks it.

**Done when.** A working copy plus two compile errors.

<details><summary>Hint</summary>

Producer Extends, Consumer Super.

</details>

---

## 7. Erasure walls

**Task.** Attempt `new T[10]`, `instanceof T`, and a static field of type T. Record each error.

**Done when.** Three distinct errors.

<details><summary>Hint</summary>

Then implement the standard array workaround.

</details>

---

## 8. Bounded method

**Task.** Write a generic max() requiring `T extends Comparable<T>` and call it with a type that does not qualify.

**Done when.** One success, one clear error.

<details><summary>Hint</summary>

Bounds are compile-time only.

</details>

---

## 9. Deque as both

**Task.** Use one ArrayDeque as a stack and as a queue, showing the different element order.

**Done when.** LIFO and FIFO from the same class.

<details><summary>Hint</summary>

push/pop versus offer/poll.

</details>

---

*Stuck for more than twenty minutes on one exercise? Read that section of `NOTES.md`, then come back and start the exercise from scratch rather than resuming a half-finished attempt.*
