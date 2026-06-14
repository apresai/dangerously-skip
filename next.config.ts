import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root so Turbopack file tracing is deterministic.
  // This repo is developed in git worktrees, so multiple lockfiles
  // (canonical clone + worktree) always coexist; without this, Next 16
  // may infer the wrong root.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
