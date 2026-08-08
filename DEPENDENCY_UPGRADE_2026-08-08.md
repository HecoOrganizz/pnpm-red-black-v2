# Dependency upgrade — 2026-08-08

This project was refreshed for the current GitHub Actions Node 24 runtime and current stable package releases.

## Runtime / CI

- Node.js: 24.19.0 LTS
- pnpm: 11.17.0
- actions/checkout: v7 (Node 24 action runtime)
- pnpm/setup: v2
- Added CI lint + typecheck + build
- Added Dependabot for npm/pnpm dependencies and GitHub Actions

## Framework / runtime dependencies

- next: 16.3.0
- react / react-dom: 19.2.8
- next-intl: 4.13.4
- framer-motion: 13.0.0
- lucide-react: 1.30.0
- Tailwind CSS: 4.3.3
- Radix UI packages refreshed to current releases

## Tooling

- ESLint: 10.8.1
- eslint-config-next: 16.3.0
- TypeScript: 6.0.2
- @types/node: latest compatible 24.x line (kept aligned with Node 24 LTS)

TypeScript 7.0.2 is intentionally not used yet. Next.js 16.3 still has active compatibility issues with the TypeScript 7 native package layout, so TypeScript 6.0.2 is the newest practical compatible line for this project right now.

## Next.js 16 migration

`src/middleware.ts` was renamed to `src/proxy.ts` because the `middleware` file convention is deprecated in Next.js 16.

## Lockfile note

The original archive's `pnpm-lock.yaml` was generated for the previous dependency declarations. The CI migration step uses:

```bash
pnpm install --no-frozen-lockfile
```

Run the same command once locally with Node 24.19.0 / pnpm 11.17.0, commit the refreshed `pnpm-lock.yaml`, then optionally change CI back to:

```bash
pnpm install --frozen-lockfile
```
