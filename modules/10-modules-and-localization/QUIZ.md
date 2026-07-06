# Quiz — Module 10

1. Which directives take package names, and which take module names?
2. `requires transitive` — what does it give the modules that require ME?
3. Difference between `exports` and `opens`?
4. What is an automatic module and how does it get its name?
5. Which module never needs to be required explicitly?
6. `import module java.sql;` + `import module java.base;` then using `Date` — result? Fix?
7. Bundle files: Msg.properties, Msg_en.properties, Msg_fr.properties. Locale = fr_TN, default locale = en_US. `getBundle("Msg", locale)` picks which? 
8. A key missing from Msg_fr_TN but present in Msg_fr — what happens on getString?
9. `NumberFormat.getCompactNumberInstance(Locale.US, Style.SHORT).format(7_123_456)` — output?
10. What exception does `NumberFormat.parse("abc")` throw — checked or unchecked?
11. Run command: launch module `shop` main class `com.shop.Main` from directory `mods`.
12. Can code in the unnamed module (classpath) read named modules? Can named modules require the unnamed module?

---
<details><summary>ANSWERS</summary>

1. exports/opens → packages; requires/uses-provides-with → modules for requires, service types for uses/provides.
2. Whatever I `requires transitive` becomes readable by anyone who requires me (implied readability).
3. exports = compile+runtime access to public types; opens = deep reflection access at runtime (frameworks), no compile-time visibility.
4. A plain JAR placed on the module path; name from Automatic-Module-Name manifest entry, else derived from the JAR filename; it exports all its packages.
5. java.base — implicitly required by every module.
6. Ambiguous `Date` (java.util vs java.sql) → compile error; fix with a single-type import like `import java.sql.Date;` which takes precedence.
7. Msg_fr.properties (exact fr_TN missing → fr).
8. Falls back up the parent chain → found in Msg_fr → returned. Only if absent everywhere: MissingResourceException.
9. `7M` — compact short style, truncated.
10. Checked — java.text.ParseException.
11. `java -p mods -m shop/com.shop.Main` (or --module-path / --module).
12. Unnamed reads ALL modules ✅. Named modules can NOT requires the unnamed module ❌.
</details>
