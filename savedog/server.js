const http = require("http");
const fs = require("fs");
const path = require("path");

const host = "0.0.0.0";
const port = Number(process.env.PORT || 4173);
const root = __dirname;

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
};

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
  const safePath = path.normalize(urlPath).replace(/^(\.\.[/\\])+/, "");
  let filePath = path.join(root, safePath === "/" ? "index.html" : safePath);

  if (!filePath.startsWith(root)) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Forbidden");
    return;
  }

  fs.stat(filePath, (error, stats) => {
    if (!error && stats.isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }

    fs.readFile(filePath, (readError, data) => {
      if (readError) {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Not Found");
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, {
        "Content-Type": mimeTypes[ext] || "application/octet-stream",
        "Cache-Control": "no-store",
      });
      res.end(data);
    });
  });
});

server.listen(port, host, () => {
  console.log(`Save Dog server running at http://127.0.0.1:${port}`);
});
