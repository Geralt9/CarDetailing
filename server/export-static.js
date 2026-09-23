// Writes every API response to client/dist/api/<name>.json so the built site
// can run without the Express server (e.g. on GitHub Pages).
// Run after `vite build`: npm run build:static
import { copyFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { openDb } from './db.js';
import { queries } from './queries.js';

const here = dirname(fileURLToPath(import.meta.url));
const dist = join(here, '..', 'client', 'dist');
const outDir = join(dist, 'api');
const db = openDb();

mkdirSync(outDir, { recursive: true });
for (const [name, query] of Object.entries(queries)) {
  writeFileSync(join(outDir, `${name}.json`), JSON.stringify(query(db)));
}
db.close();

// GitHub Pages serves 404.html for unknown paths, so deep links like /prices
// still load the app and React Router takes over.
copyFileSync(join(dist, 'index.html'), join(dist, '404.html'));
console.log(`Exported ${Object.keys(queries).length} API responses to ${outDir}`);
