#!/bin/bash
# usage: tools/shot.sh <out.png> "<query>"   — renders http://localhost:4512/?<query>&still at 1440x838
out=$1; q=$2; rm -f "$out"
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars \
  --force-device-scale-factor=1 --window-size=1440,${H:-838} --user-data-dir=/tmp/memoryscape-chrome \
  --screenshot="$out" --virtual-time-budget=8000 "http://localhost:4512/${PAGE:-}?still&$q" >/dev/null 2>&1 &
pid=$!; for i in $(seq 1 60); do [ -s "$out" ] && break; sleep 0.5; done; sleep 0.5; kill $pid 2>/dev/null; wait $pid 2>/dev/null
[ -s "$out" ] && echo "$out" || echo "FAILED $out"
