# 🧪 Module 12 Quiz — Date-Time API

**Q1.** `var d = LocalDate.of(2026,1,31); d.plusDays(1); System.out.print(d);` →?
**Q2.** `Period.ofYears(2).ofMonths(3)` equals what Period?
**Q3.** `LocalDate.of(2026,3,8).plus(Duration.ofDays(1))` →?
**Q4.** In New York on 2026-03-08 (spring forward), `ZonedDateTime` at 01:30 plus 1 hour shows what local time?
**Q5.** How many hours long is the fall-back day?
**Q6.** `LocalTime.of(23,30).plusMinutes(45)` →?
**Q7.** Pattern letter for month vs minute?
**Q8.** `LocalDate.of(2026,1,31).plusMonths(1)` →?
**Q9.** Which class is DST-aware: LocalDateTime, Instant, or ZonedDateTime?
**Q10.** Formatting `LocalDate` with pattern `"HH:mm"` — compile error or runtime exception?

<details><summary>📝 Answers</summary>

1. **2026-01-31** — result of plusDays discarded (immutable).
2. **P3M** — static factories don't chain; only ofMonths(3) survives.
3. **UnsupportedTemporalTypeException** — Duration units don't apply to LocalDate.
4. **03:30** — 02:xx doesn't exist; the gap is skipped (offset flips −5→−4).
5. **25 hours** (spring-forward day = 23).
6. **00:15** — LocalTime wraps silently.
7. **M** = month, **m** = minute (case is everything).
8. **2026-02-28** — smart truncation to the last valid day.
9. **ZonedDateTime** (ZoneId rules). Instant is UTC (no DST); LocalDateTime has no zone at all.
10. **Runtime** — UnsupportedTemporalTypeException. The compiler doesn't check pattern-field compatibility.
</details>
