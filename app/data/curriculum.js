/* OCP Java 25 Mastery — curriculum map
   Exam 1Z0-831 · 50 questions · 90 minutes · 68% to pass
   `weight` = approximate share of real exam questions, used to build mock exams. */
window.CURRICULUM = {
  exam: { code: "1Z0-831", name: "Java SE 25 Developer Professional", questions: 50, minutes: 120, passPct: 68 },

  modules: [
    { id: 0,  slug: "00-start-here-zero-to-java", title: "Zero to Java",
      blurb: "Never written Java? Start here. Compile, run, and read a stack trace before anything else.",
      weight: 0, objectives: ["Toolchain and the run loop", "Reading compiler errors", "Program anatomy"] },

    { id: 1,  slug: "01-basics-and-data-types", title: "Basics & Data Types",
      blurb: "Primitives, promotion, wrappers, String, StringBuilder, java.time. The source of more exam traps than any other module.",
      weight: 7, objectives: ["Use primitives and wrapper classes", "Evaluate arithmetic and boolean expressions", "Manipulate text with String and StringBuilder", "Work with dates and times"] },

    { id: 2,  slug: "02-flow-control", title: "Flow Control",
      blurb: "if/else, loops, labels, and the switch that swallowed pattern matching whole.",
      weight: 6, objectives: ["Control flow with branches and loops", "Switch expressions and statements", "Pattern matching for switch and instanceof"] },

    { id: 3,  slug: "03-oop-core", title: "OOP Core",
      blurb: "Classes, interfaces, inheritance, initialization order, and flexible constructor bodies.",
      weight: 12, objectives: ["Declare and instantiate classes", "Implement inheritance and polymorphism", "Interfaces with default and static methods", "Flexible constructor bodies"] },

    { id: 4,  slug: "04-records-enums-sealed", title: "Records, Enums & Sealed",
      blurb: "Algebraic data modelling: records, enums, sealed hierarchies, and record patterns.",
      weight: 8, objectives: ["Create and use records", "Create and use enums", "Seal class hierarchies", "Deconstruct with record patterns"] },

    { id: 5,  slug: "05-exceptions", title: "Exceptions",
      blurb: "Hierarchy, catch ordering, finally's veto power, try-with-resources and suppression.",
      weight: 9, objectives: ["Handle exceptions with try/catch/finally", "Use try-with-resources", "Create and throw custom exceptions"] },

    { id: 6,  slug: "06-arrays-collections-generics", title: "Arrays, Collections & Generics",
      blurb: "The Collections Framework, sorting contracts, generics and the wildcard rules.",
      weight: 13, objectives: ["Use arrays and the Collections Framework", "Sort with Comparable and Comparator", "Write generic types and methods", "Apply bounded wildcards"] },

    { id: 7,  slug: "07-lambdas-streams-gatherers", title: "Lambdas, Streams & Gatherers",
      blurb: "The single biggest topic. Functional interfaces, the pipeline, collectors, Optional, gatherers.",
      weight: 18, objectives: ["Use lambdas and method references", "Build stream pipelines", "Collect and group results", "Use Optional correctly", "Apply stream gatherers"] },

    { id: 8,  slug: "08-concurrency-virtual-threads", title: "Concurrency & Virtual Threads",
      blurb: "Thread-safety, the concurrent API, executors, virtual threads and scoped values.",
      weight: 11, objectives: ["Develop thread-safe code", "Use the concurrent API and executors", "Create virtual threads", "Use scoped values", "Process collections in parallel"] },

    { id: 9,  slug: "09-io-nio", title: "I/O & NIO.2",
      blurb: "Console and file I/O, java.lang.IO, the Path API, serialization.",
      weight: 8, objectives: ["Read and write with I/O streams", "Serialize and deserialize objects", "Manipulate paths and files with NIO.2"] },

    { id: 10, slug: "10-modules-and-localization", title: "Modules & Localization",
      blurb: "JPMS, module import declarations, locales, resource bundles, formatting.",
      weight: 8, objectives: ["Build and run modular applications", "Use module import declarations", "Implement localization", "Format messages, dates, numbers and currency"] },

    { id: 11, slug: "11-java25-new-features", title: "Java 22 → 25 Delta",
      blurb: "Everything that became final since Java 21. Your last-week revision weapon.",
      weight: 0, objectives: ["Compact source files and instance main", "java.lang.IO", "Module import declarations", "Flexible constructor bodies", "Scoped values", "Unnamed variables and patterns", "Stream gatherers"] }
  ],

  /* SM-2 review intervals in days, indexed by consecutive-correct streak. */
  intervals: [1, 3, 7, 14, 30, 60, 120],

  /* Hunter ranks. These are readiness bands with teeth: the rank is
     derived from real accuracy discounted by coverage, so it cannot be
     farmed by answering six easy questions. B-rank begins at exactly the
     68% pass mark — you must reach B to clear the exam. */
  ranks: [
    { max: 40,  rank: "E", title: "Unawakened",
      hint: "Read the notes and type the labs. Don't drill yet — you'd only be memorising noise." },
    { max: 55,  rank: "D", title: "Awakened",
      hint: "Concepts are landing. Drill your weak modules and leave the strong ones alone." },
    { max: 68,  rank: "C", title: "Below the Gate",
      hint: "You would fail today. Work the error journal — the repeats are where your points are hiding." },
    { max: 80,  rank: "B", title: "Gate Clear",
      hint: "You'd pass, but not comfortably. Push to 80% before you book anything." },
    { max: 92,  rank: "A", title: "Elite",
      hint: "Strong. Three full mocks above 80% and you are done preparing." },
    { max: 101, rank: "S", title: "Monarch",
      hint: "You have nothing left to learn here. Book the exam." }
  ],

  /* XP is earned per correct answer, scaled by difficulty. Levels follow a
     gentle curve so early progress is visible and later levels take work. */
  xp: { perDifficulty: [0, 10, 15, 25], firstAnswerBonus: 5, curve: 55 }
};
