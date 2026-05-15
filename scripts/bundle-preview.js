// Bundle public/prototype/* into a single self-contained HTML file.
// CSS and JSX are inlined; logo PNGs become base64 data URLs.
// Coach won't work (needs /api/generate) but every UI surface renders.

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "public", "prototype");
const OUT = path.join(__dirname, "..", "iMpatient-preview.html");

let html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");

html = html.replace(
  /<link rel="stylesheet" href="(styles\/[^"]+\.css)(\?v=\d+)?" \/>/g,
  (_m, href) => {
    const css = fs.readFileSync(path.join(ROOT, href), "utf8");
    return `<style data-from="${href}">\n${css}\n</style>`;
  }
);

html = html.replace(
  /<script type="text\/babel" src="([^"]+\.jsx)"><\/script>/g,
  (_m, src) => {
    const code = fs.readFileSync(path.join(ROOT, src), "utf8");
    return `<script type="text/babel" data-from="${src}">\n${code}\n</script>`;
  }
);

const assetsDir = path.join(ROOT, "assets");
for (const file of fs.readdirSync(assetsDir)) {
  const full = path.join(assetsDir, file);
  const ext = path.extname(file).slice(1);
  const mime = ext === "svg" ? "image/svg+xml" : `image/${ext}`;
  const data = fs.readFileSync(full).toString("base64");
  const dataUrl = `data:${mime};base64,${data}`;
  const ref = `assets/${file}`;
  html = html.split(`"${ref}"`).join(`"${dataUrl}"`);
  html = html.split(`'${ref}'`).join(`'${dataUrl}'`);
}

fs.writeFileSync(OUT, html);
const size = (fs.statSync(OUT).size / 1024).toFixed(0);
console.log(`Wrote ${OUT} (${size} KB)`);
