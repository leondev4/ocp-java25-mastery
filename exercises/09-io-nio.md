# Coding exercises — I/O & NIO.2

Nine tenths of the value here is typing the code yourself and predicting the
output *before* you run it. Guessing and checking teaches you far less than
committing to an answer and being wrong.

Run any file with `java Name.java` on JDK 25.

---

## 1. Path algebra

**Task.** Work through resolve, relativize and normalize on five path pairs, including an absolute argument to resolve.

**Done when.** A table of inputs and outputs.

<details><summary>Hint</summary>

An absolute argument to resolve discards the base.

</details>

---

## 2. Syntactic versus real

**Task.** Show that Path.of accepts a nonexistent path and that Files.exists disagrees.

**Done when.** Construction succeeds, existence fails.

<details><summary>Hint</summary>

toRealPath touches the disk; normalize does not.

</details>

---

## 3. Stream leak

**Task.** Use Files.lines without try-with-resources on many files until you exhaust file handles, then fix it.

**Done when.** One failure, one clean run.

<details><summary>Hint</summary>

Any Files method returning a Stream holds resources.

</details>

---

## 4. Bytes versus characters

**Task.** Read the same file as bytes and as characters with an explicit charset, then with the wrong charset.

**Done when.** Correct text, then mojibake.

<details><summary>Hint</summary>

Always name the charset.

</details>

---

## 5. Transient round trip

**Task.** Serialize an object with a transient field and a static field, deserialize, and record what survived.

**Done when.** Both come back as defaults.

<details><summary>Hint</summary>

Statics belong to the class.

</details>

---

## 6. Constructor bypass

**Task.** Prove that deserialization does not call the class's own constructor by putting a print statement in it.

**Done when.** No output on deserialize.

<details><summary>Hint</summary>

Which is why invariants can be bypassed.

</details>

---

## 7. Not serializable

**Task.** Trigger NotSerializableException with a nested non-serializable field, then fix it two ways.

**Done when.** One exception, two fixes.

<details><summary>Hint</summary>

transient or make it serializable.

</details>

---

## 8. Copy options

**Task.** Copy onto an existing file, first without options and then with REPLACE_EXISTING.

**Done when.** One exception, one success.

<details><summary>Hint</summary>

Same pattern applies to move.

</details>

---

## 9. Walk a tree

**Task.** Count files by extension under a directory using Files.walk, closing the stream properly.

**Done when.** A correct histogram.

<details><summary>Hint</summary>

Filter directories out explicitly.

</details>

---

*Stuck for more than twenty minutes on one exercise? Read that section of `NOTES.md`, then come back and start the exercise from scratch rather than resuming a half-finished attempt.*
