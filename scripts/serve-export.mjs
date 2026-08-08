import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve("out");
const port = Number(process.env.PORT ?? 3000);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".woff2": "font/woff2",
};

createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url ?? "/", `http://${req.headers.host ?? "localhost"}`).pathname);
  const safePath = normalize(pathname).replace(/^([.][.][/\\])+/, "");
  let file = join(root, safePath);

  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
  if (!existsSync(file) && !extname(file)) file = `${file}.html`;
  if (!existsSync(file)) file = join(root, "404.html");

  if (!existsSync(file) || !file.startsWith(root)) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  res.setHeader("Content-Type", mime[extname(file)] ?? "application/octet-stream");
  createReadStream(file).pipe(res);
}).listen(port, () => {
  console.log(`Static export: http://localhost:${port}`);
});
