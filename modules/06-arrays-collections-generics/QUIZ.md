# Quiz — Module 06

1. `List<Integer> l = new ArrayList<>(List.of(5,6,7)); l.remove(1); System.out.print(l);`
2. `List.of(1,2,3).set(0, 9)` — what happens? And `Arrays.asList(arr).set(0,9)`?
3. `Arrays.binarySearch(new int[]{2,4,6}, 5)` — return value?
4. `Object[] o = new String[1]; o[0] = 42;` — compile or runtime problem? Which?
5. `List<? extends Number> l = List.of(1); l.add(2);` — compiles?
6. Where can you add an Integer: `List<? super Integer>` or `List<? extends Integer>`?
7. `new TreeSet<StringBuilder>().add(new StringBuilder());` then add another — what happens?
8. `map.merge("k", 1, (a,b) -> null)` when "k" exists — effect?
9. `int[] x, y[];` — what are the types of x and y?
10. Deque: difference between `pop()` on empty vs `poll()` on empty?
11. `Comparator.comparing(String::length).reversed()` sorts ["bb","a","ccc"] how?
12. Removing from a List inside a for-each loop — what exception?

---
<details><summary>ANSWERS</summary>

1. `[5, 7]` — remove(int) removes INDEX 1.
2. `List.of(...).set` 💥 UnsupportedOperationException (fully immutable). `Arrays.asList(...).set` ✅ works (fixed-size, but set allowed, writes to backing array).
3. `-3` — insertion point is index 2 → −2−1 = −3.
4. Compiles (arrays covariant); runtime 💥 ArrayStoreException.
5. ❌ No — can't add to `? extends` (except null).
6. `? super Integer` (Consumer Super).
7. Second `add` (actually the first add already in Java: first add succeeds on empty TreeSet... exam answer: 💥 ClassCastException at runtime because StringBuilder isn't Comparable — thrown on the first add in modern JDKs).
8. The mapping function returns null → key "k" is REMOVED from the map.
9. x is `int[]`, y is `int[][]`.
10. `pop()` 💥 NoSuchElementException; `poll()` returns null.
11. Longest first: ccc, bb, a.
12. ConcurrentModificationException.
</details>
