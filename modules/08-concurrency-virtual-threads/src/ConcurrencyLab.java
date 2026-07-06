// Run: java ConcurrencyLab.java
import module java.base;
import java.util.concurrent.atomic.AtomicInteger;

static final ScopedValue<String> USER = ScopedValue.newInstance();

void main() throws Exception {
    // virtual threads
    Thread v = Thread.ofVirtual().name("vt-1").start(() ->
        IO.println("hello from " + Thread.currentThread().getName()
                   + " virtual=" + Thread.currentThread().isVirtual()));
    v.join();

    // executor in try-with-resources (close() waits for tasks)
    try (var exec = Executors.newVirtualThreadPerTaskExecutor()) {
        Future<Integer> f = exec.submit(() -> 6 * 7);   // Callable
        IO.println("answer = " + f.get());

        Future<?> r = exec.submit(() -> IO.println("runnable task"));
        IO.println("runnable get() = " + r.get());       // null
    }

    // race condition vs atomic — run and compare!
    int[] plain = {0};
    AtomicInteger atomic = new AtomicInteger();
    try (var exec = Executors.newFixedThreadPool(8)) {
        for (int i = 0; i < 10_000; i++)
            exec.submit(() -> { plain[0]++; atomic.incrementAndGet(); });
    }
    IO.println("plain  = " + plain[0] + "   (probably < 10000 — race!)");
    IO.println("atomic = " + atomic.get() + "  (always 10000)");

    // getAndIncrement vs incrementAndGet
    var a = new AtomicInteger(5);
    IO.println(a.getAndIncrement());  // 5
    IO.println(a.incrementAndGet());  // 7

    // Scoped Values (Java 25 final)
    ScopedValue.where(USER, "yassin").run(() -> {
        IO.println("inside scope: " + USER.get());
        ScopedValue.where(USER, "javaboy").run(() ->
            IO.println("rebound     : " + USER.get()));
        IO.println("restored    : " + USER.get());
    });
    IO.println("outside bound? " + USER.isBound());          // false
    IO.println("with default : " + USER.orElse("anonymous"));
}
