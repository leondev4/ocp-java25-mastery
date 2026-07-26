#!/usr/bin/env bash
# Compile every lab in modules/*/src against the installed JDK.
# Labs use Java 25 language features, so JDK 25 or newer is required.
#
#   ./tools/verify-labs.sh          compile only
#   ./tools/verify-labs.sh --run    compile and run each lab
set -uo pipefail

cd "$(dirname "$0")/.." || exit 1

if ! command -v java >/dev/null 2>&1; then
  echo "No java on PATH. Install JDK 25:  sdk install java 25-open"
  exit 1
fi

version=$(java -version 2>&1 | head -1 | sed -E 's/.*"([0-9]+).*/\1/')
if [ "${version:-0}" -lt 25 ] 2>/dev/null; then
  echo "Found Java $version. These labs need JDK 25 — compact source files,"
  echo "java.lang.IO and module imports do not exist in earlier releases."
  echo "Install with:  sdk install java 25-open"
  exit 1
fi

run_mode=0
[ "${1:-}" = "--run" ] && run_mode=1

pass=0; fail=0; failed_files=()
work=$(mktemp -d)
trap 'rm -rf "$work"' EXIT

for f in modules/*/src/*.java; do
  [ -e "$f" ] || continue
  printf '%-58s' "$f"
  if out=$(javac -d "$work" "$f" 2>&1); then
    if [ "$run_mode" -eq 1 ]; then
      if runout=$(cd "$work" && timeout 30 java "$(basename "$f")" 2>&1 </dev/null); then
        echo "ok (compiled, ran)"
      else
        echo "COMPILED BUT FAILED AT RUNTIME"
        echo "$runout" | sed 's/^/    /'
        fail=$((fail+1)); failed_files+=("$f"); continue
      fi
    else
      echo "ok"
    fi
    pass=$((pass+1))
  else
    echo "COMPILE ERROR"
    echo "$out" | sed 's/^/    /'
    fail=$((fail+1)); failed_files+=("$f")
  fi
done

echo
echo "$pass passed, $fail failed"
if [ "$fail" -gt 0 ]; then
  printf 'Failed:\n'
  printf '  %s\n' "${failed_files[@]}"
  exit 1
fi
