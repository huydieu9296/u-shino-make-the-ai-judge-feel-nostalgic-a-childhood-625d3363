// Entry validator and publisher for the make.fun nostalgic-childhood entry.
// Zero dependencies, Node 22/24, no network access needed.
//
// It reads entry.txt sitting next to this file, validates it against the
// bounty rules (exactly one line, 1-280 characters counted by Unicode code
// point, so an em dash counts as one character), and copies it byte for
// byte into the output directory given by MAKEFUN_OUTPUT_DIR (default
// /output). The copy is read back and compared to prove nothing was
// altered in transit.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

function main(): void {
  const here = dirname(fileURLToPath(import.meta.url));
  const sourcePath = join(here, "entry.txt");

  let raw: Buffer;
  try {
    raw = readFileSync(sourcePath);
  } catch (err) {
    fail(`cannot read ${sourcePath}: ${(err as Error).message}`);
  }

  let entry: string;
  try {
    entry = new TextDecoder("utf-8", { fatal: true }).decode(raw);
  } catch {
    fail("entry.txt is not valid UTF-8");
  }

  // Bounty rules: exactly one line, 1-280 characters (Unicode code points).
  if (entry.includes("\r") || entry.includes("\n")) {
    fail("entry.txt must contain exactly one line (no CR or LF characters)");
  }
  const charCount = [...entry].length;
  if (charCount < 1 || charCount > 280) {
    fail(`entry is ${charCount} characters; the limit is 1-280 characters`);
  }
  if (entry.trim().length === 0) {
    fail("entry must not be empty or whitespace only");
  }

  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outputDir, { recursive: true });

  const outputPath = join(outputDir, "entry.txt");
  writeFileSync(outputPath, raw);

  const roundTrip = readFileSync(outputPath);
  if (!roundTrip.equals(raw)) {
    fail("verification failed: output file differs from the source entry");
  }

  console.log(`output: ${outputPath}`);
  console.log(`characters: ${charCount} (limit 280)`);
  console.log(`bytes: ${raw.length}`);
  console.log(`entry: ${entry}`);
}

main();
