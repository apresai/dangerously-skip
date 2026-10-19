import { test } from "node:test";
import * as assert from "node:assert/strict";
import * as fs from "node:fs";
import * as path from "node:path";

// Guard for `dangerous.disableTagCache` in ../open-next.config.ts.
//
// With the tag cache disabled, OpenNext turns revalidatePath and revalidateTag
// into silent no-ops (both are implemented on the tag cache). So the flag is
// only safe while no app source uses tag or path revalidation. If this test
// fails, either remove the new revalidation use or remove disableTagCache from
// open-next.config.ts (which re-creates the DynamoDB revalidation table).

const repoRoot = path.resolve(__dirname, "..", "..");
const configPath = path.join(repoRoot, "open-next.config.ts");

// Skipped at any depth (build output and dependencies).
const SKIP_ANYWHERE = new Set(["node_modules", ".next", ".open-next", ".git"]);
// Skipped only at the repo root, so an app route named "out" or "cdk" is scanned.
const SKIP_AT_ROOT = new Set([".claude", "cdk", "out"]);
const SOURCE_EXT = /\.(?:[cm]?[jt]sx?)$/;
const TEST_FILE = /\.(?:test|spec)\.[cm]?[jt]sx?$/;
const FORBIDDEN =
  /revalidatePath|revalidateTag|updateTag|cacheTag|unstable_cache|next:\s*\{[^}]*\btags["']?\s*:/;

function sourceFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (
        !SKIP_ANYWHERE.has(entry.name) &&
        !(dir === repoRoot && SKIP_AT_ROOT.has(entry.name))
      ) {
        out.push(...sourceFiles(path.join(dir, entry.name)));
      }
    } else if (SOURCE_EXT.test(entry.name) && !TEST_FILE.test(entry.name)) {
      out.push(path.join(dir, entry.name));
    }
  }
  return out;
}

test("open-next.config.ts disables the tag cache", () => {
  assert.match(
    fs.readFileSync(configPath, "utf8"),
    /disableTagCache:\s*true/,
    "open-next.config.ts must set dangerous.disableTagCache: true (this guard and the synth test assume it)",
  );
});

test("no app source uses tag or path revalidation while disableTagCache is true", () => {
  const files = sourceFiles(repoRoot);
  assert.ok(files.length > 0, "found no app source files to scan");

  const offenders = files
    .filter((f) => FORBIDDEN.test(fs.readFileSync(f, "utf8")))
    .map((f) => path.relative(repoRoot, f));

  assert.deepEqual(
    offenders,
    [],
    `${offenders.join(", ")} use revalidatePath, revalidateTag, updateTag, cacheTag, unstable_cache or next: { tags } ` +
      "but open-next.config.ts sets dangerous.disableTagCache: true, which makes them silent no-ops. " +
      "Remove the use or remove disableTagCache from open-next.config.ts.",
  );
});
