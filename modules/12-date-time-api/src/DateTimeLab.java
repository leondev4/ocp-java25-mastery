// ☕ Module 12 Lab — DateTimeLab.java — by Yassin Ghariani (JavaBoy)
// Run: java DateTimeLab.java (JDK 25). Predict every line first!
import module java.base;

void main() {
    IO.println("=== Immutability trap ===");
    var d = LocalDate.of(2026, 1, 31);
    d.plusDays(1);                        // discarded!
    IO.println("unchanged: " + d);
    IO.println("plusMonths(1) truncates: " + d.plusMonths(1)); // 2026-02-28

    IO.println("\n=== Period vs Duration ===");
    IO.println(Period.of(1, 2, 3));                 // P1Y2M3D
    IO.println(Duration.ofHours(26));               // PT26H
    IO.println("static chain trap: " + Period.ofYears(2).ofMonths(3)); // P3M !
    try { LocalDate.now().plus(Duration.ofDays(1)); }
    catch (UnsupportedTemporalTypeException e) { IO.println("Duration on LocalDate → " + e.getClass().getSimpleName()); }

    IO.println("\n=== DST: spring forward in New York (2026-03-08) ===");
    var zone = ZoneId.of("America/New_York");
    var before = ZonedDateTime.of(LocalDate.of(2026, 3, 8), LocalTime.of(1, 30), zone);
    var after = before.plusHours(1);
    IO.println(before + "  +1h→  " + after);        // 01:30-05:00 → 03:30-04:00
    IO.println("Duration.between: " + Duration.between(before, after)); // PT1H real time

    IO.println("\n=== Period vs Duration across DST ===");
    IO.println("+Period.ofDays(1): " + before.plus(Period.ofDays(1)).toLocalTime());   // 01:30 (same clock)
    IO.println("+Duration.ofHours(24): " + before.plus(Duration.ofHours(24)).toLocalTime()); // 02:30 (same elapsed)

    IO.println("\n=== Formatting ===");
    var f = DateTimeFormatter.ofPattern("EEE dd/MM/yyyy 'at' HH:mm");
    IO.println(LocalDateTime.of(2026, 7, 6, 14, 30).format(f));
    try { LocalDate.now().format(DateTimeFormatter.ofPattern("HH:mm")); }
    catch (UnsupportedTemporalTypeException e) { IO.println("time pattern on LocalDate → runtime boom"); }

    IO.println("\n✅ Module 12 lab done — now the quiz.");
}
