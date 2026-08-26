import type { OpenNextConfig } from "@opennextjs/aws/types/open-next";

const config: OpenNextConfig = {
  default: {},

  // Do not delete this block, and do not "simplify" it back to OpenNext's
  // defaults. Without it the deployed image optimization Lambda ships with no
  // sharp at all, and the build still exits 0 while that happens.
  //
  // Why: OpenNext's dist/build/installDeps.js builds its inner install command
  // as `npm install --os=<os> --arch=<arch> --target=<nodeVersion> --libc=<libc> <packages>`.
  // `--arch` and `--target` have never been real npm flags (npm's equivalent of
  // the first is `--cpu`, and it has no equivalent of the second). Older npm
  // ignored unknown flags silently; npm 12 rejects them with EUNKNOWNCONFIG, so
  // the install dies. installDependencies() catches that, logs "Could not
  // install dependencies", and swallows it, so the bundle ships with no sharp
  // and the build still reports success. This is present in every published
  // @opennextjs/aws from 3.5.0 through 4.1.1, so upgrading is not a fix.
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
  // sharp is pinned explicitly because OpenNext's default is 0.32.6, which
  // predates the prebuilt @img/* packages and needs a postinstall script that
  // npm 12 blocks. 0.34.5 is what this repo's lockfile already resolves for
  // next's own optional sharp dependency.
  //
  // Same pattern as regist/web, podcaster/portal and eleven9s/admin.
  imageOptimization: {
    install: {
      packages: ["sharp@0.34.5"],
      os: "linux",
      libc: "glibc",
      additionalArgs: "--cpu=arm64",
    },
  },
};

export default config;
