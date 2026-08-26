# Agent instructions

**Everything in `CLAUDE.md` applies here.** Read that file first and follow it exactly.

This file exists because different tools look for different filenames. GitHub Copilot and Codex read `AGENTS.md`. Claude Code reads `CLAUDE.md`. The rules are identical and must never diverge.

If you update one, update both.

---

## The short version, for quick reference

**Writing.** No en dashes, no em dashes, anywhere. British spelling. No "solutions" or any banned word in `CLAUDE.md` section 1. Sentence case headings.

**Performance.** Server components by default. `"use client"` only for state, effects or handlers. Under 100KB first load JS on home. No animation libraries. AVIF images with explicit width and height.

**Design.** 8px spacing scale, no exceptions. No `box-shadow` anywhere. One accent colour use per viewport. Body copy capped at 65 characters per line. All four interactive states on every interactive element.

**Brand.** Palette in `CLAUDE.md` section 3. Do not add colours. Monogram is inline SVG only. Tagline is `Build. Grow. Scale.`, full stops, never reordered.

**Content boundary.** Never name the current employer. Only direct Manuel Technologies engagements appear under `/work`.

---

## Division of work

**Claude** decides architecture, writes copy, and produces the code. Its output is the source of truth.

**Copilot** executes mechanical tasks: applying files verbatim, repetitive edits, scaffolding routes from an established template, refactors with a clear rule.

**Copilot does not reinterpret Claude's output.** If a file is supplied, write it as given. If something looks wrong, flag it rather than improving it. Two agents each making small judgment calls produces drift that nobody notices until the site is inconsistent.

If a task requires a decision that is not already answered in `CLAUDE.md`, stop and ask rather than choosing.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
