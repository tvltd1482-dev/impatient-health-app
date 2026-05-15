// Bundle public/prototype/* into a single self-contained HTML file.
//
// Everything is inlined so the result works fully offline — opens in a
// phone's Files / Mail preview, an iOS Quick Look, a browser dragged on
// from a USB stick, anywhere. No unpkg, no integrity hashes, no Babel
// at runtime:
//   - CSS files inlined as <style>
//   - JSX scripts are pre-transformed with @babel/standalone in Node
//     and shipped as plain <script>
//   - React + ReactDOM (production UMD) inlined from node_modules
//   - logo + image assets inlined as base64 data URLs
//
// Coach won't work (still needs /api/generate at runtime) but every
// other UI surface renders.

const fs = require("fs");
const path = require("path");
const babel = require("@babel/standalone");

const ROOT = path.join(__dirname, "..", "public", "prototype");
const OUT = path.join(__dirname, "..", "iMpatient-preview.html");

let html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");

// 1. Inline stylesheets
html = html.replace(
  /<link rel="stylesheet" href="(styles\/[^"]+\.css)(\?v=\d+)?" \/>/g,
  (_m, href) => {
    const css = fs.readFileSync(path.join(ROOT, href), "utf8");
    return `<style data-from="${href}">\n${css}\n</style>`;
  }
);

// 2. Replace external React / ReactDOM / Babel <script src> tags with
//    inlined local UMD copies. We use production builds — minified,
//    no PropTypes warnings, smaller. Versions are whatever's in
//    node_modules (currently React 18.2). Functional parity with the
//    dev unpkg URLs the source HTML referenced.
function inlineUmd(html, urlPattern, file) {
  const code = fs.readFileSync(file, "utf8");
  return html.replace(urlPattern, () => `<script data-from="${path.basename(file)}">\n${code}\n</script>`);
}
html = inlineUmd(html, /<script src="https:\/\/unpkg\.com\/react@[^"]+"[^>]*><\/script>/, path.join(__dirname, "..", "node_modules/react/umd/react.production.min.js"));
html = inlineUmd(html, /<script src="https:\/\/unpkg\.com\/react-dom@[^"]+"[^>]*><\/script>/, path.join(__dirname, "..", "node_modules/react-dom/umd/react-dom.production.min.js"));

// 3. Drop the Babel <script> tag — we pre-transform JSX at build time
//    so the browser never sees Babel and never needs to load it.
html = html.replace(/<script src="https:\/\/unpkg\.com\/@babel\/standalone@[^"]+"[^>]*><\/script>\s*/, "");

// 4. Pre-transform every <script type="text/babel" src="...jsx"> into
//    plain <script>. Each component is wrapped with a __mark call so
//    the boot indicator surfaces the last script that ran before any
//    future blank failure.
html = html.replace(
  /<script type="text\/babel" src="([^"]+\.jsx)"><\/script>/g,
  (_m, src) => {
    const code = fs.readFileSync(path.join(ROOT, src), "utf8");
    const safe = src.replace(/'/g, "\\'");
    const wrapped = `window.__mark && window.__mark('${safe}');\n${code}\nwindow.__mark && window.__mark('${safe} OK');`;
    const transformed = babel.transform(wrapped, { presets: ["react"], compact: false }).code;
    return `<script data-from="${src}">\n${transformed}\n</script>`;
  }
);

// 5. Pre-transform the inline <script type="text/babel" data-presets="react"> blocks too.
html = html.replace(
  /<script type="text\/babel" data-presets="react"([^>]*)>([\s\S]*?)<\/script>/g,
  (_m, attrs, body) => {
    const transformed = babel.transform(body, { presets: ["react"], compact: false }).code;
    const label = (attrs.match(/data-screen-label="([^"]+)"/) || [, "inline"])[1];
    return `<script data-from="inline:${label}">\n${transformed}\n</script>`;
  }
);

// 6. Inline assets as base64 data URLs.
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
