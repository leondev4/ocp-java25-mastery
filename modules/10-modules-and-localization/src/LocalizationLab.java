// Run: java LocalizationLab.java
import module java.base;   // JEP 511 module import
import java.text.*;

void main() throws Exception {
    var tunisia = Locale.of("fr", "TN");    // modern factory (constructors deprecated)
    var us = Locale.US;
    IO.println("locale       : " + tunisia);          // fr_TN

    double price = 1234567.891;
    IO.println("US currency  : " + NumberFormat.getCurrencyInstance(us).format(price));
    IO.println("FR number    : " + NumberFormat.getInstance(Locale.FRANCE).format(price));
    IO.println("percent      : " + NumberFormat.getPercentInstance(us).format(0.756));
    IO.println("compact SHORT: " + NumberFormat.getCompactNumberInstance(us, NumberFormat.Style.SHORT).format(7_123_456));  // 7M
    IO.println("compact LONG : " + NumberFormat.getCompactNumberInstance(us, NumberFormat.Style.LONG).format(7_123_456));

    // parse: leading numeric part, CHECKED ParseException
    Number n = NumberFormat.getInstance(us).parse("12.5abc");
    IO.println("parsed       : " + n);                // 12.5

    // DecimalFormat: # optional vs 0 forced
    IO.println(new DecimalFormat("#,##0.00").format(3.1));   // 3.10
    IO.println(new DecimalFormat("#.##").format(3.14159));   // 3.14

    // localized dates
    var today = java.time.LocalDate.now();
    var fmt = java.time.format.DateTimeFormatter
        .ofLocalizedDate(java.time.format.FormatStyle.FULL).withLocale(Locale.FRANCE);
    IO.println("date FR      : " + today.format(fmt));

    // MessageFormat
    IO.println(MessageFormat.format("Salut {0}, tu as {1} messages", "Yassin", 5));
}
