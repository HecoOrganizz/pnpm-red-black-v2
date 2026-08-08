import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const outDir = resolve("out");
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
const defaultLocale = "en";
const target = `${basePath}/${defaultLocale}/` || `/${defaultLocale}/`;

await mkdir(outDir, { recursive: true });

// GitHub Pages must not run the exported _next directory through Jekyll.
await writeFile(resolve(outDir, ".nojekyll"), "", "utf8");

// The app intentionally uses locale-prefixed routes. Static hosting has no
// middleware/proxy, so provide a tiny root document that forwards / to /en/.
const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="robots" content="noindex,follow">
  <title>Heco</title>
  <link rel="canonical" href="${target}">
  <meta http-equiv="refresh" content="0;url=${target}">
  <script>location.replace(${JSON.stringify(target)} + location.search + location.hash);</script>
</head>
<body>
  <p>Redirecting to <a href="${target}">Heco</a>…</p>
</body>
</html>\n`;

await writeFile(resolve(outDir, "index.html"), html, "utf8");
