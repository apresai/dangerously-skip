import type { OpenNextConfig } from "@opennextjs/aws/types/open-next";

const config: OpenNextConfig = {
  default: {},

  // Do not delete this block, and do not "simplify" it back to OpenNext's
  // defaults. Without it the deployed image optimization Lambda ships with no
  // sharp at all, and the build still exits 0 while that happens.
  //
  // Why: OpenNext's dist/build/installDeps.js builds its inner install command
  // as `npm install --os=<os> --arch=<arch> --target=<nodeVersion>
  // --libc=<libc> <packages>`.
  // `--arch` and `--target` have never been real npm flags (npm's equivalent of
  // the first is `--cpu`, and it has no equivalent of the second). Older npm
  // ignored unknown flags silently; npm 12 rejects them with EUNKNOWNCONFIG, so
  // the install dies. installDependencies() catches that, logs "Could not
  // install dependencies", and swallows it, so the bundle ships with no sharp
  // and the build still reports success. This is present in every published
  // @opennextjs/aws from 3.5.0 through 4.1.8 (rechecked 2026-10-09 against
  // 4.1.8's installDeps.js), so upgrading is not a fix.
  //
  // The override omits `arch` and `nodeVersion` (those two fields are what emit
  // the rejected flags) and passes npm's real flag via `additionalArgs`.
  //
  // `libc: "glibc"` is load-bearing: without it npm resolves no @img/* platform
  // package and you get a sharp with no native binary, which fails at runtime
  // rather than at build time.
  //
  // `--cpu=arm64` is a correctness fix, not just unblocking. npm defaults --cpu
  // to the HOST cpu, so arm64 is picked only because the build machine happens
  // to be Apple Silicon; the GitHub Actions deploy job runs on ubuntu-latest
  // (x64) and would silently produce an x64 sharp. cdk-opennext pins every
  // function to Architecture.ARM_64, so the target is always arm64.
  //
  // sharp is pinned to 0.35.5 for two reasons. The floor is a SECURITY floor:
  // 0.35.4 and below carry GHSA-wq5f-xc86-pv6w (HIGH, librsvg CVE-2026-96889).
  // Everything below 0.35.0 also carries GHSA-f88m-g3jw-g9cj (HIGH), sharp
  // inheriting libvips CVE-2026-33327 / -33328 / -35590 / -35591. And
  // OpenNext's default
  // 0.32.6 predates the prebuilt @img/* packages, relying on an install script
  // that npm 12 blocks, where that script IS how its binary arrives, so
  // blocking
  // it leaves nothing behind. 0.35.x declares no install script at all.
  //
  // This is independent of whatever next's own optional sharp dependency
  // resolves to in the lockfile: OpenNext installs into its own temp dir, where
  // this repo's resolutions do not apply, so this line is the only thing
  // deciding what the image Lambda ships.
  //
  // Same pattern as regist/web, podcaster/portal and eleven9s/admin.
  imageOptimization: {
    install: {
      packages: ["sharp@0.35.5"],
      os: "linux",
      libc: "glibc",
      additionalArgs: "--cpu=arm64",
    },
  },
};

export default config;
