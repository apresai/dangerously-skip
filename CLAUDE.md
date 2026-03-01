# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Dev Commands

- `make dev` — local dev server with Turbopack (port 3000)
- `make build` — production build (`npm run build`)
- `make clean` — remove .next, out, node_modules
- `make deploy` — clean → install → build → CDK deploy
- `npm run lint` — ESLint v9 flat config with next/core-web-vitals

## Tech Stack

- Next.js 15 + React 19 + TypeScript (strict) + Tailwind CSS v4
- App Router with static prerendering (all pages are `○ Static`)
- Path alias: `@/*` → `./src/*`
- Fonts: Inter (sans) + JetBrains Mono (mono) via next/font/google
- Tailwind v4 uses `@tailwindcss/postcss` plugin (not classic tailwindcss)
- No backend, no API routes, no database — pure content site

## Architecture

**Interactive state**: `SkipProvider` (React Context) wraps the entire app. It tracks:
- `hasSkipped` — global flag set when user clicks "Yes, skip" on The Skip page
- `permissionsApproved` — per-section permission approvals
- `hasApproved(id)` returns true if either global skip is active OR that specific permission was approved

**Component pattern**: Pages compose from `ArticleLayout` (65ch prose wrapper) + `SectionHeader` (// tag + h2) + prose content + optional interactive gates (`PermissionPrompt`, `SkipPrompt`, `FinalPrompt`).

**Client vs Server**: Pages and leaf components are Server Components. Components using `useSkip()`, `useState`, or `usePathname` are Client Components (`"use client"`).

## Design Tokens

Defined in `src/app/globals.css` under `@theme`:
- `terminal-green` (#22c55e) — action/approval, links
- `terminal-amber` (#f59e0b) — caution, skip prompt
- `terminal-dim` (#6b7280) — muted text, code comments
- `border-subtle` (#e5e7eb) — dividers, card borders

Button pattern: `bg-{color}/10 text-{color} border-{color}/30 font-mono text-sm`

## Content Pages

Reading order: Home → Move Fast → The Skip → The Anthropic Bet → Surviving Our Adolescence

To add a new article: create `src/app/{slug}/page.tsx`, export metadata, use `ArticleLayout` + `SectionHeader` pattern, add to nav arrays in `src/app/page.tsx` and `src/components/site-header.tsx`.

## Deployment

Target: `dangerously-skip-permissions.apresai.dev` via OpenNext → Lambda + CloudFront (CDK stack not yet built).

## JSX Gotcha

The `//` comment syntax used in section tags must be wrapped in JSX expressions: `{"//"} tag-name`, not bare `// tag-name`, or React's ESLint jsx-no-comment-textnodes rule will fail the build.
