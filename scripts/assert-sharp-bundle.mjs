// Fails the build when an OpenNext bundle shipped without a usable sharp.
//
// Usage: node scripts/assert-sharp-bundle.mjs <bundle-dir> [<bundle-dir> ...]
//
// This exists because the failure it catches is SILENT. OpenNext installs sharp
// into each bundle by shelling out to npm (dist/build/installDeps.js); when that
// install fails it is caught, logged as "Could not install dependencies", and
// swallowed. `open-next build` then exits 0 and the bundle ships with no sharp.
// Two separate npm 12 behaviours have already triggered that across this fleet:
// EUNKNOWNCONFIG on OpenNext's bogus --arch/--target flags, and EALLOWSCRIPTS
// from a machine-level allow-scripts= key in ~/.npmrc.
//
// Three things are checked, and each has drawn blood:
//
//   1. The native binary is present. Globbed, not named: sharp 0.35 renamed it
//      from sharp-linux-arm64.node to sharp-linux-arm64-<version>.node, so a
//      hardcoded filename silently becomes a false failure on the next bump.
//   2. It is really an arm64 ELF. npm defaults --cpu to the BUILD HOST, so an
//      x86 CI runner would otherwise produce an x64 binary for an ARM64 Lambda
//      and every check above would still pass.
//   3. sharp is >= 0.35.0. Everything below carries GHSA-f88m-g3jw-g9cj (HIGH,
//      inherited libvips CVE-2026-33327 / -33328 / -35590). The app's own
//      package.json override does NOT reach this install, because OpenNext runs
//      npm in its own temp dir, so nothing else stops a downgrade here.
import { existsSync, readdirSync, readFileSync, openSync, readSync, closeSync } from "node:fs";

const MIN_MAJOR = 0;
const MIN_MINOR = 35;
const ADVISORY = "GHSA-f88m-g3jw-g9cj";

const bundles = process.argv.slice(2);
if (bundles.length === 0) {
  console.error("usage: assert-sharp-bundle.mjs <bundle-dir> [<bundle-dir> ...]");
  process.exit(2);
}

/** Reads the ELF machine type. Returns "arm64", "x64", or a description. */
function elfArch(file) {
  const fd = openSync(file, "r");
  try {
    const head = Buffer.alloc(20);
    readSync(fd, head, 0, 20, 0);
    if (head.readUInt32BE(0) !== 0x7f454c46) return "not an ELF file";
    const machine = head.readUInt16LE(18); // e_machine, little-endian ELF
    if (machine === 0xb7) return "arm64";
    if (machine === 0x3e) return "x64";
    return `unknown e_machine 0x${machine.toString(16)}`;
  } finally {
    closeSync(fd);
  }
}

let failed = false;
const fail = (msg) => {
  console.error(`FATAL: ${msg}`);
  failed = true;
};

for (const bundle of bundles) {
  const libDir = `${bundle}/node_modules/@img/sharp-linux-arm64/lib`;
  const pkgJson = `${bundle}/node_modules/sharp/package.json`;

  if (!existsSync(libDir)) {
    fail(
      `${bundle} has no @img/sharp-linux-arm64. The inner npm install failed ` +
        `silently; look for "Could not install dependencies" in the build log.`,
    );
    continue;
  }

  const binaries = readdirSync(libDir).filter((f) => f.endsWith(".node"));
  if (binaries.length === 0) {
    fail(`${bundle} has @img/sharp-linux-arm64 but no .node binary in ${libDir}`);
    continue;
  }

  let bundleOk = true;
  for (const bin of binaries) {
    const arch = elfArch(`${libDir}/${bin}`);
    if (arch !== "arm64") {
      fail(`${bundle}/${bin} is ${arch}, not arm64. npm resolved --cpu to the build host.`);
      bundleOk = false;
    }
  }

  if (!existsSync(pkgJson)) {
    fail(`${bundle} has the platform package but no sharp itself`);
    continue;
  }

  const version = JSON.parse(readFileSync(pkgJson, "utf8")).version;
  const [major, minor] = version.split(".").map(Number);
  if (major < MIN_MAJOR || (major === MIN_MAJOR && minor < MIN_MINOR)) {
    fail(
      `${bundle} has sharp ${version}; anything below ${MIN_MAJOR}.${MIN_MINOR}.0 ` +
        `carries ${ADVISORY}. The open-next.config.ts install override is the only ` +
        `thing that sets this; package.json overrides do not reach it.`,
    );
    continue;
  }

  if (bundleOk) {
    console.log(`${bundle}: sharp ${version}, arm64 binary (${binaries.join(", ")})`);
  }
}

process.exit(failed ? 1 : 0);
