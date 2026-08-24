#!/usr/bin/env bash
# Manuel Technologies · repo verification
# Run from the repo root:  bash verify.sh

set +e
echo "======================================================"
echo " MANUEL TECHNOLOGIES · VERIFICATION"
echo "======================================================"

echo
echo "--- 1. GIT STATE ---"
echo "Branch:      $(git rev-parse --abbrev-ref HEAD 2>/dev/null)"
echo "Remote:      $(git remote get-url origin 2>/dev/null || echo 'NONE')"
echo "Last commit: $(git log -1 --pretty='%h  %s  (%cr)' 2>/dev/null)"
echo "Ahead/behind:"; git status -sb 2>/dev/null | head -1
echo "Uncommitted changes:"
if [ -z "$(git status --porcelain)" ]; then echo "  none, working tree clean"; else git status --porcelain; fi

echo
echo "--- 2. ROUTES PRESENT ---"
find src/app -name "page.tsx" 2>/dev/null | sed 's|src/app||; s|/page.tsx||; s|^$|/|' | sort | sed 's/^/  /'
echo "Route count: $(find src/app -name 'page.tsx' 2>/dev/null | wc -l | tr -d ' ')"

echo
echo "--- 3. API ROUTES ---"
find src/app/api -name "route.ts" 2>/dev/null | sed 's/^/  /' || true
[ -d src/app/api ] || echo "  none"

echo
echo "--- 4. HOUSE STYLE ---"
DASH=$(grep -rlP '[\x{2013}\x{2014}]' src/ 2>/dev/null)
[ -z "$DASH" ] && echo "  dashes:        CLEAN" || { echo "  dashes:        FOUND IN:"; echo "$DASH" | sed 's/^/    /'; }

BANNED=$(grep -rniE '\b(solutions|cutting-edge|revolutionary|game-changing|seamless|leverage|synergy|best-in-class|digital transformation)\b' src/ 2>/dev/null | grep -v "^src/lib/site.ts:.*Custom Software")
[ -z "$BANNED" ] && echo "  banned words:  CLEAN" || { echo "  banned words:  FOUND:"; echo "$BANNED" | sed 's/^/    /'; }

echo
echo "--- 5. DESIGN RULES ---"
SHADOW=$(grep -rn "shadow-\|boxShadow" src/ 2>/dev/null | grep -v "^src/components/ui/Card.tsx:3:")
[ -z "$SHADOW" ] && echo "  box-shadow:    NONE, correct" || { echo "  box-shadow:    FOUND:"; echo "$SHADOW" | sed 's/^/    /'; }

IMG=$(grep -rn "<img" src/ 2>/dev/null)
[ -z "$IMG" ] && echo "  raw <img>:     NONE, all next/image" || { echo "  raw <img>:     FOUND:"; echo "$IMG" | sed 's/^/    /'; }

echo "  use client:    $(grep -rln '\"use client\"' src/ 2>/dev/null | wc -l | tr -d ' ') file(s)"
grep -rln '"use client"' src/ 2>/dev/null | sed 's/^/    /'

echo
echo "--- 6. SEO ---"
echo "  sitemap.ts:    $([ -f src/app/sitemap.ts ] && echo present || echo MISSING)"
echo "  robots.ts:     $([ -f src/app/robots.ts ] && echo present || echo MISSING)"
echo "  JSON-LD blocks: $(grep -rl 'application/ld+json' src/ 2>/dev/null | wc -l | tr -d ' ')"
grep -rho '"@type": "[A-Za-z]*"' src/ 2>/dev/null | sort -u | sed 's/^/    /'
echo "  canonical coverage:"
for f in $(find src/app -name "page.tsx"); do
  if grep -q "canonical" "$f"; then echo "    OK inline      $f"
  elif grep -q "pillarMetadata" "$f"; then echo "    OK via helper  $f"
  elif [ "$f" = "src/app/page.tsx" ]; then echo "    OK via layout  $f"
  else echo "    MISSING        $f"; fi
done

echo
echo "--- 7. SECRETS ---"
TRACKED=$(git ls-files | grep -E '\.env|\.vercel' )
[ -z "$TRACKED" ] && echo "  no env or vercel files tracked, correct" || { echo "  WARNING, TRACKED:"; echo "$TRACKED" | sed 's/^/    /'; }
grep -rn "re_[A-Za-z0-9]\{20,\}\|sk-[A-Za-z0-9]\{20,\}\|xai-[A-Za-z0-9]\{20,\}" src/ 2>/dev/null | sed 's/^/  HARDCODED KEY: /' || true

echo
echo "--- 8. ASSETS ---"
echo "  favicon.ico:   $([ -f src/app/favicon.ico ] && echo present || echo MISSING)"
echo "  icon.png:      $([ -f src/app/icon.png ] && echo present || echo MISSING)"
echo "  og-default:    $([ -f public/og-default.png ] && echo present || echo MISSING)"
echo "  work thumbs:   $(ls public/work/*.webp 2>/dev/null | wc -l | tr -d ' ') file(s), $(du -ch public/work/*.webp 2>/dev/null | tail -1 | cut -f1)"

echo
echo "--- 9. BUILD ---"
npm run build 2>&1 | tail -20

echo
echo "======================================================"
