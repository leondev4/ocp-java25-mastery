#!/usr/bin/env python3
"""
Recompile the course Markdown into app/data/notes.js.

The reader has to work when index.html is opened straight off disk, and
browsers block fetch() on the file:// origin. So the text is compiled into
a JS file the page can load with a plain <script> tag instead.

Run this after editing any NOTES.md or docs/*.md:

    python3 tools/build-notes.py
"""
import glob
import json
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "app", "data", "notes.js")

# Long-form reference docs that are worth reading inside the app.
# Anything not listed here stays Markdown-only.
DOCS = [
    ("study-strategy",   "docs/STUDY_STRATEGY.md",
     "Study strategy",          "The spaced-repetition system this repo is built around."),
    ("12-week-plan",     "docs/12-WEEK-PLAN.md",
     "12-week plan",            "Day-by-day schedule from zero to exam-ready."),
    ("memory-explained", "docs/JAVA-MEMORY-EXPLAINED.md",
     "Java memory explained",   "Stack, heap, string pool and GC, drawn out."),
    ("cheatsheet",       "docs/THE-WALL-CHEATSHEET.md",
     "The wall cheatsheet",     "The whole exam condensed onto one printable page."),
    ("exam-day",         "docs/EXAM-DAY-PLAYBOOK.md",
     "Exam-day playbook",       "Timing and tactics for the real thing."),
]


def main():
    os.chdir(ROOT)
    notes = {}
    missing = []

    module_paths = sorted(glob.glob("modules/*/NOTES.md"))
    if not module_paths:
        sys.exit("No modules/*/NOTES.md found. Run this from anywhere inside the repo.")

    for path in module_paths:
        slug = path.split(os.sep)[1] if os.sep in path else path.split("/")[1]
        with open(path, encoding="utf-8") as f:
            notes[slug] = f.read()

    doc_index = []
    for key, path, title, blurb in DOCS:
        if not os.path.exists(path):
            missing.append(path)
            continue
        with open(path, encoding="utf-8") as f:
            notes[key] = f.read()
        doc_index.append({"key": key, "title": title, "blurb": blurb})

    with open(OUT, "w", encoding="utf-8") as f:
        f.write("/* Course text — compiled from the Markdown sources so the reader\n")
        f.write("   works over file:// where fetch() is blocked.\n")
        f.write("   Regenerate with tools/build-notes.py after editing any NOTES.md. */\n")
        f.write("window.NOTES = " + json.dumps(notes, ensure_ascii=False, indent=0) + ";\n\n")
        f.write("window.DOC_INDEX = " + json.dumps(doc_index, ensure_ascii=False, indent=0) + ";\n")

    kb = os.path.getsize(OUT) / 1024
    print("Wrote %s" % os.path.relpath(OUT, ROOT))
    print("  %d modules, %d reference docs, %.1f KB" % (len(module_paths), len(doc_index), kb))
    for path in missing:
        print("  skipped (not found): %s" % path)


if __name__ == "__main__":
    main()
