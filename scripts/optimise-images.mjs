#!/usr/bin/env node
/* Image optimiser. Converts everything in /public to compressed WebP.
   ---------------------------------------------------------------------------
   Every image on this site ships as WebP, compressed, correctly sized. This
   script enforces that rather than trusting anyone to remember.

   Usage:
     node scripts/optimise-images.mjs              # convert and report
     node scripts/optimise-images.mjs --check      # fail if anything is wrong
     node scripts/optimise-images.mjs --keep       # keep the source files

   `--check` is the one to wire into CI. It exits non zero if it finds a PNG or
   JPG, or a WebP over budget, and prints exactly which file and by how much.

   Requires sharp:  npm i -D sharp
   -------------------------------------------------------------------------- */

import { readdir, stat, unlink } from "node:fs/promises";
import { join, extname, basename, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = join(ROOT, "public");

const CHECK = process.argv.includes("--check");
const KEEP = process.argv.includes("--keep");

/* Budgets in KB, from CLAUDE.md section 2. Matched longest prefix first. */
const BUDGETS = [
  { prefix: "integrations/", max: 12, width: 128, label: "integration logo" },
  { prefix: "work/", max: 120, width: 1600, label: "work screenshot" },
  { prefix: "og/", max: 200, width: 1200, label: "og image" },
  { prefix: "", max: 100, width: 1600, label: "image" },
];

const CONVERTIBLE = new Set([".png", ".jpg", ".jpeg", ".tiff", ".avif"]);

function budgetFor(rel) {
  return BUDGETS.find((b) => rel.startsWith(b.prefix)) ?? BUDGETS.at(-1);
}

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

const kb = (bytes) => Math.round(bytes / 102.4) / 10;

let sharp;
try {
  ({ default: sharp } = await import("sharp"));
} catch {
  if (!CHECK) {
    console.error("sharp is not installed. Run:  npm i -D sharp");
    process.exit(1);
  }
}

const problems = [];
const converted = [];

for await (const file of walk(PUBLIC)) {
  const ext = extname(file).toLowerCase();
  const rel = relative(PUBLIC, file);

  /* SVG is left alone. Logos and icons are inline SVG by policy, and any SVG
     that does live in /public is already vector and does not compress this
     way. */
  if (ext === ".svg" || ext === ".ico") continue;

  const budget = budgetFor(rel);

  if (CONVERTIBLE.has(ext)) {
    if (CHECK) {
      problems.push(`${rel} is ${ext}, must be .webp`);
      continue;
    }
    const out = join(dirname(file), `${basename(file, ext)}.webp`);
    await sharp(file)
      .resize({ width: budget.width, withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toFile(out);
    const after = (await stat(out)).size;
    const before = (await stat(file)).size;
    converted.push(
      `${rel} -> .webp  ${kb(before)}KB to ${kb(after)}KB  (${Math.round(
        (1 - after / before) * 100,
      )}% smaller)`,
    );
    if (!KEEP) await unlink(file);
    if (after / 1024 > budget.max) {
      problems.push(
        `${rel} is ${kb(after)}KB, over the ${budget.max}KB ${budget.label} budget`,
      );
    }
    continue;
  }

  if (ext === ".webp") {
    const size = (await stat(file)).size;
    if (size / 1024 > budget.max) {
      problems.push(
        `${rel} is ${kb(size)}KB, over the ${budget.max}KB ${budget.label} budget`,
      );
    }
  }
}

if (converted.length) {
  console.log("Converted:");
  for (const line of converted) console.log("  " + line);
}

if (problems.length) {
  console.error(`\n${problems.length} problem(s):`);
  for (const line of problems) console.error("  " + line);
  process.exit(1);
}

console.log(
  converted.length
    ? `\nAll good. ${converted.length} converted, everything within budget.`
    : "All images are WebP and within budget.",
);
