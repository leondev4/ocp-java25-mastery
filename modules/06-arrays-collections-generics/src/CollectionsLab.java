// Run: java CollectionsLab.java
import module java.base;   // Java 25 module import — one line imports everything!

void main() {
    // remove(int) vs remove(Object)
    List<Integer> l = new ArrayList<>(List.of(5, 6, 7));
    l.remove(1);                          // index!
    IO.println(l);                        // [5, 7]
    l.remove(Integer.valueOf(5));         // value
    IO.println(l);                        // [7]

    // immutable factory traps
    var immutable = List.of(1, 2, 3);
    try { immutable.add(4); }
    catch (UnsupportedOperationException e) { IO.println("List.of is immutable"); }

    Integer[] arr = {1, 2, 3};
    var view = Arrays.asList(arr);
    view.set(0, 99);                      // ✅ allowed, writes through
    IO.println(arr[0]);                   // 99
    try { view.add(4); }
    catch (UnsupportedOperationException e) { IO.println("asList is fixed-size"); }

    // binarySearch math
    IO.println(Arrays.binarySearch(new int[]{2, 4, 6}, 5));  // -3

    // Comparator building
    var words = new ArrayList<>(List.of("bb", "a", "ccc"));
    words.sort(Comparator.comparing(String::length).reversed());
    IO.println(words);                    // [ccc, bb, a]

    // merge semantics
    var map = new HashMap<String, Integer>();
    map.merge("k", 1, Integer::sum);      // absent -> put 1
    map.merge("k", 5, Integer::sum);      // present -> 1+5
    IO.println(map);                      // {k=6}
    map.merge("k", 0, (a, b) -> null);    // fn returns null -> REMOVE key
    IO.println(map);                      // {}

    // PECS
    List<? super Integer> sink = new ArrayList<Number>();
    sink.add(42);                         // ✅ consumer super
    List<? extends Number> source = List.of(1, 2.5);
    Number n = source.get(0);             // ✅ producer extends
    // source.add(3);                     // ❌ UNCOMMENT: won't compile
    IO.println(sink + " " + n);
}
