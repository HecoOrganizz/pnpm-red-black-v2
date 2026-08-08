# GitHub Pages deployment

This project is configured for a fully static Next.js export and GitHub Pages deployment.

## Deployment behavior

- Pushes to `main` or `master` run lint, typecheck, static build, artifact upload, and deployment.
- Pull requests run lint, typecheck, and static build only.
- `output: "export"` writes the website to `out/`.
- `scripts/prepare-pages.mjs` creates `.nojekyll` and a root redirect to `/en/`.
- The workflow automatically detects the correct Pages base path.

## Resulting URL

If the repository is named exactly:

`hecoorganizz.github.io`

then the website is deployed at:

`https://hecoorganizz.github.io/`

If the repository has another name, for example `pnpm-red-black-v2`, GitHub Pages publishes it under the repository path:

`https://hecoorganizz.github.io/pnpm-red-black-v2/`

The workflow configures Next.js `basePath` automatically for both cases.

## One-time GitHub setting

In the repository open **Settings → Pages → Build and deployment → Source** and select **GitHub Actions**.

After that, push to `main` (or run the workflow manually from the Actions tab).
