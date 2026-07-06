// Run: java StreamsLab.java
import module java.base;

void main() {
    // gatherers — new since Java 24, WILL be on your exam
    IO.println(Stream.of(1,2,3,4,5).gather(Gatherers.windowFixed(2)).toList());
    // [[1, 2], [3, 4], [5]]
    IO.println(Stream.of(1,2,3,4).gather(Gatherers.windowSliding(2)).toList());
    // [[1, 2], [2, 3], [3, 4]]
    IO.println(Stream.of(1,2,3).gather(Gatherers.scan(() -> 0, Integer::sum)).toList());
    // [1, 3, 6]
    IO.println(Stream.of(1,2,3).gather(Gatherers.fold(() -> 0, Integer::sum)).toList());
    // [6]

    // laziness: peek proves nothing runs without a terminal op
    var lazy = Stream.of("a","b").peek(x -> IO.println("peek " + x));
    IO.println("nothing peeked yet...");
    lazy.count();  // NOW it runs? (count may skip peek if sized... use forEach to be sure)

    // one-shot streams
    var s = Stream.of(1, 2, 3);
    IO.println(s.count());
    try { s.findFirst(); }
    catch (IllegalStateException e) { IO.println("stream already consumed!"); }

    // takeWhile / dropWhile
    IO.println(Stream.of(1,2,5,1).takeWhile(x -> x < 3).toList()); // [1, 2]
    IO.println(Stream.of(1,2,5,1).dropWhile(x -> x < 3).toList()); // [5, 1]

    // collectors
    var words = List.of("apple", "banana", "avocado", "blueberry", "cherry");
    Map<Character, List<String>> byFirst = words.stream()
        .collect(Collectors.groupingBy(w -> w.charAt(0)));
    IO.println(byFirst);

    Map<Boolean, Long> part = words.stream()
        .collect(Collectors.partitioningBy(w -> w.length() > 6, Collectors.counting()));
    IO.println(part);   // both true and false keys always exist

    String joined = words.stream().collect(Collectors.joining(", ", "[", "]"));
    IO.println(joined);

    // teeing
    var stats = IntStream.rangeClosed(1, 10).boxed()
        .collect(Collectors.teeing(
            Collectors.counting(),
            Collectors.summingInt(i -> i),
            (count, sum) -> count + " items, sum=" + sum));
    IO.println(stats);

    // Optional
    Optional<String> empty = Optional.ofNullable(null);
    IO.println(empty.map(String::toUpperCase).orElseGet(() -> "fallback"));

    // reduce
    IO.println(Stream.of("J","a","v","a").reduce("", String::concat)); // Java
}
