const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const parts = [
  path.join(root, 'assets/css/tailwind.built.css'),
  path.join(root, 'index.css'),
  path.join(root, 'styles.css'),
];

const outDir = path.join(root, 'assets/css');
fs.mkdirSync(outDir, { recursive: true });

const banner = '/* YAML.cc site.css — Tailwind utilities + tool styles + tutorial styles */\n';
const css = parts
  .map((f) => {
    if (!fs.existsSync(f)) throw new Error('Missing ' + f);
    return fs.readFileSync(f, 'utf8');
  })
  .join('\n\n');

fs.writeFileSync(path.join(outDir, 'site.css'), banner + css);
console.log('Wrote assets/css/site.css', (banner + css).length, 'bytes');
