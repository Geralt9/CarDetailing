import express from 'express';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { openDb } from './db.js';
import { queries } from './queries.js';

const here = dirname(fileURLToPath(import.meta.url));
const db = openDb();
const app = express();
const PORT = process.env.PORT || 3001;

for (const [name, query] of Object.entries(queries)) {
  app.get(`/api/${name}`, (req, res) => res.json(query(db)));
}

app.use('/api', (req, res) => res.status(404).json({ error: `No API route for ${req.path}` }));

// In production, serve the built React app
const clientDist = join(here, '..', 'client', 'dist');
if (existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('*', (req, res) => res.sendFile(join(clientDist, 'index.html')));
}

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
